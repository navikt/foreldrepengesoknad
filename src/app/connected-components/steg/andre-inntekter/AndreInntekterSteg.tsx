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
import AndreInntekterBolk from '../../../bolker/AndreInntekterBolk';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import getMessage from 'common/util/i18nUtils';

interface AndreInntekterStegProps {
    stegProps: StegProps;
    søknad: Søknad;
}

interface State {
    harHattAnnenInntekt?: AnnenInntekt;
}

type Props = AndreInntekterStegProps &
    InjectedIntlProps &
    HistoryProps &
    DispatchProps;

class AndreInntekterSteg extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            harHattAnnenInntekt: undefined
        };
        this.renderAnnenInntektSiste10MndSpørsmål = this.renderAnnenInntektSiste10MndSpørsmål.bind(
            this
        );
    }

    renderAnnenInntektSiste10MndSpørsmål() {
        const { harHattAnnenInntekt } = this.state;
        return (
            <Spørsmål
                render={() => (
                    <AnnenInntektSiste10MndSpørsmål
                        harHattAnnenInntekt={harHattAnnenInntekt}
                        onChange={(value: AnnenInntekt) =>
                            this.setState({
                                harHattAnnenInntekt: value
                            })
                        }
                    />
                )}
            />
        );
    }

    render() {
        const { harHattAnnenInntekt } = this.state;
        const { stegProps, søknad, dispatch, intl } = this.props;
        return (
            <Steg {...stegProps}>
                <AndreInntekterBolk
                    oppfølgingsspørsmål={getMessage(
                        intl,
                        'annenInntekt.oppfølgingsspørsmål'
                    )}
                    renderSpørsmål={this.renderAnnenInntektSiste10MndSpørsmål}
                    showAndreInntekterPeriodeContent={
                        harHattAnnenInntekt ===
                        AnnenInntekt.HAR_HATT_ANNEN_INNTEKT
                    }
                    andreInntekterSiste10Mnd={søknad.andreInntekterSiste10Mnd}
                    onChange={(andreInntekterSiste10Mnd) =>
                        dispatch(
                            søknadActions.updateSøknad({
                                andreInntekterSiste10Mnd
                            })
                        )
                    }
                />
            </Steg>
        );
    }
}
export default injectIntl(
    connect((state: AppState, props: Props) => {
        const { søknad } = state;
        const { history } = props;

        const stegProps: StegProps = {
            id: StegID.ANDRE_INNTEKTER,
            renderFortsettKnapp: true,
            history
        };

        return {
            søknad,
            stegProps,
            ...props
        };
    })(AndreInntekterSteg)
);
