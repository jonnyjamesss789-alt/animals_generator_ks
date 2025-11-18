export interface AnimalData {
  animalName: string;
  russianArticle: string;
  englishArticle: string;
}

export interface YouTubeContent {
  title: string;
  description: string;
}

export interface YouTubeContentDualLang {
  ru: YouTubeContent;
  en: YouTubeContent;
}

export interface VideoPromptsDualLang {
  ru_prompts: string;
  en_prompts: string;
}
