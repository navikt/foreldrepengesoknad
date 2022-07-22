import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { andreAugust2022ReglerGjelder } from './dateUtils';

export const getkontoUtenAktivitetskravUker = (
    antallBarn: number,
    morErUfør: boolean,
    familiehendelsesdato: Date,
    dekningsgrad: Dekningsgrad,
    bareFarHarRett: boolean
): number => {
    if (!bareFarHarRett) {
        return 0;
    }

    if (andreAugust2022ReglerGjelder(familiehendelsesdato) && antallBarn === 1 && !morErUfør) {
        return 8;
    }

    let kontoUtenAktivitetskravUker = 0;
    if (antallBarn === 1 && morErUfør) {
        kontoUtenAktivitetskravUker = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 15 : 19;
    } else if (antallBarn === 2) {
        kontoUtenAktivitetskravUker = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 17 : 21;
    } else if (antallBarn > 2) {
        kontoUtenAktivitetskravUker = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 46 : 56;
    }

    return kontoUtenAktivitetskravUker;
};
