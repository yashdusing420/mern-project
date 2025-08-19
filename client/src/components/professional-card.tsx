import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Professional } from "@shared/schema";

interface ProfessionalCardProps {
  professional: Professional;
  onClick?: () => void;
}

export default function ProfessionalCard({ professional, onClick }: ProfessionalCardProps) {
  return (
    <Card
      className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={professional.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"}
        alt={professional.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-slate-800 mb-1">{professional.name}</h3>
        <p className="text-sm text-slate-600 mb-2">{professional.specialization} Specialist</p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(Number(professional.rating))
                    ? "fill-current"
                    : "stroke-current fill-transparent"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 ml-1">
            ({professional.rating}) {professional.reviewCount} reviews
          </span>
        </div>
        <p className="text-xs text-slate-500">{professional.experience}+ years experience</p>
        {professional.isVerified && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Verified
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
