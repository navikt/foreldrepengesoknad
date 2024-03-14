import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { Arbeidsforhold, UtenlandsoppholdSenere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const save = (values: UtenlandsoppholdSenere) => {
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
                senereUtenlandsopphold={senereUtenlandsopphold}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
