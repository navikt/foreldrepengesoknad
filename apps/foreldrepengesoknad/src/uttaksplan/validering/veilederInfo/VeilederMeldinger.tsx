import * as React from 'react';
import { VeilederMessage } from '../veilederInfo/types';
import VeilederMelding, { VeilederMeldingStil } from './components/VeilederMelding';

interface Props {
    meldinger: VeilederMessage[];
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
}

const VeilederMeldinger: React.FunctionComponent<Props> = ({ meldinger, stil, skjulMeldingIkon }) => {
    return (
        <div>
            {meldinger.map((melding: VeilederMessage) => (
                <VeilederMelding
                    key={melding.contentIntlKey + melding.periodeId}
                    message={melding}
                    stil={stil}
                    skjulMeldingIkon={skjulMeldingIkon}
                />
            ))}
        </div>
    );
};

export default VeilederMeldinger;
