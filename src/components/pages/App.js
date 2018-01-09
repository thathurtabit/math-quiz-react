import React, { Component } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import IntroPage from '../organisms/IntroPage';
import Question from '../atoms/Question';
import AnswerButton from '../atoms/AnswerButton';
import Timer from '../molecules/Timer';
import ResultsPage from '../organisms/ResultsPage';

const SiteWrapper = styled.section`
  font-family: 'Montserrat', sans-serif;
  padding: 0;
`;

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.3em;
  justify-content: center;
  text-align: center;

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
  font-size: 1.5rem;
  left: 50%;
  position: absolute;
  top: 0;
  text-align: center;
  transform: translateX(-50%);
`;

const SiteTitle = styled.h1`
  font-size: 2.5rem;
`;

const AnswerWrap = styled.section`
  font-size: 1rem;
`;

const SiteIntro = styled.h2`
  font-size: 1rem;
`;

const QuizRound = styled.p`
  border-radius: 20px;
  font-size: 0.75rem;
  color: #fff;
  background: rgba(0,0,0,0.2);
  padding: 5px 10px;
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
      pageText: 'This maths quiz will generate random math questions and give you a limited time to answer them',
      pageButtonText: 'Start',
      currentPage: 0,
      questionsTotal: 10,
      questionText: 'What is...',
      questionOperatorArray: ['+','-','*','/'],
      questionValueA: 0,
      questionOperator: '',
      questionValueB: 0,
      questionValueMin: 3,
      questionValueMax: 10,
      questionTimeOut: 10000,
      timerText: 'Time until next question...',
      timerCurrent: 10,
      timerRemaining: 10,
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
      questionTimer: 0,
    }

    this.jumpTo = this.jumpTo.bind(this);
    this.reset = this.reset.bind(this);
  }

  // React Lifecycle - triggered before first page render
  componentWillMount() {
    
    this.generateQuestionValues();

    // Transition In (first page load)
    setTimeout(() => {
      this.setState({
        show: !this.state.show,
      });
    }, duration);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.state.questionTimer);
  }

  // Knuth shuffle array
  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Check for duplicate answers
  checkForDuplicates(lastAnswer, number) {
    const getRandomInt = (minVal, maxVal) => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    let tweakVal = getRandomInt(1,3);
    console.log(tweakVal);
    if (lastAnswer !== number) {
      return number;
    } else {
      return number + tweakVal;
    }
  };

  generateQuestionValues(event) {
    let minQuestionVal = this.state.questionValueMin;
    let maxQuestionVal = this.state.questionValueMax;
    let operatorsArray = this.state.questionOperatorArray;
    const getRandomInt = (minVal, maxVal) => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    const getRandomOperator = (array) => array[Math.floor(Math.random() * array.length)];
    let valueA = getRandomInt(minQuestionVal, maxQuestionVal);
    let valueB = this.checkForDuplicates(valueA, getRandomInt(minQuestionVal, maxQuestionVal));
    let operator = getRandomOperator(operatorsArray);

    // Set those values
    this.setState({
      questionValueA: valueA,
      questionOperator: operator,
      questionValueB: valueB,
    }, () => {
      this.generateAnswerValues(event);
    });
  }

  generateAnswerValues(event) {
    const getRandomInt = (minVal, maxVal) => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    let valueA = this.state.questionValueA;
    let operator = this.state.questionOperator;
    let valueB = this.state.questionValueB;
    let minVal = 1;
    let maxVal = 5;
    let answersArray = [];
    // Required because the operator is currently a string
    let operatorFunctions = {
      '+': (a, b) => (a + b),
      '-': (a, b) => (a - b),
      '/': (a, b) => (a / b).toFixed(2),
      '*': (a, b) => (a * b),
    };

    // Check they're not the same values
    let answer1 = operatorFunctions[operator](valueA, valueB);
    let answer2 = this.checkForDuplicates(answer1, operatorFunctions[operator](getRandomInt(minVal, maxVal), valueB));
    let answer3 = this.checkForDuplicates(answer2, operatorFunctions[operator](getRandomInt(minVal, maxVal), valueA));

    // Push the answers to an array so we can shuffle
    answersArray.push(answer1, answer2, answer3);

    // Shuffle that array
    this.shuffleArray(answersArray);

    // Loop and shorten the values if they're recurring, i.e. 1.5555555555...

    for (let i = 0; i < answersArray.length; i++) {
      if (!Number.isInteger(answersArray[i])) {
        console.log(`isInteger: ${answersArray[i]}`);
        answersArray[i] = parseFloat(answersArray[i]).toFixed(2);
      }
    }

    // Set those values
    this.setState({
      correctAnswer: Number(answer1),
      answer1: answersArray[0],
      answer2: answersArray[1],
      answer3: answersArray[2],
    });
  }

  // Start countdown to next question...
  startCountdown() {
    console.log("COUNTDOWN STARTED");

    clearInterval(this.state.questionTimer);
    
      console.log('Interval: ' + this.state.questionTimer);
      
      // SetState
      let timeCurrent = this.state.timerCurrent;
      
      let questionTimer = setInterval(() => {
        // Decrement each iteration
        timeCurrent-=1;
        // SetState
        this.setState({
          timerCurrent: timeCurrent,
        });

        // If no answer if given, time out and move on
        if (timeCurrent <= 0) {
          this.jumpTo(null);
        }
      }, 1000);

      // SetState - save timer object in state
      this.setState({questionTimer: questionTimer});
    
  }


  handleSelectedValue(event) {

    let userAnswer = event ? Number(event.currentTarget.value) : null;
    let addPoint = this.state.answerScore;
    addPoint += 1; //iterate

    console.log(`User's last answer was: ${userAnswer} : ${typeof(userAnswer)} | Actual answer was: ${this.state.correctAnswer} : ${typeof(this.state.correctAnswer)}`);

    if (userAnswer === Number(this.state.correctAnswer)) {
      console.log('DIRECT HIT');
      this.setState({
        answerScore: addPoint,
      });
    }
  }

 // Next button
  jumpTo(event) {
    
    let currentPage = this.state.currentPage;
    currentPage +=1; // increment

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
            timerCurrent: 10,
            
          }, () => {
            this.startCountdown();
          });

        }, duration);
      }, duration);

    // Keep on Quizing until Results are needed
    } else if (currentPage > 1 && currentPage < this.state.questionsTotal + 1) {

      this.handleSelectedValue(event);
    
    // Transition Out
      setTimeout(() => {
        this.setState({ show: !this.state.show });
        // Transition In
        setTimeout(() => {

          // Generate random values
          this.generateQuestionValues(event);

          this.setState({
            // Transition Out
            show: !this.state.show,
            currentPage: currentPage,
            timerCurrent: 10,
            
          }, () => {
            this.startCountdown();
          });

        }, duration);
      }, duration);

    // Else, results page
    } else {

      clearInterval(this.state.questionTimer);
      this.handleSelectedValue(event);

       // Transition Out
      setTimeout(() => {
        this.setState({
          show: !this.state.show,
          timerCurrent: 10,
          questionTimer: 0,
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

    console.log('RESET');

     // Transition Out
      setTimeout(() => {
        this.setState({ show: !this.state.show });
        // Generate random values
        
        this.generateQuestionValues();

        // Transition In
        setTimeout(() => {

          this.setState({
            show: !this.state.show,
            showIntro: true,
            showQuiz: false,
            showResults: false,
            siteIntro: 'Quick fire math quiz to train your brain',
            pageText: 'This maths quiz will generate random math questions and give you a limited time to answer them',
            pageButtonText: 'Start',
            currentPage: 0,
            questionText: 'What is...',
            instruction: 'Select your answer before the timer runs out',
            answerScore: 0,
            totalTimeToDeduct: 0,
          });

        }, duration);
      }, duration);
  }

  // Render stuff
  render() {
    return (
      
      <SiteWrapper>
        <SiteHeader>
          <SiteTitle>
            {this.state.siteTitle}
          </SiteTitle>
          <SiteIntro>
            {this.state.siteIntro}
          </SiteIntro>
          <QuizRound style={{display: this.state.showQuiz ? 'inline-block' : 'none'}}>
            Question: {this.state.currentPage} of {this.state.questionsTotal}
          </QuizRound>
        </SiteHeader>
        
        <IntroPage
          display={this.state.showIntro}
          content={this.state.pageText}
          buttonText={this.state.pageButtonText}
          onClick={this.jumpTo} 
        />

        <Fade in={this.state.show}>
          <Wrapper>
            <Quiz style={{display: this.state.showQuiz ? 'block' : 'none'}}>
              <Question questionText={this.state.questionText} valueA={this.state.questionValueA} operator={this.state.questionOperator} valueB={this.state.questionValueB} />
              <AnswerWrap >
                <AnswerButton answer={this.state.answer1} outcome={this.state.outcome1} onClick={this.jumpTo} />
                <AnswerButton answer={this.state.answer2} outcome={this.state.outcome2} onClick={this.jumpTo} />
                <AnswerButton answer={this.state.answer3} outcome={this.state.outcome3} onClick={this.jumpTo} />
              </AnswerWrap>
              <Timer timerText={this.state.timerText} timerCurrent={this.state.timerCurrent} timerRemaining={this.state.timerRemaining} />
            </Quiz>

            <ResultsPage
              display={this.state.showResults}
              content={this.state.pageText}
              score={this.state.answerScore}
              outOf={this.state.questionsTotal}
              buttonText={this.state.pageButtonText}
              onClick={this.reset}
            />
            </Wrapper>
        </Fade>
      </SiteWrapper>
        
    );
  }
}

export default App;
