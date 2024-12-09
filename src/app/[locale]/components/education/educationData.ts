interface EducationItem {
  dateRangeKey: string;
  titleKey: string;
  schoolKey: string;
}

export const educationItems: EducationItem[] = [
  {
    dateRangeKey: "degree_2.date_range",
    titleKey: "degree_2.title",
    schoolKey: "degree_2.school",
  },
  {
    dateRangeKey: "degree_1.date_range",
    titleKey: "degree_1.title",
    schoolKey: "degree_1.school",
  },
] as const;
