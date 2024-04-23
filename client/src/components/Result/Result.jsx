import React, { useEffect, useState } from 'react';
import './Result.css';

const Result = () => {
  const [candidates, setCandidates] = useState([]);
  const BASE_URL = "http://localhost:5000";

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/candidate/candidates`);
      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
        console.log(data)
      } else {
        console.error('Error fetching candidates:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="result">
      <div className='list-candidate'>
        <h1>Result</h1>
        <div className="listcandidate-format-main">
          <p>Name</p>
          <p>Party</p>
          <p>Votes</p>
        </div>
        <div className="listcandidate-candidates">
          <hr />
          {candidates.map((candidate, index) => (
            <div key={index} className='listcandidate-format-main listcandidate-format'>
              <p>{candidate.name}</p>
              <p>{candidate.party}</p>
              <p>{candidate.votes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
