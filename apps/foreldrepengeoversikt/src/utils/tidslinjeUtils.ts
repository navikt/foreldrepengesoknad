import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import { Skjemanummer } from '@navikt/fp-constants';
import {
    BehandlingTilstand_fpoversikt,
    EsÅpenBehandling_fpoversikt,
    Familiehendelse_fpoversikt,
    FpÅpenBehandling_fpoversikt,
    SvpÅpenBehandling_fpoversikt,
    TidslinjeHendelseDto_fpoversikt,
    Ytelse,
} from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { NavRoutes, OversiktRoutes } from '../routes/routes';
import { BarnGruppering } from '../types/BarnGruppering';
import { Sak } from '../types/Sak';
import { Tidslinjehendelse } from '../types/Tidslinjehendelse';
import { UTTAKSDAGER_PER_UKE, Uttaksdagen } from './Uttaksdagen';
import { formaterDato } from './dateUtils';
import { getFamiliehendelseDato, getNavnPåBarna } from './sakerUtils';

dayjs.extend(minMax);

enum Vedtaksbrev {
    AVSLAGSBREV = 'Avslagsbrev',
    INNVILGELSESBREV = 'Innvilgelsesbrev',
}
export const VENTEÅRSAKER = ['VENT_INNTEKTSMELDING', 'VENT_DOKUMENTASJON', 'VENT_TIDLIG_SØKNAD', 'VENT_MELDEKORT'];

export const getAktivTidslinjeStegIndex = (
    hendelserForVisning: Tidslinjehendelse[],
    erInnvilgetForeldrepengesøknad: boolean,
): number => {
    if (erInnvilgetForeldrepengesøknad) {
        const indexForSisteVedtak = hendelserForVisning.findLastIndex(
            (hendelse) => hendelse.utvidetTidslinjeHendelseType === 'VEDTAK',
        );

        if (indexForSisteVedtak >= 0) {
            return indexForSisteVedtak;
        }
    }
    return hendelserForVisning.findIndex((hendelse) => dayjs(hendelse.opprettet).isAfter(dayjs(), 'd'));
};

export const getTidligstDatoForInntektsmelding = (førsteUttaksdagISaken: string | undefined) => {
    return førsteUttaksdagISaken
        ? dayjs(førsteUttaksdagISaken)
              .subtract(4 * 7, 'day')
              .toDate()
        : undefined;
};

const getTidslinjetekstForAntallBarn = (
    antallBarn: number,
    intl: IntlShape,
    gjelderAdopsjon: boolean | undefined,
): string => {
    if (antallBarn === 1 || antallBarn === 0) {
        return intl.formatMessage({ id: 'barnet' });
    } else if (antallBarn > 1 && gjelderAdopsjon) {
        return intl.formatMessage({ id: 'barna' });
    } else if (antallBarn === 2) {
        return intl.formatMessage({ id: 'tvillingene' });
    } else if (antallBarn === 3) {
        return intl.formatMessage({ id: 'trillingene' });
    }
    return intl.formatMessage({ id: 'flerlingene' });
};

const getTidslinjeTittelForBarnTreÅr = (
    barnFraSak: BarnGruppering,
    antallBarn: number,
    omsorgsovertakelse: string | undefined,
    intl: IntlShape,
) => {
    let barnNavnTekst = '';
    if (omsorgsovertakelse) {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.BARNET_TRE_ÅR.adopsjon' },
            {
                navn: barnNavnTekst,
            },
        );
    }
    if (barnFraSak.fornavn === undefined || barnFraSak.fornavn.length === 0 || !barnFraSak.alleBarnaLever) {
        barnNavnTekst = getTidslinjetekstForAntallBarn(antallBarn, intl, false);
    } else {
        barnNavnTekst = getNavnPåBarna(barnFraSak.fornavn);
    }
    return intl.formatMessage(
        { id: 'tidslinje.tittel.BARNET_TRE_ÅR.fødsel' },
        {
            navn: barnNavnTekst,
        },
    );
};

