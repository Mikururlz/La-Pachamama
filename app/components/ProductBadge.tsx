import type { ProductBadge as ProductBadgeValue } from "../../data/products";

const badgeClass: Record<ProductBadgeValue, string> = {
  Destacado: "featured",
  Nuevo: "new",
  "De temporada": "seasonal",
};

export default function ProductBadge({ badge }: { badge?: ProductBadgeValue }) {
  if (!badge) return null;

  return (
    <span className={`productBadge productBadge-${badgeClass[badge]}`}>
      {badge}
    </span>
  );
}
