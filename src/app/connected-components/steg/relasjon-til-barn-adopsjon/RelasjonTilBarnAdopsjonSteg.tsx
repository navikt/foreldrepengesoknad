import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

import VedleggBolk from '../../../skjemabolker/VedleggBolk';

import { DispatchProps } from '../../../redux/types';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import AdoptertIUtlandetSpørsmål from '../../../spørsmål/AdoptertIUtlandetSpørsmål';
import getMessage from '../../../util/i18nUtils';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import Barn, {
    FødtBarnPartial,
    FødtBarn,
    Adopsjonsbarn
} from '../../../types/søknad/Barn';
import DatoInput from '../../../components/dato-input/DatoInput';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';

import utils from '../../../util/fødselsdato';
import Vedlegg from '../../../types/søknad/Vedlegg';

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
            søknadActions.updateSøknad({
                barn: {
                    ...this.props.barn,
                    antallBarn: antall,
                    fødselsdatoer: utils.trimFødselsdatoer(
                        antall,
                        (this.props.barn as FødtBarn).fødselsdatoer
                    )
                }
            })
        );
    }

    oppdaterState(barn: FødtBarnPartial) {
        this.props.dispatch(
            søknadActions.updateSøknad({
                barn: { ...this.props.barn, ...barn }
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

                <Spørsmål
                    synlig={(barn as Adopsjonsbarn).adopsjonsdato !== undefined}
                    render={() => (
                        <VedleggBolk
                            id="adopsjon"
                            vedlegg={vedlegg.omsorgsovertakelse}
                            onAdd={(files: File[]) => {
                                const newFiles = files.filter(
                                    (file) =>
                                        vedlegg.omsorgsovertakelse.find(
                                            (storedFile: File) =>
                                                storedFile.name === file.name
                                        ) === undefined
                                );
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        omsorgsovertakelse: [
                                            ...vedlegg.omsorgsovertakelse,
                                            ...newFiles
                                        ]
                                    })
                                );
                            }}
                            onDelete={(file: File) =>
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        omsorgsovertakelse: vedlegg.omsorgsovertakelse.filter(
                                            (storedFile: File) =>
                                                storedFile.name !== file.name
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
                            spørsmål="antall barn"
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
