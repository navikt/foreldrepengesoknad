import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'utils/arbeidsforholdUtils';

import { Heading } from '@navikt/ds-react';

import { EgenNæringPanel } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold, ArbeidsforholdOgInntektSvp, EgenNæring } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const getNextRouteValgAvArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
): SøknadRoutes => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        inntektsinformasjon.harJobbetSomFrilans,
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
    );
    return harKunEtArbeid ? SøknadRoutes.SKJEMA : SøknadRoutes.VELG_ARBEID;
};

const getNextRoute = (
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
): SøknadRoutes => {
    const nextRoute = inntektsinformasjon.harHattArbeidIUtlandet ? SøknadRoutes.ARBEID_I_UTLANDET : undefined;
    return nextRoute ?? getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, inntektsinformasjon);
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const EgenNæringStep: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);

    const onSubmit = (values: EgenNæring) => {
        oppdaterEgenNæring(values);
        return navigator.goToNextStep(getNextRoute(arbeidsforholdOgInntekt, barnet.termindato, arbeidsforhold));
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <EgenNæringPanel
                egenNæring={egenNæring}
                saveOnNext={onSubmit}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Svangerskapspenger"
            />
        </ContentWrapper>
    );
};

export default EgenNæringStep;
