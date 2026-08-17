"use client";

import Link from "next/link";
import { useState } from "react";

type Category = {
  slug: string;
  title: string;
  img: string;
};

const cats: Category[] = [
  {
    slug: "dulces-regionales",
    title: "Dulces regionales",
    img: "/images/products/gaznates.webp",
  },
  {
    slug: "alfajores",
    title: "Alfajores",
    img: "/images/products/alfajores-dulce-de-leche.webp",
  },
  {
    slug: "mermeladas-y-conservas",
    title: "Mermeladas y conservas",
    img: "/images/products/mermeladas-ia.webp",
  },
  {
    slug: "aceites-y-aceitunas",
    title: "Aceites y aceitunas",
    img: "/images/products/aceitunas-verdes-negras-ia.webp",
  },
];

function CategoryCard({ c }: { c: Category }) {
  const [ok, setOk] = useState(true);
  const img = c.img || "";

  return (
    <Link
      href={`/productos#${c.slug}`}
      className="catCard"
    >
      <div className="catThumbWrap">
        {img && ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt=""
            className="catThumbImg"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="productPlaceholder" aria-hidden>
            <div className="placeholderMotif" />
            <div className="placeholderLabel">
              {c.title}
            </div>
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

export default function Categories() {
  return (
    <section className="categories overlap">
      <div className="container">
        <div className="categoryCarousel">
          <div className="catGrid">
            {cats.map((c) => (
              <CategoryCard
                key={c.slug}
                c={c}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}