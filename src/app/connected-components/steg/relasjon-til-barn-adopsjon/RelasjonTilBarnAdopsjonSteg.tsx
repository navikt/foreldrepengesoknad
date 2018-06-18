import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StegID } from '../../../util/stegConfig';
import { DispatchProps } from 'common/redux/types';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import AdoptertIUtlandetSpørsmål from '../../../spørsmål/AdoptertIUtlandetSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import DatoInput from 'common/components/dato-input/DatoInput';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import utils from '../../../util/fødselsdato';
import { AppState } from '../../../redux/reducers';
import Steg, { StegProps } from '../../../components/layout/Steg';
import Bolk from '../../../components/layout/Bolk';
import Søknadsvedlegg from '../../../components/søknadsvedlegg/Søknadsvedlegg';
import { getSøknadsvedlegg } from '../../../util/vedleggUtil';
import { HistoryProps } from '../../../types/common';

interface StateProps {
    barn: Adopsjonsbarn;
    visSpørsmålOmAntallBarn: boolean;
    stegProps: StegProps;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnAdopsjonSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                ...this.props.barn,
                antallBarn: antall,
                fødselsdatoer: utils.trimFødselsdatoer(
                    antall,
                    this.props.barn.fødselsdatoer
                )
            })
        );
    }

    render() {
        const {
            visSpørsmålOmAntallBarn,
            barn,
            dispatch,
            stegProps,
            intl
        } = this.props;

        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="adopsjonsdato"
                            label={getMessage(intl, 'adopsjonsdato.spørsmål')}
                            onChange={(adopsjonsdato: Date) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        adopsjonsdato
                                    })
                                );
                            }}
                            dato={barn.adopsjonsdato}
                        />
                    )}
                />

                <Bolk
                    tittel={getMessage(
                        intl,
                        'vedlegg.tittel.omsorgsovertakelse'
                    )}
                    render={() => <Søknadsvedlegg type="omsorgsovertakelse" />}
                />

                <Spørsmål
                    synlig={visSpørsmålOmAntallBarn}
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={getMessage(
                                intl,
                                'antallBarn.spørsmål.venter'
                            )}
                            inputName="antallBarn"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={barn.fødselsdatoer || []}
                            onChange={(fødselsdatoer: Date[]) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        fødselsdatoer
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.fødselsdatoer.length > 0}
                    render={() => (
                        <AdoptertIUtlandetSpørsmål
                            adoptertIUtlandet={barn.adoptertIUtlandet}
                            onChange={(adoptertIUtlandet) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        adoptertIUtlandet
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

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn as Adopsjonsbarn;

    const stegProps = {
        id: StegID.RELASJON_TIL_BARN_ADOPSJON,
        renderFortsettKnapp: barn.adoptertIUtlandet !== undefined,
        history: props.history
    };

    return {
        barn,
        visSpørsmålOmAntallBarn:
            getSøknadsvedlegg('omsorgsovertakelse', state).length > 0,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnAdopsjonSteg)
);
