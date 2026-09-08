import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';

import { SenereUtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { EksternArbeidsforholdDto_fpoversikt, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    harRegistrertNæring: boolean;
};

export const SenereUtenlandsoppholdSteg = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
    harRegistrertNæring,
}: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold, harRegistrertNæring);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold, harRegistrertNæring);

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const save = (values: UtenlandsoppholdPeriode[]) => {
        oppdaterSenereUtenlandsopphold(values);
        return navigator.goToNextDefaultStep();
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                saveOnNext={save}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
            />
        </SkjemaRotLayout>
    );
};
