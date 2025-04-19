import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { FiUser, FiCode, FiCoffee } from "react-icons/fi";

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.body};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const AboutVisual = styled.div`
  position: relative;
  height: 100%;
  min-height: 300px;

  @media (max-width: 768px) {
    order: 1;
    min-height: 250px;
  }
`;

const CodeBlock = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};
  line-height: 1.5;
  overflow: auto;
  position: relative;
`;

const CodeLine = styled(motion.div)`
  display: flex;

  &:before {
    content: "${(props) => props.lineNum}";
    opacity: 0.5;
    width: 1rem;
    margin-right: 1rem;
    text-align: right;
  }
`;

const Keyword = styled.span`
  color: #ff79c6;
`;

const String = styled.span`
  color: #f1fa8c;
`;

const Punctuation = styled.span`
  color: #ff79c6;
`;

const Comment = styled.span`
  color: #6272a4;
`;

const FunctionName = styled.span`
  color: #50fa7b;
`;

const Variable = styled.span`
  color: #8be9fd;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AboutSubtitle = styled(motion.h3)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AboutDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const AboutQuote = styled(motion.blockquote)`
  border-left: 4px solid ${({ theme }) => theme.primary};
  padding-left: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.textSecondary};
  margin: 1.5rem 0;
`;

const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const codeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <h2 className="section-title">About Me</h2>

        <AboutContent>
          <AboutText>
            <AboutTitle
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
            >
              Passionate About Building Scalable Systems
            </AboutTitle>

            <AboutSubtitle
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
            >
              <FiUser /> Software Engineer based in India
            </AboutSubtitle>

            <AboutDescription
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
            >
              I'm a software engineer who loves building backend systems,
              scaling APIs, and creating intelligent apps. I specialize in
              Node.js, Spring Boot, AWS, and React. I'm passionate about clean
              architecture, solving business problems, and continuous learning.
            </AboutDescription>

            <AboutDescription
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
              transition={{ delay: 0.2 }}
            >
              My expertise includes designing efficient databases, implementing
              secure authentication systems, and optimizing application
              performance. I enjoy tackling complex challenges and transforming
              business requirements into elegant technical solutions.
            </AboutDescription>

            <AboutQuote
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
              transition={{ delay: 0.3 }}
            >
              "The best way to predict the future is to implement it." - Alan
              Kay
            </AboutQuote>
          </AboutText>

          <AboutVisual>
            <CodeBlock
              initial="hidden"
              animate={controls}
              variants={codeVariants}
            >
              <CodeLine lineNum="01" variants={lineVariants}>
                <Keyword>class</Keyword>&nbsp;
                <FunctionName>SoftwareEngineer</FunctionName> &nbsp;{"{"}
              </CodeLine>
              <CodeLine lineNum="02" variants={lineVariants}>
                &nbsp;<Keyword>constructor</Keyword>() {"{"}
              </CodeLine>
              <CodeLine lineNum="03" variants={lineVariants}>
                &nbsp;&nbsp;
                <Variable>this</Variable>.<Variable>name</Variable> ={" "}
                <String>"Huzefa Chaiwala"</String>;
              </CodeLine>
              <CodeLine lineNum="04" variants={lineVariants}>
                &nbsp;&nbsp;
                <Variable>this</Variable>.<Variable>title</Variable> ={" "}
                <String>"Software Engineer"</String>;
              </CodeLine>
              <CodeLine lineNum="05" variants={lineVariants}>
                &nbsp;&nbsp;
                <Variable>this</Variable>.<Variable>location</Variable> ={" "}
                <String>"Kolkata, India"</String>;
              </CodeLine>
              <CodeLine lineNum="06" variants={lineVariants}>
                &nbsp;&nbsp;
                <Variable>this</Variable>.<Variable>skills</Variable> = [
                <String>"Node.js"</String>, <String>"Java"</String>,{" "}
                <String>"AWS"</String>, <String>"React"</String>];
              </CodeLine>
              <CodeLine lineNum="07" variants={lineVariants}>
                &nbsp;
                {"}"};
              </CodeLine>
              <CodeLine lineNum="08" variants={lineVariants}>
                {" "}
              </CodeLine>
              <CodeLine lineNum="09" variants={lineVariants}>
                &nbsp;
                <FunctionName>buildScalableSolutions</FunctionName>() {"{"}
              </CodeLine>
              <CodeLine lineNum="10" variants={lineVariants}>
                &nbsp;&nbsp;
                <Keyword>return</Keyword>&nbsp;
                <String>"Clean architecture + Efficient code"</String>;
              </CodeLine>
              <CodeLine lineNum="11" variants={lineVariants}>
                &nbsp;
                {"}"};
              </CodeLine>
              <CodeLine lineNum="12" variants={lineVariants}>
                {" "}
              </CodeLine>
              <CodeLine lineNum="13" variants={lineVariants}>
                &nbsp;
                <FunctionName>solveProblems</FunctionName>(
                <Variable>problem</Variable>) {"{"}
              </CodeLine>
              <CodeLine lineNum="14" variants={lineVariants}>
                &nbsp;&nbsp;
                <Keyword>const</Keyword> &nbsp;<Variable>solution</Variable> ={" "}
                <Variable>analyze</Variable>(<Variable>problem</Variable>)
              </CodeLine>
              <CodeLine lineNum="15" variants={lineVariants}>
                &nbsp;&nbsp;&nbsp;
                <Punctuation>.</Punctuation>
                <Variable>plan</Variable>()
              </CodeLine>
              <CodeLine lineNum="16" variants={lineVariants}>
                &nbsp;&nbsp;&nbsp;
                <Punctuation>.</Punctuation>
                <Variable>implement</Variable>()
              </CodeLine>
              <CodeLine lineNum="17" variants={lineVariants}>
                &nbsp;&nbsp;&nbsp;
                <Punctuation>.</Punctuation>
                <Variable>test</Variable>()
              </CodeLine>
              <CodeLine lineNum="18" variants={lineVariants}>
                &nbsp;&nbsp;&nbsp;
                <Punctuation>.</Punctuation>
                <Variable>deploy</Variable>();
              </CodeLine>
              <CodeLine lineNum="19" variants={lineVariants}>
                {" "}
              </CodeLine>
              <CodeLine lineNum="20" variants={lineVariants}>
                &nbsp;&nbsp;
                <Keyword>return</Keyword>&nbsp; <Variable>solution</Variable>;
              </CodeLine>
              <CodeLine lineNum="21" variants={lineVariants}>
                &nbsp;
                {"}"};
              </CodeLine>
              <CodeLine lineNum="22" variants={lineVariants}>
                {"}"}
              </CodeLine>
            </CodeBlock>
          </AboutVisual>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
