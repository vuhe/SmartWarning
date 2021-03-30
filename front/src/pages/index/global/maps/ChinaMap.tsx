import React from 'react';
import { AMapScene } from '@antv/l7-react';

/**
 * React.memo() 和 PureComponent 很相似，它帮助我们控制何时重新渲染组件。
 * 组件仅在它的 props 发生改变的时候进行重新渲染。
 * 通常来说，在组件树中 React 组件，只要有变化就会走一遍渲染流程。
 * 但是通过 PureComponent 和 React.memo()，我们可以仅仅让某些组件进行渲染。
 */
const MapScene = React.memo(function Map() {
  return (
    <AMapScene
      map={{
        center: [110, 30],
        pitch: 20,
        style: 'light',
        zoom: 4,
      }}
      style={{
        position: 'absolute',
        top: '5px',
        left: '5px',
        right: '5px',
        bottom: '5px',
      }}
    />
  );
});

export default MapScene;
