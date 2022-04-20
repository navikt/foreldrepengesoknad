import * as React from 'react';
import MannIkon from 'common/components/ikoner/MannIkon';
import KvinneIkon from 'common/components/ikoner/KvinneIkon';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './søkerPersonalia.less';

interface SøkersPersonaliaProps {
    navn: string;
    fnr: string;
    kjønn: 'M' | 'K';
}

const SøkerPersonalia = (props: SøkersPersonaliaProps) => {
    return (
        <div className="søkersPersonalia">
            <div className="søkersPersonalia__ikon">{props.kjønn === 'K' ? <KvinneIkon /> : <MannIkon />}</div>
            <div className="søkersPersonalia__text">
                <Undertittel>{props.navn}</Undertittel>
                <Normaltekst>{props.fnr}</Normaltekst>
            </div>
        </div>
    );
};

export default SøkerPersonalia;
