import { bemUtils, InfoBlock } from '@navikt/fp-common';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { Periode } from 'uttaksplan/types/Periode';
import Periodeliste from './../periodeliste/Periodeliste';

import './planlegger.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: string;
}

const Planlegger: FunctionComponent<Props> = ({ uttaksplan, familiehendelsesdato }) => {
    const bem = bemUtils('planlegger');

    return (
        <InfoBlock>
            <section>
                <div className={bem.element('tittel')}>
                    <Systemtittel>Din plan</Systemtittel>
                </div>
                <Periodeliste uttaksplan={uttaksplan} familiehendelsesdato={familiehendelsesdato} />
            </section>
        </InfoBlock>
    );
};

export default Planlegger;
