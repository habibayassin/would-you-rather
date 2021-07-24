import { ADD_POLL_QUESTION, RECEIVE_POLLS,  SAVE_POLL_ANSWER} from '../actions/polls'

export default function polls (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POLLS :
      return {
        ...state,
        ...action.polls
      }
    case SAVE_POLL_ANSWER :
      console.log("i'm triggered")
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_POLL_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }
    default :
      return state
  }
} 