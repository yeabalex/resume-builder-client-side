import {
  IconArrowLeft,
  IconPresentation,
  IconUserBolt,
  IconBriefcase,
  IconBook,
  IconBrandPowershell,
  IconUsers,
  IconLanguage,
  IconGiftCard,
  IconCertificate,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import PersonalInfo from "@/components/personal-info/personal-info";
import WorkExperience from "@/components/work-experience/work-experience";
import Education from "@/components/education/education";
import Projects from "@/components/projects/projects";
import TechnicalSkills from "@/components/technical-skills/technical-skills";
import SoftSkills from "@/components/soft-skills/soft-skills";
import LanguageSkill from "@/components/language-skill/language-skill";
import Certificate from "@/components/certification/certification";
import Volunteer from "@/components/volunteer/volunteer";



export const labels = [
  { label: "Personal Info", icon: IconUserBolt, tsx: <PersonalInfo/> },
  { label: "Work Experience", icon: IconBriefcase, tsx: <WorkExperience/> },
  { label: "Education", icon: IconBook, tsx: <Education/> },
  { label: "Projects", icon: IconPresentation, tsx: <Projects/> },
  { label: "Technical Skills", icon: IconBrandPowershell, tsx: <TechnicalSkills/> },
  { label: "Soft Skills", icon: IconUsers, tsx: <SoftSkills/>  },
  { label: "Language Skills", icon: IconLanguage, tsx: <LanguageSkill/> },
  { label: "Certificate", icon: IconCertificate, tsx: <Certificate/>},
  { label: "Volunteer", icon: IconGiftCard, tsx: <Volunteer/> },
];

const getLinks = () => {
  const path = usePathname();

  return labels.map(({ label, icon: Icon }) => ({
    label,
    href: `${path}?s=${label.replaceAll(" ", "").toLowerCase()}`,
    icon: (
      <Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  }));
};

export default getLinks;
