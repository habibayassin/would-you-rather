import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PollCard = ({poll, author}) => {

    return (
        <div className="container"style={{ border:'1px solid grey' }}>
        <div>
          <img alt="avatar" className="avatar" src={`${author.avatarURL}`} />
        </div>
        <div>
          <h3>{author.name} asks</h3>
          <div>Would you rather</div>
          <div>{poll.optionOne.text}</div>
          <Link to={`/questions/${poll['id']}`}>
            <button>View Poll</button>
          </Link>
        </div>
        </div>
    );

};

function mapStateToProps({ authedUser, users, polls }, { id }) {
    const poll = polls[id];
    const author = poll ? users[poll.author] : null;
  
    return {
      authedUser,
      poll,
      author,
      id
    };
  }
  
export default connect(mapStateToProps)(PollCard);
