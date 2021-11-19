import React from 'react'

import Lottie from 'react-lottie';

import animationPage404 from '../../lotties/404.json';

const Page404: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPage404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div style={{
      background: '#ccdaeb',
      width: '100%'
    }}>
      <Lottie
        options={defaultOptions}
        height='100vh'
        width='100vw'
      />
    </div>
  );
}

export default Page404
