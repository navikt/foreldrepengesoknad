import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { UtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { EksternArbeidsforholdDto_fpoversikt, Utenlandsopphold } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

const utledNesteSide = (values: Utenlandsopphold) => {
    if (values.harBoddUtenforNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    if (values.skalBoUtenforNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.ARBEID_OG_INNTEKT;
};

type Props = {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    harRegistrertNæring: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const UtenlandsoppholdSteg = ({
    arbeidsforhold,
    harRegistrertNæring,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}: Props) => {
    const stepConfig = useStepConfig({ arbeidsforhold, harRegistrertNæring });
    const navigator = useFpNavigator({
        arbeidsforhold,
        harRegistrertNæring,
        mellomlagreOgNaviger: mellomlagreSøknadOgNaviger,
    });

    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const save = (values: Utenlandsopphold) => {
        oppdaterUtenlandsopphold(values);

        if (!values.harBoddUtenforNorgeSiste12Mnd) {
            oppdaterTidligereUtenlandsopphold(undefined);
        }
        if (!values.skalBoUtenforNorgeNeste12Mnd) {
            oppdaterSenereUtenlandsopphold(undefined);
        }

        return navigator.goToStep(utledNesteSide(values));
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={save}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
                stønadstype="Foreldrepenger"
            />
        </SkjemaRotLayout>
    );
};
