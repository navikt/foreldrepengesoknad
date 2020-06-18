import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { default as apiActions } from '../actions/api/apiActionCreators';
import Sak from '../../types/søknad/Sak';
import { getSakForEndringssøknad, getSakUnderBehandling } from '../../util/saker/sakerUtils';
import { getEksisterendeSakFromDTO } from 'app/util/eksisterendeSak/eksisterendeSakUtils';
import { UttaksplanDTO } from 'app/api/types/uttaksplanDTO';

function* getSaker() {
    try {
        yield put(apiActions.updateApi({ isLoadingSaker: true }));
        const response = yield call(Api.getSaker);
        const saker: Sak[] = response.data;
        const sakForEndringssøknad = getSakForEndringssøknad(saker);

        yield put(
            apiActions.updateApi({
                sakForEndringssøknad,
            })
        );

        yield put(
            apiActions.updateApi({
                sakUnderBehandling: sakForEndringssøknad ? undefined : getSakUnderBehandling(saker),
            })
        );
    } catch (error) {
        yield put(
            apiActions.updateApi({
                oppslagSakerFeilet: true,
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingSaker: false,
            })
        );
    }
}

export function* fetchEksisterendeSak(saksnummer: string) {
    try {
        yield put(apiActions.updateApi({ isLoadingEksisterendeSak: true }));
        const response = yield call(Api.getEksisterendeSak, saksnummer);
        return getEksisterendeSakFromDTO(response.data, false);
    } catch (error) {
        yield put(
            apiActions.updateApi({
                oppslagEksisterendeSakFeilet: true,
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingEksisterendeSak: false,
            })
        );
    }
}

export function* fetchEksisterendeSakMedFnr(fnr: string) {
    try {
        yield put(apiActions.updateApi({ isLoadingSakForAnnenPart: true }));
        const response = yield call(Api.getEksisterendeSakMedFnr, fnr);
        const uttaksplanDto: UttaksplanDTO = response.data;
        uttaksplanDto.grunnlag.søkerErFarEllerMedmor = !uttaksplanDto.grunnlag.søkerErFarEllerMedmor;
        return getEksisterendeSakFromDTO(uttaksplanDto, true);
    } catch (error) {
        yield put(
            apiActions.updateApi({
                oppslagSakForAnnenPartFeilet: true,
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingSakForAnnenPart: false,
            })
        );
    }
}

export default function* sakerSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SAKER, getSaker)]);
}
