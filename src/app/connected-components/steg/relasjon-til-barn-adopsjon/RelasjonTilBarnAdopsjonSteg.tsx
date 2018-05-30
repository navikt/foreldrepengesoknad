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
import { FødtBarn, Adopsjonsbarn } from '../../../types/søknad/Barn';
import DatoInput from 'common/components/dato-input/DatoInput';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';

import utils from '../../../util/fødselsdato';
import Søknadsvedlegg from '../../../types/søknad/Søknadsvedlegg';
import {
    removeFileFromArray,
    concatNewFiles
} from 'common/components/vedlegg/util';

import VedleggOversikt from 'common/components/vedlegg/VedleggOversikt';
import { AppState } from '../../../redux/reducers';
import Steg from '../../../components/layout/Steg';
import Bolk from '../../../components/layout/Bolk';

interface StateProps {
    barn: FødtBarn;
    vedlegg: Søknadsvedlegg;
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
                    this.props.barn.fødselsdatoer
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
                    tittel={getMessage(
                        intl,
                        'vedlegg.tittel.omsorgsovertakelse'
                    )}
                    render={() => (
                        <VedleggOversikt
                            inputId="omsorgsovertakelse"
                            vedlegg={vedlegg.omsorgsovertakelse}
                            onFilesSelect={(attachment) => {
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        omsorgsovertakelse: concatNewFiles(
                                            attachment,
                                            vedlegg.omsorgsovertakelse
                                        )
                                    })
                                );
                            }}
                            onFileDelete={(attachment) =>
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        omsorgsovertakelse: removeFileFromArray(
                                            attachment,
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

const mapStateToProps = (state: AppState): StateProps => ({
    barn: state.søknad.barn as FødtBarn,
    vedlegg: state.søknad.vedlegg
});

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnAdopsjonSteg)
);
