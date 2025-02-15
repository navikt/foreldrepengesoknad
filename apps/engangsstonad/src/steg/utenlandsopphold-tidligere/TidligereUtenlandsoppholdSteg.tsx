import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

export const TidligereUtenlandsoppholdSteg = ({ mellomlagreOgNaviger }: Props) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const lagre = (formValues: UtenlandsoppholdPeriode[]) => {
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
                tidligereUtenlandsopphold={tidligereUtenlandsopphold ?? []}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterTidligereUtenlandsopphold}
                onContinueLater={navigator.fortsettSøknadSenere}
                onStepChange={navigator.goToNextStep}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};
