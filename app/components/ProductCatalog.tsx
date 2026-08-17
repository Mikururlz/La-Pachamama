"use client";

import { useEffect, useRef, useState } from "react";
import data, { type Product } from "../../data/products";
import { WHATSAPP_NUMBER } from "../config";
import ConsultationCart, { type ConsultationProduct } from "./ConsultationCart";
import ProductBadge from "./ProductBadge";
import ProductImageLightbox from "./ProductImageLightbox";

const catalogData = data;
const productByName = new Map<string, Product>(
  Object.values(catalogData).flat().map((product) => [product[0], product]),
);
const validProductNames = new Set(productByName.keys());
const STORAGE_KEY = "la-pachamama:product-selection:v1";
const slug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ & /g, "-").replace(/\s/g, "-");
const normalizeText = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es")
  .replace(/\s+/g, " ")
  .trim();

export default function ProductCatalog() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let restoredNames: string[] = [];
    try {
      const storedSelection = window.sessionStorage.getItem(STORAGE_KEY);
      if (storedSelection) {
        const parsedSelection: unknown = JSON.parse(storedSelection);
        if (Array.isArray(parsedSelection)) {
          restoredNames = Array.from(new Set(
            parsedSelection.filter((value): value is string => typeof value === "string" && validProductNames.has(value)),
          ));
        }
      }
    } catch {
      // The catalog remains usable when browser storage is unavailable or invalid.
    }

    const restoreFrame = window.requestAnimationFrame(() => {
      setSelectedNames((current) => Array.from(new Set([...restoredNames, ...current])));
      setStorageReady(true);
    });
    return () => window.cancelAnimationFrame(restoreFrame);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      if (selectedNames.length === 0) {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } else {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedNames));
      }
    } catch {
      // Selection still works for the current render when storage is unavailable.
    }
  }, [selectedNames, storageReady]);

  const toggleProduct = (name: string) => {
    setSelectedNames((current) => current.includes(name)
      ? current.filter((selectedName) => selectedName !== name)
      : [...current, name]);
  };

  const selectedProducts: ConsultationProduct[] = selectedNames.flatMap((name) => {
    const product = productByName.get(name);
    return product ? [{ name, image: product[3] }] : [];
  });

  const normalizedQuery = normalizeText(query);
  const visibleCategories: [string, Product[]][] = [];
  Object.entries(catalogData).forEach(([category, items]) => {
    if (activeCategory && category !== activeCategory) return;
    const visibleItems = normalizedQuery
      ? items.filter(([name, description]) => normalizeText(`${name} ${description}`).includes(normalizedQuery))
      : items;
    if (visibleItems.length > 0) visibleCategories.push([category, visibleItems]);
  });
  const visibleCount = visibleCategories.reduce((count, [, items]) => count + items.length, 0);

  const showAllProducts = () => {
    setQuery("");
    setActiveCategory(null);
    searchInputRef.current?.focus();
  };

  return (
    <section className="catalog">
      <div className="catalogTools">
        <div className="catalogSearch" role="search">
          <label className="visuallyHidden" htmlFor="product-search">Buscar productos</label>
          <div className="catalogSearchField">
            <svg className="catalogSearchIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="10.8" cy="10.8" r="6.3" />
              <path d="m15.5 15.5 4.3 4.3" />
            </svg>
            <input
              ref={searchInputRef}
              id="product-search"
              className="catalogSearchInput"
              type="search"
              value={query}
              placeholder="Buscar productos…"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                className="catalogSearchClear"
                aria-label="Borrar búsqueda"
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="m7 7 10 10M17 7 7 17" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="categoryNav" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            className="categoryFilter"
            aria-pressed={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          >
            Todo
          </button>
          {Object.keys(catalogData).map((category) => (
            <button
              type="button"
              className="categoryFilter"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="availabilityNotice" role="note">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10.8v5.2M12 7.5h.01" />
        </svg>
        <p>Los productos están sujetos a disponibilidad. La confirmación del pedido y el retiro se coordinan personalmente por WhatsApp.</p>
      </div>

      <p className="visuallyHidden" role="status" aria-live="polite" aria-atomic="true">
        {visibleCount === 1 ? "1 producto encontrado" : `${visibleCount} productos encontrados`}
      </p>

      <ConsultationCart
        products={selectedProducts}
        onRemove={(name) => setSelectedNames((current) => current.filter((selectedName) => selectedName !== name))}
        onClear={() => setSelectedNames([])}
      />

      <div id="todos">
        {visibleCategories.map(([category, items]) => (
          <section className="productSection" id={slug(category)} key={category}>
            <h2>{category}</h2>
            <div className="grid">
              {items.map(([name, description, price, image, badge]) => {
                const isSelected = selectedNames.includes(name);
                return (
                  <article className="productCard" key={name}>
                    <div className="productMedia">
                      <ProductBadge badge={badge} />
                      {image && image.length > 0 && !/hero|logo/i.test(image) ? (
                        <ProductImageLightbox src={image} alt={name} className="productImg" />
                      ) : (
                        <div className="productPlaceholder">
                          <div className="placeholderMotif" />
                          <div className="placeholderLabel">{category}</div>
                        </div>
                      )}
                    </div>
                    <div className="productInfo">
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <button
                        type="button"
                        className={`selectionToggle${isSelected ? " selected" : ""}`}
                        aria-pressed={isSelected}
                        aria-label={isSelected ? `Quitar ${name} de la consulta` : `Agregar ${name} a la consulta`}
                        onClick={() => toggleProduct(name)}
                      >
                        {isSelected ? "Agregado ✓" : "Agregar a la consulta"}
                      </button>
                      <div className="productBottom">
                        <span className="price">{price}</span>
                        <a className="cta" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero consultar por ${name}. ¿Está disponible?`)}`} target="_blank" rel="noopener noreferrer">Consultar</a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        {visibleCount === 0 && (
          <div className="catalogEmpty">
            <p>No encontramos productos con esa búsqueda.</p>
            <button type="button" aria-label="Limpiar búsqueda y mostrar todos los productos" onClick={showAllProducts}>Limpiar búsqueda</button>
          </div>
        )}
      </div>
    </section>
  );
}
