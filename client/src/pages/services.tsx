import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceCard from "@/components/service-card";
import { ServiceCategory } from "@shared/schema";

export default function Services() {
  const { category } = useParams();

  const { data: serviceCategories, isLoading } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/service-categories"],
  });

  const filteredServices = category
    ? serviceCategories?.filter(
        (service) => service.name.toLowerCase() === category.toLowerCase()
      )
    : serviceCategories;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            {category ? `${category} Services` : "All Services"}
          </h1>
          <p className="text-xl text-slate-600">
            Professional {category ? category.toLowerCase() : ""} services in Kharghar
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} category={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No services found for this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
