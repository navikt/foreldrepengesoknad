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
            {meldinger.map((melding: VeilederMessage, index: number) => (
                <VeilederMelding
                    key={melding.contentIntlKey + index}
                    message={melding}
                    stil={stil}
                    skjulMeldingIkon={skjulMeldingIkon}
                />
            ))}
        </div>
    );
};

export default VeilederMeldinger;
