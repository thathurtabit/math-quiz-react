import React, { Component } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import IntroPage from '../organisms/IntroPage';
import ResultsPage from '../organisms/ResultsPage';
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

const Quiz = styled.section`
  font-size: 1.3rem;
`;

const SiteHeader = styled.header`
  font-size: 1.3rem;
`;

const SiteTitle = styled.h1`
  font-size: 2rem;
`;

const SiteIntro = styled.h2`
  font-size: 1rem;
`;

const QuizRound = styled.p`
  font-size: 0.75rem;
  color: #999;
`;

const duration = 300;

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
      show: false,
      showIntro: true,
      showQuiz: false,
      showResults: false,
      siteTitle: 'Math Quiz',
      siteIntro: 'Quick fire math quiz to train your brain',
      pageTitle: 'Intro Page Title',
      pageText: 'This maths quiz will generate random math questions and give you a limited time to answer them',
      pageButtonText: 'Start',
      currentPage: 0,
      questionsTotal: 3,
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

    // Transition In (first page load)
    setTimeout(() => {
      this.setState({
        show: !this.state.show,
      });
    }, duration);
  }


 // Next button
  jumpTo(currentPage) {

    console.log(currentPage);

    currentPage += 1;

    // If we've triggered the Quiz, Show it...
    if (currentPage === 1) {

      // Transition Out
      setTimeout(() => {
        this.setState({ show: !this.state.show });
        // Transition In
        setTimeout(() => {

          this.setState({
            // Transition Out
            show: !this.state.show,
            showIntro: !this.state.showIntro,
            showQuiz: !this.state.showQuiz,
            currentPage: currentPage,
            
          });

        }, duration);
      }, duration);

    // Keep on Quizing until Results are needed
    } else if (currentPage > 1 && currentPage < this.state.questionsTotal + 1) {
    
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
            showQuiz: !this.state.showQuiz,
            showResults: !this.state.showResults,
            currentPage: currentPage,
            siteIntro: 'Results',
            pageText: 'You scored:',
            pageButtonText: 'Restart',
          });
        }, duration);
      }, duration);
    }
  }

  // Reset everything
  reset() {
     // Transition Out
      setTimeout(() => {
        this.setState({ show: !this.state.show });
        // Transition In
        setTimeout(() => {

          this.setState({
            show: !this.state.show,
            showIntro: true,
            showQuiz: false,
            showResults: false,
            siteTitle: 'Math Quiz',
            siteIntro: 'Quick fire math quiz to train your brain',
            pageTitle: 'Intro Page Title',
            pageText: 'This maths quiz will generate random math questions and give you a limited time to answer them',
            pageButtonText: 'Start',
            currentPage: 0,
            questionsTotal: 3,
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
          }, () => {
            // Unselect answers
            //this.unSelectAnswers();
          });

        }, duration);
      }, duration);
  }

  // Render stuff
  render() {
    return (
      <Fade in={this.state.show}>
        <Wrapper>
          <SiteHeader>
            <SiteTitle>
              {this.state.siteTitle}
            </SiteTitle>
            <SiteIntro>
              {this.state.siteIntro}
            </SiteIntro>
            <QuizRound style={{display: this.state.showQuiz ? 'block' : 'none'}}>
              Question: {this.state.currentPage} of {this.state.questionsTotal}
            </QuizRound>
          </SiteHeader>
          
          <IntroPage
            display={this.state.showIntro}
            content={this.state.pageText}
            buttonText={this.state.pageButtonText}
            onClick={() => this.jumpTo(this.state.currentPage)}
          />

          <Quiz style={{display: this.state.showQuiz ? 'block' : 'none'}}>
            <AnswerButton answer={this.state.answer1} outcome={this.state.outcome1} onClick={() => this.jumpTo(this.state.currentPage)} />
            <AnswerButton answer={this.state.answer2} outcome={this.state.outcome2} onClick={() => this.jumpTo(this.state.currentPage)} />
            <AnswerButton answer={this.state.answer3} outcome={this.state.outcome3} onClick={() => this.jumpTo(this.state.currentPage)} />
          </Quiz>

          <ResultsPage
            display={this.state.showResults}
            content={this.state.pageText}
            buttonText={this.state.pageButtonText}
            onClick={() => this.reset()}
          />

        </Wrapper>
      </Fade>
    );
  }
}

export default App;
