import * as React from 'react';
import * as ReactDOM from 'react-dom';
import stegConfig, { StegConfigItem, StegID } from '../../util/routing/stegConfig';
import { History } from 'history';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';
import ValiderbarForm, { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
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

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    renderFormTag?: boolean;
    history: History;
    isAvailable?: boolean;
    nesteStegRoute?: StegID;
    previousStegRoute?: StegID;
    onSubmit?: (event: FormSubmitEvent, stegFormRef: Element | null | Text) => void;
    preSubmit?: () => void;
    confirmNavigateToPreviousStep?: (callback: () => void) => void;
}

interface State {
    visAvbrytDialog: boolean;
}

type Props = StegProps & InjectedIntlProps;

class Steg extends React.Component<Props & DispatchProps, State> {
    private stegFormRef: React.RefObject<ValiderbarForm>;

    constructor(props: Props & DispatchProps) {
        super(props);

        const { isAvailable, history } = props;
        if (isAvailable === false) {
            history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        this.state = {
            visAvbrytDialog: false
        };

        this.stegFormRef = React.createRef();
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.navigateToPreviousStep = this.navigateToPreviousStep.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleNavigateToPreviousStepClick = this.handleNavigateToPreviousStepClick.bind(this);
    }

    handleAvbrytSøknad() {
        this.props.dispatch(søknadActionCreators.avbrytSøknad());
        this.props.history.push(routeConfig.APP_ROUTE_PREFIX);
    }

    getFormElement() {
        const el = this.stegFormRef.current;
        return ReactDOM.findDOMNode(el as React.ReactInstance);
    }

    handleOnSubmit(event: FormSubmitEvent): void {
        const { onSubmit, dispatch, preSubmit } = this.props;
        if (onSubmit) {
            onSubmit(event, this.getFormElement());
        } else {
            if (preSubmit) {
                preSubmit();
            }
            dispatch(apiActionCreators.storeAppState());
            this.navigateToNextStep();
        }
    }

    navigateToNextStep(): void {
        const { id, nesteStegRoute } = this.props;
        const nextStepPathname = nesteStegRoute ? nesteStegRoute : `${søknadStegPath(stegConfig[id].nesteSteg)}`;
        this.props.history.push(nextStepPathname);
    }

    findPreviousRoute(): string {
        const activeStegId = this.props.id;
        const previousStegID =
            Object.keys(stegConfig).find(
                (currentStegId) => stegConfig[currentStegId].index === stegConfig[activeStegId].index - 1
            ) || StegID.INNGANG;
        return `${søknadStegPath(previousStegID)}`;
    }

    navigateToPreviousStep(): void {
        const { previousStegRoute } = this.props;
        const previousStegPathname = previousStegRoute ? previousStegRoute : this.findPreviousRoute();
        this.props.history.push(previousStegPathname);
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
        return (
            Math.min(...Object.values(stegConfig).map((stegConfigItem: StegConfigItem) => stegConfigItem.index)) ===
            stegConfig[activeStegId].index
        );
    }

    renderContent() {
        const { id, renderFortsettKnapp, intl } = this.props;
        return (
            <React.Fragment>
                <Block margin="xs">
                    <BackButton
                        text={getMessage(intl, 'tilbake')}
                        hidden={this.shouldHideBackButton()}
                        onClick={this.handleNavigateToPreviousStepClick}
                    />
                </Block>
                <Block>
                    <Stegindikator id={id} />
                </Block>
                {this.props.children}
                {renderFortsettKnapp === true && (
                    <Block>
                        <FortsettKnapp onClick={this.props.renderFormTag ? undefined : () => this.navigateToNextStep()}>
                            {stegConfig[id].fortsettKnappLabel}
                        </FortsettKnapp>
                    </Block>
                )}
            </React.Fragment>
        );
    }

    render() {
        const { renderFormTag, intl } = this.props;
        const { visAvbrytDialog } = this.state;

        const bem = BEMHelper('steg');
        const formProps = {
            className: bem.className,
            summaryTitle: getMessage(intl, 'validering.oppsummeringstittel'),
            onSubmit: this.handleOnSubmit
        };

        return (
            <React.Fragment>
                {renderFormTag ? (
                    <ValiderbarForm {...formProps} ref={this.stegFormRef}>
                        {this.renderContent()}
                    </ValiderbarForm>
                ) : (
                    <div className={bem.className}>{this.renderContent()}</div>
                )}
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

const mapStateToProps = (state: AppState, props: Props) => props;
export default injectIntl(connect(mapStateToProps)(Steg));
