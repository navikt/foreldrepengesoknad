import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isInfoPeriode, Periode, Periodetype } from 'uttaksplan/types/Periode';

const uttaksplanErBareOpphold = (perioder: Periode[]): boolean => {
    if (perioder.length === 0) {
        return false;
    }

    return perioder.filter((p) => !isInfoPeriode(p)).every((periode) => periode.type === Periodetype.Opphold);
};

export const erUttaksplanBareOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanErBareOpphold(grunnlag.perioder) === false };
};
