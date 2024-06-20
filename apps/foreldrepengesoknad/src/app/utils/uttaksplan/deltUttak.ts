import dayjs from 'dayjs';

import {
    Forelder,
    Periode,
    Periodetype,
    Situasjon,
    StønadskontoType,
    Tidsperioden,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    dateIsSameOrAfter,
    farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato,
    getLengdePåForeslåttWLBUttakFarMedmor,
    getTidsperiode,
    guid,
    isUttaksperiode,
    sorterPerioder,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
    tidperiodeOverlapperDato,
} from '@navikt/fp-common';
import { Stønadskonto } from '@navikt/fp-types/src/TilgjengeligeStønadskontoer';
import { splittPeriodePåDato, splittUttaksperiodePåFamiliehendelsesdato } from '@navikt/fp-uttaksplan';

const deltUttakAdopsjonSøktFørst = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeDagerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): Periode[] => {
    if (harAnnenForelderSøktFP !== true) {
        const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
        const perioder: Periode[] = [];
        const kontoType = erFarEllerMedmor ? StønadskontoType.Fedrekvote : StønadskontoType.Mødrekvote;
        const forelder = erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
        const konto = tilgjengeligeStønadskontoer.find((k) =>
            erFarEllerMedmor ? k.konto === StønadskontoType.Fedrekvote : k.konto === StønadskontoType.Mødrekvote,
        );
        let currentTomDate: Date = førsteUttaksdag;

        if (konto !== undefined) {
            const periodeMødrekvote: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder,
                konto: kontoType,
                tidsperiode: getTidsperiode(currentTomDate, konto.dager),
                ønskerSamtidigUttak: false,
                gradert: false,
            };

            currentTomDate = Uttaksdagen(periodeMødrekvote.tidsperiode.tom).neste();

            if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(periodeMødrekvote.tidsperiode, førsteUttaksdagNesteBarnsSak)
            ) {
                const splittedePerioder = splittPeriodePåDato(periodeMødrekvote, førsteUttaksdagNesteBarnsSak);
                splittedePerioder.forEach((periode) => perioder.push(periode));
            } else {
                perioder.push(periodeMødrekvote);
            }
        }

        if (fellesperiodeDagerMor !== undefined && fellesperiodeDagerMor > 0) {
            const periodeFellesperiode: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(currentTomDate, fellesperiodeDagerMor),
                ønskerSamtidigUttak: false,
                gradert: false,
            };
            if (
                førsteUttaksdagNesteBarnsSak !== undefined &&
                tidperiodeOverlapperDato(periodeFellesperiode.tidsperiode, førsteUttaksdagNesteBarnsSak)
            ) {
                const splittedePerioder = splittPeriodePåDato(periodeFellesperiode, førsteUttaksdagNesteBarnsSak);
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
    familiehendelsesdato: Date,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    erFarEllerMedmor: boolean,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date,
    farSinFørsteUttaksdag: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
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
            førsteUttaksdagNesteBarnsSak,
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
            førsteUttaksdagNesteBarnsSak,
            'adopsjon',
        );

        const forslagGjortOmTilMor = forslag.map((periode) => {
            if (
                isUttaksperiode(periode) &&
                (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.Fellesperiode)
            ) {
                if (periode.konto === StønadskontoType.Fedrekvote) {
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
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeDagerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
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
            førsteUttaksdagNesteBarnsSak,
        );
    }
};

const deltUttakFødselMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    ønsketStartdatoPermisjon: Date,
    fellesperiodeDagerMor: number | undefined,
): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = dayjs(ønsketStartdatoPermisjon).isBefore(dayjs(famDato), 'd');
    const fpFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel,
    );
    const mkKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Mødrekvote);
    let currentTomDate: Date = førsteUttaksdag;
    if (fpFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && ønsketStartdatoPermisjon) {
        const startdatoPermisjon = Uttaksdagen(ønsketStartdatoPermisjon).denneEllerNeste();
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(currentTomDate);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel,
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.mor,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(startdatoPermisjon, dagerFørFødsel - 15),
                vedlegg: [],
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(currentTomDate).forrige(),
            },
        };

        perioder.push(periodeFørFødsel);
    } else {
        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            skalIkkeHaUttakFørTermin: true,
            tidsperiode: {
                fom: Uttaksdagen(currentTomDate).trekkFra(15),
                tom: Uttaksdagen(currentTomDate).forrige(),
            },
            vedlegg: [],
        };
        perioder.push(periodeFørFødsel);
    }

    if (mkKonto !== undefined) {
        const periodeMødrekvote: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getTidsperiode(currentTomDate, mkKonto.dager),
            ønskerSamtidigUttak: false,
            gradert: false,
        };

        currentTomDate = Uttaksdagen(periodeMødrekvote.tidsperiode.tom).neste();

        perioder.push(periodeMødrekvote);
    }

    if (fellesperiodeDagerMor !== undefined && fellesperiodeDagerMor > 0) {
        const ekstraPermisjonFørFødsel = perioder.find(
            (p) => isUttaksperiode(p) && p.konto === StønadskontoType.Fellesperiode,
        );

        let trekkEkstraPermisjonDager = 0;
        if (ekstraPermisjonFørFødsel) {
            trekkEkstraPermisjonDager = Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager();
        }

        if (fellesperiodeDagerMor - trekkEkstraPermisjonDager > 0) {
            const periodeFellesperiodeMor: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.mor,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(currentTomDate, fellesperiodeDagerMor - trekkEkstraPermisjonDager),
                ønskerSamtidigUttak: false,
                gradert: false,
            };

            perioder.push(periodeFellesperiodeMor);
        }
    }

    return perioder.sort(sorterPerioder);
};

