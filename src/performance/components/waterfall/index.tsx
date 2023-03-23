import { useEffect } from 'react';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import xrange from 'highcharts/modules/xrange';
import accessibility from 'highcharts/modules/accessibility';
import { Card } from 'antd';
import { PerfOverviewWaterfall } from '@services/perf';

xrange(Highcharts);
Exporting(Highcharts);
accessibility(Highcharts);

interface Props {
  data?: PerfOverviewWaterfall;
}

function Component(props: Props) {
  const { data } = props;

  useEffect(() => {
    if (!data) return;

    const {
      unloadEventStart,
      unloadEventEnd,
      domainLookupStart,
      domainLookupEnd,
      connectStart,
      connectEnd,
      requestStart,
      responseStart,
      responseEnd,
      domInteractive,
      domContentLoadedEventStart,
      domContentLoadedEventEnd,
      domComplete,
      loadEventStart,
      loadEventEnd,
    } = data;

    const rangeData = [
      [unloadEventStart, unloadEventEnd],
      [domainLookupStart, domainLookupEnd],
      [connectStart, connectEnd],
      [requestStart, responseStart],
      [responseStart, responseEnd],
      [responseEnd, domInteractive],
      [domInteractive, domComplete],
      [loadEventStart, loadEventEnd],
    ].map(([x, x2], y) => {
      if (y !== 0) {
        return {
          x: Number((x + unloadEventEnd).toFixed(2)),
          x2: Number((x2 + unloadEventEnd).toFixed(2)),
          y,
        };
      }
      return {
        x,
        x2,
        y,
      };
    });
    const chart = Highcharts.chart('container-pull', {
      chart: {
        type: 'xrange',
      },
      title: {
        text: '瀑布图',
      },
      accessibility: {
        point: {
          descriptionFormatter: function (point) {
            var ix = point.index + 1,
              category = point.category,
              from = point.x + 'ms',
              to = point.x + 'ms';
            return ix + '. ' + category + ', ' + from + ' to ' + to + '.';
          },
        },
      },
      xAxis: {
        type: 'linear',
      },
      yAxis: {
        title: {
          text: '',
        },
        categories: [
          '上一个文档卸载',
          'DNS 寻址',
          'TCP 连接',
          '请求',
          '内容传输',
          'TBT 总阻塞时长',
          'DOM 解析',
          'Load 事件',
        ],
        reversed: true,
      },
      series: [
        {
          name: 'time',
          borderColor: 'gray',
          pointWidth: 20,
          type: 'xrange',
          data: rangeData,
          dataLabels: {
            enabled: true,
          },
        },
      ],
    });
    return () => {
      chart.destroy();
    };
  }, [data]);
  if (!data) return null;

  return (
    <Card title="页面加载瀑布图" style={{ marginTop: 20 }}>
      <div id="container-pull"></div>
    </Card>
  );
}

export default Component;
