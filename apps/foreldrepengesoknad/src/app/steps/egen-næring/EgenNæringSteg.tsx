import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { EgenNæring, EgenNæringPanel } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

const EgenNæringSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);

    const onSubmit = (values: EgenNæring) => {
        oppdaterEgenNæring(values);

        if (arbeidsforholdOgInntekt.harHattAndreInntektskilder) {
            return navigator.goToNextStep(SøknadRoutes.ANDRE_INNTEKTER);
        }

        return navigator.goToNextDefaultStep();
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <EgenNæringPanel
                egenNæring={egenNæring}
                saveOnNext={onSubmit}
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

export default EgenNæringSteg;
