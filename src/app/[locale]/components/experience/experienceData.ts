interface ExperienceItem {
  dateRangeKey: string;
  titleKey: string;
  companyKey: string;
  descriptionKey?: string[];
  technologiesUsedKey?: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    dateRangeKey: "experience6.date_range",
    titleKey: "experience6.title",
    companyKey: "experience6.company",
    descriptionKey: [
      "experience6.description.0",
      "experience6.description.1",
      "experience6.description.2",
      "experience6.description.3",
      "experience6.description.4",
    ],
    technologiesUsedKey: [
      "experience6.technologies_used.0",
      "experience6.technologies_used.1",
      "experience6.technologies_used.2",
      "experience6.technologies_used.3",
      "experience6.technologies_used.4",
      "experience6.technologies_used.5",
      "experience6.technologies_used.6",
      "experience6.technologies_used.7",
      "experience6.technologies_used.8",
      "experience6.technologies_used.9",
    ],
  },
  {
    dateRangeKey: "experience5.date_range",
    titleKey: "experience5.title",
    companyKey: "experience5.company",
    descriptionKey: [
      "experience5.description.0",
      "experience5.description.1",
      "experience5.description.2",
      "experience5.description.3",
      "experience5.description.4",
      "experience5.description.5",
    ],
    technologiesUsedKey: [
      "experience5.technologies_used.0",
      "experience5.technologies_used.1",
      "experience5.technologies_used.2",
      "experience5.technologies_used.3",
    ],
  },
  {
    dateRangeKey: "experience4.date_range",
    titleKey: "experience4.title",
    companyKey: "experience4.company",
    descriptionKey: ["experience4.description.0", "experience4.description.1"],
  },
  {
    dateRangeKey: "experience3.date_range",
    titleKey: "experience3.title",
    companyKey: "experience3.company",
    descriptionKey: ["experience3.description.0", "experience3.description.1"],
  },
  {
    dateRangeKey: "experience2.date_range",
    titleKey: "experience2.title",
    companyKey: "experience2.company",
  },
  {
    dateRangeKey: "experience1.date_range",
    titleKey: "experience1.title",
    companyKey: "experience1.company",
  },
] as const;
