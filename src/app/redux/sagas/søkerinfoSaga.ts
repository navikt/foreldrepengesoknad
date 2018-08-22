import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { erMyndig } from '../../util/domain/personUtil';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { ApiStatePartial } from '../reducers/apiReducer';
import { SøkerDTO, BarnDTO } from '../../api/types/sokerinfoDTO';
import { RegistrertBarn } from '../../types/Person';
import moment from 'moment';

function shouldUseStoredDataIfTheyExist(apiState: ApiStatePartial) {
    const { person } = apiState;
    if (person) {
        return !person.registrerteBarn || person.registrerteBarn.length <= 0;
    }
    return true;
}

const mapBarnDTOToRegistrertBarn = (barn: BarnDTO): RegistrertBarn => ({
    etternavn: barn.etternavn,
    fornavn: barn.fornavn,
    mellomnavn: barn.mellomnavn,
    fødselsdato: moment(barn.fødselsdato).toDate()
});

function* getSøkerinfo(action: any) {
    try {
        const response = yield call(Api.getSøkerinfo, action.params);
        const { land, barn, ...søker } = response.data.søker as SøkerDTO;
        const arbeidsforhold = response.data.arbeidsforhold;
        const nextApiState: ApiStatePartial = {
            person: {
                ...søker,
                ikkeNordiskEøsLand: søker.ikkeNordiskEøsLand || false,
                erMyndig: erMyndig(søker.fødselsdato),
                registrerteBarn: (barn || []).map((b) =>
                    mapBarnDTOToRegistrertBarn(b)
                )
            },
            isLoadingPerson: false,
            isLoadingAppState: true,
            arbeidsforhold
        };
        yield put(apiActions.updateApi(nextApiState));
        if (shouldUseStoredDataIfTheyExist(nextApiState)) {
            yield put(apiActions.getStoredAppState());
        } else {
            yield put(apiActions.deleteStoredAppState());
        }
    } catch (error) {
        if (error.response) {
            error.response.status === 401
                ? redirectToLogin()
                : yield put(
                      apiActions.updateApi({
                          isLoadingPerson: false,
                          error
                      })
                  );
        } else {
            yield put(
                apiActions.updateApi({
                    isLoadingPerson: false,
                    error: {
                        networkError: true
                    }
                })
            );
        }
    }
}

export default function* søkerinfoSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SØKERINFO, getSøkerinfo)]);
}
