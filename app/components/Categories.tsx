"use client";
import Link from "next/link";
import {useRef, useState} from "react";

type Category = { slug: string; title: string; img: string };

const cats: Category[] = [
  {slug: 'dulces-regionales', title: 'Dulces regionales', img: '/images/products/gaznates.webp'},
  {slug: 'alfajores', title: 'Alfajores', img: '/images/products/alfajores-dulce-de-leche.webp'},
  {slug: 'mermeladas-y-conservas', title: 'Mermeladas y conservas', img: '/images/products/mermeladas-ia.webp'},
  {slug: 'aceites-y-aceitunas', title: 'Aceites y aceitunas', img: '/images/products/aceitunas-verdes-negras-ia.webp'}
];

function CategoryCard({c}:{c:Category}){
  const [ok,setOk] = useState(true);
  const img = c.img || '';
  return (
    <Link key={c.slug} href={`/productos#${c.slug}`} className="catCard">
      <div className="catThumbWrap">
        {img && ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" className="catThumbImg" onError={()=>setOk(false)} />
        ) : (
          <div className="productPlaceholder" aria-hidden>
            <div className="placeholderMotif" />
            <div className="placeholderLabel">{c.title}</div>
          </div>
        )}
      </div>
      <div className="catBody">
        <div className="catIcon">◈</div>
        <div className="catTitle">{c.title}</div>
      </div>
    </Link>
  );
}

export default function Categories(){
    const gridRef = useRef<HTMLDivElement>(null);

const scrollCategories = (direction: "left" | "right") => {
  const grid = gridRef.current;
  if (!grid) return;

  const card = grid.querySelector<HTMLElement>(".catCard");
  if (!card) return;

  const gap = 14;
  const amount = card.offsetWidth + gap;

  grid.scrollBy({
    left: direction === "right" ? amount : -amount,
    behavior: "smooth",
  });
};
  return (
    <section className="categories overlap">
      <div className="container">
       <div className="categoryCarousel">
  <button
    type="button"
    className="categoryArrow categoryArrowLeft"
    aria-label="Categoría anterior"
    onClick={() => scrollCategories("left")}
  >
    ‹
  </button>

  <div className="catGrid" ref={gridRef}>
    {cats.map(c => <CategoryCard key={c.slug} c={c} />)}
  </div>

  <button
    type="button"
    className="categoryArrow categoryArrowRight"
    aria-label="Categoría siguiente"
    onClick={() => scrollCategories("right")}
  >
    ›
  </button>
        </div>
      </div>
    </section>
  );
}