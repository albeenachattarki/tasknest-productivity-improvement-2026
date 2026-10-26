import React, { useEffect, useState } from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { fetchScore } from '../services/api';

const ScoreWidget = ({ tasks }) => {
  const [score, setScore] = useState({ value: 0, completionRate: 0, consistencyBonus: 0, activeDays: 0 });
  useEffect(() => { fetchScore().then(setScore).catch((err) => console.error('Error fetching score:', err)); }, [tasks]);
  const status = score.value >= 80 ? 'Excellent momentum' : score.value >= 50 ? 'Building momentum' : 'Ready to get started';
  return (
    <div className="score-hero-card">
      <div className="score-hero-left"><h2>Your Productivity</h2><div className="score-big">{score.value}<span>/100</span></div><p className="score-explanation">{score.completionRate}% weighted completion · {score.activeDays}/7 active days</p><div className="score-breakdown"><span>Completion {score.completionRate}%</span><span>Consistency +{score.consistencyBonus}</span></div></div>
      <div className="score-hero-right"><div className="status-badge"><TrendingUp size={16} />{status}</div><div className="logo-icon score-award"><Award size={48} /></div></div>
    </div>
  );
};
export default ScoreWidget;
