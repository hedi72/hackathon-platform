'use client';

import { TeamFormData } from "@/src/types/team";
import { Badge, ExternalLink, Globe, Lock, Users } from "lucide-react";

interface TeamCreationPreviewProps {
  formData: TeamFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function TeamCreationPreview({ formData, onSubmit, isSubmitting }: TeamCreationPreviewProps) {
  const isFormValid = formData.name.trim() && formData.tagline.trim();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900">Team Preview</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
            Preview
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Team Header */}
        <div className="pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.name || 'Team Name'}
              </h4>
            
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-700 leading-relaxed">
              {formData.tagline || 'Team tagline will appear here...'}
            </p>
          </div>
        </div>

        {/* Skills & Roles */}
        <div>
          

         
        </div>

       

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md ${
            isFormValid 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          } ${isSubmitting ? 'opacity-70' : ''}`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Team...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Team
            </div>
          )}
        </button>

        {/* Validation Error */}
        {!isFormValid && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-600 text-center">
              Please fill in team name and tagline to continue
            </p>
          </div>
        )}

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            You can edit your team details later from the team dashboard
          </p>
        </div>
      </div>
    </div>
  );
}