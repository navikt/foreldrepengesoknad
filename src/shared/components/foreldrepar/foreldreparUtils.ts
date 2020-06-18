import { ForeldreparForelder, ForeldreparIllustrasjonsvariant, ForeldreparSituasjon } from 'shared/types';

export interface SituasjonForelderSvg {
    mor: ForeldreparForelder;
    farMedmor: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
}

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
