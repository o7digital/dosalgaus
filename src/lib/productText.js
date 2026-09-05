const DESCRIPTION_FIELDS = ['description', 'short_description'];
const TEXT_FIELDS = ['name', ...DESCRIPTION_FIELDS];
const CATEGORY_NAME_OVERRIDES = {
  bags: 'Bolsos',
  briefcase: 'Maletines',
  corbatas: 'Corbatas',
  electronics: 'Electronica',
  garden: 'Jardin',
  luggage: 'Maletas',
  luggages: 'Maletas',
  'hombre jackets': 'Chaquetas para hombre',
  'men jackets': 'Chaquetas para hombre',
  'mens jackets': 'Chaquetas para hombre',
  "men's jackets": 'Chaquetas para hombre',
  'men sweater': 'Sueteres para hombre',
  'mens sweater': 'Sueteres para hombre',
  "men's sweater": 'Sueteres para hombre',
  'mens tshirts': 'Camisetas para hombre',
  'mens t-shirts': 'Camisetas para hombre',
  scooters: 'Scooters',
  shoes: 'Zapatos',
  'travel bags': 'Bolsos de viaje',
  watches: 'Relojes',
  'womens jackets': 'Chaquetas para mujer',
  "women's jackets": 'Chaquetas para mujer',
};

const ENGLISH_CATEGORY_NAME_OVERRIDES = {
  luggage: 'Luggage',
  luggages: 'Luggage',
  'hombre jackets': "Men's Jackets",
  'men jackets': "Men's Jackets",
  'mens jackets': "Men's Jackets",
  "men's jackets": "Men's Jackets",
  'travel bags': 'Travel Bags',
};

const SPANISH_PRODUCT_OVERRIDES = {
  846: ['Bolsas de compresión al vacío con bomba para equipaje', 'Juego de bolsas de compresión que reduce el volumen de la ropa y ayuda a organizar maletas y mochilas. Incluye una bomba compacta para viajar.'],
  831: ['Maleta de 20/24 pulgadas con cierre TSA y soporte para teléfono', 'Maleta resistente con asa telescópica, tres asas de transporte, cierre TSA, ruedas silenciosas y soporte integrado para teléfono.'],
  814: ['Funda protectora transparente para maleta de 22 pulgadas', 'Funda transparente con cierre de velcro que protege la maleta contra suciedad, rayones y desgaste durante el viaje.'],
  806: ['Maleta de gran capacidad con apertura frontal, portavasos y USB', 'Diseño de apertura frontal con barra telescópica ancha, portavasos plegable y conexión USB para mayor comodidad durante el viaje.'],
  790: ['Maleta 2026 con marco de aluminio, de 20 a 28 pulgadas', 'Maleta de gran capacidad en ABS y policarbonato, con marco de aluminio y apertura frontal. Disponible en varios tamaños.'],
  773: ['Maleta de 16 pulgadas con cierre TSA y ruedas giratorias 360°', 'Maleta compacta con cierre TSA, asa telescópica y ruedas multidireccionales para desplazarse con facilidad.'],
  760: ['Bolsa trolley de 18 pulgadas y gran capacidad', 'Bolsa de viaje en tela Oxford con forro de poliéster, ruedas y correas acolchadas. Práctica para viajes cortos y uso diario.'],
  748: ['Bolso organizador retro de gran capacidad para hombre', 'Bolso de hombro de estilo retro, fabricado en PU resistente al agua, con varios compartimentos para organizar tus objetos personales.'],
  733: ['Bolsa de viaje impermeable de gran capacidad', 'Bolsa amplia y resistente al agua, pensada para viajes, escapadas de fin de semana y actividades al aire libre.'],
  725: ['Juego de 3 maletas multifuncionales en azul marino', 'Juego coordinado de tres piezas con amplio espacio de almacenamiento para organizar cómodamente viajes cortos o largos.'],
  702: ['Juego de 3 maletas ABS de 20, 24 y 28 pulgadas', 'Juego de maletas rígidas y ligeras con cierre TSA, ruedas giratorias y tres tamaños para adaptarse a cada viaje.'],
  641: ['Chaqueta para hombre de primavera y otoño', 'Chaqueta casual y versátil para entretiempo. Consulta la tabla de medidas antes de elegir; las tallas asiáticas suelen ser menores.'],
  580: ['Chaqueta holgada para hombre de primavera y otoño', 'Chaqueta ligera de corte cómodo para uso diario. Consulta la tabla de medidas antes de elegir; las tallas asiáticas suelen ser menores.'],
  553: ['Chaqueta casual tipo traje para hombre', 'Chaqueta de estilo elegante y casual, fácil de combinar. Consulta la tabla de medidas antes de elegir; las tallas asiáticas suelen ser menores.'],
  519: ['Chaqueta de talla grande para hombre', 'Chaqueta casual de corte amplio, diseñada para brindar comodidad durante el uso diario. Revisa la tabla de medidas antes de elegir.'],
  456: ['Chaqueta entallada de pana con solapa para hombre', 'Chaqueta de pana con solapa y corte entallado, ideal para un estilo casual elegante en entretiempo.'],
  417: ['Chaqueta de motociclista en cuero PU lavado para hombre', 'Chaqueta de estilo motociclista con acabado lavado y aspecto vintage, confeccionada en cuero PU.'],
  382: ['Chaqueta de cuello clásico para hombre', 'Chaqueta casual con cuello clásico, cómoda y fácil de combinar. Consulta la tabla de medidas antes de elegir.'],
  338: ['Abrigo-chaqueta de otoño para hombre', 'Prenda casual para otoño que combina la comodidad de una chaqueta con una cobertura ligera. Revisa la tabla de medidas.'],
  247: ['Chaqueta casual coreana de otoño para hombre', 'Chaqueta de inspiración coreana con corte moderno para uso diario durante el otoño.'],
  216: ['Chaqueta de pana para hombre, otoño e invierno', 'Chaqueta de pana cálida y versátil para los meses más frescos. Consulta la tabla de medidas antes de elegir.'],
  189: ['Chaqueta casual coreana estilo workwear para hombre', 'Chaqueta de trabajo de inspiración coreana, con diseño casual y funcional para el día a día.'],
  161: ['Chaqueta vaquera retro desgastada para hombre', 'Chaqueta de mezclilla con acabado desgastado y estilo retro, pensada para conjuntos casuales.'],
  136: ['Chaqueta holgada de ante estilo universitario para hombre', 'Chaqueta de ante con corte holgado y detalles de inspiración universitaria. Consulta la tabla de medidas antes de elegir.'],
  88: ['Chaqueta casual tipo uniforme para hombre', 'Chaqueta de líneas sencillas y estilo uniforme, cómoda para combinar con prendas casuales.'],
  26: ['Chaqueta polar retro de doble cara para hombre', 'Chaqueta polar cálida de doble cara y estilo retro, ideal para los días fríos.'],
};

