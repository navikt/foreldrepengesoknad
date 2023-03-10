import { formatDate } from '@navikt/fp-common';
import { isUfødtBarn } from 'app/context/types/Barn';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getUgyldigUttakMor } from '../utils/uttakValideringUtils';

export const ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindatoTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const søkerErMor = !grunnlag.søkerErFarEllerMedmor;
    if (søkerErMor && isUfødtBarn(grunnlag.barn)) {
        const ugyldigePerioder = getUgyldigUttakMor(
            grunnlag.perioder,
            grunnlag.familiehendelsesdato,
            grunnlag.søkersituasjon.situasjon,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.termindato,
            grunnlag.erFlerbarnssøknad,
            'mellomSyvOgÅtteUkerForMor'
        );

        const passerer = ugyldigePerioder.length === 0;
        return {
            passerer,
            info: ugyldigePerioder.map((periode) => ({
                intlKey: 'uttaksplan.validering.advarsel.ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindato',
                values: {
                    fraDato: formatDate(periode.tidsperiode.fom),
                    tilDato: formatDate(periode.tidsperiode.tom),
                },
                periodeId: periode.id,
            })),
        };
    }

    return { passerer: true };
};
