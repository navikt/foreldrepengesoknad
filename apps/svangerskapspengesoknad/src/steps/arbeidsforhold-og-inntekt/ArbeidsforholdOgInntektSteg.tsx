import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { useTilretteleggingerHelper } from 'appData/useTilretteleggingerHelper';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { getRuteVelgArbeidEllerSkjema } from 'utils/tilretteleggingUtils';

import { ArbeidsforholdOgInntektPanel } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektSvp,
    EksternArbeidsforholdDto_fpoversikt,
    FRILANS_ID,
    isArbeidsforholdOgInntektSvp,
} from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const getNextRoute = (
    termindato: string,
    aktiveArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    values: ArbeidsforholdOgInntektSvp,
): SøknadRoute | string => {
    if (values.harJobbetSomFrilans) {
        return SøknadRoute.FRILANS;
    }
    if (values.harJobbetSomSelvstendigNæringsdrivende) {
        return SøknadRoute.NÆRING;
    }
    if (values.harHattArbeidIUtlandet) {
        return SøknadRoute.ARBEID_I_UTLANDET;
    }
    return getRuteVelgArbeidEllerSkjema(termindato, aktiveArbeidsforhold, values);
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const ArbeidsforholdOgInntektSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);
    const { fjernTilrettelegginger } = useTilretteleggingerHelper();

    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const { termindato } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterArbeidsforholdOgInntekt = useContextSaveData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

    const onSubmit = (values: ArbeidsforholdOgInntekt) => {
        if (!isArbeidsforholdOgInntektSvp(values)) {
            throw new Error('values er på feil format');
        }

        oppdaterArbeidsforholdOgInntekt(values);

        const tilretteleggingerSomSkalFjernes = [];

        if (values.harHattArbeidIUtlandet === false) {
            oppdaterArbeidIUtlandet(undefined);
        }
        if (values.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
            tilretteleggingerSomSkalFjernes.push(FRILANS_ID);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
            tilretteleggingerSomSkalFjernes.push(EGEN_NÆRING_ID);
        }

        if (tilretteleggingerSomSkalFjernes.length > 0) {
            fjernTilrettelegginger(tilretteleggingerSomSkalFjernes);
        }

        return navigator.goToStep(getNextRoute(termindato, aktiveArbeidsforhold, values));
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <ArbeidsforholdOgInntektPanel
                aktiveArbeidsforhold={aktiveArbeidsforhold}
                arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                saveOnNext={onSubmit}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
                appOrigin="svangerskapspengesoknad"
            />
        </SkjemaRotLayout>
    );
};
