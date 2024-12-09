interface SkillsItem {
  titleKey: string;
  listKey: string;
}

export const skillsItems: SkillsItem[] = [
  {
    titleKey: "programming_languages.title",
    listKey: "programming_languages.list",
  },
  {
    titleKey: "libraries_frameworks.title",
    listKey: "libraries_frameworks.list",
  },
  {
    titleKey: "tools_platforms.title",
    listKey: "tools_platforms.list",
  },
  {
    titleKey: "data_databases.title",
    listKey: "data_databases.list",
  },
  {
    titleKey: "testing.title",
    listKey: "testing.list",
  },
  {
    titleKey: "data_science_visualization.title",
    listKey: "data_science_visualization.list",
  },
  {
    titleKey: "additional_expertise.title",
    listKey: "additional_expertise.list",
  },
] as const;
