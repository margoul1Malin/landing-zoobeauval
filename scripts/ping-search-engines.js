#!/usr/bin/env node

/**
 * Script pour automatiser le ping des moteurs de recherche
 * Ping Google, Bing et Yandex pour l'indexation des sites
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

// URLs des moteurs de recherche pour le ping
const searchEngines = {
  google: 'https://www.google.com/ping?sitemap=',
  bing: 'https://www.bing.com/ping?sitemap=',
  yandex: 'https://blogs.yandex.com/pings/?status=success&url='
};

/**
 * Génère toutes les URLs à pinger
 */
async function generateUrls() {
  const cities = await getCitiesFromDB();
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
 * Génère les URLs de ping pour chaque moteur de recherche
 */
async function generatePingUrls() {
  const urls = await generateUrls();
  const pingUrls = {};
  
  for (const [engine, pingUrl] of Object.entries(searchEngines)) {
    pingUrls[engine] = [];
    
    for (const url of urls) {
      if (engine === 'yandex') {
        // Yandex utilise un format différent
        pingUrls[engine].push(`${pingUrl}${url}`);
      } else {
        // Google et Bing utilisent le format sitemap
        pingUrls[engine].push(`${pingUrl}${url}`);
      }
    }
  }
  
  return pingUrls;
}

/**
 * Affiche les URLs de ping dans la console
 */
async function displayPingUrls() {
  const pingUrls = await generatePingUrls();
  
  console.log('🚀 Script de Ping des Moteurs de Recherche');
  console.log('==========================================\n');
  
  for (const [engine, urls] of Object.entries(pingUrls)) {
    console.log(`📡 ${engine.toUpperCase()} (${urls.length} URLs):`);
    console.log('─'.repeat(50));
    
    urls.forEach((url, index) => {
      console.log(`${index + 1}. ${url}`);
    });
    
    console.log('\n');
  }
  
  console.log(`📊 Total: ${Object.values(pingUrls).reduce((acc, urls) => acc + urls.length, 0)} URLs de ping`);
}

/**
 * Génère un fichier de sitemap XML
 */
async function generateSitemapXML() {
  const urls = await generateUrls();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }
  
  xml += '</urlset>';
  
  return xml;
}

/**
 * Sauvegarde le sitemap dans un fichier
 */
async function saveSitemap() {
  const fs = require('fs');
  const xml = await generateSitemapXML();
  const filename = 'sitemap-all-sites.xml';
  
  try {
    fs.writeFileSync(filename, xml, 'utf8');
    console.log(`✅ Sitemap sauvegardé dans: ${filename}`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde du sitemap:', error.message);
  }
}

/**
 * Génère un fichier de commandes curl pour automatiser les pings
 */
async function generateCurlCommands() {
  const pingUrls = await generatePingUrls();
  let commands = '#!/bin/bash\n\n';
  commands += '# Script de ping automatique des moteurs de recherche\n';
  commands += '# Généré automatiquement\n\n';
  
  for (const [engine, urls] of Object.entries(pingUrls)) {
    commands += `echo "Pinging ${engine.toUpperCase()}..."\n`;
    
    for (const url of urls) {
      commands += `curl -s "${url}" > /dev/null\n`;
      commands += `echo "Pinged: ${url}"\n`;
      commands += 'sleep 1\n'; // Pause entre les pings
    }
    
    commands += '\n';
  }
  
  return commands;
}

/**
 * Sauvegarde les commandes curl dans un fichier
 */
async function saveCurlScript() {
  const fs = require('fs');
  const commands = await generateCurlCommands();
  const filename = 'ping-search-engines.sh';
  
  try {
    fs.writeFileSync(filename, commands, 'utf8');
    console.log(`✅ Script bash sauvegardé dans: ${filename}`);
    console.log('💡 Pour l\'exécuter: chmod +x ping-search-engines.sh && ./ping-search-engines.sh');
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde du script bash:', error.message);
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.clear();
  
  // Afficher les URLs de ping
  await displayPingUrls();
  
  // Sauvegarder le sitemap
  await saveSitemap();
  
  // Sauvegarder le script bash
  await saveCurlScript();
  
  console.log('\n🎯 Instructions d\'utilisation:');
  console.log('1. Le sitemap XML a été généré pour tous vos sites');
  console.log('2. Le script bash peut être exécuté pour automatiser les pings');
  console.log('3. Vous pouvez aussi copier-coller les URLs dans votre navigateur');
  console.log('4. Ou utiliser un outil comme Screaming Frog pour automatiser');
  
  console.log('\n⚠️  Note: Respectez les limites de taux des moteurs de recherche');
  console.log('   - Google: ~500 URLs par jour');
  console.log('   - Bing: ~10,000 URLs par jour');
  console.log('   - Yandex: ~50,000 URLs par jour');
}

// Exécuter le script si appelé directement
if (require.main === module) {
  main();
}

module.exports = {
  generateUrls,
  generatePingUrls,
  generateSitemapXML,
  generateCurlCommands
}; 