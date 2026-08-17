export type ProductBadge = "Destacado" | "Nuevo" | "De temporada";
export type Product = [
  name: string,
  description: string,
  price: string,
  image: string,
  badge?: ProductBadge,
];
export type ProductCatalogData = Record<string, Product[]>;

const data: ProductCatalogData = {
  "Dulces regionales": [
    ["Nueces confitadas","Nueces confitadas artesanales.","Precio a consultar","/images/products/nueces-confitadas.webp","Destacado"],
    ["Gaznates","Dulce tradicional cubierto con glasé.","Precio a consultar","/images/products/gaznates.webp","Destacado"],
    ["Dulce de membrillo","Dulce de membrillo artesanal.","Precio a consultar","/images/products/dulce-de-membrillo.webp","Destacado"],
    ["Alfeñiques","Dulces artesanales tradicionales.","Precio a consultar","/images/products/alfeñiques.webp","Destacado"],
    ["Tabletas de caña y dulce de leche","Tabletas artesanales de caña y dulce de leche.","Precio a consultar","/images/products/tabletas-caña-dulce-de-leche.webp","Destacado"]
  ],
  "Alfajores": [
    ["Alfajores de dulce de leche","Alfajores artesanales rellenos con dulce de leche.","Consultar precio","/images/products/alfajores-dulce-de-leche.webp","Destacado"],
    ["Alfajores de arándanos","Alfajores artesanales rellenos con arándanos.","Consultar precio","/images/products/alfajores-arandanos-ia.webp"]
  ],
  "Mermeladas y conservas": [
    ["Mermeladas","Selección de mermeladas caseras.","Consultar precio","/images/products/mermeladas-ia.webp"]
  ],
  "Aceites y aceitunas": [
    ["Aceite de oliva","Aceite de oliva de producción artesanal.","Consultar precio","/images/products/aceite-de-oliva-ia.webp"],
    ["Aceitunas verdes y negras","Aceitunas en conserva, variedad local.","Consultar precio","/images/products/aceitunas-verdes-negras-ia.webp"]
  ]
};

export default data;
