import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { Periodetype } from 'uttaksplan/types/Periode';
import { utsettelseTidsperiodeErGyldig, uttakTidsperiodeErGyldig } from '../../utils/tidsperiodeValideringUtils';
import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';

export const harPeriodeGyldigTidsperiode: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) => {
        switch (periode.type) {
            case Periodetype.Overføring:
            case Periodetype.Uttak:
            case Periodetype.Opphold:
                return (
                    uttakTidsperiodeErGyldig(
                        periode,
                        grunnlag.familiehendelsesdato,
                        grunnlag.søkerErFarEllerMedmor,
                        grunnlag.termindato
                    ) === false
                );
            case Periodetype.Utsettelse:
                return (
                    utsettelseTidsperiodeErGyldig(
                        periode,
                        grunnlag.familiehendelsesdato,
                        grunnlag.søkerErFarEllerMedmor,
                        grunnlag.termindato
                    ) === false
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