const ENGLISH_REPLACEMENTS = [
  ['bolsas de viaje', 'travel bags'],
  ['bolsos de viaje', 'travel bags'],
  ['fundas para maletas', 'luggage covers'],
  ['pulgadas', 'inches'],
  ['organizadores', 'organizers'],
  ['organizador', 'organizer'],
  ['mochilas', 'backpacks'],
  ['mochila', 'backpack'],
  ['maletas', 'luggage'],
  ['maleta', 'suitcase'],
  ['bolsos', 'bags'],
  ['bolso', 'bag'],
  ['hombre', "men's"],
  ['mujer', "women's"],
  ['ropa', 'clothing'],
  ['para', 'for'],
  ['con', 'with'],
];

const SPANISH_REPLACEMENTS = [
  ['cross-border', 'importacion'],
  ['briefcases', 'maletines'],
  ['briefcase', 'maletin'],
  ['electronics', 'electronica'],
  ['electronic', 'electronico'],
  ['garden', 'jardin'],
  ['men sweater', 'sueter para hombre'],
  ['mens sweater', 'sueter para hombre'],
  ["men's sweater", 'sueter para hombre'],
  ['sweaters', 'sueteres'],
  ['sweater', 'sueter'],
  ['travel bags', 'bolsos de viaje'],
  ['travel bag', 'bolso de viaje'],
  ['womens jackets', 'chaquetas para mujer'],
  ["women's jackets", 'chaquetas para mujer'],
  ['watches', 'relojes'],
  ['watch', 'reloj'],
  ['scooters', 'scooters'],
  ['scooter', 'scooter'],
  ['shoes', 'zapatos'],
  ['shoe', 'zapato'],
  ['mens business', 'hombre ejecutivo'],
  ["men's business", 'hombre ejecutivo'],
  ['business large-capacity', 'ejecutivo de gran capacidad'],
  ['large-capacity', 'gran capacidad'],
  ['shouldercrossbody', 'de hombro y cruzado'],
  ['shoulder crossbody', 'de hombro y cruzado'],
  ['crossbody', 'cruzado'],
  ['simple briefcase', 'maletin sencillo'],
  ['laptop bag', 'bolsa para laptop'],
  ['bags', 'bolsos'],
  ['bag', 'bolso'],
  ['laptop', 'laptop'],
  ['computer', 'computadora'],
  ['messenger bag', 'bolso mensajero'],
  ['handbag', 'bolso de mano'],
  ['cowhide', 'cuero vacuno'],
  ['oily leather', 'cuero engrasado'],
  ['leather', 'cuero'],
  ['first layer', 'primera capa'],
  ['high-end', 'alta gama'],
  ['high end', 'alta gama'],
  ['wide-width', 'ancho'],
  ['wide width', 'ancho'],
  ['vintage style', 'estilo vintage'],
  ['shoulder liner', 'forro de hombro'],
  ['shoulder', 'hombro'],
  ['portable', 'portatil'],
  ['clutch casual business', 'bolso clutch casual ejecutivo'],
  ['clutch large', 'clutch grande'],
  ['clutch', 'bolso clutch'],
  ['casual business', 'casual ejecutivo'],
  ['shoulder bag', 'bolso de hombro'],
  ['polyester jacquard', 'jacquard de poliester'],
  ['polyester', 'poliester'],
  ['yarn-dyed', 'tenido en hilo'],
  ['yarn dyed', 'tenido en hilo'],
  ['direct-supply', 'venta directa'],
  ['direct supply', 'venta directa'],
  ['jacquard', 'jacquard'],
  ['striped tie', 'corbata a rayas'],
  ['tie', 'corbata'],
  ['formal', 'formal'],
  ['sportswear fitness', 'ropa deportiva fitness'],
  ['sportswear', 'ropa deportiva'],
  ['fitness', 'fitness'],
  ['short-sleeve', 'manga corta'],
  ['short sleeve', 'manga corta'],
  ['t-shirt', 'camiseta'],
  ['tshirt', 'camiseta'],
  ['mesh-textured', 'textura de malla'],
  ['mesh textured', 'textura de malla'],
  ['breathable mesh', 'malla transpirable'],
  ['breathable', 'transpirable'],
  ['patchwork design', 'diseno patchwork'],
  ['patchwork', 'patchwork'],
  ['summer mens wear', 'ropa de verano para hombre'],
  ["summer men's wear", 'ropa de verano para hombre'],
  ['mens wear', 'ropa para hombre'],
  ["men's wear", 'ropa para hombre'],
  ['mens tshirts', 'camisetas para hombre'],
  ["men's tshirts", 'camisetas para hombre'],
  ['mens t-shirts', 'camisetas para hombre'],
  ["men's t-shirts", 'camisetas para hombre'],
  ['mens', 'hombre'],
  ["men's", 'hombre'],
  ['men', 'hombre'],
  ['summer', 'verano'],
  ['business', 'ejecutivo'],
  ['capacity', 'capacidad'],
  ['large', 'grande'],
  ['small', 'pequeno'],
  ['new', 'nuevo'],
  ['purchase notes', 'notas de compra'],
  ['this product does not have abe', 'este producto no cuenta con ABE'],
  ['if it is returned because there is no abe', 'si se devuelve porque no cuenta con ABE'],
  ['if you have just received it and have not used it', 'si acabas de recibirlo y no lo has usado'],
  ['you will deduct 20% of the handling fee', 'se descontara el 20% por gastos de gestion'],
  ['loss of round-trip freight', 'costo de envio de ida y vuelta'],
  ['maintenance fee', 'costo de mantenimiento'],
  ['if you have already used it', 'si ya lo has usado'],
  ['you will not be able to get a refund', 'no sera posible obtener un reembolso'],
  ['handling fee', 'gastos de gestion'],
  ['returned', 'devuelto'],
  ['received', 'recibido'],
  ['refund', 'reembolso'],
  ['used', 'usado'],
  ['purchase', 'compra'],
  ['notes', 'notas'],
  ['high performance', 'alto rendimiento'],
  ['electric scooter', 'scooter electrico'],
  ['electric scooters', 'scooters electricos'],
  ['off-road', 'todoterreno'],
  ['off road', 'todoterreno'],
  ['large tires', 'llantas grandes'],
  ['fat tires', 'llantas anchas'],
  ['solid tires', 'llantas macizas'],
  ['pneumatic tires', 'llantas neumaticas'],
  ['foldable', 'plegable'],
  ['folding', 'plegable'],
  ['commuting', 'traslados diarios'],
  ['commuter', 'urbano'],
  ['adults', 'adultos'],
  ['adult', 'adulto'],
  ['kids', 'ninos'],
  ['children', 'ninos'],
  ['max speed', 'velocidad maxima'],
  ['maximum speed', 'velocidad maxima'],
  ['top speed', 'velocidad maxima'],
  ['range', 'autonomia'],
  ['battery capacity', 'capacidad de bateria'],
  ['powerful motor', 'motor potente'],
  ['motor power', 'potencia del motor'],
  ['brushless motor', 'motor sin escobillas'],
  ['dual motor', 'doble motor'],
  ['front suspension', 'suspension delantera'],
  ['rear suspension', 'suspension trasera'],
  ['with suspension', 'con suspension'],
  ['suspension', 'suspension'],
  ['disc brake', 'freno de disco'],
  ['disc brakes', 'frenos de disco'],
  ['brake', 'freno'],
  ['brakes', 'frenos'],
  ['maximum load', 'carga maxima'],
  ['max load', 'carga maxima'],
  ['load', 'carga'],
  ['charging time', 'tiempo de carga'],
  ['charge time', 'tiempo de carga'],
  ['charging voltage', 'voltaje de carga'],
  ['voltage', 'voltaje'],
  ['hours', 'horas'],
  ['hour', 'hora'],
  ['charger', 'cargador'],
  ['waterproof', 'resistente al agua'],
  ['water resistant', 'resistente al agua'],
  ['led light', 'luz LED'],
  ['led lights', 'luces LED'],
  ['headlight', 'luz delantera'],
  ['tail light', 'luz trasera'],
  ['display', 'pantalla'],
  ['smart display', 'pantalla inteligente'],
  ['app control', 'control por app'],
  ['cruise control', 'control de crucero'],
  ['seat', 'asiento'],
  ['with seat', 'con asiento'],
  ['without seat', 'sin asiento'],
  ['frame', 'marco'],
  ['aluminum alloy', 'aleacion de aluminio'],
  ['alloy', 'aleacion'],
  ['material', 'material'],
  ['color', 'color'],
  ['black', 'negro'],
  ['white', 'blanco'],
  ['red', 'rojo'],
  ['blue', 'azul'],
  ['brown', 'marron'],
  ['green', 'verde'],
  ['gray', 'gris'],
  ['grey', 'gris'],
  ['net weight', 'peso neto'],
  ['gross weight', 'peso bruto'],
  ['weight', 'peso'],
  ['net', 'neto'],
  ['gross', 'bruto'],
  ['package size', 'tamano del paquete'],
  ['packing size', 'tamano del empaque'],
  ['product size', 'tamano del producto'],
  ['foldable size', 'tamano plegado'],
  ['plegable size', 'tamano plegado'],
  ['wheel size', 'tamano de rueda'],
  ['tire size', 'tamano de llanta'],
  ['speed mode', 'modo de velocidad'],
  ['speed modes', 'modos de velocidad'],
  ['mileage', 'kilometraje'],
  ['max climbing angles', 'angulos maximos de subida'],
  ['climbing angles', 'angulos de subida'],
  ['climbing angle', 'angulo de subida'],
  ['hill climbing', 'subida en pendiente'],
  ['shock absorption', 'amortiguacion'],
  ['shock absorber', 'amortiguador'],
  ['features', 'caracteristicas'],
  ['specifications', 'especificaciones'],
  ['specification', 'especificacion'],
  ['description', 'descripcion'],
  ['details', 'detalles'],
  ['overview', 'resumen'],
  ['package includes', 'el paquete incluye'],
  ['included', 'incluido'],
  ['includes', 'incluye'],
  ['for adults', 'para adultos'],
  ['for', 'para'],
  ['for city travel', 'para trayectos urbanos'],
  ['for daily commuting', 'para traslados diarios'],
  ['easy to carry', 'facil de transportar'],
  ['portable', 'portatil'],
  ['lightweight', 'ligero'],
  ['durable', 'duradero'],
  ['comfortable', 'comodo'],
  ['safe', 'seguro'],
  ['safety', 'seguridad'],
  ['fast', 'rapido'],
  ['powerful', 'potente'],
  ['high power', 'alta potencia'],
  ['high speed', 'alta velocidad'],
  ['long range', 'gran autonomia'],
  ['inch', 'pulgadas'],
  ['inches', 'pulgadas'],
  ['miles', 'millas'],
  ['mile', 'milla'],
  ['mph', 'mph'],
  ['km/h', 'km/h'],
  ['warranty', 'garantia'],
  ['shipping', 'envio'],
  ['free shipping', 'envio gratis'],
  ['in stock', 'en stock'],
  ['out of stock', 'agotado'],
];

