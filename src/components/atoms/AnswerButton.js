import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  font-size: 1.5em;
  margin: 2rem 1rem 0;
  text-align: center;
  color: palevioletred;
`;

export default function AnswerButton(props)  {
	return (
		<Button value={props.answer} onClick={props.onClick}>
			{props.answer}
		</Button>
	);
}

AnswerButton.propTypes = {
  answer: PropTypes.oneOfType([
	  PropTypes.string,
	  PropTypes.number
	]),
}
