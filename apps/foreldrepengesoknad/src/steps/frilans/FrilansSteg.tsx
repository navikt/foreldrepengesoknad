import { useQuery } from '@tanstack/react-query';
import { mineFrilansoppdragOptions, selvstendigNæringOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { skalViseEgenNæringSteg } from '@navikt/fp-steg-egen-naering';
import { FrilansPanel, getForhåndsutfyltOppstart } from '@navikt/fp-steg-frilans';
import { EksternArbeidsforholdDto_fpoversikt, Frilans } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const FrilansSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const frilansoppdragQuery = useQuery(mineFrilansoppdragOptions());
    const selvstendigNæringQuery = useQuery(selvstendigNæringOptions());

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);

    const onSubmit = (values: Frilans) => {
        oppdaterFrilans(values);

        if (
            skalViseEgenNæringSteg({
                harJobbetSomSelvstendigNæringsdrivende: arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende,
                harRegistrertNæring: (selvstendigNæringQuery.data?.length ?? 0) > 0,
                egenNæring,
            })
        ) {
            return navigator.goToStep(SøknadRoutes.EGEN_NÆRING);
        }
        return navigator.goToNextStep();
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <FrilansPanel
                frilans={frilans}
                forhåndsutfyltOppstart={getForhåndsutfyltOppstart(frilansoppdragQuery.data ?? [])}
                saveOnNext={onSubmit}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
            />
        </SkjemaRotLayout>
    );
};
