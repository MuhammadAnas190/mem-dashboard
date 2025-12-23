import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Statistics } from '../../../component/Statistics';

const { Title } = Typography;

interface AlarmSummaryData {
  siteDown: number;
  critical: number;
  major: number;
  minor: number;
}

interface AlarmsSummaryProps extends AlarmSummaryData {
  siteId: string;
  location: string; 
  currentOperatingMode: string;
}

const AlarmsSummary: React.FC<AlarmsSummaryProps> = ({ siteId, currentOperatingMode, location, critical, major, minor, siteDown }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <Title level={2} style={{ marginBottom: '16px' }}>
        Alarm Summary - Site {siteId} - {location} - {currentOperatingMode}
      </Title>
      <Row gutter={16}>
        <Col span={6}>
          <Statistics background='linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)' color='white' value={siteDown} title="Site Down" />
        </Col>
        <Col span={6}>
          <Statistics background='linear-gradient(135deg, #ff7a45 0%, #d4380d 100%)' color='white' value={critical} title="Critical" />
        </Col>
        <Col span={6}>
          <Statistics background='linear-gradient(135deg, #faad14 0%, #d48806 100%)' color='white' value={major} title="Major" />
        </Col>
        <Col span={6}>
            <Statistics background='linear-gradient(135deg, #52c41a 0%, #237804 100%)' color='white' value={minor} title="Minor" />
        </Col>
      </Row>
    </div>
  );
};

export default AlarmsSummary;