import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { Arbeidsforhold, UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

const TidligereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const save = (values: UtenlandsoppholdTidligere) => {
        oppdaterTidligereUtenlandsopphold(values);

        const nesteSide = utenlandsopphold.skalBoUtenforNorgeNeste12Mnd
            ? SøknadRoutes.SKAL_BO_I_UTLANDET
            : SøknadRoutes.INNTEKTSINFORMASJON;
        return navigator.goToNextStep(nesteSide);
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <TidligereUtenlandsoppholdPanel
                tidligereUtenlandsopphold={tidligereUtenlandsopphold}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default TidligereUtenlandsoppholdSteg;
