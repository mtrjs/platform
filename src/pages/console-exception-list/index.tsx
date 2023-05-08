import { getConsoleList, IConsole } from '@api/exception';
import { usePagination } from 'ahooks';
import { Button, Card, Form, Input, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import S from './index.module.less';
import DatePicker from '@components/date-picker';
import EllipsisColumn from '@components/ellipsis-column';

const { useForm } = Form;
const { RangePicker } = DatePicker;

interface SearchFormType {
  name?: string;
  dateRange?: [Dayjs, Dayjs];
}

export default function ConsoleList() {
  const [searchForm] = useForm<SearchFormType>();

  const { data, loading, pagination, refresh } = usePagination((params) => {
    const { name, dateRange = [] } = searchForm.getFieldsValue();
    let startAt;
    let endAt;
    if (Array.isArray(dateRange)) {
      startAt = dateRange[0]?.startOf('d').format('YYYY-MM-DD HH:mm:ss');
      endAt = dateRange[1]?.endOf('d').format('YYYY-MM-DD HH:mm:ss');
    }
    return getConsoleList({
      page: params.current,
      pageSize: params.pageSize,
      startAt,
      endAt,
      name,
    });
  });

  const { list = [], total = 0 } = data || {};

  const columns: ColumnsType<IConsole> = [
    {
      title: '打印信息',
      dataIndex: 'messages',
      ellipsis: true,
      render: (text) => {
        let msgs: string[] = [];

        try {
          msgs = JSON.parse(text);
        } catch (error) {
          console.error(error);
        }
        if (!msgs.length) return '无';

        return (
          <div>
            {msgs.map((label) => {
              return <div>{label}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: '页面',
      dataIndex: 'href',
      render: (text) => <EllipsisColumn width={200}>{text}</EllipsisColumn>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 120,
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
