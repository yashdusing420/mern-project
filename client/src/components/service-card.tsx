import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { ServiceCategory } from "@shared/schema";

interface ServiceCardProps {
  category: ServiceCategory;
  onClick?: () => void;
}

export default function ServiceCard({ category, onClick }: ServiceCardProps) {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      broom: "🧹",
      tools: "🔧",
      cut: "✂️",
      home: "🏠",
    };
    return iconMap[iconName] || "🔧";
  };

  return (
    <Card
      className="bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <span className="text-primary text-xl">{getIconComponent(category.icon)}</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 ml-3">{category.name}</h3>
        </div>
        <p className="text-slate-600 mb-4 line-clamp-2">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            Starting ₹{category.startingPrice}
          </span>
          <div className="flex items-center text-xs text-slate-500">
            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
            <span>{category.rating} ({category.reviewCount?.toLocaleString()})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
