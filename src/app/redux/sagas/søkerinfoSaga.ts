import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { erMyndig } from '../../util/domain/personUtil';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { ApiStatePartial } from '../reducers/apiReducer';
import { RegistrertBarn, RegistrertAnnenForelder } from '../../types/Person';
import moment from 'moment';
import { SøkerinfoDTO } from '../../api/types/sokerinfoDTO';
import Arbeidsforhold from '../../types/Arbeidsforhold';

function shouldUseStoredDataIfTheyExist(apiState: ApiStatePartial) {
    const { person } = apiState;
    if (person) {
        return !person.registrerteBarn || person.registrerteBarn.length <= 0;
    }
    return true;
}

const getRegistrerteBarn = (
    søkerinfo: SøkerinfoDTO
): RegistrertBarn[] | undefined => {
    const { barn } = søkerinfo.søker;
    if (!barn || barn.length === 0) {
        return undefined;
    }
    return barn.map((b: any): RegistrertBarn => ({
        ...b,
        fødselsdato: moment(b.fødselsdato).toDate()
    }));
};

const getRegistrertAnnenForelder = (
    søkerinfo: SøkerinfoDTO
): RegistrertAnnenForelder | undefined => {
    if (!søkerinfo.søker.barn || søkerinfo.søker.barn.length === 0) {
        return undefined;
    }
    const foreldre: RegistrertAnnenForelder[] = [];
    søkerinfo.søker.barn.forEach((barn) => {
        const { annenForelder } = barn;
        if (
            annenForelder &&
            !foreldre.find((f) => f.fnr === annenForelder.fnr)
        ) {
            foreldre.push(annenForelder);
        }
    });
    return foreldre.length === 1 ? foreldre[0] : undefined;
};

const getArbeidsforhold = (
    søkerinfo: SøkerinfoDTO
): Arbeidsforhold[] | undefined => {
    const { arbeidsforhold } = søkerinfo;
    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        return undefined;
    }
    return arbeidsforhold.map((a) => {
        const forhold: Arbeidsforhold = {
            ...a,
            fom: moment(a.fom).toDate(),
            tom: a.tom ? moment(a.tom).toDate() : undefined
        };
        return forhold;
    });
};

function* getSøkerinfo(action: any) {
    try {
        const response = yield call(Api.getSøkerinfo, action.params);
        const søkerinfo: SøkerinfoDTO = response.data;
        const { barn, ...person } = søkerinfo.søker;
        const nextApiState: ApiStatePartial = {
            person: {
                ...person,
                ikkeNordiskEøsLand: person.ikkeNordiskEøsLand || false,
                erMyndig: erMyndig(person.fødselsdato),
                registrerteBarn: getRegistrerteBarn(søkerinfo)
            },
            registrertAnnenForelder: getRegistrertAnnenForelder(søkerinfo),
            isLoadingSøkerinfo: false,
            isLoadingAppState: true,
            arbeidsforhold: getArbeidsforhold(søkerinfo)
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
                          isLoadingSøkerinfo: false,
                          error
                      })
                  );
        } else {
            yield put(
                apiActions.updateApi({
                    isLoadingSøkerinfo: false,
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
