import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
	background: #444;
	border-radius: 100%;
	border: 0;
	color: #FDB802;;
	font-size: 1.75em;
	height: 90px;
	line-height: 90px;
	margin: 2rem 1rem 0;
	padding: 0;
	text-align: center;
	transform: scale(1);
	width: 90px;

  &:hover,
  &:focus {
    background: #333;
    cursor: pointer;
    outline: 0;
  }

  &:active {
  	background: #222;
    transform: scale(0.9);
  }
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
