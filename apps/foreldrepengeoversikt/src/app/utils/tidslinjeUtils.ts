import { formatDate, intlUtils } from '@navikt/fp-common';
import { AktørType } from 'app/types/AktørType';
import { ÅpenBehandling } from 'app/types/ÅpenBehandling';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import OversiktRoutes, { NavRoutes } from 'app/routes/routes';
import { Uttaksdagen, UTTAKSDAGER_PER_UKE } from 'app/utils/Uttaksdagen';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Ytelse } from 'app/types/Ytelse';
import { formaterDato } from './dateUtils';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { getFamiliehendelseDato, getNavnPåBarna } from './sakerUtils';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { Sak } from 'app/types/Sak';

export const VENTEÅRSAKER = [
    BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING,
    BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON,
    BehandlingTilstand.TIDLIG_SØKNAD,
    BehandlingTilstand.VENTER_PÅ_MELDEKORT,
];

export const TIDSLINJEHENDELSER_PÅ_VENT = [
    TidslinjehendelseType.VENTER_INNTEKTSMELDING,
    TidslinjehendelseType.VENTER_MELDEKORT,
    TidslinjehendelseType.VENTER_PGA_TIDLIG_SØKNAD,
    TidslinjehendelseType.VENT_DOKUMENTASJON,
];

export const getTidligstDatoForInntektsmelding = (førsteUttaksdagISaken: Date | undefined): Date | undefined => {
    return førsteUttaksdagISaken
        ? dayjs(førsteUttaksdagISaken)
              .subtract(4 * 7, 'day')
              .toDate()
        : undefined;
};

export const getTidslinjetekstForAntallBarn = (
    antallBarn: number,
    intl: IntlShape,
    gjelderAdopsjon: boolean | undefined
): string => {
    if (antallBarn === 1 || antallBarn === 0) {
        return intlUtils(intl, 'barnet');
    } else if (antallBarn > 1 && gjelderAdopsjon) {
        return intlUtils(intl, 'barna');
    } else if (antallBarn === 2) {
        return intlUtils(intl, 'tvillingene');
    } else if (antallBarn === 3) {
        return intlUtils(intl, 'trillingene');
    }
    return intlUtils(intl, 'flerlingene');
};

const getTidslinjeTittelForBarnTreÅr = (
    barnFraSak: BarnGruppering,
    antallBarn: number,
    omsorgsovertakelse: string | undefined,
    intl: IntlShape
) => {
    let barnNavnTekst = '';
    if (omsorgsovertakelse) {
        return intlUtils(intl, 'tidslinje.tittel.BARNET_TRE_ÅR.adopsjon', {
            navn: barnNavnTekst,
        });
    }
    if (barnFraSak.fornavn === undefined || barnFraSak.fornavn.length === 0 || !barnFraSak.alleBarnaLever) {
        barnNavnTekst = getTidslinjetekstForAntallBarn(antallBarn, intl, false);
    } else {
        barnNavnTekst = getNavnPåBarna(barnFraSak.fornavn);
    }
    return intlUtils(intl, 'tidslinje.tittel.BARNET_TRE_ÅR.fødsel', {
        navn: barnNavnTekst,
    });
};

const getTidslinjeTittelForAdopsjon = (navn: string, omsorgsovertakelse: string, intl: IntlShape) => {
    if (dayjs(omsorgsovertakelse).isSameOrBefore(dayjs(), 'd')) {
        return intlUtils(intl, 'tidslinje.tittel.FAMILIEHENDELSE.omsorgsovertakelse.tilbakeITid', {
            navn,
        });
    } else {
        return intlUtils(intl, 'tidslinje.tittel.FAMILIEHENDELSE.omsorgsovertakelse.fremITid', {
            navn,
        });
    }
};

