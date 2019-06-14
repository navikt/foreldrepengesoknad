import { Søkersituasjon } from '../../../types/søknad/Søknad';
import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Periodetype,
    UttaksperiodeBase,
    isUttaksperiode,
    UtsettelseÅrsakType
} from '../../../types/uttaksplan/periodetyper';
import { Uttaksdagen } from '../Uttaksdagen';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { getTidsperiode, Tidsperioden } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';
import { DateValue } from '../../../types/common';
import { dateIsSameOrAfter } from '../../../../app/util/dates/dates';
import { skalFarUtsetteEtterMorSinSisteUttaksdag } from 'app/steg/uttaksplanSkjema/utils';
import * as moment from 'moment';

const deltUttakAdopsjonSøktFørst = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined
): Periode[] => {
    if (harAnnenForelderSøktFP !== true) {
        const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
        const perioder: Periode[] = [];
        const kontoType = erFarEllerMedmor ? StønadskontoType.Fedrekvote : StønadskontoType.Mødrekvote;
        const forelder = erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
        const konto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
            (k) =>
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
                gradert: false
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
                gradert: false
            };

            perioder.push(periodeFellesperiode);
        }

        return perioder.sort(sorterPerioder);
    } else {
        return [];
    }
};

const deltUttakAdopsjonSøktSist = (
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
            begrunnelseForUtsettelse
        );
    } else {
        const forslag = deltUttakFødselFarMedmor(
            tilgjengeligeStønadskontoer,
            antallDagerFellesperiodeFarMedmor,
            antallUkerFellesperiodeFarMedmor,
            morSinSisteUttaksdag,
            farSinFørsteUttaksdag,
            begrunnelseForUtsettelse
        ).map((periode) => {
            if (
                isUttaksperiode(periode) &&
                (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.Fellesperiode)
            ) {
                if (periode.konto === StønadskontoType.Fedrekvote) {
                    return {
                        ...periode,
                        stønadskonto: StønadskontoType.Mødrekvote,
                        forelder: Forelder.mor
                    };
                } else {
                    return {
                        ...periode,
                        forelder: Forelder.mor
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
    startdatoPermisjon: DateValue,
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
    ønsketStartdatoPermisjon: DateValue,
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
                vedlegg: []
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
                tom: Uttaksdagen(currentTomDate).forrige()
            }
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
            vedlegg: []
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
            gradert: false
        };

        currentTomDate = Uttaksdagen(periodeMødrekvote.tidsperiode.tom).neste();

        perioder.push(periodeMødrekvote);
    }

    if (fellesperiodeukerMor !== undefined && fellesperiodeukerMor > 0) {
        const ekstraPermisjonFørFødsel = perioder.find(
            (p: UttaksperiodeBase) => p.konto === StønadskontoType.Fellesperiode
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
                gradert: false
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
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined
): Periode[] => {
    if (dateIsSameOrAfter(morSinSisteUttaksdag, farSinFørsteUttaksdag)) {
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
                tom: moment(farSinFørsteUttaksdag)
                    .subtract(1, 'days')
                    .toDate()
            }
        });
    }

    if (fedrekvoteKonto !== undefined) {
        const fedrekvotePeriode: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getTidsperiode(startDatoUttak, fedrekvoteKonto.dager),
            ønskerSamtidigUttak: false,
            gradert: false
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
                gradert: false
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
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined,
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined
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
            begrunnelseForUtsettelse
        );
    }
};

export const deltUttak = (
    situasjon: Søkersituasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined,
    antallDagerFellesperiodeFarMedmor: number | undefined,
    antallUkerFellesperiodeFarMedmor: number | undefined,
    morSinSisteUttaksdag: Date | undefined,
    farSinFørsteUttaksdag: Date | undefined,
    begrunnelseForUtsettelse: UtsettelseÅrsakType | undefined
) => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
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

    if (situasjon === Søkersituasjon.FØDSEL) {
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
            begrunnelseForUtsettelse
        );
    }
    return [];
};
