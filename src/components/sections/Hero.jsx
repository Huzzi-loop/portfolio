import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FiDownload, FiMessageCircle } from "react-icons/fi";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.2;
`;

const ParticleCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  z-index: 1;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    order: 2;
  }
`;

const HeroImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const ProfileAvatar = styled(motion.div)`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const AvatarPlaceholder = styled.div`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  background: ${({ theme }) => theme.cardBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  color: ${({ theme }) => theme.primary};
`;

const Greeting = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
  font-family: "Fira Code", monospace;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  margin: 0 0 1rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 1.8rem;
  margin: 0 0 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 500px;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TypewriterContainer = styled(motion.div)`
  margin: 2rem 0;
  font-family: "Fira Code", monospace;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  height: 1.5em;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.primary};

  &:hover {
    background: ${({ theme }) => `${theme.primary}20`};
    transform: translateY(-2px);
  }
`;

const Hero = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typewriterTexts = [
    "Backend Dev",
    "Full Stack Builder",
    "AWS Power User",
    "Problem Solver",
  ];

  useEffect(() => {
    const animateTypewriter = () => {
      const currentText = typewriterTexts[typewriterIndex];
      const typingSpeed = isDeleting ? 80 : 150;

      if (!isDeleting && typewriterText === currentText) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      } else if (isDeleting && typewriterText === "") {
        // Move to next text
        setIsDeleting(false);
        setTypewriterIndex(
          (prevIndex) => (prevIndex + 1) % typewriterTexts.length
        );
        return;
      }

      setTypewriterText(
        currentText.substring(
          0,
          isDeleting ? typewriterText.length - 1 : typewriterText.length + 1
        )
      );
    };

    const typeTimer = setTimeout(animateTypewriter, isDeleting ? 80 : 150);
    return () => clearTimeout(typeTimer);
  }, [typewriterText, typewriterIndex, isDeleting]);

  useEffect(() => {
    // Initialize particle animation
    const canvas = document.getElementById("particles");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
          ctx.fillStyle = "#6c63ff50";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const init = () => {
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle());
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(108, 99, 255, ${0.3 - (distance / 100) * 0.3})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }

        requestAnimationFrame(animate);
      };

      init();
      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <HeroSection id="home">
      <HeroBackground>
        <ParticleCanvas id="particles" />
      </HeroBackground>

      <ContentContainer>
        <HeroInfo>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hi there 👋, I'm
          </Greeting>

          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Huzefa Chaiwala
          </Name>

          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Software Engineer 2 | Backend Heavy Full Stack Developer
          </Title>

          <Tagline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Building scalable solutions for real-world impact
          </Tagline>

          <TypewriterContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {">"} {typewriterText}
            <span
              style={{
                marginLeft: 2,
                borderRight: "2px solid",
                animation: "blink 1s step-end infinite",
              }}
            >
              _
            </span>
          </TypewriterContainer>

          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <PrimaryButton
              href="https://drive.google.com/file/d/1Nf7_NEBifUtnRhsyEmIFaxwxXxAzG2gz/view?usp=sharing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> Download Resume
            </PrimaryButton>
            <SecondaryButton
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FiMessageCircle /> Let's Connect
            </SecondaryButton>
          </ButtonContainer>
        </HeroInfo>

        <HeroImage>
          <ProfileAvatar
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
          >
            <img
              src="assets/profile.png"
              alt="Huzefa Chaiwala"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            {/* <AvatarPlaceholder>HC</AvatarPlaceholder> */}
          </ProfileAvatar>
        </HeroImage>
      </ContentContainer>
    </HeroSection>
  );
};

export default Hero;
