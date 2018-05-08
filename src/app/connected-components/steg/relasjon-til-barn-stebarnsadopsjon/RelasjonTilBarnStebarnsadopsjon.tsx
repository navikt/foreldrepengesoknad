import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from '../../../redux/types';
import { AppState } from '../../../redux/reducers';
import Steg from '../../../components/layout/Steg';
import { StegID } from '../../../util/stegConfig';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import {
    Adopsjonsbarn,
    AdopsjonsbarnPartial
} from '../../../types/søknad/Barn';
import DatoInput from '../../../components/dato-input/DatoInput';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from '../../../components/labeltekst/Labeltekst';

import stegUtils from './stegUtils';

export interface StateProps {
    barn: Adopsjonsbarn;
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

class RelasjonTilBarnStebarnsadopsjon extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateSøknad({
                barn: {
                    ...this.props.barn,
                    antallBarn: antall,
                    fødselsdatoer: stegUtils.trimFødselsdatoer(
                        antall,
                        this.props.barn.fødselsdatoer
                    )
                }
            })
        );
    }

    oppdaterState(barn: AdopsjonsbarnPartial) {
        this.props.dispatch(
            søknadActions.updateSøknad({
                barn: { ...this.props.barn, ...barn }
            })
        );
    }

    render() {
        const { barn, intl } = this.props;
        return (
            <Steg id={StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="adopsjonsdato"
                            label={
                                <Labeltekst intlId="stebarnsadopsjon.adopsjonsdato" />
                            }
                            onChange={(dato) =>
                                this.oppdaterState({ adopsjonsdato: dato })
                            }
                            dato={barn.adopsjonsdato}
                        />
                    )}
                />
                <Spørsmål
                    animert={false}
                    synlig={barn.adopsjonsdato !== undefined}
                    margin="none"
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={intl.formatMessage({
                                id: 'stebarnsadopsjon.antallBarn'
                            })}
                            inputName="stebarnsadopsjon.antallBarn.input"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />
                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={stegUtils.fødselsdatoerFromString(
                                barn.fødselsdatoer
                            )}
                            onChange={(fødselsdatoer) =>
                                this.oppdaterState({
                                    fødselsdatoer: stegUtils.fødselsdatoerToString(
                                        fødselsdatoer
                                    )
                                })
                            }
                        />
                    )}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        barn: state.søknad.barn as Adopsjonsbarn
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnStebarnsadopsjon)
);
