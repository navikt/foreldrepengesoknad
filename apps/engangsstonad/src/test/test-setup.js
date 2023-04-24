import React from 'react';
import '@testing-library/jest-dom';
global.React = React;
// eslint-disable-next-line no-undef
window.scrollTo = () => ({});
// eslint-disable-next-line no-undef
global.IS_REACT_ACT_ENVIRONMENT = true;
