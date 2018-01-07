import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuestionWrap = styled.p`
  font-size: 1.5em;
  margin: 2rem 1rem 0;
  text-align: center;
  color: palevioletred;
`;

export default function Question(props)  {
	return (
		<QuestionWrap>
			{props.questionText} {props.valueA} {props.operator} {props.valueB} ?
		</QuestionWrap>
	);
}

Question.propTypes = {
  answer: PropTypes.number,
}
