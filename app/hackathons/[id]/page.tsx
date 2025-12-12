import HackathonInfoCard from "@/app/views/HackathonInfoCard";
import { getHackathonDetails } from "@/src/api/hackathon/hackathonDetails";
import Image from "next/image";
import HackathonTabs from "../hackathon-tabs/HackathonTabs";

export default async function HackathonDetails({ params }) {
    const hackathon = await getHackathonDetails(params.id);
    
    return (
        <main className="min-h-screen bg-[#f2f2f5] p-10 flex justify-center">
            <div className="max-w-7xl w-full flex flex-col gap-6">
                
                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT IMAGE */}
                    <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm h-[620px]">
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/signin-art5.png"
                                alt="Hackathon Banner"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="lg:col-span-1 h-[620px]">
                        <HackathonInfoCard hackathon={hackathon} />
                    </div>
                </div>

                <HackathonTabs />

            </div>
        </main>
    );
}