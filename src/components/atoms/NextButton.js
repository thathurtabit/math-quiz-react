import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: rgba(0,0,0,0.05);
  border: 0;
  color: palevioletred;
  font-size: 1.5em;
  margin: 2rem 1rem 0;
  padding: 1rem;
  text-align: center;

  &:hover,
  &:focus {
    background: rgba(0,0,0,0.1);
    outline: 0;
    cursor: pointer;
  }

  &:active {
    background: palevioletred;
    color: #fff;
  }

`;

export default function NextButton(props)  {
	return (
		<Button onClick={props.onClick}>
			{props.buttonText}
		</Button>
	);
}

NextButton.propTypes = {
  answer: PropTypes.string,
}
