import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { SenereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { Arbeidsforhold, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const SenereUtenlandsoppholdSteg = ({ arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const save = (values: UtenlandsoppholdPeriode[]) => {
        oppdaterSenereUtenlandsopphold(values);

        return navigator.goToNextDefaultStep();
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </SkjemaRotLayout>
    );
};
