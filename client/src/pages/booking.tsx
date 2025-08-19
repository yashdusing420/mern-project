import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BookingModal from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";

export default function Booking() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Book Your Service
          </h1>
          <p className="text-xl text-slate-600">
            Quick and easy booking process for all your home service needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                Easy Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Choose your preferred date and time slot that works best for you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Quick Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Our professionals arrive on time and complete the work efficiently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Doorstep Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                All services are provided at your home for maximum convenience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                24/7 Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Round-the-clock customer support for any queries or assistance.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-white px-8 py-4 text-lg"
            onClick={() => setIsBookingModalOpen(true)}
          >
            Book Service Now
          </Button>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">How to Book</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Select Service & Professional</h3>
                <p className="text-slate-600">
                  Choose the service you need and your preferred professional.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Pick Date & Time</h3>
                <p className="text-slate-600">
                  Select your preferred date and available time slot.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Provide Details</h3>
                <p className="text-slate-600">
                  Enter your address, contact details, and any special requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Confirm Booking</h3>
                <p className="text-slate-600">
                  Review your booking details and confirm. You'll receive a confirmation message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
      />

      <Footer />
    </div>
  );
}
