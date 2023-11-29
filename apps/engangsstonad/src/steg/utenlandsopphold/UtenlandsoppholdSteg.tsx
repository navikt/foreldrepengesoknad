import { FormattedMessage } from 'react-intl';
import { Utenlandsopphold } from '@navikt/fp-types';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { Heading } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';

import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateSaveFn, useEsStateData } from 'appData/EsDataContext';
import useStepConfig from 'appData/useStepConfig';

const utledNesteSide = (formValues: Utenlandsopphold): Path => {
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        return Path.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return formValues?.skalBoUtenforNorgeNeste12Mnd ? Path.SENERE_UTENLANDSOPPHOLD : Path.OPPSUMMERING;
};

type Props = {
    mellomlagreOgNaviger: () => void;
};

const UtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);

    const lagreUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD);
    const lagreTidligereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreSenereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: Utenlandsopphold) => {
        lagreUtenlandsopphold(formValues);

        if (!formValues.harBoddUtenforNorgeSiste12Mnd) {
            lagreTidligereUtenlandsopphold(undefined);
        }
        if (!formValues.skalBoUtenforNorgeNeste12Mnd) {
            lagreSenereUtenlandsopphold(undefined);
        }

        navigator.goToNextStep(utledNesteSide(formValues));
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={lagre}
                saveOnPrevious={lagreUtenlandsopphold}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Engangsstønad"
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
