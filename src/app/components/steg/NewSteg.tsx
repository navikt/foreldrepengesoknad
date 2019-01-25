import * as React from 'react';
import { getStegConfig, StegConfigItem, StegID } from '../../util/routing/stegConfig';
import { History } from 'history';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { søknadStegPath } from '../../connected-components/steg/StegRoutes';
import Stegindikator from '../stegindikator/Stegindikator';
import routeConfig from '../../util/routing/routeConfig';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import BEMHelper from 'common/util/bem';
import apiActionCreators from '../../redux/actions/api/apiActionCreators';
import StegFooter from '../steg-footer/StegFooter';
import BackButton from 'common/components/back-button/BackButton';
import Block from 'common/components/block/Block';
import AvbrytSøknadDialog from '../avbryt-søknad-dialog/AvbrytSøknadDialog';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';

import './steg.less';
import DocumentTitle from 'react-document-title';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';

export interface NewStegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    fortsettKnappLabel?: string;
    renderFormTag?: boolean;
    history: History;
    isAvailable?: boolean;
    nesteStegID?: StegID;
    previousStegID?: StegID;
    isFormik?: boolean;
    isSubmitting: boolean;
    onSubmit: (e: FormSubmitEvent) => void;
    errorSummaryRenderer?: () => React.ReactNode;
    onPreSubmit?: () => void;
    onRequestNavigateToNextStep?: () => boolean;
    confirmNavigateToPreviousStep?: (callback: () => void) => void;
}

interface StateProps {
    erEndringssøknad: boolean;
}

interface State {
    visAvbrytDialog: boolean;
}

type Props = StateProps & NewStegProps & InjectedIntlProps;

class NewSteg extends React.Component<Props & DispatchProps, State> {
    constructor(props: Props & DispatchProps) {
        super(props);

        const { isAvailable, history } = props;
        if (isAvailable === false) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        this.state = {
            visAvbrytDialog: false
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleFortsett = this.handleFortsett.bind(this);
        this.navigateToPreviousStep = this.navigateToPreviousStep.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleNavigateToPreviousStepClick = this.handleNavigateToPreviousStepClick.bind(this);
        this.updateCurrentSteg = this.updateCurrentSteg.bind(this);
        this.getStegConfig = this.getStegConfig.bind(this);
    }

    updateCurrentSteg(currentSteg: StegID) {
        this.props.dispatch(søknadActionCreators.setCurrentSteg(currentSteg));
    }

    handleAvbrytSøknad() {
        this.props.dispatch(søknadActionCreators.avbrytSøknad());
        this.props.history.push(routeConfig.APP_ROUTE_PREFIX);
    }

    handleOnSubmit(e: FormSubmitEvent) {
        console.log('proxy submit');

        this.props.onSubmit(e);
    }

    handleFortsett() {
        const { onRequestNavigateToNextStep } = this.props;
        if (onRequestNavigateToNextStep === undefined || onRequestNavigateToNextStep()) {
            this.navigateToNextStep();
        }
    }

    navigateToNextStep(): void {
        const { id, nesteStegID, dispatch } = this.props;
        const stegConfig = this.getStegConfig();
        const stegToShow = nesteStegID ? nesteStegID : (stegConfig[id].nesteSteg as StegID);
        this.updateCurrentSteg(stegToShow);
        dispatch(apiActionCreators.storeAppState());
        this.props.history.push(søknadStegPath(stegToShow));
    }

    navigateToPreviousStep(): void {
        const { previousStegID, dispatch } = this.props;
        const stegToShow = previousStegID ? previousStegID : this.getPreviousStegID();
        this.updateCurrentSteg(stegToShow);
        dispatch(apiActionCreators.storeAppState());
        this.props.history.push(søknadStegPath(stegToShow));
    }

    findPreviousRoute(): string {
        return `${søknadStegPath(this.getPreviousStegID())}`;
    }

    getPreviousStegID(): StegID {
        const stegConfig = this.getStegConfig();
        const activeStegId = this.props.id;
        const previousStegID =
            Object.keys(stegConfig).find(
                (currentStegId) => stegConfig[currentStegId].index === stegConfig[activeStegId].index - 1
            ) || StegID.INNGANG;
        return previousStegID as StegID;
    }

    handleNavigateToPreviousStepClick() {
        const { confirmNavigateToPreviousStep } = this.props;
        if (confirmNavigateToPreviousStep === undefined) {
            this.navigateToPreviousStep();
            return;
        }
        confirmNavigateToPreviousStep(() => {
            this.navigateToPreviousStep();
        });
    }

    shouldHideBackButton(): boolean {
        const activeStegId = this.props.id;
        const stegConfig = this.getStegConfig();
        return (
            Math.min(...Object.values(stegConfig).map((stegConfigItem: StegConfigItem) => stegConfigItem.index)) ===
            stegConfig[activeStegId].index
        );
    }

    getStegConfig() {
        return getStegConfig(this.props.erEndringssøknad);
    }

    renderContent() {
        const {
            id,
            renderFortsettKnapp,
            fortsettKnappLabel,
            errorSummaryRenderer,
            erEndringssøknad,
            intl
        } = this.props;

        const stegConfig = this.getStegConfig();
        return (
            <>
                <DocumentTitle
                    title={getMessage(intl, 'dokument.tittel.steg', { steg: getMessage(intl, stegConfig[id].tittel) })}
                />
                {errorSummaryRenderer ? <div role="alert">{errorSummaryRenderer()}</div> : null}
                <Block margin="xs">
                    <BackButton
                        text={getMessage(intl, 'tilbake')}
                        hidden={this.shouldHideBackButton()}
                        onClick={this.handleNavigateToPreviousStepClick}
                    />
                </Block>
                <Block>
                    <Stegindikator id={id} erEndringssøknad={erEndringssøknad} />
                </Block>
                {this.props.children}
                {renderFortsettKnapp === true && (
                    <Block>
                        <FortsettKnapp>{fortsettKnappLabel || stegConfig[id].fortsettKnappLabel}</FortsettKnapp>
                    </Block>
                )}
            </>
        );
    }

    render() {
        const { visAvbrytDialog } = this.state;

        const bem = BEMHelper('steg');

        return (
            <React.Fragment>
                <form onSubmit={(e) => this.handleOnSubmit(e)} className={bem.className} aria-live="assertive">
                    {this.renderContent()}
                </form>
                <StegFooter onAvbryt={() => this.setState({ visAvbrytDialog: true })} />
                <AvbrytSøknadDialog
                    synlig={visAvbrytDialog}
                    onAvbrytSøknad={() => this.handleAvbrytSøknad()}
                    onFortsettSøknad={() => this.setState({ visAvbrytDialog: false })}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({ erEndringssøknad: state.søknad.erEndringssøknad });

export default connect(mapStateToProps)(injectIntl(NewSteg));
