import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuestionWrap = styled.p`
  font-size: 3rem;
  font-family: 'Lora', serif;
  margin: 2rem 1rem 0;
  text-align: center;

  span {
  	background: rgba(0,0,0,0.05);
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
