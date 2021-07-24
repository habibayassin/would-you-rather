import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser'


function NavBar({currentUser, setAuthedUser}) {

  const handleLogout = () => {
    setAuthedUser(null);
  }
  console.log(currentUser)

return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/home' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
          <li>
            <span>Hello, {currentUser.name}!</span>
          </li>
          <li>
          <img alt="avatar" className="avatar-icon" src={`${currentUser.avatarURL}`} />
          </li>
          <li>
            <NavLink to='/' exact activeClassName='active' onClick={handleLogout}>
              Log out
            </NavLink>
        </li>
      </ul>
    </nav>
);

}

const mapStateToProps = ({ users, authedUser }) => {
  const currentUser = users[authedUser];
  
  return {
    currentUser,
  }
};


export default connect(mapStateToProps, {setAuthedUser})(NavBar);