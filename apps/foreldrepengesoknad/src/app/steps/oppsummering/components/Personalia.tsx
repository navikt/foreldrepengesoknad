import { Søkerinfo } from 'app/types/Søkerinfo';
import React, { FunctionComponent } from 'react';

import './personalia.less';
import { BodyShort } from '@navikt/ds-react';
import OppsummeringsPunkt from './OppsummeringsPunkt';

interface Props {
    søkerinfo: Søkerinfo;
}

const Personalia: FunctionComponent<Props> = ({ søkerinfo }) => {
    return (
        <OppsummeringsPunkt title={`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}>
            <BodyShort>{søkerinfo.person.fnr}</BodyShort>
        </OppsummeringsPunkt>
    );
};

export default Personalia;
