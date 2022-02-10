import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Periodetype } from 'uttaksplan/types/Periode';
import { utsettelseTidsperiodeErGyldig, uttakTidsperiodeErGyldig } from '../../utils/tidsperiodeValideringUtils';

export const harPeriodeGyldigTidsperiode: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) => {
        switch (periode.type) {
            case Periodetype.Overføring:
            case Periodetype.Uttak:
            case Periodetype.Opphold:
                return uttakTidsperiodeErGyldig(periode, grunnlag.familiehendelsesdato) === false;
            case Periodetype.Utsettelse:
                return utsettelseTidsperiodeErGyldig(periode, grunnlag.familiehendelsesdato) === false;
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
