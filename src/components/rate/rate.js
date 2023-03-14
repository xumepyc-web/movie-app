import React from 'react';
import { Rate } from 'antd';
const RateComponent = ({ movieId }) => {
  return (
    <Rate
      allowHalf
      defaultValue={0}
      count={10}
      onChange={(val) => {
        console.log(val, movieId);
      }}
    />
  );
};
export default RateComponent;
