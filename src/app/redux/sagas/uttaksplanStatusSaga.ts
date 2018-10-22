import moment from 'moment';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { takeEvery, all, put, select } from 'redux-saga/effects';
import { AppState } from '../reducers';
import { Periodetype, Uttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import søknadActionCreators from '../actions/søknad/søknadActionCreators';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';

const stateSelector = (state: AppState) => state;

const fjernTrekkdager = (p: Uttaksperiode) => {
    return { ...p, trekkdager: 0 };
};

function* updateUttaksplanStatus() {
    const appState: AppState = yield select(stateSelector);
    const { søknad, api } = appState;
    const { tilgjengeligeStønadskontoer } = api;
    const uttaksplan = søknad.uttaksplan;
    const erDeltUttak: boolean =
        tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Foreldrepenger) === undefined;
    const firstUttaksPeriode = uttaksplan.find(
        (p) => p.type === Periodetype.Uttak && p.konto !== StønadskontoType.ForeldrepengerFørFødsel
    );
    const famDato = getFamiliehendelsedato(søknad.barn, søknad.situasjon);
    const trekkdagerStartdato = Uttaksdagen(Uttaksdagen(famDato).denneEllerNeste()).leggTil(30 - 1);

    if (firstUttaksPeriode !== undefined && !erDeltUttak) {
        let updatedPeriode = {} as any;

        if (moment(firstUttaksPeriode.tidsperiode.fom).isAfter(trekkdagerStartdato)) {
            const trekkdager = Uttaksdagen(trekkdagerStartdato).getUttaksdagerFremTilDato(
                firstUttaksPeriode.tidsperiode.fom
            );
            updatedPeriode = { ...firstUttaksPeriode, trekkdager };
        } else {
            updatedPeriode = { ...firstUttaksPeriode, trekkdager: 0 };
        }

        const andrePerioder = uttaksplan.filter((p) => p.id !== firstUttaksPeriode.id);
        const newPerioder = [...andrePerioder, updatedPeriode]
            .sort(sorterPerioder)
            .map((p) => (p.id !== firstUttaksPeriode.id ? fjernTrekkdager(p) : p));

        yield put(søknadActionCreators.uttaksplanSetPerioder(newPerioder));
    }
}

export default function* uttaksplanStatusSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, updateUttaksplanStatus)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, updateUttaksplanStatus)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, updateUttaksplanStatus)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, updateUttaksplanStatus)]);
}
