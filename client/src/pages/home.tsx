import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { ServiceCategory, Professional } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Kharghar");

  const { data: serviceCategories, isLoading: categoriesLoading } =
    useQuery<ServiceCategory[]>({
      queryKey: ["/api/service-categories"],
    });

  const { data: professionals, isLoading: professionalsLoading } =
    useQuery<Professional[]>({
      queryKey: ["/api/professionals"],
    });

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
                  {/* Search Input */}
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

                  {/* Location - fixed to Kharghar */}
                  <div className="flex-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="pl-10 text-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kharghar">Kharghar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Use My Location Button */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        () => {
                          // ✅ Always set Kharghar since app is only for Kharghar
                          setSelectedLocation("Kharghar");
                        },
                        () => {
                          // ❌ If blocked, still keep Kharghar
                          setSelectedLocation("Kharghar");
                        }
                      );
                    }}
                  >
                    Use My Location
                  </Button>

                  {/* Search Button */}
                  <Button className="bg-accent hover:bg-yellow-600 text-white font-semibold">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
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

      {/* Services + Professionals */}
      <Footer />
    </div>
  );
}
