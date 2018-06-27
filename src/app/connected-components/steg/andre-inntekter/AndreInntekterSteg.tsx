import * as React from 'react';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
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
import Søker from '../../../types/søknad/Søker';
import FrilanserBolk from '../../../bolker/FrilanserBolk';
import Bolk from '../../../../common/components/bolk/Bolk';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import SelvstendigNæringsdrivendeBolk from '../../../bolker/SelvstendigNæringsdrivendeBolk';
import HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål from '../../../spørsmål/HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål';
import { Næring } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

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
        this.renderSelvstendigNæringsdrivendeSiste10MndSpørsmål = this.renderSelvstendigNæringsdrivendeSiste10MndSpørsmål.bind(
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

    renderSelvstendigNæringsdrivendeSiste10MndSpørsmål() {
        const { søker, dispatch } = this.props;
        const { harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

        return (
            <Spørsmål
                render={() => (
                    <HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd={
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
                        }
                        onChange={(value: boolean) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: value
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
                <Bolk
                    render={() => (
                        <FrilanserBolk
                            søker={søker}
                            onChangeSøker={(søkerProperties: Søker) =>
                                dispatch(
                                    søknadActions.updateSøker(søkerProperties)
                                )
                            }
                            onChangeFrilansinformasjon={(
                                frilansInformasjon: FrilansInformasjon
                            ) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        frilansInformasjon
                                    })
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    render={() => (
                        <SelvstendigNæringsdrivendeBolk
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'selvstendigNæringsdrivende.oppfølgingsspørsmål'
                            )}
                            renderSpørsmål={
                                this
                                    .renderSelvstendigNæringsdrivendeSiste10MndSpørsmål
                            }
                            showNæringsPerioderContent={
                                søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd ===
                                true
                            }
                            næringListe={
                                søker.selvstendigNæringsdrivendeInformasjon ||
                                []
                            }
                            onChange={(updatedNæringer: Næring[]) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        selvstendigNæringsdrivendeInformasjon: updatedNæringer
                                    })
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    synlig={
                        søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd !==
                        undefined
                    }
                    render={() => (
                        <AndreInntekterBolk
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'annenInntekt.oppfølgingsspørsmål'
                            )}
                            renderSpørsmål={
                                this.renderAnnenInntektSiste10MndSpørsmål
                            }
                            showAndreInntekterPeriodeContent={
                                harHattAnnenInntektSiste10Mnd
                            }
                            andreInntekterSiste10Mnd={
                                søker.andreInntekterSiste10Mnd
                            }
                            onChange={(andreInntekterSiste10Mnd) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        andreInntekterSiste10Mnd
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
            renderFortsettKnapp:
                søker && søker.harJobbetSomFrilansSiste10Mnd !== undefined,
            history
        };

        return {
            søker,
            stegProps,
            ...props
        };
    })(AndreInntekterSteg)
);
