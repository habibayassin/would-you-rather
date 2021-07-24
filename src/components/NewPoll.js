import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';

import {handleAddQuestion} from '../actions/polls'
import NavBar from './NavBar'

const NewPoll = ({loggedOut, handleAddQuestion}) => {

    const [optionOne , setOptionOne] = useState('');
    const [optionTwo , setOptionTwo] = useState('');
    const history = useHistory();


    const handleChange = name => e => {

        if (name === 'optionOne') {
            setOptionOne(e.target.value)
        } 
        if (name === 'optionTwo'){
            setOptionTwo(e.target.value)
        } 
      };
    const   handleSubmit = (e) => {
        e.preventDefault();
        console.log(optionOne)
        console.log(optionTwo)
        handleAddQuestion(optionOne, optionTwo)
        setOptionOne('');
        setOptionTwo('');
        history.push("/home")

      }

      let to = '/new'
    if (loggedOut) {
      return <Redirect to={{
        pathname: '/',
        state: {
          to
        }
      }} />
    }
    
    return (
      <div> <NavBar/>
        <div>
          <h3>Add Your Question</h3>
          <h2>Would You Rather ...</h2>
          <textarea placeholder='Enter Option One Here' value={optionOne} onChange={handleChange('optionOne')}/>
          <textarea placeholder='Enter Option Two Here' value={optionTwo} onChange={handleChange('optionTwo')}/>
          <button variant='outlined' size='small' color='primary' onClick={handleSubmit}
              disabled={optionOne === '' || optionTwo === ''}>
              Submit
          </button>
        </div>
      </div>
    );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedOut: authedUser === null
});

export default connect(mapStateToProps, {handleAddQuestion})(NewPoll);