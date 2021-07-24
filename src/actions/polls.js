import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { saveUserAnswer, addUserQuestion } from './users';

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const SAVE_POLL_ANSWER = 'SAVE_POLL_ANSWER'
export const ADD_POLL_QUESTION = 'ADD_POLL_QUESTION'

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  }
}

export function savePollAnswer ({qid, answer, authedUser}) {
  console.log("answer is",answer)
  return {
    type: SAVE_POLL_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function addPollQuestion (question) {
  return {
    type: ADD_POLL_QUESTION,
    question
  }
}

export function handleAnswer (qid, answer) {
  console.log("handlilng answer for id", qid)
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(savePollAnswer({qid, answer, authedUser}));
        dispatch(saveUserAnswer({qid, answer, authedUser}));
      })
  }
}

export function handleAddQuestion (optionOne, optionTwo) {
  console.log("handlilng save question")
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo
    })
      .then((question) => {
        dispatch(addPollQuestion(question));
        dispatch(addUserQuestion(question));
      })
  }
}