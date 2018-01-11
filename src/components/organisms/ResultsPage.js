import React from 'react';
import styled from 'styled-components';
import NextButton from '../atoms/NextButton';
import PropTypes from 'prop-types';

const ResultsPageWrap = styled.section`
  font-size: 1rem;
  margin: 2rem 1rem 0;
  text-align: center;
`;

const ResultsPageContent = styled.article`
  font-size: 1rem;

  @media (min-width: 600px) {
    font-size: 1.4rem;
  }

  @media (min-width: 900px) {
    font-size: 1.9rem;
  }
`;

const ResultsPageTextSmall = styled.p`
  font-size: 1rem;
`;

const ResultsPageTextLarge = styled.h3`
  background: rgba(0,0,0,0.05);
  font-size: 1.5rem;
  margin: 0;

    @media (min-width: 600px) {
      font-size: 2rem;
    }

    @media (min-width: 900px) {
      font-size: 3rem;
    }
`;


export default function ResultsPage(props) {
  function setResultComment(score) {
    let resultComment;
    if (score <=3) {
      resultComment = "Ouch, try not to beat yourself up too much.";
      return resultComment;
    } else if (score >=4 && score <= 7) {
      resultComment = "Not too bad, but room for improvement.";
      return resultComment;
    } else if (score >= 8 && score <=9) {
      resultComment = "Pretty good! But not quite a perfect score.";
      return resultComment;
    } else {
      resultComment = "Perfect! Well done you. Perhaps you'll get harder questions next time.";
      return resultComment;
    }
  }

  return (
    <ResultsPageWrap style={{display: props.display ? 'block' : 'none'}}>
      <ResultsPageContent>
        <ResultsPageTextSmall>{props.content}</ResultsPageTextSmall>
        <ResultsPageTextLarge>{props.score} out of {props.outOf}</ResultsPageTextLarge>
        <ResultsPageTextSmall>{setResultComment(props.score)}</ResultsPageTextSmall>
      </ResultsPageContent>
      <NextButton buttonText={props.buttonText} onClick={() => props.onClick()} />
    </ResultsPageWrap>
  );
}

ResultsPage.propTypes = {
  content: PropTypes.string,
  buttonText: PropTypes.string,
}

