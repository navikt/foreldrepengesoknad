import { FormattedMessage } from 'react-intl';
import { Utenlandsopphold } from '@navikt/fp-types';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { Heading } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';

import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { ContextDataType, useContextSaveData, useContextGetData } from 'appData/EsDataContext';
import useStepConfig from 'appData/useStepConfig';

const utledNesteSide = (formValues: Utenlandsopphold): Path => {
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        return Path.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return formValues?.skalBoUtenforNorgeNeste12Mnd ? Path.SENERE_UTENLANDSOPPHOLD : Path.OPPSUMMERING;
};

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const UtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);

    const oppdaterUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: Utenlandsopphold) => {
        oppdaterUtenlandsopphold(formValues);

        if (!formValues.harBoddUtenforNorgeSiste12Mnd) {
            oppdaterTidligereUtenlandsopphold(undefined);
        }
        if (!formValues.skalBoUtenforNorgeNeste12Mnd) {
            oppdaterSenereUtenlandsopphold(undefined);
        }

        return navigator.goToNextStep(utledNesteSide(formValues));
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterUtenlandsopphold}
                cancelApplication={navigator.avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Engangsstønad"
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
