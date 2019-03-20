import { Regelgrunnlag, RegelTest, RegelTestresultat, RegelAvvikIntlInfo } from '../types';
import { erUttaksdag } from '../../../util/uttaksplan/Uttaksdagen';

export const inneholderUttaksplanDatoSomIkkeErUttaksdag: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder.filter(
        ({ tidsperiode: { fom, tom } }) => erUttaksdag(fom) === false || erUttaksdag(tom) === false
    );
    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode): RegelAvvikIntlInfo => {
            return {
                intlKey: `uttaksplan.validering.feil.${
                    erUttaksdag(periode.tidsperiode.fom)
                        ? 'periodeSlutterPåDatoSomIkkeErUttaksdag'
                        : 'periodeStarterPåDatoSomIkkeErUttaksdag'
                }`,
                periodeId: periode.id
            };
        })
    };
};
