import React from 'react';

const Spinner = () => {
  return (
    <>
      <img
        src="https://media.giphy.com/media/52qtwCtj9OLTi/giphy.gif"
        alt="Loading"
        style={
          {
            width: '100%',
            maxWidth: '350px',
            display: 'block',
            margin: 'auto'
          }
        }
      />
    </>
  );
};

export default Spinner;