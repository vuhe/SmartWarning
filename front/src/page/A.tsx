import React, { memo } from 'react';
import { hot } from 'react-hot-loader/root';

const A = memo(function A() {
    return <div>testA</div>;
});

export default hot(A);
