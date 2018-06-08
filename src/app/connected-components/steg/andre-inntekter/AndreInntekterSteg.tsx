import * as React from 'react';
import { default as Steg, StegProps } from '../../../components/layout/Steg';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AnnenInntektSiste10MndSpørsmål, {
    AnnenInntekt
} from '../../../spørsmål/AnnenInntektSiste10MndSpørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { StegID } from '../../../util/stegConfig';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { HistoryProps } from '../../../types/common';

interface AndreInntekterStegProps {
    stegProps: StegProps;
}

interface State {
    harHattAnnenInntekt?: AnnenInntekt;
}

type Props = AndreInntekterStegProps & InjectedIntlProps & HistoryProps;

class AndreInntekterSteg extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            harHattAnnenInntekt: undefined
        };
    }

    render() {
        const { harHattAnnenInntekt } = this.state;
        const { stegProps } = this.props;
        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <AnnenInntektSiste10MndSpørsmål
                            harHattAnnenInntekt={harHattAnnenInntekt}
                            onChange={(value: AnnenInntekt) =>
                                this.setState({ harHattAnnenInntekt: value })
                            }
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
