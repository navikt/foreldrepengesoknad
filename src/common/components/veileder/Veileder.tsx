import * as React from 'react';
import * as classnames from 'classnames';

import VeilederKompakt from './VeilederKompaktSvg';
import VeilederNormal from 'app/assets/VeilederNormal';

import './veileder.less';

export type VeilederAnsiktstype = 'glad' | 'undrende' | 'skeptisk';
export type VeilederStil = 'normal' | 'kompakt';

export interface VeilederProps {
    ansikt?: VeilederAnsiktstype;
    farge?: 'lilla' | 'gronn' | 'bla' | 'transparent';
    stil?: VeilederStil;
    height?: string;
}

interface OwnProps {
    className?: string;
}

type Props = VeilederProps & OwnProps;

const Veileder = (props: Props) => {
    const { className, farge = 'lilla', ansikt = 'glad', stil = 'normal', height = '184', ...rest } = props;

    const svgProps = {
        ...rest,
        width: '184',
        height,
        className: classnames(
            'veileder',
            `veileder--${ansikt}`,
            `veileder--tema-${farge}`,
            `veileder--stil-${stil}`,
            props.className
        ),
    };

    return stil === 'kompakt' ? (
        <VeilederKompakt svgProps={svgProps} transparentBackground={farge === 'transparent'} />
    ) : (
        <VeilederNormal transparentBackground={farge === 'transparent'} />
    );
};

export default Veileder;
