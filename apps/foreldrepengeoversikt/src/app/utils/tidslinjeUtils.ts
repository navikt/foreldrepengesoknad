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

export const getTidslinjehendelseTittel = (
    hendelsetype: TidslinjehendelseType,
    intl: IntlShape,
    tidlistBehandlingsdato: Date | undefined,
    manglendeVedleggData: Skjemanummer[] | undefined,
    ytelse: Ytelse
): string => {
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
    return intlUtils(intl, `tidslinje.tittel.${hendelsetype}`);
};

export const getTidslinjehendelseStatus = (hendelsetype: TidslinjehendelseType, hendelsesDato: Date) => {
    if (TIDSLINJEHENDELSER_PÅ_VENT.includes(hendelsetype)) {
        return 'warning';
    }
    if (dayjs(hendelsesDato).isSameOrBefore(new Date())) {
        return 'completed';
    }
    return 'incomplete';
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
        return NavRoutes.VENT_INNTEKTSMELDING;
    }

    if (venteårsak === BehandlingTilstand.VENTER_PÅ_MELDEKORT) {
        return NavRoutes.VENT_MELDEKORT;
    }
    return undefined;
};

export const getTidligstBehandlingsDatoForTidligSøknad = (åpenBehandling: ÅpenBehandling): Date => {
    const søknadsperioder = åpenBehandling.søknadsperioder;
    const førsteUttaksdagISaken = dayjs(søknadsperioder![0].fom).toDate();
    return Uttaksdagen(førsteUttaksdagISaken!).trekkFra(4 * UTTAKSDAGER_PER_UKE);
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
            case TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY:
                const datoFørsteSøknad = getDatoForInnsendingAvFørsteSøknad(tidslinjeHendelserData);
                return {
                    ...hendelse,
                    merInformasjon: datoFørsteSøknad
                        ? intlUtils(intl, 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY', {
                              datoFørsteSøknad: formaterDato(datoFørsteSøknad, 'DD. MMM YYYY'),
                          })
                        : intlUtils(intl, 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY.ukjentDatoFørstSøknad'),
                };
            default:
                return hendelse;
        }
    });
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
            opprettet: new Date(),
            aktørType: getAktørtypeAvVenteårsak(åpenBehandling.tilstand),
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
        opprettet: new Date(),
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
        return [tidslinjeHendelse, hendelseVenterPåDokumentasjon];
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
