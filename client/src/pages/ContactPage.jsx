import Header from "../components/Header";
import { FaRegMap, FaPhoneAlt, FaClock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  const combinedText = {
    text1: "#HEY YOU!",
    text2: "JUST DO IT NOW!",
    url: "https://nike0197.netlify.app/assets/1-f4da6767.jpg",
  };
  return (
    <>
      {/* <div>
        <Header combinedText={combinedText} />
      </div> */}
      <div className="contact-details">
        <div className="company-details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency location or contact us today</h2>
          <h3>Head Office</h3>
          <div className="contactAddress">
            <ul type="none">
              <li>
                <div>
                  <FaRegMap />
                </div>{" "}
                Espace Européen
              </li>
              <li>
                <div>
                  <FiMail />
                </div>{" "}
                contactus@alsace.com
              </li>
              <li>
                <div>
                  <FaPhoneAlt />
                </div>{" "}
                +33 09 01 23 45 67
              </li>
              <li>
                <div>
                  <FaClock />
                </div>{" "}
                Monday to Saturday: 9:00am to 10:00pm
              </li>
            </ul>
          </div>
        </div>
        <div className="map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.073073964479!2d7.726964315674839!3d48.61398297926409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8e2e2e2e2e3%3A0x2e2e2e2e2e2e2e2e!2sEspace%20Europ%C3%A9en%2C%20Schiltigheim%2C%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1692991846645!5m2!1sfr!2sfr"
            height="450"
            style={{ border: "0", width: "-webkit-fill-available" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div>
        <Header combinedText={combinedText} />
      </div>
      <ContactForm />
    </>
  );
};

export default ContactPage;
