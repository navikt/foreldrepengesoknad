import React from 'react';
import '../src/app/styles/app.less';

export const decorators = [(Story) => <div  id="app" style={{ margin: '40px' }}><Story/></div>];
