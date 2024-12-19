import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { AppName, Arbeidsforhold } from '@navikt/fp-types';

import { HarArbeidsforhold } from './HarArbeidsforhold';
import { HarIkkeArbeidsforhold } from './HarIkkeArbeidsforhold';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    visManglerInfo?: boolean;
    stønadstype: AppName;
}

export const ArbeidsforholdInformasjon = ({ stønadstype, arbeidsforhold, visManglerInfo = true }: Props) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <VStack gap="4">
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            {visManglerInfo && (
                <ReadMore
                    onOpenChange={(open) =>
                        loggAmplitudeEvent({
                            origin: stønadstype,
                            eventName: open ? 'readmore åpnet' : 'readmore lukket',
                            eventData: { tittel: 'inntektsinformasjon.arbeidsforhold.info' },
                        })
                    }
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
