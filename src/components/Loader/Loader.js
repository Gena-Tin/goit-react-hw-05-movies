import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="#69709c"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
  );
};

export default Loader;