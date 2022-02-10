import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isInfoPeriode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const uttaksplanStarterMedOpphold = (perioder: Periode[]): boolean => {
    return perioder.filter((p) => !isInfoPeriode(p)).findIndex((periode) => periode.type === Periodetype.Opphold) === 0;
};

export const starterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    if (grunnlag.erEndringssøknad) {
        return { passerer: true };
    }

    return { passerer: uttaksplanStarterMedOpphold(grunnlag.perioder) === false };
};
