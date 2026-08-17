import { Footer, Logo } from "../page";
import ProductCatalog from "../components/ProductCatalog";

export default function Productos() {
  return (
    <main>
      <header className="catalogHead">
        <nav className="nav">
          <Logo />

          <a
            className="navLink"
            href="/"
          >
            Volver al inicio
          </a>
        </nav>

        <h1>Catálogo</h1>

        <p>
          Productos regionales seleccionados para vos.
        </p>
      </header>

      <ProductCatalog />

      <Footer />
    </main>
  );
}