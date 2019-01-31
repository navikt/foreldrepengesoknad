import { Periode, isUtsettelsesperiode, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { Tidsperioden, getTidsperiode } from 'app/util/uttaksplan/Tidsperioden';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { guid } from 'nav-frontend-js-utils';

export const hullMellomSisteUttaksdatoMorFørsteUttaksdatoFar = (
    perioder: Periode[],
    morSluttdato: Date | undefined,
    farStartdato: Date | undefined
): Periode[] => {
    if (morSluttdato === undefined || farStartdato === undefined) {
        return perioder;
    } else {
        if (perioder.length > 0) {
            const førstePeriode = perioder[0];

            if (isUtsettelsesperiode(førstePeriode)) {
                return perioder;
            } else {
                const førsteUttaksdato = førstePeriode.tidsperiode.fom;

                const hullMellomFarOgMorDager =
                    Tidsperioden({
                        fom: Uttaksdagen(morSluttdato).neste(),
                        tom: Uttaksdagen(førsteUttaksdato).denneEllerNeste()
                    }).getAntallUttaksdager() - 1;

                if (hullMellomFarOgMorDager > 0) {
                    const hullPeriode: Periode = {
                        id: guid(),
                        type: Periodetype.Hull,
                        tidsperiode: getTidsperiode(Uttaksdagen(morSluttdato).neste(), hullMellomFarOgMorDager)
                    };

                    perioder.unshift(hullPeriode);
                }

                return perioder;
            }
        } else {
            const hullMellomFarOgMorDager =
                Tidsperioden({
                    fom: Uttaksdagen(morSluttdato).neste(),
                    tom: Uttaksdagen(farStartdato).denneEllerNeste()
                }).getAntallUttaksdager() - 1;

            if (hullMellomFarOgMorDager > 0) {
                const hullPeriode: Periode = {
                    id: guid(),
                    type: Periodetype.Hull,
                    tidsperiode: getTidsperiode(Uttaksdagen(morSluttdato).neste(), hullMellomFarOgMorDager)
                };

                perioder.unshift(hullPeriode);
            }

            return perioder;
        }
    }
};
