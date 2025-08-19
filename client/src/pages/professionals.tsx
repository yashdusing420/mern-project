import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProfessionalCard from "@/components/professional-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Professional } from "@shared/schema";

export default function Professionals() {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");

  const { data: professionals, isLoading } = useQuery<Professional[]>({
    queryKey: ["/api/professionals"],
  });

  const filteredProfessionals = professionals?.filter((professional) =>
    selectedSpecialization === "all" 
      ? true 
      : professional.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
  );

  const specializations = ["all", "cleaning", "repair", "beauty", "home care"];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Our Professionals
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Verified experts ready to serve you in Kharghar
          </p>

          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium text-slate-700">Filter by specialization:</span>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec === "all" ? "All Specializations" : spec.charAt(0).toUpperCase() + spec.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredProfessionals && filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
                onClick={() => {
                  console.log("View profile:", professional.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              No professionals found for the selected specialization.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
