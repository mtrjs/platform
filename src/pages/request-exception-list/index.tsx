import { getRequestExceptionList, IRequestException } from '@api/exception';
import { usePagination } from 'ahooks';
import { Button, Card, Form, Input, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import EllipsisColumn from '@components/ellipsis-column';

const columns: ColumnsType<IRequestException> = [
  {
    title: '错误信息',
    dataIndex: 'statusText',
    ellipsis: true,
  },
  {
    title: '请求地址',
    dataIndex: 'url',
    render: (text) => <EllipsisColumn maxWidth={480}>{text}</EllipsisColumn>,
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    width: 100,
    align: 'center',
  },
  {
    title: '状态码',
    dataIndex: 'status',
    width: 80,
    align: 'center',
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
];

const { useForm } = Form;
const { RangePicker } = DatePicker;

interface SearchFormType {
  message?: string;
  dateRange?: [Dayjs, Dayjs];
  url?: string;
}

export default function RequestExceptionList() {
  const [searchForm] = useForm<SearchFormType>();

  const { data, loading, pagination, refresh } = usePagination((params) => {
    const { message, dateRange = [], url } = searchForm.getFieldsValue();

    let startAt;
    let endAt;
    if (Array.isArray(dateRange)) {
      startAt = dateRange[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = dateRange[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }

    return getRequestExceptionList({
      page: params.current,
      pageSize: params.pageSize,
      startAt,
      endAt,
      message,
      url,
    });
  });

  const { list = [], total = 0 } = data || {};

  return (
    <Card title="请求异常详情">
      <Form form={searchForm} layout="inline" className={S['search-form']}>
        <Form.Item label="错误信息" name="message">
          <Input placeholder="根据错误信息搜索" allowClear={true} />
        </Form.Item>
        <Form.Item label="请求地址" name="url">
          <Input placeholder="根据请求地址搜索" allowClear={true} />
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
      <Table
        loading={loading}
        rowKey="_id"
        dataSource={list}
        columns={columns}
        pagination={false}
        className={S.table}
      />
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
    </Card>
  );
}
