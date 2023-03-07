import { Pagination } from 'antd';
import { useState } from 'react';
const Page = ({ onChangePage }) => {
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
    onChangePage(page);
  };
  return <Pagination current={current} onChange={onChange} total={50} />;
};
export default Page;
