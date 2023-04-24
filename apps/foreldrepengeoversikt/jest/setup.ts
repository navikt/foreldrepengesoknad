import { JSDOM } from 'jsdom';
import React from 'react';

global.React = React;

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');
(global as any).document = dom.window.document;
(global as any).window = dom.window;
(global as any).window.appSettings = {};
(global as any).window.appSettings.REST_API_URL = 'mock';
