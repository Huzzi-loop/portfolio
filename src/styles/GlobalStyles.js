import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.secondary};
  }

  code, pre {
    font-family: 'Fira Code', monospace;
  }

  section {
    padding: 5rem 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Utility classes */
  .section-title {
    position: relative;
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    text-align: center;
    color: ${({ theme }) => theme.text};
  }

  .section-title:after {
    content: '';
    position: absolute;
    height: 4px;
    width: 60px;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    border-radius: 2px;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: ${({ theme }) => theme.text}; }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}80;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }

  /* Back to top button */
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${({ theme }) => theme.primary};
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .back-to-top.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .back-to-top:hover {
    background: ${({ theme }) => theme.secondary};
    transform: translateY(-3px);
  }
`;

export default GlobalStyles;
