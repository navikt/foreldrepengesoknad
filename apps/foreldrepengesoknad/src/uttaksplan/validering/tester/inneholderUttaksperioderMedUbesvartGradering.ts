import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { isUttaksperiode, Periode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { graderingSkalBesvares } from 'uttaksplan/utils/uttaksskjema/graderingSkalBesvares';
import dayjs from 'dayjs';

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
                p.tidsperiode
            )
        )
        //Feilmeldingen skal ikke komme hvis spm om flerbarnsdager skal besvares først (kun for perioder etter fødsel).
        .filter((p) =>
            grunnlag.erFlerbarnssøknad
                ? (dayjs.utc(p.tidsperiode.fom).isSameOrAfter(dayjs.utc(grunnlag.familiehendelsesdato), 'd') &&
                      p.ønskerFlerbarnsdager !== undefined) ||
                  dayjs.utc(p.tidsperiode.fom).isBefore(dayjs.utc(grunnlag.familiehendelsesdato), 'd')
                : p
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
