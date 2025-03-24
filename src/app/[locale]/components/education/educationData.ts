interface EducationItem {
  dateRangeKey: string;
  titleKey: string;
  schoolKey: string;
}

export const educationItems: EducationItem[] = [
  {
    dateRangeKey: "degree3.date_range",
    titleKey: "degree3.title",
    schoolKey: "degree3.school",
  },
  {
    dateRangeKey: "degree2.date_range",
    titleKey: "degree2.title",
    schoolKey: "degree2.school",
  },
  {
    dateRangeKey: "degree1.date_range",
    titleKey: "degree1.title",
    schoolKey: "degree1.school",
  },
] as const;
