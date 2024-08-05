import classnames from 'classnames';

import VeilederKompakt from 'app/assets/VeilederKompaktSvg';
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

export type Props = VeilederProps & OwnProps;

const Veileder = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            className,
        ),
    };

    return stil === 'kompakt' ? (
        <VeilederKompakt svgProps={svgProps} transparentBackground={farge === 'transparent'} />
    ) : (
        <VeilederNormal transparentBackground={farge === 'transparent'} />
    );
};

export default Veileder;
