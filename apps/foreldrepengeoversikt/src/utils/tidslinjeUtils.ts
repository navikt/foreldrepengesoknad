import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { Sak } from 'types/Sak.ts';

import {
    BehandlingTilstand_fpoversikt,
    Familiehendelse_fpoversikt,
    TidslinjeHendelseDto_fpoversikt,
} from '@navikt/fp-types';

import { BarnGruppering } from '../types/BarnGruppering.ts';
import { Tidslinjehendelse2 } from '../types/Tidslinjehendelse.ts';
import { UTTAKSDAGER_PER_UKE, Uttaksdagen } from './Uttaksdagen.ts';
import { getFamiliehendelseDato, getNavnPåBarna } from './sakerUtils.ts';

type TidslinjeTittelForFamiliehendelseProps = {
    sak: Sak;
    barnFraSak: BarnGruppering;
    intl: IntlShape;
};
export const tidslinjeTittelForFamiliehendelse = ({
    sak,
    barnFraSak,
    intl,
}: TidslinjeTittelForFamiliehendelseProps): string => {
    const { ytelse, familiehendelse } = sak;
    const gjelderAdopsjon = ('gjelderAdopsjon' in sak ? sak.gjelderAdopsjon : undefined) ?? false;

    // TODO: trengs ytelse her?
    if (ytelse === 'FORELDREPENGER') {
        const brukGeneriskNavn =
            barnFraSak.fornavn === undefined || barnFraSak.fornavn.length === 0 || !barnFraSak.alleBarnaLever;
        const navn = brukGeneriskNavn
            ? getTidslinjetekstForAntallBarn(familiehendelse.antallBarn, intl, gjelderAdopsjon)
            : getNavnPåBarna(barnFraSak.fornavn ?? []);

        if (gjelderAdopsjon && familiehendelse.omsorgsovertakelse) {
            return getTidslinjeTittelForAdopsjon(navn, familiehendelse.omsorgsovertakelse, intl);
        } else if (familiehendelse.fødselsdato) {
            return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.fødsel' }, { navn });
        } else {
            return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.termindato' });
        }
    } else if (familiehendelse.omsorgsovertakelse) {
        return 'Adopsjonsdato'; // TODO: intl
    } else if (familiehendelse.fødselsdato) {
        return 'Barnet ble født'; // TODO: intl
    } else {
        return intl.formatMessage({ id: 'tidslinje.tittel.FAMILIEHENDELSE.termindato' });
    }
};

