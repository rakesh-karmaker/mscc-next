import ContactForm from "@/components/contactComponents/contactForm/ContactForm";
import "./Contact.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaFacebook } from "react-icons/fa6";

const Contact = () => {
  return (
    <section id="contact" className="page-section">
      <div className="contact-details">
        <h3 className="highlighted-text">Contact us</h3>
        <h2 className="section-heading">DROP US A MESSAGE</h2>
        <p className="secondary-text">
          We’re here to help you at anytime ! Drop us a message, and our club
          will get back to you as soon as possible. Whether you have inquiries,
          feedback, or just want to say how can we help you, it would be our
          pleasure to hear from you!
        </p>
        <div className="contacts-container">
          <ContactInfo
            methodName="Call us"
            href="tel: 01329-600430"
            content="+880 1329-600430"
          >
            <FaPhoneAlt />
          </ContactInfo>
          <ContactInfo
            methodName="Email us"
            href="mailto:mscscofficial17@gmail"
            content="mscscofficial17@gmail.com"
          >
            <FaEnvelope />
          </ContactInfo>
          <ContactInfo
            methodName="Facebook"
            href="https://www.facebook.com/MSCSC2014"
            content="Monipur School & College Science Club - MSCSC"
          >
            <FaFacebook />
          </ContactInfo>
        </div>
      </div>
      <ContactForm />
    </section>
  );
};

type ContactInfoProps = {
  methodName: string;
  href: string;
  content: string;
  children: React.ReactNode;
};

const ContactInfo = ({
  children,
  methodName,
  href,
  content,
}: ContactInfoProps) => {
  return (
    <div className="contact">
      <div className="icon row-center">
        <p>{children}</p>
      </div>
      <div className="info">
        <p className="method-name">{methodName}</p>
        <a href={href} title="Call us" className="content">
          {content}
        </a>
      </div>
    </div>
  );
};

export default Contact;
