import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { FiAward, FiTrendingUp, FiStar } from "react-icons/fi";

const AchievementsSection = styled.section`
  background: ${({ theme }) => theme.body};
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const AchievementIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
`;

const AchievementTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const AchievementDescription = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

const Achievements = () => {
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

  const achievementsList = [
    {
      title: "GATE 2025 Qualified",
      description:
        "Secured a competitive rank in the national GATE examination for computer science and engineering.",
      icon: <FiAward />,
    },
    {
      title: "Top 10% at Scaler",
      description:
        "Solved 500+ DSA problems and ranked in the top 10% of students at Scaler Academy.",
      icon: <FiTrendingUp />,
    },
    {
      title: "Academic Excellence Award",
      description:
        "Received the Academic Excellence Award for outstanding performance in 2022.",
      icon: <FiStar />,
    },
  ];

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
    <AchievementsSection id="achievements" ref={ref}>
      <Container>
        <h2 className="section-title">Achievements</h2>

        <AchievementsGrid>
          {achievementsList.map((achievement, index) => (
            <AchievementCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.2 }}
            >
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDescription>
                {achievement.description}
              </AchievementDescription>
            </AchievementCard>
          ))}
        </AchievementsGrid>
      </Container>
    </AchievementsSection>
  );
};

export default Achievements;