const getTidslinjeTittelForAdopsjon = (navn: string, omsorgsovertakelse: string, intl: IntlShape) => {
    if (dayjs(omsorgsovertakelse).isSameOrBefore(dayjs(), 'd')) {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.FAMILIEHENDELSE.omsorgsovertakelse.tilbakeITid' },
            {
                navn,
            },
        );
    } else {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.FAMILIEHENDELSE.omsorgsovertakelse.fremITid' },
            {
                navn,
            },
        );
    }
};

const getTidslinjeTittelForFamiliehendelseForeldrepenger = (
    barnFraSak: BarnGruppering,
    antallBarn: number,
    gjelderAdopsjon: boolean | undefined,
    familiehendelse: Familiehendelse_fpoversikt,
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
        return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.fødsel' }, { navn: barnNavnTekst });
    } else {
        return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.termindato' });
    }
};

const getTidslinjeTittelForFamiliehendelse = (
    familiehendelse: Familiehendelse_fpoversikt,
    gjelderAdopsjon: boolean | undefined,
    barnFraSak: BarnGruppering,
    antallBarn: number,
    ytelse: Ytelse,
    intl: IntlShape,
): string => {
    if (ytelse === 'FORELDREPENGER') {
        return getTidslinjeTittelForFamiliehendelseForeldrepenger(
            barnFraSak,
            antallBarn,
            gjelderAdopsjon,
            familiehendelse,
            intl,
        );
    } else if (familiehendelse.omsorgsovertakelse) {
        return 'Adopsjonsdato';
    } else if (familiehendelse.fødselsdato) {
        return 'Barnet ble født';
    } else {
        return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.termindato' });
    }
};

const getTittelSvarPåSøknad = (hendelse: Tidslinjehendelse, intl: IntlShape) => {
    const dokumenter = hendelse.dokumenter;
    if (dokumenter.length > 0) {
        if (dokumenter.some((d) => d.tittel.includes(Vedtaksbrev.AVSLAGSBREV))) {
            return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.avslått' });
        }
        if (dokumenter.some((d) => d.tittel.includes(Vedtaksbrev.INNVILGELSESBREV))) {
            return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK.innvilget' });
        }
    }
    return intl.formatMessage({ id: 'tidslinje.tittel.VEDTAK' });
};

const finnTekstForTidslinjehendelse = (intl: IntlShape, hendelse: Tidslinjehendelse, erOmsorgsovertakelse: boolean) => {
    const hendelsetype = hendelse.utvidetTidslinjeHendelseType;
    switch (hendelsetype) {
        case 'BARNET_TRE_ÅR':
            return erOmsorgsovertakelse
                ? intl.formatMessage({ id: 'tidslinje.tittel.BARNET_TRE_ÅR.adopsjon' })
                : intl.formatMessage({ id: 'tidslinje.tittel.BARNET_TRE_ÅR.fødsel' });
        case 'ENDRINGSSØKNAD':
            return intl.formatMessage({ id: 'tidslinje.tittel.ENDRINGSSØKNAD' });
        case 'ETTERSENDING':
            return intl.formatMessage({ id: 'tidslinje.tittel.ETTERSENDING' });
        case 'FAMILIEHENDELSE':
            return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE' });
        case 'FREMTIDIG_VEDTAK':
            return intl.formatMessage({ id: 'tidslinje.tittel.FREMTIDIG_VEDTAK' });
        case 'FØRSTEGANGSSØKNAD':
            return intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD' });
        case 'FØRSTEGANGSSØKNAD_NY':
            return intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD_NY' });
        case 'INNTEKTSMELDING':
            return intl.formatMessage({ id: 'tidslinje.tittel.INNTEKTSMELDING' });
        case 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING':
            return intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_ETTERLYS_INNTEKTSMELDING' });
        case 'UTGÅENDE_INNHENT_OPPLYSNINGER':
            return intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_INNHENT_OPPLYSNINGER' });
        case 'UTGÅENDE_VARSEL_TILBAKEBETALING':
            return intl.formatMessage({ id: 'tidslinje.tittel.UTGÅENDE_VARSEL_TILBAKEBETALING' });
        case 'VEDTAK':
            return getTittelSvarPåSøknad(hendelse, intl);
        case 'VENTER_INNTEKTSMELDING':
            return intl.formatMessage({ id: 'tidslinje.tittel.VENTER_INNTEKTSMELDING' });
        case 'VENTER_MELDEKORT':
            return intl.formatMessage({ id: 'tidslinje.tittel.VENTER_MELDEKORT' });
        case 'VENTER_PGA_TIDLIG_SØKNAD':
            return intl.formatMessage({ id: 'tidslinje.tittel.VENTER_PGA_TIDLIG_SØKNAD' });
        case 'VENT_DOKUMENTASJON':
            return intl.formatMessage({ id: 'tidslinje.tittel.VENT_DOKUMENTASJON' });
        case 'FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV':
            return intl.formatMessage({ id: 'tidslinje.tittel.FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV' });
    }
};

