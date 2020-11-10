import React, { memo } from 'react';
import { hot } from 'react-hot-loader/root';

const B = memo(function B() {
    return <div>testB</div>;
});

export default hot(B);
