import dayjs from 'dayjs';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { SaksperiodeNy, Situasjon } from '@navikt/fp-types';
import { Stønadskonto } from '@navikt/fp-types/src/TilgjengeligeStønadskontoer';
import { TidsperiodenString, UttaksdagenString, dateIsSameOrAfter, getTidsperiodeString } from '@navikt/fp-utils';
import {
    ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL,
    isUttaksperiode,
    sorterPerioder,
    splittSaksperiodePåDato,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
    tidperiodeOverlapperDato,
} from '@navikt/fp-uttaksplan-ny';
import { andreAugust2022ReglerGjelder } from '@navikt/fp-uttaksplan-ny/src/utils/dateUtils';

const deltUttakAdopsjonSøktFørst = (
    famDato: string,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: string | undefined,
    fellesperiodeDagerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
): SaksperiodeNy[] => {
    if (harAnnenForelderSøktFP !== true) {
        const førsteUttaksdag = UttaksdagenString(startdatoPermisjon || famDato).denneEllerNeste();
        const perioder: SaksperiodeNy[] = [];
        const kontoType = erFarEllerMedmor ? StønadskontoType.Fedrekvote : StønadskontoType.Mødrekvote;
        const konto = tilgjengeligeStønadskontoer.find((k) =>
            erFarEllerMedmor ? k.konto === StønadskontoType.Fedrekvote : k.konto === StønadskontoType.Mødrekvote,
        );
        let currentTomDate: string = førsteUttaksdag;

        if (konto !== undefined) {
            const periodeMødrekvote: SaksperiodeNy = {
                kontoType: kontoType,
                fom: getTidsperiodeString(currentTomDate, konto.dager).fom,
                tom: getTidsperiodeString(currentTomDate, konto.dager).tom,
            };

            currentTomDate = UttaksdagenString(periodeMødrekvote.tom).neste();

            if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(
                    { fom: periodeMødrekvote.fom, tom: periodeMødrekvote.tom },
                    førsteUttaksdagNesteBarnsSak,
                )
            ) {
                const splittedePerioder = splittSaksperiodePåDato(periodeMødrekvote, førsteUttaksdagNesteBarnsSak);
                splittedePerioder.forEach((periode) => perioder.push(periode));
            } else {
                perioder.push(periodeMødrekvote);
            }
        }

        if (fellesperiodeDagerMor !== undefined && fellesperiodeDagerMor > 0) {
            const periodeFellesperiode: SaksperiodeNy = {
                kontoType: StønadskontoType.Fellesperiode,
                fom: getTidsperiodeString(currentTomDate, fellesperiodeDagerMor).fom,
                tom: getTidsperiodeString(currentTomDate, fellesperiodeDagerMor).tom,
            };
            if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(
                    { fom: periodeFellesperiode.fom, tom: periodeFellesperiode.tom },
                    førsteUttaksdagNesteBarnsSak,
                )
            ) {
                const splittedePerioder = splittSaksperiodePåDato(periodeFellesperiode, førsteUttaksdagNesteBarnsSak);
                splittedePerioder.forEach((periode) => perioder.push(periode));
            } else {
                perioder.push(periodeFellesperiode);
            }
        }

        return perioder.sort(sorterPerioder);
    } else {
        return [];
    }
};

const deltUttakAdopsjonSøktSist = (
    familiehendelsesdato: string,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    erFarEllerMedmor: boolean,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: string,
    farSinFørsteUttaksdag: string,
) => {
    if (erFarEllerMedmor) {
        // Oppfører seg identisk som fødselsscenario
        return deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoer,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            familiehendelsesdato,
            undefined,
            undefined,
            'adopsjon',
        );
    } else {
        const forslag = deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoer,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            familiehendelsesdato,
            undefined,
            undefined,
            'adopsjon',
        );

        const forslagGjortOmTilMor = forslag.map((periode) => {
            if (
                isUttaksperiode(periode) &&
                (periode.kontoType === StønadskontoType.Fedrekvote ||
                    periode.kontoType === StønadskontoType.Fellesperiode)
            ) {
                if (periode.kontoType === StønadskontoType.Fedrekvote) {
                    return {
                        ...periode,
                        konto: StønadskontoType.Mødrekvote,
                        forelder: Forelder.mor,
                    };
                } else {
                    return {
                        ...periode,
                        forelder: Forelder.mor,
                    };
                }
            }

            return periode;
        });

        return forslagGjortOmTilMor;
    }
};

