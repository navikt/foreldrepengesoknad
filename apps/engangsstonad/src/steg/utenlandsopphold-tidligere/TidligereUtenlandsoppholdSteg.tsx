import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

export const TidligereUtenlandsoppholdSteg = ({ mellomlagreOgNaviger }: Props) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const lagre = (formValues: UtenlandsoppholdPeriode[]) => {
        oppdaterTidligereUtenlandsopphold(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="Søknad.Pageheading" />}>
            <TidligereUtenlandsoppholdPanel
                tidligereUtenlandsopphold={tidligereUtenlandsopphold ?? []}
                saveOnNext={lagre}
                saveOnPrevious={oppdaterTidligereUtenlandsopphold}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                onStepChange={navigator.goToStep}
                onAvsluttOgSlett={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </SkjemaRotLayout>
    );
};
