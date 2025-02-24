import * as React from 'react';

import Block from '../../common/block/Block';
import VeilederMelding, { VeilederMeldingStil } from './components/VeilederMelding';
import { VeilederMessage } from './types';

interface Props {
    meldinger: VeilederMessage[];
    stil?: VeilederMeldingStil;
    skjulMeldingIkon?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
// eslint-disable-next-line import/no-default-export
export default VeilederMeldinger;
