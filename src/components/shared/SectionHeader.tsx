import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  light = false,
}) => {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={`mb-14 ${centered ? 'text-center' : 'text-left'}`}>
      {badge && (
        <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
          light ? 'bg-white/20 text-white' : 'bg-secondary-50 text-secondary-600'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-soft" />
          {badge}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? 'text-white' : 'text-primary-900'}`}>
        {parts[0]}
        {highlight && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-blue-400">
            {highlight}
          </span>
        )}
        {parts[1]}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${
          light ? 'text-blue-100' : 'text-muted'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
