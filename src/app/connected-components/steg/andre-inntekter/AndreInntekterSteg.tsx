import * as React from 'react';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import Block from 'common/components/block/Block';
import AnnenInntektSiste10MndSpørsmål, { AnnenInntekt } from '../../../spørsmål/AnnenInntektSiste10MndSpørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { StegID } from '../../../util/routing/stegConfig';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import AndreInntekterBolk from '../../../bolker/AndreInntekterBolk';
import { DispatchProps } from 'common/redux/types';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../types/søknad/Søker';
import FrilanserBolk from '../../../bolker/frilanser-bolk/FrilanserBolk';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import SelvstendigNæringsdrivendeBolk from '../../../bolker/SelvstendigNæringsdrivendeBolk';
import HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål from '../../../spørsmål/HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål';
import { Næring } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import isAvailable from '../util/isAvailable';
import { annenInntektErGyldig } from '../../../util/validation/steg/annenInntekt';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import visibility from './visibility';
import cleanupAndreInntekterSteg from '../../../util/cleanup/cleanupAndreInntekterSteg';
import { HistoryProps } from '../../../types/common';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import YtelseInfoWrapper from 'common/components/ytelser-infobox/InformasjonOmYtelserWrapper';

interface StateProps {
    stegProps: StegProps;
    arbeidsforhold: Arbeidsforhold[];
    søker: Søker;
}

type Props = SøkerinfoProps & HistoryProps & StateProps & InjectedIntlProps & DispatchProps;

class AndreInntekterSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.updateSøkerAndSave = this.updateSøkerAndSave.bind(this);
        this.state = {
            harHattAnnenInntekt: undefined
        };
        this.renderAnnenInntektSiste10MndSpørsmål = this.renderAnnenInntektSiste10MndSpørsmål.bind(this);
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
                                harHattAnnenInntektSiste10Mnd: value === AnnenInntekt.HAR_HATT_ANNEN_INNTEKT
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
                    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd={harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd}
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

    cleanupSteg() {
        const { søker, dispatch } = this.props;
        dispatch(søknadActions.updateSøker(cleanupAndreInntekterSteg(søker)));
    }

    render() {
        const { stegProps, søker, arbeidsforhold, dispatch, intl } = this.props;
        const { harHattAnnenInntektSiste10Mnd } = søker;

        return (
            <Steg {...stegProps} onPreSubmit={this.cleanupSteg}>
                <Block
                    header={{
                        title: getMessage(intl, 'annenInntekt.ytelser.label')
                    }}>
                    <YtelseInfoWrapper ytelser={[]} />
                </Block>
                <Block
                    header={{
                        title: getMessage(intl, 'annenInntekt.arbeidsforhold.label'),
                        info: getMessage(intl, 'annenInntekt.arbeidsforhold.infotekst')
                    }}>
                    <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
                </Block>

                <Block hasChildBlocks={true} margin="none">
                    <FrilanserBolk
                        søker={søker}
                        onChangeSøker={(søkerProperties: Søker) => dispatch(søknadActions.updateSøker(søkerProperties))}
                        onChangeFrilansinformasjon={(frilansInformasjon: FrilansInformasjon) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    frilansInformasjon
                                })
                            )
                        }
                    />
                </Block>

                <Block hasChildBlocks={true} margin="none" visible={visibility.selvstendigNæringsdrivendeBolk(søker)}>
                    <SelvstendigNæringsdrivendeBolk
                        renderSpørsmål={this.renderSelvstendigNæringsdrivendeSiste10MndSpørsmål}
                        showNæringsPerioderContent={søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true}
                        næringListe={søker.selvstendigNæringsdrivendeInformasjon || []}
                        onChange={(updatedNæringer: Næring[]) =>
                            this.updateSøkerAndSave({
                                selvstendigNæringsdrivendeInformasjon: updatedNæringer
                            })
                        }
                    />
                </Block>

                <Block hasChildBlocks={true} margin="none" visible={visibility.andreInntekterBolk(søker)}>
                    <AndreInntekterBolk
                        renderSpørsmål={this.renderAnnenInntektSiste10MndSpørsmål}
                        showAndreInntekterPeriodeContent={harHattAnnenInntektSiste10Mnd}
                        andreInntekterSiste10Mnd={søker.andreInntekterSiste10Mnd || []}
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

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { søknad } = state;
    const { history } = props;
    const { søker } = søknad;
    const { arbeidsforhold } = props.søkerinfo;

    const stegProps: StegProps = {
        id: StegID.ANDRE_INNTEKTER,
        renderFortsettKnapp: annenInntektErGyldig(søker),
        renderFormTag: true,
        history,
        isAvailable: isAvailable(
            StegID.ANDRE_INNTEKTER,
            state.søknad,
            props.søkerinfo,
            state.uttaksplanValidering.erGyldig
        )
    };

    return {
        søker,
        arbeidsforhold,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(AndreInntekterSteg));
