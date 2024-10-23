import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getNextRouteValgAvArbeidEllerSkjema } from 'utils/tilretteleggingUtils';

import { Heading } from '@navikt/ds-react';

import { FrilansPanel } from '@navikt/fp-steg-frilans';
import { Arbeidsforhold, Frilans } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

export const FrilansStep = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);

    const onSubmit = (values: Frilans) => {
        oppdaterFrilans(values);

        const route = arbeidsforholdOgInntekt.harHattArbeidIUtlandet ? SøknadRoute.ARBEID_I_UTLANDET : undefined;
        const nextRoute = arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende ? SøknadRoute.NÆRING : route;

        return navigator.goToStep(
            nextRoute ??
                getNextRouteValgAvArbeidEllerSkjema(barnet.termindato, arbeidsforhold, arbeidsforholdOgInntekt),
        );
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <FrilansPanel
                frilans={frilans}
                saveOnNext={onSubmit}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
            />
        </ContentWrapper>
    );
};
