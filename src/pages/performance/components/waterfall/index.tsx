import { useEffect } from 'react';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import xrange from 'highcharts/modules/xrange';
import accessibility from 'highcharts/modules/accessibility';
import { Card } from 'antd';
import { PerfOverviewWaterfall } from '@api/perf';

xrange(Highcharts);
Exporting(Highcharts);
accessibility(Highcharts);

interface Props {
  data?: PerfOverviewWaterfall;
}

export default function Waterfall(props: Props) {
  const { data } = props;

  useEffect(() => {
    let chart: any;
    if (data) {
      const {
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domContentLoadedEventStart,
        loadEventStart,
      } = data;

      const rangeData = [
        [domainLookupStart, domainLookupEnd],
        [connectStart, connectEnd],
        [requestStart, responseStart],
        [responseStart, responseEnd],
        [responseEnd, domContentLoadedEventStart],
        [domContentLoadedEventStart, loadEventStart],
      ].map(([x, x2], y) => {
        if (y !== 0) {
          return {
            x: Number(x?.toFixed(2)),
            x2: Number(x2?.toFixed(2)),
            y,
          };
        }
        return {
          x,
          x2,
          y,
        };
      });
      chart = Highcharts.chart('container-pull', {
        chart: {
          type: 'xrange',
        },
        title: {
          text: '瀑布图',
        },
        accessibility: {
          point: {
            descriptionFormatter: function descriptionFormatter(point) {
              const ix = point.index + 1;
              const { category } = point;
              const from = `${point.x}ms`;
              const to = `${point.x}ms`;
              return `${ix}. ${category}, ${from} to ${to}.`;
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
          categories: ['DNS 寻址', 'TCP 连接', '首字节网络请求', '内容传输', 'DOM 解析', '资源加载'],
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
    }

    return () => {
      chart && chart.destroy();
    };
  }, [data]);
  if (!data) return null;

  return (
    <Card title="页面加载瀑布图" style={{ marginTop: 20 }}>
      <div id="container-pull" />
    </Card>
  );
}
