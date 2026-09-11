import { IntlShape } from 'react-intl';

import {
    BrukerRolleSak_fpoversikt,
    KontoType,
    KontoTypeUttak,
    MorsAktivitet,
    NavnPåForeldre,
    UttakDto_fpoversikt,
    UtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    erFamiliehendelseDato,
    erPeriodeDto,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
} from '../../types/UttaksplanPeriode';

/**
 * Visningsnavn for en gitt domenerolle (MOR/FAR_MEDMOR) når begge foreldrene er fedre
 * (f.eks. adopsjon). Da representerer ikke MOR/FAR_MEDMOR en mor og en far, men to fedre –
 * så vi viser forelderens faktiske navn (eller "Far 1"/"Far 2") i stedet for generisk
 * "Mor"/"Far"-tekst.
 */
export const getForelderVisningsnavnForFarOgFar = (
    forelder: BrukerRolleSak_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
): string => capitalizeFirstLetter(forelder === 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor);

export const getStønadskvoteNavnSimple = (
    intl: IntlShape,
    konto: KontoTypeUttak,
    erMedmorDelAvSøknaden?: boolean,
    erBareFarHarRett?: boolean,
    navnPåForeldreForFarOgFar?: NavnPåForeldre,
) => {
    if (navnPåForeldreForFarOgFar && (konto === 'MØDREKVOTE' || konto === 'FEDREKVOTE')) {
        // MØDREKVOTE tilhører alltid domenerollen MOR (Far 2), FEDREKVOTE domenerollen
        // FAR_MEDMOR (Far 1) – uavhengig av hvilken forelder som viser valget (f.eks. ved
        // overføring av kvote fra den andre faren).
        const navn = konto === 'MØDREKVOTE' ? navnPåForeldreForFarOgFar.mor : navnPåForeldreForFarOgFar.farMedmor;
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskvotetype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }
    if (konto === 'FEDREKVOTE' && erMedmorDelAvSøknaden) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.MEDMORSKVOTE' });
    }
    if (konto === 'FORELDREPENGER' && erBareFarHarRett) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.AKTIVITETSKRAV_KVOTE_BFHR' });
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskvotetype.${konto}` });
};

export interface GetStønadskvoteNavnOptions {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    erEøsPeriode: boolean;
    morsAktivitet?: MorsAktivitet;
    konto?: KontoType;
    erAleneOmOmsorg?: boolean;
    erAvslått?: boolean;
}

export const getStønadskvoteNavn = (intl: IntlShape, options: GetStønadskvoteNavnOptions) => {
    const { navnPåForeldre, erFarEllerMedmor, erEøsPeriode, morsAktivitet, konto, erAleneOmOmsorg, erAvslått } =
        options;

    let navn;

    switch (konto) {
        case 'MØDREKVOTE':
            navn = navnPåForeldre.mor;
            break;
        case 'FEDREKVOTE':
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskvotetype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    // En bare-far-har-rett-periode bruker kontoType FORELDREPENGER og vises med
    // aktivitetskrav-tekst basert på mors aktivitet. Gjelder kun fars egne perioder
    // (ikke EØS, avslåtte eller aleneomsorg), slik at mors fellesperiode ikke
    // feilmerkes når far ser oversikten sin.
    const erBareFarHarRettForeldrepenger =
        !erAvslått &&
        !erEøsPeriode &&
        konto === 'FORELDREPENGER' &&
        erFarEllerMedmor === true &&
        erAleneOmOmsorg === false;

    if (erBareFarHarRettForeldrepenger) {
        if (morsAktivitet === 'IKKE_OPPGITT') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        return intl.formatMessage({ id: 'uttaksplan.stønadskvotetype.AKTIVITETSKRAV_KVOTE_BFHR' });
    }

    return intl.formatMessage({ id: `uttaksplan.stønadskvotetype.${konto}` });
};

// Opphald har ikkje lenger noko eige oppholdÅrsak-felt – årsaka er no direkte annan part sin
// kontoType (FELLESPERIODE/MØDREKVOTE/FEDREKVOTE/FORELDREPENGER/FORELDREPENGER_FØR_FØDSEL).
export const getOppholdskontoNavn = (intl: IntlShape, kontoType: KontoType, foreldernavn: string, erMor: boolean) => {
    const navn = capitalizeFirstLetter(foreldernavn);

    if (erMor) {
        if (kontoType === 'FELLESPERIODE') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FELLESPERIODE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }
        if (kontoType === 'FEDREKVOTE') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FEDREKVOTE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }

        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.MØDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    if (kontoType === 'FELLESPERIODE') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FELLESPERIODE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }
    if (kontoType === 'FEDREKVOTE') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FEDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    return intl.formatMessage(
        { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.MØDREKVOTE_ANNEN_FORELDER` },
        { foreldernavn: navn },
    );
};

export const finnTekstForUtsettelseÅrsak = (intl: IntlShape, utsettelseÅrsak: UtsettelseÅrsak_fpoversikt) => {
    switch (utsettelseÅrsak) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ARBEID' });
        case 'FERIE':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.LOVBESTEMT_FERIE' });
        case 'FRI':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.FRI' });
        case 'HV_ØVELSE':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.HV_ØVELSE' });
        case 'BARN_INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.BARN_INNLAGT' });
        case 'SØKER_INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_INNLAGT' });
        case 'NAV_TILTAK':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.NAV_TILTAK' });
        case 'SØKER_SYKDOM':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_SYKDOM' });
    }
};

const sideNøkkel = (side?: UttakDto_fpoversikt): string =>
    side
        ? `${side.forelder}-${side.kontoType}-${side.flerbarnsdager}-${side.utsettelseÅrsak}-${side.overføringÅrsak}`
        : '';

export const genererPeriodeKey = (saksperiode?: Uttaksplanperiode): string | undefined => {
    if (!saksperiode) {
        return undefined;
    }

    if (erTapteDagerHull(saksperiode)) {
        const { fom, tom, forelder } = saksperiode;
        return `tapteDagerHull - ${fom} - ${tom} - ${forelder}`;
    }
    if (erPeriodeUtenUttakHull(saksperiode)) {
        const { fom, tom } = saksperiode;
        return `periodeUtenUttakHull - ${fom} - ${tom}`;
    }
    if (erFamiliehendelseDato(saksperiode)) {
        const { fom, tom } = saksperiode;
        return `familiehendelseDato - ${fom} - ${tom}`;
    }
    if (!erPeriodeDto(saksperiode)) {
        return undefined;
    }

    const { fom, tom, søker, annenPart, annenPartEøs } = saksperiode;
    const eøsNøkkel = annenPartEøs ? `eøs-${annenPartEøs.kontoType}-${annenPartEøs.trekkdager}` : '';
    return `${fom} - ${tom} - ${sideNøkkel(søker)} - ${sideNøkkel(annenPart)} - ${eøsNøkkel}`;
};
