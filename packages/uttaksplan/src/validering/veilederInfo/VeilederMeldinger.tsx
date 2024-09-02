import * as React from 'react';

import Block from '../../common/block/Block';
import VeilederMelding, { VeilederMeldingStil } from './components/VeilederMelding';
import { VeilederMessage } from './types';

interface Props {
    meldinger: VeilederMessage[];
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
}

const VeilederMeldinger: React.FunctionComponent<Props> = ({ meldinger, stil, skjulMeldingIkon }) => {
    return (
        <div>
            {meldinger.map((melding: VeilederMessage) => (
                <Block padBottom="xl" key={melding.contentIntlKey + melding.periodeId}>
                    <VeilederMelding message={melding} stil={stil} skjulMeldingIkon={skjulMeldingIkon} />
                </Block>
            ))}
        </div>
    );
};

export default VeilederMeldinger;
