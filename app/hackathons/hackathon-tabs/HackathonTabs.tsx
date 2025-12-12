// app/views/HackathonTabs.jsx (or in your components folder)
"use client";

import { useState } from 'react';

export default function HackathonTabs() {
    const [activeTab, setActiveTab] = useState('buidls');

    const tabs = [
        { id: 'details', label: 'Details' },
        { id: 'buidls', label: 'BUIDLs' },
        { id: 'hackers', label: 'Hackers', count: 292 },
        { id: 'join-team', label: 'Join a Team' },
        { id: 'tracks', label: 'New Tracks' },
        { id: 'dates', label: 'Important Dates' },
        { id: 'submission', label: 'Submission Requirements' },
        { id: 'resources', label: 'Resources' },
        { id: 'questions', label: 'Ask Question' },
        { id: 'ideas', label: 'Ideas' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'details':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Hackathon Details</h3>
                        <p className="text-gray-600">
                            This hackathon brings together developers, designers, and entrepreneurs 
                            to build innovative solutions. Join us for an exciting weekend of coding!
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Theme</h4>
                                <p className="text-gray-600">Web3 & DeFi Innovation</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Prize Pool</h4>
                                <p className="text-gray-600">$50,000+</p>
                            </div>
                        </div>
                    </div>
                );
            
            case 'buidls':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">BUIDLs</h3>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                                Submit BUIDL
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">Project {item}</h4>
                                        <span className="text-sm text-gray-500">24h ago</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">
                                        An innovative solution for decentralized voting...
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">by Team Crypto</span>
                                        <div className="flex gap-2">
                                            <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">Web3</span>
                                            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">DeFi</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 'hackers':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Hackers ({292})</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200">
                                All Hackers
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200">
                                Looking for Team
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200">
                                By Skills
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="font-semibold text-blue-600">U{item}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">User {item}</h4>
                                            <p className="text-sm text-gray-500">Full Stack Developer</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">React</span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Node.js</span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Solidity</span>
                                    </div>
                                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-200 text-sm">
                                        Connect
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 'join-team':
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Join a Team</h3>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="text-blue-600 mt-1">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-800 mb-1">Find Your Perfect Team</h4>
                                    <p className="text-blue-700 text-sm">
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
                                    <span className="text-sm text-gray-500">12 teams available</span>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((team) => (
                                        <div key={team} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h5 className="font-medium">Team Alpha {team}</h5>
                                                    <p className="text-sm text-gray-500">Looking for 2 more members</p>
                                                </div>
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Frontend</span>
                                                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Blockchain</span>
                                                <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Design</span>
                                            </div>
                                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                                                Request to Join
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-lg mb-4">Quick Actions</h4>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-200">
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
                                        
                                        <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all duration-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                                        </button>
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
                    </div>
                );
            
            case 'tracks':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">New Tracks</h3>
                        <p className="text-gray-600">Explore the different competition tracks for this hackathon.</p>
                        {/* Add track content */}
                    </div>
                );
            
            case 'dates':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Important Dates</h3>
                        <p className="text-gray-600">Mark your calendar with these important deadlines.</p>
                        {/* Add dates content */}
                    </div>
                );
            
            default:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">{tabs.find(t => t.id === activeTab)?.label}</h3>
                        <p className="text-gray-600">Content for {tabs.find(t => t.id === activeTab)?.label} will be displayed here.</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm">
            <div className="border-b border-gray-200">
                <nav className="flex flex-wrap -mb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`mr-8 py-4 px-1 border-b-2 font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab.label}
                            {tab.count && (
                                <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="p-6">
                {renderTabContent()}
            </div>
        </div>
    );
}