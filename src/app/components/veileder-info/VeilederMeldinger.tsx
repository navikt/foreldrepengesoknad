import * as React from 'react';
import { VeilederMessage } from '../veileder-info/types';
import VeilederMelding, { VeilederMeldingStil } from './components/VeilederMelding';

interface Props {
    meldinger: VeilederMessage[];
    stil?: VeilederMeldingStil;
}

const VeilederMeldinger: React.StatelessComponent<Props> = ({ meldinger, stil }) => {
    return (
        <div>
            {meldinger.map((melding: VeilederMessage, index: number) => (
                <VeilederMelding key={melding.contentIntlKey + index} message={melding} stil={stil} />
            ))}
        </div>
    );
};

export default VeilederMeldinger;
