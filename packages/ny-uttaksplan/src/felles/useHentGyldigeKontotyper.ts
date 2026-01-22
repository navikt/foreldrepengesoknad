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
            .map((kt) => kt.konto)
            .filter((kt) => erGyldigForMor(kt, foreldreInfo, familiehendelsedato, familiesituasjon, valgtePerioder)),
        gyldigeStønadskontoerForFarMedmor: valgtStønadskonto.kontoer
            .map((kt) => kt.konto)
            .filter((kt) =>
                erGyldigForFarMedmor(kt, foreldreInfo, familiehendelsedato, familiesituasjon, valgtePerioder),
            ),
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
        if (erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
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
        if (erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FELLESPERIODE') {
        if (erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
        if (erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
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
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

    return valgtePerioder.some((p) => dayjs(p.tom).isAfter(sisteDag) || dayjs(p.fom).isBefore(førsteDag));
};

const erNoenPerioderFørToUkerFørFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) =>
    valgtePerioder.some((periode) =>
        dayjs(periode.fom).isBefore(
            UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(10),
        ),
    );
const erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) =>
    valgtePerioder.some((periode) =>
        dayjs(periode.fom).isBefore(
            UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(60),
        ),
    );

const erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

    return valgtePerioder.some((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};
