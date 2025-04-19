import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { FiBookOpen, FiCalendar } from "react-icons/fi";

const EducationSection = styled.section`
  background: ${({ theme }) => theme.body};
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const EducationList = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EducationItem = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
`;

const EducationIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}30,
    ${({ theme }) => theme.secondary}30
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    margin: 0 auto;
  }
`;

const EducationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const EducationDuration = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EducationInstitution = styled.h4`
  font-size: 1.2rem;
  margin: 0;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

const EducationDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.5rem 0 0;
  line-height: 1.6;
`;

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const educationItems = [
    {
      title: "DSA, Java, System Design",
      institution: "Scaler Academy",
      duration: "2024",
      description:
        "Completed advanced courses in Data Structures & Algorithms, Java programming, and System Design principles. Solved 500+ DSA problems and participated in mock interviews.",
      icon: <FiBookOpen />,
    },
    {
      title: "B.Tech in Computer Science & Engineering",
      institution: "UEM, Kolkata",
      duration: "2022",
      description:
        "Graduated with a CGPA of 9.01. Specialized in computer science fundamentals, data structures, algorithms, and software development practices.",
      icon: <FiBookOpen />,
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <EducationSection id="education" ref={ref}>
      <Container>
        <h2 className="section-title">Education</h2>

        <EducationList>
          {educationItems.map((item, index) => (
            <EducationItem
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.2 }}
            >
              <EducationIcon>{item.icon}</EducationIcon>
              <EducationContent>
                <EducationHeader>
                  <EducationTitle>{item.title}</EducationTitle>
                  <EducationDuration>
                    <FiCalendar /> {item.duration}
                  </EducationDuration>
                </EducationHeader>
                <EducationInstitution>{item.institution}</EducationInstitution>
                <EducationDescription>{item.description}</EducationDescription>
              </EducationContent>
            </EducationItem>
          ))}
        </EducationList>
      </Container>
    </EducationSection>
  );
};

export default Education;
