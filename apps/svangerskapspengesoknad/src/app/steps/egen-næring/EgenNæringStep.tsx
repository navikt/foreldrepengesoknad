import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { ArbeidsforholdOgInntektSvp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EgenNæring, EgenNæringPanel } from '@navikt/fp-steg-egen-naering';
import { frilansId } from '@navikt/fp-steg-frilans';
import { Arbeidsforhold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { egenNæringId } from 'app/types/EgenNæring';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';

import { getNæringTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';

const getNextRouteValgAvArbeidEllerSkjema = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    const harKunEtArbeid = søkerHarKunEtAktivtArbeid(
        termindato,
        aktiveArbeidsforhold,
        inntektsinformasjon.harJobbetSomFrilans,
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
    );
    if (harKunEtArbeid) {
        if (aktiveArbeidsforhold.length === 0) {
            const frilansEllerNæringId = inntektsinformasjon.harJobbetSomFrilans ? frilansId : egenNæringId;
            return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: frilansEllerNæringId };
        } else {
            return { nextRoute: SøknadRoutes.SKJEMA, nextTilretteleggingId: aktiveArbeidsforhold[0].arbeidsgiverId };
        }
    }
    return { nextRoute: SøknadRoutes.VELG_ARBEID };
};

const getNextRoute = (
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
): { nextRoute: SøknadRoutes; nextTilretteleggingId?: string } => {
    const nextRoute = inntektsinformasjon.harHattArbeidIUtlandet ? SøknadRoutes.ARBEID_I_UTLANDET : undefined;
    return nextRoute
        ? { nextRoute }
        : getNextRouteValgAvArbeidEllerSkjema(termindato, arbeidsforhold, inntektsinformasjon);
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
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const onSubmit = (values: EgenNæring) => {
        oppdaterEgenNæring(values);

        if (
            søkerHarKunEtAktivtArbeid(
                barnet.termindato,
                arbeidsforhold,
                inntektsinformasjon.harJobbetSomFrilans,
                inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
            )
        ) {
            const automatiskValgtTilrettelegging = [getNæringTilretteleggingOption(tilrettelegginger || [], values)];
            oppdaterTilrettelegginger(automatiskValgtTilrettelegging);
        }

        const { nextRoute, nextTilretteleggingId } = getNextRoute(
            inntektsinformasjon,
            barnet.termindato,
            arbeidsforhold,
        );

        oppdaterValgtTilretteleggingId(nextTilretteleggingId);

        return navigator.goToNextStep(nextRoute);
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

export default EgenNæringStep;
