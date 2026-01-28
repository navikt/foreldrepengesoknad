import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions, useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getErSøkerFarEllerMedmor, getKjønnFromFnr, getNavnPåForeldre } from 'utils/personUtils';

import { Tabs } from '@navikt/ds-react';

import { isAnnenForelderOppgitt, isIkkeUtfyltTypeBarn } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { loggUmamiEvent } from '@navikt/fp-metrics';
import {
    Barn,
    PersonMedArbeidsforholdDto_fpoversikt,
    RettighetType_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-types';
import { SkjemaRotLayout, Step, StepButtons } from '@navikt/fp-ui';
import {
    FjernAltIUttaksplanModal,
    KvoteOppsummering,
    UttaksplanDataProvider,
    UttaksplanKalender,
    UttaksplanListe,
    UttaksplanRedigeringProvider,
} from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanForEksisterendeSak } from './hooks/useUttaksplanForEksisterendeSak';
import { useUttaksplanForslag } from './hooks/useUttaksplanForslag';

type Props = {
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const UttaksplanStegNy = ({ søkerInfo, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN_NY);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN_NY);

    const erEndringssøknad = !!valgtEksisterendeSaksnr;

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);

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

    const uttaksplanForEksisterendeSak = useUttaksplanForEksisterendeSak(annenPartVedtakQuery.data?.perioder);

    const valgteStønadskontoer = tilgjengeligeStønadskontoerQuery.data;

    const uttaksplanForslag = useUttaksplanForslag(valgteStønadskontoer);

    if (!valgteStønadskontoer || annenPartVedtakQuery.isPending) {
        return null;
    }

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig}>
                <UttaksplanDataProvider
                    barn={barn}
                    foreldreInfo={{
                        søker: isFarEllerMedmor(søkersituasjon.rolle) ? 'FAR_ELLER_MEDMOR' : 'MOR',
                        navnPåForeldre: getNavnPåForeldre(søkerInfo.person, annenForelder, erSøkerFarEllerMedmor, intl),
                        rettighetType: utledRettighet(erAleneOmOmsorg, erDeltUttak),
                        erMedmorDelAvSøknaden:
                            søkersituasjon.rolle === 'medmor' ||
                            (søkersituasjon.rolle === 'mor' && getKjønnFromFnr(annenForelder) === 'K'),
                        erIkkeSøkerSpesifisert: false,
                    }}
                    valgtStønadskonto={valgteStønadskontoer}
                    harAktivitetskravIPeriodeUtenUttak={false}
                    uttakPerioder={
                        uttaksplan ||
                        uttaksplanForEksisterendeSak ||
                        annenPartVedtakQuery.data?.perioder ||
                        uttaksplanForslag
                    }
                >
                    <div ref={kvoteOppsummeringRef}>
                        <KvoteOppsummering erInnsyn={false} visStatusIkoner />
                    </div>

                    <UttaksplanRedigeringProvider
                        oppdaterUttaksplan={oppdaterUttaksplan}
                        harEndretPlan={uttaksplan !== undefined}
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
                </UttaksplanDataProvider>
                <StepButtons
                    onFortsettSenere={navigator.fortsettSøknadSenere}
                    onAvsluttOgSlett={avbrytSøknad}
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                />
            </Step>
        </SkjemaRotLayout>
    );
};

const utledRettighet = (erAleneOmOmsorg: boolean, erDeltUttak: boolean): RettighetType_fpoversikt => {
    if (erAleneOmOmsorg) {
        return 'ALENEOMSORG';
    }
    if (erDeltUttak) {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
};

// TODO (TOR) Flytt denne til felleskode - er lik funksjon i planlegger
const barnehagestartDato = (barnet: Barn) => {
    if (isAdoptertBarn(barnet) || isIkkeUtfyltTypeBarn(barnet)) {
        return undefined;
    }

    const dato = isFødtBarn(barnet) ? barnet.fødselsdatoer[0]! : barnet.termindato;

    if (dayjs(dato).month() < 8) {
        const newLocal = dayjs(dato).month(7).add(1, 'year').endOf('month').format(ISO_DATE_FORMAT);
        return getUttaksdagTilOgMedDato(newLocal);
    }
    if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) {
        return getUttaksdagTilOgMedDato(dayjs(dato).add(1, 'year').endOf('month').format(ISO_DATE_FORMAT));
    }
    return getUttaksdagTilOgMedDato(
        dayjs(dato)
            .startOf('year')
            .add(2, 'year')
            .add(7, 'months')
            .endOf('week')
            .endOf('month')
            .format(ISO_DATE_FORMAT),
    );
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag.
 * Tar hensyn til stilling av klokken ved å gjøre om klokka til kl 12 før antall timer trekkes fra.
 * @param dato
 */
export const getUttaksdagTilOgMedDato = (dato: string): string => {
    const d = dayjs(dato).toDate();
    const newDate = dato ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).subtract(24, 'hours').format(ISO_DATE_FORMAT);
        case 7:
            return dayjs.utc(newDate).subtract(48, 'hours').format(ISO_DATE_FORMAT);
        default:
            return dato;
    }
};

const getUkedag = (dato: string): number => {
    return dayjs(dato).isoWeekday();
};
