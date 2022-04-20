import { bemUtils } from '@navikt/fp-common';
import KvinneIkon from 'app/assets/KvinneIkon';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

import './personalia.less';

interface Props {
    søkerinfo: Søkerinfo;
}

const Personalia: FunctionComponent<Props> = ({ søkerinfo }) => {
    const bem = bemUtils('personalia');

    return (
        <div className={bem.block}>
            <div className={bem.element('icon')}>
                <KvinneIkon />
            </div>
            <div>
                <Undertittel>{`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}</Undertittel>
                <Normaltekst>{søkerinfo.person.fnr}</Normaltekst>
            </div>
        </div>
    );
};

export default Personalia;
