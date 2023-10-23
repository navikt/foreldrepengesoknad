import { RegelTestresultat } from '../utils/types/regelTypes';
import dayjs from 'dayjs';
import { Periode, Søknadsinfo, Uttaksperiode, isUttaksperiode } from '@navikt/fp-common';
import { graderingSkalBesvares } from '../../utils/uttaksskjema/graderingSkalBesvares';

export const inneholderUttaksperioderMedUbesvartGradering = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const uttaksperioder = grunnlag.perioder.filter((p: Periode) => isUttaksperiode(p)) as Uttaksperiode[];
    const perioderMedUbesvartGradering = uttaksperioder
        .filter((p) =>
            graderingSkalBesvares(
                p.type,
                p.konto,
                grunnlag.familiehendelsesdato,
                grunnlag.søkerErFarEllerMedmor,
                p.erMorForSyk,
                p.tidsperiode,
            ),
        )
        //Feilmeldingen skal ikke komme hvis spm om flerbarnsdager skal besvares først (kun for perioder etter fødsel).
        .filter((p) =>
            grunnlag.erFlerbarnssøknad
                ? (dayjs(p.tidsperiode.fom).isSameOrAfter(grunnlag.familiehendelsesdato, 'd') &&
                      p.ønskerFlerbarnsdager !== undefined) ||
                  dayjs(p.tidsperiode.fom).isBefore(grunnlag.familiehendelsesdato, 'd')
                : p,
        )
        .filter((p) => p.gradert === undefined);

    return {
        passerer: perioderMedUbesvartGradering.length === 0,
        info: perioderMedUbesvartGradering.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.inneholderUttaksperioderMedUbesvartGradering',
            periodeId: periode.id,
        })),
    };
};
