import AboutUs from "@/components/aboutComponents/aboutSection/AboutSection";

export default function AboutPage() {
  return (
    <>
      <main
        style={{ marginTop: "var(--nav-height)", width: "100%" }}
        className="page-about"
      >
        <AboutUs />
      </main>
    </>
  );
}