const applyReplacements = (text) => {
  return SPANISH_REPLACEMENTS.reduce((nextText, [source, target]) => {
    const pattern = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    return nextText.replace(pattern, target);
  }, text);
};

const applyEnglishReplacements = (text) => {
  return ENGLISH_REPLACEMENTS.reduce((nextText, [source, target]) => {
    const pattern = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    return nextText.replace(pattern, target);
  }, text);
};

export const translateProductTextToEnglish = (value) => {
  const raw = String(value ?? '');
  if (!raw.trim()) return value;

  return raw
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') && part.endsWith('>') ? part : applyEnglishReplacements(part)))
    .join('');
};

export const normalizeCategoryToEnglish = (category) => {
  if (!category || typeof category !== 'object' || !category.name) {
    return category;
  }

  const override = ENGLISH_CATEGORY_NAME_OVERRIDES[String(category.name).trim().toLowerCase()];

  return {
    ...category,
    name: override || translateProductTextToEnglish(category.name),
  };
};

export const normalizeCategoriesToEnglish = (categories) => {
  if (!Array.isArray(categories)) {
    return categories;
  }

  return categories
    .filter((category) => {
      const value = String(category?.slug || category?.name || '').trim().toLowerCase();
      return value !== 'uncategorized';
    })
    .map(normalizeCategoryToEnglish);
};

