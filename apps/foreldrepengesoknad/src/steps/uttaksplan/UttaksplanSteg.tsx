import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions, useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useStepConfig } from 'appData/useStepConfig';
import { ReactNode, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getErSøkerFarEllerMedmor, getKjønnFromFnr, getNavnPåForeldre } from 'utils/personUtils';
import { utledRettighet } from 'utils/rettighetUtils';

import { Alert, BodyLong, Tabs } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { barnehagestartDato, getFamiliehendelsedato } from '@navikt/fp-utils';
import {
    FjernAltIUttaksplanModal,
    HvaErMulig,
    KvoteOppsummering,
    UforutsetteEndringer,
    UttaksplanDataProvider,
    UttaksplanKalender,
    UttaksplanListe,
    UttaksplanRedigeringProvider,
} from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanForm } from './UttaksplanForm';
import { useGjeldendeUttaksplan } from './hooks/useGjeldendeUttaksplan';

interface Props {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    foreldrepengerSaker?: FpSak_fpoversikt[];
}

export const UttaksplanSteg = ({ søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad, foreldrepengerSaker }: Props) => {
    const intl = useIntl();

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const eksisterendeSak = foreldrepengerSaker?.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);

    const [feilmelding, setFeilmelding] = useState<ReactNode | undefined>();

    const erEndringssøknad = !!valgtEksisterendeSaksnr;

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad, eksisterendeSak);

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const kvoteOppsummeringRef = useRef<HTMLDivElement>(null);
    const scrollToKvoteOppsummering = () => {
        if (kvoteOppsummeringRef.current) {
            // Håndter spesielt for å unngå at element en scroller til blir liggende under headeren
            const elementTop = kvoteOppsummeringRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementTop - 80,
                behavior: 'smooth',
            });
        }
    };

    const kontoerOptions = useStønadsKontoerOptions();
    const tilgjengeligeStønadskontoerQuery = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    });

    const annenPartVedtakOptionsWrapped = useAnnenPartVedtakOptions();
    const annenPartVedtakQuery = useQuery({
        ...annenPartVedtakOptionsWrapped,
    });

    const valgteStønadskontoer = tilgjengeligeStønadskontoerQuery.data;

    const {
        planFraEksisterendeSak,
        initiellPlan,
        gjeldendeUttaksplan,
        harMellomlagretPlan,
        erPeriodeneTilAnnenPartLåst,
        erPlanenEndret,
    } = useGjeldendeUttaksplan({
        valgteStønadskontoer,
        annenPartPerioder: annenPartVedtakQuery.data?.perioder,
        erSøkerFarEllerMedmor,
    });

    if (!valgteStønadskontoer || annenPartVedtakQuery.isLoading) {
        return null;
    }

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        søkerInfo.arbeidsforhold,
        søkersituasjon.situasjon === 'adopsjon',
        erSøkerFarEllerMedmor,
        getFamiliehendelsedato(barn),
    );

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig}>
                <Alert variant="info">
                    <BodyLong>
                        <FormattedMessage id="uttaksplan.AnnenPartPerioderInfomelding" />
                    </BodyLong>
                </Alert>
                <UttaksplanDataProvider
                    barn={barn}
                    foreldreInfo={{
                        søker: isFarEllerMedmor(søkersituasjon.rolle) ? 'FAR_MEDMOR' : 'MOR',
                        navnPåForeldre: getNavnPåForeldre(søkerInfo, annenForelder, erSøkerFarEllerMedmor, intl),
                        rettighetType: utledRettighet(erAleneOmOmsorg, erDeltUttak),
                        erMedmorDelAvSøknaden:
                            søkersituasjon.rolle === 'medmor' ||
                            (søkersituasjon.rolle === 'mor' && getKjønnFromFnr(annenForelder) === 'K'),
                        erIkkeSøkerSpesifisert: false,
                    }}
                    valgtStønadskonto={valgteStønadskontoer}
                    harAktivitetskravIPeriodeUtenUttak={false}
                    uttakPerioder={gjeldendeUttaksplan}
                    erPeriodeneTilAnnenPartLåst={erPeriodeneTilAnnenPartLåst}
                    aktiveArbeidsforhold={aktiveArbeidsforhold}
                    erEndringssøknad={erEndringssøknad}
                >
                    <HvaErMulig erFarOgFar={false} loggExpansionCardOpen={loggExpansionCardOpen} />

                    <UforutsetteEndringer erFarOgFar={false} loggExpansionCardOpen={loggExpansionCardOpen} />

                    <div ref={kvoteOppsummeringRef}>
                        <KvoteOppsummering erInnsyn={false} visStatusIkoner />
                    </div>

                    {feilmelding && <Alert variant="error">{feilmelding}</Alert>}

                    <UttaksplanRedigeringProvider
                        oppdaterUttaksplan={oppdaterUttaksplan}
                        harEndretPlan={erPlanenEndret}
                    >
                        <FjernAltIUttaksplanModal />

                        <Tabs
                            defaultValue="kalender"
                            onChange={(value) => {
                                loggUmamiEvent({
                                    origin: 'foreldrepengesoknad',
                                    eventName: 'tab klikk',
                                    eventData: {
                                        tittel: value,
                                    },
                                });
                            }}
                        >
                            <Tabs.List>
                                <Tabs.Tab
                                    value="kalender"
                                    label={<FormattedMessage id="UttaksplanSteg.kalender" />}
                                    icon={<CalendarIcon aria-hidden />}
                                />
                                <Tabs.Tab
                                    value="liste"
                                    label={<FormattedMessage id="UttaksplanSteg.liste" />}
                                    icon={<BulletListIcon aria-hidden />}
                                />
                            </Tabs.List>
                            <Tabs.Panel value="kalender" className="pt-5">
                                <UttaksplanKalender
                                    readOnly={false}
                                    barnehagestartdato={barnehagestartDato(barn)}
                                    scrollToKvoteOppsummering={scrollToKvoteOppsummering}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="liste" className="pt-5">
                                <UttaksplanListe isReadOnly={false} />
                            </Tabs.Panel>
                        </Tabs>
                    </UttaksplanRedigeringProvider>
                    <UttaksplanForm
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                        setFeilmelding={setFeilmelding}
                        scrollToKvoteOppsummering={scrollToKvoteOppsummering}
                        gjeldendeUttaksplan={gjeldendeUttaksplan}
                        initiellPlan={initiellPlan}
                        harMellomlagretPlan={harMellomlagretPlan}
                        eksisterendeSak={eksisterendeSak}
                        planFraEksisterendeSak={planFraEksisterendeSak}
                    />
                </UttaksplanDataProvider>
            </Step>
        </SkjemaRotLayout>
    );
};

const loggExpansionCardOpen = (tittel: string) => (open: boolean) => {
    if (open) {
        loggUmamiEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'accordion åpnet',
            eventData: { tittel },
        });
    }
};
