import executivesData from "@/services/data/executivesData.json";
import ExecutivesContainer from "@/components/ec-components/ExecutivesContainer";
import "./Executives.css";

export default function ExecutivePage() {
    const years: string[] = [];
    for (const executive of executivesData) {
      if (!years.includes(executive.panel)) {
        years.push(executive.panel);
      }
    }
  
    return (
      <>
        <main className="page-executives">
          <h1 className="section-heading">
            Meet Our <span className="highlighted-text">Executives</span>
          </h1>
          <section className="executive-panel-container">
            <ExecutivesContainer years={years} executivesData={executivesData} />
          </section>
        </main>
      </>
    );
}