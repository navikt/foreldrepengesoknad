import React from 'react';
import { ForeldreparForelder } from 'app/types/ForeldreparSituasjonTypes';
import Far1 from './assets/Far1';
import Far2 from './assets/Far2';
import Far3 from './assets/Far3';
import Far4 from './assets/Far4';
import Medmor2 from './assets/Medmor2';
import Medmor1 from './assets/Medmor1';
import Mor1 from './assets/Mor1';
import Mor2 from './assets/Mor2';

const getForeldreparIkonProps = (className: string, width: number, height: number) => ({
    focusable: 'false',
    role: 'presentation',
    viewBox: '0 0 68 96',
    className,
    width,
    height,
});

export const getForeldreparIkon = (
    forelder: ForeldreparForelder,
    className: string,
    width: number,
    height: number
): any => {
    switch (forelder) {
        case 'far1':
            return <Far1 {...getForeldreparIkonProps(className, width, height)} />;
        case 'far2':
            return <Far2 {...getForeldreparIkonProps(className, width, height)} />;
        case 'far3':
            return <Far3 {...getForeldreparIkonProps(className, width, height)} />;
        case 'far4':
            return <Far4 {...getForeldreparIkonProps(className, width, height)} />;
        case 'medmor2':
            return <Medmor1 {...getForeldreparIkonProps(className, width, height)} />;
        case 'medmor1':
            return <Medmor2 {...getForeldreparIkonProps(className, width, height)} />;
        case 'mor1':
            return <Mor1 {...getForeldreparIkonProps(className, width, height)} />;
        case 'mor2':
            return <Mor2 {...getForeldreparIkonProps(className, width, height)} />;
        default:
            return undefined;
    }
};
