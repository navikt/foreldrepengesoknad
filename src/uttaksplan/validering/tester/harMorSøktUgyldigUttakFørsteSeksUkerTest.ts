import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getUgyldigUttakMor } from '../utils/uttakValideringUtils';

export const harMorSøktUgyldigUttakFørsteSeksUkerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const søkerErMor = !grunnlag.søkerErFarEllerMedmor;
    if (søkerErMor) {
        const ugyldigePerioder = getUgyldigUttakMor(
            grunnlag.perioder,
            grunnlag.familiehendelsesdato,
            grunnlag.søkersituasjon.situasjon,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.termindato,
            grunnlag.erFlerbarnssøknad,
            'førsteSeksUkerForMor'
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