const deltUttakAdopsjon = (
    famDato: string,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: string | undefined,
    fellesperiodeDagerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: string | undefined,
    farSinFørsteUttaksdag: string | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    if (!harAnnenForelderSøktFP) {
        return deltUttakAdopsjonSøktFørst(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeDagerMor,
            harAnnenForelderSøktFP,
            førsteUttaksdagNesteBarnsSak,
        );
    } else {
        return deltUttakAdopsjonSøktSist(
            famDato,
            tilgjengeligeStønadskontoer,
            erFarEllerMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag!,
            farSinFørsteUttaksdag!,
        );
    }
};

const deltUttakFødselMor = (
    famDato: string,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    ønsketStartdatoPermisjon: string,
    fellesperiodeDagerMor: number | undefined,
): SaksperiodeNy[] => {
    const førsteUttaksdag = UttaksdagenString(famDato).denneEllerNeste();
    const perioder: SaksperiodeNy[] = [];
    const skalHaForeldrePengerFørFødsel = dayjs(ønsketStartdatoPermisjon).isBefore(dayjs(famDato), 'd');
    const fpFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel,
    );
    const mkKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Mødrekvote);
    let currentTomDate: string = førsteUttaksdag;
    if (fpFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && ønsketStartdatoPermisjon) {
        const startdatoPermisjon = UttaksdagenString(ønsketStartdatoPermisjon).denneEllerNeste();
        const dagerFørFødsel = UttaksdagenString(startdatoPermisjon).getUttaksdagerFremTilDato(currentTomDate);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = UttaksdagenString(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel,
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: SaksperiodeNy = {
                kontoType: StønadskontoType.Fellesperiode,
                fom: getTidsperiodeString(startdatoPermisjon, dagerFørFødsel - 15).fom,
                tom: getTidsperiodeString(startdatoPermisjon, dagerFørFødsel - 15).tom,
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: SaksperiodeNy = {
            kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            fom: startdatoFpFørFødsel,
            tom: UttaksdagenString(currentTomDate).forrige(),
        };

        perioder.push(periodeFørFødsel);
    } else {
        const periodeFørFødsel: SaksperiodeNy = {
            kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            fom: UttaksdagenString(currentTomDate).trekkFra(15),
            tom: UttaksdagenString(currentTomDate).forrige(),
        };
        perioder.push(periodeFørFødsel);
    }

    if (mkKonto !== undefined) {
        const periodeMødrekvote: SaksperiodeNy = {
            kontoType: StønadskontoType.Mødrekvote,
            fom: getTidsperiodeString(currentTomDate, mkKonto.dager).fom,
            tom: getTidsperiodeString(currentTomDate, mkKonto.dager).tom,
        };

        currentTomDate = UttaksdagenString(periodeMødrekvote.tom).neste();

        perioder.push(periodeMødrekvote);
    }

    if (fellesperiodeDagerMor !== undefined && fellesperiodeDagerMor > 0) {
        const ekstraPermisjonFørFødsel = perioder.find(
            (p) => isUttaksperiode(p) && p.kontoType === StønadskontoType.Fellesperiode,
        );

        let trekkEkstraPermisjonDager = 0;
        if (ekstraPermisjonFørFødsel) {
            trekkEkstraPermisjonDager = TidsperiodenString({
                fom: ekstraPermisjonFørFødsel.fom,
                tom: ekstraPermisjonFørFødsel.tom,
            }).getAntallUttaksdager();
        }

        if (fellesperiodeDagerMor - trekkEkstraPermisjonDager > 0) {
            const periodeFellesperiodeMor: SaksperiodeNy = {
                kontoType: StønadskontoType.Fellesperiode,
                fom: getTidsperiodeString(currentTomDate, fellesperiodeDagerMor - trekkEkstraPermisjonDager).fom,
                tom: getTidsperiodeString(currentTomDate, fellesperiodeDagerMor - trekkEkstraPermisjonDager).tom,
            };

            perioder.push(periodeFellesperiodeMor);
        }
    }

    return perioder.sort(sorterPerioder);
};

const deltUttakFødselFarMedmor = (
    tilgjengeligeStønadskontoer: Stønadskonto[],
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: string,
    farSinFørsteUttaksdag: string,
    familiehendelsesdato: string,
    termindato: string | undefined,
    morHarRettPåForeldrepengerIEØS: boolean | undefined,
    situasjon = 'fødsel',
): SaksperiodeNy[] => {
    if (
        !andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        dateIsSameOrAfter(morSinSisteUttaksdag, farSinFørsteUttaksdag) &&
        !morHarRettPåForeldrepengerIEØS
    ) {
        return [];
    }

    const perioder: SaksperiodeNy[] = [];
    const startDatoUttak = UttaksdagenString(farSinFørsteUttaksdag).denneEllerNeste();
    let sisteUttaksDag = UttaksdagenString(farSinFørsteUttaksdag).denneEllerNeste();
    const fedrekvoteKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Fedrekvote);
    const fellesKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Fellesperiode);

    if (fedrekvoteKonto !== undefined) {
        const erPeriodeWLBRundtFødsel =
            situasjon === 'fødsel' &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
                getTidsperiodeString(startDatoUttak, 1),
                familiehendelsesdato,
                termindato,
            );

        const lengdePåForeslåttUttak = erPeriodeWLBRundtFødsel
            ? ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL
            : fedrekvoteKonto.dager;

        const fedrekvotePeriode: SaksperiodeNy = {
            kontoType: StønadskontoType.Fedrekvote,
            fom: getTidsperiodeString(startDatoUttak, lengdePåForeslåttUttak).fom,
            tom: getTidsperiodeString(startDatoUttak, lengdePåForeslåttUttak).tom,
            samtidigUttak: erPeriodeWLBRundtFødsel ? 100 : undefined,
        };

        sisteUttaksDag = UttaksdagenString(fedrekvotePeriode.tom).neste();

        perioder.push(fedrekvotePeriode);
    }

    if (fellesKonto !== undefined) {
        let antallDagerFellesperiode = 0;

        if (antallUkerFellesperiodeFarMedmor !== undefined && antallUkerFellesperiodeFarMedmor !== 0) {
            antallDagerFellesperiode = 5 * antallUkerFellesperiodeFarMedmor;
        }

        if (antallDagerFellesperiode > 0) {
            const fellesPeriode: SaksperiodeNy = {
                kontoType: StønadskontoType.Fellesperiode,
                fom: getTidsperiodeString(sisteUttaksDag, antallDagerFellesperiode).fom,
                tom: getTidsperiodeString(sisteUttaksDag, antallDagerFellesperiode).tom,
            };

            perioder.push(fellesPeriode);
        }
    }

    return perioder;
};

