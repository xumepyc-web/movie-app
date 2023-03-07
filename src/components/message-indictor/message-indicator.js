import { Alert, Space } from 'antd';
import React from 'react';
const Message = () => (
  <Space
    direction="vertical"
    style={{
      width: '80%',
    }}
  >
    <Alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
  </Space>
);
export default Message;
