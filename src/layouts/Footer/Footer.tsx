"use client";
import "./Footer.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="col-center">
      <div className="footer-upper-container">
        <FooterDesc />

        <FooterLinks />
      </div>

      <div className="line"></div>

      <p className="copyright">
        © {new Date().getFullYear()} MSCSC || All Rights Reserved
      </p>
    </footer>
  );
};

const FooterDesc = () => {
  return (
    <div className="footer-desc">
      <Image src="/logo.webp" alt="MSCSC logo" width={100} height={100} />

      <p>
        MSCSC is the ideal place for Math, Science, Biology, IT, and Astronomy
        enthusiasts, offering top-notch learning, hands-on experiences, and
        expert guidance.
      </p>
    </div>
  );
};

const FooterLinks = () => {
  return (
    <div className="footer-links">
      {Object.entries(footerLinks).map(([key, links]) => {
        return (
          <div key={key} className={key.toLocaleLowerCase()}>
            <h3 className="footer-link-title">{key}</h3>
            <div className="footer-link-container">
              {links.map((link) => {
                return (
                  <FooterLink key={link.title} link={link.link} objectKey={key}>
                    {link.title}
                  </FooterLink>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="contact-us">
        <h3 className="footer-link-title">Contact Us</h3>
        <div className="footer-link-container">
          <a href="mailto:mscscofficial17@gmail">
            <FaEnvelope /> mscscofficial17@gmail
          </a>
          <a href="tel: 01329-600430">
            <FaPhoneAlt /> +880 1329-600430
          </a>
        </div>
      </div>
    </div>
  );
};

const FooterLink = ({
  link,
  children,
  objectKey,
}: {
  link: string;
  children: string;
  objectKey: string;
}) => {
  return objectKey === "Socials" ? (
    <a href={link} aria-label={`Go to our ${children} page`}>
      {children}
    </a>
  ) : (
    <FooterNavLink link={link}>{children}</FooterNavLink>
  );
};

const FooterNavLink = ({
  link,
  children,
}: {
  link: string;
  children: string;
}) => {
  const url = usePathname();
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const linkTag = searchParams.get("tag");

  return linkTag ? (
    <Link href={link} aria-label={`Go to our ${children} page`}>
      {children}
    </Link>
  ) : (
    <Link href={link} aria-label={`Go to our ${children} page`}>
      {children}
    </Link>
  );
};

const footerLinks = {
  Pages: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "Members",
      link: "/members",
    },
    {
      title: "Executives",
      link: "/executives",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "Tasks",
      link: "/tasks",
    },
  ],
  Activities: [
    {
      title: "Events",
      link: "/activities?tag=Event",
    },
    {
      title: "Workshops",
      link: "/activities?tag=Workshop",
    },
    {
      title: "Articles",
      link: "/activities?tag=Article",
    },
    {
      title: "Achievements",
      link: "/activities?tag=Achievement",
    },
  ],
  Links: [
    {
      title: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      title: "Terms of Service",
      link: "/terms-of-service",
    },
    {
      title: "Facebook",
      link: "https://www.facebook.com/MSCSC2014",
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/_mscsclub_/",
    },
  ],
};

export default Footer;
