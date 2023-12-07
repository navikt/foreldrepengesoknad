import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { UtenlandsoppholdSenere } from '@navikt/fp-types';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';

import useEsNavigator from 'appData/useEsNavigator';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useStepConfig from 'appData/useStepConfig';

type Props = {
    mellomlagreOgNaviger: () => void;
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: UtenlandsoppholdSenere) => {
        oppdaterSenereUtenlandsopphold(formValues);
        navigator.goToNextDefaultStep();
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
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
