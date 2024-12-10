interface EducationItem {
  dateRangeKey: string;
  titleKey: string;
  schoolKey: string;
}

export const educationItems: EducationItem[] = [
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
