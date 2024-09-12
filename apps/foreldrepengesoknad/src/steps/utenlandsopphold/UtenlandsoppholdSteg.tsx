import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import useFpNavigator from 'appData/useFpNavigator';
import useStepConfig from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { UtenlandsoppholdPanel } from '@navikt/fp-steg-utenlandsopphold';
import { Arbeidsforhold, Utenlandsopphold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';

const utledNesteSide = (values: Utenlandsopphold) => {
    if (values.harBoddUtenforNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    } else if (values.skalBoUtenforNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.ARBEID_OG_INNTEKT;
};

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const UtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    arbeidsforhold,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

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

        return navigator.goToNextStep(utledNesteSide(values));
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Foreldrepenger"
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
