import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import {
    uttakTidsperiodeErGyldig,
    utsettelseTidsperiodeErGyldig
} from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import { Periodetype } from 'app/types/uttaksplan/periodetyper';

export const harPeriodeGyldigTidsperiode: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) => {
        if (
            periode.type === Periodetype.Overføring ||
            periode.type === Periodetype.Uttak ||
            periode.type === Periodetype.Opphold
        ) {
            return uttakTidsperiodeErGyldig(periode, grunnlag.søknadsinfo.søknaden.familiehendelsesdato) === false;
        }
        if (periode.type === Periodetype.Utsettelse) {
            utsettelseTidsperiodeErGyldig(periode, grunnlag.søknadsinfo.søknaden.familiehendelsesdato);
        }
        return false;
    });
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            periodeId: periode.id
        }))
    };
};
