import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  FiSend,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

const ContactSection = styled.section`
  background: ${({ theme }) => theme.body};
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => theme.cardBg};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  background: ${({ success, theme }) =>
    success ? theme.primary + "20" : "#ff595e20"};
  color: ${({ success, theme }) => (success ? theme.primary : "#ff595e")};
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactIntro = styled.div`
  margin-bottom: 2rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ContactDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const ContactDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ContactText = styled.div``;

const ContactLabel = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const ContactValue = styled.a`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: "Please fill all fields",
      });
      return;
    }

    setStatus({
      submitting: true,
      submitted: false,
      success: false,
      message: "",
    });

    try {
      // Replace with your EmailJS service ID, template ID, and user ID
      const result = await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_USER_ID"
      );

      if (result.status === 200) {
        setStatus({
          submitting: false,
          submitted: true,
          success: true,
          message: "Message sent successfully!",
        });
        setFormState({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: "Failed to send message. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const contactVariants = {
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
    <ContactSection id="contact" ref={ref}>
      <Container>
        <h2 className="section-title">Get In Touch</h2>

        <ContactGrid>
          <ContactForm
            ref={formRef}
            onSubmit={handleSubmit}
            variants={contactVariants}
            initial="hidden"
            animate={controls}
          >
            <FormTitle>Send me a message</FormTitle>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your Message"
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={status.submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status.submitting ? "Sending..." : "Send Message"}
              <FiSend />
            </SubmitButton>

            {status.submitted && (
              <FormMessage
                success={status.success}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status.success ? <FiCheck /> : <FiAlertCircle />}
                {status.message}
              </FormMessage>
            )}
          </ContactForm>

          <ContactInfo
            variants={contactVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <ContactIntro>
              <ContactTitle>Let's talk about everything!</ContactTitle>
              <ContactDescription>
                Feel free to reach out to discuss job opportunities, projects,
                or just to say hi. I'm always open to new connections and
                conversations.
              </ContactDescription>
            </ContactIntro>

            <ContactDetailsWrapper>
              <ContactDetail>
                <ContactIcon>
                  <FiMail />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue href="mailto:hchai52@gmail.com">
                    hchai52@gmail.com
                  </ContactValue>
                </ContactText>
              </ContactDetail>

              <ContactDetail>
                <ContactIcon>
                  <FiPhone />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue href="tel:+917003588060">
                    +91-700-358-8060
                  </ContactValue>
                </ContactText>
              </ContactDetail>
            </ContactDetailsWrapper>

            <div>
              <ContactLabel>Connect with me</ContactLabel>
              <SocialLinks>
                <SocialLink
                  href="https://linkedin.com/in/huzefa-chaiwala-1426811b2"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <FiLinkedin />
                </SocialLink>
                <SocialLink
                  href="https://github.com/Huzefa52"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <FiGithub />
                </SocialLink>
                <SocialLink
                  href="mailto:hchai52@gmail.com"
                  whileHover={{ y: -5 }}
                >
                  <FiMail />
                </SocialLink>
              </SocialLinks>
            </div>
          </ContactInfo>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
