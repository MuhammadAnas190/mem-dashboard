import { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Tooltip } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { addFavorite, removeFavorite, setAlarmsData, setError, setFilteredAlarms, setLoading } from '../../store/slices/alarmSlice';
import { alarmApi } from '../../api';
import type { AlarmEvent } from '../../api/alarms';
import { useDebounce } from '../../hooks/useDebounce';

const { getAllAlarms } = alarmApi

const { Search } = Input;

const AlarmsPage = () => {
  const dispatch = useDispatch();
  const { alarms, filteredAlarms, favorites, loading, error } = useSelector(
    (state: RootState) => state.alarms
  );

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Debounce search value by 400ms
  const debouncedSearchValue = useDebounce(searchValue, 400);

    useEffect(() => {
        // Initial fetch of alarms
        fetchAlarms(setAlarmsData)
    }, []);

    // Debounced search effect
    useEffect(() => {
        if (!!debouncedSearchValue ) {
            fetchAlarms(setFilteredAlarms, debouncedSearchValue)
        } else if (searchValue === '') {
            // If search is cleared,
            dispatch(setFilteredAlarms([]))
        }
    }, [debouncedSearchValue]);


  const fetchAlarms = async (actionDispatch: any, search?: string) => {
    try {
        dispatch(setLoading(true));
        const response = await getAllAlarms(search);
        dispatch(actionDispatch(response.events));
    } catch (error) {
      console.error('Failed to fetch alarms:', error);
      dispatch(setError('Failed to fetch alarms'));
    } finally {
        dispatch(setLoading(false));
    }
  }

  
  // Display alarms based on favorites toggle
  const displayAlarms = useMemo(() => {
    if (filteredAlarms.length > 0) {
      return showFavoritesOnly
        ? filteredAlarms.filter(alarm => favorites.includes(alarm.id))
        : filteredAlarms;
    }
    return showFavoritesOnly
    ? alarms.filter(alarm => favorites.includes(alarm.id))
    : alarms;
}, [showFavoritesOnly, alarms, favorites]);

  const handleFavoriteToggle = (alarmId: string) => {
    if (favorites.includes(alarmId)) {
      dispatch(removeFavorite(alarmId));
    } else {
      dispatch(addFavorite(alarmId));
    }
  };

  const getSeverityColor = (severity: AlarmEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'major': return 'orange';
      case 'minor': return 'yellow';
      case 'warning': return 'blue';
      case 'info': return 'green';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Favorite',
      key: 'favorite',
      width: 90,
      render: (_: any, record: AlarmEvent) => (
        <Tooltip title={favorites.includes(record.id) ? 'Remove from favorites' : 'Add to favorites'}>
          <Button
            type="text"
            icon={favorites.includes(record.id) ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
            onClick={() => handleFavoriteToggle(record.id)}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a: AlarmEvent, b: AlarmEvent) => a.code.localeCompare(b.code),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: AlarmEvent['severity']) => (
        <Tag color={getSeverityColor(severity)} style={{ textTransform: 'capitalize' }}>
          {severity}
        </Tag>
      ),
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'Major', value: 'major' },
        { text: 'Minor', value: 'minor' },
        { text: 'Warning', value: 'warning' },
        { text: 'Info', value: 'info' },
      ],
      onFilter: (value: boolean | React.Key, record: AlarmEvent) => record.severity === value,
    },
    {
      title: 'Site Name',
      dataIndex: 'siteName',
      key: 'siteName',
      sorter: (a: AlarmEvent, b: AlarmEvent) => a.siteName.localeCompare(b.siteName),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (timestamp: number) => new Date(timestamp).toLocaleString(),
      sorter: (a: AlarmEvent, b: AlarmEvent) => a.startTime - b.startTime,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (timestamp?: number) => timestamp ? new Date(timestamp).toLocaleString() : '-',
      sorter: (a: AlarmEvent, b: AlarmEvent) => (a.endTime || 0) - (b.endTime || 0),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map(tag => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>

        <Space wrap>
          <Search
            placeholder="Search alarms..."
            allowClear
            style={{ width: 300 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Space>
            <span>Show Favorites Only:</span>
            <Switch
              checked={showFavoritesOnly}
              onChange={setShowFavoritesOnly}
            />
          </Space>
        </Space>

        {/* Alarms Table */}
        <Table
          columns={columns}
          dataSource={displayAlarms}
          rowKey="id"
          loading={loading}
          virtual
          bordered
          scroll={{ x: 2000, y: 600 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} alarms`,
          }}
        />
      </Space>
    </div>
  );
};

export default AlarmsPage;