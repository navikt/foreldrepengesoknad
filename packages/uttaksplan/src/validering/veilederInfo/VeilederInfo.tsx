import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { GuidePanel } from '@navikt/ds-react';

import AriaText from '../../components/aria-text/AriaText';
import VeilederMeldinger from './VeilederMeldinger';
import { VeilederMessage } from './types';

interface Props {
    messages: VeilederMessage[];
    ariaTittel?: string;
    skjulMeldingIkon?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
// eslint-disable-next-line import/no-default-export
export default VeilederInfo;
