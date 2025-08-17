const fs = require('fs');
const path = require('path');

// Nouvelles traductions FAQ orientées vignobles
const newFaqTranslations = {
  fr: {
    title: "Questions Fréquentes - Vignobles et {cityName}",
    subtitle: "Tout ce que vous devez savoir pour organiser votre séjour à {cityName} et découvrir ses vignobles locaux",
    q1: {
      question: "Quelle est la meilleure période pour visiter {cityName} et découvrir ses vignobles locaux ?",
      answer: "La meilleure période pour visiter {cityName} et ses vignobles s'étend d'avril à octobre. Le printemps offre des paysages magnifiques avec les vignes en fleurs, l'été permet de profiter pleinement des dégustations de vins et des activités viticoles, et l'automne offre les vendanges et des couleurs spectaculaires. L'hiver, bien que plus calme, permet de découvrir les caves et déguster les vins de garde dans une atmosphère intimiste.",
      category: "location"
    },
    q2: {
      question: "Combien de temps faut-il pour découvrir les vignobles et domaines viticoles autour de {cityName} ?",
      answer: "Pour une découverte complète des vignobles autour de {cityName}, nous recommandons au moins 3 à 4 jours. Cela vous permettra de visiter les domaines viticoles locaux, participer aux dégustations, découvrir les caves historiques, et profiter des activités viticoles. Pour une expérience plus approfondie avec Le Clos des Rossignols, une semaine est idéale.",
      category: "planning"
    },
    q3: {
      question: "Comment se déplacer entre les vignobles et domaines viticoles depuis {cityName} ?",
      answer: "La voiture est le moyen de transport le plus pratique pour explorer les vignobles autour de {cityName}. Les domaines viticoles sont bien reliés par des routes départementales. Des circuits viticoles organisés sont également disponibles depuis {cityName}, et Le Clos des Rossignols propose des services de transport personnalisés pour nos clients.",
      category: "transport"
    },
    q4: {
      question: "Quels sont les restaurants et domaines viticoles recommandés à proximité de {cityName} ?",
      answer: "La région autour de {cityName} regorge d'excellents restaurants et domaines viticoles proposant une cuisine traditionnelle française et des spécialités locales. Nous recommandons particulièrement les restaurants gastronomiques des vignobles, les fermes-auberges authentiques, et les établissements proposant des vins locaux. Le Clos des Rossignols peut vous fournir une liste personnalisée selon vos préférences.",
      category: "food"
    },
    q5: {
      question: "Y a-t-il des activités pour les enfants dans les vignobles autour de {cityName} ?",
      answer: "Absolument ! Les vignobles autour de {cityName} proposent de nombreuses activités familiales. Les domaines viticoles organisent des visites adaptées aux enfants, des ateliers de découverte du raisin, et des activités ludiques. De nombreuses activités de plein air sont également disponibles : randonnées dans les vignes, vélo entre les domaines, et découverte de la nature viticole.",
      category: "family"
    },
    q6: {
      question: "Peut-on visiter les vignobles et caves autour de {cityName} en hiver ?",
      answer: "Oui, la plupart des vignobles et caves autour de {cityName} sont ouverts toute l'année, avec des horaires adaptés en hiver. Cette période offre l'avantage d'une fréquentation moindre et d'une atmosphère plus authentique. Les caves sont particulièrement agréables en hiver pour déguster les vins de garde et découvrir les secrets de la vinification.",
      category: "season"
    },
    q7: {
      question: "Quels sont les hébergements disponibles à {cityName} près des vignobles ?",
      answer: "À {cityName}, vous trouverez nos maisons thématiques uniques du Clos des Rossignols, des chambres d'hôtes traditionnelles, des gîtes ruraux, et des hôtels de charme. Nos hébergements sont situés dans des cadres exceptionnels au cœur des vignobles, offrant confort moderne et authenticité viticole. Nous proposons également des formules avec petit-déjeuner et demi-pension.",
      category: "accommodation"
    },
    q8: {
      question: "Comment réserver les visites des vignobles et domaines viticoles autour de {cityName} ?",
      answer: "Nous vous recommandons de réserver vos visites des vignobles à l'avance, surtout en haute saison. Vous pouvez réserver directement sur les sites officiels des domaines viticoles, ou nous contacter pour organiser des visites guidées privées. Le Clos des Rossignols propose également des forfaits combinant hébergement et visites viticoles.",
      category: "booking"
    },
    q9: {
      question: "Y a-t-il des événements viticoles spéciaux autour de {cityName} ?",
      answer: "La région autour de {cityName} accueille de nombreux événements viticoles tout au long de l'année : festivals du vin, expositions temporaires, marchés de producteurs locaux, et célébrations traditionnelles. Les vendanges, les fêtes du vin, et les Journées du Patrimoine sont des moments forts à ne pas manquer.",
      category: "events"
    },
    q10: {
      question: "Quels sont les produits viticoles et locaux de {cityName} à rapporter ?",
      answer: "La région de {cityName} est réputée pour ses vins locaux, ses fromages de chèvre, ses confitures artisanales, et ses produits du terroir. Les vignobles proposent souvent leurs propres boutiques avec des produits de qualité. Nous recommandons également les produits des artisans locaux : vins, liqueurs, et spécialités viticoles.",
      category: "shopping"
    },
    q11: {
      question: "Comment organiser un séjour romantique dans les vignobles autour de {cityName} ?",
      answer: "Pour un séjour romantique dans les vignobles autour de {cityName}, nous proposons des packages spéciaux incluant hébergement dans nos maisons les plus romantiques du Clos des Rossignols, dîners aux chandelles, visites privées des vignobles, et activités en couple comme des balades dans les vignes ou des dégustations de vins intimistes.",
      category: "romance"
    },
    q12: {
      question: "Peut-on faire des randonnées dans les vignobles autour de {cityName} ?",
      answer: "Les vignobles autour de {cityName} offrent de nombreux sentiers de randonnée, notamment des circuits entre les domaines viticoles et des chemins dans la campagne viticole. Les chemins sont bien balisés et accessibles à tous niveaux. Le Clos des Rossignols propose des cartes détaillées et des guides pour vous accompagner dans vos découvertes.",
      category: "outdoor"
    },
    q13: {
      question: "Quels sont les horaires d'ouverture des vignobles autour de {cityName} ?",
      answer: "Les vignobles autour de {cityName} sont généralement ouverts toute l'année, avec des horaires variables selon les saisons. En été, ils sont souvent ouverts de 9h à 19h, en hiver de 9h à 17h. Nous recommandons de réserver à l'avance pour les dégustations et visites guidées.",
      category: "nature"
    },
    q14: {
      question: "Comment se rendre à {cityName} et ses vignobles depuis Paris ?",
      answer: "Depuis Paris, vous pouvez rejoindre {cityName} et ses vignobles en train (gare de Saint-Aignan-sur-Cher à 15 minutes), en voiture (environ 2h30 par l'A10), ou en bus. Le Clos des Rossignols propose également un service de transfert depuis les gares et aéroports pour faciliter votre arrivée.",
      category: "culture"
    },
    q15: {
      question: "Y a-t-il des activités pour les personnes à mobilité réduite dans les vignobles autour de {cityName} ?",
      answer: "Oui, la plupart des vignobles autour de {cityName} sont adaptés aux personnes à mobilité réduite. Les domaines viticoles proposent des visites spécialement conçues, et nos hébergements du Clos des Rossignols sont équipés pour accueillir tous les types de visiteurs. Nous pouvons organiser des visites personnalisées selon vos besoins.",
      category: "tips"
    }
  },
  en: {
    title: "Frequently Asked Questions - Vineyards and {cityName}",
    subtitle: "Everything you need to know to organize your stay in {cityName} and discover its local vineyards",
    q1: {
      question: "What is the best time to visit {cityName} and discover its local vineyards?",
      answer: "The best time to visit {cityName} and its vineyards extends from April to October. Spring offers magnificent landscapes with vineyards in bloom, summer allows you to fully enjoy wine tastings and viticultural activities, and autumn offers grape harvests and spectacular colors. Winter, although quieter, allows you to discover wine cellars and taste aged wines in an intimate atmosphere.",
      category: "location"
    },
    q2: {
      question: "How long does it take to discover the vineyards and wine estates around {cityName}?",
      answer: "For a complete discovery of the vineyards around {cityName}, we recommend at least 3 to 4 days. This will allow you to visit local wine estates, participate in tastings, discover historic cellars, and enjoy viticultural activities. For a more in-depth experience with Le Clos des Rossignols, a week is ideal.",
      category: "planning"
    },
    q3: {
      question: "How to get around between vineyards and wine estates from {cityName}?",
      answer: "The car is the most practical means of transport to explore the vineyards around {cityName}. Wine estates are well connected by departmental roads. Organized wine tours are also available from {cityName}, and Le Clos des Rossignols offers personalized transport services for our clients.",
      category: "transport"
    },
    q4: {
      question: "What are the recommended restaurants and wine estates near {cityName}?",
      answer: "The region around {cityName} is full of excellent restaurants and wine estates offering traditional French cuisine and local specialties. We particularly recommend the gastronomic restaurants of vineyards, authentic farm inns, and establishments offering local wines. Le Clos des Rossignols can provide you with a personalized list according to your preferences.",
      category: "food"
    },
    q5: {
      question: "Are there activities for children in the vineyards around {cityName}?",
      answer: "Absolutely! The vineyards around {cityName} offer many family activities. Wine estates organize visits adapted for children, grape discovery workshops, and fun activities. Many outdoor activities are also available: hiking in vineyards, cycling between estates, and discovering viticultural nature.",
      category: "family"
    },
    q6: {
      question: "Can you visit vineyards and cellars around {cityName} in winter?",
      answer: "Yes, most vineyards and cellars around {cityName} are open year-round, with adapted hours in winter. This period offers the advantage of lower attendance and a more authentic atmosphere. Cellars are particularly pleasant in winter for tasting aged wines and discovering the secrets of winemaking.",
      category: "season"
    },
    q7: {
      question: "What accommodations are available in {cityName} near the vineyards?",
      answer: "In {cityName}, you will find our unique thematic houses from Le Clos des Rossignols, traditional guest rooms, rural cottages, and charming hotels. Our accommodations are located in exceptional settings in the heart of vineyards, offering modern comfort and viticultural authenticity. We also offer packages with breakfast and half-board.",
      category: "accommodation"
    },
    q8: {
      question: "How to book vineyard and wine estate visits around {cityName}?",
      answer: "We recommend booking your vineyard visits in advance, especially during high season. You can book directly on the official wine estate websites, or contact us to organize private guided tours. Le Clos des Rossignols also offers packages combining accommodation and wine tours.",
      category: "booking"
    },
    q9: {
      question: "Are there special wine events around {cityName}?",
      answer: "The region around {cityName} hosts many wine events throughout the year: wine festivals, temporary exhibitions, local producer markets, and traditional celebrations. Grape harvests, wine festivals, and Heritage Days are highlights not to be missed.",
      category: "events"
    },
    q10: {
      question: "What wine and local products from {cityName} to bring back?",
      answer: "The region of {cityName} is renowned for its local wines, goat cheeses, artisanal jams, and local products. Vineyards often have their own shops with quality products. We also recommend products from local artisans: wines, liqueurs, and wine specialties.",
      category: "shopping"
    },
    q11: {
      question: "How to organize a romantic stay in the vineyards around {cityName}?",
      answer: "For a romantic stay in the vineyards around {cityName}, we offer special packages including accommodation in our most romantic houses at Le Clos des Rossignols, candlelit dinners, private vineyard visits, and couple activities such as walks in the vineyards or intimate wine tastings.",
      category: "romance"
    },
    q12: {
      question: "Can you go hiking in the vineyards around {cityName}?",
      answer: "The vineyards around {cityName} offer many hiking trails, including circuits between wine estates and paths in the viticultural countryside. The paths are well marked and accessible to all levels. Le Clos des Rossignols provides detailed maps and guides to accompany you in your discoveries.",
      category: "outdoor"
    },
    q13: {
      question: "What are the opening hours of vineyards around {cityName}?",
      answer: "Vineyards around {cityName} are generally open year-round, with variable hours depending on the season. In summer, they are often open from 9am to 7pm, in winter from 9am to 5pm. We recommend booking in advance for tastings and guided tours.",
      category: "nature"
    },
    q14: {
      question: "How to get to {cityName} and its vineyards from Paris?",
      answer: "From Paris, you can reach {cityName} and its vineyards by train (Saint-Aignan-sur-Cher station 15 minutes away), by car (about 2h30 via A10), or by bus. Le Clos des Rossignols also offers a transfer service from stations and airports to facilitate your arrival.",
      category: "culture"
    },
    q15: {
      question: "Are there activities for people with reduced mobility in the vineyards around {cityName}?",
      answer: "Yes, most vineyards around {cityName} are adapted for people with reduced mobility. Wine estates offer specially designed visits, and our accommodations at Le Clos des Rossignols are equipped to welcome all types of visitors. We can organize personalized visits according to your needs.",
      category: "tips"
    }
  },
  de: {
    title: "Häufig gestellte Fragen - Weingüter und {cityName}",
    subtitle: "Alles, was Sie wissen müssen, um Ihren Aufenthalt in {cityName} zu organisieren und seine lokalen Weingüter zu entdecken",
    q1: {
      question: "Wann ist die beste Zeit, {cityName} und seine lokalen Weingüter zu besuchen?",
      answer: "Die beste Zeit für einen Besuch in {cityName} und seinen Weingütern erstreckt sich von April bis Oktober. Der Frühling bietet herrliche Landschaften mit blühenden Weinreben, der Sommer ermöglicht es Ihnen, Weindegustationen und weinbauliche Aktivitäten voll zu genießen, und der Herbst bietet die Weinlese und spektakuläre Farben. Der Winter, obwohl ruhiger, ermöglicht es Ihnen, Weinkeller zu entdecken und gereifte Weine in einer intimeren Atmosphäre zu genießen.",
      category: "location"
    },
    q2: {
      question: "Wie lange dauert es, die Weingüter und Weinberge rund um {cityName} zu entdecken?",
      answer: "Für eine vollständige Entdeckung der Weingüter rund um {cityName} empfehlen wir mindestens 3 bis 4 Tage. Dies ermöglicht es Ihnen, lokale Weinberge zu besuchen, an Degustationen teilzunehmen, historische Keller zu entdecken und weinbauliche Aktivitäten zu genießen. Für eine intensivere Erfahrung mit Le Clos des Rossignols ist eine Woche ideal.",
      category: "planning"
    },
    q3: {
      question: "Wie kommt man zwischen den Weingütern und Weinbergen von {cityName} aus herum?",
      answer: "Das Auto ist das praktischste Verkehrsmittel, um die Weingüter rund um {cityName} zu erkunden. Die Weinberge sind gut durch Departementsstraßen verbunden. Organisierte Weintouren sind auch von {cityName} aus verfügbar, und Le Clos des Rossignols bietet personalisierte Transportdienste für unsere Kunden an.",
      category: "transport"
    },
    q4: {
      question: "Welche Restaurants und Weingüter werden in der Nähe von {cityName} empfohlen?",
      answer: "Die Region rund um {cityName} ist voll von ausgezeichneten Restaurants und Weingütern, die traditionelle französische Küche und lokale Spezialitäten anbieten. Wir empfehlen besonders die gastronomischen Restaurants der Weingüter, authentische Bauernhöfe und Einrichtungen, die lokale Weine anbieten. Le Clos des Rossignols kann Ihnen eine personalisierte Liste nach Ihren Vorlieben zur Verfügung stellen.",
      category: "food"
    },
    q5: {
      question: "Gibt es Aktivitäten für Kinder in den Weingütern rund um {cityName}?",
      answer: "Absolut! Die Weingüter rund um {cityName} bieten viele Familienaktivitäten. Weinberge organisieren für Kinder angepasste Besuche, Traubenentdeckungsworkshops und lustige Aktivitäten. Viele Outdoor-Aktivitäten sind ebenfalls verfügbar: Wandern in Weinbergen, Radfahren zwischen Weingütern und Entdeckung der weinbaulichen Natur.",
      category: "family"
    },
    q6: {
      question: "Kann man Weingüter und Keller rund um {cityName} im Winter besuchen?",
      answer: "Ja, die meisten Weingüter und Keller rund um {cityName} sind das ganze Jahr über geöffnet, mit angepassten Stunden im Winter. Diese Zeit bietet den Vorteil einer geringeren Besucherzahl und einer authentischeren Atmosphäre. Keller sind im Winter besonders angenehm für die Verkostung gereifter Weine und die Entdeckung der Geheimnisse des Weinbaus.",
      category: "season"
    },
    q7: {
      question: "Welche Unterkünfte sind in {cityName} in der Nähe der Weingüter verfügbar?",
      answer: "In {cityName} finden Sie unsere einzigartigen thematischen Häuser vom Clos des Rossignols, traditionelle Gästezimmer, ländliche Ferienhäuser und charmante Hotels. Unsere Unterkünfte befinden sich in außergewöhnlichen Umgebungen im Herzen der Weingüter und bieten modernen Komfort und weinbauliche Authentizität. Wir bieten auch Pakete mit Frühstück und Halbpension an.",
      category: "accommodation"
    },
    q8: {
      question: "Wie bucht man Weingut- und Weinbergbesuche rund um {cityName}?",
      answer: "Wir empfehlen, Ihre Weingutbesuche im Voraus zu buchen, besonders in der Hochsaison. Sie können direkt auf den offiziellen Weingutwebsites buchen oder uns kontaktieren, um private geführte Touren zu organisieren. Le Clos des Rossignols bietet auch Pakete an, die Unterkunft und Weintouren kombinieren.",
      category: "booking"
    },
    q9: {
      question: "Gibt es besondere Weinevents rund um {cityName}?",
      answer: "Die Region rund um {cityName} veranstaltet das ganze Jahr über viele Weinevents: Weinfeste, temporäre Ausstellungen, lokale Produzentenmärkte und traditionelle Feiern. Weinlese, Weinfeste und Kulturerbetage sind Höhepunkte, die man nicht verpassen sollte.",
      category: "events"
    },
    q10: {
      question: "Welche Wein- und lokale Produkte aus {cityName} sollte man mitbringen?",
      answer: "Die Region von {cityName} ist bekannt für ihre lokalen Weine, Ziegenkäse, handgemachte Marmeladen und lokale Produkte. Weingüter haben oft ihre eigenen Geschäfte mit Qualitätsprodukten. Wir empfehlen auch Produkte von lokalen Handwerkern: Weine, Liköre und Weinspezialitäten.",
      category: "shopping"
    },
    q11: {
      question: "Wie organisiert man einen romantischen Aufenthalt in den Weingütern rund um {cityName}?",
      answer: "Für einen romantischen Aufenthalt in den Weingütern rund um {cityName} bieten wir spezielle Pakete an, die Unterkunft in unseren romantischsten Häusern im Clos des Rossignols, Kerzenlicht-Dinner, private Weingutbesuche und Paaraktivitäten wie Spaziergänge in den Weinbergen oder intime Weindegustationen beinhalten.",
      category: "romance"
    },
    q12: {
      question: "Kann man in den Weingütern rund um {cityName} wandern?",
      answer: "Die Weingüter rund um {cityName} bieten viele Wanderwege, einschließlich Rundwege zwischen Weinbergen und Wegen in der weinbaulichen Landschaft. Die Wege sind gut markiert und für alle Niveaus zugänglich. Le Clos des Rossignols stellt detaillierte Karten und Führer zur Verfügung, um Sie bei Ihren Entdeckungen zu begleiten.",
      category: "outdoor"
    },
    q13: {
      question: "Was sind die Öffnungszeiten der Weingüter rund um {cityName}?",
      answer: "Weingüter rund um {cityName} sind in der Regel das ganze Jahr über geöffnet, mit variablen Stunden je nach Saison. Im Sommer sind sie oft von 9 bis 19 Uhr geöffnet, im Winter von 9 bis 17 Uhr. Wir empfehlen, im Voraus für Degustationen und geführte Touren zu buchen.",
      category: "nature"
    },
    q14: {
      question: "Wie kommt man von Paris nach {cityName} und seinen Weingütern?",
      answer: "Von Paris aus können Sie {cityName} und seine Weingüter mit dem Zug erreichen (Bahnhof Saint-Aignan-sur-Cher 15 Minuten entfernt), mit dem Auto (etwa 2h30 über die A10) oder mit dem Bus. Le Clos des Rossignols bietet auch einen Transfer-Service von Bahnhöfen und Flughäfen an, um Ihre Ankunft zu erleichtern.",
      category: "culture"
    },
    q15: {
      question: "Gibt es Aktivitäten für Menschen mit eingeschränkter Mobilität in den Weingütern rund um {cityName}?",
      answer: "Ja, die meisten Weingüter rund um {cityName} sind für Menschen mit eingeschränkter Mobilität angepasst. Weinberge bieten speziell konzipierte Besuche an, und unsere Unterkünfte im Clos des Rossignols sind ausgestattet, um alle Arten von Besuchern zu empfangen. Wir können personalisierte Besuche nach Ihren Bedürfnissen organisieren.",
      category: "tips"
    }
  },
  es: {
    title: "Preguntas Frecuentes - Viñedos y {cityName}",
    subtitle: "Todo lo que necesitas saber para organizar tu estancia en {cityName} y descubrir sus viñedos locales",
    q1: {
      question: "¿Cuál es la mejor época para visitar {cityName} y descubrir sus viñedos locales?",
      answer: "La mejor época para visitar {cityName} y sus viñedos se extiende de abril a octubre. La primavera ofrece paisajes magníficos con vides en flor, el verano permite disfrutar plenamente de las catas de vino y actividades vitícolas, y el otoño ofrece la vendimia y colores espectaculares. El invierno, aunque más tranquilo, permite descubrir las bodegas y degustar vinos de guarda en una atmósfera íntima.",
      category: "location"
    },
    q2: {
      question: "¿Cuánto tiempo se necesita para descubrir los viñedos y bodegas alrededor de {cityName}?",
      answer: "Para una descubierta completa de los viñedos alrededor de {cityName}, recomendamos al menos 3 a 4 días. Esto te permitirá visitar las bodegas locales, participar en catas, descubrir bodegas históricas y disfrutar de actividades vitícolas. Para una experiencia más profunda con Le Clos des Rossignols, una semana es ideal.",
      category: "planning"
    },
    q3: {
      question: "¿Cómo moverse entre los viñedos y bodegas desde {cityName}?",
      answer: "El coche es el medio de transporte más práctico para explorar los viñedos alrededor de {cityName}. Las bodegas están bien conectadas por carreteras departamentales. También hay circuitos vitícolas organizados disponibles desde {cityName}, y Le Clos des Rossignols ofrece servicios de transporte personalizados para nuestros clientes.",
      category: "transport"
    },
    q4: {
      question: "¿Qué restaurantes y bodegas se recomiendan cerca de {cityName}?",
      answer: "La región alrededor de {cityName} está llena de excelentes restaurantes y bodegas que ofrecen cocina tradicional francesa y especialidades locales. Recomendamos especialmente los restaurantes gastronómicos de los viñedos, las granjas-posadas auténticas, y los establecimientos que ofrecen vinos locales. Le Clos des Rossignols puede proporcionarte una lista personalizada según tus preferencias.",
      category: "food"
    },
    q5: {
      question: "¿Hay actividades para niños en los viñedos alrededor de {cityName}?",
      answer: "¡Absolutamente! Los viñedos alrededor de {cityName} ofrecen muchas actividades familiares. Las bodegas organizan visitas adaptadas para niños, talleres de descubrimiento de uvas y actividades divertidas. También hay muchas actividades al aire libre disponibles: senderismo en viñedos, ciclismo entre bodegas y descubrimiento de la naturaleza vitícola.",
      category: "family"
    },
    q6: {
      question: "¿Se pueden visitar viñedos y bodegas alrededor de {cityName} en invierno?",
      answer: "Sí, la mayoría de los viñedos y bodegas alrededor de {cityName} están abiertos todo el año, con horarios adaptados en invierno. Este período ofrece la ventaja de una menor afluencia y una atmósfera más auténtica. Las bodegas son particularmente agradables en invierno para degustar vinos de guarda y descubrir los secretos de la vinificación.",
      category: "season"
    },
    q7: {
      question: "¿Qué alojamientos están disponibles en {cityName} cerca de los viñedos?",
      answer: "En {cityName}, encontrarás nuestras casas temáticas únicas de Le Clos des Rossignols, habitaciones de huéspedes tradicionales, casas rurales y hoteles con encanto. Nuestros alojamientos están ubicados en entornos excepcionales en el corazón de los viñedos, ofreciendo comodidad moderna y autenticidad vitícola. También ofrecemos paquetes con desayuno y media pensión.",
      category: "accommodation"
    },
    q8: {
      question: "¿Cómo reservar visitas a viñedos y bodegas alrededor de {cityName}?",
      answer: "Te recomendamos reservar tus visitas a viñedos con anticipación, especialmente en temporada alta. Puedes reservar directamente en los sitios web oficiales de las bodegas, o contactarnos para organizar visitas guiadas privadas. Le Clos des Rossignols también ofrece paquetes que combinan alojamiento y tours de vino.",
      category: "booking"
    },
    q9: {
      question: "¿Hay eventos especiales de vino alrededor de {cityName}?",
      answer: "La región alrededor de {cityName} acoge muchos eventos de vino durante todo el año: festivales de vino, exposiciones temporales, mercados de productores locales y celebraciones tradicionales. Las vendimias, las fiestas del vino y las Jornadas del Patrimonio son momentos destacados que no te puedes perder.",
      category: "events"
    },
    q10: {
      question: "¿Qué productos vitícolas y locales de {cityName} traer?",
      answer: "La región de {cityName} es conocida por sus vinos locales, quesos de cabra, mermeladas artesanales y productos del terroir. Los viñedos suelen tener sus propias tiendas con productos de calidad. También recomendamos los productos de los artesanos locales: vinos, licores y especialidades vitícolas.",
      category: "shopping"
    },
    q11: {
      question: "¿Cómo organizar una estancia romántica en los viñedos alrededor de {cityName}?",
      answer: "Para una estancia romántica en los viñedos alrededor de {cityName}, ofrecemos paquetes especiales que incluyen alojamiento en nuestras casas más románticas de Le Clos des Rossignols, cenas a la luz de las velas, visitas privadas a viñedos y actividades en pareja como paseos por los viñedos o catas de vino íntimas.",
      category: "romance"
    },
    q12: {
      question: "¿Se puede hacer senderismo en los viñedos alrededor de {cityName}?",
      answer: "Los viñedos alrededor de {cityName} ofrecen muchos senderos de senderismo, incluyendo circuitos entre bodegas y caminos en el campo vitícola. Los caminos están bien señalizados y son accesibles para todos los niveles. Le Clos des Rossignols proporciona mapas detallados y guías para acompañarte en tus descubrimientos.",
      category: "outdoor"
    },
    q13: {
      question: "¿Cuáles son los horarios de apertura de los viñedos alrededor de {cityName}?",
      answer: "Los viñedos alrededor de {cityName} generalmente están abiertos todo el año, con horarios variables según la temporada. En verano, a menudo están abiertos de 9:00 a 19:00, en invierno de 9:00 a 17:00. Recomendamos reservar con anticipación para catas y tours guiados.",
      category: "nature"
    },
    q14: {
      question: "¿Cómo llegar a {cityName} y sus viñedos desde París?",
      answer: "Desde París, puedes llegar a {cityName} y sus viñedos en tren (estación de Saint-Aignan-sur-Cher a 15 minutos), en coche (aproximadamente 2h30 por la A10) o en autobús. Le Clos des Rossignols también ofrece un servicio de traslado desde estaciones y aeropuertos para facilitar tu llegada.",
      category: "culture"
    },
    q15: {
      question: "¿Hay actividades para personas con movilidad reducida en los viñedos alrededor de {cityName}?",
      answer: "Sí, la mayoría de los viñedos alrededor de {cityName} están adaptados para personas con movilidad reducida. Las bodegas ofrecen visitas especialmente diseñadas, y nuestros alojamientos en Le Clos des Rossignols están equipados para recibir a todo tipo de visitantes. Podemos organizar visitas personalizadas según tus necesidades.",
      category: "tips"
    }
  }
};

// Fonction pour mettre à jour un fichier de langue
function updateLanguageFile(lang) {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Fichier ${filePath} non trouvé`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // Mettre à jour la section FAQ
    if (data.cities && data.cities.dynamic) {
      data.cities.dynamic.faq = newFaqTranslations[lang];
      console.log(`✅ FAQ mise à jour pour ${lang}`);
    } else {
      console.log(`❌ Section cities.dynamic.faq non trouvée dans ${lang}`);
    }

    // Écrire le fichier mis à jour
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Fichier ${lang}.json mis à jour`);

  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de ${lang}.json:`, error.message);
  }
}

// Mettre à jour tous les fichiers de langue
console.log('🚀 Mise à jour des traductions FAQ...\n');

['fr', 'en', 'de', 'es'].forEach(lang => {
  updateLanguageFile(lang);
});

console.log('\n✨ Mise à jour terminée !'); 