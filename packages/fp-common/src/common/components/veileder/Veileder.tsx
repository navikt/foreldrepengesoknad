import classnames from 'classnames';

import VeilederNormal from './VeilederNormalSvg';
import VeilederKompakt from './VeilederKompaktSvg';

import './veileder.less';

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
    const { className, farge = 'lilla', ansikt = 'glad', stil = 'normal', ...rest } = props;

    const svgProps = {
        ...rest,
        className: classnames(
            'veileder',
            `veileder--tema-${farge}`,
            `veileder--${ansikt}`,
            `veileder--${stil}`,
            props.className
        ),
    };

    if (stil === 'normal') {
        return <VeilederNormal svgProps={svgProps} />;
    } else {
        return <VeilederKompakt svgProps={svgProps} />;
    }
};

export default Veileder;
