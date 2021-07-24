import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import LeaderboardCard from "./LeaderboardCard";
import NavBar from './NavBar'

const Leaderboard = ({sortedUsers, loggedOut}) => {

  let to = '/leaderboard'
  if (loggedOut) {
    return <Redirect to={{
      pathname: '/',
      state: {
        to
      }
    }} />
  }

    return (
      <div><NavBar/>
      <div>
        <ul>
          {sortedUsers.map(user => (
            <li key={user.id}>
              <LeaderboardCard user={user} />
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
}

function mapStateToProps({ users, authedUser }) {
  const sortedUsers = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length));
  return {
    sortedUsers,
    loggedOut: authedUser === null ,
  };
}

export default connect(mapStateToProps)(Leaderboard);