import * as React from 'react';
import * as classnames from 'classnames';

import VeilederNormal from './VeilederNormalSvg';
import VeilederKompakt from './VeilederKompaktSvg';

import './veileder.less';
import VeilederKompaktUtenBakgrunn from './VeilederKompaktUtenBakgrunnSVG';

export type Ansiktstype = 'glad' | 'undrende' | 'skeptisk';

export interface VeilederProps {
    ansikt?: 'glad' | 'undrende' | 'skeptisk';
    farge?: 'lilla' | 'gronn' | 'bla';
    stil?: 'normal' | 'kompakt' | 'kompakt-uten-bakgrunn';
}

interface OwnProps {
    className?: string;
}

type Props = VeilederProps & OwnProps;

const Veileder = (props: Props) => {
    const { className, farge = 'lilla', ansikt = 'glad', stil = 'normal', ...rest } = props;

    const svgProps = {
        ...rest,
        width: '184',
        height: '184',
        className: classnames(
            'veileder',
            `veileder--tema-${farge}`,
            `veileder--${ansikt}`,
            `veileder--${stil}`,
            props.className
        )
    };

    switch (stil) {
        case 'kompakt':
            return <VeilederKompakt svgProps={svgProps} />;
        case 'kompakt-uten-bakgrunn':
            return <VeilederKompaktUtenBakgrunn svgProps={svgProps} />;
        default:
            return <VeilederNormal svgProps={svgProps} />;
    }
};

export default Veileder;
