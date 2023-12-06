import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { ContentWrapper } from '@navikt/fp-ui';
import { UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';

import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import useStepConfig from 'appData/useStepConfig';

const TidligereUtenlandsoppholdSteg: React.FunctionComponent = () => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator();

    const utenlandsopphold = notEmpty(useEsStateData(EsDataType.UTENLANDSOPPHOLD));
    const tidligereUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreTidligereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const lagre = (formValues: UtenlandsoppholdTidligere) => {
        lagreTidligereUtenlandsopphold(formValues);
        navigator.goToNextStep(
            utenlandsopphold.skalBoUtenforNorgeNeste12Mnd ? Path.SENERE_UTENLANDSOPPHOLD : Path.OPPSUMMERING,
        );
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <TidligereUtenlandsoppholdPanel
                tidligereUtenlandsopphold={tidligereUtenlandsopphold}
                saveOnNext={lagre}
                saveOnPrevious={lagreTidligereUtenlandsopphold}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default TidligereUtenlandsoppholdSteg;