const getTidslinjetekstForAntallBarn = (antallBarn: number, intl: IntlShape, gjelderAdopsjon: boolean): string => {
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

// TODO: forenkles??
export const getTidslinjeTittelForBarnTreÅr = ({
    barnFraSak,
    familiehendelse,
    intl,
}: {
    barnFraSak: BarnGruppering;
    familiehendelse: Familiehendelse_fpoversikt;
    intl: IntlShape;
}) => {
    const { omsorgsovertakelse, antallBarn } = familiehendelse;
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

// TODO: burde håndteres backend
export const getAlleTidslinjehendelser = (props: {
    tidslinjeHendelserBackend: TidslinjeHendelseDto_fpoversikt[];
    sak: Sak;
    barnFraSak: BarnGruppering;
    intl: IntlShape;
}): Tidslinjehendelse2[] => {
    const { tidslinjeHendelserBackend, sak, barnFraSak } = props;
    const tidslinjeHendelser: Tidslinjehendelse2[] = tidslinjeHendelserBackend.map((hendelse) => {
        return {
            ...hendelse,
            utvidetTidslinjeHendelseType: hendelse.tidslinjeHendelseType,
        };
    });

    const VENTEÅRSAKER: BehandlingTilstand_fpoversikt[] = [
        'VENT_INNTEKTSMELDING',
        'VENT_DOKUMENTASJON',
        'VENT_TIDLIG_SØKNAD',
        'VENT_MELDEKORT',
    ];
    const åpenBehandlingPåVent =
        sak.åpenBehandling && VENTEÅRSAKER.includes(sak.åpenBehandling.tilstand) ? sak.åpenBehandling : undefined;

    const nåDato = dayjs(new Date()).add(1, 'd').toISOString();

    const erAvslåttForeldrepengesøknad =
        (sak.ytelse === 'FORELDREPENGER' &&
            sak.gjeldendeVedtak?.perioder.every((p) => p.resultat?.innvilget === false)) ??
        false;

    if (åpenBehandlingPåVent) {
        // TODO: her var det egentlig en til, men tror ikke den noensinne slår inn?
        tidslinjeHendelser.push({
            aktørType: getAktørtypeAvVenteårsak(åpenBehandlingPåVent.tilstand),
            opprettet: nåDato,
            utvidetTidslinjeHendelseType: getTidslinjeHendelstypeAvVenteårsak(åpenBehandlingPåVent.tilstand),
            dokumenter: [],
        });
    }

    if (sak.familiehendelse?.termindato || (sak.familiehendelse && barnFraSak.alleBarnaLever)) {
        const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
        tidslinjeHendelser.push({
            opprettet: familiehendelsedato,
            utvidetTidslinjeHendelseType: 'FAMILIEHENDELSE',
            aktørType: 'BRUKER',
            dokumenter: [],
        });
    }

    const skalVise3ÅrsHendelse =
        barnFraSak.alleBarnaLever &&
        !erAvslåttForeldrepengesøknad &&
        sak.ytelse === 'FORELDREPENGER' &&
        !sak.sakAvsluttet &&
        (sak.familiehendelse.omsorgsovertakelse || sak.familiehendelse.fødselsdato);
    if (skalVise3ÅrsHendelse) {
        const dato = dayjs(
            sak.gjelderAdopsjon ? sak.familiehendelse.omsorgsovertakelse : sak.familiehendelse.fødselsdato,
        )
            .add(3, 'y')
            .toISOString();

        tidslinjeHendelser.push({
            opprettet: dato,
            utvidetTidslinjeHendelseType: 'BARNET_TRE_ÅR',
            aktørType: 'BRUKER',
            dokumenter: [],
        });
    }

    if (sak.åpenBehandling) {
        tidslinjeHendelser.push({
            opprettet: nåDato,
            utvidetTidslinjeHendelseType: 'FREMTIDIG_VEDTAK',
            aktørType: 'NAV',
            dokumenter: [],
        });
    }

    return [...tidslinjeHendelser].sort((a, b) => sorterTidslinjehendelser(a.opprettet, b.opprettet));
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

// TODO: brukes egentlig ikke
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

const sorterTidslinjehendelser = (opprettet1: string, opprettet2: string) => {
    if (dayjs(opprettet1).isBefore(opprettet2)) {
        return -1;
    } else if (dayjs(opprettet1).isAfter(opprettet2)) {
        return 1;
    } else {
        return 0;
    }
};

type TidslinjeVinduResult = {
    hendelser: Tidslinjehendelse2[];
    aktivtStegIndexISnitt: number;
    isTruncated: 'both' | 'start' | 'end' | undefined;
};

type BeregnTidslinjeVinduProps = {
    alleSorterteHendelser: Tidslinjehendelse2[];
    aktivtStegIndex: number;
    visHeleTidslinjen: boolean;
    maksVindu?: number;
};

export const beregnTidslinjeVindu = ({
    alleSorterteHendelser,
    aktivtStegIndex,
    visHeleTidslinjen,
    maksVindu = 3,
}: BeregnTidslinjeVinduProps): TidslinjeVinduResult => {
    // Hvis vi skal vise hele tidslinjen, ikke slice
    const windowStart = visHeleTidslinjen
        ? 0
        : Math.max(0, Math.min(aktivtStegIndex - 1, Math.max(0, alleSorterteHendelser.length - maksVindu)));
    const windowEnd = visHeleTidslinjen
        ? alleSorterteHendelser.length
        : Math.min(alleSorterteHendelser.length, windowStart + maksVindu);

    const hendelser = alleSorterteHendelser.slice(windowStart, windowEnd);
    const aktivtStegIndexISnitt = visHeleTidslinjen ? aktivtStegIndex : Math.max(0, aktivtStegIndex - windowStart);

    const truncateStart = windowStart !== 0;
    const truncateEnd = windowEnd !== alleSorterteHendelser.length;
    const isTruncated =
        truncateStart && truncateEnd
            ? 'both'
            : truncateStart && !truncateEnd
              ? 'start'
              : !truncateStart && truncateEnd
                ? 'end'
                : undefined;

    return {
        hendelser,
        aktivtStegIndexISnitt,
        isTruncated,
    };
};

export const getTidligstBehandlingsDatoForTidligSøknad = (sak: Sak) => {
    if (sak.ytelse === 'SVANGERSKAPSPENGER') {
        const tilretteleggingerFomDatoer =
            sak.åpenBehandling?.søknad.arbeidsforhold.flatMap((a) => {
                const utenHelTilrettelegging = a.tilrettelegginger.filter((t) => t.type !== 'HEL');
                return utenHelTilrettelegging.map((periode) => dayjs(periode.fom));
            }) ?? [];
        const datoFørstePeriodeMedSVP = dayjs.min(tilretteleggingerFomDatoer)!.toDate();
        return Uttaksdagen(Uttaksdagen(datoFørstePeriodeMedSVP).denneEllerNeste()).trekkFra(4 * UTTAKSDAGER_PER_UKE);
    }

    if (sak.ytelse === 'FORELDREPENGER') {
        const søknadsperioder = sak.åpenBehandling?.søknadsperioder ?? [];
        const førsteUttaksdagISaken = dayjs(søknadsperioder[0]!.fom).toDate();
        return Uttaksdagen(Uttaksdagen(førsteUttaksdagISaken).denneEllerNeste()).trekkFra(4 * UTTAKSDAGER_PER_UKE);
    }

    return undefined;
};

export const getAktivTidslinjeStegIndex = (
    hendelserForVisning: Tidslinjehendelse2[],
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

export const getTidligstDatoForInntektsmelding = (førsteUttaksdagISaken: string | undefined) => {
    return førsteUttaksdagISaken
        ? dayjs(førsteUttaksdagISaken)
              .subtract(4 * 7, 'day')
              .toDate()
        : undefined;
};
