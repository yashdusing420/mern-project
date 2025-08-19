import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceCard from "@/components/service-card";
import ProfessionalCard from "@/components/professional-card";
import BookingModal from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Plus } from "lucide-react";
import { ServiceCategory, Professional } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Kharghar");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: serviceCategories, isLoading: categoriesLoading } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/service-categories"],
  });

  const { data: professionals, isLoading: professionalsLoading } = useQuery<Professional[]>({
    queryKey: ["/api/professionals"],
  });

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Search:", searchQuery, "Location:", selectedLocation);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Home Services at Your Doorstep
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Book trusted professionals for cleaning, repairs, beauty, and more in Kharghar
              </p>

              {/* Search Bar */}
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search for services..."
                        className="pl-10 text-slate-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="pl-10 text-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kharghar">Kharghar</SelectItem>
                          <SelectItem value="Vashi">Vashi</SelectItem>
                          <SelectItem value="Belapur">Belapur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="bg-accent hover:bg-yellow-600 text-white font-semibold"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional home service worker"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional home services delivered by verified experts
            </p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceCategories?.map((category) => (
                <ServiceCard
                  key={category.id}
                  category={category}
                  onClick={() => {
                    // Navigate to services page with category filter
                    window.location.href = `/services/${category.name.toLowerCase()}`;
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Book services in just 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Choose Service</h3>
              <p className="text-slate-600">
                Select from our wide range of professional home services
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Book Appointment</h3>
              <p className="text-slate-600">
                Select your preferred date, time and professional
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Relax & Enjoy</h3>
              <p className="text-slate-600">
                Our verified professional will arrive at your doorstep on time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Top Professionals
            </h2>
            <p className="text-xl text-slate-600">Verified experts ready to serve you</p>
          </div>

          {professionalsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-200 rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionals?.slice(0, 4).map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  onClick={() => {
                    // Navigate to professional profile
                    console.log("View profile:", professional.id);
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/professionals">
              <Button className="bg-primary text-white px-8 py-3 hover:bg-secondary font-semibold">
                View All Professionals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Book Button */}
      <Button
        className="fixed bottom-6 right-6 bg-accent hover:bg-yellow-600 text-white p-4 rounded-full shadow-2xl z-40"
        size="lg"
        onClick={() => setIsBookingModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <BookingModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
      />

      <Footer />
    </div>
  );
}
