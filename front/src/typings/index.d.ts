// 导入自定义 ts 类型文件
import * as SmartWarning from './global';

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.bmp' {
  const path: string;
  export default path;
}

declare module '*.gif' {
  const path: string;
  export default path;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module '*.jpeg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}