const getTidslinjeTittelForFamiliehendelseForeldrepenger = (
    barnFraSak: BarnGruppering,
    antallBarn: number,
    gjelderAdopsjon: boolean | undefined,
    familiehendelse: Familiehendelse,
    intl: IntlShape
) => {
    let barnNavnTekst = '';
    if (barnFraSak.fornavn === undefined || barnFraSak.fornavn.length === 0 || !barnFraSak.alleBarnaLever) {
        barnNavnTekst = getTidslinjetekstForAntallBarn(antallBarn, intl, gjelderAdopsjon);
    } else {
        barnNavnTekst = getNavnPåBarna(barnFraSak.fornavn);
    }
    if (gjelderAdopsjon && familiehendelse.omsorgsovertakelse) {
        return getTidslinjeTittelForAdopsjon(barnNavnTekst, familiehendelse.omsorgsovertakelse, intl);
    } else if (familiehendelse.fødselsdato) {
        return intlUtils(intl, 'tidslinje.tittel.FAMILIEHENDELSE.fødsel', { navn: barnNavnTekst });
    } else {
        return intlUtils(intl, 'tidslinje.tittel.FAMILIEHENDELSE.termindato');
    }
};

const getTidslinjeTittelForFamiliehendelse = (
    familiehendelse: Familiehendelse,
    gjelderAdopsjon: boolean | undefined,
    barnFraSak: BarnGruppering,
    antallBarn: number,
    ytelse: Ytelse,
    intl: IntlShape
): string => {
    if (ytelse === Ytelse.FORELDREPENGER) {
        return getTidslinjeTittelForFamiliehendelseForeldrepenger(
            barnFraSak,
            antallBarn,
            gjelderAdopsjon,
            familiehendelse,
            intl
        );
    } else {
        if (familiehendelse.omsorgsovertakelse) {
            return 'Adopsjonsdato';
        } else if (familiehendelse.fødselsdato) {
            return 'Barnet ble født';
        } else {
            return intlUtils(intl, 'tidslinje.tittel.FAMILIEHENDELSE.termindato');
        }
    }
};

export const getTidslinjehendelseTittel = (
    hendelsetype: TidslinjehendelseType,
    intl: IntlShape,
    tidlistBehandlingsdato: Date | undefined,
    manglendeVedleggData: Skjemanummer[] | undefined,
    barnFraSak: BarnGruppering,
    sak: Sak
): string => {
    const { familiehendelse, ytelse, gjelderAdopsjon } = sak;
    const antallBarn = familiehendelse?.antallBarn;
    if (hendelsetype === TidslinjehendelseType.VENTER_PGA_TIDLIG_SØKNAD && tidlistBehandlingsdato !== undefined) {
        return intlUtils(intl, 'tidslinje.tittel.VENTER_PGA_TIDLIG_SØKNAD', {
            tidlistBehandlingsdato: formatDate(tidlistBehandlingsdato),
        });
    }
    if (
        hendelsetype === TidslinjehendelseType.VENT_DOKUMENTASJON &&
        manglendeVedleggData &&
        manglendeVedleggData.length === 1
    ) {
        const navnPåDokumentasjon = intlUtils(intl, `ettersendelse.${manglendeVedleggData[0]}`);
        const dokumentasjonLowerCase = navnPåDokumentasjon.charAt(0).toLowerCase() + navnPåDokumentasjon.slice(1);
        return intlUtils(intl, 'tidslinje.navVenterPå', { dokumentasjon: dokumentasjonLowerCase });
    }
    if (hendelsetype === TidslinjehendelseType.FØRSTEGANGSSØKNAD) {
        return intlUtils(intl, 'tidslinje.tittel.FØRSTEGANGSSØKNAD', { ytelse });
    }
    if (hendelsetype === TidslinjehendelseType.FAMILIEHENDELSE && familiehendelse && antallBarn !== undefined) {
        return getTidslinjeTittelForFamiliehendelse(
            familiehendelse,
            gjelderAdopsjon,
            barnFraSak,
            antallBarn,
            ytelse,
            intl
        );
    }
    if (
        ytelse === Ytelse.FORELDREPENGER &&
        (familiehendelse?.fødselsdato || familiehendelse?.omsorgsovertakelse) &&
        antallBarn &&
        hendelsetype === TidslinjehendelseType.BARNET_TRE_ÅR
    ) {
        return getTidslinjeTittelForBarnTreÅr(barnFraSak, antallBarn, familiehendelse?.omsorgsovertakelse, intl);
    }
    return intlUtils(intl, `tidslinje.tittel.${hendelsetype}`);
};

