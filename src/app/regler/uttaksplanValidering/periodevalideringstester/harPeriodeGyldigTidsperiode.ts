import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import {
    uttakTidsperiodeErGyldig,
    utsettelseTidsperiodeErGyldig,
} from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import { Periodetype } from 'app/types/uttaksplan/periodetyper';

export const harPeriodeGyldigTidsperiode: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) => {
        switch (periode.type) {
            case Periodetype.Overføring:
            case Periodetype.Uttak:
            case Periodetype.Opphold:
                return uttakTidsperiodeErGyldig(periode, grunnlag.søknadsinfo.søknaden.familiehendelsesdato) === false;
            case Periodetype.Utsettelse:
                return (
                    utsettelseTidsperiodeErGyldig(periode, grunnlag.søknadsinfo.søknaden.familiehendelsesdato) === false
                );
        }
        return false;
    });
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
