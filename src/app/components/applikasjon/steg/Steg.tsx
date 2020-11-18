import * as React from 'react';
import { getStegConfig, StegConfigItem, StegID } from '../../../util/routing/stegConfig';
import { History } from 'history';
import FortsettKnapp from 'app/components/applikasjon/steg/fortsettKnapp/FortsettKnapp';
import ValiderbarForm, { FormSubmitEvent, ValiderbarFormProps } from 'common/lib/validation/elements/ValiderbarForm';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { søknadStegPath } from '../../../steg/StegRoutes';
import routeConfig from '../../../util/routing/routeConfig';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import BEMHelper from 'common/util/bem';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import StegFooter from '../stegFooter/StegFooter';
import BackButton from 'app/components/applikasjon/steg/backButton/BackButton';
import Block from 'common/components/block/Block';
import AvbrytSøknadDialog from '../../dialoger/avbrytSøknadDialog/AvbrytSøknadDialog';
import søknadActionCreators from '../../../redux/actions/søknad/søknadActionCreators';
import DocumentTitle from 'react-document-title';
import FortsettSøknadSenereDialog from '../../dialoger/fortsettSøknadSenereDialog/FortsettSøknadSenereDialog';
import Stegindikator from '../stegindikator/Stegindikator';

import './steg.less';
import Environment from 'app/Environment';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';

interface RenderStegContentOptions {
    onValidFormSubmit: () => void;
}

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    fortsettKnappLabel?: string;
    renderFormTag?: boolean;
    renderAlleSpørsmålMåBesvares: boolean;
    history: History;
    isAvailable?: boolean;
    nesteStegID?: StegID;
    previousStegID?: StegID;
    errorSummaryRenderer?: () => React.ReactNode;
    onSubmit?: (event?: FormSubmitEvent) => void;
    onPreSubmit?: () => void;
    onRequestNavigateToNextStep?: () => boolean;
    submitButtonId?: string;
    confirmNavigateToPreviousStep?: (callback: () => void) => void;
    renderProp?: (props: RenderStegContentOptions) => React.ReactNode;
    children?: React.ReactNode;
}

interface OwnProps {
    intl: IntlShape;
}

interface StateProps {
    erEndringssøknad: boolean;
    erEnkelEndringssøknad?: boolean;
}

interface State {
    visAvbrytDialog: boolean;
    visFortsettSenereDialog: boolean;
}

type Props = StateProps & StegProps & OwnProps;

class Steg extends React.Component<Props & DispatchProps, State> {
    constructor(props: Props & DispatchProps) {
        super(props);

        const { isAvailable, history } = props;
        if (isAvailable === false) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        this.state = {
            visAvbrytDialog: false,
            visFortsettSenereDialog: false,
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleFortsett = this.handleFortsett.bind(this);
        this.navigateToPreviousStep = this.navigateToPreviousStep.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleNavigateToPreviousStepClick = this.handleNavigateToPreviousStepClick.bind(this);
        this.updateCurrentSteg = this.updateCurrentSteg.bind(this);
        this.getStegConfig = this.getStegConfig.bind(this);
        this.handleAvsluttOgFortsettSenere = this.handleAvsluttOgFortsettSenere.bind(this);
    }

    updateCurrentSteg(currentSteg: StegID) {
        this.props.dispatch(søknadActionCreators.setCurrentSteg(currentSteg));
    }

    handleAvbrytSøknad() {
        this.props.dispatch(søknadActionCreators.avbrytSøknad());
        this.props.history.push(routeConfig.APP_ROUTE_PREFIX);
    }

    handleAvsluttOgFortsettSenere() {
        (window as any).location = Environment.FAMILIE;
    }

    handleOnSubmit(event?: FormSubmitEvent) {
        if (this.props.onSubmit) {
            this.props.onSubmit(event);
            return;
        }
        const { onPreSubmit, onRequestNavigateToNextStep } = this.props;
        if (onPreSubmit) {
            onPreSubmit();
        }
        if (onRequestNavigateToNextStep === undefined || onRequestNavigateToNextStep()) {
            this.navigateToNextStep();
        }
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
        const stegConfigArray = stegConfig !== undefined ? Object.keys(stegConfig) : [];
        const previousStegID =
            stegConfigArray.find(
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
        return getStegConfig(this.props.erEndringssøknad, this.props.erEnkelEndringssøknad);
    }

    renderContent() {
        const {
            id,
            renderFortsettKnapp,
            fortsettKnappLabel,
            errorSummaryRenderer,
            erEndringssøknad,
            erEnkelEndringssøknad,
            submitButtonId,
            intl,
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
                        ariaLabel={stegConfig[id].tilbakeLabel}
                    />
                </Block>
                <Block>
                    <Stegindikator
                        id={id}
                        erEndringssøknad={erEndringssøknad}
                        erEnkelEndringssøknad={erEnkelEndringssøknad}
                    />
                </Block>
                {this.props.renderProp
                    ? this.props.renderProp({ onValidFormSubmit: () => this.handleFortsett() })
                    : this.props.children}
                {renderFortsettKnapp === true && (
                    <Block>
                        <FortsettKnapp
                            submitButtonId={submitButtonId}
                            onClick={this.props.renderFormTag ? undefined : () => this.handleFortsett()}
                        >
                            {fortsettKnappLabel || stegConfig[id].fortsettKnappLabel}
                        </FortsettKnapp>
                    </Block>
                )}
            </>
        );
    }

    render() {
        const { renderFormTag, renderFortsettKnapp, renderAlleSpørsmålMåBesvares, intl } = this.props;
        const { visAvbrytDialog, visFortsettSenereDialog } = this.state;

        const bem = BEMHelper('steg');
        const formProps: ValiderbarFormProps = {
            className: bem.block,
            summaryTitle: getMessage(intl, 'validering.oppsummeringstittel'),
            onSubmit: this.handleOnSubmit,
        };

        return (
            <>
                {renderFormTag ? (
                    <ValiderbarForm {...formProps}>{this.renderContent()}</ValiderbarForm>
                ) : (
                    <div className={bem.block} aria-live="assertive">
                        {this.renderContent()}
                    </div>
                )}
                {renderAlleSpørsmålMåBesvares === true && renderFortsettKnapp === false && (
                    <div style={{ marginBottom: '1rem' }}>
                        <UnansweredQuestionsInfo>
                            {getMessage(intl, 'steg.footer.spørsmålMåBesvares')}
                        </UnansweredQuestionsInfo>
                    </div>
                )}
                <StegFooter
                    onAvbryt={() => this.setState({ visAvbrytDialog: true })}
                    onFortsettSenere={() => this.setState({ visFortsettSenereDialog: true })}
                />
                <FortsettSøknadSenereDialog
                    synlig={visFortsettSenereDialog}
                    onFortsettSøknadSenere={() => this.handleAvsluttOgFortsettSenere()}
                    onFortsettSøknad={() => this.setState({ visFortsettSenereDialog: false })}
                />
                <AvbrytSøknadDialog
                    synlig={visAvbrytDialog}
                    onAvbrytSøknad={() => this.handleAvbrytSøknad()}
                    onFortsettSøknad={() => this.setState({ visAvbrytDialog: false })}
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    erEnkelEndringssøknad: state.søknad.ekstrainfo.erEnkelEndringssøknad === true,
    erEndringssøknad: state.søknad.erEndringssøknad,
});

export default connect(mapStateToProps)(injectIntl(Steg));