const deltUttakFødsel = (
    famDato: string,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: string,
    fellesperiodeDagerMor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: string | undefined,
    farSinFørsteUttaksdag: string | undefined,
    annenForelderHarRettPåForeldrepengerIEØS: boolean | undefined,
    førsteUttaksdagNesteBarnsSak: string | undefined,
    termindato?: string | undefined,
) => {
    if (!erFarEllerMedmor) {
        return deltUttakFødselMor(famDato, tilgjengeligeStønadskontoer, startdatoPermisjon, fellesperiodeDagerMor);
    } else {
        const tilgjengeligeStønadskontoerUtenFPP = tilgjengeligeStønadskontoer.filter(
            (konto) => konto.konto !== StønadskontoType.ForeldrepengerFørFødsel,
        );

        return deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoerUtenFPP,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag!,
            farSinFørsteUttaksdag!,
            famDato,
            termindato,
            annenForelderHarRettPåForeldrepengerIEØS,
            førsteUttaksdagNesteBarnsSak,
        );
    }
};

export interface DeltUttakParams {
    situasjon: Situasjon;
    famDato: string;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: Stønadskonto[];
    startdatoPermisjon: string;
    fellesperiodeDagerMor: number | undefined;
    harAnnenForelderSøktFP: boolean | undefined;
    antallUkerFellesperiodeFarMedmor: number | undefined;
    morSinSisteUttaksdag: string | undefined;
    farSinFørsteUttaksdag: string | undefined;
    førsteUttaksdagNesteBarnsSak: string | undefined;
    annenForelderHarRettPåForeldrepengerIEØS?: boolean;
    termindato?: string;
}

export const deltUttak = (params: DeltUttakParams) => {
    if (params.situasjon === 'adopsjon') {
        return deltUttakAdopsjon(
            params.famDato,
            params.erFarEllerMedmor,
            params.tilgjengeligeStønadskontoer,
            params.startdatoPermisjon,
            params.fellesperiodeDagerMor,
            params.harAnnenForelderSøktFP,
            params.antallUkerFellesperiodeFarMedmor,
            params.morSinSisteUttaksdag,
            params.farSinFørsteUttaksdag,
            params.førsteUttaksdagNesteBarnsSak,
        );
    }

    if (params.situasjon === 'fødsel') {
        return deltUttakFødsel(
            params.famDato,
            params.erFarEllerMedmor,
            params.tilgjengeligeStønadskontoer,
            params.startdatoPermisjon,
            params.fellesperiodeDagerMor,
            params.antallUkerFellesperiodeFarMedmor,
            params.morSinSisteUttaksdag,
            params.farSinFørsteUttaksdag,
            params.annenForelderHarRettPåForeldrepengerIEØS,
            params.førsteUttaksdagNesteBarnsSak,
            params.termindato,
        );
    }

    return [];
};
