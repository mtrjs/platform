import React, { useEffect, useState } from 'react';
import S from './index.module.less';
import { Button, Table, Form, Input, Pagination, message, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { usePagination } from 'ahooks';
import { IAlarmRule, getAlarmRuleList, deleteRule } from '@api/alarm';
import CreateAlarmRule from './components/create-alarm-rule';

export default function AlarmRule() {
  const [searchForm] = Form.useForm();

  const [editData, setEditData] = useState<IAlarmRule>();
  const [createVisible, setCreateVisible] = useState(false);

  const { data, loading, pagination, refresh } = usePagination((params) => {
    const { name } = searchForm.getFieldsValue();

    return getAlarmRuleList({
      page: params.current,
      pageSize: params.pageSize,
      name,
    });
  });

  const handleDelete = async (params: { id: string }) => {
    await deleteRule(params);
    setTimeout(async () => {
      await refresh();
      message.success('删除成功!');
    }, 500);
  };

  const columns: ColumnProps<IAlarmRule>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '检查周期(分钟)',
      dataIndex: 'cycle',
    },
    {
      title: '检查时间段',
      dataIndex: 'checkTime',
      render: (_, record) => {
        const { checkTimeStartAt = '00:00', checkTimeEndAt = '23:59' } = record;
        return `${checkTimeStartAt}-${checkTimeEndAt}`;
      },
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      render: (text) => {
        return text ? '开启' : '关闭';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditData(record);
                setCreateVisible(true);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => {
                handleDelete({ id: record.id });
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" danger={true}>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    refresh();
  }, []);

  const handleCreateModalClose = () => {
    setCreateVisible(false);
    setTimeout(() => {
      refresh();
    }, 500);
  };

  const { list = [], total = 0 } = data || {};

  return (
    <div className={S.container}>
      <Form form={searchForm} layout="inline">
        <Form.Item label="规则名" name="name">
          <Input placeholder="请输入规则名称" />
        </Form.Item>

        <Button
          loading={loading}
          type="primary"
          onClick={() => {
            refresh();
          }}
        >
          查询
        </Button>

        <Button
          type="primary"
          onClick={() => {
            setEditData(undefined);
            setCreateVisible(true);
          }}
          style={{ marginLeft: 10 }}
        >
          新建规则
        </Button>
      </Form>

      <Table loading={loading} dataSource={list} columns={columns} pagination={false} className={S.table} />
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
      <CreateAlarmRule
        data={editData}
        open={createVisible}
        onClose={handleCreateModalClose}
        onCancel={handleCreateModalClose}
      />
    </div>
  );
}
