function Steps() {
  const steps = [
    {
      number: "1",
      title: "Lay the walls",
      text: "Drag wall segments around the grid to outline your rooms. The blueprint grid keeps your proportions real."
    },
    {
      number: "2",
      title: "Furnish it",
      text: "Drop in doors, windows, sofas, beds and kitchen units. Select and press R to rotate, Delete to remove."
    },
    {
      number: "3",
      title: "Flip to 3D",
      text: "Toggle the 3D view to see your plan extruded into a space you can read at a glance — height, depth and all."
    }
  ];

  return (
    <section className="steps-section" id="how">

      <div className="section-heading">
        <h2>
          From empty grid to walk-through in
          <br />
          three steps
        </h2>
      </div>

      <div className="steps-grid">

        {steps.map((step) => (
          <div className="step-card" key={step.number}>

            <span className="step-number">
              {step.number}
            </span>

            <h3>{step.title}</h3>

            <p>{step.text}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Steps;