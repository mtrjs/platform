import React, { useEffect } from 'react';
import { Choropleth } from '@antv/l7plot';
import { Card } from 'antd';

interface Props {
  style?: React.CSSProperties;
  data?: Record<string, any>[];
}

function Component(props: Props) {
  const { style, data } = props;

  useEffect(() => {
    if (!data) return;
    console.log(data);
    const ct = new Choropleth('container-map', {
      map: {
        type: 'map',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },
      // @ts-ignore
      source: {
        data,
        joinBy: {
          sourceField: 'name',
          geoField: 'name',
        },
      },
      viewLevel: {
        level: 'country',
        adcode: 100000,
      },
      chinaBorder: false,
      autoFit: true,
      color: {
        field: 'value',
        value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
        scale: { type: 'quantile' },
      },
      style: {
        opacity: 1,
        stroke: '#ccc',
        lineWidth: 0.3,
        lineOpacity: 1,
      },
      label: {
        visible: false,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 1.5,
          textAllowOverlap: false,
          padding: [5, 5],
        },
      },
      state: {
        active: { stroke: '#ccc', lineWidth: 1 },
      },
      tooltip: {
        items: ['name', 'value'],
      },
      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    });
    return () => {
      ct.destroy();
    };
  }, [data]);
  if (!data) return null;
  return (
    <Card title="地域分布" style={style}>
      <div id="container-map" style={{ width: 800, height: 600 }}></div>
    </Card>
  );
}

export default Component;
