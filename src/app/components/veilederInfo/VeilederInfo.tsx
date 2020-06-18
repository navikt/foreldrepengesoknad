import * as React from 'react';
import Veileder, { VeilederAnsiktstype, VeilederStil } from 'common/components/veileder/Veileder';
import Veilederpanel from 'nav-frontend-veilederpanel';
import AriaText from 'common/components/aria/AriaText';
import { FormattedMessage } from 'react-intl';
import { VeilederMessage } from './types';
import VeilederMeldinger from './VeilederMeldinger';

interface Props {
    messages: VeilederMessage[];
    paneltype?: 'normal' | 'plakat';
    kompakt?: boolean;
    veilederStil?: VeilederStil;
    ariaTittel?: string;
    skjulMeldingIkon?: boolean;
}

const VeilederInfo: React.SFC<Props> = ({
    messages,
    kompakt = true,
    paneltype = 'normal',
    veilederStil = 'kompakt',
    skjulMeldingIkon = false,
    ariaTittel,
}) => {
    const harFeil = messages.some((m) => m.type === 'feil');
    const harAdvarsler = messages.some((m) => m.type === 'advarsel');

    let ansikt: VeilederAnsiktstype;
    if (harFeil) {
        ansikt = 'skeptisk';
    } else if (harAdvarsler) {
        ansikt = 'undrende';
    } else {
        ansikt = 'glad';
    }

    return (
        <Veilederpanel
            type={paneltype}
            kompakt={kompakt}
            svg={<Veileder stil={veilederStil} ansikt={ansikt} farge="transparent" />}
            fargetema={harFeil ? 'feilmelding' : 'normal'}
        >
            {ariaTittel && (
                <AriaText tag="h2">
                    <FormattedMessage id="uttaksplan.regelAvvik.ariaTittel" />
                </AriaText>
            )}
            <VeilederMeldinger meldinger={messages} stil="transparent" skjulMeldingIkon={skjulMeldingIkon} />
        </Veilederpanel>
    );
};

export default VeilederInfo;
