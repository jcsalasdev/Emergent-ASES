import React from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { COMPANY } from "@/mock";

export const MobileCTA = () => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50">
      <div className="backdrop-blur-xl bg-black/40 border-t border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Button asChild className="btn-amber h-11 flex-1">
            <a href="#quote">Request a Quote</a>
          </Button>
          <Button asChild variant="outline" className="h-11 px-4 border-white/20 text-white hover:bg-white/10">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2"><PhoneCall size={18}/> Call</a>
          </Button>
        </div>
      </div>
    </div>
  );
};