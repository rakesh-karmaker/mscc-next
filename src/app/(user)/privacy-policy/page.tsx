import "./PrivacyPolicy.css";
import {
  KeyPoints,
  TermsPolicyContent,
} from "@/components/UI/TermsPolicy/TermsPolicy";

export default function PrivacyPolicy() {

  return (
    <main className="page-privacy-policy">
      <h1 className="section-heading">
        <span className="highlighted-text">Privacy</span> Policy
      </h1>
      <div className="privacy-policy-container">
        <KeyPoints content={content as { title: string; id: string; content: string; list?: React.ReactNode[] }[]} />
        <TermsPolicyContent content={content as { title: string; id: string; content: string; list?: React.ReactNode[] | string[] }[]} />
      </div>
    </main>
  );
};

const content = [
  {
    title: "General Information",
    id: "general-information",
    content:
      "At MSCSC, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy outlines how we collect, use, disclose, and manage your information when you engage with our club, participate in our events, or interact with our website.",
  },
  {
    title: "Information We Collect",
    id: "information-we-collect",
    content:
      "We may collect the following information when you interact with our website:",
    list: [
      <p key="personal-info">
        <strong>Personal Information:</strong> Name, email address, profile
        picture, branch, and other details provided during registration.
      </p>,
      <p key="usage-data">
        <strong>Usage Data:</strong> Information about how you use the site,
        including pages visited, and features accessed.
      </p>,
    ],
  },
  {
    title: "How We Use Your Information",
    id: "how-we-use-your-information",
    content: "We use your information to:",
    list: [
      <p key="facilitate">
        Facilitate your participation in club events, activities, and
        competitions.
      </p>,
      <p key="newsletters">Send newsletters and updates about our club activities.</p>,
      <p key="improve">Improve the website’s functionality and user experience.</p>,
    ],
  },
  {
    title: "Information Sharing",
    id: "information-sharing",
    content: "Your information will only be shared with:",
    list: [
      <p key="members">Other club members, as specified in your account settings.</p>,
      <p key="providers">
        Third-party service providers, such as hosting services, to maintain the
        website.
      </p>,
    ],
  },
  {
    title: "Cookies and Tracking",
    id: "cookies-and-tracking",
    content:
      "We use cookies to enhance your experience on our site. These cookies collect information such as your browsing behavior and preferences. You can manage cookie preferences through your browser settings.",
  },
  {
    title: "Data Security",
    id: "data-security",
    content:
      "We implement technical and organizational measures to protect your data. However, no method of transmission over the internet or electronic storage is completely secure.",
  },
  {
    title: "Your Rights",
    id: "your-rights",
    content: "You have the right to:",
    list: [
      <p key="access">Access and update your information.</p>,
      <p key="deletion">Request the deletion of your data.</p>,
      <p key="opt-out">Opt-out of certain data collection practices.</p>,
    ],
  },
  {
    title: "Legal Compliance",
    id: "legal-compliance",
    content:
      "We may disclose your information if required to comply with legal obligations, enforce our policies, or protect the rights, property, or safety of MSCSC or others.",
  },
  {
    title: "Changes to this Policy",
    id: "changes-to-this-policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date. Your continued use of our services after modifications constitutes acceptance of the updated Privacy Policy.",
  },
  {
    title: "Contact Us",
    id: "contact-us",
    content: (
      <span>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at{" "}
        <a href="mailto:mscscofficial17@gmail.com" className="highlighted-text">mscscofficial17@gmail.com</a>
      </span>
    ),
  },
];

