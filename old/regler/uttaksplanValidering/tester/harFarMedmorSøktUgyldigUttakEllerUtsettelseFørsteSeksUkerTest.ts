import { UttaksplanRegelgrunnlag } from '../types';
import { getUgyldigUttakFørsteSeksUkerForFarMedmor } from '../../../util/validation/uttaksplan/uttakFarValidation';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { erPeriodeInnvilget } from 'app/util/uttaksplan/uttakUtils';

export const harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const {
        søknadsinfo: { søker, søknaden },
        perioder,
    } = grunnlag;

    if (søker.erFarEllerMedmor) {
        const ugyldigePerioder = getUgyldigUttakFørsteSeksUkerForFarMedmor(
            perioder.filter((p) => !erPeriodeInnvilget(p)),
            søknaden.familiehendelsesdato,
            søknaden.antallBarn,
            søknaden.situasjon,
            grunnlag.søknadsinfo.annenForelder,
            grunnlag.søknadsinfo.søker.erAleneOmOmsorg,
            søker.harMidlertidigOmsorg
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
