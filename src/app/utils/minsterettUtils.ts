import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { andreAugust2022ReglerGjelder } from './dateUtils';

export const getBareFarHarRettKontoUtenAktivitetskravUker = (
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
    let morUførUker = 0;
    let flerbarnsukerSomDelAvMinsterett = 0;

    if (morErUfør) {
        morUførUker = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 15 : 19;
    }

    if (andreAugust2022ReglerGjelder(familiehendelsesdato)) {
        if (antallBarn === 2) {
            flerbarnsukerSomDelAvMinsterett = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 17 : 21;
        } else if (antallBarn > 2) {
            flerbarnsukerSomDelAvMinsterett = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 46 : 56;
        }
    }

    return flerbarnsukerSomDelAvMinsterett + morUførUker;
};

export const getBareFarHarRettFlerbarnsdagerUker = (
    antallBarn: number,
    familiehendelsesdato: Date,
    dekningsgrad: Dekningsgrad,
    bareFarHarRett: boolean
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
        flerbarnsUker = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 17 : 21;
    } else if (antallBarn > 2) {
        flerbarnsUker = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 46 : 56;
    }

    return flerbarnsUker;
};
