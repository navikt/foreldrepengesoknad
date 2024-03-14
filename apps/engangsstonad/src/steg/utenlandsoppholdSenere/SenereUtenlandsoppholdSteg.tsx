import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { UtenlandsoppholdSenere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: UtenlandsoppholdSenere) => {
        oppdaterSenereUtenlandsopphold(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={senereUtenlandsopphold}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterSenereUtenlandsopphold}
                onContinueLater={navigator.fortsettSøknadSenere}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
