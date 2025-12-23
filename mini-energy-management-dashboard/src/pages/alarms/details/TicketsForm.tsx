import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { addTicket, setSubmitting, setError } from '../../../store/slices/maintenanceSlice';
import type { MaintenanceTicket } from '../../../store/slices/maintenanceSlice';

const { TextArea } = Input;
const { Option } = Select;

interface TicketFormValues {
  title: string;
  description: string;
  priority: MaintenanceTicket['priority'];
  assignedTo?: string;
}

interface TicketsFormProps {
  siteId: string;
  siteName: string;
  onSuccess?: () => void;
}

export const TicketsForm: React.FC<TicketsFormProps> = ({ siteId, siteName, onSuccess }) => {
  const dispatch = useDispatch();
  const { submitting } = useSelector((state: RootState) => state.maintenance);
  const [form] = Form.useForm<TicketFormValues>();

  const handleSubmit = async (values: TicketFormValues) => {
    try {
      dispatch(setSubmitting(true));

      // Create new ticket object
      const newTicket: MaintenanceTicket = {
        id: `ticket_${Date.now()}`, // Temporary ID generation
        siteId,
        siteName,
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: values.assignedTo || undefined,
        createdBy: 'Current User', // This would come from auth context
      };

      // Dispatch add ticket action
      dispatch(addTicket(newTicket));

      // Reset form
      form.resetFields();

      // Call success callback if provided
      onSuccess?.();

    } catch (error) {
      console.error('Failed to create ticket:', error);
      dispatch(setError('Failed to create maintenance ticket'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Please enter a ticket title' },
          { min: 3, message: 'Title must be at least 3 characters' },
        ]}
      >
        <Input placeholder="Enter ticket title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please enter a ticket description' },
          { min: 10, message: 'Description must be at least 10 characters' },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Describe the maintenance issue in detail"
        />
      </Form.Item>

      <Form.Item
        label="Priority"
        name="priority"
        rules={[{ required: true, message: 'Please select a priority level' }]}
      >
        <Select placeholder="Select priority level">
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
          <Option value="critical">Critical</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Assign To (Optional)"
        name="assignedTo"
      >
        <Input placeholder="Enter assignee name or leave empty" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            disabled={submitting}
          >
            {submitting ? 'Creating Ticket...' : 'Create Ticket'}
          </Button>
          <Button
            onClick={() => form.resetFields()}
            disabled={submitting}
          >
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};