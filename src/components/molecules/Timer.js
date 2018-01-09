import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimerWrap = styled.section`
  font-size: 1rem;
  margin: 2rem 1rem 0;
  text-align: center;
`;

const TimerText = styled.p`
  font-size: 1rem;
`;

const ProgressBar = styled.progress`
  font-size: 1rem;
`;

export default function Timer(props) {

  return (
    <TimerWrap>
        <TimerText>{props.timerText}</TimerText>
        <ProgressBar value={props.timerCurrent} max={props.timerRemaining}></ProgressBar>
    </TimerWrap>
  );
}

Timer.propTypes = {
  content: PropTypes.string,
  buttonText: PropTypes.string,
}

