import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { SenereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { Arbeidsforhold, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

export const SenereUtenlandsoppholdSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const save = (values: UtenlandsoppholdPeriode[]) => {
        oppdaterSenereUtenlandsopphold(values);
        return navigator.goToNextDefaultStep();
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                saveOnNext={save}
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
