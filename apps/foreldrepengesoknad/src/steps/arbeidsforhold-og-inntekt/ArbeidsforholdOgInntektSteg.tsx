import { useQuery } from '@tanstack/react-query';
import { mineFrilansoppdragOptions, selvstendigNæringOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { ArbeidsforholdOgInntektPanel } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { skalViseEgenNæringSteg } from '@navikt/fp-steg-egen-naering';
import {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektFp,
    EksternArbeidsforholdDto_fpoversikt,
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
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER) ?? [];

    const frilansoppdragQuery = useQuery(mineFrilansoppdragOptions());
    const frilansoppdrag = frilansoppdragQuery.data ?? [];

    const selvstendigNæringQuery = useQuery(selvstendigNæringOptions());
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
        const arbeidsforholdOgInntektFp: ArbeidsforholdOgInntektFp = {
            harJobbetSomFrilans: values.harJobbetSomFrilans,
            harJobbetSomSelvstendigNæringsdrivende: values.harJobbetSomSelvstendigNæringsdrivende,
        };

        oppdaterArbeidsforholdOgInntekt(arbeidsforholdOgInntektFp);

        if (!arbeidsforholdOgInntektFp.harJobbetSomFrilans) {
            oppdaterFrilans(undefined);
        }
        if (!arbeidsforholdOgInntektFp.harJobbetSomSelvstendigNæringsdrivende) {
            oppdaterEgenNæring(undefined);
        }

        if (arbeidsforholdOgInntektFp.harJobbetSomFrilans) {
            return navigator.goToStep(SøknadRoutes.FRILANS);
        }
        if (
            skalViseEgenNæringSteg({
                harJobbetSomSelvstendigNæringsdrivende:
                    arbeidsforholdOgInntektFp.harJobbetSomSelvstendigNæringsdrivende,
                harRegistrertNæring: selvstendigNæring.length > 0,
                egenNæring,
            })
        ) {
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
                egenNæring={egenNæring}
                andreInntektskilder={andreInntektskilder}
                arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                saveOnNext={onSubmit}
                saveAndreInntektskilder={oppdaterAndreInntektskilder}
                saveEgenNæring={oppdaterEgenNæring}
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
