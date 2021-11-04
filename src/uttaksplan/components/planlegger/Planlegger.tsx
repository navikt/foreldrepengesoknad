import { bemUtils, InfoBlock } from '@navikt/fp-common';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import Periodeliste from './../periodeliste/Periodeliste';

import './planlegger.less';

const Planlegger = () => {
    const bem = bemUtils('planlegger');

    return (
        <InfoBlock>
            <section>
                <div className={bem.element('tittel')}>
                    <Systemtittel>Din plan</Systemtittel>
                </div>
                <Periodeliste />
            </section>
        </InfoBlock>
    );
};

export default Planlegger;
