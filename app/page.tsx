import AboutPage from "./(client)/about/page";
import CertificatesPage from "./(client)/certificate/page";
import ContactPage from "./(client)/contact/page";
import EducationPage from "./(client)/education/page";
import ExperiencePage from "./(client)/experience/page";
import LanguagesPage from "./(client)/language/page";
import LinksPage from "./(client)/links/page";
import SkillsPage from "./(client)/skills/page";
import SummaryPage from "./(client)/summary/page";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
    <Header />
 <AboutPage />
 <SummaryPage />
 <ExperiencePage />
 <SkillsPage />
 <LanguagesPage />
 <EducationPage />
 <CertificatesPage />
 <LinksPage />
 <ContactPage />
  </>
  );
}
