import React, { useEffect, useState } from 'react';
import './VotingDashboard.css';
import CandidateList from '../CandidateList/CandidateList';
import Vote from '../../assets/vote2.webp';
import { toast } from 'react-toastify';

const VotingDashboard = () => {
  const [token, setToken] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleVote = async (candidateId) => {
    try {
      if (hasVoted) {
        toast.error('You have already voted');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/v1/candidate/vote/${candidateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
console.log(response);
      if (response.ok) {
        toast.success('Vote Successful');
        window.location.href="/result"
        setHasVoted(true);
      } else {
        toast.error('Vote failed');
      }
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Error voting. Please try again later.');
    }
  };

  return (
    <div className="voting-dashboard">
      <div className="image-section">
        <img src={Vote} alt="Vote" />
      </div>
      <div className="candidate-section">
        <div className="candidate-title">
          <p>Name</p>
          <p>Age</p>
          <p>Party</p>
        </div>
        <CandidateList onVote={handleVote} voted={hasVoted} />
      </div>
    </div>
  );
};

export default VotingDashboard;
