import * as React from 'react';

import './plussMinusTeller.less';
import MinusIkonSirkel from 'common/components/ikoner/MinusIkonSirkel';
import PlussIkonSirkel from 'common/components/ikoner/PlussIkonSirkel';
import ValiderbarInput from 'common/lib/validation/elements/ValiderbarInput';
import MinusIkonSirkelDisabled from 'common/components/ikoner/MinusIkonSirkelDisabled';
import { injectIntl, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface PlussMinusTellerProps {
    name: string;
    label: string;
    intl: InjectedIntl;
    onChange?: (count: number) => void;
}

interface StateProps {
    count: number;
}

class PlussMinusTeller extends React.Component<PlussMinusTellerProps, StateProps> {
    constructor(props: PlussMinusTellerProps) {
        super(props);
        this.state = {
            count: 0
        };
    }

    increaseCount() {
        this.setState({ count: this.state.count + 1 });
    }

    decreaseCount() {
        if (this.state.count > 0) {
            this.setState({ count: this.state.count - 1 });
        }
    }

    handleChange(source: string, onChange?: (count: number) => void) {
        if (source === 'plus') {
            this.increaseCount();
        } else if (source === 'minus') {
            this.decreaseCount();
        }

        if (onChange !== undefined) {
            onChange(this.state.count);
        }
    }

    render() {
        const { onChange, label, intl } = this.props;

        return (
            <div className="plussMinusTeller">
                <button
                    className="plussMinusTeller__knapp"
                    onClick={(e) => {
                        e.preventDefault();
                        this.handleChange('minus', onChange);
                    }}>
                    {this.state.count === 0 ? <MinusIkonSirkelDisabled /> : <MinusIkonSirkel />}
                </button>
                <ValiderbarInput name={name} label={getMessage(intl, label)} bredde="XS" value={this.state.count} />
                <button
                    className="plussMinusTeller__knapp"
                    onClick={(e) => {
                        e.preventDefault();
                        this.handleChange('plus', onChange);
                    }}>
                    <PlussIkonSirkel />
                </button>
            </div>
        );
    }
}

export default injectIntl(PlussMinusTeller);
