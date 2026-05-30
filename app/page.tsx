import {
  getSiteMeta,
  getAboutContent,
  getProjects,
  getZyntohouseContent,
  getCurrentlyBuilding,
  getHeroTerminalContent,
} from "@/lib/content/loader";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CurrentlySection } from "@/components/sections/CurrentlySection";
import { ZyntohouseSection } from "@/components/sections/ZyntohouseSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home(): React.ReactElement {
  const siteMeta = getSiteMeta();
  const about = getAboutContent();
  const projects = getProjects();
  const zyntohouse = getZyntohouseContent();
  const currentlyBuilding = getCurrentlyBuilding();
  const heroTerminal = getHeroTerminalContent();

  return (
    <SiteLayout contact={siteMeta.contact}>
      <Hero hero={siteMeta.hero} contact={siteMeta.contact} terminal={heroTerminal} />
      <ProofStrip proof={siteMeta.proof} />
      <AboutSection about={about} contact={siteMeta.contact} />
      <WorkSection projects={projects} />
      <CurrentlySection items={currentlyBuilding} />
      <ZyntohouseSection content={zyntohouse.content} body={zyntohouse.body} />
      <ContactSection contact={siteMeta.contact} />
    </SiteLayout>
  );
}
