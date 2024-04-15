import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { solutions } from "./Data";

const AccordionSolutions = () => {
  const [open, setOpen] = useState(solutions[0].id);
  const imgSrc = solutions.find((s) => s.id === open)?.imgSrc;

  return (
    <Section>
      <Container>
        <div>
          <Title>Solutions</Title>
          <SolutionContainer>
            {solutions.map((q) => (
              <Solution
                {...q}
                key={q.id}
                open={open}
                setOpen={setOpen}
                index={q.id}
              />
            ))}
          </SolutionContainer>
        </div>
        <AnimatePresence mode="wait">
          <SolutionImage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </AnimatePresence>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  padding: 2rem 1.5rem;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
`;

const Container = styled.div`
  max-width: 60rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(32rem, 1fr) 1fr; /* Switched the order */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* For smaller screens, only one column */
  }
`;

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SolutionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SolutionImage = styled(motion.div)`
  background-color: #cbd5e0;
  border-radius: 1rem;
  aspect-ratio: auto;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`;

const Solution = ({ title, description, index, open, setOpen }) => {
  const isOpen = index === open;

  const SolutionWrapper = styled.div`
    padding: 0.125rem;
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  `;

  const SolutionContent = styled(motion.div)`
    border-radius: 0.5rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 20;
    transition: height 0.5s ease-in-out; /* Add transition property */

    div {
      padding: 1rem 1.5rem 0.5rem;
    }

    p {
      margin-top: 0.5rem;
      color: rgba(0, 0, 0, ${isOpen ? "0" : "1"});
      background-image: linear-gradient(to right, #8b5cf6, #4f46e5);
      -webkit-background-clip: text;
      background-clip: text;
      font-size: 1.25rem;
      font-weight: 500;
      transition: color 0.3s ease-in-out;
    }
  `;

  const LearnMoreButton = styled(motion.button)`
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0 0 0.5rem 0.5rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    background-image: linear-gradient(to right, #8b5cf6, #4f46e5);
    color: #ffffff;
    transition: opacity 0.3s ease-in-out;

  /* Animation on hover */
  &:hover svg {
    transform: translateX(5px); /* Translate the icon 5px on hover */

  }
  `;

  const Overlay = styled(motion.div)`
    position: absolute;
    inset: 0;
    z-index: 10;
    background-image: linear-gradient(to right, #8b5cf6, #4f46e5);
    transition: opacity 0.3s ease-in-out;
  `;

  const Background = styled.div`
    position: absolute;
    inset: 0;
    z-index: 0;
    background-color: #cbd5e0;
  `;

  return (
    <SolutionWrapper onClick={() => setOpen(index)}>
      <SolutionContent
        initial={false}
        animate={{ height: isOpen ? "15rem" : "4.2rem" }}
        
      >
        <div>
          <motion.p>{title}</motion.p>
          <motion.p>{description}</motion.p>
        </div>
        <LearnMoreButton initial={false} animate={{ opacity: isOpen ? 1 : 0 }}>
          <span>Learn more</span>
          <FiArrowRight />
        </LearnMoreButton>
      </SolutionContent>
      <Overlay 
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
              }} />
      <Background />
    </SolutionWrapper>
  );
};

export default AccordionSolutions;
