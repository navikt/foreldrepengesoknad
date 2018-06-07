// import { Periode, Tidsperiode } from 'uttaksplan/types';
// import {
//     getAntallUttaksdagerITidsperiode,
//     getSisteUttaksdagIPeriode
// } from 'uttaksplan/utils/uttaksdagerUtils';

// const PeriodeHelper = (periode: Periode) => {
//     const getAntallUttaksdager = () => {
//         return getAntallUttaksdagerITidsperiode(periode.tidsperiode);
//     };

//     const getTidsperiode = (startdato: Date): Tidsperiode => {
//         const uttaksdager = getAntallUttaksdager();
//         return {
//             startdato,
//             sluttdato: getSisteUttaksdagIPeriode(startdato, uttaksdager)
//         };
//     };

//     const setStartdato = (startdato: Date): Periode => {
//         return {
//             ...periode,
//             tidsperiode: getTidsperiode(startdato)
//         };
//     };

//     return {
//         getTidsperiode,
//         getAntallUttaksdager
//     };
// };

// export default PeriodeHelper;
