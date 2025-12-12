'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
}

export function TagInput({ 
  value, 
  onChange, 
  placeholder, 
  suggestions = [], 
  maxTags = 10 
}: TagInputProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag]);
    }
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(suggestion)
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-700 rounded-lg bg-gray-900/50 min-h-[44px]">
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:text-purple-100"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 bg-transparent outline-none min-w-[120px]"
          disabled={value.length >= maxTags}
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addTag(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-800 text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Press Enter to add</span>
        <span>{value.length}/{maxTags}</span>
      </div>
    </div>
  );
}