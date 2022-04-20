import React from 'react';
import { bemUtils } from '@navikt/fp-common';
import { ForeldreparForelder, ForeldreparIllustrasjonsvariant } from 'app/types/ForeldreparSituasjonTypes';
import FlexibleSvg from '../flexible-svg/FlexibleSVG';

import './foreldrepar.less';

interface Props {
    forelder1: ForeldreparForelder;
    forelder2?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
    kompakt?: boolean;
}

const bem = bemUtils('foreldrepar');

const Foreldrepar: React.FunctionComponent<Props> = ({ forelder1, forelder2, variant, kompakt }) => {
    const firstSvg = require(`./assets/${forelder1}.svg`).default;
    const secondSvg = forelder2 ? require(`./assets/${forelder2}.svg`).default : undefined;

    return (
        <div role="presentation" className={bem.classNames(bem.block, bem.modifierConditional('kompakt', kompakt))}>
            <Forelder
                className={bem.element('firstParent')}
                svg={firstSvg}
                lessOpacity={variant === 'førsteForelderHalvtSynlig'}
            />
            {secondSvg && (
                <>
                    {variant && variant === 'foreldreSeparert' && <span className={bem.element('parentSeparator')} />}
                    <Forelder
                        className={bem.element('secondParent')}
                        svg={secondSvg}
                        lessOpacity={variant === 'andreForelderHalvtSynlig'}
                    />
                </>
            )}
        </div>
    );
};

const Forelder = ({ className, svg, lessOpacity }: { className: string; svg: any; lessOpacity?: boolean }) => {
    const svgToRender = (
        <FlexibleSvg
            className={bem.classNames(className, bem.modifierConditional('halfOpacity', lessOpacity))}
            iconRef={svg}
            width={31}
            height={45}
        />
    );

    return svgToRender;
};

export default Foreldrepar;
