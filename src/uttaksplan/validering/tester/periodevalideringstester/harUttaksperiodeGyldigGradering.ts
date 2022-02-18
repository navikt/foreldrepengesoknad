import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { gradertUttaksperiodeErUgyldig } from '../../utils/periodeValideringUtils';

export const harUttaksperiodeGyldigGradering: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder.filter(gradertUttaksperiodeErUgyldig);
    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
