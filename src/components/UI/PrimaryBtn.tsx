import Link from "next/link";

const PrimaryBtn = ({
  link,
  children,
  name,
  ...rest
}: {
  link: string;
  children: React.ReactNode;
  name: string;
  header?: boolean;
}) => {
  return (
    <Link
      href={link}
      className={`primary-button ${rest.header ? "header-btn" : ""}`}
      aria-label={`Go to ${name}`}
    >
      {children}
    </Link>
  );
};

export default PrimaryBtn;
