"use client";

import { useEffect, useState } from "react";
import HackathonInfoCard from "@/app/views/HackathonInfoCard";
import { getHackathonDetails } from "@/src/api/hackathon/hackathonDetails";
import type { HackathonDetails } from "@/src/api/hackathon/hackathonDetails";
import HackathonDetailsSection from "@/app/views/HackathonDetailsSection";
import { useToken } from "@/app/context/TokenContext";
import { registerToHackathon } from "@/app/api/hackathon/register";
import SubmitBuidlModal from "@/app/views/SubmitBuidlModal";
import HackathonTabs from "../hackathon-tabs/HackathonTabs";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/src/components/layout/Navbar";
import { useAlert } from "@/app/context/AlertProvider";
import { 
  X, Loader2, HelpCircle, AlertCircle, CheckCircle2, 
  User, Mail, Hash, MessageSquare, Calendar, FileText,
  ListChecks, CheckSquare, Lock, Key
} from "lucide-react";

// Registration Modal Component
function RegistrationModal({ 
  hackathon, 
  isOpen, 
  onClose, 
  onRegister,
  isLoading 
}: { 
  hackathon: HackathonDetails;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (payload: { passCode: string, answers: Array<{questionId: string, value: string[]}> }) => Promise<void>;
  isLoading: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [passCode, setPassCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passCodeError, setPassCodeError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formError, setFormError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && hackathon?.registrationQuestions) {
      const initialAnswers: Record<string, string[]> = {};
      hackathon.registrationQuestions.forEach(q => {
        initialAnswers[q.id] = [];
      });
      setAnswers(initialAnswers);
      setPassCode("");
      setErrors({});
      setPassCodeError("");
      setTouched({});
      setFormError("");
    }
  }, [isOpen, hackathon?.registrationQuestions]);

  const handleInputChange = (questionId: string, value: string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
    
    // Mark as touched
    if (!touched[questionId]) {
      setTouched(prev => ({ ...prev, [questionId]: true }));
    }
  };

  const handleSingleSelectChange = (questionId: string, value: string) => {
    handleInputChange(questionId, [value]);
  };

  const handleMultiSelectChange = (questionId: string, option: string, isChecked: boolean) => {
    const currentAnswers = answers[questionId] || [];
    const newAnswers = isChecked 
      ? [...currentAnswers, option]
      : currentAnswers.filter(opt => opt !== option);
    handleInputChange(questionId, newAnswers);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Check passcode for private hackathons
    if (hackathon.isPrivate && hackathon.invitePasscode && !passCode) {
      setPassCodeError('Passcode is required for this private hackathon');
      isValid = false;
    } else {
      setPassCodeError('');
    }

    // Check registration questions
    hackathon?.registrationQuestions?.forEach((question: any) => {
      if (question.required && (!answers[question.id] || answers[question.id].length === 0)) {
        newErrors[question.id] = 'This field is required';
        isValid = false;
      } else if (question.required && answers[question.id] && answers[question.id].length > 0) {
        // Check if the answer is empty string
        const answer = answers[question.id][0];
        if (typeof answer === 'string' && answer.trim() === '') {
          newErrors[question.id] = 'This field is required';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!validateForm()) {
      return;
    }

    try {
      // Convert answers to the required format
      const formattedAnswers = Object.entries(answers)
        .map(([questionId, value]) => ({
          questionId,
          value: value || []
        }));

      // Prepare payload exactly as required
      const payload = {
       // passCode: hackathon.isPrivate && hackathon.invitePasscode ? passCode : undefined,
        answers: formattedAnswers
      };
      console.log("Submitting registration with payload:", payload);
      
      await onRegister(payload);
    } catch (error: any) {
      // Handle specific error messages from API
      if (error.message && error.message.includes("Answer to question")) {
        setFormError(error.message);
      }
    }
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'TEXT': return <FileText className="h-4 w-4" />;
      case 'SELECT': return <ListChecks className="h-4 w-4" />;
      case 'MULTIPLE_SELECT': return <CheckSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  if (!isOpen || !hackathon) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Register for {hackathon.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Please complete the registration form below
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-6">
              {/* Form Error */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm font-medium">{formError}</p>
                  </div>
                </div>
              )}

              {/* Passcode for private hackathons */}
              {hackathon.isPrivate && hackathon.invitePasscode && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Private Hackathon Access</h4>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Invite Passcode *
                    </label>
                    <input
                      type="text"
                      value={passCode}
                      onChange={(e) => {
                        setPassCode(e.target.value);
                        if (passCodeError) setPassCodeError('');
                      }}
                      placeholder="Enter the invite passcode"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        passCodeError ? 'border-red-300' : 'border-gray-300'
                      }`}
                      disabled={isLoading}
                    />
                    {passCodeError && (
                      <div className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {passCodeError}
                      </div>
                    )}
                    <p className="text-xs text-blue-600">
                      This hackathon is private. You need an invite passcode to register.
                    </p>
                  </div>
                </div>
              )}

              {/* Registration Questions */}
              {hackathon.registrationQuestions?.map((question: any) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-gray-100 rounded">
                        {getQuestionIcon(question.type)}
                      </span>
                      <label className="font-medium text-gray-900">
                        {question.label}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                    </div>
                    {question.required && (
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  
                  {question.description && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <HelpCircle className="h-3 w-3" />
                      {question.description}
                    </p>
                  )}
                  
                  {question.type === 'TEXT' && (
                    <div>
                      <input
                        type="text"
                        value={answers[question.id]?.[0] || ''}
                        onChange={(e) => handleSingleSelectChange(question.id, e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, [question.id]: true }))}
                        placeholder={question.placeholder || "Enter your answer..."}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                          errors[question.id] ? 'border-red-300' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  
                  {question.type === 'SELECT' && question.options && question.options.length > 0 && (
                    <div>
                      <select
                        value={answers[question.id]?.[0] || ''}
                        onChange={(e) => handleSingleSelectChange(question.id, e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, [question.id]: true }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                          errors[question.id] ? 'border-red-300' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      >
                        <option value="">Select an option...</option>
                        {question.options.map((option: any, idx: any) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {question.type === 'MULTIPLE_SELECT' && question.options && question.options.length > 0 && (
                    <div className="space-y-2">
                      <div className={`p-3 border rounded-lg ${
                        errors[question.id] ? 'border-red-300' : 'border-gray-300'
                      }`}>
                        {question.options.map((option: any, idx: any) => {
                          const isSelected = (answers[question.id] || []).includes(option);
                          
                          return (
                            <label
                              key={idx}
                              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                                isSelected ? 'bg-yellow-50' : ''
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleMultiSelectChange(question.id, option, e.target.checked)}
                                disabled={isLoading}
                                className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                      {!answers[question.id]?.length && (
                        <p className="text-xs text-gray-500">
                          Select all that apply
                        </p>
                      )}
                    </div>
                  )}
                  
                  {question.type === 'TEXTAREA' && (
                    <div>
                      <textarea
                        value={answers[question.id]?.[0] || ''}
                        onChange={(e) => handleSingleSelectChange(question.id, e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, [question.id]: true }))}
                        placeholder={question.placeholder || "Enter your answer..."}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                          errors[question.id] ? 'border-red-300' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  
                  {errors[question.id] && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors[question.id]}
                    </div>
                  )}
                  
                  {touched[question.id] && !errors[question.id] && answers[question.id]?.length > 0 && answers[question.id][0]?.trim() && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Looks good!
                    </div>
                  )}
                </div>
              ))}
              
              {/* Summary Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Registration Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Hackathon:</span>
                    <p className="font-medium">{hackathon.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Organization:</span>
                    <p className="font-medium">{hackathon.organization?.displayName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <p className="font-medium capitalize">{hackathon.type?.toLowerCase()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Prize Pool:</span>
                    <p className="font-medium">${hackathon.prizePool?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  <p>By registering, you agree to the hackathon's terms and conditions.</p>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {hackathon.registrationQuestions?.filter((q: any) => q.required).length || 0} required questions
                {hackathon.isPrivate && hackathon.invitePasscode && " + passcode"}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#FEC601] text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4" />
                      Complete Registration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HackathonDetails({ params }: { params: { id: string } }) {
  const [hackathon, setHackathon] = useState<HackathonDetails | null>(null);
  const { token } = useToken();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    console.log("🔥 Calling getHackathonDetails from Browser:", params.id);

    getHackathonDetails(params.id, token || undefined)
      .then((data) => {
        console.log("🔥 Hackathon Data (browser):", data);
        setHackathon(data);
        setIsRegistered(Boolean(data?.isRegistered));
      })
      .catch((error) => {
        console.error("❌ Error (browser):", error);
      });
  }, [params.id, token]);

  const handleOpenRegistration = () => {
    if (!token) {
      showAlert(
        "warning", 
        "❗ You must be logged in to register.",
        "Please log in to continue with registration."
      );
      return;
    }

    if (!hackathon) {
      showAlert(
        "warning",
        "Hackathon not loaded",
        "Please wait a moment and try again."
      );
      return;
    }

    // Check if registration is open
    if (!isRegistrationOpen()) {
      if (isRegistrationEnded()) {
        showAlert(
          "warning",
          "Registration Closed",
          "The registration period for this hackathon has ended."
        );
      } else {
        showAlert(
          "info",
          "Registration Not Open Yet",
          `Registration opens on ${formatDate(hackathon.registrationStart as string)}`
        );
      }
      return;
    }

    // Check if hackathon has registration questions or requires passcode
    if (hackathon.registrationQuestions && hackathon.registrationQuestions.length > 0) {
      // Show registration modal with questions
      setShowRegistrationModal(true);
    } else {
      // No questions, register directly
      handleDirectRegister();
    }
  };

  const handleDirectRegister = async () => {
    if (!token || !hackathon) return;

    try {
      console.log("➡️ Sending direct registration request...");

      // For direct registration without questions
      const payload = {
        //passCode: hackathon.isPrivate && hackathon.invitePasscode ? hackathon.invitePasscode : "",
        answers: []
      };

      console.log("📤 Registration payload:", payload);

      const response = await registerToHackathon(
        hackathon.id,
        token,
        payload.answers
      );
      
      setIsRegistered(true);
      showAlert(
        "success", 
        "🎉 You are now registered for this hackathon!",
        "You are now registered as a hacker for this hackathon."
      );
      
      localStorage.setItem("registered-" + params.id, "true");

    } catch (error: any) {
      console.error("❌ Registration error:", error);
      showAlert(
        "error", 
        "Registration failed",
        error?.message || "An error occurred during registration."
      );
    }
  };

  const handleRegistrationSubmit = async (payload: { passCode: string, answers: Array<{questionId: string, value: string[]}> }) => {
    if (!token || !hackathon) return;

    try {
      setIsRegistering(true);
      console.log("➡️ Sending registration request with payload:", payload);

      // Log the payload for debugging
      console.log("📤 Registration payload to send:", {
        hackathonId: hackathon.id,
        token: token.substring(0, 20) + "...",
        payload: payload
      });

      const response = await registerToHackathon(
        hackathon.id,
        token,
        payload.answers
      );
      
      console.log("✅ Registration successful:", response);
      
      // Show success
      showAlert(
        "success", 
        "🎉 You are now registered for this hackathon!",
        "You can now submit projects and participate in the hackathon."
      );
      
      setIsRegistered(true);
      setShowRegistrationModal(false);
      
      // Update local storage
      localStorage.setItem("registered-" + params.id, "true");

    } catch (error: any) {
      console.error("❌ Registration error:", error);
      
      // Show specific error message from API
      if (error.message) {
        showAlert(
          "error", 
          "Registration failed",
          error.message
        );
      } else {
        showAlert(
          "error", 
          "Registration failed",
          "An error occurred during registration. Please try again."
        );
      }
      throw error; // Re-throw to be caught by modal
    } finally {
      setIsRegistering(false);
    }
  };

  // Check if registration is open
  const isRegistrationOpen = () => {
    if (!hackathon) return false;
    const now = new Date();
    const regStart = new Date(hackathon.registrationStart as string);
    const regEnd = new Date(hackathon.registrationEnd);
    return now >= regStart && now <= regEnd;
  };

  // Check if registration has ended
  const isRegistrationEnded = () => {
    if (!hackathon) return false;
    const now = new Date();
    const regEnd = new Date(hackathon.registrationEnd);
    return now > regEnd;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if hackathon is private
  const isPrivateHackathon = hackathon?.isPrivate;

  return (
    <main className="min-h-screen bg-[#f2f2f5] flex flex-col">
      <Navbar />
   <div className="w-full px-10 mb-10 mt-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

    {/* LEFT IMAGE */}
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm h-[560px] flex">
      <div className="flex-1 flex items-center justify-center">
        <img
          src="/images/signin-art5.png"
          className="max-h-[520px] w-auto object-contain"
        />
      </div>
    </div>

    {/* RIGHT CARD */}
    <div className="col-span-1 h-[620px] flex">
      <div className="flex-1">
        <HackathonInfoCard hackathon={hackathon} />
      </div>
    </div>

  </div>
</div>




      {/* HEADER SECTION BELOW CARD */}
      <div className="w-full bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-10 py-5 flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
          <div className="flex flex-col max-w-3xl">
            {/* TITLE */}
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {hackathon?.title}
              {isPrivateHackathon && (
                <Lock className="h-5 w-5 text-gray-400 inline ml-2" />
              )}
            </h1>
            <p className="text-sm text-gray-500">
              Build, collaborate, and submit your project
            </p>
            
            {/* Registration Info */}
            {hackathon?.registrationQuestions && hackathon.registrationQuestions.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-sm text-yellow-600">
                <MessageSquare className="h-4 w-4" />
                <span>
                  Registration requires {hackathon.registrationQuestions.length} question(s)
                </span>
              </div>
            )}
            
            {/* Passcode Info for private hackathons */}
            {hackathon?.isPrivate && hackathon.invitePasscode && (
              <div className="mt-1 flex items-center gap-2 text-sm text-blue-600">
                <Key className="h-4 w-4" />
                <span>
                  Private hackathon - Invite passcode required
                </span>
              </div>
            )}
            
            {/* Registration Dates */}
            {hackathon && (
              <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Opens: {formatDate(hackathon.registrationStart as string)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Closes: {formatDate(hackathon.registrationEnd)}
                </span>
              </div>
            )}
          </div>
          
          {/* BUTTONS */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              disabled={!isRegistered}
              className={`px-5 py-2.5 rounded-lg border border-[#18191F] flex items-center gap-2 ${
                isRegistered 
                  ? "bg-[#FCFAF7] hover:bg-gray-200" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FileText className="h-4 w-4" />
              Submit Your Project
            </button>

            {showModal && (
              <SubmitBuidlModal
                hackathonId={hackathon?.id}
                hackathon={hackathon}
                onClose={() => setShowModal(false)}
              />
            )}

            {/* Registration Button with different states */}
            {isRegistered ? (
              <button
                disabled
                className="px-5 py-2.5 rounded-lg bg-green-100 text-green-700 border border-green-300 flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Registered
              </button>
            ) : isRegistrationEnded() ? (
              <button
                disabled
                className="px-5 py-2.5 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Registration Closed
              </button>
            ) : !isRegistrationOpen() ? (
              <button
                onClick={handleOpenRegistration}
                className="px-5 py-2.5 rounded-lg bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Register (Opens Soon)
              </button>
            ) : (
              <button
                onClick={handleOpenRegistration}
                className="px-5 py-2.5 rounded-lg bg-[#FEC601] text-white hover:bg-amber-500 flex items-center gap-2 transition-colors"
              >
                <User className="h-4 w-4" />
                Register as Hacker
              </button>
            )}
          </div>
        </div>
      </div>

      <HackathonDetailsSection hackathon={hackathon} />
      
      {/* Registration Modal */}
      {hackathon && (
        <RegistrationModal
          hackathon={hackathon}
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onRegister={handleRegistrationSubmit}
          isLoading={isRegistering}
        />
      )}
    </main>
  );
}