import { useQuery } from '@tanstack/react-query';
import { useStønadsKontoerOptions, useUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useSamordneBarnMedAnnenPart } from 'appData/useSamordneBarnMedAnnenPart';
import { useStepConfig } from 'appData/useStepConfig';
import { useValgtSak } from 'appData/useValgtSak';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Navigate } from 'react-router';
import { kanGenerereUttaksplanForslag } from 'steps/uttaksplan/hooks/useUttaksplanForslag';
import { annenPartHarVedtak, getIsDeltUttak } from 'utils/annenForelderUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getNavnPåForeldre } from 'utils/personUtils';
import { getAntallUkerFellesperiode } from 'utils/stønadskvoterUtils';

import { VStack } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt, FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout, Spinner, Step } from '@navikt/fp-ui';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { FordelingForm } from './fordeling-form/FordelingForm';
import { FordelingOversikt } from './fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer, getSisteUttaksdagAnnenForelder } from './fordeling-oversikt/fordelingOversiktUtils';
import { MorsSisteDag } from './mors-siste-dag/MorsSisteDag';

type Props = {
    person: FpPersonopplysningerDto_fpoversikt;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const FordelingSteg = (props: Props) => {
    const { erNySøknadPåEksisterendeSak, isLoading } = useValgtSak();
    const samordnerBarn = useSamordneBarnMedAnnenPart(!erNySøknadPåEksisterendeSak && !isLoading);
    const stepConfig = useStepConfig({
        arbeidsforhold: props.arbeidsforhold,
        harRegistrertNæring: props.person.selvstendigNæring.length > 0,
    });
    if (isLoading || samordnerBarn) {
        return <Spinner />;
    }
    if (stepConfig.every((step) => step.id !== SøknadRoutes.FORDELING)) {
        return <Navigate to={SøknadRoutes.UTTAKSPLAN} replace />;
    }
    return <FordelingStegInnhold {...props} stepConfig={stepConfig} />;
};

const FordelingStegInnhold = ({
    person,
    arbeidsforhold,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    stepConfig,
}: Props & { stepConfig: ReturnType<typeof useStepConfig> }) => {
    const intl = useIntl();

    // Fordeling er steget rett før Uttaksplan i søknadsflyten (sjå ROUTES_ORDER), som gjer
    // det til det mest sannsynlege neste steget herfrå. Uttaksplansteget er lazy-lasta (sjå
    // ForeldrepengesøknadRoutes) fordi det trekker inn @navikt/fp-uttaksplan, den klart
    // største enkeltavhengigheten i søknaden. Ved å prefetche chunken her, mens brukaren
    // fyller ut fordelinga, rekk han/ho gjerne å bli lasta ned før brukaren faktisk navigerer
    // til Uttaksplan.
    useEffect(() => {
        void import('steps/uttaksplan/UttaksplanSteg');
    }, []);

    const harRegistrertNæring = person.selvstendigNæring.length > 0;
    const navigator = useFpNavigator({
        arbeidsforhold,
        harRegistrertNæring,
        mellomlagreOgNaviger: mellomlagreSøknadOgNaviger,
    });
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const deltUttak = getIsDeltUttak(annenForelder);

    const uttaksplanQuery = useQuery(useUttaksplanOptions());
    const eksisterendeVedtakAnnenPart = annenPartHarVedtak(uttaksplanQuery.data) ? uttaksplanQuery.data : undefined;
    const uttaksplanAnnenPart = useMemo(
        () =>
            eksisterendeVedtakAnnenPart?.perioder.flatMap(({ fom, tom, annenPart }) =>
                annenPart ? [{ fom, tom, annenPart }] : [],
            ),
        [eksisterendeVedtakAnnenPart],
    );

    const kontoerOptions = useStønadsKontoerOptions();
    const valgtStønadskvote = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    }).data;

    const minsterett = valgtStønadskvote?.minsteretter;

    const fordelingScenario = useMemo(
        () =>
            valgtStønadskvote && minsterett
                ? getFordelingFraKontoer(
                      valgtStønadskvote,
                      minsterett,
                      søkersituasjon,
                      barn,
                      { mor: navnMor, farMedmor: navnFarMedmor },
                      annenForelder,
                      intl,
                      uttaksplanAnnenPart,
                  )
                : [],
        [
            valgtStønadskvote,
            minsterett,
            søkersituasjon,
            barn,
            navnMor,
            navnFarMedmor,
            annenForelder,
            intl,
            uttaksplanAnnenPart,
        ],
    );
    if (!valgtStønadskvote || uttaksplanQuery.isLoading) {
        return <Spinner />;
    }

    const ukerMedFellesperiode = valgtStønadskvote ? getAntallUkerFellesperiode(valgtStønadskvote) : 0;
    const dagerMedFellesperiode = ukerMedFellesperiode * 5;
    const sisteDagAnnenForelder = getSisteUttaksdagAnnenForelder(erFarEllerMedmor, deltUttak, uttaksplanAnnenPart);
    // Startdatoen som blir spurt om her blir berre brukt til å generere eit forslag til
    // uttaksplan (useUttaksplanForslag). Om annen part allereie har perioder klarer ikkje den
    // hooken å lage noko forslag uansett kva startdato som blir valgt, så då spør me ikkje.
    const visOppstartsvalg = kanGenerereUttaksplanForslag(uttaksplanAnnenPart);

    const førsteDagEtterAnnenForelder = sisteDagAnnenForelder
        ? Uttaksdagen.neste(sisteDagAnnenForelder).getDato()
        : undefined;
    const visMorsSisteDag = erFarEllerMedmor && sisteDagAnnenForelder;

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig} onStepChange={navigator.goToStep}>
                <VStack gap="space-20">
                    <FordelingOversikt
                        kontoer={valgtStønadskvote}
                        navnFarMedmor={navnFarMedmor}
                        navnMor={navnMor}
                        deltUttak={deltUttak}
                        fordelingScenario={fordelingScenario}
                    />
                    {visMorsSisteDag && <MorsSisteDag morsSisteDag={sisteDagAnnenForelder} navnMor={navnMor} />}
                    <FordelingForm
                        erDeltUttak={deltUttak}
                        navnPåForeldre={navnPåForeldre}
                        dagerMedFellesperiode={dagerMedFellesperiode}
                        goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                        goToNextDefaultStep={navigator.goToNextStep}
                        onAvsluttOgSlett={avbrytSøknad}
                        onFortsettSenere={navigator.fortsettSøknadSenere}
                        førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
                        visOppstartsvalg={visOppstartsvalg}
                    />
                </VStack>
            </Step>
        </SkjemaRotLayout>
    );
};
