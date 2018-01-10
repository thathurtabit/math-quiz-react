import React from 'react';
import styled from 'styled-components';
import NextButton from '../atoms/NextButton';
import PropTypes from 'prop-types';

const IntroPageWrap = styled.section`
  font-size: 1rem;
  margin: 2rem 1rem 0;
  text-align: center;
`;

const IntroPageContent = styled.article`
    font-size: 1.9rem;
    max-width: 600px;
`;

export default function IntroPage(props) {

  return (
    <IntroPageWrap style={{display: props.display ? 'block' : 'none'}}>
      <IntroPageContent>
        {props.content}
      </IntroPageContent>
      <NextButton buttonText={props.buttonText} onClick={props.onClick} />
    </IntroPageWrap>
  );
}

IntroPage.propTypes = {
  content: PropTypes.string,
  buttonText: PropTypes.string,
}

