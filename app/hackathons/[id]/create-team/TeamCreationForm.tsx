'use client';

import { TeamFormData } from '@/src/types/team';
import { Info, Sparkles } from 'lucide-react';

interface TeamCreationFormProps {
  formData: TeamFormData;
  onChange: (data: TeamFormData) => void;
}

export default function TeamCreationForm({ formData, onChange }: TeamCreationFormProps) {
  const handleInputChange = (field: keyof TeamFormData, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  // Example team names for inspiration
  const teamNameExamples = [
    'Quantum Coders',
    'Byte Builders',
    'Pixel Pioneers',
    'Code Crusaders',
    'Innovation Squad',
    'Tech Titans',
    'Digital Dreamers',
    'Future Founders',
  ];

  return (
    <div className="space-y-8">
      {/* Team Name Section */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-900">
              Team Name *
            </label>
            <span className="text-xs text-gray-500">
              {formData.name.length}/50 characters
            </span>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Quantum Coders"
            className="w-full px-4 py-3 text-lg bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900 placeholder-gray-400 transition-all"
            maxLength={50}
          />
          
          {/* Team Name Examples */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Need inspiration? Try one of these:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {teamNameExamples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleInputChange('name', example)}
                  className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-700 border border-gray-200 hover:border-primary-200 rounded-lg transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* tagline Section */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-900">
              Team tagline *
            </label>
            <span className="text-xs text-gray-500">
              {formData?.tagline.length}/500 characters
            </span>
          </div>
          <textarea
            value={formData.tagline}
            onChange={(e) => handleInputChange('tagline', e.target.value)}
            placeholder="Describe your team's mission, what you're building, or the skills you're looking for..."
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900 placeholder-gray-400 h-40 resize-none transition-all"
            maxLength={500}
          />
        </div>

        {/* tagline Tips */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-primary-900">What makes a good tagline?</h4>
              <ul className="text-sm text-primary-800 space-y-1">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Mention your project idea or goal</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Describe the type of members you're looking for</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Keep it concise but informative</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Add your contact preferences if any</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example tagline */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Example:</h4>
          <p className="text-sm text-gray-600 italic">
            "We're building a decentralized voting platform using Solidity and React. Looking for frontend developers and smart contract engineers who are passionate about Web3 and governance. Open to all experience levels!"
          </p>
        </div>
      </div>

      {/* Form Status */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{formData.name ? '✓' : '○'}</span>
            {' '}Team name
            {' '}<span className="mx-2">•</span>
            <span className="font-medium text-gray-900">{formData.tagline ? '✓' : '○'}</span>
            {' '}tagline
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            formData.name && formData.tagline 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-gray-50 text-gray-500 border border-gray-200'
          }`}>
            {formData.name && formData.tagline ? 'Ready to create' : 'Complete required fields'}
          </div>
        </div>
      </div>
    </div>
  );
}