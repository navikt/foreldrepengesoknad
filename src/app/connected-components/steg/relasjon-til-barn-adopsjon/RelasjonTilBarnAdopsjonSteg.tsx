import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

import { DispatchProps } from '../../../redux/types';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import AdoptertIUtlandetSpørsmål from '../../../spørsmål/AdoptertIUtlandetSpørsmål';
import getMessage from '../../../util/i18nUtils';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import Barn, { FødtBarn, Adopsjonsbarn } from '../../../types/søknad/Barn';
import DatoInput from '../../../components/dato-input/DatoInput';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';

import utils from '../../../util/fødselsdato';
import Vedlegg from '../../../types/søknad/Vedlegg';
import {
    removeFileFromArray,
    concatNewFiles
} from '../../../components/vedlegg/util';

import VedleggOversikt from '../../../components/vedlegg/VedleggOversikt';
import Bolk from '../../../components/layout/Bolk';

interface StateProps {
    barn: Barn;
    vedlegg: Vedlegg;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
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
                    (this.props.barn as FødtBarn).fødselsdatoer
                )
            })
        );
    }

    render() {
        const { vedlegg, barn, dispatch, intl } = this.props;

        return (
            <Steg id={StegID.RELASJON_TIL_BARN_ADOPSJON}>
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
                            dato={(barn as Adopsjonsbarn).adopsjonsdato}
                        />
                    )}
                />

                <Bolk
                    tittel="Last opp dokumentasjon på omsorgsovertakelse"
                    render={() => (
                        <VedleggOversikt
                            id="omsorgsovertakelse"
                            vedlegg={vedlegg.omsorgsovertakelse}
                            onFilesSelect={(files: File[]) => {
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        omsorgsovertakelse: concatNewFiles(
                                            files,
                                            vedlegg.omsorgsovertakelse
                                        )
                                    })
                                );
                            }}
                            onFileDelete={(file: File) =>
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        omsorgsovertakelse: removeFileFromArray(
                                            file,
                                            vedlegg.omsorgsovertakelse
                                        )
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={vedlegg.omsorgsovertakelse.length > 0}
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={getMessage(
                                intl,
                                'antallBarn.spørsmål.venter'
                            )}
                            inputName="antall barn"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={utils.fødselsdatoerFromString(
                                (barn as FødtBarn).fødselsdatoer || []
                            )}
                            onChange={(fødselsdatoer: Date[]) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        fødselsdatoer: utils.fødselsdatoerToString(
                                            fødselsdatoer
                                        )
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={(barn as FødtBarn).fødselsdatoer.length > 0}
                    render={() => (
                        <AdoptertIUtlandetSpørsmål
                            adoptertIUtlandet={
                                (barn as Adopsjonsbarn).adoptertIUtlandet
                            }
                            onChange={(adoptertIUtlandet, e) =>
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

const mapStateToProps = (state: any) => ({
    barn: state.søknad.barn,
    vedlegg: state.søknad.vedlegg
});

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnAdopsjonSteg)
);
