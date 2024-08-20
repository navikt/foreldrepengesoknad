import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { ArbeidsforholdOgInntektPanel, Inntektsinformasjon } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { Arbeidsforhold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { getAktiveArbeidsforhold, søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';

import { getArbeidsforholdTilretteleggingOptions } from '../velg-arbeidsforhold/velgArbeidFormUtils';

const søkerHarKunEttARegArbeidsforholdForTilrettelegging = (
    formValues: Inntektsinformasjon,
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

export const getAutomatiskValgtTilretteleggingHvisKunEtArbeid = (
    formValues: Inntektsinformasjon,
    aktiveArbeidsforhold: Arbeidsforhold[],
    termindato: string,
    tilrettelegging: Tilrettelegging[],
    intl: IntlShape,
) => {
    let automatiskValgtTilrettelegging = undefined;
    const kunEtAregArbeidsforholdForTilrettelegging = søkerHarKunEttARegArbeidsforholdForTilrettelegging(
        formValues,
        aktiveArbeidsforhold,
        termindato,
    );
    if (kunEtAregArbeidsforholdForTilrettelegging) {
        automatiskValgtTilrettelegging = getArbeidsforholdTilretteleggingOptions(
            aktiveArbeidsforhold,
            tilrettelegging,
            termindato,
            intl,
        )[0];
    }
    return automatiskValgtTilrettelegging;
};

const getNextRouteForInntektsinformasjon = (
    automatiskValgtTilrettelegging: Tilrettelegging | undefined,
    values: Inntektsinformasjon,
): SøknadRoutes => {
    if (values.harJobbetSomFrilans) {
        return SøknadRoutes.FRILANS;
    }
    if (values.harJobbetSomSelvstendigNæringsdrivende) {
        return SøknadRoutes.NÆRING;
    }
    if (values.harHattArbeidIUtlandet) {
        return SøknadRoutes.ARBEID_I_UTLANDET;
    }
    return automatiskValgtTilrettelegging ? SøknadRoutes.SKJEMA : SøknadRoutes.VELG_ARBEID;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const InntektsinformasjonSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const inntektsinformasjon = useContextGetData(ContextDataType.INNTEKTSINFORMASJON);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const { termindato } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterInntektsinformasjon = useContextSaveData(ContextDataType.INNTEKTSINFORMASJON);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterArbeidIUtlandet = useContextSaveData(ContextDataType.ARBEID_I_UTLANDET);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

    const onSubmit = (values: Inntektsinformasjon) => {
        const automatiskValgtTilrettelegging = getAutomatiskValgtTilretteleggingHvisKunEtArbeid(
            values,
            aktiveArbeidsforhold,
            termindato,
            tilrettelegginger || [],
            intl,
        );

        if (automatiskValgtTilrettelegging) {
            oppdaterTilrettelegginger([automatiskValgtTilrettelegging]);
        }

        oppdaterInntektsinformasjon(values);

        if (values.harHattArbeidIUtlandet === false) {
            oppdaterArbeidIUtlandet(undefined);
        }
        if (values.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
        }

        const neste = getNextRouteForInntektsinformasjon(automatiskValgtTilrettelegging, values);
        if (neste === SøknadRoutes.SKJEMA && automatiskValgtTilrettelegging) {
            oppdaterValgtTilretteleggingId(automatiskValgtTilrettelegging.id);
        }

        return navigator.goToNextStep(neste);
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <ArbeidsforholdOgInntektPanel
                arbeidsforhold={arbeidsforhold}
                termindato={termindato}
                inntektsinformasjon={inntektsinformasjon}
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

export default InntektsinformasjonSteg;
