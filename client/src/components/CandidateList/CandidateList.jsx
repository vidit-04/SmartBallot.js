import React, { useEffect, useState } from 'react';
import './CandidateList.css';
import CandidateCard from '../CandidateCard/CandidateCard';

const CandidateList = ({ onVote, voted }) => {
  const [candidates, setCandidates] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/candidates`)
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  return (
    <div className='candidates-container'>
      {candidates.map(candidate => (
        <CandidateCard key={candidate._id} candidate={candidate} onVote={onVote} voted={voted} />
      ))}
    </div>
  );
};

export default CandidateList;
