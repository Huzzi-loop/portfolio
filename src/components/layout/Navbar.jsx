import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";

const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  backdrop-filter: blur(8px);
  background: ${({ theme }) => theme.cardBg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ active }) => (active ? "100%" : "0")};
    height: 2px;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ toggleTheme, theme }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const visibleSection = sectionElements.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarContainer>
      <NavContent>
        <Logo
          onClick={() =>
            document
              .getElementById("home")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          HC.dev
        </Logo>

        <NavLinks>
          {sections.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              active={activeSection === section.id}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(section.id)
                  .scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.label}
            </NavLink>
          ))}
          <ThemeToggle onClick={toggleTheme}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </ThemeToggle>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </NavContent>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {sections.map((section) => (
            <MobileNavLink
              key={section.id}
              href={`#${section.id}`}
              active={activeSection === section.id}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(section.id)
                  .scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              {section.label}
            </MobileNavLink>
          ))}
          <ThemeToggle onClick={toggleTheme}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </ThemeToggle>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
