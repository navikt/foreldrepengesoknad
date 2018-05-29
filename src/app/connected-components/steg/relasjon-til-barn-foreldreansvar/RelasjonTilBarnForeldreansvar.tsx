import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

import { DispatchProps } from '../../../redux/types';
import { AppState } from '../../../redux/reducers';
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
import VedleggOversikt from '../../../components/vedlegg/VedleggOversikt';
import {
    concatNewFiles,
    removeFileFromArray
} from '../../../components/vedlegg/util';
import Søknadsvedlegg from '../../../types/søknad/Søknadsvedlegg';
import { Attachment } from '../../../types/Attachment';

export interface StateProps {
    barn: ForeldreansvarBarnPartial;
    visOver15årMelding: boolean;
    vedlegg: Søknadsvedlegg;
}

export type Props = DispatchProps & StateProps & InjectedIntlProps;

class RelasjonTilBarnForeldreansvar extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
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
            barn,
            visOver15årMelding,
            vedlegg,
            intl,
            dispatch
        } = this.props;
        return (
            <Steg id={StegID.RELASJON_TIL_BARN_FORELDREANSVAR}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="foreldreansvar_dato"
                            label={
                                <Labeltekst intlId="foreldreansvar.overtakelsedato" />
                            }
                            onChange={(dato: Date) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        foreldreansvarsdato: dato
                                    })
                                )
                            }
                            dato={barn.foreldreansvarsdato}
                        />
                    )}
                />
                <Spørsmål
                    animert={true}
                    synlig={barn.foreldreansvarsdato !== undefined}
                    render={() => (
                        <VedleggOversikt
                            id="adopsjonsvedtak"
                            vedlegg={vedlegg.adopsjonsvedtak}
                            onFilesSelect={(files: Attachment[]) => {
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        adopsjonsvedtak: concatNewFiles(
                                            files,
                                            vedlegg.adopsjonsvedtak
                                        )
                                    })
                                );
                            }}
                            onFileDelete={(file: Attachment) =>
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
        vedlegg: state.søknad.vedlegg,
        visOver15årMelding: erAlderOver15År(barn.fødselsdatoer || [])
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnForeldreansvar)
);
