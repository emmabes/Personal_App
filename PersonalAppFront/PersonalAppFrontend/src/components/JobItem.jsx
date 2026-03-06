import React from 'react';

const JobItem = ({ title, onClick }) => {
  return (
    <div className="job-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      * {title}
    </div>
  );
};

export default JobItem;
