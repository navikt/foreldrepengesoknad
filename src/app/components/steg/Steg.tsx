import * as React from 'react';
import stegConfig, { StegID } from '../../util/routing/stegConfig';
import { History } from 'history';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';
import ValidForm from 'common/lib/validation/ValidForm';
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

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    history: History;
    onSubmit?: () => void;
    isAvailable?: boolean;
}

type Props = StegProps & InjectedIntlProps;

class Steg extends React.Component<Props & DispatchProps> {
    constructor(props: Props & DispatchProps) {
        super(props);

        const { isAvailable, history } = props;
        if (isAvailable === false) {
            history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit() {
        const { id, history, onSubmit, dispatch } = this.props;

        if (onSubmit) {
            onSubmit();
        } else {
            dispatch(apiActionCreators.storeAppState());
            history.push(`${søknadStegPath(stegConfig[id].nesteSteg)}`);
        }
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
            <ValidForm {...formProps}>
                <div className="blokk-m">
                    <Stegindikator id={id} />
                </div>

                {this.props.children}
                {renderFortsettKnapp === true && (
                    <FortsettKnapp>
                        {stegConfig[id].fortsettKnappLabel}
                    </FortsettKnapp>
                )}
            </ValidForm>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => props;
export default injectIntl(connect(mapStateToProps)(Steg));
