import * as React from 'react';
import * as ReactDOM from 'react-dom';
import stegConfig, { StegID } from '../../util/routing/stegConfig';
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

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    history: History;
    onSubmit?: (event: FormSubmitEvent, stegFormRef: Element | null | Text) => void;
    isAvailable?: boolean;
    nesteStegRoute?: StegID;
    preSubmit?: () => void;
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
    }

    getFormElement() {
        const el = this.stegFormRef.current;
        return ReactDOM.findDOMNode(el as React.ReactInstance);
    }

    handleOnSubmit(event: FormSubmitEvent) {
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

    navigateToNextStep() {
        const { id, nesteStegRoute } = this.props;

        const nextStepPathname = nesteStegRoute ? nesteStegRoute : `${søknadStegPath(stegConfig[id].nesteSteg)}`;

        this.props.history.push(nextStepPathname);
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
                    <div className="blokk-m">
                        <Stegindikator id={id} />
                    </div>

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
