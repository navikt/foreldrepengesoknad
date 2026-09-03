import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { mineFrilansoppdragOptions, selvstendigNæringOptions } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getRuteVelgArbeidEllerSkjema } from 'utils/tilretteleggingUtils';

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
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const frilansoppdragQuery = useQuery(mineFrilansoppdragOptions());
    const selvstendigNæringQuery = useQuery(selvstendigNæringOptions());

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);

    const onSubmit = (values: Frilans) => {
        oppdaterFrilans(values);

        const nextRoute = skalViseEgenNæringSteg({
            harJobbetSomSelvstendigNæringsdrivende: arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende,
            harRegistrertNæring: (selvstendigNæringQuery.data?.length ?? 0) > 0,
            egenNæring,
        })
            ? SøknadRoute.NÆRING
            : undefined;

        return navigator.goToStep(
            nextRoute ?? getRuteVelgArbeidEllerSkjema(barnet.termindato, arbeidsforhold, arbeidsforholdOgInntekt),
        );
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
