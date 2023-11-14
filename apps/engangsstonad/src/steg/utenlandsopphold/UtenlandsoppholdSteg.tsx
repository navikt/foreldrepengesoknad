import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Utenlandsopphold } from '@navikt/fp-types';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { Heading } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

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

const UtenlandsoppholdSteg: React.FunctionComponent = () => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator();

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const søkersituasjon = notEmpty(useEsStateData(EsDataType.SØKERSITUASJON));

    const lagreUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD);
    const lagreTidligereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreSenereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = useCallback(
        (formValues: Utenlandsopphold) => {
            lagreUtenlandsopphold(formValues);

            if (!formValues.harBoddUtenforNorgeSiste12Mnd) {
                lagreTidligereUtenlandsopphold(undefined);
            }
            if (!formValues.skalBoUtenforNorgeNeste12Mnd) {
                lagreSenereUtenlandsopphold(undefined);
            }

            navigator.goToNextStep(utledNesteSide(formValues));
        },
        [lagreSenereUtenlandsopphold, lagreTidligereUtenlandsopphold, lagreUtenlandsopphold, navigator],
    );

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
                søkersituasjon={søkersituasjon?.situasjon}
                stønadstype="Engangsstønad"
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
