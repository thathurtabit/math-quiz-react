import React, { Component } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import AnswerButton from '../atoms/AnswerButton';

const Wrapper = styled.section`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.3em;
  text-align: center;
  color: palevioletred;

  &.fade-enter {
    opacity: 0.01;
    transform: scale(.98);
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-out;
    transform: scale(1);
  }

  &.fade-exit {
    opacity: 1;
    transform: scale(1);
  }

  &.fade-exit.fade-exit-active {
    opacity: 0.01;
    transform: scale(.98);
    transition: opacity 350ms ease-in, transform 350ms ease-out;
  }
`;

// Fade handler
const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={duration}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

class App extends Component {

  // State constructor
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: 'Math Quiz',
      siteIntro: 'Quick fire math quiz to train your brain',
      currentPage: 0,
      questionsTotal: 10,
      questionText: 'What is...',
      instruction: 'Select your answer before the timer runs out',
      correctAnswer: 1,
      answer1: 1,
      answer2: 2,
      answer3: 3,
      outcome1: false,
      outcome2: false,
      outcome3: false,
      answerScore: 0,
      totalTimeToDeduct: 0,
      totalScore: 0,
    }
  }

  // React Lifecycle - triggered before first page render
  componentWillMount() {
    //this.generateQuestion();
  }


 // Next button
  jumpTo(currentPage) {

    currentPage += 1;

    // If there's still questions to ask...
    if (currentPage < questionsTotal) {

      // Transition Out
      setTimeout(() => {
        this.setState({ show: !this.state.show });
        // Transition In
        setTimeout(() => {

          this.setState({
            // Transition Out
            show: !this.state.show,
            currentPage: currentPage,
            
          });

        }, duration);
      }, duration);

    // You've reached the results page...
    } else {
       // Transition Out
      setTimeout(() => {
        this.setState({
          show: !this.state.show,
        });

        // Process Results
        //this.processResults();

        // Transition In
        setTimeout(() => {
          this.setState({
            // Transition Out
            show: !this.state.show,
          });
        }, duration);
      }, duration);
    }
  }


  render() {
    return (
      <Fade in={this.state.show}>
        <Wrapper>
          <header className="App-header">
            {this.state.siteTitle}
          </header>
          <p className="App-intro">
            {this.state.siteIntro}
          </p>

          <AnswerButton answer={this.state.answer1} outcome={this.state.outcome1} onClick={() => this.jumpTo(this.state.currentPage)} />
          <AnswerButton answer={this.state.answer2} outcome={this.state.outcome2} onClick={() => this.jumpTo(this.state.currentPage)} />
          <AnswerButton answer={this.state.answer3} outcome={this.state.outcome3} onClick={() => this.jumpTo(this.state.currentPage)} />
        </Wrapper>
      </Fade>
    );
  }
}

export default App;
