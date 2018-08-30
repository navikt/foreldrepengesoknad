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

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    history: History;
    onSubmit?: (event: FormSubmitEvent, stegFormRef: Element | null | Text) => void;
    isAvailable?: boolean;
    nesteStegRoute?: StegID;
    previousStegRoute?: StegID;
}

type Props = StegProps & InjectedIntlProps;

class Steg extends React.Component<Props & DispatchProps> {
    private stegFormRef: React.RefObject<ValiderbarForm>;

    constructor(props: Props & DispatchProps) {
        super(props);

        const { isAvailable, history } = props;
        if (isAvailable === false) {
            history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        this.stegFormRef = React.createRef();
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.navigateToPreviousStep = this.navigateToPreviousStep.bind(this);
    }

    getFormElement() {
        const el = this.stegFormRef.current;
        return ReactDOM.findDOMNode(el as React.ReactInstance);
    }

    handleOnSubmit(event: FormSubmitEvent): void {
        const { onSubmit, dispatch } = this.props;
        if (onSubmit) {
            onSubmit(event, this.getFormElement());
        } else {
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

    shouldHideBackButton(): boolean {
        const activeStegId = this.props.id;
        return (
            Math.min(...Object.values(stegConfig).map((stegConfigItem: StegConfigItem) => stegConfigItem.index)) ===
            stegConfig[activeStegId].index
        );
    }

    render() {
        const { id, renderFortsettKnapp, intl } = this.props;

        const bem = BEMHelper('steg');
        const formProps = {
            className: bem.className,
            summaryTitle: getMessage(intl, 'validering.oppsummeringstittel'),
            onSubmit: this.handleOnSubmit
        };

        return (
            <React.Fragment>
                <ValiderbarForm {...formProps} ref={this.stegFormRef}>
                    <Block margin="xs">
                        <BackButton
                            text={getMessage(intl, 'tilbake')}
                            hidden={this.shouldHideBackButton()}
                            onClick={this.navigateToPreviousStep}
                        />
                    </Block>
                    <Block>
                        <Stegindikator id={id} />
                    </Block>

                    {this.props.children}
                    {renderFortsettKnapp === true && <FortsettKnapp>{stegConfig[id].fortsettKnappLabel}</FortsettKnapp>}
                </ValiderbarForm>
                <StegFooter />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => props;
export default injectIntl(connect(mapStateToProps)(Steg));
