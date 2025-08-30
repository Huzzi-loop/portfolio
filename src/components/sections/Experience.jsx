import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FiBriefcase, FiCode } from "react-icons/fi";

const ExperienceSection = styled.section`
  background: ${({ theme }) => theme.body};
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Override vertical timeline styles
const CustomTimelineStyles = styled.div`
  .vertical-timeline-element-content {
    background: ${({ theme }) => theme.cardBg};
    box-shadow: ${({ theme }) => theme.shadow};
    padding: 2rem;
    border-radius: 12px;
  }

  .vertical-timeline-element-content-arrow {
    border-right: 7px solid ${({ theme }) => theme.cardBg};
  }

  .vertical-timeline-element-icon {
    box-shadow:
      0 0 0 4px ${({ theme }) => theme.primary},
      inset 0 2px 0 rgba(0, 0, 0, 0.08),
      0 3px 0 4px rgba(0, 0, 0, 0.05);
  }

  /* Center align the timeline */
  .vertical-timeline {
    width: 95%;
    max-width: 1170px;
    margin: 0 auto;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.text};
`;

const TimelineSubtitle = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 10px 0;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

const TimelineDuration = styled.p`
  font-size: 0.9rem;
  margin: 0 0 15px 0;
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
`;

const AchievementsList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
`;

const AchievementItem = styled.li`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Experience = () => {
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

  const experiences = [
    {
      title: "Software Engineer 2",
      company: "Powerschool",
      duration: "July 2025 – Present",
      icon: <FiBriefcase />,
      iconBackground: "#6c63ff",
      achievements: [],
    },
    {
      title: "Software Engineer",
      company: "Wingsure",
      duration: "Feb 2022 – Present",
      icon: <FiBriefcase />,
      iconBackground: "#6c63ff",
      achievements: [
        "Developed a real time service to sync changes between the client and server",
        "Built fault-tolerant sync APIs using AWS that process thousands of daily requests",
        "Scaled microservices architecture to support 500+ concurrent users",
        "Developed internal admin tools with React for improved team productivity",
        "Implemented CI/CD pipelines using GitHub Actions and AWS CodePipeline",
        "Developed and maintained User Service and Product Service using Node.js and Express",
        "Optimized Redis caching and SQL queries for 40% faster response times",
        "Mentored junior engineers and led bi-weekly code reviews",
      ],
    },
    {
      title: "Intern",
      company: "Wingsure",
      duration: "Jul 2021 – Jan 2022",
      icon: <FiCode />,
      iconBackground: "#4a6bff",
      achievements: [
        "Created dynamic PDF generation system using Node.js and Puppeteer",
        "Built scalable frontend modules in React used by the entire company",
        "Performed backend load testing with JMeter to identify performance bottlenecks",
        "Participated in daily stand-ups and agile development process",
        "Received early promotion to full-time role based on performance",
      ],
    },
    {
      title: "Intern",
      company: "Dot Com Solutions",
      duration: "May 2019 – Aug 2019",
      icon: <FiCode />,
      iconBackground: "#4a6bff",
      achievements: [
        "Assisted in the development of a new company website",
        "Built scalable apps using React Native",
        "Helped in setting up and coding the backend using PHP and MySQL",
        "Performed backend load testing with JMeter to identify performance bottlenecks",
      ],
    },
  ];

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <h2 className="section-title">Professional Experience</h2>

        <CustomTimelineStyles>
          <VerticalTimeline animate={inView} layout="1-column-left">
            {experiences.map((exp, index) => (
              <VerticalTimelineElement
                key={index}
                date={exp.duration}
                iconStyle={{ background: exp.iconBackground, color: "#fff" }}
                icon={exp.icon}
                contentStyle={{ display: "block" }}
              >
                <TimelineTitle>{exp.title}</TimelineTitle>
                <TimelineSubtitle>{exp.company}</TimelineSubtitle>
                <TimelineDuration>{exp.duration}</TimelineDuration>

                <AchievementsList>
                  {exp.achievements.map((achievement, i) => (
                    <AchievementItem key={i}>{achievement}</AchievementItem>
                  ))}
                </AchievementsList>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </CustomTimelineStyles>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
