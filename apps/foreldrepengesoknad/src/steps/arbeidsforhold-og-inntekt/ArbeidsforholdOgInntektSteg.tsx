import { useQuery } from '@tanstack/react-query';
import { mineFrilansoppdragOptions, mineSNOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { ArbeidsforholdOgInntektPanel } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektFp,
    EksternArbeidsforholdDto_fpoversikt,
    isArbeidsforholdOgInntektFp,
} from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const ArbeidsforholdOgInntektSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER) ?? [];

    const frilansoppdragQuery = useQuery({
        ...mineFrilansoppdragOptions(),
        select: (data) => {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return data.filter((oppdrag) => !oppdrag.tom || new Date(oppdrag.tom) >= threeMonthsAgo);
        },
    });
    const frilansoppdrag = frilansoppdragQuery.data ?? [];

    const selvstendigNæringQuery = useQuery(mineSNOptions());
    const selvstendigNæring = selvstendigNæringQuery.data ?? [];

    const oppdaterArbeidsforholdOgInntekt = useContextSaveData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterAndreInntektskilder = useContextSaveData(ContextDataType.ANDRE_INNTEKTSKILDER);

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        erAdopsjon,
        isFarEllerMedmor(søkersituasjon.rolle),
        getFamiliehendelsedato(barn),
    );

    const onSubmit = (values: ArbeidsforholdOgInntekt) => {
        const valuesWithAndreInntekter: ArbeidsforholdOgInntektFp = {
            harJobbetSomFrilans: values.harJobbetSomFrilans,
            harJobbetSomSelvstendigNæringsdrivende: values.harJobbetSomSelvstendigNæringsdrivende,
            harHattAndreInntektskilder: isArbeidsforholdOgInntektFp(values)
                ? values.harHattAndreInntektskilder
                : andreInntektskilder.length > 0,
        };

        if (!isArbeidsforholdOgInntektFp(valuesWithAndreInntekter)) {
            throw new Error('values er på feil format');
        }

        oppdaterArbeidsforholdOgInntekt(valuesWithAndreInntekter);

        if (valuesWithAndreInntekter.harHattAndreInntektskilder === false) {
            oppdaterAndreInntektskilder(undefined);
        }
        if (valuesWithAndreInntekter.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
        }
        if (valuesWithAndreInntekter.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
        }

        if (valuesWithAndreInntekter.harJobbetSomFrilans) {
            return navigator.goToStep(SøknadRoutes.FRILANS);
        }
        if (valuesWithAndreInntekter.harJobbetSomSelvstendigNæringsdrivende) {
            return navigator.goToStep(SøknadRoutes.EGEN_NÆRING);
        }

        return navigator.goToNextStep();
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <ArbeidsforholdOgInntektPanel
                aktiveArbeidsforhold={aktiveArbeidsforhold}
                frilansoppdrag={frilansoppdrag}
                selvstendigNæring={selvstendigNæring}
                andreInntektskilder={andreInntektskilder}
                arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                saveOnNext={onSubmit}
                saveAndreInntektskilder={oppdaterAndreInntektskilder}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
                appOrigin="foreldrepengesoknad"
            />
        </SkjemaRotLayout>
    );
};
