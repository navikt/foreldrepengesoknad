import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { ContentWrapper } from '@navikt/fp-ui';
import { UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';

import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useStepConfig from 'appData/useStepConfig';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const TidligereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const lagre = (formValues: UtenlandsoppholdTidligere) => {
        oppdaterTidligereUtenlandsopphold(formValues);
        return navigator.goToNextStep(
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
                saveOnPrevious={oppdaterTidligereUtenlandsopphold}
                onContinueLater={navigator.fortsettSøknadSenere}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default TidligereUtenlandsoppholdSteg;
