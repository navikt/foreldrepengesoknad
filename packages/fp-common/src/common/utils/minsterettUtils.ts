import uttaksConstants from '../constants/constants';
import { Dekningsgrad } from '../types';
import { andreAugust2022ReglerGjelder } from './dateUtils';

export const getBareFarHarRettFlerbarnsdagerUker = (
    antallBarn: number,
    familiehendelsesdato: Date,
    dekningsgrad: Dekningsgrad,
    bareFarHarRett: boolean,
): number => {
    if (!bareFarHarRett || antallBarn === 1) {
        return 0;
    }

    //Flerbarnsdager regnes som en del av minsteretten når WLB Regler gjelder, og blir med i kontoen uten aktivitetskrav
    if (andreAugust2022ReglerGjelder(familiehendelsesdato)) {
        return 0;
    }

    let flerbarnsUker = 0;

    if (antallBarn === 2) {
        flerbarnsUker =
            dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                ? uttaksConstants.ANTALL_UKER_2_BARN_100_PROSENT_UTTAK
                : uttaksConstants.ANTALL_UKER_2_BARN_80_PROSENT_UTTAK;
    } else if (antallBarn > 2) {
        flerbarnsUker =
            dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                ? uttaksConstants.ANTALL_UKER_3_ELLER_FLERE_BARN_100_PROSENT_UTTAK
                : uttaksConstants.ANTALL_UKER_3_ELLER_FLERE_BARN_80_PROSENT_UTTAK;
    }

    return flerbarnsUker;
};

export const getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB = (
    antallBarn: number,
    familiehendelsesdato: Date,
    dekningsgrad: Dekningsgrad,
    bareFarHarRett: boolean,
) => {
    if (!bareFarHarRett) {
        return 0;
    }
    const antallUkerEtterFødselMor = uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;
    const antallUkerForeldrepengerFar =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksConstants.ANTALL_UKER_FORELDREPENGER_BARE_FAR_HAR_RETT_100_PROSENT
            : uttaksConstants.ANTALL_UKER_FORELDREPENGER_BARE_FAR_HAR_RETT_80_PROSENT;
    const flerbarnsUker = getBareFarHarRettFlerbarnsdagerUker(
        antallBarn,
        familiehendelsesdato,
        dekningsgrad,
        bareFarHarRett,
    );

    return antallUkerEtterFødselMor + antallUkerForeldrepengerFar + flerbarnsUker;
};
