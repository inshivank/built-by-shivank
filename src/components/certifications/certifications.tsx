import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getCertifications } from "@/actions/certifications";
import { CertificationsList } from "./certifications-list";

export async function Certifications() {
  const certifications = await getCertifications();

  return (
    <Section id="certifications" className="pt-20">
      <Container size="wide" className="space-y-12">
        {/* Section Title */}
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Certifications
          </h3>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-xl">
            Professional credentials and specializations I have completed to strengthen my core software capabilities.
          </p>
        </div>

        <CertificationsList certifications={certifications} />
      </Container>
    </Section>
  );
}
