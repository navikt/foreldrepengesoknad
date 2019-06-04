import { Situasjon, ForeldreparForelder, ForeldreparIllustrasjonsvariant } from './foreldreparTypes';

export interface SituasjonForelderSvg {
    mor: ForeldreparForelder;
    farMedmor: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
}

export const getSituasjonForelderSvg = (situasjon: Situasjon): SituasjonForelderSvg => {
    switch (situasjon) {
        case Situasjon.farOgMor:
            return {
                mor: 'mor1',
                farMedmor: 'far1'
            };
        case Situasjon.bareFar:
            return {
                mor: 'mor1',
                farMedmor: 'far1',
                variant: 'førsteForelderHalvtSynlig'
            };
        case Situasjon.bareMor:
            return {
                mor: 'mor1',
                farMedmor: 'far1',
                variant: 'andreForelderHalvtSynlig'
            };
        case Situasjon.aleneomsorg:
            return {
                mor: 'mor2',
                farMedmor: 'far2',
                variant: 'foreldreSeparert'
            };
        case Situasjon.morOgMedmor:
            return {
                mor: 'medmor2',
                farMedmor: 'medmor1'
            };
        case Situasjon.farOgFar:
            return {
                mor: 'far3',
                farMedmor: 'far4'
            };
    }
};

export const getAntallForeldreISituasjon = (situasjon: Situasjon) => {
    switch (situasjon) {
        case Situasjon.aleneomsorg:
        case Situasjon.bareFar:
        case Situasjon.bareMor:
            return 1;
        default:
            return 2;
    }
};
