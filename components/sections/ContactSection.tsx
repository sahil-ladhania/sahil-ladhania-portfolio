import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { DownloadCvButton } from "@/components/shared/DownloadCvButton";
import {
  glassPrimaryButton,
  glassSecondaryButton,
} from "@/lib/glass-styles";
import type { SiteContact } from "@/types/content.types";

interface ContactSectionProps {
  contact: SiteContact;
}

export function ContactSection({ contact }: ContactSectionProps): React.ReactElement {
  return (
    <Section id="contact">
      <Container>
        <SectionHeading number="05." title="Contact" />
        <h3 className="text-xl font-semibold text-foreground">
          Have a project, a role, or a problem worth solving? Reach out.
        </h3>
        <p className="mt-2 max-w-prose text-foreground-muted">
          Book a call if you want to talk live. LinkedIn DMs and email work great too. No forms,
          no friction.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href={contact.calUrl} target="_blank" rel="noopener noreferrer" className={glassPrimaryButton}>
            Book a 30-min call
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={glassSecondaryButton}>
            Message on LinkedIn
          </a>
          <a href={`mailto:${contact.email}`} className={glassSecondaryButton}>
            Email me
          </a>
        </div>

        <div className="mt-10">
          <DownloadCvButton />
        </div>
      </Container>
    </Section>
  );
}
