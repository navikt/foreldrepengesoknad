import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { VeilederMessage } from './types';
import VeilederMeldinger from './VeilederMeldinger';
import AriaText from 'uttaksplan/components/aria-text/AriaText';
import { GuidePanel } from '@navikt/ds-react';

interface Props {
    messages: VeilederMessage[];
    ariaTittel?: string;
    skjulMeldingIkon?: boolean;
}

const VeilederInfo: React.FunctionComponent<Props> = ({ messages, skjulMeldingIkon = false, ariaTittel }) => {
    return (
        <GuidePanel poster>
            {ariaTittel && (
                <AriaText tag="h2">
                    <FormattedMessage id="uttaksplan.regelAvvik.ariaTittel" />
                </AriaText>
            )}
            <VeilederMeldinger meldinger={messages} stil="transparent" skjulMeldingIkon={skjulMeldingIkon} />
        </GuidePanel>
    );
};

export default VeilederInfo;
