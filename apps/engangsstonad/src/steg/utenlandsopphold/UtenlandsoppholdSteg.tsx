import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { UtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { Utenlandsopphold } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

const utledNesteSide = (formValues: Utenlandsopphold): Path => {
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        return Path.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return formValues?.skalBoUtenforNorgeNeste12Mnd ? Path.SENERE_UTENLANDSOPPHOLD : Path.OPPSUMMERING;
};

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

export const UtenlandsoppholdSteg = ({ mellomlagreOgNaviger }: Props) => {
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
        <SkjemaRotLayout pageTitle={<FormattedMessage id="Søknad.Pageheading" />}>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterUtenlandsopphold}
                cancelApplication={navigator.avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onStepChange={navigator.goToNextStep}
                stepConfig={stepConfig}
                stønadstype="Engangsstønad"
            />
        </SkjemaRotLayout>
    );
};
