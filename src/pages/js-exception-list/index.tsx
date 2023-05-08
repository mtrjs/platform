import { getJsExceptionList, IJsException } from '@api/exception';
import { usePagination } from 'ahooks';
import { Button, Card, Form, Input, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import Detail from './components/detail';
import EllipsisColumn from '@components/ellipsis-column';

const { useForm } = Form;
const { RangePicker } = DatePicker;

interface SearchFormType {
  name?: string;
  dateRange?: [Dayjs, Dayjs];
}

export default function ExceptionList() {
  const [searchForm] = useForm<SearchFormType>();

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState('');

  const { data, loading, pagination, refresh } = usePagination((params) => {
    const { name, dateRange = [] } = searchForm.getFieldsValue();
    let startAt;
    let endAt;
    if (Array.isArray(dateRange)) {
      startAt = dateRange[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = dateRange[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return getJsExceptionList({
      page: params.current,
      pageSize: params.pageSize,
      startAt,
      endAt,
      name,
    });
  });

  const { list = [], total = 0 } = data || {};

  const columns: ColumnsType<IJsException> = [
    {
      title: '错误信息',
      dataIndex: 'message',
      render: (text) => <EllipsisColumn>{text || '无'}</EllipsisColumn>,
    },
    {
      title: '文件',
      dataIndex: 'filename',
      render: (text) => <EllipsisColumn>{text || '无'}</EllipsisColumn>,
    },
    {
      title: '发生次数',
      dataIndex: 'count',
      width: 100,
      align: 'center',
      render: (text) => text || '1',
    },
    {
      title: '发生时间',
      dataIndex: 'createdAt',
      align: 'center',
      width: 200,
      render: (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                setDetailId(record._id);
                setDetailOpen(true);
              }}
            >
              详情
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <Form form={searchForm} layout="inline" className={S['search-form']}>
        <Form.Item label="关键字" name="name">
          <Input placeholder="根据关键字搜索" allowClear={true} />
        </Form.Item>
        <Form.Item label="日期范围" name="dateRange">
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={refresh}>
            搜索
          </Button>
        </Form.Item>
      </Form>
      <Table loading={loading} rowKey="_id" dataSource={list} columns={columns} pagination={false} />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={total}
        onChange={pagination.onChange}
        onShowSizeChange={pagination.onChange}
        showQuickJumper={true}
        showSizeChanger={true}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
      <Detail open={detailOpen} id={detailId} onClose={() => setDetailOpen(false)} />
    </Card>
  );
}
