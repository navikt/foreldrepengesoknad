import {
    StønadskontoUttak,
    Uttaksperiode,
    Periode,
    StønadskontoType
} from 'uttaksplan/types';
import { periodene, perioden } from 'uttaksplan/utils/dataUtils';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

const summerDager = (a: number, b: StønadskontoUttak) => a + b.dager;
const summerUttaksdager = (a: number, b: Uttaksperiode) =>
    a + perioden(b).getAntallUttaksdager();

export interface BeregnetUttak {
    navn: string;
    dager: number;
    overforbruk?: boolean;
}

export function beregnUttak(
    perioder: Periode[],
    kontoer: StønadskontoType[],
    tilgjengeligUttak: StønadskontoUttak[]
): number {
    const tilgjengelig = tilgjengeligUttak
        .filter((tu) => kontoer.includes(tu.konto))
        .reduce(summerDager, 0);
    const brukt = periodene(perioder)
        .getUttak()
        .filter((up) => kontoer.includes(up.konto))
        .reduce(summerUttaksdager, 0);

    return tilgjengelig - brukt;
}

function getBeregnetUttak(
    navn: string,
    perioder: Periode[],
    kontoer: StønadskontoType[],
    tilgjengeligUttak: StønadskontoUttak[]
): BeregnetUttak {
    const dager = beregnUttak(perioder, kontoer, tilgjengeligUttak);
    return {
        navn,
        dager,
        overforbruk: dager < 0
    };
}

export function beregnAlleUttak(
    perioder: Periode[],
    uttaksgrunnlag: Uttaksgrunnlag
): BeregnetUttak[] {
    const uttak: BeregnetUttak[] = [];
    const { søker, annenForelder, tilgjengeligUttak } = uttaksgrunnlag;
    if (annenForelder && annenForelder.skalHaForeldrepenger) {
        uttak.push(
            getBeregnetUttak(
                søker.fornavn,
                perioder,
                [
                    StønadskontoType.ForeldrepengerFørFødsel,
                    StønadskontoType.Mødrekvote
                ],
                tilgjengeligUttak
            )
        );
        uttak.push(
            getBeregnetUttak(
                annenForelder.fornavn,
                perioder,
                [StønadskontoType.Fedrekvote],
                tilgjengeligUttak
            )
        );
        uttak.push(
            getBeregnetUttak(
                'fellesdel',
                perioder,
                [StønadskontoType.Fellesperiode],
                uttaksgrunnlag.tilgjengeligUttak
            )
        );
    } else {
        uttak.push({
            navn: søker.fornavn,
            dager: 0
        });
    }
    return uttak;
}
