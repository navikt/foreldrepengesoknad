import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { HarArbeidsforhold } from './HarArbeidsforhold';
import { HarIkkeArbeidsforhold } from './HarIkkeArbeidsforhold';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    visManglerInfo?: boolean;
}

export const ArbeidsforholdInformasjon = ({ arbeidsforhold, visManglerInfo = true }: Props) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <VStack gap="4">
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            {visManglerInfo && (
                <ReadMore
                    onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Feil_eller_mangler')}
                    header={intl.formatMessage({ id: 'inntektsinformasjon.arbeidsforhold.info' })}
                >
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.tekst" />
                    </BodyShort>
                </ReadMore>
            )}
        </VStack>
    );
};
