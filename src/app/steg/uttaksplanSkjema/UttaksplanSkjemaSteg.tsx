import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../components/applikasjon/steg/Steg';
import { StegID } from '../../util/routing/stegConfig';
import { HistoryProps } from '../../types/common';
import isAvailable from '../../util/steg/isAvailable';
import { SøkerinfoProps } from '../../types/søkerinfo';
import { uttaksplanSkjemaErGyldig } from '../../util/validation/steg/uttaksplanSkjema';
import søknadActions from '../../redux/actions/søknad/søknadActionCreators';
import Søknad from '../../types/søknad/Søknad';
import { getUttaksplanSkjemaScenario, UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import UttaksplanSkjemaScenarioes from './UttaksplanSkjemaScenarioes';
import { apiActionCreators } from '../../redux/actions';
import { getStønadskontoParams } from '../../util/uttaksplan/stønadskontoParams';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import ApplicationSpinner from 'common/components/applicationSpinner/ApplicationSpinner';
import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import { Søknadsinfo } from '../../selectors/types';
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import uttaksConstants from 'app/constants';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import {
    getAntallUkerFellesperiode,
    getAntallUkerFedrekvote,
    getAntallUkerMødrekvote
} from 'app/util/uttaksplan/stønadskontoer';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import Block from 'common/components/block/Block';
import InfoEksisterendeSak from '../uttaksplan/infoEksisterendeSak/InfoEksisterendeSak';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    søknadsinfo: Søknadsinfo;
    scenario: UttaksplanSkjemaScenario;
    isLoadingTilgjengeligeStønadskontoer: boolean;
    isLoadingSakForAnnenPart: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    eksisterendeSak?: EksisterendeSak;
    eksisterendeSakAnnenPart?: EksisterendeSak;
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

        if (stegProps.isAvailable) {
            const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoParams(søknadsinfo, startdatoPermisjon);
            dispatch(
                apiActionCreators.getTilgjengeligeStønadskontoer({ ...params, dekningsgrad: '100' }, this.props.history)
            );
            dispatch(
                apiActionCreators.getTilgjengeligeStønadskontoer({ ...params, dekningsgrad: '80' }, this.props.history)
            );
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const dekningsgrad = this.props.søknad.dekningsgrad;
        if (dekningsgrad !== nextProps.søknad.dekningsgrad) {
            this.props.dispatch(
                søknadActions.uttaksplanUpdateSkjemdata({
                    fellesperiodeukerMor: Math.round(
                        (getAntallUkerFellesperiode(nextProps.tilgjengeligeStønadskontoer) || 0) / 2
                    )
                })
            );
        }
    }

    render() {
        const {
            stegProps,
            dispatch,
            scenario,
            isLoadingTilgjengeligeStønadskontoer,
            tilgjengeligeStønadskontoer,
            søknadsinfo,
            eksisterendeSak,
            eksisterendeSakAnnenPart,
            isLoadingSakForAnnenPart
        } = this.props;
        const søknad = this.props.søknad as Søknad;
        const navnPåForeldre = søknadsinfo.navn.navnPåForeldre;
        const skalViseInfoEkisterendeSak: boolean =
            eksisterendeSak !== undefined || eksisterendeSakAnnenPart !== undefined;

        return (
            <Steg
                {...stegProps}
                onPreSubmit={() => {
                    dispatch(
                        apiActionCreators.getTilgjengeligeStønadskonterAndLagUttaksplanForslag(
                            getStønadskontoParams(søknadsinfo, søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon)
                        )
                    );
                }}>
                {isLoadingTilgjengeligeStønadskontoer === true || isLoadingSakForAnnenPart === true ? (
                    <ApplicationSpinner />
                ) : (
                    <>
                        <Block visible={skalViseInfoEkisterendeSak}>
                            <InfoEksisterendeSak
                                søknadsinfo={søknadsinfo}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                ekisterendeSak={eksisterendeSak ? eksisterendeSak : eksisterendeSakAnnenPart!}
                                erAnnenPartSinEkisterendeSak={eksisterendeSakAnnenPart !== undefined}
                                visPeriodeliste={true}
                            />
                        </Block>
                        <UttaksplanSkjemaScenarioes
                            scenario={scenario}
                            søknad={søknad}
                            navnPåForeldre={navnPåForeldre}
                            antallUkerFellesperiode={getAntallUkerFellesperiode(tilgjengeligeStønadskontoer)}
                            antallUkerFedreKvote={getAntallUkerFedrekvote(tilgjengeligeStønadskontoer)}
                            antallUkerMødreKvote={getAntallUkerMødrekvote(tilgjengeligeStønadskontoer)}
                            familiehendelsesdato={søknadsinfo.søknaden.familiehendelsesdato}
                            erFarEllerMedmor={søknadsinfo.søker.erFarEllerMedmor}
                            eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
                        />
                    </>
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps): StateProps => {
    const { history } = props;
    const søknadsinfo = selectSøknadsinfo(state)!;
    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN_SKJEMA,
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(state.søknad, søknadsinfo),
        fortsettKnappLabel: 'Fortsett',
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo, søknadsinfo)
    };

    const { familiehendelsesdato } = søknadsinfo.søknaden;
    const scenario = getUttaksplanSkjemaScenario(søknadsinfo, state.søknad.ekstrainfo.eksisterendeSakAnnenPart);
    const {
        api: { isLoadingTilgjengeligeStønadskontoer, isLoadingSakForAnnenPart }
    } = state;
    const søknad = { ...state.søknad };
    const { ekstrainfo } = søknad;
    const skjemadata = ekstrainfo.uttaksplanSkjema;
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    if (
        scenario === UttaksplanSkjemaScenario.s3_morFødsel &&
        skjemadata.skalIkkeHaUttakFørTermin !== true &&
        skjemadata.startdatoPermisjon === undefined
    ) {
        const defaultStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
            uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5
        );
        ekstrainfo.uttaksplanSkjema.startdatoPermisjon = defaultStartdato;
    }

    return {
        søknadsinfo,
        stegProps,
        søknad,
        scenario,
        tilgjengeligeStønadskontoer,
        isLoadingTilgjengeligeStønadskontoer,
        isLoadingSakForAnnenPart,
        eksisterendeSak: ekstrainfo.eksisterendeSak,
        eksisterendeSakAnnenPart: ekstrainfo.eksisterendeSakAnnenPart
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
