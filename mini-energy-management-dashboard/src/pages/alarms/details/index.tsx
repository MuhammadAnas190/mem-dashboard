import { useState } from 'react';
import { Card, Button, Drawer, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EChartsReact from 'echarts-for-react';
import AlarmsSummary from './AlarmsSummary';
import { TicketsForm } from './TicketsForm';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const AlarmDetailsPage = () => {
  const { siteInfo: {name, location, currentOperatingMode} } = useSelector((state: any) => state.site);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Mock data for alarm summary
  const alarmSummary = {
    siteDown: 2,
    critical: 5,
    major: 12,
    minor: 8,
  };

  // Mock data for energy report
  const energyData = {
    dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'],
    energy: [120, 132, 101, 134, 90, 230, 210],
  };

  const energyOption = {
    title: {
      text: 'Daily Energy Consumption',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: energyData.dates,
    },
    yAxis: {
      type: 'value',
      name: 'Energy (kWh)',
    },
    series: [
      {
        name: 'Energy',
        type: 'bar',
        data: energyData.energy,
        itemStyle: {
          color: '#1890ff',
        },
      },
    ],
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Alarm Summary Section */}
      <AlarmsSummary siteId={name || ''} currentOperatingMode={currentOperatingMode} location={location} {...alarmSummary} />

      {/* Energy Report Section */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ marginBottom: '16px' }}>
          Energy Report
        </Title>
        <Card>
          <EChartsReact
            option={energyOption}
            style={{ height: '400px', width: '100%' }}
          />
        </Card>
      </div>

      {/* Create Ticket Button */}
      <div style={{ marginBottom: '24px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={showDrawer}
        >
          Create Maintenance Ticket
        </Button>
      </div>

      {/* Maintenance Ticket Drawer */}
      <Drawer
        title="Create Maintenance Ticket"
        placement="right"
        width={500}
        onClose={closeDrawer}
        open={drawerVisible}
        extra={
          <Button onClick={closeDrawer}>
            Cancel
          </Button>
        }
      >
        <div style={{ padding: '20px 0' }}>
          <TicketsForm
            siteId={name || ''}
            siteName={`Site ${location || ''}`}
            onSuccess={closeDrawer}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default AlarmDetailsPage;