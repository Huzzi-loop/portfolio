import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  FaJs,
  FaJava,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaDatabase,
  FaSync,
  FaLeaf,
  FaSitemap,
} from "react-icons/fa";
import {
  SiTypescript,
  SiSpringboot,
  SiExpress,
  SiNestjs,
  SiRedis,
  SiPrisma,
  SiReactrouter,
  SiReacthookform,
} from "react-icons/si";
import { GrSystem } from "react-icons/gr";
import { TbApi } from "react-icons/tb";
import { BsServer } from "react-icons/bs";

const SkillsSection = styled.section`
  background: ${({ theme }) => theme.body};
  padding: 5rem 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const SkillsGrid = styled.div`
  margin-top: 3rem;
`;

const SkillCategory = styled(motion.div)`
  margin-bottom: 2.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 25px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    border-radius: 5px;
  }
`;

const SkillsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.2rem;
  color: ${({ theme, color }) => color || theme.primary};
`;

const SkillName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: ${({ theme }) => theme.border};
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  border-radius: 5px;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: <FaJs />, color: "#f7df1e", level: 95 },
        {
          name: "TypeScript",
          icon: <SiTypescript />,
          color: "#3178c6",
          level: 65,
        },
        { name: "Java", icon: <FaJava />, color: "#007396", level: 80 },
        { name: "SQL", icon: <FaDatabase />, color: "#f29111", level: 85 },
      ],
    },
    {
      title: "Frameworks",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#68a063", level: 90 },
        { name: "Express", icon: <SiExpress />, color: "#ffffff", level: 90 },
        { name: "React", icon: <FaReact />, color: "#61dafb", level: 85 },
        { name: "NestJS", icon: <SiNestjs />, color: "#e0234e", level: 75 },
        {
          name: "Spring Boot",
          icon: <SiSpringboot />,
          color: "#6db33f",
          level: 75,
        },
        {
          name: "React Native",
          icon: <FaReact />,
          color: "#61dafb",
          level: 80,
        },
      ],
    },
    {
      title: "Tools & Cloud",
      skills: [
        { name: "Docker", icon: <FaDocker />, color: "#2496ed", level: 80 },
        { name: "Git", icon: <FaGitAlt />, color: "#f05032", level: 90 },
        { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8", level: 85 },
        { name: "AWS", icon: <FaAws />, color: "#ff9900", level: 90 },
        { name: "Redis", icon: <SiRedis />, color: "#dc382d", level: 75 },
        {
          name: "MongoBD",
          icon: <FaLeaf color="green" />,
          color: "#dc382d",
          level: 65,
        },
        { name: "Powersync", icon: <FaSync />, color: "#dc382d", level: 75 },
      ],
    },
    {
      title: "Concepts",
      skills: [
        { name: "DSA", icon: <FaSitemap />, level: 90 },
        { name: "REST APIs", icon: <TbApi />, level: 90 },
        { name: "System Design", icon: <GrSystem />, level: 80 },
        { name: "Microservices", icon: <BsServer />, level: 85 },
        { name: "Low-Level Design", icon: <SiReacthookform />, level: 80 },
      ],
    },
  ];

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <h2 className="section-title">My Skills</h2>

        <SkillsGrid
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} variants={categoryVariants}>
              <CategoryTitle>{category.title}</CategoryTitle>
              <SkillsRow>
                {category.skills.map((skill, i) => (
                  <SkillCard key={i} variants={itemVariants}>
                    <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <ProgressBar>
                      <Progress value={skill.level} />
                    </ProgressBar>
                  </SkillCard>
                ))}
              </SkillsRow>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
