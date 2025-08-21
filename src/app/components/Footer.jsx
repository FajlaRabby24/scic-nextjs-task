// components/Footer.js
import { CiGlobe } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 mt-40">
      {/* Logo & Description */}
      <aside>
        <div className="flex items-center space-x-2 mb-3">
          <h1 className="text-2xl font-bold">Next.JS</h1>
        </div>
        <p>
          Products Industries Ltd.
          <br />
          Providing reliable product since 1992
        </p>
      </aside>

      {/* Social Media */}
     <nav>
        <h6 className="footer-title mb-2">Social</h6>
        <div className="grid grid-flow-col gap-4 text-xl">
          <a href="https://x.com/FajlaRabby24" target="_blank" className="hover:text-primary transition">
            <FaXTwitter />
          </a>
          <a href="https://fajlarabby.netlify.app" target="_blank" className="hover:text-primary transition">
            <CiGlobe  />
          </a>
          <a href="https://www.linkedin.com/in/FajlaRabby24" target="_blank" className="hover:text-primary transition">
            <FaLinkedin />
          </a>
          <a href="https://github.com/FajlaRabby24" target="_blank" className="hover:text-primary transition">
            <FaGithub />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
