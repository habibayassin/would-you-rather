import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { formatQuestion, calculatePercentage } from '../utils/helpers';
import {handleAnswer} from '../actions/polls'
import ProgressBar from './ProgressBar'
import NavBar from './NavBar'


const Poll = ({id, poll, author, handleAnswer, loggedOut}) => {

    const [option, setOption] = useState('optionOne');

    console.log(poll)

    const handleOptionChange =  (changeEvent) => {
        setOption(changeEvent.target.value);
    }
    
    const handleFormSubmit =  (formSubmitEvent) =>{
        formSubmitEvent.preventDefault();
        console.log('You have selected:', option);
        let answer=option
        handleAnswer(id, answer)
    };

    console.log("debug issue: ", id)
    //let location = useLocation();
    let to = `/questions/${id}`
    if (loggedOut) {

      console.log("helloooooooooooooooooooooooo",to)
      return <Redirect to={{
        pathname: '/',
        state: {
          to
        }
      }} />
    }

    return (
        <div><NavBar/>
        {!poll? <p>This question does not exist!</p>: 
        <div>
            <div>
          <img alt="avatar" className="avatar" src={`${author.avatarURL}`} />
        </div>

        {!poll.hasAnswered && 
        <div>
          <h3>{author.name} asks</h3>
          <div>Would you rather</div>
          <div>

            <form onSubmit={handleFormSubmit}>
              <div>
                <label>
                  <input type="radio" value="optionOne" checked={option === 'optionOne'} onChange={handleOptionChange} />
                  {poll.optionOne}?
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" value="optionTwo" checked={option === 'optionTwo'} onChange={handleOptionChange}/>
                  {poll.optionTwo}?
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>

          </div>
        </div>}


        {
            poll.hasAnswered && 
            <div>
                <h3>Asked by {author.name}</h3>
                <div>Results</div>
            <div style={{ border: poll.answer === 'optionOne'? '2px solid green': 'none'}}>
                <h4>{poll.optionOne}</h4>
            <p>{poll.optionOneVotes} out of {poll.optionOneVotes+poll.optionTwoVotes} votes</p>
            <div >
            <ProgressBar bgcolor="#00695c" completed={calculatePercentage(poll.optionOneVotes, poll.optionOneVotes+poll.optionTwoVotes)} />
            </div>
            </div>
            <div style={{ border: poll.answer === 'optionTwo'? '2px solid green': 'none'}}>
              <h4>{poll.optionTwo}</h4>
              <p>{poll.optionTwoVotes} out of {poll.optionOneVotes+poll.optionTwoVotes} votes</p>
              <div>
              <ProgressBar bgcolor="#00695c" completed={calculatePercentage(poll.optionTwoVotes, poll.optionOneVotes+poll.optionTwoVotes)} />
            </div>
            </div>
            </div>
        }


        </div>}
        </div>
    );

};

function mapStateToProps({ authedUser, users, polls }, props) {
    const { question_id } = props.match.params;
    let id = question_id
    const poll = polls[id];
    const author = poll ? users[poll.author] : null;
  
    return {
      loggedOut: authedUser === null,
      authedUser,
      author,
      id,
      poll:  poll && authedUser ? formatQuestion(poll, users, authedUser) : null,
    };
}

export default connect(mapStateToProps, {handleAnswer})(Poll);