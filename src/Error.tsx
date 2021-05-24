import React from 'react';
import './App.css';

// Dumb/Presentation component
function Error(props: {error: string}) {
  return (
    <div className="error">
      {props.error ? (
        <span>{props.error}</span>
      ) : null}
    </div>
  );
}

export default Error;
