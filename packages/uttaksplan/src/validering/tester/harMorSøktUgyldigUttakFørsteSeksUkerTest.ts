import { Søknadsinfo, andreAugust2022ReglerGjelder } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
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
            'førsteSeksUkerForMor',
        );
        const passerer = ugyldigePerioder.length === 0;
        return {
            passerer,
            info: ugyldigePerioder.map((periode) => ({
                intlKey: andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato)
                    ? 'uttaksplan.validering.feil.morHarSøktUgyldigUttakFørsteSeksUker.etterWLB'
                    : 'uttaksplan.validering.feil.morHarSøktUgyldigUttakFørsteSeksUker.førWLB',
                periodeId: periode.id,
            })),
        };
    }

    return { passerer: true };
};
