import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/work";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { Experience } from "@/components/experience/experience";
import { Education } from "@/components/education/education";
import { Leadership } from "@/components/leadership/leadership";
import { Certifications } from "@/components/certifications/certifications";
import { Achievements } from "@/components/achievements/achievements";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <FeaturedWork />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Leadership />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
    </PageShell>
  );
}
