import { Kjønn } from '@navikt/fp-common';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import { SituasjonForelderSvg } from 'app/types/SituasjonForelderSvg';

export const getForeldreparSituasjon = (
    søkerKjønn: Kjønn,
    annenForelderKjønn: Kjønn | undefined,
    erDeltUttak: boolean,
    morErAleneOmOmsorg: boolean,
    farMedmorErAleneOmOmsorg: boolean
): ForeldreparSituasjon => {
    if (erDeltUttak) {
        if (søkerKjønn !== annenForelderKjønn) {
            return ForeldreparSituasjon.farOgMor;
        }
        return søkerKjønn === 'K' ? ForeldreparSituasjon.farOgFar : ForeldreparSituasjon.morOgMedmor;
    } else {
        if (søkerKjønn === 'K') {
            return morErAleneOmOmsorg ? ForeldreparSituasjon.aleneomsorg : ForeldreparSituasjon.bareMor;
        } else {
            return farMedmorErAleneOmOmsorg ? ForeldreparSituasjon.aleneomsorg : ForeldreparSituasjon.bareFar;
        }
    }
};

export const getAntallForeldreISituasjon = (situasjon: ForeldreparSituasjon) => {
    switch (situasjon) {
        case ForeldreparSituasjon.aleneomsorg:
        case ForeldreparSituasjon.bareFar:
        case ForeldreparSituasjon.bareMor:
            return 1;
        default:
            return 2;
    }
};

export const getSituasjonForelderSvg = (situasjon: ForeldreparSituasjon): SituasjonForelderSvg => {
    switch (situasjon) {
        case ForeldreparSituasjon.farOgMor:
            return {
                mor: 'mor1',
                farMedmor: 'far1',
            };
        case ForeldreparSituasjon.bareFar:
            return {
                mor: 'mor1',
                farMedmor: 'far1',
                variant: 'førsteForelderHalvtSynlig',
            };
        case ForeldreparSituasjon.bareMor:
            return {
                mor: 'mor1',
                farMedmor: 'far1',
                variant: 'andreForelderHalvtSynlig',
            };
        case ForeldreparSituasjon.aleneomsorg:
            return {
                mor: 'mor2',
                farMedmor: 'far2',
                variant: 'foreldreSeparert',
            };
        case ForeldreparSituasjon.morOgMedmor:
            return {
                mor: 'medmor2',
                farMedmor: 'medmor1',
            };
        case ForeldreparSituasjon.farOgFar:
            return {
                mor: 'far3',
                farMedmor: 'far4',
            };
    }
};
