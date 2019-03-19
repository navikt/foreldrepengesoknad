import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';

export const inneholderStønadskontoForMyeUttakTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    return {
        passerer: grunnlag.uttaksstatusStønadskontoer.filter((u) => u.antallDager < 0).length > 0
    };
};
