import { omit } from 'es-toolkit';

import { UttakPeriodeDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

type Tilpasning = { perioder: UttakPeriodeDto[]; kreverManuellTilpasning: boolean };

const erFarPåFedrekvote = (periode: UttakPeriodeDto) =>
    periode.søker?.forelder === 'FAR_MEDMOR' && periode.søker.kontoType === 'FEDREKVOTE';

export const tilpassFødselspermisjon = (
    perioder: UttakPeriodeDto[],
    familiehendelsesdato: string,
    ønskerFødselspermisjon: boolean,
    erAnnenPartRedigerbar: boolean,
): Tilpasning => {
    const vinduFom = Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato();
    const vinduTom = Uttaksdagen.denne(vinduFom).getDatoAntallUttaksdagerSenere(9);
    const erIVindu = (periode: UttakPeriodeDto) => periode.fom <= vinduTom && periode.tom >= vinduFom;
    const harFødselspermisjon = perioder.some((periode) => erIVindu(periode) && erFarPåFedrekvote(periode));

    if (!ønskerFødselspermisjon && !harFødselspermisjon) {
        return { perioder, kreverManuellTilpasning: false };
    }

    const berørtePerioder = perioder.filter(erIVindu);
    const perioderSomMåEndres = berørtePerioder.filter((periode) =>
        ønskerFødselspermisjon
            ? !erFarPåFedrekvote(periode)
            : erFarPåFedrekvote(periode) || periode.annenPart?.samtidigUttak !== undefined,
    );
    const morsPerioderMåEndres = perioderSomMåEndres.some(
        (periode) =>
            periode.annenPart?.forelder === 'MOR' &&
            (ønskerFødselspermisjon || periode.annenPart.samtidigUttak !== undefined),
    );
    const sortertePerioder = perioder.toSorted((a, b) => a.fom.localeCompare(b.fom));
    const harMorsPerioderMedResultat = perioderSomMåEndres.some(
        (periode) => periode.annenPart?.forelder === 'MOR' && periode.annenPart.resultat,
    );
    const kanIkkeEndreMorsPerioder = morsPerioderMåEndres && (!erAnnenPartRedigerbar || harMorsPerioderMedResultat);
    const kanIkkeFjerneFarsPerioder =
        !ønskerFødselspermisjon &&
        berørtePerioder.some(
            (periode) => erFarPåFedrekvote(periode) && (periode.søker?.resultat || periode.annenPartEøs !== undefined),
        );
    const kanIkkeLeggeTilFarsPerioder =
        ønskerFødselspermisjon &&
        perioderSomMåEndres.some(
            (periode) =>
                periode.søker !== undefined ||
                periode.annenPartEøs !== undefined ||
                (periode.annenPart !== undefined && periode.annenPart.forelder !== 'MOR'),
        );
    const harOverlappendePerioder = sortertePerioder.some((periode, index) => {
        const forrige = sortertePerioder[index - 1];
        return erIVindu(periode) && forrige && erIVindu(forrige) && forrige.tom >= periode.fom;
    });
    if (
        kanIkkeEndreMorsPerioder ||
        kanIkkeFjerneFarsPerioder ||
        kanIkkeLeggeTilFarsPerioder ||
        harOverlappendePerioder
    ) {
        return { perioder, kreverManuellTilpasning: true };
    }

    const endrePeriode = (periode: UttakPeriodeDto, fom: string, tom: string): UttakPeriodeDto[] => {
        const før = periode.fom < fom ? [{ ...periode, tom: Uttaksdagen.forrige(fom).getDato() }] : [];
        const etter = periode.tom > tom ? [{ ...periode, fom: Uttaksdagen.neste(tom).getDato() }] : [];
        const mor = periode.annenPart?.forelder === 'MOR' ? periode.annenPart : undefined;
        const midt: UttakPeriodeDto = ønskerFødselspermisjon
            ? {
                  fom,
                  tom,
                  søker: {
                      forelder: 'FAR_MEDMOR',
                      kontoType: 'FEDREKVOTE',
                      flerbarnsdager: false,
                      ...(mor && { samtidigUttak: 100 }),
                  },
                  ...(periode.annenPart && {
                      annenPart: mor ? { ...mor, samtidigUttak: 100 } : periode.annenPart,
                  }),
              }
            : {
                  ...periode,
                  fom,
                  tom,
                  søker: erFarPåFedrekvote(periode) ? undefined : periode.søker,
                  annenPart: mor ? omit(mor, ['samtidigUttak']) : periode.annenPart,
              };

        return [...før, ...(midt.søker || midt.annenPart ? [midt] : []), ...etter];
    };

    const resultat: UttakPeriodeDto[] = [];
    let nesteLedigeDag = vinduFom;
    for (const periode of sortertePerioder) {
        if (!erIVindu(periode)) {
            resultat.push(periode);
            continue;
        }

        const fom = [periode.fom, vinduFom].toSorted((a, b) => a.localeCompare(b)).at(-1)!;
        const tom = [periode.tom, vinduTom].toSorted((a, b) => a.localeCompare(b))[0]!;
        if (ønskerFødselspermisjon && nesteLedigeDag < fom) {
            resultat.push(
                ...endrePeriode(
                    { fom: nesteLedigeDag, tom: Uttaksdagen.forrige(fom).getDato() },
                    nesteLedigeDag,
                    Uttaksdagen.forrige(fom).getDato(),
                ),
            );
        }
        const beholdPeriode = ønskerFødselspermisjon
            ? erFarPåFedrekvote(periode)
            : !erFarPåFedrekvote(periode) && periode.annenPart?.samtidigUttak === undefined;
        resultat.push(...(beholdPeriode ? [periode] : endrePeriode(periode, fom, tom)));
        nesteLedigeDag = Uttaksdagen.neste(tom).getDato();
    }
    if (ønskerFødselspermisjon && nesteLedigeDag <= vinduTom) {
        resultat.push(...endrePeriode({ fom: nesteLedigeDag, tom: vinduTom }, nesteLedigeDag, vinduTom));
    }

    return { perioder: resultat.toSorted((a, b) => a.fom.localeCompare(b.fom)), kreverManuellTilpasning: false };
};