export const translateWooProductTextToEnglish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  const translatedProduct = TEXT_FIELDS.reduce((nextProduct, field) => {
    const value = nextProduct[field];
    if (value === null || value === undefined || value === '') {
      return nextProduct;
    }

    return {
      ...nextProduct,
      [field]: translateProductTextToEnglish(value),
    };
  }, product);

  return {
    ...translatedProduct,
    categories: normalizeCategoriesToEnglish(translatedProduct.categories),
  };
};

export const translateWooProductsTextToEnglish = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(translateWooProductTextToEnglish);
};

export const translateProductTextToSpanish = (value) => {
  const raw = String(value ?? '');
  if (!raw.trim()) return value;

  return raw
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') && part.endsWith('>') ? part : applyReplacements(part)))
    .join('');
};

export const translateCategoryToSpanish = (category) => {
  if (!category || typeof category !== 'object' || !category.name) {
    return category;
  }

  const override = CATEGORY_NAME_OVERRIDES[String(category.name).trim().toLowerCase()];

  return {
    ...category,
    name: override || translateProductTextToSpanish(category.name),
  };
};

export const translateCategoriesToSpanish = (categories) => {
  if (!Array.isArray(categories)) {
    return categories;
  }

  return categories
    .filter((category) => {
      const value = String(category?.slug || category?.name || '').trim().toLowerCase();
      return value !== 'uncategorized';
    })
    .map(translateCategoryToSpanish);
};