export const getTidslinjeHendelstypeAvVenteårsak = (venteårsak: BehandlingTilstand) => {
    if (venteårsak === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING) {
        return TidslinjehendelseType.VENTER_INNTEKTSMELDING;
    }
    if (venteårsak === BehandlingTilstand.TIDLIG_SØKNAD) {
        return TidslinjehendelseType.VENTER_PGA_TIDLIG_SØKNAD;
    }
    if (venteårsak === BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON) {
        return TidslinjehendelseType.VENT_DOKUMENTASJON;
    }
    if (venteårsak === BehandlingTilstand.VENTER_PÅ_MELDEKORT) {
        return TidslinjehendelseType.VENTER_MELDEKORT;
    } else {
        throw new Error('Ukjent venteårsak');
    }
};

export const getAktørtypeAvVenteårsak = (venteårsak: BehandlingTilstand): AktørType => {
    if (venteårsak === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING) {
        return AktørType.ARBEIDSGIVER;
    }
    if (venteårsak === BehandlingTilstand.TIDLIG_SØKNAD) {
        return AktørType.NAV;
    }
    return AktørType.BRUKER;
};

export const getTidlinjeHendelseEksternUrl = (venteårsak: BehandlingTilstand): NavRoutes | undefined => {
    if (venteårsak === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING) {
        return NavRoutes.VENT_INNTEKTSMELDING;
    }
    if (venteårsak === BehandlingTilstand.TIDLIG_SØKNAD) {
        return NavRoutes.SØKNADSFRISTER;
    }

    if (venteårsak === BehandlingTilstand.VENTER_PÅ_MELDEKORT) {
        return NavRoutes.VENT_MELDEKORT;
    }
    return undefined;
};

export const getTidligstBehandlingsDatoForTidligSøknad = (åpenBehandling: ÅpenBehandling): Date => {
    const søknadsperioder = åpenBehandling.søknadsperioder;
    const førsteUttaksdagISaken = dayjs(søknadsperioder![0].fom).toDate();
    return Uttaksdagen(førsteUttaksdagISaken).trekkFra(4 * UTTAKSDAGER_PER_UKE);
};

const getDatoForInnsendingAvFørsteSøknad = (tidslinjeHendelser: Tidslinjehendelse[]): Date | undefined => {
    const hendelseFørsteSøknad = tidslinjeHendelser.find(
        (hendelse) => hendelse.tidslinjeHendelseType === TidslinjehendelseType.FØRSTEGANGSSØKNAD
    );
    return hendelseFørsteSøknad ? hendelseFørsteSøknad.opprettet : undefined;
};

export const getTidslinjehendelserDetaljer = (
    tidslinjeHendelserData: Tidslinjehendelse[],
    intl: IntlShape
): Tidslinjehendelse[] => {
    return tidslinjeHendelserData.map((hendelse) => {
        switch (hendelse.tidslinjeHendelseType) {
            case TidslinjehendelseType.UTGÅENDE_INNHENT_OPPLYSNINGER:
                return {
                    ...hendelse,
                    internalUrl: OversiktRoutes.ETTERSEND,
                    linkTittel: intlUtils(intl, 'tidslinje.VENT_DOKUMENTASJON.linkTittel'),
                };
            case TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY: {
                const datoFørsteSøknad = getDatoForInnsendingAvFørsteSøknad(tidslinjeHendelserData);
                return {
                    ...hendelse,
                    merInformasjon: datoFørsteSøknad
                        ? intlUtils(intl, 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY', {
                              datoFørsteSøknad: formaterDato(datoFørsteSøknad, 'DD. MMM YYYY'),
                          })
                        : intlUtils(intl, 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY.ukjentDatoFørstSøknad'),
                };
            }
            default:
                return hendelse;
        }
    });
};

export const getTidslinjeFamiliehendelse = (familiehendelse: Familiehendelse): Tidslinjehendelse => {
    const familiehendelsedato = getFamiliehendelseDato(familiehendelse);
    return {
        type: 'søknad',
        opprettet: new Date(familiehendelsedato),
        tidslinjeHendelseType: TidslinjehendelseType.FAMILIEHENDELSE,
        aktørType: AktørType.BRUKER,
        dokumenter: [],
        manglendeVedlegg: [],
    };
};

