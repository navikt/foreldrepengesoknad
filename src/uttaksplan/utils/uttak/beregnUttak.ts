import { StønadskontoUttak, Uttaksperiode, Periode, StønadskontoType } from 'uttaksplan/types';
import { Perioden, Periodene } from 'uttaksplan/utils';

const summerDager = (a: number, b: StønadskontoUttak) => a + b.dager;
const summerUttaksdager = (a: number, b: Uttaksperiode) => a + Perioden(b).getAntallUttaksdager();

export function beregnUttak(
    perioder: Periode[],
    stønadskontoer: StønadskontoType[],
    tilgjengeligUttak: StønadskontoUttak[]
): number {
    const tilgjengelig = tilgjengeligUttak.filter((tu) => stønadskontoer.includes(tu.konto)).reduce(summerDager, 0);
    const brukt = Periodene(perioder)
        .getUttak()
        .filter((up) => stønadskontoer.includes(up.konto))
        .reduce(summerUttaksdager, 0);

    return tilgjengelig - brukt;
}

// function getBeregnetUttak(
//     navn: string,
//     perioder: Periode[],
//     kontoer: StønadskontoType[],
//     tilgjengeligUttak: StønadskontoUttak[]
// ): BeregnetUttak {
//     const dager = beregnUttak(perioder, kontoer, tilgjengeligUttak);
//     return {
//         navn,
//         dager,
//         overforbruk: dager < 0
//     };
// }

// export function beregnAlleUttakEnkel(
//     perioder: Periode[],
//     uttaksgrunnlag: Uttaksgrunnlag
// ): BeregnetUttak[] {
//     const uttak: BeregnetUttak[] = [];
//     const { søker, annenForelder, tilgjengeligeUttak } = uttaksgrunnlag;
//     if (annenForelder) {
//         uttak.push(
//             getBeregnetUttak(
//                 søker.fornavn,
//                 perioder,
//                 [StønadskontoType.MorsDelFørTermin, StønadskontoType.MorsDel],
//                 tilgjengeligeUttak
//             )
//         );
//         uttak.push(
//             getBeregnetUttak(
//                 annenForelder.fornavn,
//                 perioder,
//                 [StønadskontoType.FarsDel],
//                 tilgjengeligeUttak
//             )
//         );
//         uttak.push(
//             getBeregnetUttak(
//                 'Fellesdel',
//                 perioder,
//                 [StønadskontoType.Fellesperiode],
//                 uttaksgrunnlag.tilgjengeligeUttak
//             )
//         );
//     } else {
//         uttak.push({
//             navn: søker.fornavn,
//             dager: 0
//         });
//     }
//     return uttak;
// }
