import React, { useState} from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useLocation, Redirect } from "react-router-dom";


const Login = ({users, setAuthedUser}) => {

  let location = useLocation();
  const [loggedIn, setloggedIn] = useState(false)

    const handleSetUser = (user) => {
        setAuthedUser(user)
        // history.push(location.state || {
        //   from: { pathname: '/home' }
        // });
        //history.push(location.state.to||"/home")
        setloggedIn(true)
    }

    let to = '/home';
    if (location.state) {
      to = location.state.to;
    }

    if (loggedIn) {
      return <Redirect to={to} />
    }

    return (
        <div>
          <h2>Welcome to...</h2>
          <h3>Would You Rather...</h3>
          <h4>Select User</h4>
          {Object.keys(users).map(user => (
            <button key={user} onClick={() => handleSetUser(user)}>
              {users[user].name}
            </button>
          ))}
        </div>
      );
}

function mapStateToProps({ users }) {
    return {
      users
    };
  }
  
  export default connect(mapStateToProps, {setAuthedUser})(Login);