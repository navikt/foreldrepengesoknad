import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

import { DispatchProps } from '../../../redux/types';
import { AppState } from '../../../redux/reducers';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import DatoInput from '../../../components/dato-input/DatoInput';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from '../../../components/labeltekst/Labeltekst';

import utils from '../../../util/fødselsdato';
import VedleggOversikt from '../../../components/vedlegg/VedleggOversikt';
import Søknadsvedlegg from '../../../types/søknad/Søknadsvedlegg';
import {
    concatNewFiles,
    removeFileFromArray
} from '../../../components/vedlegg/util';

export interface StateProps {
    barn: Adopsjonsbarn;
    vedlegg: Søknadsvedlegg;
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
                    fødselsdatoer: utils.trimFødselsdatoer(
                        antall,
                        this.props.barn.fødselsdatoer
                    )
                }
            })
        );
    }

    render() {
        const { barn, intl, vedlegg, dispatch } = this.props;
        return (
            <Steg id={StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="adopsjonsdato"
                            label={
                                <Labeltekst intlId="stebarnsadopsjon.adopsjonsdato" />
                            }
                            onChange={(dato: Date) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        adopsjonsdato: dato
                                    })
                                );
                            }}
                            dato={barn.adopsjonsdato}
                        />
                    )}
                />
                <Spørsmål
                    animert={true}
                    synlig={barn.adopsjonsdato !== undefined}
                    render={() => (
                        <VedleggOversikt
                            inputId="adopsjonsvedtak"
                            vedlegg={vedlegg.adopsjonsvedtak}
                            onFilesSelect={(files) => {
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        adopsjonsvedtak: concatNewFiles(
                                            files,
                                            vedlegg.adopsjonsvedtak
                                        )
                                    })
                                );
                            }}
                            onFileDelete={(file) =>
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        adopsjonsvedtak: removeFileFromArray(
                                            file,
                                            vedlegg.adopsjonsvedtak
                                        )
                                    })
                                )
                            }
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
                    margin="none"
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={barn.fødselsdatoer}
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
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        barn: state.søknad.barn as Adopsjonsbarn,
        vedlegg: state.søknad.vedlegg
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnStebarnsadopsjon)
);
