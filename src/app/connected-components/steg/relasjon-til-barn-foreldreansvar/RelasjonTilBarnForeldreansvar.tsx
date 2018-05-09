import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DispatchProps } from '../../../redux/types';
import { AppState } from '../../../redux/reducers';
import Steg from '../../../components/layout/Steg';
import { StegID } from '../../../util/stegConfig';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import DatoInput from '../../../components/dato-input/DatoInput';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from '../../../components/labeltekst/Labeltekst';

import utils from '../../../util/fødselsdato';
import { ForeldreansvarBarnPartial } from '../../../types/søknad/Barn';
import Veilederinfo from '../../../components/veileder-info/Veilederinfo';
import { Fødselsdato } from '../../../types/common';
import { getAlderFraDato } from '../../../util/dates';

export interface StateProps {
    barn: ForeldreansvarBarnPartial;
    visOver15årMelding: boolean;
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

class RelasjonTilBarnForeldreansvar extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
        this.oppdaterState = this.oppdaterState.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateSøknad({
                barn: {
                    ...this.props.barn,
                    antallBarn: antall,
                    fødselsdatoer: utils.trimFødselsdatoer(
                        antall,
                        this.props.barn.fødselsdatoer
                    )
                }
            })
        );
    }

    oppdaterState(barn: ForeldreansvarBarnPartial) {
        this.props.dispatch(
            søknadActions.updateSøknad({
                barn: { ...this.props.barn, ...barn }
            })
        );
    }

    render() {
        const { barn, visOver15årMelding, intl } = this.props;
        return (
            <Steg id={StegID.RELASJON_TIL_BARN_FORELDREANSVAR}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="foreldreansvar_dato"
                            label={
                                <Labeltekst intlId="foreldreansvar.overtakelsedato" />
                            }
                            onChange={(dato) =>
                                this.oppdaterState({
                                    foreldreansvarsdato: dato
                                })
                            }
                            dato={barn.foreldreansvarsdato}
                        />
                    )}
                />
                <Spørsmål
                    animert={false}
                    synlig={barn.foreldreansvarsdato !== undefined}
                    margin="none"
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={intl.formatMessage({
                                id: 'foreldreansvar.antallBarn'
                            })}
                            inputName="foreldreansvar.antallBarn.input"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />
                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    margin="none"
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={utils.fødselsdatoerFromString(
                                barn.fødselsdatoer || []
                            )}
                            onChange={(fødselsdatoer) =>
                                this.oppdaterState({
                                    fødselsdatoer: utils.fødselsdatoerToString(
                                        fødselsdatoer
                                    )
                                })
                            }
                        />
                    )}
                />
                {visOver15årMelding && (
                    <Veilederinfo type="advarsel">
                        Barn over 15 år er registrert.
                    </Veilederinfo>
                )}
            </Steg>
        );
    }
}

const erAlderOver15År = (datoer: Fødselsdato[]) => {
    const harBarnOver15 = datoer.find((dato: Fødselsdato) => {
        if (dato) {
            return getAlderFraDato(dato).år > 15;
        }
        return false;
    });
    return harBarnOver15 !== undefined;
};

const mapStateToProps = (state: AppState): StateProps => {
    const barn = state.søknad.barn as ForeldreansvarBarnPartial;
    return {
        barn,
        visOver15årMelding: erAlderOver15År(
            utils.fødselsdatoerFromString(barn.fødselsdatoer || [])
        )
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnForeldreansvar)
);
