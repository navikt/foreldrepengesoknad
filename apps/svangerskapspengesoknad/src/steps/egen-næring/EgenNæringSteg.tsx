import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getRuteVelgArbeidEllerSkjema as getRuteSkjemaEllerVelgArbeid } from 'utils/tilretteleggingUtils';

import { Heading } from '@navikt/ds-react';

import { EgenNæringPanel } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold, NæringDto } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

export const EgenNæringSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);

    const onSubmit = (values: NæringDto) => {
        oppdaterEgenNæring(values);

        const route = arbeidsforholdOgInntekt.harHattArbeidIUtlandet ? SøknadRoute.ARBEID_I_UTLANDET : undefined;
        const nextRoute =
            route ?? getRuteSkjemaEllerVelgArbeid(barnet.termindato, arbeidsforhold, arbeidsforholdOgInntekt);
        return navigator.goToStep(nextRoute);
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
                appOrigin="svangerskapspengesoknad"
                onStepChange={navigator.goToStep}
            />
        </ContentWrapper>
    );
};
