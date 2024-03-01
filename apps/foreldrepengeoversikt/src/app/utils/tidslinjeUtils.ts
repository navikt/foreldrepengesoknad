import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { formatDate, intlUtils } from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';

import OversiktRoutes, { NavRoutes } from 'app/routes/routes';
import { AktørType } from 'app/types/AktørType';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { Sak } from 'app/types/Sak';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import { Tilretteleggingstype } from 'app/types/TilretteleggingsperiodeSVP';
import { Ytelse } from 'app/types/Ytelse';
import { ÅpenBehandling, ÅpenBehandlingFP, ÅpenBehandlingSVP } from 'app/types/ÅpenBehandling';
import { UTTAKSDAGER_PER_UKE, Uttaksdagen } from 'app/utils/Uttaksdagen';

import { formaterDato } from './dateUtils';
import { getFamiliehendelseDato, getNavnPåBarna } from './sakerUtils';

enum Vedtaksbrev {
    AVSLAGSBREV = 'Avslagsbrev',
    INNVILGELSESBREV = 'Innvilgelsesbrev',
}
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

export const getAktivTidslinjeStegIndex = (
    hendelserForVisning: Tidslinjehendelse[],
    erInnvilgetForeldrepengesøknad: boolean,
): number => {
    if (erInnvilgetForeldrepengesøknad) {
        const indexForSisteVedtak = hendelserForVisning.findLastIndex(
            (hendelse) => hendelse.tidslinjeHendelseType === TidslinjehendelseType.VEDTAK,
        );

        if (indexForSisteVedtak >= 0) {
            return indexForSisteVedtak;
        }
    }
    return hendelserForVisning.findIndex((hendelse) => dayjs(hendelse.opprettet).isAfter(dayjs(), 'd'));
};

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
    gjelderAdopsjon: boolean | undefined,
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
    intl: IntlShape,
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
    intl: IntlShape,
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
    intl: IntlShape,
): string => {
    if (ytelse === Ytelse.FORELDREPENGER) {
        return getTidslinjeTittelForFamiliehendelseForeldrepenger(
            barnFraSak,
            antallBarn,
            gjelderAdopsjon,
            familiehendelse,
            intl,
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

const getTittelSvarPåSøknad = (hendelse: Tidslinjehendelse, intl: IntlShape) => {
    const dokumenter = hendelse.dokumenter;
    if (dokumenter && dokumenter.length > 0) {
        if (dokumenter.find((d) => d.tittel.includes(Vedtaksbrev.AVSLAGSBREV))) {
            return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.avslått' });
        }
        if (dokumenter.find((d) => d.tittel.includes(Vedtaksbrev.INNVILGELSESBREV))) {
            return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.innvilget' });
        }
    }
    return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK' });
};

const finnTekstForTidslinjehendelse = (intl: IntlShape, hendelse: Tidslinjehendelse, erOmsorgsovertakelse: boolean) => {
    const hendelsetype = hendelse.tidslinjeHendelseType;
    switch (hendelsetype) {
        case TidslinjehendelseType.BARNET_TRE_ÅR:
            return erOmsorgsovertakelse
                ? intl.formatMessage({ id: 'tidslinje.tittel.BARNET_TRE_ÅR.adopsjon' })
                : intl.formatMessage({ id: 'tidslinje.tittel.BARNET_TRE_ÅR.fødsel' });
        case TidslinjehendelseType.ENDRINGSSØKNAD:
            return intl.formatMessage({ id: 'tidslinje.tittel.ENDRINGSSØKNAD' });
        case TidslinjehendelseType.ETTERSENDING:
            return intl.formatMessage({ id: 'tidslinje.tittel.ETTERSENDING' });
        case TidslinjehendelseType.FAMILIEHENDELSE:
            return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE' });
        case TidslinjehendelseType.FREMTIDIG_VEDTAK:
            return intl.formatMessage({ id: 'tidslinje.tittel.FREMTIDIG_VEDTAK' });
        case TidslinjehendelseType.FØRSTEGANGSSØKNAD:
            return intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD' });
        case TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY:
            return intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD_NY' });
        case TidslinjehendelseType.INNTEKTSMELDING:
            return intl.formatMessage({ id: 'tidslinje.tittel.INNTEKTSMELDING' });
        case TidslinjehendelseType.UTGÅENDE_ETTERLYS_INNTEKTSMELDING:
            return intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_ETTERLYS_INNTEKTSMELDING' });
        case TidslinjehendelseType.UTGÅENDE_INNHENT_OPPLYSNINGER:
            return intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_INNHENT_OPPLYSNINGER' });
        case TidslinjehendelseType.UTGÅENDE_VARSEL_TILBAKEBETALING:
            return intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_VARSEL_TILBAKEBETALING' });
        case TidslinjehendelseType.VEDTAK:
            return getTittelSvarPåSøknad(hendelse, intl);
        case TidslinjehendelseType.VENTER_INNTEKTSMELDING:
            return intl.formatMessage({ id: 'tidslinje.tittel.VENTER_INNTEKTSMELDING' });
        case TidslinjehendelseType.VENTER_MELDEKORT:
            return intl.formatMessage({ id: 'tidslinje.tittel.VENTER_MELDEKORT' });
        case TidslinjehendelseType.VENTER_PGA_TIDLIG_SØKNAD:
            return intl.formatMessage({ id: 'tidslinje.tittel.VENTER_PGA_TIDLIG_SØKNAD' });
        case TidslinjehendelseType.VENT_DOKUMENTASJON:
            return intl.formatMessage({ id: 'tidslinje.tittel.VENT_DOKUMENTASJON' });
        case TidslinjehendelseType.FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV:
            return intl.formatMessage({ id: 'tidslinje.tittel.FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV' });
    }
};

export const getTidslinjehendelseTittel = (
    hendelse: Tidslinjehendelse,
    intl: IntlShape,
    tidlistBehandlingsdato: Date | undefined,
    manglendeVedleggData: Skjemanummer[] | undefined,
    barnFraSak: BarnGruppering,
    sak: Sak,
): string => {
    const hendelsetype = hendelse.tidslinjeHendelseType;
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
            intl,
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
    return finnTekstForTidslinjehendelse(intl, hendelse, !!familiehendelse?.omsorgsovertakelse);
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

export const getTidligstBehandlingsDatoForTidligSøknadFP = (åpenBehandling: ÅpenBehandlingFP): Date => {
    const søknadsperioder = åpenBehandling.søknadsperioder;
    const førsteUttaksdagISaken = dayjs(søknadsperioder![0].fom).toDate();
    return Uttaksdagen(Uttaksdagen(førsteUttaksdagISaken).denneEllerNeste()).trekkFra(4 * UTTAKSDAGER_PER_UKE);
};

export const getTidligstBehandlingsDatoForTidligSøknadSVP = (åpenBehandling: ÅpenBehandlingSVP): Date => {
    const tilretteleggingerFomDatoer =
        åpenBehandling.søknad.arbeidsforhold
            .map((a) => {
                const utenHelTilrettelegging = a.tilrettelegginger.filter((t) => t.type !== Tilretteleggingstype.HEL);
                return utenHelTilrettelegging.map((periode) => dayjs(periode.fom));
            })
            .flat(1) || [];
    const datoFørstePeriodeMedSVP = dayjs.min(tilretteleggingerFomDatoer)!.toDate();
    return Uttaksdagen(Uttaksdagen(datoFørstePeriodeMedSVP).denneEllerNeste()).trekkFra(4 * UTTAKSDAGER_PER_UKE);
};

export const getTidligstBehandlingsDatoForTidligSøknad = (ytelse: Ytelse, åpenBehandling: ÅpenBehandling): Date => {
    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return getTidligstBehandlingsDatoForTidligSøknadSVP(åpenBehandling as ÅpenBehandlingSVP);
    }

    return getTidligstBehandlingsDatoForTidligSøknadFP(åpenBehandling);
};

const getDatoForInnsendingAvFørsteSøknad = (tidslinjeHendelser: Tidslinjehendelse[]): Date | undefined => {
    const hendelseFørsteSøknad = tidslinjeHendelser.find(
        (hendelse) => hendelse.tidslinjeHendelseType === TidslinjehendelseType.FØRSTEGANGSSØKNAD,
    );
    return hendelseFørsteSøknad ? hendelseFørsteSøknad.opprettet : undefined;
};

export const getTidslinjehendelserDetaljer = (
    tidslinjeHendelserData: Tidslinjehendelse[],
    intl: IntlShape,
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
    intl: IntlShape,
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

const finnBehandlingstilstandInfoTekst = (intl: IntlShape, behandlingTilstand: BehandlingTilstand, ytelse: Ytelse) => {
    switch (behandlingTilstand) {
        case BehandlingTilstand.TIDLIG_SØKNAD:
            return ytelse === Ytelse.FORELDREPENGER
                ? intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.foreldrepenger' })
                : intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.svangerskapspenger' });
        case BehandlingTilstand.UNDER_BEHANDLING:
            return intl.formatMessage({ id: 'tidslinje.UNDER_BEHANDLING.informasjon' });
        case BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON:
            return intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.informasjon' });
        case BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING:
            return intl.formatMessage({ id: 'tidslinje.VENT_INNTEKTSMELDING.informasjon' });
        case BehandlingTilstand.VENTER_PÅ_MELDEKORT:
            return intl.formatMessage({ id: 'tidslinje.VENT_MELDEKORT.informasjon' });
    }
};

const finnBehandlingstilstandLikTittelTekst = (intl: IntlShape, behandlingTilstand: BehandlingTilstand) => {
    switch (behandlingTilstand) {
        case BehandlingTilstand.TIDLIG_SØKNAD:
            return intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.linkTittel' });
        case BehandlingTilstand.UNDER_BEHANDLING:
            return intl.formatMessage({ id: 'tidslinje.UNDER_BEHANDLING.linkTittel' });
        case BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON:
            return intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' });
        case BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING:
            return intl.formatMessage({ id: 'tidslinje.VENT_INNTEKTSMELDING.linkTittel' });
        case BehandlingTilstand.VENTER_PÅ_MELDEKORT:
            return intl.formatMessage({ id: 'tidslinje.VENT_MELDEKORT.linkTittel' });
    }
};

const finnInfoTekstForYtelse = (intl: IntlShape, ytelse: Ytelse) =>
    ytelse === Ytelse.FORELDREPENGER
        ? intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.foreldrepenger' })
        : intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.svangerskapspenger' });

export const getTidslinjehendelserFraBehandlingPåVent = (
    åpenBehandling: ÅpenBehandling,
    manglendeVedleggData: Skjemanummer[],
    intl: IntlShape,
    ytelse: Ytelse,
): Tidslinjehendelse[] => {
    let hendelseVenterPåDokumentasjon = undefined;
    if (
        [
            BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING,
            BehandlingTilstand.VENTER_PÅ_MELDEKORT,
            BehandlingTilstand.TIDLIG_SØKNAD,
        ].includes(åpenBehandling.tilstand) &&
        manglendeVedleggData &&
        manglendeVedleggData.length > 0
    ) {
        hendelseVenterPåDokumentasjon = {
            type: 'søknad',
            opprettet: dayjs(new Date()).add(1, 'd').toDate(),
            aktørType: getAktørtypeAvVenteårsak(BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON),
            tidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak(BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON),
            dokumenter: [],
            manglendeVedlegg: [],
            merInformasjon: intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.informasjon' }),
            linkTittel: intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' }),
            eksternalUrl: getTidlinjeHendelseEksternUrl(BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON),
            internalUrl: OversiktRoutes.ETTERSEND,
            tidligstBehandlingsDato: undefined,
        };
    }
    const merInfo =
        åpenBehandling.tilstand === BehandlingTilstand.TIDLIG_SØKNAD
            ? finnInfoTekstForYtelse(intl, ytelse)
            : finnBehandlingstilstandInfoTekst(intl, åpenBehandling.tilstand, ytelse);
    const tidslinjeHendelse = {
        type: 'søknad',
        opprettet: dayjs(new Date()).add(1, 'd').toDate(),
        aktørType: getAktørtypeAvVenteårsak(åpenBehandling.tilstand),
        tidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak(åpenBehandling.tilstand),
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon: merInfo,
        linkTittel: finnBehandlingstilstandLikTittelTekst(intl, åpenBehandling.tilstand),
        eksternalUrl: getTidlinjeHendelseEksternUrl(åpenBehandling.tilstand),
        internalUrl:
            åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON
                ? OversiktRoutes.ETTERSEND
                : undefined,
        tidligstBehandlingsDato:
            åpenBehandling.tilstand === BehandlingTilstand.TIDLIG_SØKNAD
                ? getTidligstBehandlingsDatoForTidligSøknad(ytelse, åpenBehandling)
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
        dayjs(hendelse.opprettet).isSameOrBefore(dateNow, 'd'),
    );
    if (sisteHendelser.length <= 3) {
        return sisteHendelser;
    } else {
        const sisteTreHendelser = sisteHendelser.slice(Math.max(sisteHendelser.length - 3));
        return sisteTreHendelser;
    }
};

const getGjeldendeInnvilgelseshendelse = (sorterteHendelser: Tidslinjehendelse[]) => {
    const sisteInnvilgelseIndex = sorterteHendelser.findLastIndex((hendelse) =>
        hendelse.dokumenter.find((dok) => dok.tittel.includes('Innvilgelsesbrev')),
    );
    const hendelserEtterInvilgelse =
        sisteInnvilgelseIndex >= 0 ? sorterteHendelser.slice(sisteInnvilgelseIndex) : undefined;
    const finnesNyeSøknaderEtterInnvilgelse = hendelserEtterInvilgelse?.find((hendelse) =>
        [
            TidslinjehendelseType.ENDRINGSSØKNAD,
            TidslinjehendelseType.FØRSTEGANGSSØKNAD,
            TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY,
        ].includes(hendelse.tidslinjeHendelseType),
    );
    return finnesNyeSøknaderEtterInnvilgelse ? undefined : sorterteHendelser[sisteInnvilgelseIndex];
};

export const getHendelserForVisning = (
    visHeleTidslinjen: boolean,
    sorterteHendelser: Tidslinjehendelse[],
    erAvslåttForeldrepengesøknad: boolean,
    erInnvilgetForeldrepengesøknad: boolean,
): Tidslinjehendelse[] => {
    const hendelserForVisning = [] as Tidslinjehendelse[];
    if (visHeleTidslinjen) {
        hendelserForVisning.push(...sorterteHendelser);
    } else if (erAvslåttForeldrepengesøknad) {
        const sisteHendelser = getSisteHendelser(sorterteHendelser);
        hendelserForVisning.push(...sisteHendelser);
    } else if (erInnvilgetForeldrepengesøknad) {
        const gjeldendeInnvilgelseHendelse = erInnvilgetForeldrepengesøknad
            ? getGjeldendeInnvilgelseshendelse(sorterteHendelser)
            : undefined;
        if (gjeldendeInnvilgelseHendelse) {
            hendelserForVisning.push(gjeldendeInnvilgelseHendelse);
        }
        const nesteHendelser = getNesteHendelser(sorterteHendelser);
        if (nesteHendelser.length > 0) {
            hendelserForVisning.push(...nesteHendelser);
        }
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
    intl: IntlShape,
): Tidslinjehendelse[] => {
    const tidslinjeHendelser = getTidslinjehendelserDetaljer(tidslinjeHendelserData, intl);
    const venteHendelser = åpenBehandlingPåVent
        ? getTidslinjehendelserFraBehandlingPåVent(åpenBehandlingPåVent, manglendeVedleggData, intl, sak.ytelse)
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

            intl,
        );
        tidslinjeHendelser.push(barn3ÅrHendelse);
    }

    if (sak.åpenBehandling) {
        const vedtakHendelse = getTidslinjeVedtakHendelse(intl, sak.ytelse);
        tidslinjeHendelser.push(vedtakHendelse);
    }

    return [...tidslinjeHendelser].sort(sorterTidslinjehendelser);
};

export const getRelevantNyTidslinjehendelse = (
    tidslinjehendelser: Tidslinjehendelse[] | undefined,
): Tidslinjehendelse | undefined => {
    const søknadHendelser = [
        TidslinjehendelseType.FØRSTEGANGSSØKNAD,
        TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY,
        TidslinjehendelseType.ENDRINGSSØKNAD,
    ];
    const sorterteHendelser = tidslinjehendelser
        ? [...tidslinjehendelser].sort(sorterTidslinjehendelser).reverse()
        : undefined;
    const relevantNyHendelse = sorterteHendelser
        ? sorterteHendelser.find(
              (hendelse: Tidslinjehendelse) =>
                  søknadHendelser.includes(hendelse.tidslinjeHendelseType) &&
                  hendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad')) &&
                  dayjs(hendelse.opprettet).isSameOrAfter(dayjs().subtract(1, 'd')),
          )
        : undefined;
    return relevantNyHendelse;
};
