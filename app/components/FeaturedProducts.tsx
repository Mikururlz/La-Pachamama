import data from "../../data/products";
import { WHATSAPP_NUMBER } from "../config";
import ProductBadge from "./ProductBadge";
import ProductImageLightbox from "./ProductImageLightbox";

const pickProducts = () => Object.entries(data).flatMap(([category, items]) =>
  items
    .filter(([, , , , badge]) => badge === "Destacado")
    .map(([name, desc, price, img, badge]) => ({ category, name, desc, price, img, badge })),
);

export default function FeaturedProducts(){
  const items = pickProducts();
  return (
    <section className="featuredProducts">
      <div className="ornamentWrap ornament-left" aria-hidden>
        <img src="/images/ornamento-lateral-aves.png" alt="" aria-hidden="true" className="ornamentImg"/>
      </div>
      <div className="ornamentWrap ornament-right" aria-hidden>
        <img src="/images/ornamento-lateral-aves.png" alt="" aria-hidden="true" className="ornamentImg"/>
      </div>
      <div className="container">
        <h2>Productos destacados</h2>
        <div className="featuredGrid">
          {items.map(it=> (
            <article key={it.name} className="productCard">
              <div className="productMedia">
                <ProductBadge badge={it.badge} />
                {it.img && it.img.length>0 && /\.(jpe?g|png|webp)$/i.test(it.img) && !/hero|logo/i.test(it.img) ? (
                  <ProductImageLightbox src={it.img} alt={`Producto: ${it.name}`} className="productImg" />
                ) : (
                  <div className="productPlaceholder" aria-hidden>
                    <div className="placeholderMotif" />
                    <div className="placeholderLabel">{it.name}</div>
                  </div>
                )}
              </div>
              <div className="productInfo">
                <h3>{it.name}</h3>
                <p className="muted">{it.desc}</p>
                <div className="productFooter">
                  <strong className="price">{it.price}</strong>
                  <a className="waBtn" aria-label={`Consultar por ${it.name}`} href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero consultar por ${it.name}. ¿Está disponible?`)}`} target="_blank" rel="noopener noreferrer">Consultar</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
