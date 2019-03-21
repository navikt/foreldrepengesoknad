import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../../types/common';
import Person from '../../../types/Person';
import getMessage from 'common/util/i18nUtils';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Søknad from '../../../types/søknad/Søknad';
import { apiActionCreators } from '../../../redux/actions';
import { StegID } from '../../../util/routing/stegConfig';
import { Kvittering } from '../../../types/Kvittering';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import isAvailable from '../util/isAvailable';
import Oppsummering from 'common/components/oppsummering/Oppsummering';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { UttaksplanValideringState } from '../../../redux/reducers/uttaksplanValideringReducer';
import { validerUttaksplanAction } from '../../../redux/actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { getStønadskontoParams } from '../../../util/uttaksplan/stønadskontoParams';
import ApplicationSpinner from 'common/components/application-spinner/ApplicationSpinner';
import { søknadStegPath } from '../StegRoutes';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import Block from 'common/components/block/Block';
import LinkButton from '../../../components/link-button/LinkButton';
import { MissingAttachment } from '../../../types/MissingAttachment';
import { findMissingAttachments } from '../../../util/attachments/missingAttachmentUtil';
import { getSøknadsinfo } from '../../../selectors/s\u00F8knadsinfoSelector';
import { Søknadsinfo } from '../../../selectors/types';
import { GetTilgjengeligeStønadskontoerParams } from '../../../api/api';

interface StateProps {
    søknadsinfo: Søknadsinfo;
    person: Person;
    søknad: Søknad;
    kvittering?: Kvittering;
    stegProps: StegProps;
    uttaksplanValidering: UttaksplanValideringState;
    missingAttachments: MissingAttachment[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    isLoadingTilgjengeligeStønadskontoer: boolean;
    antallUkerUttaksplan: number;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class OppsummeringSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        const { tilgjengeligeStønadskontoer, søknad, stegProps, søknadsinfo, dispatch } = this.props;

        this.sendSøknad = this.sendSøknad.bind(this);
        this.gotoUttaksplan = this.gotoUttaksplan.bind(this);

        if (tilgjengeligeStønadskontoer.length === 0 && stegProps.isAvailable) {
            const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoParams(
                søknadsinfo,
                søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon
            );
            dispatch(apiActionCreators.getTilgjengeligeStønadskonter(params, this.props.history));
            dispatch(apiActionCreators.getTilgjengeligeStønadsuker(params));
        }
    }

    componentWillMount() {
        this.props.dispatch(validerUttaksplanAction());
    }

    sendSøknad() {
        const { missingAttachments, dispatch } = this.props;
        dispatch(apiActionCreators.sendSøknad(missingAttachments, this.props.history));
    }
    gotoUttaksplan() {
        const { history } = this.props;
        const path = søknadStegPath(StegID.UTTAKSPLAN);
        this.props.dispatch(søknadActions.setCurrentSteg(StegID.UTTAKSPLAN));
        history.push(path);
    }

    render() {
        const {
            søknad,
            søkerinfo,
            søknadsinfo,
            uttaksplanValidering,
            stegProps,
            missingAttachments,
            isLoadingTilgjengeligeStønadskontoer,
            antallUkerUttaksplan,
            dispatch,
            intl
        } = this.props;
        const { person } = søkerinfo;
        if (person === undefined) {
            return null;
        }

        return (
            <Steg {...stegProps} onSubmit={this.sendSøknad}>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <ApplicationSpinner />
                ) : (
                    <>
                        {uttaksplanValidering.erGyldig === false && (
                            <Block>
                                <AlertStripeAdvarselSolid>
                                    <Block margin="xxs">
                                        <FormattedMessage id="oppsummering.valideringsfeil.uttaksplan.intro" />
                                    </Block>
                                    <LinkButton color="white" onClick={() => this.gotoUttaksplan()}>
                                        <FormattedMessage id="oppsummering.valideringsfeil.uttaksplan.lenketekst" />
                                    </LinkButton>
                                </AlertStripeAdvarselSolid>
                            </Block>
                        )}
                        <Oppsummering
                            søknadsinfo={søknadsinfo}
                            søkerinfo={søkerinfo}
                            søknad={søknad}
                            uttaksplanValidering={uttaksplanValidering}
                            antallUkerUttaksplan={antallUkerUttaksplan}
                        />
                        {uttaksplanValidering.erGyldig &&
                            missingAttachments.length > 0 && (
                                <Veilederinfo type="advarsel">
                                    {getMessage(intl, 'oppsummering.veileder.manglendeVedlegg')}
                                </Veilederinfo>
                            )}
                        {uttaksplanValidering.erGyldig && (
                            <BekreftCheckboksPanel
                                className="blokk-m"
                                checked={søknad.harGodkjentOppsummering}
                                label={getMessage(intl, 'oppsummering.samtykke')}
                                onChange={() => {
                                    dispatch(
                                        søknadActions.updateSøknad({
                                            harGodkjentOppsummering: !søknad.harGodkjentOppsummering
                                        })
                                    );
                                }}
                            />
                        )}
                    </>
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const søknad = state.søknad;
    const { person } = props.søkerinfo;
    const {
        api: { tilgjengeligeStønadskontoer, isLoadingTilgjengeligeStønadskontoer }
    } = state;
    const stegProps: StegProps = {
        id: StegID.OPPSUMMERING,
        renderFortsettKnapp: søknad.harGodkjentOppsummering,
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.OPPSUMMERING, søknad, props.søkerinfo, state.uttaksplanValidering.erGyldig)
    };

    const missingAttachments: MissingAttachment[] = findMissingAttachments(søknad, state.api, søknad.annenForelder);
    const antallUkerUttaksplan =
        state.søknad.dekningsgrad === '100'
            ? state.api.dekningsgrad100AntallUker!
            : state.api.dekningsgrad80AntallUker!;

    return {
        søknadsinfo: getSøknadsinfo(state)!,
        person,
        søknad,
        uttaksplanValidering: state.uttaksplanValidering,
        kvittering: state.api.kvittering,
        missingAttachments,
        stegProps,
        tilgjengeligeStønadskontoer,
        isLoadingTilgjengeligeStønadskontoer,
        antallUkerUttaksplan
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(OppsummeringSteg));
