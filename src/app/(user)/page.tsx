import AboutUs from "@/components/aboutComponents/aboutSection/AboutSection";
import Contact from "@/components/contactComponents/ContactSection";
import EventsAndArticles from "@/components/eventsAndArticle";
import Hero from "@/components/homeComponents/heroComponents/hero/Hero";
import HomeEcs from "@/components/homeComponents/homeExecutivesComponents/HomeEcs";
import executivesData from "@/services/data/executivesData.json";

export default function Home() {
  return (
    <main className="page-home">
      <Hero />
      <AboutUs />
      <EventsAndArticles />
      <HomeEcs data={executivesData} />
      <Contact />
    </main>
  );
}
