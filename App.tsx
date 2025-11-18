import React, { useState, useCallback } from 'react';
import { generateUniqueAnimal } from './services/geminiService';
import Button from './components/Button';
import Loader from './components/Loader';
import GeneratedContent from './components/GeneratedContent';
import { PawPrint, Github } from 'lucide-react';
import type { AnimalData } from './types';

const App: React.FC = () => {
  const [currentAnimal, setCurrentAnimal] = useState<AnimalData | null>(null);
  const [generatedAnimals, setGeneratedAnimals] = useState<AnimalData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentAnimal(null);
    try {
      const existingAnimalNames = generatedAnimals.map(animal => animal.animalName);
      const newAnimalData = await generateUniqueAnimal(existingAnimalNames);
      
      if (newAnimalData && newAnimalData.animalName && !existingAnimalNames.includes(newAnimalData.animalName)) {
        setCurrentAnimal(newAnimalData);
        setGeneratedAnimals(prev => [newAnimalData, ...prev]);
      } else if (newAnimalData) {
        // If a duplicate is somehow generated, try again.
        console.warn("Duplicate animal generated, retrying...");
        await handleGenerateClick();
      } else {
        throw new Error('Не удалось сгенерировать животное.');
      }
    } catch (err: any) {
      setError(`Произошла ошибка: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [generatedAnimals]);

  const handleHistoryClick = useCallback((animalData: AnimalData) => {
    setCurrentAnimal(animalData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <PawPrint className="text-cyan-400 h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Генератор FULL</h1>
        </div>
        <a href="https://github.com/vasily-mishanin/ai-animal-generator" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
          <Github className="h-7 w-7" />
        </a>
      </header>

      <main className="w-full max-w-4xl flex-grow">
        <div className="text-center mb-8">
          <Button onClick={handleGenerateClick} disabled={isLoading} className="text-lg px-10 py-5">
            {isLoading ? 'Генерация...' : 'Сгенерировать'}
          </Button>
          {error && <p className="text-red-400 mt-4 animate-fade-in">{error}</p>}
        </div>

        {isLoading && <Loader />}

        {currentAnimal && (
          <GeneratedContent key={currentAnimal.animalName} animal={currentAnimal} />
        )}

        {generatedAnimals.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-300">История генераций</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {generatedAnimals.map((animal, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(animal)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    currentAnimal?.animalName === animal.animalName 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-slate-700 text-cyan-200 hover:bg-slate-600'
                  }`}
                >
                  {animal.animalName}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
