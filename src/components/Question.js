import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          onAnswered(false); //Times up user didnt anser
          return 10; //reset for next question
        }
        return prevTime - 1;
      }
      );
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId); //clean up the timeout
    }
  }, [timeRemaining, onAnswered]); //runs every second as timeRemaining changes
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); //reset timer
    onAnswered(isCorrect); //report answer
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