export const getTidslinjeBarnTreÅrHendelse = (
    fødselsdato: string | undefined,
    omsorgsovertakelse: string | undefined,
    antallBarn: number,
    gjelderAdopsjon: boolean,
    intl: IntlShape
): Tidslinjehendelse => {
    let dato;
    let merInformasjon = '';
    if (gjelderAdopsjon) {
        dato = dayjs(omsorgsovertakelse).add(3, 'y').toDate();
        merInformasjon = intlUtils(intl, 'tidslinje.BARN_TRE_ÅR.adopsjon.informasjon', { antallBarn });
    } else {
        dato = dayjs(fødselsdato).add(3, 'y').toDate();
        merInformasjon = intlUtils(intl, 'tidslinje.BARN_TRE_ÅR.fødsel.informasjon', { antallBarn });
    }
    return {
        type: 'søknad',
        opprettet: dato,
        tidslinjeHendelseType: TidslinjehendelseType.BARNET_TRE_ÅR,
        aktørType: AktørType.BRUKER,
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon,
        linkTittel: intlUtils(intl, 'tidslinje.BARN_TRE_ÅR.linkTittel'),
        eksternalUrl: NavRoutes.HVOR_LENGE,
    };
};

export const getTidslinjeVedtakHendelse = (intl: IntlShape, ytelse: Ytelse): Tidslinjehendelse => {
    let url = NavRoutes.SAKSBEHANDLINGSTIDER_FP;
    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        url = NavRoutes.SAKSBEHANDLINGSTIDER_SVP;
    }
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        url = NavRoutes.SAKSBEHANDLINGSTIDER_ES;
    }
    return {
        type: 'søknad',
        opprettet: dayjs(new Date()).add(1, 'd').toDate(),
        tidslinjeHendelseType: TidslinjehendelseType.FREMTIDIG_VEDTAK,
        aktørType: AktørType.NAV,
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon: intlUtils(intl, 'tidslinje.FREMTIDIG_VEDTAK.informasjon'),
        linkTittel: intlUtils(intl, 'tidslinje.FREMTIDIG_VEDTAK.linkTittel'),
        eksternalUrl: url,
    };
};

export const getTidslinjehendelserFraBehandlingPåVent = (
    åpenBehandling: ÅpenBehandling,
    manglendeVedleggData: Skjemanummer[],
    intl: IntlShape
): Tidslinjehendelse[] => {
    let hendelseVenterPåDokumentasjon = undefined;
    if (
        åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING &&
        manglendeVedleggData &&
        manglendeVedleggData.length > 0
    ) {
        const behandlingTilstand = BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON;
        hendelseVenterPåDokumentasjon = {
            type: 'søknad',
            opprettet: dayjs(new Date()).add(1, 'd').toDate(),
            aktørType: getAktørtypeAvVenteårsak(behandlingTilstand),
            tidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak(behandlingTilstand),
            dokumenter: [],
            manglendeVedlegg: [],
            merInformasjon: intlUtils(intl, `tidslinje.${behandlingTilstand}.informasjon`),
            linkTittel: intlUtils(intl, `tidslinje.${behandlingTilstand}.linkTittel`),
            eksternalUrl: getTidlinjeHendelseEksternUrl(behandlingTilstand),
            internalUrl: OversiktRoutes.ETTERSEND,
            tidligstBehandlingsDato: undefined,
        };
    }
    const tidslinjeHendelse = {
        type: 'søknad',
        opprettet: dayjs(new Date()).add(1, 'd').toDate(),
        aktørType: getAktørtypeAvVenteårsak(åpenBehandling.tilstand),
        tidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak(åpenBehandling.tilstand),
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon: intlUtils(intl, `tidslinje.${åpenBehandling.tilstand}.informasjon`),
        linkTittel: intlUtils(intl, `tidslinje.${åpenBehandling.tilstand}.linkTittel`),
        eksternalUrl: getTidlinjeHendelseEksternUrl(åpenBehandling.tilstand),
        internalUrl:
            åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON
                ? OversiktRoutes.ETTERSEND
                : undefined,
        tidligstBehandlingsDato:
            åpenBehandling.tilstand === BehandlingTilstand.TIDLIG_SØKNAD
                ? getTidligstBehandlingsDatoForTidligSøknad(åpenBehandling)
                : undefined,
    };

    if (hendelseVenterPåDokumentasjon) {
        return [hendelseVenterPåDokumentasjon, tidslinjeHendelse];
    }

    return [tidslinjeHendelse];
};

