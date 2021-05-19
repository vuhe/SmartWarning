import React from 'react';
import { Card, Tooltip } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import { Line, DualAxes } from '@ant-design/charts';
// import { dualAxesConfig } from '@/utils/simulate/meter/meterConfig';

// 将 drivesRiskFactor 转化为图表配置项的数据 allMeterConfig.data
const handleDrivesRiskFactor = (_drivesRiskFactor: any[]) => {
  const temp = [];
  for (const item of _drivesRiskFactor) {
    let date = new Date(item.time);
    for (let i = 0; i < item.list.length; i++) {
      temp.unshift({
        time: `${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}`,
        channelName: item.list[i].driveName,
        value: item.list[i].value,
      });
    }
  }
  return temp;
};

// 将 driveRealtime 转化为图表配置项的数据 dualAxesConfig.data
const handleDriveRealtime = (_driveRealtime: any[]) => {
  const temp = [];
  const left = [];
  const right = [];
  for (const item of _driveRealtime) {
    let date = new Date(item.date);
    for (let i = 0; i < item.list.length; i++) {
      switch (item.list[i].channelName) {
        case '漏电': {
          right.push({
            time: `${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}`,
            channelName: item.list[i].channelName,
            value: item.list[i].value,
          });
          break;
        }
        case 'A相电压': {
          right.push({
            time: `${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}`,
            // channelName: item.list[i].channelName,
            channelName: '电压',
            value: item.list[i].value,
          });
          break;
        }
        case 'N相温度': {
          left.push({
            time: `${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}`,
            // channelName: item.list[i].channelName,
            channelName: '温度',
            value: item.list[i].value,
          });
          break;
        }
        case 'A相电流': {
          left.push({
            time: `${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}`,
            // channelName: item.list[i].channelName,
            channelName: '电流',
            value: item.list[i].value,
          });
          break;
        }
        default:
          break;
      }
    }
  }
  temp.push(left);
  temp.push(right);
  return temp;
};

class MeterChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // console.log(props);
  }

  render() {
    const { title, id } = this.props;

    // 检查是否为总电表数据页面
    const isAll = title === '总电表数据' || title === '数据页面';

    // 总电表数据页面图表配置项
    const allMeterConfig: any = {
      theme: 'default',
      padding: 'auto',
      xField: 'time',
      yField: 'value',
      seriesField: 'channelName',
      smooth: true,
      slider: {
        start: 0,
        end: 0.5,
      },
    };

    // 单设备图表配置项
    const dualAxesConfig: any = {
      // data: [dualAxesLeftData, dualAxesRightData],
      xField: 'time',
      yField: ['value', 'value'],
      slider: {
        start: 0,
        end: 0.5,
      },
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'channelName',
          smooth: true,
          // point: {},
          animation: {
            appear: {
              animation: 'path-in',
              duration: 5000,
            },
          },
        },
        {
          geometry: 'line',
          // color: '#5AD8A6',
          seriesField: 'channelName',
          smooth: true,
          animation: {
            appear: {
              animation: 'path-in',
              duration: 5000,
            },
          },
        },
      ],
    };

    if (isAll) {
      // 总电表数据页面
      const { drivesRiskFactor } = this.props;
      allMeterConfig.data = handleDrivesRiskFactor(drivesRiskFactor);
      // console.log(allMeterConfig.data);
    } else {
      // 电表
      const { driveRealtime } = this.props;
      dualAxesConfig.data = handleDriveRealtime(driveRealtime);
      // console.log(dualAxesConfig.data);
    }

    return (
      <>
        <Card
          bordered
          style={{ width: '100%' }}
          title={isAll ? null : '设备ID: #' + id}
          extra={
            isAll ? null : (
              <Tooltip title="设备已联网">
                <WifiOutlined style={{ color: 'blue' }} />
              </Tooltip>
            )
          }
        >
          {isAll ? <Line {...allMeterConfig} /> : <DualAxes {...dualAxesConfig} />}
        </Card>
      </>
    );
  }
}

export default MeterChart;
