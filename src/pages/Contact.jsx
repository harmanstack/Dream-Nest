// ========================================
// DREAMNEST CONTACT PAGE
// ========================================

function Contact() {
  return (
    <div className="contact-page">

      {/* ========================================
          CONTACT HERO
      ======================================== */}
      <section className="contact-hero">

        <span className="eyebrow">
          ● CONTACT US
        </span>

        <h1>
          Let's build something
          <span> beautiful.</span>
        </h1>

        <p>
          Have a question, suggestion, or feedback?
          We'd love to hear from you.
        </p>

      </section>


      {/* ========================================
          CONTACT CONTENT
      ======================================== */}
      <section className="contact-grid">


        {/* ========================================
            CONTACT INFORMATION
        ======================================== */}
        <div className="contact-info">

          <h2>
            Get in touch
          </h2>

          <p>
            Whether you have a question about DreamNest or
            want to share an idea, send us a message.
          </p>


          {/* Email */}
          <div className="contact-item">

            <div className="contact-icon">
              ✉
            </div>

            <div>
              <small>Email</small>
              <strong>
                hello@dreamnest.com
              </strong>
            </div>

          </div>


          {/* Location */}
          <div className="contact-item">

            <div className="contact-icon">
              ⌖
            </div>

            <div>
              <small>Location</small>
              <strong>
                India
              </strong>
            </div>

          </div>


          {/* Response time */}
          <div className="contact-item">

            <div className="contact-icon">
              ◷
            </div>

            <div>
              <small>Response time</small>
              <strong>
                Within 24 hours
              </strong>
            </div>

          </div>

        </div>


        {/* ========================================
            CONTACT FORM
        ======================================== */}
        <div className="contact-form">

          <h2>
            Send us a message
          </h2>


          {/* Name */}
          <div className="form-group">

            <label>
              Your name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label>
              Email address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>


          {/* Message */}
          <div className="form-group">

            <label>
              Message
            </label>

            <textarea
              rows="5"
              placeholder="Tell us what you're thinking..."
            ></textarea>

          </div>


          {/* Submit */}
          <button className="primary-button">
            Send message →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Contact;