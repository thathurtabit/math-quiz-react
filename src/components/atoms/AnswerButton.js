import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
	background: rgba(0,0,0,0.05);
	border-radius: 100%;
	border: 0;
	color: palevioletred;
	font-size: 1.5em;
	height: 80px;
	line-height: 80px;
	margin: 2rem 1rem 0;
	padding: 0;
	text-align: center;
	width: 80px;

  &:hover,
  &:focus {
    background: rgba(0,0,0,0.1);
    cursor: pointer;
    outline: 0;
  }

  &:active {
    background: palevioletred;
    color: #fff;
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
