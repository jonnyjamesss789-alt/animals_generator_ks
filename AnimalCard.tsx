import React from 'react';

interface AnimalCardProps {
  animalName: string;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animalName }) => {
  return (
    <div className="w-full text-center animate-fade-in">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200">
        {animalName}
      </h2>
    </div>
  );
};

export default AnimalCard;
