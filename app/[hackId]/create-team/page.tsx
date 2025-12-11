'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { TeamFormData } from '@/src/types/team';
import TeamCreationForm from './TeamCreationForm';
import { createTeam } from '@/src/api/hackathon/team';

export default function CreateTeamPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    tagline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
   const { hackId } = useParams();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await createTeam(hackId as string, formData);
      
      if (result.data) {
        toast.success('Team created successfully!');
        router.back();
      } 
    } catch (error: any) {
           const message =
      error?.message ||
      error?.response?.message ||
      error?.data?.message ||
      "Something went wrong";

    toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.tagline.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Create a New Team
              </h1>
              <p className="text-gray-600">
                Start collaborating with other hackers. You can invite members and add details later.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">Step 1 of 1</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <TeamCreationForm 
                formData={formData}
                onChange={setFormData}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What happens next?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>After creating the team, you'll be redirected to your team dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <span>You can invite members by sharing a link or searching for hackers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Add project details, skills needed, and communication channels later</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Preview & Submit */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Ready to Create?</h3>
              
              {/* Team Preview */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Team Preview</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Name</div>
                    <div className="font-medium text-gray-900 truncate">
                      {formData.name || 'Your team name'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Description</div>
                    <div className="text-sm text-gray-700 line-clamp-3">
                      {formData.tagline || 'Your team description'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
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
                    Creating...
                  </div>
                ) : (
                  'Create Team'
                )}
              </button>

              {/* Validation */}
              {!isFormValid && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-sm text-amber-700 text-center">
                    Please enter team name and description
                  </p>
                </div>
              )}

              {/* Help Text */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  You can edit your team details anytime
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Tips for a Great Team Name</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1" />
                  <span>Keep it short and memorable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1" />
                  <span>Reflect your project or theme</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1" />
                  <span>Be creative but professional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}