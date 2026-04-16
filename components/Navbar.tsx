import Button from "@/components/Button";
import Image from "next/image";
import logo from "@/public/cnx247_logo-t.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50  backdrop-blur-md  ">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold text-primary tracking-tight">
          <Image src={logo} alt="CNX247 Logo" width={80} height={80} />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-body">
          <li>
            <a
              href="#features"
              className="hover:text-primary transition-colors duration-200"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#why"
              className="hover:text-primary transition-colors duration-200"
            >
              Why CNX247
            </a>
          </li>
          <li>
            <a
              href="#cta"
              className="hover:text-primary transition-colors duration-200"
            >
              Pricing
            </a>
          </li>
        </ul>

        <Button className="hidden md:inline-flex !px-5 !py-2 !text-sm">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