const deltUttakFødselFarMedmor = (
    tilgjengeligeStønadskontoer: Stønadskonto[],
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date,
    farSinFørsteUttaksdag: Date,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    morHarRettPåForeldrepengerIEØS: boolean | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    situasjon = 'fødsel',
): Periode[] => {
    if (
        !andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        dateIsSameOrAfter(morSinSisteUttaksdag, farSinFørsteUttaksdag) &&
        !morHarRettPåForeldrepengerIEØS
    ) {
        return [];
    }

    const perioder: Periode[] = [];
    const startDatoUttak = Uttaksdagen(farSinFørsteUttaksdag).denneEllerNeste();
    let sisteUttaksDag = Uttaksdagen(farSinFørsteUttaksdag).denneEllerNeste();
    const fedrekvoteKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Fedrekvote);
    const fellesKonto = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Fellesperiode);

    const morHarRett = true;

    if (fedrekvoteKonto !== undefined) {
        const erPeriodeWLBRundtFødsel =
            situasjon === 'fødsel' &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
                getTidsperiode(startDatoUttak, 1),
                familiehendelsesdato,
                termindato,
            );

        const lengdePåForeslåttUttak = erPeriodeWLBRundtFødsel
            ? getLengdePåForeslåttWLBUttakFarMedmor(familiehendelsesdato, startDatoUttak)
            : fedrekvoteKonto.dager;

        const fedrekvotePeriode: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getTidsperiode(startDatoUttak, lengdePåForeslåttUttak),
            ønskerSamtidigUttak: erPeriodeWLBRundtFødsel,
            samtidigUttakProsent: erPeriodeWLBRundtFødsel ? '100' : undefined,
        };

        sisteUttaksDag = Uttaksdagen(fedrekvotePeriode.tidsperiode.tom).neste();

        if (
            farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
                fedrekvotePeriode,
                familiehendelsesdato,
                morHarRett,
                termindato,
            )
        ) {
            const fedrekvotePerioder = splittUttaksperiodePåFamiliehendelsesdato(
                fedrekvotePeriode,
                familiehendelsesdato,
            );
            fedrekvotePerioder.forEach((periode) => perioder.push(periode));
        } else if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(fedrekvotePeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const fedrekvotePerioder = splittPeriodePåDato(fedrekvotePeriode, førsteUttaksdagNesteBarnsSak);
            fedrekvotePerioder.forEach((periode) => perioder.push(periode));
        } else {
            perioder.push(fedrekvotePeriode);
        }
    }

    if (fellesKonto !== undefined) {
        let antallDagerFellesperiode = 0;

        if (antallUkerFellesperiodeFarMedmor !== undefined && antallUkerFellesperiodeFarMedmor !== 0) {
            antallDagerFellesperiode = 5 * antallUkerFellesperiodeFarMedmor;
        }

        if (antallDagerFellesperiode > 0) {
            const fellesPeriode: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(sisteUttaksDag, antallDagerFellesperiode),
                ønskerSamtidigUttak: false,
                gradert: false,
            };

            perioder.push(fellesPeriode);
        }
    }

    return perioder;
};

const deltUttakFødsel = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: Stønadskonto[],
    startdatoPermisjon: Date,
    fellesperiodeDagerMor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    annenForelderHarRettPåForeldrepengerIEØS: boolean | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    termindato?: Date | undefined,
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
    famDato: Date;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: Stønadskonto[];
    startdatoPermisjon: Date;
    fellesperiodeDagerMor: number | undefined;
    harAnnenForelderSøktFP: boolean | undefined;
    antallUkerFellesperiodeFarMedmor: number | undefined;
    morSinSisteUttaksdag: Date | undefined;
    farSinFørsteUttaksdag: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    annenForelderHarRettPåForeldrepengerIEØS?: boolean;
    termindato?: Date;
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
