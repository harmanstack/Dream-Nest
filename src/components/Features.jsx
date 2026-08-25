function Features() {

  const features = [
    {
      icon: "⌗",
      title: "Drag & drop planning",
      text: "Pick from walls, doors, sofas, beds, kitchens and more. Drop them on the grid and they snap into place."
    },
    {
      icon: "◇",
      title: "2D ↔ 3D in one click",
      text: "Sketch in top-down 2D, then flip to an isometric 3D view to feel the height, depth and flow of the room."
    },
    {
      icon: "▦",
      title: "Snap-to-grid precision",
      text: "A live blueprint grid keeps dimensions honest. Every piece aligns, rotates and stacks cleanly."
    },
    {
      icon: "⟳",
      title: "Rotatable everything",
      text: "Select a piece and tap R to spin it. Doors open the right way; sofas face the right wall."
    },
    {
      icon: "♙",
      title: "No installs, no sign-up",
      text: "It runs entirely in your browser. Open the studio and start placing walls in seconds."
    },
    {
      icon: "▱",
      title: "Material-aware 3D",
      text: "Each piece carries its own tone — warm wood, soft fabric, cool stone — so the 3D view reads like a real room."
    }
  ];

  return (
    <section className="features-section" id="features">

      <div className="features-heading">
        <h2>Everything you need to sketch a home</h2>

        <p>
          Built for quick ideas and serious plans alike —
          no CAD degree required.
        </p>
      </div>

      <div className="features-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;