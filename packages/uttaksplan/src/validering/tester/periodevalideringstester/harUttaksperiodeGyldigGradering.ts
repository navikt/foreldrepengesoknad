import { gradertUttaksperiodeErUgyldig } from '../../utils/periodeValideringUtils';
import { Søknadsinfo } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../../utils/types/regelTypes';

export const harUttaksperiodeGyldigGradering: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder.filter(gradertUttaksperiodeErUgyldig);
    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
