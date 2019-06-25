import { UttaksplanRegelgrunnlag } from '../types';
import { getUgyldigUttakFørsteSeksUkerForFarMedmor } from '../../../util/validation/uttaksplan/uttakFarValidation';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

export const harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const {
        søknadsinfo: { søker, søknaden },
        perioder
    } = grunnlag;

    if (søker.erFarEllerMedmor) {
        const ugyldigePerioder = getUgyldigUttakFørsteSeksUkerForFarMedmor(
            perioder,
            søknaden.familiehendelsesdato,
            søknaden.antallBarn,
            søknaden.situasjon,
            grunnlag.søknadsinfo.annenForelder,
            grunnlag.søknadsinfo.søker.erAleneOmOmsorg
        );
        const passerer = ugyldigePerioder.length === 0;
        return {
            passerer,
            info: ugyldigePerioder.map((periode) => ({
                periodeId: periode.id
            }))
        };
    }

    return { passerer: true };
};
