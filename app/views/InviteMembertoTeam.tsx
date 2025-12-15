"use client";

import { useEffect, useState } from "react";
import { getHackathonTeams } from "../api/team/getTeams";
import TeamModal from "./TeamModal";
import { useParams, useRouter } from "next/navigation";
import { Team } from "@/src/types/team";
import { useAuth } from "@/src/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { inviteMemberToTeam } from "@/src/api/hackathon/inviteMemberToTeam";
import { getTeams } from "@/src/api/hackathon/team";
import { useAlert } from "../context/AlertProvider";


export default function InviteMemberToTeam() {
    const router = useRouter();
    const { id } = useParams();
    const [teams, setTeams] = useState<Team[]>([]);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [memberIdentifier, setMemberIdentifier] = useState('');
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState(false);
      const { user, isAuthenticated } = useAuth()
    const { showAlert } = useAlert();
    useEffect(() => {
        if (!id) return;

        const fetchTeams = async () => {
            try {
                const res = await getTeams(id as string, {
                    page: 1,
                    limit: 10,
                });
                setTeams(res.data);
            } catch (err) {
                console.error("Error loading teams:", err);
            }
        };

        fetchTeams();
    }, []);

    const handleInviteClick = (team: Team) => {
        console.log('Inviting to team:', team?.members[0]?.user.id);
        setSelectedTeam(team);
        setShowInviteModal(true);
    };

    const handleInviteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!memberIdentifier.trim() || !selectedTeam || !id) {
                  showAlert("warning", "Missing information", 'Please enter an email or username');

            return;
        }

        setIsLoading(true);
        
        try {
            // Appel à l'API pour inviter un membre
            await inviteMemberToTeam(id as string, selectedTeam.id, {
                member_identifier: memberIdentifier.trim()
            });
            
            // Réinitialiser le formulaire
            setMemberIdentifier('');
            setShowInviteModal(false);
            showAlert("success", "Invitation sent",`Invitation sent to ${memberIdentifier} to join ${selectedTeam.name}`);

        } catch (error: any) {
            console.error('Error sending invitation:', error);
            showAlert("warning", "Invitation not sent", error.message || 'Failed to send invitation. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

  return (
     <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Join a Team</h3>
                        
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="text-primary-600 mt-1">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-primary-800 mb-1">Find Your Perfect Team</h4>
                                    <p className="text-primary-700 text-sm">
                                        Browse teams looking for members or create your own team. 
                                        Make sure to check team requirements and available spots.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Browse Teams */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-lg">Browse Teams</h4>
                                    <span className="text-sm text-gray-500">{teams.length} teams available</span>
                                </div>
                                <div className="space-y-4">
                                    {teams.map((team) => (
                                        <div key={team.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-all duration-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h5 className="font-medium">{team.name}</h5>
                                                    <p className="text-sm text-gray-500">
                                                        {team.members?.length || 0} members 
                                                    </p>
                                                </div>
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
                                            </div>
                                            {team.tagline && (
                                                <p className="text-gray-600 text-sm mb-3">{team.tagline}</p>
                                            )}
                                            {/* <div className="flex flex-wrap gap-1 mb-3">
                                                {team.requiredSkills?.map((skill, index) => (
                                                    <span key={index} className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">
                                                        {skill}
                                                    </span>
                                                )) || (
                                                    <>
                                                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">Frontend</span>
                                                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">Blockchain</span>
                                                    </>
                                                )}
                                            </div> */}
                                            {user?.id == team.members[0].user.id && <button 
                                                onClick={() => handleInviteClick(team)}
                                                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 rounded-lg transition-all duration-200"
                                            >
                                                Invite Member
                                            </button>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-lg mb-4">Quick Actions</h4>
                                    <div className="space-y-3">
                                        <button 
                                            onClick={() => router.push(`/hackathons/${id}/create-team`)} 
                                            className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </div>
                                                <div className="text-left">
                                                    <h5 className="font-medium">Create New Team</h5>
                                                    <p className="text-sm text-gray-500">Start your own team</p>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        
                                        {/* <button 
                                            onClick={() => {
                                                if (teams.length > 0) {
                                                    handleInviteClick(teams[0]);
                                                }
                                            }}
                                            className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-lg transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                    </svg>
                                                </div>
                                                <div className="text-left">
                                                    <h5 className="font-medium">Invite Teammates</h5>
                                                    <p className="text-sm text-gray-500">Share invite link</p>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-lg mb-3">Team Requirements</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Maximum 5 members per team
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            At least 1 developer required
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Submit team details before deadline
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Modal d'invitation */}
                        {showInviteModal && selectedTeam && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-semibold">Invite Member</h3>
                                        <button 
                                            onClick={() => setShowInviteModal(false)}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                            disabled={isLoading}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                                        <p className="text-sm text-primary-700">
                                            Inviting to team: <span className="font-semibold">{selectedTeam.name}</span>
                                        </p>
                                    </div>
                                    
                                    <form onSubmit={handleInviteSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email or Username
                                                </label>
                                                <input
                                                    type="text"
                                                    value={memberIdentifier}
                                                    onChange={(e) => setMemberIdentifier(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="Enter email address or username"
                                                    required
                                                    disabled={isLoading}
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Enter the email address or username of the person you want to invite
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Message (Optional)
                                                </label>
                                                <textarea
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="Add a personal message..."
                                                    rows={3}
                                                    defaultValue="Join our team for the hackathon! We're looking for talented members to collaborate with."
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setShowInviteModal(false)}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    'Send Invitation'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
  );
}
  
