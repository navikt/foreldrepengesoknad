import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { Familiesituasjon, KontoTypeUttak } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { ForeldreInfo } from '../types/ForeldreInfo';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const useHentGyldigeKontotyper = (valgtePerioder: Array<{ fom: string; tom: string }>) => {
    const { foreldreInfo, familiehendelsedato, familiesituasjon, valgtStønadskonto } = useUttaksplanData();

    return {
        gyldigeStønadskontoerForMor: valgtStønadskonto.kontoer
            .filter((kt) =>
                erGyldigForMor(kt.konto, foreldreInfo, familiehendelsedato, familiesituasjon, valgtePerioder),
            )
            .map((kt) => kt.konto),
        gyldigeStønadskontoerForFarMedmor: valgtStønadskonto.kontoer
            .filter((kt) =>
                erGyldigForFarMedmor(kt.konto, foreldreInfo, familiehendelsedato, familiesituasjon, valgtePerioder),
            )
            .map((kt) => kt.konto),
    };
};

const erGyldigForMor = (
    konto: KontoTypeUttak,
    foreldreInfo: ForeldreInfo,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    valgtePerioder: Array<{ fom: string; tom: string }>,
) => {
    const { søker, rettighetType } = foreldreInfo;

    if (søker === 'FAR_ELLER_MEDMOR' && (rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT')) {
        return false;
    }

    if (familiesituasjon === 'adopsjon' && erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
        return false;
    }

    if (konto === 'AKTIVITETSFRI_KVOTE') {
        return false;
    }

    if (erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
        return false;
    }

    if (konto === 'MØDREKVOTE') {
        if (erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FEDREKVOTE') {
        if (erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FORELDREPENGER') {
        if (erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FORELDREPENGER_FØR_FØDSEL') {
        if (erNoenPerioderFørTreUkerFørFamDatoEllerEtterLikFamDato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FELLESPERIODE') {
        if (erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    return true;
};

const erGyldigForFarMedmor = (
    konto: KontoTypeUttak,
    foreldreInfo: ForeldreInfo,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    valgtePerioder: Array<{ fom: string; tom: string }>,
) => {
    const { søker, rettighetType } = foreldreInfo;
    if (søker === 'MOR' && (rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT')) {
        return false;
    }

    if (familiesituasjon === 'adopsjon' && erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
        return false;
    }

    if (konto === 'FORELDREPENGER_FØR_FØDSEL') {
        return false;
    }

    //FIXME (TOR) Sjekk på max to veker i to-vekers perioden før og seks veker etter. Usikker på om ein bør legga den her, eller vise feilmelding for den

    if (konto === 'MØDREKVOTE') {
        if (erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'AKTIVITETSFRI_KVOTE') {
        if (erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FEDREKVOTE') {
        if (erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FORELDREPENGER') {
        if (erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FELLESPERIODE') {
        if (erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    return true;
};

const erNoenPerioderFørFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => valgtePerioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));

const erNoenPerioderLikEllerEtterFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => valgtePerioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));

const erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) =>
    erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato) &&
    erNoenPerioderLikEllerEtterFamiliehendelsesdato(valgtePerioder, familiehendelsedato);

const erNoenPerioderFørTreUkerFørFamDatoEllerEtterLikFamDato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString(familiehendelsedato).trekkFra(15);
    const sisteDag = UttaksdagenString(familiehendelsedato).forrige();

    return valgtePerioder.some((p) => dayjs(p.tom).isAfter(sisteDag) || dayjs(p.fom).isBefore(førsteDag));
};

const erNoenPerioderFørToUkerFørFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => valgtePerioder.some((periode) => dayjs(periode.fom).isBefore(UttaksdagenString(familiehendelsedato).trekkFra(10)));

const erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString(familiehendelsedato).trekkFra(15);
    const sisteDag = UttaksdagenString(familiehendelsedato).forrige();

    return valgtePerioder.some(
        (periode) =>
            dayjs(periode.fom).isBetween(førsteDag, sisteDag, 'day', '[]') ||
            dayjs(periode.tom).isBetween(førsteDag, sisteDag, 'day', '[]'),
    );
};
