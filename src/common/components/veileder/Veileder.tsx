import * as React from 'react';
import * as classnames from 'classnames';

import VeilederNormal from './VeilederNormalSvg';
import VeilederKompakt from './VeilederKompaktSvg';

import './veileder.less';

export type Ansiktstype = 'glad' | 'undrende' | 'skeptisk';

export interface VeilederProps {
    ansikt?: 'glad' | 'undrende' | 'skeptisk';
    farge?: 'lilla' | 'gronn' | 'bla';
    stil?: 'normal' | 'kompakt';
}

interface OwnProps {
    className?: string;
}

type Props = VeilederProps & OwnProps;

const Veileder = (props: Props) => {
    const {
        className,
        farge = 'lilla',
        ansikt = 'glad',
        stil = 'normal',
        ...rest
    } = props;

    const svgProps = {
        ...rest,
        className: classnames(
            'veileder',
            `veileder--tema-${farge}`,
            `veileder--${ansikt}`,
            `veileder--${stil}`,
            props.className
        )
    };
    return stil === 'normal' ? (
        <VeilederNormal svgProps={svgProps} />
    ) : (
        <VeilederKompakt svgProps={svgProps} />
    );
};

export default Veileder;
