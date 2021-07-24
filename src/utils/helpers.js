export function formatQuestion (poll, users, authedUser) {
    const { id } = poll;
    const hasAnswered = Object.keys(users[authedUser]['answers']).includes(id);
    const answer = hasAnswered ? users[authedUser]['answers'][id] : '';
    return {
      hasAnswered,
      authorName: users[poll['author']]['name'],
      authorAvatar: users[poll['author']]['avatarURL'],
      optionOne: poll['optionOne']['text'],
      optionTwo: poll['optionTwo']['text'],
      answer,
      optionOneVotes: poll['optionOne']['votes'].length,
      optionTwoVotes: poll['optionTwo']['votes'].length
    }
  }

  export function calculatePercentage (optionVotes, sum) {
    return Math.round((optionVotes / sum ) * 100);
  }