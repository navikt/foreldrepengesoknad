import * as React from 'react';

import VeilederMelding, { VeilederMeldingStil } from './components/VeilederMelding';
import { VeilederMessage } from './types';

interface Props {
    meldinger: VeilederMessage[];
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
}

const VeilederMeldinger: React.FC<Props> = ({ meldinger, stil = 'default', skjulMeldingIkon }) => (
    <>
        {meldinger.map((melding, idx) => (
            <VeilederMelding key={idx} message={melding} stil={stil} skjulMeldingIkon={skjulMeldingIkon} />
        ))}
    </>
);

export default VeilederMeldinger;
