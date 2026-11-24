import React from 'react';

interface KeycapBadgeProps {
  keys: string | string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'orange' | 'indigo' | 'emerald';
  className?: string;
  onClick?: () => void;
}

export const KeycapBadge: React.FC<KeycapBadgeProps> = ({
  keys,
  size = 'md',
  variant = 'orange',
  className = '',
  onClick,
}) => {
  // Parse keys if provided as a single string like "Ctrl + B" or "Shift + A"
  const keyList = Array.isArray(keys)
    ? keys
    : keys.split('+').map((k) => k.trim());

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 rounded shadow-[0_1.5px_0_rgba(0,0,0,0.5)]',
    md: 'text-[11px] px-2 py-0.5 rounded-md shadow-[0_2px_0_rgba(0,0,0,0.6)]',
    lg: 'text-[13px] px-2.5 py-1 rounded-lg shadow-[0_2.5px_0_rgba(0,0,0,0.7)]',
  };

  const variantClasses = {
    default: 'bg-[#182030] text-gray-200 border-[#2A354D] hover:border-gray-400',
    orange: 'bg-[#1C1613] text-[#FB923C] border-[#F97316]/40 hover:border-[#F97316] hover:bg-[#261E1A]',
    indigo: 'bg-[#14172B] text-indigo-300 border-indigo-500/40 hover:border-indigo-400 hover:bg-[#1B203B]',
    emerald: 'bg-[#0E1F1A] text-emerald-300 border-emerald-500/40 hover:border-emerald-400',
  };

  return (
    <span className={`inline-flex items-center gap-1 select-none font-mono ${className}`}>
      {keyList.map((k, idx) => (
        <React.Fragment key={idx}>
          <kbd
            onClick={onClick}
            className={`font-mono font-bold tracking-tight border transition-all inline-block active:translate-y-[1px] active:shadow-none cursor-default ${
              sizeClasses[size]
            } ${variantClasses[variant]}`}
          >
            {k}
          </kbd>
          {idx < keyList.length - 1 && (
            <span className="text-gray-500 text-[10px] font-sans font-semibold">+</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};
