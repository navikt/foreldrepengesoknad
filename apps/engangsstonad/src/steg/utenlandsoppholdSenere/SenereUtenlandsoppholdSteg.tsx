import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { UtenlandsoppholdSenere } from '@navikt/fp-types';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';

import useEsNavigator from 'appData/useEsNavigator';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import useStepConfig from 'appData/useStepConfig';

type Props = {
    mellomlagreOgNaviger: () => void;
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const senereUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SENERE);
    const lagreSenereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: UtenlandsoppholdSenere) => {
        lagreSenereUtenlandsopphold(formValues);
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
                saveOnPrevious={lagreSenereUtenlandsopphold}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
