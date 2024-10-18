import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { useTilretteleggingerHelper } from 'appData/useTilretteleggingerHelper';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'utils/arbeidsforholdUtils';

import { Heading } from '@navikt/ds-react';

import { ArbeidsforholdOgInntektPanel } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import {
    Arbeidsforhold,
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektSvp,
    EGEN_NÆRING_ID,
    FRILANS_ID,
    isArbeidsforholdOgInntektSvp,
} from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const søkerHarKunEttARegArbeidsforholdForTilrettelegging = (
    formValues: ArbeidsforholdOgInntektSvp,
    aktiveArbeidsforhold: Arbeidsforhold[],
    termindato: string,
) => {
    const kunEttAktivt = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        formValues.harJobbetSomFrilans,
        formValues.harJobbetSomSelvstendigNæringsdrivende,
    );
    return kunEttAktivt && aktiveArbeidsforhold.length > 0;
};

const getNextRoute = (harKunEttArbeidsforhold: boolean, values: ArbeidsforholdOgInntektSvp): SøknadRoutes => {
    if (values.harJobbetSomFrilans) {
        return SøknadRoutes.FRILANS;
    }
    if (values.harJobbetSomSelvstendigNæringsdrivende) {
        return SøknadRoutes.NÆRING;
    }
    if (values.harHattArbeidIUtlandet) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return harKunEttArbeidsforhold ? SøknadRoutes.SKJEMA : SøknadRoutes.VELG_ARBEID;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const ArbeidsforholdOgInntektSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
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
            throw Error('values er på feil format');
        }

        oppdaterArbeidsforholdOgInntekt(values);

        if (values.harHattArbeidIUtlandet === false) {
            oppdaterArbeidIUtlandet(undefined);
        }
        if (values.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
            fjernTilrettelegginger([FRILANS_ID]);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
            fjernTilrettelegginger([EGEN_NÆRING_ID]);
        }

        const harKunEttArbeidsforhold = søkerHarKunEttARegArbeidsforholdForTilrettelegging(
            values,
            aktiveArbeidsforhold,
            termindato,
        );

        return navigator.goToNextStep(getNextRoute(harKunEttArbeidsforhold, values));
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <ArbeidsforholdOgInntektPanel
                aktiveArbeidsforhold={aktiveArbeidsforhold}
                arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                saveOnNext={onSubmit}
                onStepChange={navigator.goToNextStep}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Svangerskapspenger"
            />
        </ContentWrapper>
    );
};

export default ArbeidsforholdOgInntektSteg;
