import moment from 'moment';
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
import routeConfig from '../../util/routing/routeConfig';
import { Dekningsgrad } from 'common/types';
import { selectSøkerErFarEllerMedmor } from 'app/selectors/utledetSøknadsinfoSelectors';
import { extractUUID } from '../../api/utils/errorUtil';
import { getRelevantFamiliehendelseDato } from 'app/util/dates/dates';

const stateSelector = (state: AppState) => state;

const getAktivitetsFrieUkerForeldrepenger = (dekningsgrad: Dekningsgrad, startdatoUttak: Date): number => {
    if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
        return 15;
    } else {
        return moment(startdatoUttak).isBefore(moment(new Date(2019, 0, 1))) ? 15 : 19;
    }
};

const opprettAktivitetsFriKonto = (
    kontoer: TilgjengeligStønadskonto[],
    dekningsgrad: Dekningsgrad,
    antallBarn: number,
    startdatoUttak: Date
): TilgjengeligStønadskonto[] => {
    const nyeKontoer: TilgjengeligStønadskonto[] = [];
    const aktivitetskravFrieDagerForeldrepenger = getAktivitetsFrieUkerForeldrepenger(dekningsgrad, startdatoUttak) * 5;

    nyeKontoer.push({ ...kontoer[0], dager: kontoer[0].dager - aktivitetskravFrieDagerForeldrepenger });
    nyeKontoer.push({ konto: StønadskontoType.AktivitetsfriKvote, dager: aktivitetskravFrieDagerForeldrepenger });

    return nyeKontoer;
};

function* getStønadskontoer(action: GetTilgjengeligeStønadskontoer) {
    try {
        const { params } = action;
        yield put(updateApi({ isLoadingTilgjengeligeStønadskontoer: true }));

        const appState: AppState = yield select(stateSelector);
        const annenForelderErUkjent = appState.søknad.annenForelder.kanIkkeOppgis;
        const erMorUfør = appState.søknad.annenForelder.erUfør;
        const erAleneOmsorg = appState.søknad.søker.erAleneOmOmsorg;
        const søkerErFarEllerMedmor = selectSøkerErFarEllerMedmor(appState);
        const morHarIkkeRett = !appState.søknad.annenForelder.harRettPåForeldrepenger && søkerErFarEllerMedmor;

        const response = yield call(Api.getUttakskontoer, params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        let tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = [];

        Object.keys(stønadskontoer.kontoer)
            .filter((konto: StønadskontoType) => konto !== StønadskontoType.Flerbarnsdager)
            .forEach((konto) => {
                tilgjengeligeStønadskontoer.push({
                    konto: konto as StønadskontoType,
                    dager: stønadskontoer.kontoer[konto]
                });
            });

        if (morHarIkkeRett && !annenForelderErUkjent && !erAleneOmsorg) {
            tilgjengeligeStønadskontoer = opprettAktivitetsFriKonto(
                tilgjengeligeStønadskontoer,
                appState.søknad.dekningsgrad,
                appState.søknad.barn.antallBarn,
                params.startdatoUttak
            );

            if (erMorUfør === false) {
                const aktivitetsFriKvoteDager = tilgjengeligeStønadskontoer.find(
                    (konto) => konto.konto === StønadskontoType.AktivitetsfriKvote
                )!.dager;
                tilgjengeligeStønadskontoer = tilgjengeligeStønadskontoer
                    .map((konto) => {
                        if (konto.konto === StønadskontoType.AktivitetsfriKvote) {
                            konto.dager = 0;
                        }

                        if (konto.konto === StønadskontoType.Foreldrepenger) {
                            konto.dager = konto.dager + aktivitetsFriKvoteDager;
                        }

                        return konto;
                    })
                    .filter((konto) => konto.dager !== 0);
            }
        }

        const relevantFamiliehendelseDato = getRelevantFamiliehendelseDato({
            termindato: params.termindato,
            fødselsdato: params.fødselsdato,
            omsorgsovertakelsesdato: params.omsorgsovertakelsesdato
        });

        if (
            skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018(
                relevantFamiliehendelseDato,
                tilgjengeligeStønadskontoer
            )
        ) {
            tilgjengeligeStønadskontoer = overstyrAntallTilgjengeligeUkerForBarnFørJuli2018(
                tilgjengeligeStønadskontoer
            );
        }

        tilgjengeligeStønadskontoer = tilgjengeligeStønadskontoer.sort(
            (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
                getStønadskontoSortOrder(a.konto) > getStønadskontoSortOrder(b.konto) ? 1 : -1
        );

        if (params.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
            yield put(
                apiActions.updateApi({
                    isLoadingTilgjengeligeStønadskontoer: false,
                    stønadskontoer100: tilgjengeligeStønadskontoer
                })
            );
        } else {
            yield put(
                apiActions.updateApi({
                    isLoadingTilgjengeligeStønadskontoer: false,
                    stønadskontoer80: tilgjengeligeStønadskontoer
                })
            );
        }

        yield put(uttaksplanValideringActions.validerUttaksplanAction());
    } catch (error) {
        yield put(
            apiActions.updateApi({
                stønadskontoer100: [],
                stønadskontoer80: [],
                isLoadingTilgjengeligeStønadskontoer: false
            })
        );
        action.history.push(routeConfig.GENERELL_FEIL_URL, {
            uuid: extractUUID(error)
        });
    }
}

function* getStønadskontoerAndLagUttaksplan(action: GetTilgjengeligeStønadskontoer) {
    yield put(søknadActionCreators.uttaksplanSetPerioder([]));
    yield all([getStønadskontoer(action)]);
    yield put(søknadActionCreators.uttaksplanLagForslag());
    yield put(apiActions.storeAppState());
}

export default function* søknadskontoerSaga() {
    yield all([
        takeEvery(ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER, getStønadskontoer),
        takeEvery(
            ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG,
            getStønadskontoerAndLagUttaksplan
        )
    ]);
}
