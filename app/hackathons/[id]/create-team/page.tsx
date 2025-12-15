'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { TeamFormData } from '@/src/types/team';
import TeamCreationForm from './TeamCreationForm';
import { createTeam } from '@/src/api/hackathon/team';
import { useAlert } from '@/app/context/AlertProvider';

export default function CreateTeamPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    tagline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const { showAlert } = useAlert();

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    try {
      const result = await createTeam(id as string, formData);
      
      if (result.data) {
          showAlert("success", "Saved!","🎉 Team created successfully!");

        router.back();
      } 
    } catch (error: any) {
      showAlert("warning", "Oops!", error?.message || 'An error occurred while creating the team.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim().length > 0 && formData.tagline.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create a New Team
            </h1>
            <p className="text-gray-600">
              Start collaborating with other hackers. You can invite members and add details later.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <TeamCreationForm 
                formData={formData}
                onChange={setFormData}
              />
            </div>
          </div>

          {/* Right Column - Preview & Submit */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Ready to Create?</h3>
              
              {/* Team Preview */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Team Preview</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Name</div>
                    <div className="font-medium text-gray-900">
                      {formData.name || 'Your team name'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Description</div>
                    <div className="text-sm text-gray-700">
                      {formData.tagline || 'Your team description'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isFormValid 
                    ? 'bg-primary-500 hover:bg-primary-700 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </div>
                ) : (
                  'Create Team'
                )}
              </button>

              {/* Validation */}
              {!isFormValid && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <p className="text-sm text-yellow-700 text-center">
                    Please enter team name and description
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}