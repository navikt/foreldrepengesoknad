import { FunctionComponent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import OppsummeringsPunkt from './OppsummeringsPunkt';
import { Søkerinfo } from '@navikt/fp-common';

import './personalia.less';

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
