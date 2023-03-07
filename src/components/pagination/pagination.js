import { Pagination } from 'antd';
import { useState } from 'react';
import './pagination.css';
const Page = ({ onChangePage }) => {
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
    onChangePage(page);
  };
  return (
    <div className="pagination-wrapper">
      <Pagination className="pagination" current={current} onChange={onChange} total={50} />;
    </div>
  );
};
export default Page;
