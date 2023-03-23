import { getErrorList, IError } from '@services/error';
import { usePagination } from 'ahooks';
import { Card, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as dayjs from 'dayjs';

const columns: ColumnsType<IError> = [
  {
    title: '错误信息',
    dataIndex: 'message',
  },
  {
    title: '文件',
    dataIndex: 'filename',
  },
  {
    title: '错误堆栈',
    dataIndex: 'stack',
  },
  {
    title: '发生时间',
    dataIndex: 'createdAt',
    render: (value) => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
];

function Component() {
  const { data, loading, pagination } = usePagination((params) =>
    getErrorList({
      page: params.current,
      pageSize: params.pageSize,
    })
  );

  const { list = [], total = 0 } = data || {};

  return (
    <Card>
      <Table loading={loading} rowKey="_id" dataSource={list} columns={columns} pagination={false}></Table>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={total}
        onChange={pagination.onChange}
        onShowSizeChange={pagination.onChange}
        showQuickJumper
        showSizeChanger
        style={{ marginTop: 16, textAlign: 'right' }}
      ></Pagination>
    </Card>
  );
}

export default Component;
