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
import FødselsdatoerSpørsmål, {
    Fødselsdato
} from '../../../spørsmål/FødselsdatoerSpørsmål';
import { getDateFromString } from '../../../util/dates';
import Labeltekst from '../../../components/labeltekst/Labeltekst';

export interface StateProps {
    barn: Adopsjonsbarn;
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

const fødselsdatoerToString = (datoer: Fødselsdato[]): string[] => {
    return datoer.map((dato) => (dato !== undefined ? dato.toISOString() : ''));
};

const fødselsdatoerFromString = (datoer: string[]) => {
    return datoer.map(
        (dato) =>
            dato !== undefined && dato !== ''
                ? getDateFromString(dato)
                : undefined
    );
};

export const trimFødselsdatoer = (
    antall: number,
    datoer: string[] = []
): string[] => {
    let fødselsdatoer: string[] = [...datoer];
    if (datoer.length > antall) {
        fødselsdatoer = datoer.slice(0, antall);
    }
    while (fødselsdatoer.length < antall) {
        fødselsdatoer.push('');
    }
    return fødselsdatoer;
};

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
                    fødselsdatoer: trimFødselsdatoer(
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
                            fødselsdatoer={fødselsdatoerFromString(
                                barn.fødselsdatoer
                            )}
                            onChange={(fødselsdatoer) =>
                                this.oppdaterState({
                                    fødselsdatoer: fødselsdatoerToString(
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
