import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { AppName, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { HarArbeidsforhold } from './HarArbeidsforhold';
import { HarIkkeArbeidsforhold } from './HarIkkeArbeidsforhold';

interface Props {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
    visManglerInfo?: boolean;
    appOrigin: AppName;
}

export const ArbeidsforholdInformasjon = ({
    appOrigin,
    arbeidsforhold,
    frilansoppdrag,
    visManglerInfo = true,
}: Props) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;
    const harFrilansoppdrag = frilansoppdrag.length > 0;
    const intl = useIntl();

    return (
        <VStack gap="space-16">
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            {harFrilansoppdrag && (
                <>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id="inntektsinformasjon.frilansoppdrag.label" />
                    </BodyShort>
                    <HarArbeidsforhold harArbeidsforhold={harFrilansoppdrag} arbeidsforhold={frilansoppdrag} />
                </>
            )}
            {visManglerInfo && (
                <ReadMore
                    onOpenChange={(open) =>
                        loggUmamiEvent({
                            origin: appOrigin,
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
