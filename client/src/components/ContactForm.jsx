import { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, subject, message } = formData;
      if (!name || !email || !subject || !message) {
        toast.error("Please fill all the fields");
        return;
      }
      const mailtoLink = `mailto:sumil.suthar@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Hello Sumil,\n\nMy name is ${name} and my email address is ${email}.\n\nI wanted to talk to you about the following:\n\n${message}\n\nLooking forward to hearing from you.\n\nBest Regards,\n${name}`
      )}`;
      window.location.href = mailtoLink;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-details">
      <form onSubmit={handleSubmit}>
        <span> MESSAGE</span>
        <h2>Just Do It</h2>
        <input
          type="text"
          name="name"
          placeholder=" Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          name="message"
          cols="30"
          rows="10"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="people">
        <div>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile-photo"
            style={{ borderRadius: "50%" }}
          />
          <p>
            <span>Shin Sud </span>Software Engineer <br />
            claire.sud@gmail.com
          </p>
        </div>
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile-photo"
            style={{ borderRadius: "50%" }}
          />
          <p>
            <span>Bryan Dev</span>Software Designer <br />
            bryan.dev@gmail.com
          </p>
        </div>
        <div>
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="profile-photo"
            style={{ borderRadius: "50%" }}
          />
          <p>
            <span>MonaLisa</span>FullStack Developer <br />
            mona.lisa@gmail.com
          </p>
        </div>
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/81.jpg"
            alt="profile-photo"
            style={{ borderRadius: "50%" }}
          />
          <p>
            <span>Donuts Choco</span>UI/UX Designer <br />
            donuts.choco@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
