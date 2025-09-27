import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProfessionalCard from "@/components/professional-card";

// Use any until you define a strict type
type Pro = any;

export default function Professionals() {
  const { data: professionals = [], isLoading } = useQuery<Pro[]>({
    queryKey: ["professionals"],
    queryFn: async () => {
      const res = await fetch("/api/professionals");
      if (!res.ok) throw new Error("Failed to load professionals");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
          Our Professionals
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          Verified experts ready to serve you in Kharghar
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : professionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {professionals.map((professional: Pro) => (
              <ProfessionalCard
                key={professional.id || professional.email}
                professional={professional}
                onClick={() => console.log("View profile:", professional.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No professionals found.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
