import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { VeilederMessage } from './types';
import VeilederMeldinger from './VeilederMeldinger';
import { GuidePanel } from '@navikt/ds-react';
import AriaText from '../../components/aria-text/AriaText';

interface Props {
    messages: VeilederMessage[];
    ariaTittel?: string;
    skjulMeldingIkon?: boolean;
}

const VeilederInfo: React.FunctionComponent<Props> = ({ messages, skjulMeldingIkon = false, ariaTittel }) => {
    return (
        <GuidePanel poster>
            {ariaTittel && (
                <AriaText tag="h3">
                    <FormattedMessage id="uttaksplan.regelAvvik.ariaTittel" />
                </AriaText>
            )}
            <VeilederMeldinger meldinger={messages} stil="transparent" skjulMeldingIkon={skjulMeldingIkon} />
        </GuidePanel>
    );
};

export default VeilederInfo;
