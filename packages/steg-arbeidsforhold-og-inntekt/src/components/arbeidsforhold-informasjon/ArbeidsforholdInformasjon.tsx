import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { AppName, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { type AndreInntektskilder } from '../../types/AndreInntektskilder';
import { HvemKanVæreFrilanser } from '../hvem-kan-være-frilanser/HvemKanVæreFrilanser.tsx';
import { AndreInntektskilderBox } from './AndreInntektskilderBox';
import { HarArbeidsforhold } from './HarArbeidsforhold';
import { HarIkkeArbeidsforhold } from './HarIkkeArbeidsforhold';

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
    visManglerInfo = true,
}: Props) => {
    const harArbeidsforhold = arbeidsforhold.length > 0;
    const harFrilansoppdrag = frilansoppdrag.length > 0;
    const harSelvstendigNæring = selvstendigNæring.length > 0;
    const harAndreInntektskilder = andreInntektskilder.length > 0;
    const intl = useIntl();

    return (
        <VStack gap="space-16">
            {visManglerInfo && (
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
            )}
            <BodyShort style={{ fontWeight: 'bold' }}>
                <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
            </BodyShort>
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            <ReadMore
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
            {harFrilansoppdrag && (
                <>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id="inntektsinformasjon.frilansoppdrag.label" />
                    </BodyShort>
                    <HarArbeidsforhold harArbeidsforhold={harFrilansoppdrag} arbeidsforhold={frilansoppdrag} />
                    <HvemKanVæreFrilanser appOrigin={appOrigin} />
                </>
            )}
            {harSelvstendigNæring && (
                <>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id="inntektsinformasjon.egenNæring.label" />
                    </BodyShort>
                    <HarArbeidsforhold harArbeidsforhold={harSelvstendigNæring} arbeidsforhold={selvstendigNæring} />
                </>
            )}
            {harAndreInntektskilder && (
                <>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id="inntektsinformasjon.andreInntekter.label" />
                    </BodyShort>
                    <AndreInntektskilderBox andreInntektskilder={andreInntektskilder} />
                </>
            )}
        </VStack>
    );
};
