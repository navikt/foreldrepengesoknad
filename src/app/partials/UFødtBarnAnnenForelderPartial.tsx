import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { DispatchProps } from '../redux/types';
import { UfødtBarn } from '../types/søknad/Barn';
import Spørsmål from '../components/spørsmål/Spørsmål';
import MorForSykSpørsmål from '../spørsmål/MorForSykSpørsmål';
import DatoInput from '../components/dato-input/DatoInput';
import Bolk from '../components/layout/Bolk';
import getMessage from '../util/i18nUtils';
import {
    concatNewFiles,
    removeFileFromArray
} from '../components/vedlegg/util';
import VedleggOversikt from '../components/vedlegg/VedleggOversikt';
import Vedlegg from '../types/søknad/Vedlegg';

import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import { Søker } from '../types/søknad/Søknad';
import Veilederinfo from '../components/veileder-info/Veilederinfo';

interface StateProps {
    barn: UfødtBarn;
    søker: Søker;
    vedlegg: Vedlegg;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class UFødtBarnAnnenForelderPartial extends React.Component<Props> {
    render() {
        const { intl, dispatch, barn, vedlegg, søker } = this.props;
        return (
            <div>
                <Spørsmål
                    render={() => (
                        <MorForSykSpørsmål
                            erMorForSyk={søker.erMorForSyk}
                            onChange={(erMorForSyk: boolean) => {
                                dispatch(
                                    søknadActions.updateSøker({
                                        erMorForSyk
                                    })
                                );
                            }}
                        />
                    )}
                />

                {søker.erMorForSyk === false && (
                    <Veilederinfo type="feil">
                        {getMessage(intl, 'annenForelder.forelder1IkkeSyk')}
                    </Veilederinfo>
                )}

                {søker.erMorForSyk === true && (
                    <React.Fragment>
                        <Spørsmål
                            synlig={søker.erMorForSyk === true}
                            render={() => (
                                <DatoInput
                                    id="termindato"
                                    label={getMessage(
                                        intl,
                                        'termindato.spørsmål'
                                    )}
                                    onChange={(termindato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                termindato
                                            })
                                        );
                                    }}
                                    dato={barn.termindato}
                                />
                            )}
                        />

                        <Bolk
                            synlig={barn.termindato !== undefined}
                            tittel={getMessage(
                                intl,
                                'vedlegg.tittel.terminbekreftelse'
                            )}
                            render={() => (
                                <VedleggOversikt
                                    id="terminbekreftelse"
                                    vedlegg={vedlegg.terminbekreftelse}
                                    onFilesSelect={(files: File[]) => {
                                        dispatch(
                                            søknadActions.updateVedlegg({
                                                terminbekreftelse: concatNewFiles(
                                                    files,
                                                    vedlegg.terminbekreftelse
                                                )
                                            })
                                        );
                                    }}
                                    onFileDelete={(file: File) =>
                                        dispatch(
                                            søknadActions.updateVedlegg({
                                                terminbekreftelse: removeFileFromArray(
                                                    file,
                                                    vedlegg.terminbekreftelse
                                                )
                                            })
                                        )
                                    }
                                />
                            )}
                        />

                        <Spørsmål
                            synlig={
                                vedlegg.terminbekreftelse.length > 0 &&
                                barn.termindato !== undefined
                            }
                            render={() => (
                                <DatoInput
                                    id="terminbekreftelseDato"
                                    label={getMessage(
                                        intl,
                                        'terminbekreftelseDato.spørsmål'
                                    )}
                                    onChange={(terminbekreftelseDato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                terminbekreftelseDato
                                            })
                                        );
                                    }}
                                    dato={barn.terminbekreftelseDato}
                                />
                            )}
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}
export default injectIntl(UFødtBarnAnnenForelderPartial);
