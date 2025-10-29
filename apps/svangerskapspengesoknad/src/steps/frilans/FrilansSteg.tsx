import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getRuteVelgArbeidEllerSkjema } from 'utils/tilretteleggingUtils';

import { FrilansPanel } from '@navikt/fp-steg-frilans';
import { EksternArbeidsforholdDto_fpoversikt, Frilans } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const FrilansSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);

    const onSubmit = (values: Frilans) => {
        oppdaterFrilans(values);

        const route = arbeidsforholdOgInntekt.harHattArbeidIUtlandet ? SøknadRoute.ARBEID_I_UTLANDET : undefined;
        const nextRoute = arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende ? SøknadRoute.NÆRING : route;

        return navigator.goToStep(
            nextRoute ?? getRuteVelgArbeidEllerSkjema(barnet.termindato, arbeidsforhold, arbeidsforholdOgInntekt),
        );
    };

    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <FrilansPanel
                frilans={frilans}
                saveOnNext={onSubmit}
                saveOnPrevious={saveOnPrevious}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
            />
        </SkjemaRotLayout>
    );
};
