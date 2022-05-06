import { sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { getTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { guid } from 'nav-frontend-js-utils';
import { isUttaksperiode, Periode, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { andreAugust2022ReglerGjelder } from '../dateUtils';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: TilgjengeligStønadskonto | undefined
) => {
    const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [];

    if (erMorUfør !== true) {
        const periode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager),
            vedlegg: [],
            gradert: false,
        };

        perioder.push(periode);
    } else {
        const aktivitetsFriPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.AktivitetsfriKvote,
            tidsperiode: getTidsperiode(førsteUttaksdag, aktivitetsfriKvote!.dager),
            vedlegg: [],
            gradert: false,
            harIkkeAktivitetskrav: true,
        };

        perioder.push(aktivitetsFriPeriode);

        const aktivitetskravPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Foreldrepenger,
            tidsperiode: getTidsperiode(
                Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste(),
                foreldrepengerKonto.dager
            ),
            vedlegg: [],
            gradert: false,
        };

        perioder.push(aktivitetskravPeriode);
    }

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined
) => {
    const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager),
            vedlegg: [],
            gradert: false,
        },
    ];
    return perioder;
};

const ikkeDeltUttakAdopsjon = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: TilgjengeligStønadskonto | undefined
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonMor(famDato, foreldrepengerKonto, startdatoPermisjon);
    } else {
        return ikkeDeltUttakAdopsjonFarMedmor(
            famDato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote
        );
    }
};

const ikkeDeltUttakFødselMor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined,
    foreldrePengerFørFødselKonto: TilgjengeligStønadskonto
) => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = startdatoPermisjon ? true : false;

    if (foreldrePengerFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(førsteUttaksdag);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.mor,
                konto: StønadskontoType.Foreldrepenger,
                tidsperiode: getTidsperiode(startdatoPermisjon, dagerFørFødsel - 15),
                vedlegg: [],
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: foreldrePengerFørFødselKonto.konto,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(førsteUttaksdag).forrige(),
            },
            vedlegg: [],
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

    const ekstraPermisjonFørFødsel = perioder.find(
        (p) => isUttaksperiode(p) && p.konto === StønadskontoType.Foreldrepenger
    );

    const antallDagerIForeldrepenger = ekstraPermisjonFørFødsel
        ? getTidsperiode(
              førsteUttaksdag,
              foreldrepengerKonto.dager - Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager()
          )
        : getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: Periode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: Forelder.mor,
        konto: foreldrepengerKonto.konto,
        tidsperiode: antallDagerIForeldrepenger,
        vedlegg: [],
        gradert: false,
    };

    perioder.push(foreldrepengerPeriode);

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødselFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: TilgjengeligStønadskonto | undefined,
    bareFarMedmorHarRett: boolean
) => {
    const startDato = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();

    const perioder: Periode[] = [];

    if (erMorUfør !== true) {
        let starteDatoNestePeriode = startDato;
        if (andreAugust2022ReglerGjelder(famDato) && !!bareFarMedmorHarRett) {
            const aktivitetsFriPeriode: Uttaksperiode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.AktivitetsfriKvote,
                tidsperiode: getTidsperiode(startDato, aktivitetsfriKvote!.dager),
                vedlegg: [],
                gradert: false,
                harIkkeAktivitetskrav: true,
            };
            perioder.push(aktivitetsFriPeriode);
            starteDatoNestePeriode = Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste();
        }

        const periode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(starteDatoNestePeriode, foreldrepengerKonto.dager),
            vedlegg: [],
            gradert: false,
        };

        perioder.push(periode);
    } else {
        const aktivitetsFriPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.AktivitetsfriKvote,
            tidsperiode: getTidsperiode(startDato, aktivitetsfriKvote!.dager),
            vedlegg: [],
            gradert: false,
            harIkkeAktivitetskrav: true,
        };

        perioder.push(aktivitetsFriPeriode);

        const aktivitetskravPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Foreldrepenger,
            tidsperiode: getTidsperiode(
                Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste(),
                foreldrepengerKonto.dager
            ),
            vedlegg: [],
            gradert: false,
        };

        perioder.push(aktivitetskravPeriode);
    }

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødsel = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined,
    foreldrePengerFørFødselKonto: TilgjengeligStønadskonto | undefined,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: TilgjengeligStønadskonto | undefined,
    bareFarMedmorHarRett: boolean
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakFødselMor(famDato, foreldrepengerKonto, startdatoPermisjon, foreldrePengerFørFødselKonto!);
    } else {
        return ikkeDeltUttakFødselFarMedmor(
            famDato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett
        );
    }
};

export const ikkeDeltUttak = (
    situasjon: Situasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    erMorUfør: boolean | undefined,
    bareFarMedmorHarRett: boolean
) => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Foreldrepenger
    );
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.AktivitetsfriKvote
    );

    if (situasjon === 'adopsjon') {
        return ikkeDeltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote
        );
    }

    if (situasjon === 'fødsel') {
        return ikkeDeltUttakFødsel(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            foreldrePengerFørFødselKonto,
            erMorUfør,
            aktivitetsfriKvote,
            bareFarMedmorHarRett
        );
    }

    return [];
};
