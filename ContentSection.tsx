import React from 'react';

interface ContentSectionProps {
  title: string;
  color?: 'purple' | 'emerald' | 'sky';
  children: React.ReactNode;
}

const colorClasses = {
    purple: 'border-purple-500/50 text-purple-300',
    emerald: 'border-emerald-500/50 text-emerald-300',
    sky: 'border-sky-500/50 text-sky-300',
};

const ContentSection: React.FC<ContentSectionProps> = ({ title, color = 'purple', children }) => {
  return (
    <div className={`p-4 md:p-6 bg-slate-800 rounded-lg shadow-inner animate-fade-in border-t-2 ${colorClasses[color]}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
