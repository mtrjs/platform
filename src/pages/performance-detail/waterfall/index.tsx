import React, { useMemo, useState } from 'react';
import S from './index.module.less';
import { PerformanceResource } from '@api/perf';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Descriptions, Row } from 'antd';
import { formatSize } from '@utils/helper';
import classNames from 'classnames';

interface Props {
  list?: PerformanceResource[];
  fcp?: number;
  lcp?: number;
}

export default function Waterfall(props: Props) {
  const { list = [], fcp, lcp } = props;

  const [expand, setExpand] = useState(new Set());

  const [_list, max] = useMemo(() => {
    let max = list.reduce((acc, cur) => {
      const { fetchStart, duration } = cur;
      const _max = fetchStart + duration;
      if (acc < _max) return _max;
      return acc;
    }, 0);

    if (lcp && lcp > max) {
      max = lcp;
    }

    if (fcp && fcp > max) {
      max = fcp;
    }

    return [
      list.map((o) => {
        const { name, encodedBodySize, decodedBodySize } = o;
        const path = name.match(/(?<=\/)[^/]+(?=\?.*)|(?<=\/)[^/]+$/);
        const u = new URL(name);
        const domain = u.hostname;

        return {
          path: path || name,
          domain,
          ...o,
          encodedBodySize: formatSize(encodedBodySize),
          decodedBodySize: formatSize(decodedBodySize),
        };
      }),
      max * 1.1,
    ];
  }, [list, fcp, lcp]);

  const fcpLeft = `${((fcp || 0) / max) * 100}%`;
  const lcpLeft = `${((lcp || 0) / max) * 100}%`;

  const renderIndex = () => {
    return (
      <div className={S['index-wrap']}>
        {fcp && (
          <div
            className={classNames(S.index, S.fcp)}
            style={{
              left: fcpLeft,
            }}
          >
            <span>{_list.length <= 1 ? '' : 'FCP'}</span>
          </div>
        )}
        {lcp && (
          <div
            className={classNames(S.index, S.lcp)}
            style={{
              left: lcpLeft,
            }}
          >
            <span>LCP</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={S.container}>
      <div className={S.header}>
        <Row className={S.url} justify="center">
          URL
        </Row>
        <Row className={S.protocol} justify="center">
          协议
        </Row>
        <Row className={S.size} justify="center">
          体积
        </Row>
        <Row className={S['uncompress-size']} justify="center">
          未压缩体积
        </Row>
        <Row className={S.timeline} justify="center">
          加载性能
        </Row>
      </div>
      {_list.map((o) => {
        const { name, fetchStart, duration, path, encodedBodySize, decodedBodySize, nextHopProtocol, initiatorType } =
          o;

        const isExpand = expand.has(name);

        return (
          <div key={name}>
            <div
              className={classNames(S.item)}
              onClick={() => {
                const _expand = new Set(expand);
                if (_expand.has(name)) {
                  _expand.delete(name);
                } else {
                  _expand.add(name);
                }
                setExpand(_expand);
              }}
            >
              {isExpand ? <MinusCircleOutlined className={S.plus} /> : <PlusCircleOutlined className={S.plus} />}
              <div className={S.url}>{path}</div>
              <div className={S.protocol}>{nextHopProtocol}</div>
              <div className={S.size}>{encodedBodySize}</div>
              <div className={S['uncompress-size']}>{decodedBodySize}</div>
              <div className={S.timeline}>
                <div
                  className={S.progress}
                  style={{
                    marginLeft: `${(fetchStart / max) * 100}%`,
                    width: `${(duration / max) * 100}%`,
                  }}
                />
                <div className={S.duration}>{duration.toFixed(2)} ms</div>
              </div>
            </div>
            {isExpand && (
              <Descriptions className={S.detail} bordered={true}>
                <Descriptions.Item label="链接">{name}</Descriptions.Item>
                <Descriptions.Item label="发起者类型">{initiatorType}</Descriptions.Item>
              </Descriptions>
            )}
          </div>
        );
      })}
      {renderIndex()}
    </div>
  );
}
