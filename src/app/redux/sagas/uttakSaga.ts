import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { default as apiActions, updateApi } from '../actions/api/apiActionCreators';
import { ApiActionKeys, GetTilgjengeligeStønadskontoer } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { StønadskontoerDTO } from '../../api/types/stønadskontoerDTO';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import søknadActionCreators from '../actions/søknad/søknadActionCreators';
import { AppState } from '../reducers';
import { default as uttaksplanValideringActions } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { getStønadskontoSortOrder } from '../../util/uttaksplan/stønadskontoer';
import {
    overstyrAntallTilgjengeligeUkerForBarnFørJuli2018,
    skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018
} from '../../util/uttaksplan/tidsregler/førJuli2018';

const stateSelector = (state: AppState) => state;

const opprettAktivitetsFriKonto = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] => {
    const nyeKontoer: TilgjengeligStønadskonto[] = [];
    const aktivitetskravFrieDager = 15 * 5;

    nyeKontoer.push({ ...kontoer[0], dager: kontoer[0].dager - aktivitetskravFrieDager });
    nyeKontoer.push({ konto: StønadskontoType.AktivitetsfriKvote, dager: aktivitetskravFrieDager });

    return nyeKontoer;
};

const fjernFlerbarnsdagerFraFellesperiode = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] => {
    const flerbarnsdagerIndex = kontoer.findIndex((konto) => konto.konto === StønadskontoType.Flerbarnsdager);
    const fellesperiodeIndex = kontoer.findIndex((konto) => konto.konto === StønadskontoType.Fellesperiode);

    if (flerbarnsdagerIndex > 0 && fellesperiodeIndex > 0) {
        return kontoer.map((konto) => {
            if (konto.konto === StønadskontoType.Fellesperiode) {
                konto.dager = konto.dager - kontoer[flerbarnsdagerIndex].dager;
            }

            return konto;
        });
    }

    return kontoer;
};

function* getStønadskontoer(action: GetTilgjengeligeStønadskontoer) {
    try {
        yield put(updateApi({ isLoadingTilgjengeligeStønadskontoer: true }));
        const appState: AppState = yield select(stateSelector);
        const erMorUfør = appState.søknad.annenForelder.erUfør;
        const response = yield call(Api.getUttakskontoer, action.params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        let tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = [];
        Object.keys(stønadskontoer.kontoer).map((konto) => {
            tilgjengeligeStønadskontoer.push({
                konto: konto as StønadskontoType,
                dager: stønadskontoer.kontoer[konto]
            });
        });

        tilgjengeligeStønadskontoer = fjernFlerbarnsdagerFraFellesperiode(tilgjengeligeStønadskontoer);

        if (erMorUfør === true) {
            tilgjengeligeStønadskontoer = opprettAktivitetsFriKonto(tilgjengeligeStønadskontoer);
        }
        if (
            skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018(
                action.params.familiehendelsesdato,
                tilgjengeligeStønadskontoer
            )
        ) {
            tilgjengeligeStønadskontoer = overstyrAntallTilgjengeligeUkerForBarnFørJuli2018(
                tilgjengeligeStønadskontoer
            );
        }
        yield put(
            apiActions.updateApi({
                isLoadingTilgjengeligeStønadskontoer: false,
                tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer.sort(
                    (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
                        getStønadskontoSortOrder(a.konto) > getStønadskontoSortOrder(b.konto) ? 1 : -1
                )
            })
        );
        yield put(uttaksplanValideringActions.validerUttaksplanAction());
    } catch (error) {
        yield put(
            apiActions.updateApi({
                tilgjengeligeStønadskontoer: [],
                isLoadingTilgjengeligeStønadskontoer: false
            })
        );
    }
}

function* getStønadskontoUker(action: GetTilgjengeligeStønadskontoer) {
    try {
        yield put(updateApi({ isLoadingTilgjengeligeStønadskontoer: true }));
        const response = yield call(Api.getUttakskontoer, action.params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        const dekningsgrad: string = action.params.dekningsgrad;
        const antallUker: number = Object.keys(stønadskontoer.kontoer)
            .filter((konto: string) => konto !== StønadskontoType.Flerbarnsdager)
            .reduce((sum, konto) => sum + stønadskontoer.kontoer[konto] / 5, 0);

        if (dekningsgrad === '100') {
            yield put(
                apiActions.updateApi({
                    dekningsgrad100AntallUker: antallUker,
                    isLoadingTilgjengeligeStønadskontoer: false
                })
            );
        } else {
            yield put(
                apiActions.updateApi({
                    dekningsgrad80AntallUker: antallUker,
                    isLoadingTilgjengeligeStønadskontoer: false
                })
            );
        }
    } catch (error) {
        yield put(
            apiActions.updateApi({
                isLoadingTilgjengeligeStønadskontoer: false
            })
        );
    }
}

function* getStønadskontoerAndLagUttaksplan(action: GetTilgjengeligeStønadskontoer) {
    yield put(søknadActionCreators.uttaksplanSetPerioder([]));
    yield all([getStønadskontoer(action)]);
    const tilgjengeligeKontoer: TilgjengeligStønadskonto[] = yield select(
        (state: AppState) => state.api.tilgjengeligeStønadskontoer
    );
    yield put(søknadActionCreators.uttaksplanLagForslag(tilgjengeligeKontoer));
    yield put(apiActions.storeAppState());
}

export default function* søknadskontoerSaga() {
    yield all([
        takeEvery(ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER, getStønadskontoer),
        takeEvery(
            ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG,
            getStønadskontoerAndLagUttaksplan
        ),
        takeEvery(ApiActionKeys.GET_TILGJENGELIGE_STØNADSUKER, getStønadskontoUker)
    ]);
}
