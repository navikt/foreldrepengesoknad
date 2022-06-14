import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { erPeriodeInnvilget } from 'uttaksplan/utils/periodeUtils';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getUgyldigUttakFørsteSeksUkerForFarMedmor } from '../utils/uttakValideringUtils';

export const harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const wlbReglerGjelder = andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato);
    if (grunnlag.søkerErFarEllerMedmor && !wlbReglerGjelder) {
        const ugyldigePerioder = getUgyldigUttakFørsteSeksUkerForFarMedmor(
            grunnlag.perioder.filter((p) => !erPeriodeInnvilget(p)),
            grunnlag.familiehendelsesdato,
            grunnlag.antallBarn,
            grunnlag.søkersituasjon.situasjon,
            grunnlag.annenForelder,
            grunnlag.søkerErAleneOmOmsorg,
            grunnlag.søkerHarMidlertidigOmsorg,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.termindato
        );
        const passerer = ugyldigePerioder.length === 0;
        return {
            passerer,
            info: ugyldigePerioder.map((periode) => ({
                periodeId: periode.id,
            })),
        };
    }

    return { passerer: true };
};
