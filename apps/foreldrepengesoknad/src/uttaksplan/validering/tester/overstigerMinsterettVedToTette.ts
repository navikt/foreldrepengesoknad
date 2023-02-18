import { RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getBrukteDager } from 'uttaksplan/utils/brukteDagerUtils';
import { laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn } from './periodevalideringstester/forSenUttakVedPåfølgendeBarn';

export const overstigerMinsterettVedToTette = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { familiehendelsesdato, perioder, stønadskontoer, søkerErFarEllerMedmor, minsterettUkerToTette } = grunnlag;
    const perioderEtterFørsteStønadsperiodeNyttBarn = perioder.filter((periode) =>
        laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn(periode, grunnlag.førsteUttaksdagNesteBarnsSak)
    );
    if (
        minsterettUkerToTette === undefined ||
        minsterettUkerToTette === 0 ||
        perioderEtterFørsteStønadsperiodeNyttBarn.length === 0
    ) {
        return {
            passerer: true,
        };
    }
    const perioderFørFørsteStønadsperiodeNyttBarn = perioder.filter(
        (periode) => !laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn(periode, grunnlag.førsteUttaksdagNesteBarnsSak)
    );
    const minsterettMaxAntallUker = minsterettUkerToTette;
    const minsterettMaxAntallDager = minsterettMaxAntallUker * 5;

    const brukteDagerPerForelderFørFørsteStønadsdagNyttBarn = getBrukteDager(
        stønadskontoer,
        perioderFørFørsteStønadsperiodeNyttBarn,
        familiehendelsesdato
    );
    const uttaksdagerFremTilNyttBarnStønadsdag = søkerErFarEllerMedmor
        ? brukteDagerPerForelderFørFørsteStønadsdagNyttBarn.farMedmor.dagerEgneKvoter +
          brukteDagerPerForelderFørFørsteStønadsdagNyttBarn.farMedmor.dagerFellesperiode
        : brukteDagerPerForelderFørFørsteStønadsdagNyttBarn.mor.dagerEgneKvoter +
          brukteDagerPerForelderFørFørsteStønadsdagNyttBarn.mor.dagerFellesperiode;

    const dagerIgjenÅBrukePåMinsteretten = minsterettMaxAntallDager - uttaksdagerFremTilNyttBarnStønadsdag;

    const brukteDagerPerForelderEtterFørsteStønadsdagNyttBarn = getBrukteDager(
        stønadskontoer,
        perioderEtterFørsteStønadsperiodeNyttBarn,
        familiehendelsesdato
    );
    const uttaksdagerEtterNyttBarnStønadsdag = søkerErFarEllerMedmor
        ? brukteDagerPerForelderEtterFørsteStønadsdagNyttBarn.farMedmor.dagerEgneKvoter +
          brukteDagerPerForelderEtterFørsteStønadsdagNyttBarn.farMedmor.dagerFellesperiode
        : brukteDagerPerForelderEtterFørsteStønadsdagNyttBarn.mor.dagerEgneKvoter +
          brukteDagerPerForelderEtterFørsteStønadsdagNyttBarn.mor.dagerFellesperiode;

    const dagerIgjenAvMinsterett = dagerIgjenÅBrukePåMinsteretten - uttaksdagerEtterNyttBarnStønadsdag;

    return {
        passerer: dagerIgjenAvMinsterett >= 0,
        info: {
            intlKey: 'uttaksplan.validering.info.overstigerMinsterettVedToTette',
            values: {
                uker: minsterettMaxAntallUker,
                forMyeUttak: Math.abs(dagerIgjenAvMinsterett),
            },
        },
    };
};