export const getTidslinjehendelseTittel = (
    hendelse: Tidslinjehendelse,
    intl: IntlShape,
    tidlistBehandlingsdato: string | undefined,
    manglendeVedleggData: Skjemanummer[] | undefined,
    barnFraSak: BarnGruppering,
    sak: Sak,
): string => {
    const hendelsetype = hendelse.utvidetTidslinjeHendelseType;
    const { familiehendelse, ytelse } = sak;
    const antallBarn = familiehendelse?.antallBarn;
    if (hendelsetype === 'VENTER_PGA_TIDLIG_SØKNAD' && tidlistBehandlingsdato !== undefined) {
        return intl.formatMessage(
            { id: 'tidslinje.tittel.VENTER_PGA_TIDLIG_SØKNAD' },
            {
                tidlistBehandlingsdato: formatDate(tidlistBehandlingsdato),
            },
        );
    }
    if (hendelsetype === 'VENT_DOKUMENTASJON' && manglendeVedleggData?.length === 1) {
        const navnPåDokumentasjon = intl.formatMessage({ id: `ettersendelse.${manglendeVedleggData[0]!}` });
        const dokumentasjonLowerCase = navnPåDokumentasjon.charAt(0).toLowerCase() + navnPåDokumentasjon.slice(1);
        return intl.formatMessage({ id: 'tidslinje.navVenterPå' }, { dokumentasjon: dokumentasjonLowerCase });
    }
    if (hendelsetype === 'FØRSTEGANGSSØKNAD') {
        return intl.formatMessage({ id: 'tidslinje.tittel.FØRSTEGANGSSØKNAD' }, { ytelse: ytelse.toLowerCase() });
    }
    if (hendelsetype === 'FAMILIEHENDELSE' && familiehendelse && antallBarn !== undefined) {
        const gjelderAdopsjon = 'gjelderAdopsjon' in sak ? sak.gjelderAdopsjon : undefined;
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
        ytelse === 'FORELDREPENGER' &&
        (familiehendelse?.fødselsdato || familiehendelse?.omsorgsovertakelse) &&
        antallBarn &&
        hendelsetype === 'BARNET_TRE_ÅR'
    ) {
        return getTidslinjeTittelForBarnTreÅr(barnFraSak, antallBarn, familiehendelse?.omsorgsovertakelse, intl);
    }
    return finnTekstForTidslinjehendelse(intl, hendelse, !!familiehendelse?.omsorgsovertakelse);
};

const getTidslinjeHendelstypeAvVenteårsak = (venteårsak: BehandlingTilstand_fpoversikt) => {
    if (venteårsak === 'VENT_INNTEKTSMELDING') {
        return 'VENTER_INNTEKTSMELDING';
    }
    if (venteårsak === 'VENT_TIDLIG_SØKNAD') {
        return 'VENTER_PGA_TIDLIG_SØKNAD';
    }
    if (venteårsak === 'VENT_DOKUMENTASJON') {
        return 'VENT_DOKUMENTASJON';
    }
    if (venteårsak === 'VENT_MELDEKORT') {
        return 'VENTER_MELDEKORT';
    } else {
        throw new Error('Ukjent venteårsak');
    }
};

