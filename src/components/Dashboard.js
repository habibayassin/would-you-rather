import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PollsList from './PollsList';
import NavBar from './NavBar'


export const getAnsweredQuestions = (user, questions) => {
    const answeredQuestions = Object.values(questions).filter((question) => {
        return question.optionOne.votes.indexOf(user) > -1 || question.optionTwo.votes.indexOf(user) > -1;
    });

    return answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
};

export const getUnansweredQuestions = (user, questions) => {
    const unAnsweredQuestions = Object.values(questions).filter((question) => {
        return question.optionOne.votes.indexOf(user) === -1 && question.optionTwo.votes.indexOf(user) === -1;
    });

    return unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
};

const Dashboard = ({ authedUser, polls,loggedOut }) => {
    const [answeredPolls, setansweredPolls] = useState(false);

    let to = "/home"
    if (loggedOut) {
      return <Redirect to={{
        pathname: '/',
        state: {
          to
        }
      }} />
    }
  
    return (
      <div><NavBar />
      <div>
        <div>
          <button onClick={() => setansweredPolls(false)}>
            Unanswered Questions
          </button>
          <button onClick={() => setansweredPolls(true)}>
            Answered Questions
          </button>
        </div>
        <ul>
            <PollsList polls={answeredPolls? getAnsweredQuestions(authedUser, polls):  getUnansweredQuestions(authedUser, polls)} />
        </ul>
      </div>
      </div>
    );
  };
  
  function mapStateToProps({ polls, authedUser }) {
    return {
      loggedOut: authedUser === null ,
      authedUser,
      polls
    };
  }
  
  export default connect(mapStateToProps)(Dashboard);