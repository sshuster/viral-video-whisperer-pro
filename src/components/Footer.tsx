
import { Link } from "react-router-dom";
import { Video, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-accent mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Video className="h-6 w-6 text-viral-purple mr-2" />
              <span className="text-lg font-bold">ViralVideoWhisperer</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Turning your content into viral sensations with AI-powered suggestions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-viral-purple transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-viral-purple transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-viral-purple transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-viral-purple transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-viral-purple transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-viral-purple text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ViralVideoWhisperer. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-viral-purple transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-viral-purple transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-viral-purple transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
