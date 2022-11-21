import { RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getToTetteReglerGjelder } from '../../../app/utils/dateUtils';
import { getBrukteDager } from 'uttaksplan/utils/brukteDagerUtils';

const MINSTERETTUKER_TO_TETTE_MOR_FØDSEL = 22;
const MINSTERETTUKER_FARMEDMOR_ELLER_ADOPSJON = 8;

export const overstigerMinsterettVedToTette = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const {
        familiehendelsesdato,
        perioder,
        stønadskontoer,
        søkerErFarEllerMedmor,
        familiehendelsesdatoNesteSak,
        søkersituasjon,
    } = grunnlag;
    const toTetteReglerGjelder = getToTetteReglerGjelder(familiehendelsesdato, familiehendelsesdatoNesteSak);
    if (!toTetteReglerGjelder) {
        return {
            passerer: true,
        };
    }
    const minsterettMaxAntallUker =
        søkerErFarEllerMedmor || søkersituasjon.situasjon === 'adopsjon'
            ? MINSTERETTUKER_FARMEDMOR_ELLER_ADOPSJON
            : MINSTERETTUKER_TO_TETTE_MOR_FØDSEL;

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
