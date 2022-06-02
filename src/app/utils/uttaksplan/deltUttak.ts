import { sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { getTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { guid } from 'nav-frontend-js-utils';
import { isUttaksperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { andreAugust2022ReglerGjelder, dateIsSameOrAfter, skalFarUtsetteEtterMorSinSisteUttaksdag } from '../dateUtils';
import {
    getLengdePåForeslåttWLBUttakFarMedmor,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
} from '../wlbUtils';

const deltUttakAdopsjonSøktFørst = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined
): Periode[] => {
    if (harAnnenForelderSøktFP !== true) {
        const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
        const perioder: Periode[] = [];
        const kontoType = erFarEllerMedmor ? StønadskontoType.Fedrekvote : StønadskontoType.Mødrekvote;
        const forelder = erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
        const konto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find((k) =>
            erFarEllerMedmor ? k.konto === StønadskontoType.Fedrekvote : k.konto === StønadskontoType.Mødrekvote
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

            perioder.push(periodeMødrekvote);
        }

        if (fellesperiodeukerMor !== undefined && fellesperiodeukerMor > 0) {
            const periodeFellesperiode: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(currentTomDate, fellesperiodeukerMor * 5),
                ønskerSamtidigUttak: false,
                gradert: false,
            };

            perioder.push(periodeFellesperiode);
        }

        return perioder.sort(sorterPerioder);
    } else {
        return [];
    }
};

const deltUttakAdopsjonSøktSist = (
    familiehendelsesdato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date,
    farSinFørsteUttaksdag: Date,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined
) => {
    if (erFarEllerMedmor) {
        // Oppfører seg identisk som fødselsscenario
        return deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoer,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            begrunnelseForUtsettelse,
            familiehendelsesdato,
            undefined,
            'adopsjon'
        );
    } else {
        const forslag = deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoer,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            begrunnelseForUtsettelse,
            familiehendelsesdato,
            undefined,
            'adopsjon'
        ).map((periode) => {
            if (
                isUttaksperiode(periode) &&
                (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.Fellesperiode)
            ) {
                if (periode.konto === StønadskontoType.Fedrekvote) {
                    return {
                        ...periode,
                        stønadskonto: StønadskontoType.Mødrekvote,
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

        return forslag;
    }
};

const deltUttakAdopsjon = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined
) => {
    if (!harAnnenForelderSøktFP) {
        return deltUttakAdopsjonSøktFørst(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor,
            harAnnenForelderSøktFP
        );
    } else {
        return deltUttakAdopsjonSøktSist(
            famDato,
            tilgjengeligeStønadskontoer,
            erFarEllerMedmor,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag!,
            farSinFørsteUttaksdag!,
            begrunnelseForUtsettelse
        );
    }
};

const deltUttakFødselMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    ønsketStartdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined
): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = ønsketStartdatoPermisjon ? true : false;
    const fpFørFødselKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Mødrekvote
    );
    let currentTomDate: Date = førsteUttaksdag;
    if (fpFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && ønsketStartdatoPermisjon) {
        const startdatoPermisjon = Uttaksdagen(ønsketStartdatoPermisjon).denneEllerNeste();
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(currentTomDate);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
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
            tidsperiode: {} as any,
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

    if (fellesperiodeukerMor !== undefined && fellesperiodeukerMor > 0) {
        const ekstraPermisjonFørFødsel = perioder.find(
            (p) => isUttaksperiode(p) && p.konto === StønadskontoType.Fellesperiode
        );

        let trekkEkstraPermisjonDager = 0;
        if (ekstraPermisjonFørFødsel) {
            trekkEkstraPermisjonDager = Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager();
        }

        if (fellesperiodeukerMor * 5 - trekkEkstraPermisjonDager > 0) {
            const periodeFellesperiodeMor: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.mor,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(currentTomDate, fellesperiodeukerMor * 5 - trekkEkstraPermisjonDager),
                ønskerSamtidigUttak: false,
                gradert: false,
            };

            perioder.push(periodeFellesperiodeMor);
        }
    }

    return perioder.sort(sorterPerioder);
};

const deltUttakFødselFarMedmor = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date,
    farSinFørsteUttaksdag: Date,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon = 'fødsel'
): Periode[] => {
    if (
        !andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        dateIsSameOrAfter(morSinSisteUttaksdag, farSinFørsteUttaksdag)
    ) {
        return [];
    }

    const perioder: Periode[] = [];
    const startDatoUttak = Uttaksdagen(farSinFørsteUttaksdag).denneEllerNeste();
    let sisteUttaksDag = Uttaksdagen(farSinFørsteUttaksdag).denneEllerNeste();
    const fedrekvoteKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Fedrekvote
    );
    const fellesKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Fellesperiode
    );

    if (
        begrunnelseForUtsettelse &&
        morSinSisteUttaksdag !== undefined &&
        skalFarUtsetteEtterMorSinSisteUttaksdag(farSinFørsteUttaksdag, morSinSisteUttaksdag)
    ) {
        perioder.push({
            id: guid(),
            årsak: begrunnelseForUtsettelse,
            type: Periodetype.Utsettelse,
            forelder: Forelder.farMedmor,
            erArbeidstaker: false, // TODO
            tidsperiode: {
                fom: Uttaksdagen(morSinSisteUttaksdag).neste(),
                tom: Uttaksdagen(farSinFørsteUttaksdag).forrige(),
            },
        });
    }

    if (fedrekvoteKonto !== undefined) {
        const erPeriodeWLBRundtFødsel =
            situasjon === 'fødsel' &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
                getTidsperiode(startDatoUttak, 1),
                familiehendelsesdato,
                termindato
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
            gradert: false,
        };

        sisteUttaksDag = Uttaksdagen(fedrekvotePeriode.tidsperiode.tom).neste();

        perioder.push(fedrekvotePeriode);
    }

    if (fellesKonto !== undefined) {
        let antallDagerFellesperiode = 0;

        if (antallUkerFellesperiodeFarMedmor !== undefined && antallUkerFellesperiodeFarMedmor !== 0) {
            antallDagerFellesperiode = 5 * antallUkerFellesperiodeFarMedmor;
        }

        if (antallDagerFellesperiodeFarMedmor !== undefined && antallDagerFellesperiodeFarMedmor !== 0) {
            antallDagerFellesperiode = antallDagerFellesperiode + antallDagerFellesperiodeFarMedmor;
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
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined,
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined,
    termindato?: Date | undefined
) => {
    if (!erFarEllerMedmor) {
        return deltUttakFødselMor(famDato, tilgjengeligeStønadskontoer, startdatoPermisjon, fellesperiodeukerMor);
    } else {
        const tilgjengeligeStønadskontoerUtenFPP = tilgjengeligeStønadskontoer.filter(
            (konto) => konto.konto !== StønadskontoType.ForeldrepengerFørFødsel
        );

        return deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoerUtenFPP,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag!,
            farSinFørsteUttaksdag!,
            begrunnelseForUtsettelse,
            famDato,
            termindato
        );
    }
};

export const deltUttak = (
    situasjon: Situasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined,
    termindato?: Date | undefined
) => {
    if (situasjon === 'adopsjon') {
        return deltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor,
            harAnnenForelderSøktFP,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            begrunnelseForUtsettelse
        );
    }

    if (situasjon === 'fødsel') {
        return deltUttakFødsel(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            begrunnelseForUtsettelse,
            termindato
        );
    }

    return [];
};
