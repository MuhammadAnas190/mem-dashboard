import { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { BoldOutlined } from '@ant-design/icons';
import type { EChartsOption } from 'echarts';

interface IChartDataPoint {
  timestamp: number;
  activePower: number;
  reactivePower: number;
}

interface PowerWaveformChartProps {
  chartData: IChartDataPoint[];
  currentPower?: {
    activePower: number;
    reactivePower: number;
  } | null;
  loading?: boolean;
}

export function PowerWaveformChart({
  chartData,
  currentPower,
  loading = false,
}: PowerWaveformChartProps) {
  const chartOption: EChartsOption = useMemo(() => {
    const timestamps = chartData.map((d) => {
      const date = new Date(d.timestamp);
      return date.toLocaleTimeString();
    });

    const activePowerData = chartData.map((d) => d.activePower);
    const reactivePowerData = chartData.map((d) => d.reactivePower);

    return {
      responsive: true,
      maintainAspectRatio: true,
      animation: true,
      animationDuration: 300,
      animationEasing: 'linear',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderColor: '#ff4d4f',
        textStyle: {
          color: '#fff',
        },
        formatter: (params: any) => {
          if (!Array.isArray(params)) return '';
          let result = `<div style="font-weight: bold;">${params[0]?.axisValue}</div>`;
          params.forEach((param: any) => {
            result += `<div style="color: ${param.color}; margin-top: 4px;">
              ${param.seriesName}: <strong>${param.value.toFixed(2)}</strong> W
            </div>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Active Power', 'Reactive Power'],
        textStyle: {
          color: '#666',
        },
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: timestamps,
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        axisLabel: {
          color: '#666',
          interval: Math.max(0, Math.floor(timestamps.length / 8) - 1),
        },
      },
      yAxis: {
        type: 'value',
        name: 'Power (W)',
        nameTextStyle: {
          color: '#666',
        },
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
          },
        },
        axisLabel: {
          color: '#666',
        },
      },
      series: [
        {
          name: 'Active Power',
          data: activePowerData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#ff4d4f',
            width: 2,
          },
          itemStyle: {
            color: '#ff4d4f',
          },
          areaStyle: {
            color: 'rgba(255, 77, 79, 0.1)',
          },
          symbolSize: 4,
          showSymbol: false,
        },
        {
          name: 'Reactive Power',
          data: reactivePowerData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#1890ff',
            width: 2,
          },
          itemStyle: {
            color: '#1890ff',
          },
          areaStyle: {
            color: 'rgba(24, 144, 255, 0.1)',
          },
          symbolSize: 4,
          showSymbol: false,
        },
      ],
    };
  }, [chartData]);

  return (
    <Spin spinning={loading} tip="Loading power data..." size="large">
      <>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Active Power"
                value={currentPower?.activePower ?? 0}
                suffix="W"
                prefix={<BoldOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontSize: '24px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Reactive Power"
                value={currentPower?.reactivePower ?? 0}
                suffix="VAR"
                prefix={<BoldOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontSize: '24px' }}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: '16px' }}>
          <h3 style={{ marginBottom: '16px' }}>Power Waveform</h3>
          <ReactEcharts
            option={chartOption}
            style={{ height: '400px', width: '100%' }}
            lazyUpdate={false}
            notMerge={false}
            opts={{ renderer: 'canvas' }}
          />
        </Card>
      </>
    </Spin>
  );
}
