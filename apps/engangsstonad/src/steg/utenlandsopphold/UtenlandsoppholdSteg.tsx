import { ContextDataMap, ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { UtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { Utenlandsopphold } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

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

        // Send dei nullstilte periodene med som ferske data, elles ser lagAppStegliste
        // framleis dei gamle periodene i context og navigerer til eit steg brukaren
        // nettopp har svart nei på.
        const ferskeData: Partial<ContextDataMap> = { [ContextDataType.UTENLANDSOPPHOLD]: formValues };

        if (!formValues.harBoddUtenforNorgeSiste12Mnd) {
            oppdaterTidligereUtenlandsopphold(undefined);
            ferskeData[ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE] = undefined;
        }
        if (!formValues.skalBoUtenforNorgeNeste12Mnd) {
            oppdaterSenereUtenlandsopphold(undefined);
            ferskeData[ContextDataType.UTENLANDSOPPHOLD_SENERE] = undefined;
        }

        return navigator.goToNextDefaultStep(ferskeData);
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="Søknad.Pageheading" />}>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterUtenlandsopphold}
                onAvsluttOgSlett={navigator.avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onStepChange={navigator.goToStep}
                stepConfig={stepConfig}
                stønadstype="Engangsstønad"
            />
        </SkjemaRotLayout>
    );
};