export const translateWooProductTextToSpanish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  const sourceLanguage = String(process.env.NEXT_PUBLIC_WP_DESCRIPTION_SOURCE_LANGUAGE || 'EN').trim().toUpperCase();
  if (sourceLanguage !== 'EN') {
    return product;
  }

  const translatedProduct = TEXT_FIELDS.reduce((nextProduct, field) => {
    const value = nextProduct[field];
    if (value === null || value === undefined || value === '') {
      return nextProduct;
    }

    return {
      ...nextProduct,
      [field]: translateProductTextToSpanish(value),
    };
  }, product);

  const productOverride = SPANISH_PRODUCT_OVERRIDES[Number(product.id)];

  return {
    ...translatedProduct,
    ...(productOverride ? {
      name: productOverride[0],
      short_description: `<p>${productOverride[1]}</p>`,
    } : {}),
    categories: translateCategoriesToSpanish(translatedProduct.categories),
  };
};

export const translateWooProductDescriptionsToSpanish = translateWooProductTextToSpanish;

export const translateWooProductsTextToSpanish = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(translateWooProductTextToSpanish);
};

export const translateWooProductsDescriptionsToSpanish = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(translateWooProductTextToSpanish);
};

export const translateWooProductDescriptionsFieldsToSpanish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  return DESCRIPTION_FIELDS.reduce((translatedProduct, field) => {
    const value = translatedProduct[field];
    if (value === null || value === undefined || value === '') {
      return translatedProduct;
    }

    return {
      ...translatedProduct,
      [field]: translateProductTextToSpanish(value),
    };
  }, product);
};
