import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { AppName, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { type AndreInntektskilder } from '../../types/AndreInntektskilder';
import { AndreInntektskilderBox } from './AndreInntektskilderBox';
import { FrilansOppdrag } from './FrilansOppdrag.tsx';
import { HarArbeidsforhold } from './HarArbeidsforhold';
import { HarIkkeArbeidsforhold } from './HarIkkeArbeidsforhold';
import { SelvstendigNæring } from './SelvstendigNæring.tsx';

interface Props {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
    selvstendigNæring: EksternArbeidsforholdDto_fpoversikt[];
    andreInntektskilder: AndreInntektskilder[];
    visManglerInfo?: boolean;
    appOrigin: AppName;
}

export const ArbeidsforholdInformasjon = ({
    appOrigin,
    arbeidsforhold,
    frilansoppdrag,
    selvstendigNæring,
    andreInntektskilder,
}: Props) => {
    const harArbeidsforhold = arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <VStack gap="space-16">
            <BodyShort style={{ fontWeight: 'bold' }}>
                <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
            </BodyShort>
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            <FrilansOppdrag frilansoppdrag={frilansoppdrag} />
            <SelvstendigNæring selvstendigNæring={selvstendigNæring} />
            <AndreInntektskilderBox andreInntektskilder={andreInntektskilder} />
            <ReadMore
                variant="moderate"
                header={
                    <FormattedMessage
                        id="inntektsinformasjon.inntektsmelding.header"
                        values={{ antall: arbeidsforhold.length }}
                    />
                }
            >
                <FormattedMessage
                    id="inntektsinformasjon.inntektsmelding.body"
                    values={{ antall: arbeidsforhold.length }}
                />
            </ReadMore>
            <ReadMore
                variant="moderate"
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
        </VStack>
    );
};
