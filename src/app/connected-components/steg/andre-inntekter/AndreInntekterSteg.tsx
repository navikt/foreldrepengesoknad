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
import { DispatchProps } from 'common/redux/types';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import getMessage from 'common/util/i18nUtils';
import ErDuFrilanserSpørsmål from '../../../spørsmål/ErDuFrilanserSpørsmål';
import ErDuSelvstendigNæringsdrivendeSpørsmål from '../../../spørsmål/ErDuSelvstendigNæringsdrivendeSpørsmål';
import Søker from '../../../types/søknad/Søker';

interface AndreInntekterStegProps {
    stegProps: StegProps;
    søker: Søker;
}

type Props = AndreInntekterStegProps &
    InjectedIntlProps &
    HistoryProps &
    DispatchProps;

class AndreInntekterSteg extends React.Component<Props> {
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
        const { søker, dispatch } = this.props;
        const { harHattAnnenInntektSiste10Mnd } = søker;

        return (
            <Spørsmål
                render={() => (
                    <AnnenInntektSiste10MndSpørsmål
                        harHattAnnenInntekt={harHattAnnenInntektSiste10Mnd}
                        onChange={(value: AnnenInntekt) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    harHattAnnenInntektSiste10Mnd:
                                        value ===
                                        AnnenInntekt.HAR_HATT_ANNEN_INNTEKT
                                })
                            )
                        }
                    />
                )}
            />
        );
    }

    render() {
        const { stegProps, søker, dispatch, intl } = this.props;
        const { harHattAnnenInntektSiste10Mnd } = søker;

        return (
            <Steg
                {...stegProps}
                renderFortsettKnapp={
                    harHattAnnenInntektSiste10Mnd === false ||
                    (harHattAnnenInntektSiste10Mnd === true &&
                        søker.andreInntekterSiste10Mnd.length > 0)
                }>
                <AndreInntekterBolk
                    oppfølgingsspørsmål={getMessage(
                        intl,
                        'annenInntekt.oppfølgingsspørsmål'
                    )}
                    renderSpørsmål={this.renderAnnenInntektSiste10MndSpørsmål}
                    showAndreInntekterPeriodeContent={
                        harHattAnnenInntektSiste10Mnd
                    }
                    andreInntekterSiste10Mnd={søker.andreInntekterSiste10Mnd}
                    onChange={(andreInntekterSiste10Mnd) =>
                        dispatch(
                            søknadActions.updateSøker({
                                andreInntekterSiste10Mnd
                            })
                        )
                    }
                />

                <Spørsmål
                    synlig={
                        harHattAnnenInntektSiste10Mnd === false ||
                        (harHattAnnenInntektSiste10Mnd === true &&
                            søker.andreInntekterSiste10Mnd.length > 0)
                    }
                    render={() => (
                        <ErDuSelvstendigNæringsdrivendeSpørsmål
                            erSelvstendigNæringsdrivende={
                                søker.erSelvstendigNæringsdrivende
                            }
                            onChange={(erSelvstendigNæringsdrivende) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        erSelvstendigNæringsdrivende
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={søker.erSelvstendigNæringsdrivende !== undefined}
                    render={() => (
                        <ErDuFrilanserSpørsmål
                            erFrilanser={søker.erFrilanser}
                            onChange={(erFrilanser) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        erFrilanser
                                    })
                                )
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
        const { søknad } = state;
        const { history } = props;
        const { søker } = søknad;

        const stegProps: StegProps = {
            id: StegID.ANDRE_INNTEKTER,
            renderFortsettKnapp: søker && søker.erFrilanser !== undefined,
            history
        };

        return {
            søker,
            stegProps,
            ...props
        };
    })(AndreInntekterSteg)
);
