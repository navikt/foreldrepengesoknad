import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import { UttaksplanValideringState } from '../redux/reducers/uttaksplanValideringReducer';
import { UttaksplanRegelTestresultat } from '../regler/uttaksplanValidering/types';
import { RegelAvvik } from 'shared/regler/regelTypes';

export const uttaksplanValideringSelector = (state: AppState): UttaksplanValideringState => state.uttaksplanValidering;

export const selectValideringTestResultat = createSelector([uttaksplanValideringSelector], (uttaksplanValidering):
    | UttaksplanRegelTestresultat
    | undefined => {
    return uttaksplanValidering.resultat;
});

export const selectUttaksplanAvvik = createSelector([selectValideringTestResultat], (testResultat): RegelAvvik[] => {
    return testResultat ? testResultat.avvik : [];
});
