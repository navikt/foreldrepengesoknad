import { Regelgrunnlag, RegelTestresultat, UttaksplanRegelTestresultat, RegelAvvik } from './types';
import uttaksplanRegler from '.';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelTestresultat[] => {
    return uttaksplanRegler
        .filter((regel) => (regel.erRelevant ? regel.erRelevant(regelgrunnlag) : true))
        .map((regel) => regel.test(regel, regelgrunnlag));
};

export const getRegelAvvikForPeriode = (
    resultat: UttaksplanRegelTestresultat,
    periodeId: string
): RegelAvvik[] | undefined => {
    if (resultat && resultat.resultatPerPeriode[periodeId]) {
        return resultat.resultatPerPeriode[periodeId]
            .filter((r) => r.passerer === false && r.regelAvvik !== undefined)
            .map((r) => r.regelAvvik!);
    }
    return undefined;
};

export const getRegelAvvik = (resultat: RegelTestresultat[]): RegelAvvik[] => {
    if (resultat) {
        return resultat.filter((r) => r.passerer === false && r.regelAvvik !== undefined).map((r) => r.regelAvvik!);
    }
    return [];
};

const overstyresAvFilter = (avvik: RegelAvvik, idx: number, alleAvvik: RegelAvvik[]): boolean => {
    return (
        avvik.overstyresAvRegel === undefined && alleAvvik.some((b2) => b2.key === avvik.overstyresAvRegel) === false
    );
};

const overstyrerAndreFilter = (avvik: RegelAvvik, idx: number, alleAvvik: RegelAvvik[]): boolean => {
    const overstyresAvAndre = alleAvvik.some(
        (rb) =>
            rb.overstyrerRegler
                ? rb.overstyrerRegler.some((rbo) => {
                      return rbo === avvik.key;
                  })
                : false
    );
    return overstyresAvAndre === false;
};

export const trimRelaterteRegelAvvik = (avvik: RegelAvvik[]): RegelAvvik[] => {
    return avvik.filter(overstyresAvFilter).filter(overstyrerAndreFilter);
};
