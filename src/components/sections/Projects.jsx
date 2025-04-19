import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// Add this to ensure styled-components doesn't leak class names
// This helps in development by making class names more readable and predictable
const StyledComponentsConfig = {
  displayName: false, // Turn off display names in production
  componentId: false, // Don't add component IDs in class names
};

const ProjectsSection = styled.section`
  background: ${({ theme }) => theme.body};
  padding: 5rem 0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CarouselContainer = styled.div`
  position: relative;
  margin: 3rem 0;
  width: 100%;
  padding: 0 50px; /* Add padding to avoid content overlap with buttons */
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  overflow: hidden; /* Prevent elements from spilling outside */
`;

const CarouselCard = styled(motion.div)`
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (min-width: 1024px) {
    flex: 0 0 33.333%;
    max-width: 33.333%;
  }
`;

const ProjectCard = styled(motion.div).attrs(() => ({
  className: "project-card", // Explicit className for debugging
}))`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    ${ProjectCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

const ProjectImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}40,
    ${({ theme }) => theme.secondary}40
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const HighlightItem = styled.li`
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};

  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled(motion.a)`
  padding: 0.5rem;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const CarouselButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.cardBg};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 10;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 5px;
`;

const NextButton = styled(CarouselButton)`
  right: 5px;
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
`;

const CarouselDot = styled.button`
  width: ${(props) => (props.active ? "30px" : "10px")};
  height: 10px;
  border-radius: 10px;
  background: ${({ active, theme }) => (active ? theme.primary : theme.border)};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.primary : theme.primary + "80"};
  }
`;

const NavigationControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Calculate carousel pages based on screen size
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const carouselRef = useRef(null);

  // Projects data
  const projects = [
    {
      title: "Quotation App",
      description:
        "A desktop application for creating and managing business quotations with ChatGPT integration for automated formatting and content suggestions.",
      image: "/src/assets/projects/quotation.png",
      techStack: ["Electron", "React", "Node.js", "MySQL"],
      highlights: [
        "Used by 5+ clients, 1000+ quotations",
        "ChatGPT integration for auto-formatting",
        "Custom PDF generation and dashboard charts",
      ],
      github: "",
      live: "",
    },
    {
      title: "E-Commerce Platform",
      description:
        "A scalable e-commerce platform built with microservice architecture, featuring secure payment processing and authentication.",
      image: "/src/assets/projects/ecommerce.png",
      techStack: ["Java", "Spring Boot", "Stripe", "OAuth2", "Redis"],
      highlights: [
        "Microservice architecture",
        "Stripe integration",
        "OAuth2 & Redis caching",
      ],
      github: "",
      live: "",
    },
    {
      title: "In-Memory Cache System",
      description:
        "An efficient in-memory caching system implementing popular eviction algorithms and extensible design patterns for optimal performance.",
      image: "/src/assets/projects/cache.png",
      techStack: ["Java", "Design Patterns", "Algorithms"],
      highlights: [
        "Implements LRU/Random eviction",
        "Uses Strategy & Observer design patterns",
      ],
      github: "https://github.com/Huzzi-loop/in-memory-cache",
      live: "",
    },
    {
      title: "Sorting Visualizer",
      description:
        "A web-based sorting visualizer that demonstrates various sorting algorithms in real-time, helping users understand their efficiency and mechanics.",
      image: "/src/assets/projects/sorting.png",
      techStack: ["React", "DSA"],
      highlights: [
        "Implements sorting algorithms like BubbleSort, SelectionSort, QuickSort and MergeSort",
        "Interactive UI for real-time visualization",
      ],
      github: "https://github.com/Huzzi-loop/SortingVisualiser",
      live: "https://sortvisualiser.web.app/",
    },
  ];

  // Calculate total number of pages
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    // Initial call
    handleResize();

    // Set up listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset current page when items per page changes
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  // Carousel animation controls
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Handle carousel pagination
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <h2 className="section-title">Projects</h2>

        <CarouselContainer>
          <PrevButton
            onClick={prevPage}
            disabled={currentPage === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
          >
            <FiChevronLeft size={24} />
          </PrevButton>

          <CarouselTrack
            ref={carouselRef}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            style={{
              transform: `translateX(${-currentPage * 100}%)`,
              transition: "transform 0.5s ease",
            }}
          >
            {projects.map((project, index) => (
              <CarouselCard key={index}>
                {project && (
                  <ProjectCard variants={cardVariants}>
                    {project.image ? (
                      <ProjectImage>
                        <img src={project.image} alt={project.title} />
                      </ProjectImage>
                    ) : (
                      <ProjectImagePlaceholder>
                        {project.title ? project.title.charAt(0) : ""}
                      </ProjectImagePlaceholder>
                    )}
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>
                        {project.description}
                      </ProjectDescription>

                      <TechStack>
                        {project.techStack.map((tech, i) => (
                          <TechTag key={i}>{tech}</TechTag>
                        ))}
                      </TechStack>

                      <HighlightsList>
                        {project.highlights.map((highlight, i) => (
                          <HighlightItem key={i}>{highlight}</HighlightItem>
                        ))}
                      </HighlightsList>

                      <ProjectLinks>
                        {project.github && (
                          <ProjectLink
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiGithub /> GitHub
                          </ProjectLink>
                        )}
                        {project.live && (
                          <ProjectLink
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiExternalLink /> Live Demo
                          </ProjectLink>
                        )}
                      </ProjectLinks>
                    </ProjectContent>
                  </ProjectCard>
                )}
              </CarouselCard>
            ))}
          </CarouselTrack>

          <NextButton
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
          >
            <FiChevronRight size={24} />
          </NextButton>
        </CarouselContainer>

        <NavigationControls>
          <CarouselDots>
            {Array.from({ length: totalPages }).map((_, index) => (
              <CarouselDot
                key={index}
                active={currentPage === index}
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </CarouselDots>
          <PageIndicator>
            <FiChevronLeft
              onClick={currentPage > 0 ? prevPage : undefined}
              style={{
                cursor: currentPage > 0 ? "pointer" : "not-allowed",
                opacity: currentPage > 0 ? 1 : 0.5,
                marginRight: "10px",
              }}
            />
            Page {currentPage + 1} of {totalPages}
            <FiChevronRight
              onClick={currentPage < totalPages - 1 ? nextPage : undefined}
              style={{
                cursor:
                  currentPage < totalPages - 1 ? "pointer" : "not-allowed",
                opacity: currentPage < totalPages - 1 ? 1 : 0.5,
                marginLeft: "10px",
              }}
            />
          </PageIndicator>
        </NavigationControls>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
