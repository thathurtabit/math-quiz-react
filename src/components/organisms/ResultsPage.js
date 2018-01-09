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
`;

export default function ResultsPage(props) {

  return (
    <ResultsPageWrap style={{display: props.display ? 'block' : 'none'}}>
      <ResultsPageContent>
        <p>{props.content}</p>
        <p>{props.score} out of {props.outOf}</p>
      </ResultsPageContent>
      <NextButton buttonText={props.buttonText} onClick={() => props.onClick()} />
    </ResultsPageWrap>
  );
}

ResultsPage.propTypes = {
  content: PropTypes.string,
  buttonText: PropTypes.string,
}

