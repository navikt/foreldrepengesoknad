import { RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getBrukteDager } from 'uttaksplan/utils/brukteDagerUtils';

export const overstigerMinsterettVedToTette = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { familiehendelsesdato, perioder, stønadskontoer, søkerErFarEllerMedmor, minsterettUkerToTette } = grunnlag;
    if (minsterettUkerToTette === undefined || minsterettUkerToTette === 0) {
        return {
            passerer: true,
        };
    }
    const minsterettMaxAntallUker = minsterettUkerToTette;
    const minsterettMaxAntallDager = minsterettMaxAntallUker * 5;
    const brukteDagerPerForelder = getBrukteDager(stønadskontoer, perioder, familiehendelsesdato);
    const uttaksdagerFremTilNå = søkerErFarEllerMedmor
        ? brukteDagerPerForelder.farMedmor.dagerEgneKvoter + brukteDagerPerForelder.farMedmor.dagerFellesperiode
        : brukteDagerPerForelder.mor.dagerEgneKvoter + brukteDagerPerForelder.mor.dagerFellesperiode;

    const dagerForMye = uttaksdagerFremTilNå - minsterettMaxAntallDager;

    return {
        passerer: dagerForMye <= 0,
        info: {
            intlKey: 'uttaksplan.validering.info.overstigerMinsterettVedToTette',
            values: {
                uker: minsterettMaxAntallUker,
                forMyeUttak: dagerForMye,
            },
        },
    };
};
