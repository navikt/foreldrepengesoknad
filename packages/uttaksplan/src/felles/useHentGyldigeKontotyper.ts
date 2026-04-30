import { Familiesituasjon, KontoTypeUttak } from '@navikt/fp-types';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { ForeldreInfo } from '../types/ForeldreInfo';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';

export const useHentGyldigeKontotyper = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    harValgtSamtidigUttak: boolean,
    ønskerFlerbarnsdager: boolean | undefined,
) => {
    const { foreldreInfo, familiehendelsedato, familiesituasjon, valgtStønadskonto } = useUttaksplanData();

    return {
        gyldigeStønadskontoerForMor: valgtStønadskonto.kontoer
            .map((kt) => kt.konto)
            .filter((kt) =>
                erGyldigForMor(
                    kt,
                    foreldreInfo,
                    familiehendelsedato,
                    familiesituasjon,
                    valgtePerioder,
                    harValgtSamtidigUttak,
                ),
            ),
        gyldigeStønadskontoerForFarMedmor: valgtStønadskonto.kontoer
            .map((kt) => kt.konto)
            .filter((kt) =>
                erGyldigForFarMedmor(
                    kt,
                    foreldreInfo,
                    familiehendelsedato,
                    familiesituasjon,
                    valgtePerioder,
                    harValgtSamtidigUttak,
                    ønskerFlerbarnsdager,
                ),
            ),
    };
};

const erGyldigForMor = (
    konto: KontoTypeUttak,
    foreldreInfo: ForeldreInfo,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    valgtePerioder: Array<{ fom: string; tom: string }>,
    harValgtSamtidigUttak: boolean,
) => {
    const { søker, rettighetType } = foreldreInfo;

    const harKunEnPartRett = rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT';
    const erAdopsjon = familiesituasjon === 'adopsjon';

    if (søker === 'FAR_MEDMOR' && harKunEnPartRett) {
        return false;
    }

    if (
        familiesituasjon === 'adopsjon' &&
        UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
    ) {
        return false;
    }

    if (konto === 'AKTIVITETSFRI_KVOTE') {
        return false;
    }

    if (
        UttaksperiodeValidatorer.erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato(
            valgtePerioder,
            familiehendelsedato,
        )
    ) {
        return false;
    }

    if (konto === 'MØDREKVOTE') {
        if (UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FEDREKVOTE') {
        if (harValgtSamtidigUttak) {
            return false;
        }

        if (
            !erAdopsjon &&
            UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }
    }

    if (konto === 'FORELDREPENGER' && !erAdopsjon) {
        if (
            !harKunEnPartRett &&
            UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }

        if (
            harKunEnPartRett &&
            UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
        ) {
            return false;
        }
    }

    if (konto === 'FORELDREPENGER_FØR_FØDSEL') {
        if (
            UttaksperiodeValidatorer.erNoenPerioderFørTreUkerFørFamDatoEllerEtterLikFamDato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }
    }

    if (konto === 'FELLESPERIODE' && !erAdopsjon) {
        if (
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }
        if (
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }
        if (
            UttaksperiodeValidatorer.erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
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
    harValgtSamtidigUttak: boolean,
    ønskerFlerbarnsdager: boolean | undefined,
) => {
    const { søker, rettighetType } = foreldreInfo;
    if (søker === 'MOR' && (rettighetType === 'ALENEOMSORG' || rettighetType === 'BARE_SØKER_RETT')) {
        return false;
    }

    if (
        familiesituasjon === 'adopsjon' &&
        UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
    ) {
        return false;
    }

    if (
        UttaksperiodeValidatorer.erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato(
            valgtePerioder,
            familiehendelsedato,
        )
    ) {
        return false;
    }

    if (konto === 'FORELDREPENGER_FØR_FØDSEL') {
        return false;
    }

    if (konto === 'MØDREKVOTE') {
        if (harValgtSamtidigUttak) {
            return false;
        }
        if (
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }
        if (
            UttaksperiodeValidatorer.erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
        ) {
            return false;
        }
    }

    if (konto === 'AKTIVITETSFRI_KVOTE') {
        if (
            UttaksperiodeValidatorer.erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
        ) {
            return false;
        }
    }

    if (konto === 'FEDREKVOTE') {
        if (
            UttaksperiodeValidatorer.erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
        ) {
            return false;
        }
    }

    if (konto === 'FORELDREPENGER') {
        if (UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)) {
            return false;
        }
    }

    if (konto === 'FELLESPERIODE') {
        if (ønskerFlerbarnsdager) {
            return true;
        }

        if (
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }
        if (
            UttaksperiodeValidatorer.erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato(
                valgtePerioder,
                familiehendelsedato,
            )
        ) {
            return false;
        }

        if (
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
                valgtePerioder,
                familiehendelsedato,
            ) &&
            harValgtSamtidigUttak
        ) {
            return false;
        }

        if (
            UttaksperiodeValidatorer.erNoenPerioderFørToUkerFørFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
        ) {
            return false;
        }
    }

    return true;
};
