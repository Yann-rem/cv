interface ExperienceItem {
  dateRangeKey: string;
  titleKey: string;
  companyKey: string;
  descriptionKey?: string[];
  technologiesUsedKey?: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    dateRangeKey: "experience_6.date_range",
    titleKey: "experience_6.title",
    companyKey: "experience_6.company",
    descriptionKey: [
      "experience_6.description.0",
      "experience_6.description.1",
      "experience_6.description.2",
      "experience_6.description.3",
      "experience_6.description.4",
    ],
    technologiesUsedKey: [
      "experience_6.technologies_used.0",
      "experience_6.technologies_used.1",
      "experience_6.technologies_used.2",
      "experience_6.technologies_used.3",
      "experience_6.technologies_used.4",
      "experience_6.technologies_used.5",
      "experience_6.technologies_used.6",
      "experience_6.technologies_used.7",
      "experience_6.technologies_used.8",
      "experience_6.technologies_used.9",
    ],
  },
  {
    dateRangeKey: "experience_5.date_range",
    titleKey: "experience_5.title",
    companyKey: "experience_5.company",
    descriptionKey: [
      "experience_5.description.0",
      "experience_5.description.1",
      "experience_5.description.2",
      "experience_5.description.3",
      "experience_5.description.4",
      "experience_5.description.5",
    ],
    technologiesUsedKey: [
      "experience_5.technologies_used.0",
      "experience_5.technologies_used.1",
      "experience_5.technologies_used.2",
    ],
  },
  {
    dateRangeKey: "experience_4.date_range",
    titleKey: "experience_4.title",
    companyKey: "experience_4.company",
    descriptionKey: ["experience_4.description.0", "experience_4.description.1"],
  },
  {
    dateRangeKey: "experience_3.date_range",
    titleKey: "experience_3.title",
    companyKey: "experience_3.company",
    descriptionKey: ["experience_3.description.0", "experience_3.description.1"],
  },
  {
    dateRangeKey: "experience_2.date_range",
    titleKey: "experience_2.title",
    companyKey: "experience_2.company",
  },
  {
    dateRangeKey: "experience_1.date_range",
    titleKey: "experience_1.title",
    companyKey: "experience_1.company",
  },
] as const;
