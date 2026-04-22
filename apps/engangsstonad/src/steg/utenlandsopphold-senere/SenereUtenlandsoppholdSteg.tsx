import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useIntl } from 'react-intl';

import { SenereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

export const SenereUtenlandsoppholdSteg = ({ mellomlagreOgNaviger }: Props) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);
    const intl = useIntl();

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const lagre = (formValues: UtenlandsoppholdPeriode[]) => {
        oppdaterSenereUtenlandsopphold(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterSenereUtenlandsopphold}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                onStepChange={navigator.goToNextStep}
                onAvsluttOgSlett={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </SkjemaRotLayout>
    );
};
