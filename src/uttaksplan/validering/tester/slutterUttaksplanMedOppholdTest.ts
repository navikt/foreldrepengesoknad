import { RegelTestresultat, RegelTest } from '../utils/types/regelTypes';
import { isInfoPeriode, Periode, Periodetype } from '../../types/Periode';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const uttaksplanSlutterMedOpphold = (perioder: Periode[]): boolean => {
    return (
        perioder
            .filter((p) => !isInfoPeriode(p))
            .slice()
            .reverse()
            .findIndex((periode) => periode.type === Periodetype.Opphold) === 0
    );
};

export const slutterUttaksplanMedOppholdTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return { passerer: uttaksplanSlutterMedOpphold(grunnlag.perioder) === false };
};