const getAktørtypeAvVenteårsak = (
    venteårsak: BehandlingTilstand_fpoversikt,
): TidslinjeHendelseDto_fpoversikt['aktørType'] => {
    if (venteårsak === 'VENT_INNTEKTSMELDING') {
        return 'ARBEIDSGIVER';
    }
    if (venteårsak === 'VENT_TIDLIG_SØKNAD') {
        return 'NAV';
    }
    return 'BRUKER';
};

const createEttersendUrl = (skjematypeIds: Skjemanummer[]): string => {
    const ids = skjematypeIds.join(',');
    const queryPart = ids ? `?skjematype=${encodeURIComponent(ids)}` : '';
    return `${OversiktRoutes.ETTERSEND}${queryPart}`;
};

const getTidlinjeHendelseEksternUrl = (venteårsak: BehandlingTilstand_fpoversikt): NavRoutes | undefined => {
    if (venteårsak === 'VENT_INNTEKTSMELDING') {
        return NavRoutes.VENT_INNTEKTSMELDING;
    }
    if (venteårsak === 'VENT_TIDLIG_SØKNAD') {
        return NavRoutes.SØKNADSFRISTER;
    }

    if (venteårsak === 'VENT_MELDEKORT') {
        return NavRoutes.VENT_MELDEKORT;
    }
    return undefined;
};

const getTidligstBehandlingsDatoForTidligSøknadFP = (åpenBehandling: FpÅpenBehandling_fpoversikt) => {
    const søknadsperioder = åpenBehandling.søknadsperioder;
    const førsteUttaksdagISaken = dayjs(søknadsperioder[0]!.fom).toDate();
    return Uttaksdagen(Uttaksdagen(førsteUttaksdagISaken).denneEllerNeste()).trekkFra(4 * UTTAKSDAGER_PER_UKE);
};

const getTidligstBehandlingsDatoForTidligSøknadSVP = (åpenBehandling: SvpÅpenBehandling_fpoversikt) => {
    const tilretteleggingerFomDatoer =
        åpenBehandling.søknad.arbeidsforhold.flatMap((a) => {
            const utenHelTilrettelegging = a.tilrettelegginger.filter((t) => t.type !== 'HEL');
            return utenHelTilrettelegging.map((periode) => dayjs(periode.fom));
        }) ?? [];
    const datoFørstePeriodeMedSVP = dayjs.min(tilretteleggingerFomDatoer)!.toDate();
    return Uttaksdagen(Uttaksdagen(datoFørstePeriodeMedSVP).denneEllerNeste()).trekkFra(4 * UTTAKSDAGER_PER_UKE);
};

const getTidligstBehandlingsDatoForTidligSøknad = (
    ytelse: Ytelse,
    åpenBehandling: EsÅpenBehandling_fpoversikt | FpÅpenBehandling_fpoversikt | SvpÅpenBehandling_fpoversikt,
) => {
    if (ytelse === 'SVANGERSKAPSPENGER') {
        return getTidligstBehandlingsDatoForTidligSøknadSVP(åpenBehandling as SvpÅpenBehandling_fpoversikt);
    }

    return getTidligstBehandlingsDatoForTidligSøknadFP(åpenBehandling as FpÅpenBehandling_fpoversikt);
};

const getDatoForInnsendingAvFørsteSøknad = (tidslinjeHendelser: TidslinjeHendelseDto_fpoversikt[]) => {
    const hendelseFørsteSøknad = tidslinjeHendelser.find(
        (hendelse) => hendelse.tidslinjeHendelseType === 'FØRSTEGANGSSØKNAD',
    );
    return hendelseFørsteSøknad ? hendelseFørsteSøknad.opprettet : undefined;
};

