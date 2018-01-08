import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuestionWrap = styled.p`
	font-family: 'Fjalla One', sans-serif;
  font-size: 1.5em;
  margin: 2rem 1rem 0;
  text-align: center;
  color: palevioletred;

  span {
  	background: rgba(0,0,0,0.03);
  	padding: 3px 5px;
  }
`;

export default function Question(props)  {
	return (
		<QuestionWrap>
			{props.questionText} <span>{props.valueA} {props.operator} {props.valueB}</span>?
		</QuestionWrap>
	);
}

Question.propTypes = {
  answer: PropTypes.number,
}
