import React from 'react';

import PollCard from './PollCard';

const PollsList = (props) => {
  const { polls } = props;

  return (   
    polls.map((poll) =>     
    <li key={poll.id}>
      <PollCard id={poll.id} /> 
    </li>)     
  );
};

export default PollsList;