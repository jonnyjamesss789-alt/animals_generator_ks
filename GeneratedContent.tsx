import React, { useState, useCallback } from 'react';
import { generateYouTubeContent, generateYouTubeTags, generateVideoPrompts } from '../services/geminiService';
import AnimalCard from './AnimalCard';
import Button from './Button';
import Loader from './Loader';
import ContentSection from './ContentSection';
import CopyableBlock from './CopyableBlock';
import type { AnimalData, YouTubeContentDualLang, VideoPromptsDualLang } from '../types';
import { Youtube, Tags, Film } from 'lucide-react';

interface GeneratedContentProps {
  animal: AnimalData;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ animal }) => {
  const [articleLanguage, setArticleLanguage] = useState<'ru' | 'en'>('ru');
  const [contentLanguage, setContentLanguage] = useState<'ru' | 'en'>('ru');
  const [error, setError] = useState<string | null>(null);

  const [youtubeContent, setYoutubeContent] = useState<YouTubeContentDualLang | null>(null);
  const [isGeneratingYouTube, setIsGeneratingYouTube] = useState<boolean>(false);

  const [youtubeTags, setYoutubeTags] = useState<string | null>(null);
  const [isGeneratingTags, setIsGeneratingTags] = useState<boolean>(false);

  const [videoPrompts, setVideoPrompts] = useState<VideoPromptsDualLang | null>(null);
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState<boolean>(false);

  const handleYouTubeContentClick = useCallback(async () => {
    setIsGeneratingYouTube(true);
    setError(null);
    try {
      const content = await generateYouTubeContent(animal.animalName, animal.russianArticle, animal.englishArticle);
      setYoutubeContent(content);
    } catch (err: any) {
      setError(`Ошибка генерации контента YouTube: ${err.message}`);
    } finally {
      setIsGeneratingYouTube(false);
    }
  }, [animal]);

  const handleTagsClick = useCallback(async () => {
    setIsGeneratingTags(true);
    setError(null);
    try {
      const tags = await generateYouTubeTags(animal.animalName, animal.englishArticle);
      setYoutubeTags(tags);
    } catch (err: any) {
      setError(`Ошибка генерации тегов: ${err.message}`);
    } finally {
      setIsGeneratingTags(false);
    }
  }, [animal]);

  const handleVideoPromptsClick = useCallback(async () => {
    setIsGeneratingPrompts(true);
    setError(null);
    try {
      const prompts = await generateVideoPrompts(animal.animalName, animal.russianArticle, animal.englishArticle);
      setVideoPrompts(prompts);
    } catch (err: any) {
      setError(`Ошибка генерации промтов: ${err.message}`);
    } finally {
      setIsGeneratingPrompts(false);
    }
  }, [animal]);

  return (
    <div className="animate-fade-in-up space-y-8">
      <AnimalCard animalName={animal.animalName} />
      
      <div className="p-4 md:p-6 bg-slate-800 rounded-lg shadow-lg">
        <div className="flex justify-end mb-2">
          <div className="flex items-center space-x-2">
            <button onClick={() => setArticleLanguage('ru')} className={`px-3 py-1 text-sm rounded-md transition-colors ${articleLanguage === 'ru' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}>RU</button>
            <button onClick={() => setArticleLanguage('en')} className={`px-3 py-1 text-sm rounded-md transition-colors ${articleLanguage === 'en' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}>EN</button>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{articleLanguage === 'ru' ? animal.russianArticle : animal.englishArticle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="secondary" onClick={handleYouTubeContentClick} disabled={isGeneratingYouTube}>
          {isGeneratingYouTube ? <Loader/> : <><Youtube size={20} className="mr-2"/>YouTube Контент</>}
        </Button>
        <Button variant="tertiary" onClick={handleTagsClick} disabled={isGeneratingTags}>
          {isGeneratingTags ? <Loader/> : <><Tags size={20} className="mr-2"/>Теги</>}
        </Button>
        <Button variant="quaternary" onClick={handleVideoPromptsClick} disabled={isGeneratingPrompts}>
          {isGeneratingPrompts ? <Loader/> : <><Film size={20} className="mr-2"/>Промты для Veo</>}
        </Button>
      </div>
      
      {error && <p className="text-red-400 mt-4 text-center animate-fade-in">{error}</p>}

      <div className="space-y-6">
        {isGeneratingYouTube && <Loader />}
        {youtubeContent && (
          <ContentSection title="Контент для YouTube" color="purple">
            <div className="flex justify-end mb-4">
                <div className="flex items-center space-x-2">
                    <button onClick={() => setContentLanguage('ru')} className={`px-3 py-1 text-sm rounded-md transition-colors ${contentLanguage === 'ru' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300'}`}>RU</button>
                    <button onClick={() => setContentLanguage('en')} className={`px-3 py-1 text-sm rounded-md transition-colors ${contentLanguage === 'en' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300'}`}>EN</button>
                </div>
            </div>
            {contentLanguage === 'ru' ? (
                <>
                    <CopyableBlock title="Заголовок (RU)" content={youtubeContent.ru.title} />
                    <CopyableBlock title="Описание (RU)" content={youtubeContent.ru.description} />
                </>
            ) : (
                <>
                    <CopyableBlock title="Title (EN)" content={youtubeContent.en.title} />
                    <CopyableBlock title="Description (EN)" content={youtubeContent.en.description} />
                </>
            )}
          </ContentSection>
        )}

        {isGeneratingTags && <Loader />}
        {youtubeTags && (
            <ContentSection title="Теги для YouTube (EN)" color="emerald">
                <CopyableBlock content={youtubeTags} />
            </ContentSection>
        )}

        {isGeneratingPrompts && <Loader />}
        {videoPrompts && (
            <ContentSection title="Промты для Veo 3.1" color="sky">
                <div className="flex justify-end mb-4">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setContentLanguage('ru')} className={`px-3 py-1 text-sm rounded-md transition-colors ${contentLanguage === 'ru' ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300'}`}>RU</button>
                        <button onClick={() => setContentLanguage('en')} className={`px-3 py-1 text-sm rounded-md transition-colors ${contentLanguage === 'en' ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300'}`}>EN</button>
                    </div>
                </div>
                {(contentLanguage === 'ru' ? videoPrompts.ru_prompts : videoPrompts.en_prompts)
                    .split('\n')
                    .filter(p => p.trim() !== '')
                    .map((prompt, index) => {
                        const cleanPrompt = prompt.replace(/^\d+\.\s*/, '');
                        return <CopyableBlock key={index} content={cleanPrompt} isPrompt={true} />;
                    })
                }
            </ContentSection>
        )}
      </div>
    </div>
  );
};

export default GeneratedContent;
