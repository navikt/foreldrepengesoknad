import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { Frilans, FrilansPanel } from '@navikt/fp-steg-frilans';
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

const FrilansSteg: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);

    const onSubmit = (values: Frilans) => {
        oppdaterFrilans(values);

        if (arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende) {
            return navigator.goToNextStep(SøknadRoutes.EGEN_NÆRING);
        }
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
            <FrilansPanel
                frilans={frilans}
                saveOnNext={onSubmit}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Svangerskapspenger"
            />
        </ContentWrapper>
    );
};

export default FrilansSteg;
