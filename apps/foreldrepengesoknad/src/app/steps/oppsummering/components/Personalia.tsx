import { bemUtils } from '@navikt/fp-common';
import KvinneIkon from 'app/assets/KvinneIkon';
import MannIkon from 'app/assets/MannIkon';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { getKjønnFromFnrString } from 'app/utils/personUtils';
import React, { FunctionComponent } from 'react';

import './personalia.less';
import { BodyShort, Heading } from '@navikt/ds-react';

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
                <Heading size="small">{`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}</Heading>
                <BodyShort>{søkerinfo.person.fnr}</BodyShort>
            </div>
        </div>
    );
};

export default Personalia;
