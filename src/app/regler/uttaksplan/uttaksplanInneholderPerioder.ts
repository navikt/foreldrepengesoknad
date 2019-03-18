import { RegelTest, Regel, Regelgrunnlag, RegelTestresultat, RegelAlvorlighet } from '../uttaksplanValidering/types';
import { RegelKey } from '../uttaksplanValidering/regelKeys';

const uttaksplanInneholderPerioder: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;

    if (perioder.length === 0) {
        return {
            key: regel.key,
            passerer: false,
            regelAvvik: {
                key: regel.key,
                alvorlighet: RegelAlvorlighet.ULOVLIG,
                feilmelding: {
                    intlKey: 'uttaksplanvalidering.feil.tomUttaksplan'
                }
            }
        };
    }
    return {
        key: regel.key,
        passerer: true
    };
};

export const uttaksplanInneholderPerioderRegel: Regel = {
    key: RegelKey.uttaksplanInneholderPerioder,
    test: uttaksplanInneholderPerioder
};
