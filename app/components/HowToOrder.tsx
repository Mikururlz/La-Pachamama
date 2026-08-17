const steps = [
  {
    number: "01",
    title: "Elegí tus productos",
    description: "Explorá el catálogo y seleccioná lo que te interese.",
  },
  {
    number: "02",
    title: "Prepará tu consulta",
    description: "Agregá varios productos al carrito de consulta.",
  },
  {
    number: "03",
    title: "Coordiná por WhatsApp",
    description: "Enviá la lista y confirmá disponibilidad y retiro.",
  },
];

export default function HowToOrder() {
  return (
    <section className="howToOrder" aria-labelledby="how-to-order-title">
      <div className="container">
        <h2 id="how-to-order-title">Cómo realizar tu pedido</h2>
        <ol className="orderSteps">
          {steps.map((step) => (
            <li className="orderStep" key={step.number}>
              <span className="orderStepNumber" aria-hidden="true">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
