import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { SenereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: UtenlandsoppholdPeriode[]) => {
        oppdaterSenereUtenlandsopphold(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterSenereUtenlandsopphold}
                onContinueLater={navigator.fortsettSøknadSenere}
                onStepChange={navigator.goToNextStep}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
