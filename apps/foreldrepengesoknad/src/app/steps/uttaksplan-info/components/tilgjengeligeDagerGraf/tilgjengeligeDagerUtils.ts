import { Forelder, StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';
import { TilgjengeligeDager } from './../../../../types/TilgjengeligeDager';

export const summerAntallDagerIKontoer = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer.reduce((dager, konto) => konto.dager + dager, 0);
};

const getMorsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Mødrekvote);

const getFarsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Fedrekvote);

const getForeldrepengeKontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Foreldrepenger);

const getFellesStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Fellesperiode);

const kontoErFørTermin = (konto: TilgjengeligStønadskonto): boolean => {
    return konto.konto === StønadskontoType.ForeldrepengerFørFødsel;
};

const kontoErEtterTermin = (konto: TilgjengeligStønadskonto): boolean => {
    return konto.konto !== StønadskontoType.ForeldrepengerFørFødsel;
};

export const getTilgjengeligeDager = (
    kontoer: TilgjengeligStønadskonto[],
    erDeltUttak: boolean,
    forelderVedAleneomsorg: Forelder | undefined,
): TilgjengeligeDager => {
    const kontoerEtterTermin = kontoer.filter(kontoErEtterTermin);

    const dagerTotalt = summerAntallDagerIKontoer(kontoer);
    const dagerForeldrepengerFørFødsel = summerAntallDagerIKontoer(kontoer.filter(kontoErFørTermin));
    const dagerEtterTermin = summerAntallDagerIKontoer(kontoerEtterTermin);
    const dagerForeldrepenger = summerAntallDagerIKontoer(getForeldrepengeKontoer(kontoerEtterTermin));
    const dagerMor = summerAntallDagerIKontoer(getMorsStønadskontoer(kontoerEtterTermin));
    const dagerFar = summerAntallDagerIKontoer(getFarsStønadskontoer(kontoerEtterTermin));
    const dagerFelles = summerAntallDagerIKontoer(getFellesStønadskontoer(kontoerEtterTermin));

    const dagerKunTilMor = erDeltUttak === false && forelderVedAleneomsorg === Forelder.mor;
    const dagerKunTilFar = erDeltUttak === false && forelderVedAleneomsorg === Forelder.farMedmor;

    const maksDagerFar = dagerKunTilFar ? dagerForeldrepenger : dagerFar + dagerFelles;
    const maksDagerMor = dagerKunTilMor ? dagerForeldrepenger + dagerForeldrepengerFørFødsel : dagerMor + dagerFelles;

    return {
        dagerTotalt,
        dagerForeldrepengerFørFødsel,
        dagerEtterTermin,
        dagerForeldrepenger,
        dagerMor,
        dagerFarMedmor: dagerFar,
        dagerFelles,
        maksDagerFar,
        maksDagerMor,
        stønadskontoer: kontoer,
    };
};
