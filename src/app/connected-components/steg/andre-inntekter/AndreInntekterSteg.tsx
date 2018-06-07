import * as React from 'react';
import { default as Steg, StegProps } from '../../../components/layout/Steg';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AnnenInntektSiste10MndSpørsmål from '../../../spørsmål/AnnenInntektSiste10MndSpørsmål';
import { AnnenInntektType } from '../../../types/søknad/AnnenInntekt';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { StegID } from '../../../util/stegConfig';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { HistoryProps } from '../../../types/common';

interface AndreInntekterStegProps {
    stegProps: StegProps;
}

interface State {
    andreInntekter: AnnenInntektType[];
}

type Props = AndreInntekterStegProps & InjectedIntlProps & HistoryProps;

class AndreInntekterSteg extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            andreInntekter: []
        };
        this.toggleInntektstype = this.toggleInntektstype.bind(this);
    }

    toggleInntektstype(value: AnnenInntektType) {
        const { andreInntekter } = this.state;
        const indexOfValue = andreInntekter.indexOf(value);
        if (indexOfValue >= 0) {
            const newAndreInntekter = [...andreInntekter];
            newAndreInntekter.splice(indexOfValue, 1);
            return this.setState({
                andreInntekter: newAndreInntekter
            });
        }
        this.setState({
            andreInntekter: [...andreInntekter, value]
        });
    }

    render() {
        const { andreInntekter } = this.state;
        const { stegProps, intl } = this.props;
        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <AnnenInntektSiste10MndSpørsmål
                            andreInntekter={andreInntekter}
                            onChange={(value: AnnenInntektType) =>
                                this.toggleInntektstype(value)
                            }
                            intl={intl}
                        />
                    )}
                />
            </Steg>
        );
    }
}
export default injectIntl(
    connect((state: AppState, props: Props) => {
        const { history } = props;

        const stegProps: StegProps = {
            id: StegID.ANDRE_INNTEKTER,
            renderFortsettKnapp: true,
            history
        };

        return {
            stegProps,
            ...props
        };
    })(AndreInntekterSteg)
);
