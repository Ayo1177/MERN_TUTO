import React from 'react';
import { Timer } from 'lucide-react';
 
const RatelimitedUI = () => {
  const handleTryAgain = () => {
    // Reloads the page to allow the user to try their request again.
    window.location.reload();
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <Timer className="h-24 w-24 text-warning" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">Too many requests</h2>
          <p className='py-4'>You have sent too many requests in a given amount of time. Please try again later.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleTryAgain}>Try again</button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default RatelimitedUI;
