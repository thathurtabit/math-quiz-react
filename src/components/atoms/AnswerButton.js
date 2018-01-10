import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
	background: #444;
	border-radius: 100%;
	border: 0;
	box-shadow: 0 0 0 0 rgba(0,0,0,0);
	color: #FFE45A;
	font-size: 1.75em;
	font-family: 'Lora', serif;
	height: 90px;
	line-height: 90px;
	margin: 2rem 1rem 0;
	outline: 0;
	padding: 0;
	text-align: center;
	transform: scale(1);
	transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
	width: 90px;

  &:hover {
    background: #333;
    box-shadow: 0 0 0 20px rgba(0,0,0,0.1);
    cursor: pointer;
    outline: 0;
    transform: scale(0.9);
  }

  &:active {
  	box-shadow: 0 0 0 20px rgba(0,0,0,0.1);
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
