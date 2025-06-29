import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';

import { UtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { Arbeidsforhold, Utenlandsopphold } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

const getNextRouteForUtenlandsopphold = (values: Utenlandsopphold) => {
    if (values.harBoddUtenforNorgeSiste12Mnd) {
        return SøknadRoute.HAR_BODD_I_UTLANDET;
    } else if (values.skalBoUtenforNorgeNeste12Mnd) {
        return SøknadRoute.SKAL_BO_I_UTLANDET;
    }
    return SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT;
};

interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
}

export const UtenlandsoppholdSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);

    const oppdaterUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const onSubmit = (values: Utenlandsopphold) => {
        oppdaterUtenlandsopphold(values);

        if (!values.harBoddUtenforNorgeSiste12Mnd) {
            oppdaterTidligereUtenlandsopphold(undefined);
        }
        if (!values.skalBoUtenforNorgeNeste12Mnd) {
            oppdaterSenereUtenlandsopphold(undefined);
        }

        return navigator.goToStep(getNextRouteForUtenlandsopphold(values));
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={onSubmit}
                saveOnPrevious={saveOnPrevious}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Svangerskapspenger"
                onStepChange={navigator.goToStep}
            />
        </SkjemaRotLayout>
    );
};
