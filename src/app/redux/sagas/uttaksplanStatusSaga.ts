import moment from 'moment';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { takeEvery, all, put, select } from 'redux-saga/effects';
import { AppState } from '../reducers';
import { Periodetype, isUttaksperiode, Uttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import søknadActionCreators from '../actions/s\u00F8knad/s\u00F8knadActionCreators';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';

const stateSelector = (state: AppState) => state;

const fjernTrekkdager = (p: Uttaksperiode) => {
    return { ...p, trekkdager: 0 };
};

function* uttaksplanStatus() {
    const appState: AppState = yield select(stateSelector);
    const { søknad } = appState;
    const uttaksplan = søknad.uttaksplan;
    const firstUttaksPeriode = uttaksplan.find(
        (p) => p.type === Periodetype.Uttak && p.konto !== StønadskontoType.ForeldrepengerFørFødsel
    );
    const famDato = getFamiliehendelsedato(søknad.barn, søknad.situasjon);
    const trekkDagerEtterDenneDatoen = Uttaksdagen(Uttaksdagen(famDato).denneEllerNeste()).leggTil(30 - 1);

    if (
        firstUttaksPeriode &&
        isUttaksperiode(firstUttaksPeriode) &&
        firstUttaksPeriode.konto !== StønadskontoType.ForeldrepengerFørFødsel
    ) {
        let updatedPeriode = {} as any;

        if (moment(firstUttaksPeriode.tidsperiode.fom).isAfter(trekkDagerEtterDenneDatoen)) {
            const trekkdager = Uttaksdagen(trekkDagerEtterDenneDatoen).getUttaksdagerFremTilDato(
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
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, uttaksplanStatus)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, uttaksplanStatus)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, uttaksplanStatus)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, uttaksplanStatus)]);
}
