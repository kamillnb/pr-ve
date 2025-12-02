export type Language = "en" | "no";

const strings: Record<Language, Record<string, string>> = {
  en: {
    appName: "MemoryShare",
    homeTitle: "Welcome to MemoryShare",
    searchPlaceholder: "Search memories...",
    createTitle: "New Memory",
    mapTitle: "Map",
    settingsTitle: "Settings",
    tags: "Tags",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    save: "Save",
    titlePlaceholder: "Title",
    descriptionPlaceholder: "Description",
    imageUrlPlaceholder: "Image URL",
    noMemoryFound: "Memory not found",
  },
  no: {
    appName: "MemoryShare",
    homeTitle: "Velkommen til MemoryShare",
    searchPlaceholder: "Søk i minner...",
    createTitle: "Nytt minne",
    mapTitle: "Kart",
    settingsTitle: "Innstillinger",
    tags: "Tagger",
    language: "Språk",
    theme: "Tema",
    light: "Lyst",
    dark: "Mørkt",
    save: "Lagre",
    titlePlaceholder: "Tittel",
    descriptionPlaceholder: "Beskrivelse",
    imageUrlPlaceholder: "Bilde-URL",
    noMemoryFound: "Fant ikke minnet",
  },
};

export const t =
  (lang: Language) =>
  (key: string): string =>
    strings[lang][key] ?? key;
