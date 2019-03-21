import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { StegID } from '../../../util/routing/stegConfig';
import { HistoryProps } from '../../../types/common';
import isAvailable from '../util/isAvailable';

import { SøkerinfoProps } from '../../../types/søkerinfo';
import { uttaksplanSkjemaErGyldig } from '../../../util/validation/steg/uttaksplanSkjema';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Søknad from '../../../types/søknad/Søknad';
import { getPermisjonsregler } from '../../../util/uttaksplan/permisjonsregler';
import { getUttaksplanSkjemaScenario, UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import UttaksplanSkjemaScenarioes from './UttaksplanSkjemaScenarioes';
import { apiActionCreators } from '../../../redux/actions';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';
import { Søknadsinfo } from '../../../selectors/types';
import { getSøknadsinfo } from '../../../selectors/s\u00F8knadsinfoSelector';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    søknadsinfo?: Søknadsinfo;
    antallUkerFellesperiode: number | undefined;
    scenario: UttaksplanSkjemaScenario;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    antallUkerFedreKvote: number | undefined;
    antallUkerMødreKvote: number | undefined;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UttaksplanSkjemaSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        const {
            dispatch,
            stegProps,
            søknad: {
                ekstrainfo: {
                    uttaksplanSkjema: { startdatoPermisjon }
                }
            },
            søknadsinfo
        } = props;

        if (stegProps.isAvailable && søknadsinfo) {
            const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoParams(søknadsinfo, startdatoPermisjon);
            dispatch(apiActionCreators.getTilgjengeligeStønadsuker({ ...params, dekningsgrad: '100' }));
            dispatch(apiActionCreators.getTilgjengeligeStønadsuker({ ...params, dekningsgrad: '80' }));
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const dekningsgrad = this.props.søknad.dekningsgrad;
        if (dekningsgrad !== nextProps.søknad.dekningsgrad) {
            this.props.dispatch(
                søknadActions.uttaksplanUpdateSkjemdata({
                    fellesperiodeukerMor: Math.round((nextProps.antallUkerFellesperiode || 0) / 2)
                })
            );
        }
    }

    render() {
        const {
            stegProps,
            dispatch,
            antallUkerFellesperiode,
            scenario,
            isLoadingTilgjengeligeStønadskontoer,
            antallUkerFedreKvote,
            antallUkerMødreKvote,
            søknadsinfo
        } = this.props;
        const søknad = this.props.søknad as Søknad;
        const navnPåForeldre = søknadsinfo!.navn.navnPåForeldre;
        return (
            <Steg
                {...stegProps}
                onPreSubmit={() => {
                    if (søknadsinfo) {
                        dispatch(
                            apiActionCreators.getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
                                getStønadskontoParams(
                                    søknadsinfo,
                                    søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon
                                )
                            )
                        );
                    }
                }}>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <UttaksplanSkjemaScenarioes
                        scenario={scenario}
                        søknad={søknad}
                        navnPåForeldre={navnPåForeldre}
                        antallUkerFellesperiode={antallUkerFellesperiode || 0}
                        antallUkerFedreKvote={antallUkerFedreKvote}
                        antallUkerMødreKvote={antallUkerMødreKvote}
                    />
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps): StateProps => {
    const { history } = props;
    const søknadsinfo = getSøknadsinfo(state)!;
    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN_SKJEMA,
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(state.søknad, søknadsinfo),
        fortsettKnappLabel: 'Fortsett',
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo, søknadsinfo)
    };
    const permisjonsregler = getPermisjonsregler();
    const { familiehendelsesdato } = søknadsinfo.søknaden;
    const scenario = getUttaksplanSkjemaScenario(søknadsinfo);
    const {
        api: {
            isLoadingTilgjengeligeStønadskontoer,
            fellesPeriodeUkerDekningsgrad100,
            fellesPeriodeUkerDekningsgrad80,
            fedreKvoteUkerDekningsgrad100,
            fedreKvoteUkerDekningsgrad80,
            mødreKvoteUkerDekningsgrad100,
            mødreKvoteUkerDekningsgrad80
        }
    } = state;
    const søknad = { ...state.søknad };
    const skjemadata = søknad.ekstrainfo.uttaksplanSkjema;
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    if (
        scenario === UttaksplanSkjemaScenario.s3_morFødsel &&
        skjemadata.skalIkkeHaUttakFørTermin !== true &&
        skjemadata.startdatoPermisjon === undefined
    ) {
        const defaultStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
            permisjonsregler.antallUkerForeldrepengerFørFødsel * 5
        );
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon = defaultStartdato;
    }
    return {
        søknadsinfo,
        stegProps,
        søknad,
        antallUkerFellesperiode:
            søknad.dekningsgrad === '100' ? fellesPeriodeUkerDekningsgrad100 : fellesPeriodeUkerDekningsgrad80,
        antallUkerFedreKvote:
            søknad.dekningsgrad === '100' ? fedreKvoteUkerDekningsgrad100 : fedreKvoteUkerDekningsgrad80,
        antallUkerMødreKvote:
            søknad.dekningsgrad === '100' ? mødreKvoteUkerDekningsgrad100 : mødreKvoteUkerDekningsgrad80,
        scenario,
        isLoadingTilgjengeligeStønadskontoer
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
