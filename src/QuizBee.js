import React from "react";
import "./assets/style.css"
import quizService from "./quizService"
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";


class QuizBee extends React.Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank:question
      })
    })
  }

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer){
       this.setState({
         score: this.state.score + 1
       })
    }
    this.setState({
      responses: this.state.responses < 5 ? 
      this.state.responses + 1 : 5
    })
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    })
   
  }

  // to bring in set of question object from our API
  componentDidMount(){
    this.getQuestions()
  }


  render(){
    return(
      <div className="container">
      <div className="title">QUIZ<span className="danger">ZIFY</span></div>
      {/* checking if there is something to render */}
          {this.state.questionBank.length > 0 && 
          this.state.responses < 5 &&
          this.state.questionBank.map(
                          ({question, answers, correct, questionId}) => (<QuestionBox 
                          question={question} 
                          options={answers} 
                          key={questionId}

                          selected={answer => this.computeAnswer(answer, correct)}/> ) 
                  ) 
              }
              {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />): null}
      </div>
    )
  }
}

export default QuizBee

  // we used component DidMount to bring in set of question object from our API
// we populated a state variable with this data
// we den render the question text from this data in our jsx template