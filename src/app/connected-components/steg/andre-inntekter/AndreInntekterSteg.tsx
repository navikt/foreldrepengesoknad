import * as React from 'react';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import Block from 'common/components/block/Block';
import AnnenInntektSiste10MndSpørsmål, {
    AnnenInntekt
} from '../../../spørsmål/AnnenInntektSiste10MndSpørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { StegID } from '../../../util/routing/stegConfig';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { HistoryProps } from '../../../types/common';
import AndreInntekterBolk from '../../../bolker/AndreInntekterBolk';
import { DispatchProps } from 'common/redux/types';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../types/søknad/Søker';
import FrilanserBolk from '../../../bolker/FrilanserBolk';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import SelvstendigNæringsdrivendeBolk from '../../../bolker/SelvstendigNæringsdrivendeBolk';
import HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål from '../../../spørsmål/HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål';
import { Næring } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import isAvailable from '../isAvailable';
import { annenInntektErGyldig } from '../../../util/validation/steg/annenInntekt';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import ArbeidsforholdInfoWrapper from 'common/components/arbeidsforhold-infobox/ArbeidsforholdInfoWrapper';

interface AndreInntekterStegProps {
    stegProps: StegProps;
    arbeidsforhold: Arbeidsforhold[];
    søker: Søker;
}

type Props = AndreInntekterStegProps &
    InjectedIntlProps &
    HistoryProps &
    DispatchProps;

class AndreInntekterSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.updateSøkerAndSave = this.updateSøkerAndSave.bind(this);
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

    updateSøkerAndSave(søker: Partial<Søker>) {
        this.props.dispatch(søknadActions.updateSøkerAndStorage(søker));
    }

    renderAnnenInntektSiste10MndSpørsmål() {
        const { søker, dispatch } = this.props;
        const { harHattAnnenInntektSiste10Mnd } = søker;

        return (
            <Block>
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
            </Block>
        );
    }

    renderSelvstendigNæringsdrivendeSiste10MndSpørsmål() {
        const { søker, dispatch } = this.props;
        const { harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

        return (
            <Block>
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
            </Block>
        );
    }

    render() {
        const { stegProps, søker, arbeidsforhold, dispatch, intl } = this.props;
        const { harHattAnnenInntektSiste10Mnd } = søker;

        return (
            <Steg {...stegProps}>
                <Block
                    header={{
                        title: getMessage(
                            intl,
                            'annenInntekt.arbeidsforhold.label'
                        ),
                        info: getMessage(
                            intl,
                            'annenInntekt.arbeidsforhold.infotekst'
                        )
                    }}>
                    <ArbeidsforholdInfoWrapper
                        arbeidsforhold={arbeidsforhold}
                    />
                </Block>
                <Block>
                    <FrilanserBolk
                        søker={søker}
                        onChangeSøker={(søkerProperties: Søker) =>
                            dispatch(søknadActions.updateSøker(søkerProperties))
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
                </Block>
                <Block>
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
                            søker.selvstendigNæringsdrivendeInformasjon || []
                        }
                        onChange={(updatedNæringer: Næring[]) =>
                            this.updateSøkerAndSave({
                                selvstendigNæringsdrivendeInformasjon: updatedNæringer
                            })
                        }
                    />
                </Block>
                <Block>
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
                </Block>
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
            renderFortsettKnapp: annenInntektErGyldig(søker),
            history,
            isAvailable: isAvailable(StegID.ANDRE_INNTEKTER, state)
        };

        return {
            søker,
            arbeidsforhold: state.api.arbeidsforhold,
            stegProps,
            ...props
        };
    })(AndreInntekterSteg)
);
