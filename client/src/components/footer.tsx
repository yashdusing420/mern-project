import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ServiceHub</h3>
            <p className="text-slate-300 mb-4">
              Your trusted partner for all home services in Kharghar and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  House Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AC Repair
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beauty Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Electrical Work
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Partner with Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Kharghar, Navi Mumbai
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 98765 43210
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                hello@servicehub.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
          <p>&copy; 2024 ServiceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
