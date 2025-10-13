// app/hackathons/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Building2 } from "lucide-react";

export default function CreateHackathonGate() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Dialog defaultOpen>
        <DialogContent className="sm:max-w-[620px]">
          <DialogHeader className="text-center sm:text-center items-center">
            <div className="mx-auto mb-4 rounded-full bg-orange-50 p-3 text-orange-600 w-14 h-14 flex items-center justify-center">
              <Building2 className="h-7 w-7" />
            </div>

            <DialogTitle className="text-2xl text-center sm:text-center">
              You need to be part of an organization first
            </DialogTitle>

            <DialogDescription className="text-base text-center sm:text-center">
              Create an organization to run bounties, hackathons and grants.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center pt-2">
            <Button
              className="bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700"
              onClick={() => router.push("/dashboard?showCreateOrg=1")}
            >
              Create Organization ↗
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
