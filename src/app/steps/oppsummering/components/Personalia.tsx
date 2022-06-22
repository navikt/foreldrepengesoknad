import { bemUtils } from '@navikt/fp-common';
import KvinneIkon from 'app/assets/KvinneIkon';
import MannIkon from 'app/assets/MannIkon';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { getKjønnFromFnrString } from 'app/utils/personUtils';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

import './personalia.less';

interface Props {
    søkerinfo: Søkerinfo;
}

const Personalia: FunctionComponent<Props> = ({ søkerinfo }) => {
    const bem = bemUtils('personalia');
    const { person } = søkerinfo;

    return (
        <div className={bem.block}>
            <div className={bem.element('icon')}>
                {getKjønnFromFnrString(person.fnr) === 'K' ? <KvinneIkon /> : <MannIkon />}
            </div>
            <div>
                <Undertittel>{`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}</Undertittel>
                <Normaltekst>{søkerinfo.person.fnr}</Normaltekst>
            </div>
        </div>
    );
};

export default Personalia;