export const sorterTidslinjehendelser = (h1: Tidslinjehendelse, h2: Tidslinjehendelse) => {
    if (dayjs(h1.opprettet).isBefore(h2.opprettet)) {
        return -1;
    } else if (dayjs(h1.opprettet).isAfter(h2.opprettet)) {
        return 1;
    } else {
        return 0;
    }
};

const getNesteHendelser = (sorterteHendelser: Tidslinjehendelse[]) => {
    return sorterteHendelser.filter((hendelse) => dayjs(hendelse.opprettet).isAfter(dayjs(), 'd'));
};

const getSisteHendelser = (sorterteHendelser: Tidslinjehendelse[]) => {
    const dateNow = new Date();
    const sisteHendelser = sorterteHendelser.filter((hendelse) =>
        dayjs(hendelse.opprettet).isSameOrBefore(dateNow, 'd')
    );
    if (sisteHendelser.length <= 3) {
        return sisteHendelser;
    } else {
        const sisteTreHendelser = sisteHendelser.slice(Math.max(sisteHendelser.length - 3));
        return sisteTreHendelser;
    }
};

export const getHendelserForVisning = (
    visHeleTidslinjen: boolean,
    sorterteHendelser: Tidslinjehendelse[],
    erAvslåttForeldrepengesøknad: boolean
): Tidslinjehendelse[] => {
    const hendelserForVisning = [] as Tidslinjehendelse[];
    if (visHeleTidslinjen) {
        hendelserForVisning.push(...sorterteHendelser);
    } else if (erAvslåttForeldrepengesøknad) {
        const sisteHendelser = getSisteHendelser(sorterteHendelser);
        hendelserForVisning.push(...sisteHendelser);
    } else {
        const nesteHendelser = getNesteHendelser(sorterteHendelser);
        if (nesteHendelser.length > 0) {
            hendelserForVisning.push(...nesteHendelser);
        }

        if (hendelserForVisning.length === 0) {
            const sisteHendelser = getSisteHendelser(sorterteHendelser);
            hendelserForVisning.push(...sisteHendelser);
        }
    }
    return hendelserForVisning;
};

export const getAlleTidslinjehendelser = (
    tidslinjeHendelserData: Tidslinjehendelse[],
    åpenBehandlingPåVent: ÅpenBehandling | undefined,
    manglendeVedleggData: Skjemanummer[],
    sak: Sak,
    barnFraSak: BarnGruppering,
    erAvslåttForeldrepengesøknad: boolean,
    intl: IntlShape
): Tidslinjehendelse[] => {
    const tidslinjeHendelser = getTidslinjehendelserDetaljer(tidslinjeHendelserData, intl);
    const venteHendelser = åpenBehandlingPåVent
        ? getTidslinjehendelserFraBehandlingPåVent(åpenBehandlingPåVent, manglendeVedleggData, intl)
        : undefined;
    if (venteHendelser) {
        tidslinjeHendelser.push(...venteHendelser);
    }

    if (sak.familiehendelse?.termindato || (sak.familiehendelse && barnFraSak.alleBarnaLever)) {
        const familiehendelse = getTidslinjeFamiliehendelse(sak.familiehendelse);
        tidslinjeHendelser.push(familiehendelse);
    }

    if (
        barnFraSak.alleBarnaLever &&
        !erAvslåttForeldrepengesøknad &&
        sak.ytelse === Ytelse.FORELDREPENGER &&
        !sak.sakAvsluttet &&
        (sak.familiehendelse.omsorgsovertakelse || sak.familiehendelse.fødselsdato)
    ) {
        const barn3ÅrHendelse = getTidslinjeBarnTreÅrHendelse(
            sak.familiehendelse.fødselsdato,
            sak.familiehendelse.omsorgsovertakelse,
            sak.familiehendelse.antallBarn,
            sak.gjelderAdopsjon,

            intl
        );
        tidslinjeHendelser.push(barn3ÅrHendelse);
    }

    if (sak.åpenBehandling) {
        const vedtakHendelse = getTidslinjeVedtakHendelse(intl, sak.ytelse);
        tidslinjeHendelser.push(vedtakHendelse);
    }

    return [...tidslinjeHendelser].sort(sorterTidslinjehendelser);
};
