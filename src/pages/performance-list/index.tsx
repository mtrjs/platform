import React, { useEffect, useMemo, useState } from 'react';
import { Input, Card, Form, Button, Pagination, Row, Table } from 'antd';
import { usePagination } from 'ahooks';
import S from './index.module.less';
import { GetPerfListParams, getPerfList, PerfDetail } from '@api/perf';
import dayjs from 'dayjs';
import EllipsisColumn from '@components/ellipsis-column';
import ThresholdInput from '@components/threshold-input';
import { Link, useLocation } from 'react-router-dom';
import * as locationHelper from '@utils/location';
import { ROUTE_PATH } from '@constants/routes';
import { ColumnType } from 'antd/es/table';

enum SortIndex {
  fcp,
  lcp,
  ttfb,
}

const sortColumn = ['fcp', 'lcp', 'ttfb'];

interface FormType {
  ttfb?: [number, number];
  fcp?: [number, number];
  lcp?: [number, number];
  contentName?: string;
}

export default function PerformanceDetail() {
  const [form] = Form.useForm<FormType>();

  const [sortStatus, setSortStatus] = useState<(boolean | undefined)[]>([]);

  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const search = useMemo(() => {
    return [
      searchParams.get('fcp_type'),
      searchParams.get('fcp_value'),
      searchParams.get('lcp_type'),
      searchParams.get('lcp_value'),
      searchParams.get('ttfb_type'),
      searchParams.get('ttfb_value'),
    ];
  }, [searchParams]);

  useEffect(() => {
    const [fcp_type, fcp_value, lcp_type, lcp_value, ttfb_type, ttfb_value] = search.map((v) => Number(v));

    if (fcp_type !== null && fcp_value) {
      form.setFieldsValue({ fcp: [fcp_type, fcp_value] });
    }
    if (lcp_type !== null && lcp_value) {
      form.setFieldsValue({ lcp: [lcp_type, lcp_value] });
    }

    if (ttfb_type !== null && ttfb_value) {
      form.setFieldsValue({ ttfb: [ttfb_type, ttfb_value] });
    }
  }, [search, form]);

  const { data, loading, pagination, refresh } = usePagination((params) => {
    const { contentName, fcp, lcp, ttfb } = form.getFieldsValue();

    const query: GetPerfListParams = {
      page: params.current,
      pageSize: params.pageSize,
      contentName,
    };

    const [fcpType = 0, fcpValue] = fcp || [];
    if (fcpValue) {
      query.fcp = fcpValue;
      query.fcpType = fcpType;
      searchParams.set('fcp_type', String(fcpType));
      searchParams.set('fcp_value', String(fcpValue));
      locationHelper.replaceState(location.pathname, searchParams);
    }

    const [lcpType = 0, lcpValue] = lcp || [];
    if (lcpValue) {
      query.lcp = lcpValue;
      query.lcpType = lcpType;
      searchParams.set('lcp_type', String(lcpType));
      searchParams.set('lcp_value', String(lcpValue));
      locationHelper.replaceState(location.pathname, searchParams);
    }

    const [ttfbType = 0, ttfbValue] = ttfb || [];
    if (ttfbValue) {
      query.ttfbType = ttfbType;
      query.ttfb = ttfbValue;
      searchParams.set('ttfb_type', String(ttfbType));
      searchParams.set('ttfb_value', String(ttfbValue));
      locationHelper.replaceState(location.pathname, searchParams);
    }

    const sortObj = sortStatus.reduce<{ index: number; status?: string }>(
      (acc, cur, index) => {
        if (cur !== undefined) acc = { index, status: cur ? 'asc' : 'desc' };
        return acc;
      },
      { index: -1, status: undefined }
    );

    if (sortObj.index !== -1) {
      query.orderByColumn = sortColumn[sortObj.index];
      query.orderBy = sortObj.status;
    }

    return getPerfList(query);
  });

  useEffect(() => {
    refresh();
  }, [sortStatus, refresh]);

  const columns: ColumnType<PerfDetail>[] = [
    {
      title: '作品名称',
      dataIndex: 'contentName',
      width: 150,
      fixed: 'left',
      render: (text) => <EllipsisColumn maxWidth={150}>{text}</EllipsisColumn>,
    },
    {
      title: '作品ID',
      dataIndex: 'contentId',
      width: 150,
      render: (text) => <EllipsisColumn maxWidth={150}>{text}</EllipsisColumn>,
    },
    {
      title: 'FCP',
      width: 100,
      dataIndex: 'fcp',
    },
    {
      title: 'LCP',
      width: 100,
      dataIndex: 'lcp',
    },
    {
      title: 'TTFB',
      width: 100,
      dataIndex: 'ttfb',
    },
    {
      title: '作品链接',
      width: 160,
      dataIndex: 'name',
      render: (text) => (
        <EllipsisColumn maxWidth={160} maxLength={300}>
          {text}
        </EllipsisColumn>
      ),
    },
    {
      title: '发生时间',
      dataIndex: 'createdAt',
      width: 200,
      render: (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        return (
          <div>
            <Link
              to={{
                pathname: ROUTE_PATH.performanceDetail,
                search: `id=${record.traceId}`,
              }}
              target="_blank"
            >
              <Button type="link">详情</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const { list = [], total = 0 } = data || {};

  return (
    <Card className={S.container}>
      <Form form={form} layout="inline" labelCol={{}}>
        <Row gutter={[16, 8]}>
          <Form.Item label="作品名称" name="contentName">
            <Input placeholder="请输入作品名称" allowClear={true} />
          </Form.Item>
          <Form.Item label="FCP" name="fcp">
            <ThresholdInput />
          </Form.Item>
          <Form.Item label="LCP" name="lcp">
            <ThresholdInput />
          </Form.Item>
          <Form.Item label="TTFB" name="ttfb">
            <ThresholdInput />
          </Form.Item>
          <Button type="primary" onClick={refresh}>
            查询
          </Button>
        </Row>
      </Form>
      <Table
        columns={columns}
        loading={loading}
        rowKey="_id"
        dataSource={list}
        className={S.table}
        pagination={false}
        scroll={{ x: 1400 }}
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