const getTidslinjehendelserDetaljer = (
    tidslinjeHendelserData: TidslinjeHendelseDto_fpoversikt[],
    intl: IntlShape,
): Tidslinjehendelse[] => {
    return tidslinjeHendelserData.map((hendelse) => {
        switch (hendelse.tidslinjeHendelseType) {
            case 'UTGÅENDE_INNHENT_OPPLYSNINGER':
                return {
                    ...hendelse,
                    utvidetTidslinjeHendelseType: hendelse.tidslinjeHendelseType,
                    internalUrl: OversiktRoutes.ETTERSEND,
                    linkTittel: intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' }),
                    manglendeVedlegg: [],
                };
            case 'FØRSTEGANGSSØKNAD_NY': {
                const datoFørsteSøknad = getDatoForInnsendingAvFørsteSøknad(tidslinjeHendelserData);
                return {
                    ...hendelse,
                    utvidetTidslinjeHendelseType: hendelse.tidslinjeHendelseType,
                    manglendeVedlegg: [],
                    merInformasjon: datoFørsteSøknad
                        ? intl.formatMessage(
                              { id: 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY' },
                              {
                                  datoFørsteSøknad: formaterDato(datoFørsteSøknad, 'DD. MMM YYYY'),
                              },
                          )
                        : intl.formatMessage({
                              id: 'tidslinje.merInformasjon.FØRSTEGANGSSØKNAD_NY.ukjentDatoFørstSøknad',
                          }),
                };
            }
            default:
                return {
                    ...hendelse,
                    utvidetTidslinjeHendelseType: hendelse.tidslinjeHendelseType,
                    manglendeVedlegg: [],
                };
        }
    });
};

const getTidslinjeFamiliehendelse = (familiehendelse: Familiehendelse_fpoversikt): Tidslinjehendelse => {
    const familiehendelsedato = getFamiliehendelseDato(familiehendelse);
    return {
        type: 'søknad',
        opprettet: familiehendelsedato,
        utvidetTidslinjeHendelseType: 'FAMILIEHENDELSE',
        aktørType: 'BRUKER',
        dokumenter: [],
        manglendeVedlegg: [],
    };
};

const getTidslinjeBarnTreÅrHendelse = (
    fødselsdato: string | undefined,
    omsorgsovertakelse: string | undefined,
    antallBarn: number,
    gjelderAdopsjon: boolean,
    intl: IntlShape,
): Tidslinjehendelse => {
    let dato;
    let merInformasjon = '';
    if (gjelderAdopsjon) {
        dato = dayjs(omsorgsovertakelse).add(3, 'y').toISOString();
        merInformasjon = intl.formatMessage({ id: 'tidslinje.BARN_TRE_ÅR.adopsjon.informasjon' }, { antallBarn });
    } else {
        dato = dayjs(fødselsdato).add(3, 'y').toISOString();
        merInformasjon = intl.formatMessage({ id: 'tidslinje.BARN_TRE_ÅR.fødsel.informasjon' }, { antallBarn });
    }
    return {
        type: 'søknad',
        opprettet: dato,
        utvidetTidslinjeHendelseType: 'BARNET_TRE_ÅR',
        aktørType: 'BRUKER',
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon,
        linkTittel: intl.formatMessage({ id: 'tidslinje.BARN_TRE_ÅR.linkTittel' }),
        eksternalUrl: NavRoutes.HVOR_LENGE,
    };
};

const getTidslinjeVedtakHendelse = (intl: IntlShape, ytelse: Ytelse): Tidslinjehendelse => {
    let url = NavRoutes.SAKSBEHANDLINGSTIDER_FP;
    if (ytelse === 'SVANGERSKAPSPENGER') {
        url = NavRoutes.SAKSBEHANDLINGSTIDER_SVP;
    }
    if (ytelse === 'ENGANGSSTØNAD') {
        url = NavRoutes.SAKSBEHANDLINGSTIDER_ES;
    }
    return {
        type: 'søknad',
        opprettet: dayjs(new Date()).add(1, 'd').toISOString(),
        utvidetTidslinjeHendelseType: 'FREMTIDIG_VEDTAK',
        aktørType: 'NAV',
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon:
            ytelse === 'ENGANGSSTØNAD'
                ? intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.informasjon.engangsstønad' })
                : intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.informasjon' }),
        linkTittel: intl.formatMessage({ id: 'tidslinje.FREMTIDIG_VEDTAK.linkTittel' }),
        eksternalUrl: url,
    };
};

const finnBehandlingstilstandInfoTekst = (
    intl: IntlShape,
    behandlingTilstand: BehandlingTilstand_fpoversikt,
    ytelse: Ytelse,
) => {
    switch (behandlingTilstand) {
        case 'VENT_TIDLIG_SØKNAD':
            return ytelse === 'FORELDREPENGER'
                ? intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.foreldrepenger' })
                : intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.svangerskapspenger' });
        case 'UNDER_BEHANDLING':
            return intl.formatMessage({ id: 'tidslinje.UNDER_BEHANDLING.informasjon' });
        case 'VENT_DOKUMENTASJON':
            return intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.informasjon' });
        case 'VENT_INNTEKTSMELDING':
            return intl.formatMessage({ id: 'tidslinje.VENT_INNTEKTSMELDING.informasjon' });
        case 'VENT_MELDEKORT':
            return intl.formatMessage({ id: 'tidslinje.VENT_MELDEKORT.informasjon' });
        case 'PROSESSERER':
            return undefined;
    }
};

const finnBehandlingstilstandLikTittelTekst = (intl: IntlShape, behandlingTilstand: BehandlingTilstand_fpoversikt) => {
    switch (behandlingTilstand) {
        case 'VENT_TIDLIG_SØKNAD':
            return intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.linkTittel' });
        case 'UNDER_BEHANDLING':
            return intl.formatMessage({ id: 'tidslinje.UNDER_BEHANDLING.linkTittel' });
        case 'VENT_DOKUMENTASJON':
            return intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' });
        case 'VENT_INNTEKTSMELDING':
            return intl.formatMessage({ id: 'tidslinje.VENT_INNTEKTSMELDING.linkTittel' });
        case 'VENT_MELDEKORT':
            return intl.formatMessage({ id: 'tidslinje.VENT_MELDEKORT.linkTittel' });
        case 'PROSESSERER':
            return undefined;
    }
};

const finnInfoTekstForYtelse = (intl: IntlShape, ytelse: Ytelse) =>
    ytelse === 'FORELDREPENGER'
        ? intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.foreldrepenger' })
        : intl.formatMessage({ id: 'tidslinje.VENT_TIDLIG_SØKNAD.informasjon.svangerskapspenger' });

const getTidslinjehendelserFraBehandlingPåVent = (
    åpenBehandling: EsÅpenBehandling_fpoversikt | FpÅpenBehandling_fpoversikt | SvpÅpenBehandling_fpoversikt,
    manglendeVedleggData: Skjemanummer[],
    intl: IntlShape,
    ytelse: Ytelse,
): Tidslinjehendelse[] => {
    let hendelseVenterPåDokumentasjon = undefined;
    if (
        ['VENT_INNTEKTSMELDING', 'VENT_MELDEKORT', 'VENT_TIDLIG_SØKNAD'].includes(åpenBehandling.tilstand) &&
        manglendeVedleggData &&
        manglendeVedleggData.length > 0
    ) {
        hendelseVenterPåDokumentasjon = {
            type: 'søknad',
            opprettet: dayjs(new Date()).add(1, 'd').toISOString(),
            aktørType: getAktørtypeAvVenteårsak('VENT_DOKUMENTASJON'),
            utvidetTidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak('VENT_DOKUMENTASJON'),
            dokumenter: [],
            manglendeVedlegg: [],
            merInformasjon: intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.informasjon' }),
            linkTittel: intl.formatMessage({ id: 'tidslinje.VENT_DOKUMENTASJON.linkTittel' }),
            eksternalUrl: getTidlinjeHendelseEksternUrl('VENT_DOKUMENTASJON'),
            internalUrl: createEttersendUrl(manglendeVedleggData),
            tidligstBehandlingsDato: undefined,
        } satisfies Tidslinjehendelse;
    }
    const merInfo =
        åpenBehandling.tilstand === 'VENT_TIDLIG_SØKNAD'
            ? finnInfoTekstForYtelse(intl, ytelse)
            : finnBehandlingstilstandInfoTekst(intl, åpenBehandling.tilstand, ytelse);
    const tidslinjeHendelse = {
        type: 'søknad',
        opprettet: dayjs(new Date()).add(1, 'd').toISOString(),
        aktørType: getAktørtypeAvVenteårsak(åpenBehandling.tilstand),
        utvidetTidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak(åpenBehandling.tilstand),
        dokumenter: [],
        manglendeVedlegg: [],
        merInformasjon: merInfo,
        linkTittel: finnBehandlingstilstandLikTittelTekst(intl, åpenBehandling.tilstand),
        eksternalUrl: getTidlinjeHendelseEksternUrl(åpenBehandling.tilstand),
        internalUrl:
            åpenBehandling.tilstand === 'VENT_DOKUMENTASJON' ? createEttersendUrl(manglendeVedleggData) : undefined,
        tidligstBehandlingsDato:
            åpenBehandling.tilstand === 'VENT_TIDLIG_SØKNAD'
                ? getTidligstBehandlingsDatoForTidligSøknad(ytelse, åpenBehandling).toISOString()
                : undefined,
    } satisfies Tidslinjehendelse;

    if (hendelseVenterPåDokumentasjon) {
        return [hendelseVenterPåDokumentasjon, tidslinjeHendelse];
    }

    return [tidslinjeHendelse];
};

const sorterTidslinjehendelser = (opprettet1: string, opprettet2: string) => {
    if (dayjs(opprettet1).isBefore(opprettet2)) {
        return -1;
    } else if (dayjs(opprettet1).isAfter(opprettet2)) {
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
        ['ENDRINGSSØKNAD', 'FØRSTEGANGSSØKNAD', 'FØRSTEGANGSSØKNAD_NY'].includes(hendelse.utvidetTidslinjeHendelseType),
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
    tidslinjeHendelserData: TidslinjeHendelseDto_fpoversikt[],
    åpenBehandlingPåVent:
        | EsÅpenBehandling_fpoversikt
        | FpÅpenBehandling_fpoversikt
        | SvpÅpenBehandling_fpoversikt
        | undefined,
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
        sak.ytelse === 'FORELDREPENGER' &&
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
    return [...tidslinjeHendelser].sort((a, b) => sorterTidslinjehendelser(a.opprettet, b.opprettet));
};

export const getRelevantNyTidslinjehendelse = (
    tidslinjehendelser: TidslinjeHendelseDto_fpoversikt[],
): TidslinjeHendelseDto_fpoversikt | undefined => {
    const søknadHendelser = new Set(['FØRSTEGANGSSØKNAD', 'FØRSTEGANGSSØKNAD_NY', 'ENDRINGSSØKNAD']);

    const sorterteHendelser = tidslinjehendelser
        ? [...tidslinjehendelser].sort((a, b) => sorterTidslinjehendelser(a.opprettet, b.opprettet)).reverse()
        : undefined;
    const relevantNyHendelse = sorterteHendelser
        ? sorterteHendelser.find(
              (hendelse) =>
                  søknadHendelser.has(hendelse.tidslinjeHendelseType) &&
                  hendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad')) &&
                  dayjs(hendelse.opprettet).isSameOrAfter(dayjs().subtract(1, 'd')),
          )
        : undefined;
    return relevantNyHendelse;
};
