import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { ISOStringToDate, getAktiveArbeidsforhold, isFarEllerMedmor } from '@navikt/fp-common';
import {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektPanel,
    isArbeidsforholdOgInntektFp,
} from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { Arbeidsforhold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
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

const ArbeidsforholdOgInntektSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);

    const oppdaterArbeidsforholdOgInntekt = useContextSaveData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterAndreInntektskilder = useContextSaveData(ContextDataType.ANDRE_INNTEKTSKILDER);

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        erAdopsjon,
        isFarEllerMedmor(søkersituasjon.rolle),
        ISOStringToDate(getFamiliehendelsedato(barn)),
    );

    const onSubmit = (values: ArbeidsforholdOgInntekt) => {
        if (!isArbeidsforholdOgInntektFp(values)) {
            throw Error('values er på feil format');
        }

        oppdaterArbeidsforholdOgInntekt(values);

        if (values.harHattAndreInntektskilder === false) {
            oppdaterAndreInntektskilder(undefined);
        }
        if (values.harJobbetSomFrilans === false) {
            oppdaterFrilans(undefined);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende === false) {
            oppdaterEgenNæring(undefined);
        }

        if (values.harJobbetSomFrilans) {
            return navigator.goToNextStep(SøknadRoutes.FRILANS);
        }
        if (values.harJobbetSomSelvstendigNæringsdrivende) {
            return navigator.goToNextStep(SøknadRoutes.EGEN_NÆRING);
        }
        if (values.harHattAndreInntektskilder) {
            return navigator.goToNextStep(SøknadRoutes.ANDRE_INNTEKTER);
        }

        const harDokumentasjonssteg = stepConfig.some((s) => s.id === SøknadRoutes.DOKUMENTASJON);
        return navigator.goToNextStep(harDokumentasjonssteg ? SøknadRoutes.DOKUMENTASJON : SøknadRoutes.OPPSUMMERING);
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <ArbeidsforholdOgInntektPanel
                aktiveArbeidsforhold={aktiveArbeidsforhold}
                arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                saveOnNext={onSubmit}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                stønadstype="Foreldrepenger"
            />
        </ContentWrapper>
    );
};

export default ArbeidsforholdOgInntektSteg;
