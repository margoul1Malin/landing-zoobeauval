#!/usr/bin/env node

/**
 * Script pour exécuter directement les pings des moteurs de recherche
 * Utilise fetch pour pinger Google, Bing et Yandex
 */

const sites = [
  'https://www.wina-list.fr',
  'https://www.loirelover.fr', 
  'https://www.zoobeauvale.fr',
  'https://www.getyourguides.fr',
  'https://www.valdeloires-france.fr'
];

const locales = ['fr', 'en', 'es', 'de'];

// Récupération des slugs des villes depuis la base de données
async function getCitiesFromDB() {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const cities = await prisma.cityPage.findMany({
      select: {
        slug: true
      },
      orderBy: {
        cityName: 'asc'
      }
    });
    
    await prisma.$disconnect();
    
    return cities.map(city => city.slug);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des villes depuis la DB:', error.message);
    // Fallback vers une liste de base si la DB n'est pas accessible
    return [
      'blois', 'bracieux', 'celettes', 'chambord', 'chenonceaux', 
      'cheverny', 'contres', 'cormeray', 'couddes', 'fontaineensologne',
      'mareuilsurcher', 'noyersurcher', 'romorantin', 'seigy', 
      'sellessurcher', 'soingsensologne', 'staignansurcher', 
      'stromainsurcher', 'these'
    ];
  }
}

// URLs des moteurs de recherche
const searchEngines = {
  google: 'https://www.google.com/ping?sitemap=',
  bing: 'https://www.bing.com/ping?sitemap=',
  yandex: 'https://blogs.yandex.com/pings/?status=success&url='
};

/**
 * Génère toutes les URLs à pinger
 */
function generateUrls() {
  const urls = [];
  
  for (const site of sites) {
    // Page d'accueil pour chaque locale
    for (const locale of locales) {
      const url = locale === 'fr' ? site : `${site}/${locale}`;
      urls.push(url);
    }
    
    // Pages des villes pour chaque locale
    for (const city of cities) {
      for (const locale of locales) {
        const url = locale === 'fr' ? `${site}/villes/${city}` : `${site}/${locale}/villes/${city}`;
        urls.push(url);
      }
    }
  }
  
  return urls;
}

/**
 * Pause entre les requêtes pour éviter la surcharge
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Ping un moteur de recherche
 */
async function pingSearchEngine(engine, url) {
  try {
    const pingUrl = engine === 'yandex' 
      ? `${searchEngines[engine]}${encodeURIComponent(url)}`
      : `${searchEngines[engine]}${encodeURIComponent(url)}`;
    
    console.log(`📡 Pinging ${engine.toUpperCase()}: ${url}`);
    
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Ping-Bot/1.0)'
      }
    });
    
    if (response.ok) {
      console.log(`✅ ${engine.toUpperCase()} pinged successfully`);
      return true;
    } else {
      console.log(`❌ ${engine.toUpperCase()} ping failed: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error pinging ${engine.toUpperCase()}: ${error.message}`);
    return false;
  }
}

/**
 * Exécute tous les pings
 */
async function executeAllPings() {
  const urls = generateUrls();
  const results = {
    google: { success: 0, failed: 0 },
    bing: { success: 0, failed: 0 },
    yandex: { success: 0, failed: 0 }
  };
  
  console.log('🚀 Démarrage des pings des moteurs de recherche...');
  console.log(`📊 Total des URLs à pinger: ${urls.length * Object.keys(searchEngines).length}`);
  console.log('─'.repeat(60));
  
  for (const url of urls) {
    console.log(`\n🌐 Pinging URL: ${url}`);
    
    for (const engine of Object.keys(searchEngines)) {
      const success = await pingSearchEngine(engine, url);
      
      if (success) {
        results[engine].success++;
      } else {
        results[engine].failed++;
      }
      
      // Pause entre les pings pour éviter la surcharge
      await sleep(1000);
    }
    
    // Pause entre les URLs
    await sleep(2000);
  }
  
  // Affichage des résultats
  console.log('\n📊 Résultats finaux:');
  console.log('─'.repeat(40));
  
  for (const [engine, result] of Object.entries(results)) {
    console.log(`${engine.toUpperCase()}:`);
    console.log(`  ✅ Succès: ${result.success}`);
    console.log(`  ❌ Échecs: ${result.failed}`);
    console.log(`  📈 Taux de succès: ${((result.success / (result.success + result.failed)) * 100).toFixed(1)}%`);
  }
  
  const totalSuccess = Object.values(results).reduce((acc, r) => acc + r.success, 0);
  const totalFailed = Object.values(results).reduce((acc, r) => acc + r.failed, 0);
  
  console.log('\n🎯 Total global:');
  console.log(`  ✅ Succès: ${totalSuccess}`);
  console.log(`  ❌ Échecs: ${totalFailed}`);
  console.log(`  📈 Taux global: ${((totalSuccess / (totalSuccess + totalFailed)) * 100).toFixed(1)}%`);
}

/**
 * Fonction principale
 */
async function main() {
  try {
    await executeAllPings();
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution:', error.message);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = {
  generateUrls,
  pingSearchEngine,
  executeAllPings
}; 