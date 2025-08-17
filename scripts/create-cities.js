const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contenu unique pour chaque ville
const cityContent = {
  "St Aignan Sur Cher": {
    citySectionTitle: "Découvrez Saint-Aignan-sur-Cher",
    citySectionSubtitle: "Une ville médiévale au cœur de la Vallée de la Loire",
    backgroundImage: "/villes/staignansurcher.jpg",
    citySectionParagraphs: [
      "**Saint-Aignan-sur-Cher** est une charmante ville médiévale située sur les rives de la rivière Cher. Son château du XIe siècle, perché sur un éperon rocheux, domine majestueusement la vallée et offre une vue imprenable sur la rivière et les vignobles environnants. La ville conserve son authenticité avec ses ruelles pavées, ses maisons à colombages et son église romane classée aux Monuments Historiques.",
      
      "Le **centre historique** de Saint-Aignan vous invite à une promenade dans le temps. Découvrez la place du marché avec ses arcades médiévales, la rue des Prêtres bordée de maisons anciennes, et la promenade des remparts qui longe les anciennes fortifications. Les artisans locaux perpétuent les traditions dans leurs ateliers, créant des produits authentiques qui font la renommée de la région.",
      
      "La **vallée du Cher** autour de Saint-Aignan est un paradis pour les amoureux de la nature. Les sentiers de randonnée serpentent à travers les vignobles, les forêts et les prairies, offrant des points de vue spectaculaires sur la rivière. Les activités nautiques sur le Cher, comme le canoë-kayak et la pêche, permettent de découvrir la région sous un angle différent.",
      
      "Saint-Aignan est également réputée pour sa **gastronomie locale**. Les restaurants traditionnels servent des spécialités de la Touraine et du Berry, accompagnées des vins de la région. Le marché hebdomadaire propose les produits frais des fermes environnantes, tandis que les caves de dégustation vous font découvrir les vins du Val de Loire dans un cadre authentique."
    ]
  },
  
  "Thesee": {
    citySectionTitle: "Explorez Thésée",
    citySectionSubtitle: "Un village gallo-romain au charme intemporel",
    backgroundImage: "/villes/Thesee.jpg",
    citySectionParagraphs: [
      "**Thésée** est un village chargé d'histoire, situé au cœur de la Sologne. Son nom évoque les origines gallo-romaines de la région, et les vestiges archéologiques témoignent d'un passé riche et mouvementé. Le village s'est développé autour de son église romane du XIIe siècle, qui reste le cœur spirituel de la communauté locale.",
      
      "Le **patrimoine architectural** de Thésée reflète l'histoire de la région. Les maisons traditionnelles en pierre de tuffeau, les granges solognotes caractéristiques et les puits couverts racontent l'histoire d'une communauté rurale qui a su préserver son authenticité. Les jardins potagers et les vergers entourent le village, créant un paysage bucolique typique de la Sologne.",
      
      "La **nature solognote** entoure Thésée de toute part. Les étangs, les forêts de chênes et de pins, et les landes offrent un habitat privilégié pour la faune sauvage. Les sentiers de randonnée permettent de découvrir cette biodiversité exceptionnelle, avec des points d'observation pour observer les oiseaux migrateurs et la faune locale.",
      
      "Thésée est un point de départ idéal pour explorer la **Sologne authentique**. Les activités traditionnelles comme la chasse, la pêche et la cueillette de champignons sont encore pratiquées par les habitants. Les gîtes ruraux et les fermes-auberges offrent une expérience d'immersion dans la vie rurale traditionnelle de la région."
    ]
  },
  
  "Noyer sur Cher": {
    citySectionTitle: "Bienvenue à Noyer-sur-Cher",
    citySectionSubtitle: "Un village de caractère au bord de la rivière",
    backgroundImage: "/villes/noyersurcher.jpg",
    citySectionParagraphs: [
      "**Noyer-sur-Cher** est un village pittoresque qui s'étire le long des rives de la rivière Cher. Son nom évoque la présence ancestrale des noyers qui bordaient autrefois la rivière, créant un paysage verdoyant et ombragé. Le village conserve son charme rural avec ses maisons traditionnelles et ses jardins fleuris.",
      
      "Le **quai de la rivière** est le cœur vivant de Noyer-sur-Cher. Les pêcheurs locaux s'y retrouvent pour taquiner le poisson, tandis que les promeneurs profitent de la vue paisible sur l'eau. Les saules pleureurs qui bordent la rivière créent un cadre romantique, parfait pour une promenade en amoureux ou une pause contemplative.",
      
      "La **vie locale** de Noyer-sur-Cher est rythmée par les saisons et les traditions rurales. Le marché local propose les produits frais des fermes environnantes, et les fêtes villageoises perpétuent les coutumes ancestrales. Les artisans locaux, du maréchal-ferrant au vannier, maintiennent vivants les savoir-faire traditionnels.",
      
      "Les **activités de plein air** sont nombreuses autour de Noyer-sur-Cher. La rivière invite à la baignade en été, au canoë-kayak pour les plus sportifs, et à la pêche pour les amateurs. Les chemins de halage, transformés en pistes cyclables, permettent de découvrir la vallée du Cher à vélo, avec des haltes dans les villages voisins."
    ]
  },
  
  "Selles sur Cher": {
    citySectionTitle: "Découvrez Selles-sur-Cher",
    citySectionSubtitle: "Une ville de tradition fromagère et de patrimoine",
    backgroundImage: "/villes/sellessurcher.jpg",
    citySectionParagraphs: [
      "**Selles-sur-Cher** est célèbre pour son fromage AOP éponyme, un fromage de chèvre à la croûte cendrée unique au monde. Cette tradition fromagère remonte au Moyen Âge et fait la fierté de la ville. Les fermes caprines des environs perpétuent ce savoir-faire ancestral, transmis de génération en génération.",
      
      "Le **centre historique** de Selles-sur-Cher révèle un riche passé médiéval. L'église Saint-Eusice, avec son architecture romane et gothique, domine la place du marché. Les maisons à colombages et les hôtels particuliers témoignent de la prospérité passée de la ville, qui était un important centre commercial sur la route du sel.",
      
      "La **vallée du Cher** autour de Selles offre un paysage varié et préservé. Les prairies humides, les bocages et les forêts créent un écosystème riche où la biodiversité s'épanouit. Les sentiers de randonnée permettent de découvrir cette nature préservée, avec des points de vue sur la rivière et les villages alentour.",
      
      "Selles-sur-Cher est un **centre gastronomique** reconnu. Outre le fromage AOP, la ville propose une cuisine traditionnelle de qualité, basée sur les produits locaux. Les restaurants et auberges servent des spécialités régionales, accompagnées des vins du Val de Loire, dans une ambiance chaleureuse et authentique."
    ]
  },
  
  "Seigy": {
    citySectionTitle: "Explorez Seigy",
    citySectionSubtitle: "Un village solognot au charme discret",
    backgroundImage: "/villes/seigy.jpg",
    citySectionParagraphs: [
      "**Seigy** est un village typique de la Sologne, niché au cœur d'un paysage de forêts et d'étangs. Son nom d'origine celtique évoque les origines anciennes de ce territoire, où la nature a toujours été maîtresse des lieux. Le village s'est développé autour de son église et de ses fermes traditionnelles.",
      
      "Le **patrimoine rural** de Seigy reflète l'histoire agricole de la Sologne. Les granges solognotes, construites en bois et torchis, les puits couverts et les fours à pain témoignent d'un mode de vie rural qui a perduré jusqu'au XXe siècle. Ces bâtiments traditionnels sont aujourd'hui restaurés et valorisés.",
      
      "La **nature solognote** entoure Seigy de toute part. Les étangs, créés par l'homme pour la pisciculture, abritent une faune aquatique riche. Les forêts de chênes et de pins offrent un habitat privilégié pour les chevreuils, les sangliers et de nombreuses espèces d'oiseaux. Les sentiers forestiers invitent à la découverte de cette biodiversité.",
      
      "Seigy est un **havre de paix** idéal pour se ressourcer. L'absence de pollution lumineuse permet d'observer un ciel étoilé exceptionnel. Les gîtes ruraux et chambres d'hôtes offrent un accueil chaleureux, permettant de découvrir la Sologne authentique et de partager le mode de vie des habitants locaux."
    ]
  },
  
  "Contres": {
    citySectionTitle: "Bienvenue à Contres",
    citySectionSubtitle: "Une ville viticole au cœur du Val de Loire",
    backgroundImage: "/villes/contres.jpeg",
    citySectionParagraphs: [
      "**Contres** est une ville viticole de renom, située au cœur de l'appellation Touraine. Ses vignobles, qui s'étendent sur les coteaux ensoleillés, produisent des vins rouges, blancs et rosés de qualité. La tradition viticole remonte à l'époque romaine et fait la fierté de la ville et de ses habitants.",
      
      "Le **centre-ville** de Contres allie tradition et modernité. L'église Saint-Gervais-et-Saint-Protais, avec son architecture gothique flamboyant, domine la place principale. Les maisons de vignerons, reconnaissables à leurs caves voûtées, bordent les rues du centre historique, témoignant de l'importance de la viticulture dans l'économie locale.",
      
      "La **route des vins** de Contres invite à la découverte des domaines viticoles. Les caves de dégustation, installées dans d'anciens chais, proposent une initiation aux vins de Touraine. Les vignerons partagent leur passion et leur savoir-faire, expliquant les particularités de chaque terroir et de chaque millésime.",
      
      "Contres est également réputée pour sa **gastronomie locale**. Les restaurants proposent une cuisine traditionnelle de la Touraine, accompagnée des vins locaux. Le marché hebdomadaire regroupe les producteurs locaux, offrant une large gamme de produits frais et de spécialités régionales dans une ambiance conviviale."
    ]
  },
  
  "Cheverny": {
    citySectionTitle: "Découvrez Cheverny",
    citySectionSubtitle: "Le château de Tintin et ses jardins majestueux",
    backgroundImage: "/villes/cheverny.jpg",
    citySectionParagraphs: [
      "**Cheverny** est mondialement célèbre pour son château, qui a inspiré Hergé pour créer le château de Moulinsart dans les aventures de Tintin. Ce château de la Loire, construit au XVIIe siècle, est considéré comme l'un des plus beaux de la région grâce à son architecture classique parfaitement symétrique et ses jardins à la française.",
      
      "Le **château de Cheverny** est toujours habité par la famille Hurault, qui l'occupe depuis plus de six siècles. L'intérieur, meublé avec des pièces d'époque, offre un témoignage exceptionnel de l'art de vivre au XVIIe siècle. La salle d'armes, la chambre du roi et la grande salle à manger sont particulièrement remarquables.",
      
      "Les **jardins du château** sont un chef-d'œuvre de l'art paysager français. Le parc à l'anglaise, avec ses allées ombragées et ses étangs, contraste harmonieusement avec la rigueur géométrique des jardins à la française. Le labyrinthe de buis, créé en 1820, offre une promenade ludique pour petits et grands.",
      
      "Cheverny est également réputé pour sa **vénerie traditionnelle**. Les chenils du château abritent une meute de chiens de chasse, et les équipages de vénerie perpétuent cette tradition ancestrale. Les visiteurs peuvent assister aux repas des chiens et découvrir les coulisses de cette activité équestre unique."
    ]
  },
  
  "Chambord": {
    citySectionTitle: "Explorez Chambord",
    citySectionSubtitle: "Le plus grand château de la Loire",
    backgroundImage: "/villes/chambord.jpg",
    citySectionParagraphs: [
      "**Chambord** est le plus grand et le plus majestueux des châteaux de la Loire. Construit par François Ier au XVIe siècle, ce chef-d'œuvre de la Renaissance française impressionne par ses dimensions colossales et son architecture unique. Les 440 pièces, 365 cheminées et 84 escaliers en font un palais royal d'exception.",
      
      "Le **château de Chambord** est célèbre pour son escalier à double révolution, attribué à Léonard de Vinci. Cet escalier hélicoïdal unique permet à deux personnes de monter et descendre sans jamais se croiser. Les terrasses du château offrent une vue panoramique sur le domaine forestier de 5 440 hectares.",
      
      "Le **domaine national de Chambord** est le plus grand parc forestier clos d'Europe. Cette réserve naturelle abrite une faune sauvage exceptionnelle, notamment des cerfs, des sangliers et de nombreuses espèces d'oiseaux. Les sentiers de randonnée et les pistes cyclables permettent de découvrir cette nature préservée.",
      
      "Chambord est un **centre culturel** majeur qui accueille des expositions temporaires, des concerts et des spectacles. Le château propose également des visites thématiques, des ateliers pour enfants et des événements nocturnes qui permettent de découvrir ce monument sous un angle différent et original."
    ]
  },
  
  "Chenonceaux": {
    citySectionTitle: "Bienvenue à Chenonceaux",
    citySectionSubtitle: "Le château des Dames sur le Cher",
    backgroundImage: "/villes/chenonceaux.jpg",
    citySectionParagraphs: [
      "**Chenonceaux** est célèbre pour son château, surnommé le 'Château des Dames' car il a été construit et habité par des femmes remarquables : Catherine Briçonnet, Diane de Poitiers et Catherine de Médicis. Ce château unique, construit sur un pont enjambant le Cher, est l'un des plus visités de France.",
      
      "Le **château de Chenonceaux** est un chef-d'œuvre de l'architecture Renaissance. La galerie qui enjambe le Cher, construite par Catherine de Médicis, est unique au monde. Les intérieurs, meublés avec des pièces d'époque, témoignent du raffinement de la cour royale au XVIe siècle.",
      
      "Les **jardins de Chenonceaux** sont réputés pour leur beauté et leur diversité. Le jardin de Diane de Poitiers, avec ses parterres géométriques et ses fontaines, contraste avec le jardin de Catherine de Médicis, plus romantique. Le labyrinthe de verdure et la ferme du XVIe siècle complètent cette visite exceptionnelle.",
      
      "Chenonceaux est également connu pour ses **caves troglodytiques** creusées dans le tuffeau. Ces caves, utilisées autrefois pour le stockage du vin, accueillent aujourd'hui des expositions et des événements culturels. Le village de Chenonceaux, avec ses maisons traditionnelles et ses restaurants, offre un cadre charmant pour prolonger la visite."
    ]
  },
  
  "Bracieux": {
    citySectionTitle: "Découvrez Bracieux",
    citySectionSubtitle: "Une ville de tradition et de gastronomie",
    backgroundImage: "/villes/bracieux.jpg",
    citySectionParagraphs: [
      "**Bracieux** est une ville de tradition située au cœur de la Sologne. Son nom d'origine celtique évoque les origines anciennes de ce territoire. La ville s'est développée autour de son église et de son marché, qui reste aujourd'hui un lieu de rencontre important pour les habitants et les visiteurs.",
      
      "Le **centre historique** de Bracieux conserve son charme d'antan avec ses maisons traditionnelles en pierre de tuffeau et ses rues pavées. L'église Saint-Firmin, construite au XIIe siècle, domine la place du marché et témoigne de l'histoire religieuse de la ville. Les halles du XIXe siècle abritent le marché hebdomadaire.",
      
      "Bracieux est réputée pour sa **gastronomie locale**. Les restaurants traditionnels servent des spécialités solognotes comme le gibier, les poissons d'étang et les champignons. Les producteurs locaux proposent leurs produits sur le marché : miel, fromages, volailles et légumes de saison.",
      
      "La **nature solognote** entoure Bracieux de toute part. Les étangs, les forêts et les prairies offrent un cadre idéal pour les activités de plein air. Les sentiers de randonnée permettent de découvrir cette biodiversité exceptionnelle, avec des points d'observation pour la faune sauvage."
    ]
  },
  
  "Soings en sologne": {
    citySectionTitle: "Explorez Soings-en-Sologne",
    citySectionSubtitle: "Un village authentique au cœur de la Sologne",
    backgroundImage: "/villes/soingsensologne.webp",
    citySectionParagraphs: [
      "**Soings-en-Sologne** est un village typique de la Sologne, où la nature et les traditions rurales sont préservées. Son nom évoque les origines celtiques de ce territoire, et l'histoire du village est étroitement liée à celle de la forêt solognote qui l'entoure depuis des siècles.",
      
      "Le **patrimoine rural** de Soings-en-Sologne reflète l'histoire agricole de la région. Les fermes traditionnelles, avec leurs granges solognotes caractéristiques, témoignent d'un mode de vie rural qui a perduré jusqu'au XXe siècle. Les puits couverts et les fours à pain sont encore visibles dans le village.",
      
      "La **forêt solognote** entoure Soings de toute part, offrant un habitat privilégié pour la faune sauvage. Les étangs, créés par l'homme pour la pisciculture, abritent une biodiversité exceptionnelle. Les sentiers forestiers permettent de découvrir cette nature préservée, avec des points d'observation pour les oiseaux.",
      
      "Soings-en-Sologne est un **havre de paix** idéal pour se ressourcer. L'absence de pollution lumineuse permet d'observer un ciel étoilé exceptionnel. Les gîtes ruraux et chambres d'hôtes offrent un accueil chaleureux, permettant de découvrir la Sologne authentique et de partager le mode de vie des habitants."
    ]
  },
  
  "Fontaine en sologneGy": {
    citySectionTitle: "Bienvenue à Fontaine-en-Sologne",
    citySectionSubtitle: "Un village au charme discret",
    backgroundImage: "/villes/fontaineensologne.jpg",
    citySectionParagraphs: [
      "**Fontaine-en-Sologne** est un village paisible niché au cœur de la Sologne. Son nom évoque la présence d'une source ou d'une fontaine qui a probablement déterminé l'implantation du village. Le village s'est développé autour de son église et de ses fermes traditionnelles.",
      
      "Le **patrimoine architectural** de Fontaine-en-Sologne reflète l'histoire rurale de la région. Les maisons traditionnelles en pierre de tuffeau, les granges solognotes et les puits couverts témoignent d'un mode de vie rural authentique. L'église paroissiale, avec son architecture simple et élégante, domine le village.",
      
      "La **nature solognote** entoure Fontaine de toute part. Les étangs, les forêts de chênes et de pins, et les prairies humides créent un paysage varié et préservé. Les sentiers de randonnée permettent de découvrir cette biodiversité exceptionnelle, avec des points d'observation pour la faune sauvage.",
      
      "Fontaine-en-Sologne est un **point de départ idéal** pour explorer la Sologne authentique. Les activités traditionnelles comme la chasse, la pêche et la cueillette de champignons sont encore pratiquées par les habitants. Les gîtes ruraux offrent une expérience d'immersion dans la vie rurale traditionnelle."
    ]
  },
  
  "Romorantin": {
    citySectionTitle: "Découvrez Romorantin-Lanthenay",
    citySectionSubtitle: "La capitale historique de la Sologne",
    backgroundImage: "/villes/romorantin.jpg",
    citySectionParagraphs: [
      "**Romorantin-Lanthenay** est la capitale historique de la Sologne, une ville chargée d'histoire qui a su préserver son authenticité. La ville s'est développée autour de la rivière Sauldre, qui a joué un rôle majeur dans son développement économique et culturel au fil des siècles.",
      
      "Le **centre historique** de Romorantin révèle un riche passé médiéval et Renaissance. L'église Saint-Étienne, avec son architecture gothique flamboyant, domine la ville. Les maisons à colombages, les hôtels particuliers et les ruelles pavées témoignent de la prospérité passée de la ville.",
      
      "Romorantin est célèbre pour son **patrimoine industriel**. La manufacture de soie, créée au XIXe siècle, a fait la renommée de la ville. Aujourd'hui, le musée de Sologne retrace cette histoire industrielle et présente les traditions rurales de la région à travers des collections exceptionnelles.",
      
      "La **rivière Sauldre** traverse Romorantin et offre de nombreuses possibilités d'activités de plein air. Les promenades le long des quais, les activités nautiques et la pêche sont populaires auprès des habitants et des visiteurs. Les parcs et jardins de la ville offrent des espaces de détente agréables."
    ]
  },
  
  "Mareuil sur Cher": {
    citySectionTitle: "Explorez Mareuil-sur-Cher",
    citySectionSubtitle: "Un village au bord de la rivière",
    backgroundImage: "/villes/mareuilsurcher.webp",
    citySectionParagraphs: [
      "**Mareuil-sur-Cher** est un village pittoresque situé sur les rives de la rivière Cher. Son nom évoque la présence d'un marais ou d'une zone humide qui a déterminé l'implantation du village. Le village s'est développé autour de son église et de ses activités liées à la rivière.",
      
      "Le **quai de la rivière** est le cœur vivant de Mareuil-sur-Cher. Les pêcheurs locaux s'y retrouvent pour taquiner le poisson, tandis que les promeneurs profitent de la vue paisible sur l'eau. Les saules qui bordent la rivière créent un cadre romantique, parfait pour une promenade en amoureux.",
      
      "La **vie locale** de Mareuil-sur-Cher est rythmée par les saisons et les traditions rurales. Le marché local propose les produits frais des fermes environnantes, et les fêtes villageoises perpétuent les coutumes ancestrales. Les artisans locaux maintiennent vivants les savoir-faire traditionnels.",
      
      "Les **activités de plein air** sont nombreuses autour de Mareuil-sur-Cher. La rivière invite à la baignade en été, au canoë-kayak pour les plus sportifs, et à la pêche pour les amateurs. Les chemins de halage, transformés en pistes cyclables, permettent de découvrir la vallée du Cher à vélo."
    ]
  },
  
  "Blois": {
    citySectionTitle: "Bienvenue à Blois",
    citySectionSubtitle: "La capitale historique du Loir-et-Cher",
    backgroundImage: "/villes/blois.jpg",
    citySectionParagraphs: [
      "**Blois** est la capitale historique du Loir-et-Cher, une ville chargée d'histoire qui a été le théâtre d'événements majeurs de l'histoire de France. Le château royal de Blois, résidence de nombreux rois de France, domine majestueusement la ville et la vallée de la Loire depuis son promontoire rocheux.",
      
      "Le **château royal de Blois** est un témoignage exceptionnel de l'architecture française du Moyen Âge à la Renaissance. Ses quatre ailes, construites à des époques différentes, reflètent l'évolution des styles architecturaux. L'escalier monumental de l'aile François Ier est un chef-d'œuvre de la Renaissance française.",
      
      "Le **centre historique** de Blois révèle un riche patrimoine architectural. Les maisons à colombages du Moyen Âge, les hôtels particuliers de la Renaissance et les églises gothiques témoignent de la prospérité passée de la ville. Les ruelles pavées et les places historiques invitent à la flânerie.",
      
      "Blois est également un **centre culturel** dynamique. La ville accueille de nombreux festivals, expositions et événements culturels tout au long de l'année. Les restaurants proposent une gastronomie de qualité, basée sur les produits locaux et accompagnée des vins du Val de Loire."
    ]
  },
  
  "Celettes": {
    citySectionTitle: "Découvrez Cellettes",
    citySectionSubtitle: "Un village viticole de caractère",
    backgroundImage: "/villes/celettes.jpg",
    citySectionParagraphs: [
      "**Cellettes** est un village viticole de renom, situé au cœur de l'appellation Touraine. Ses vignobles, qui s'étendent sur les coteaux ensoleillés, produisent des vins rouges, blancs et rosés de qualité. La tradition viticole remonte à l'époque romaine et fait la fierté du village.",
      
      "Le **centre du village** de Cellettes allie tradition et modernité. L'église paroissiale, avec son architecture simple et élégante, domine la place principale. Les maisons de vignerons, reconnaissables à leurs caves voûtées, bordent les rues du village, témoignant de l'importance de la viticulture dans l'économie locale.",
      
      "La **route des vins** de Cellettes invite à la découverte des domaines viticoles. Les caves de dégustation, installées dans d'anciens chais, proposent une initiation aux vins de Touraine. Les vignerons partagent leur passion et leur savoir-faire, expliquant les particularités de chaque terroir.",
      
      "Cellettes est également réputée pour sa **gastronomie locale**. Les restaurants proposent une cuisine traditionnelle de la Touraine, accompagnée des vins locaux. Les producteurs locaux proposent leurs produits : miel, fromages, volailles et légumes de saison dans une ambiance conviviale."
    ]
  },
  
  "Cormeray": {
    citySectionTitle: "Explorez Cormeray",
    citySectionSubtitle: "Un village au charme discret",
    backgroundImage: "/villes/cormeray.jpg",
    citySectionParagraphs: [
      "**Cormeray** est un village paisible niché au cœur de la campagne blésoise. Son nom d'origine celtique évoque les origines anciennes de ce territoire. Le village s'est développé autour de son église et de ses fermes traditionnelles, créant un paysage rural authentique.",
      
      "Le **patrimoine rural** de Cormeray reflète l'histoire agricole de la région. Les fermes traditionnelles, avec leurs granges caractéristiques, témoignent d'un mode de vie rural qui a perduré jusqu'au XXe siècle. L'église paroissiale, avec son architecture simple et élégante, domine le village.",
      
      "La **campagne blésoise** entoure Cormeray de toute part, offrant un paysage varié et préservé. Les champs de céréales, les prairies et les bosquets créent un cadre bucolique typique de la Beauce. Les sentiers de randonnée permettent de découvrir cette nature préservée.",
      
      "Cormeray est un **havre de paix** idéal pour se ressourcer. L'absence de pollution lumineuse permet d'observer un ciel étoilé exceptionnel. Les gîtes ruraux et chambres d'hôtes offrent un accueil chaleureux, permettant de découvrir la campagne blésoise authentique."
    ]
  },
  
  "St Romain Sur Cher": {
    citySectionTitle: "Bienvenue à Saint-Romain-sur-Cher",
    citySectionSubtitle: "Un village au bord de la rivière",
    backgroundImage: "/villes/stromainsurcher.jpg",
    citySectionParagraphs: [
      "**Saint-Romain-sur-Cher** est un village pittoresque situé sur les rives de la rivière Cher. Son nom évoque la présence d'un saint patron et la proximité de la rivière qui a joué un rôle majeur dans le développement du village. Le village s'est développé autour de son église et de ses activités liées à la rivière.",
      
      "Le **quai de la rivière** est le cœur vivant de Saint-Romain-sur-Cher. Les pêcheurs locaux s'y retrouvent pour taquiner le poisson, tandis que les promeneurs profitent de la vue paisible sur l'eau. Les saules qui bordent la rivière créent un cadre romantique, parfait pour une promenade.",
      
      "La **vie locale** de Saint-Romain-sur-Cher est rythmée par les saisons et les traditions rurales. Le marché local propose les produits frais des fermes environnantes, et les fêtes villageoises perpétuent les coutumes ancestrales. Les artisans locaux maintiennent vivants les savoir-faire traditionnels.",
      
      "Les **activités de plein air** sont nombreuses autour de Saint-Romain-sur-Cher. La rivière invite à la baignade en été, au canoë-kayak pour les plus sportifs, et à la pêche pour les amateurs. Les chemins de halage, transformés en pistes cyclables, permettent de découvrir la vallée du Cher à vélo."
    ]
  },
  
  "Couddes": {
    citySectionTitle: "Découvrez Couddes",
    citySectionSubtitle: "Un village viticole de caractère",
    backgroundImage: "/villes/couddes.jpg",
    citySectionParagraphs: [
      "**Couddes** est un village viticole de renom, situé au cœur de l'appellation Touraine. Ses vignobles, qui s'étendent sur les coteaux ensoleillés, produisent des vins rouges, blancs et rosés de qualité. La tradition viticole remonte à l'époque romaine et fait la fierté du village.",
      
      "Le **centre du village** de Couddes allie tradition et modernité. L'église paroissiale, avec son architecture simple et élégante, domine la place principale. Les maisons de vignerons, reconnaissables à leurs caves voûtées, bordent les rues du village, témoignant de l'importance de la viticulture.",
      
      "La **route des vins** de Couddes invite à la découverte des domaines viticoles. Les caves de dégustation, installées dans d'anciens chais, proposent une initiation aux vins de Touraine. Les vignerons partagent leur passion et leur savoir-faire, expliquant les particularités de chaque terroir.",
      
      "Couddes est également réputée pour sa **gastronomie locale**. Les restaurants proposent une cuisine traditionnelle de la Touraine, accompagnée des vins locaux. Les producteurs locaux proposent leurs produits : miel, fromages, volailles et légumes de saison dans une ambiance conviviale."
    ]
  }
};

// Fonction pour créer le slug à partir du nom de ville
function createSlug(cityName) {
  return cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Fonction pour créer les villes
async function createCities() {
  try {
    console.log('🚀 Début de la création des villes...');
    
    for (const [cityName, content] of Object.entries(cityContent)) {
      const slug = createSlug(cityName);
      
      // Vérifier si la ville existe déjà
      const existingCity = await prisma.cityPage.findUnique({
        where: { slug }
      });
      
      if (existingCity) {
        console.log(`⚠️  La ville ${cityName} existe déjà (slug: ${slug})`);
        continue;
      }
      
      // Créer la ville
      const newCity = await prisma.cityPage.create({
        data: {
          cityName,
          slug,
          backgroundImage: content.backgroundImage,
          citySectionTitle: content.citySectionTitle,
          citySectionSubtitle: content.citySectionSubtitle,
          citySectionParagraphs: content.citySectionParagraphs
        }
      });
      
      console.log(`✅ Ville créée: ${cityName} (slug: ${slug})`);
    }
    
    console.log('🎉 Création des villes terminée !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des villes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
createCities(); 