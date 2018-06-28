import * as React from 'react';
import stegConfig, { StegID } from '../../util/routing/stegConfig';
import { History } from 'history';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';
import ValidForm from 'common/lib/validation/ValidForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { søknadStegPath } from '../../connected-components/steg/StegRoutes';

export interface StegProps {
    id: StegID;
    renderFortsettKnapp?: boolean;
    history: History;
    onSubmit?: () => void;
}

type Props = StegProps & InjectedIntlProps;

class Steg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit() {
        const { id, history } = this.props;
        history.push(`${søknadStegPath(stegConfig[id].nesteSteg)}`);
    }

    render() {
        const { id, renderFortsettKnapp, intl } = this.props;

        const formProps = {
            className: 'steg',
            summaryTitle: getMessage(intl, 'validering.oppsummeringstittel'),
            onSubmit: this.handleOnSubmit
        };

        return (
            <ValidForm {...formProps}>
                <h1 className="steg__tittel">{stegConfig[id].tittel}</h1>
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

export default injectIntl(Steg);
