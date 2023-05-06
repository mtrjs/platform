import { getResourceExceptionList, IResourceException } from '@api/exception';
import { usePagination } from 'ahooks';
import { Button, Card, Form, Input, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import EllipsisColumn from '@components/ellipsis-column';

const columns: ColumnsType<IResourceException> = [
  {
    title: '资源地址',
    dataIndex: 'src',
    render: (text) => <EllipsisColumn width={420}>{text || '无'}</EllipsisColumn>,
  },
  {
    title: '发生次数',
    dataIndex: 'totalCount',
    align: 'center',
    width: 100,
    render: (text) => text || '1',
  },
  {
    title: '影响用户数',
    dataIndex: 'userCount',
    align: 'center',
    width: 120,
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
];

const { useForm } = Form;
const { RangePicker } = DatePicker;

interface SearchFormType {
  name?: string;
  dateRange?: [Dayjs, Dayjs];
}

export default function ResourceExceptionList() {
  const [searchForm] = useForm<SearchFormType>();

  const { data, loading, pagination, refresh } = usePagination((params) => {
    const { name, dateRange = [] } = searchForm.getFieldsValue();
    let startAt;
    let endAt;
    if (Array.isArray(dateRange)) {
      startAt = dateRange[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = dateRange[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }

    return getResourceExceptionList({
      page: params.current,
      pageSize: params.pageSize,
      startAt,
      endAt,
      name,
    });
  });

  const { list = [], total = 0 } = data || {};

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
    </Card>
  );
}
