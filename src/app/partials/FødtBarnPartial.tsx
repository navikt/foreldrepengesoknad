import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { DispatchProps } from '../redux/types';
import Spørsmål from '../components/spørsmål/Spørsmål';
import Bolk from '../components/layout/Bolk';
import getMessage from '../util/i18nUtils';
import {
    concatNewFiles,
    removeFileFromArray
} from '../components/vedlegg/util';
import VedleggOversikt from '../components/vedlegg/VedleggOversikt';
import Søknadsvedlegg from '../types/søknad/Søknadsvedlegg';

import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import AntallBarnSpørsmål from '../spørsmål/AntallBarnSpørsmål';
import { FødtBarn } from '../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../spørsmål/FødselsdatoerSpørsmål';

import utils from '../util/fødselsdato';
import { Attachment } from '../types/Attachment';

interface StateProps {
    barn: FødtBarn;
    vedlegg: Søknadsvedlegg;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class FødtBarnPartial extends React.Component<Props> {
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
        const { intl, dispatch, barn, vedlegg } = this.props;
        return (
            <div>
                <Spørsmål
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

                <Bolk
                    synlig={
                        barn.fødselsdatoer.length > 0 &&
                        barn.fødselsdatoer.every(
                            (fødselsdato: Date) => fødselsdato instanceof Date
                        )
                    }
                    tittel={getMessage(intl, 'vedlegg.tittel.fødselsattest')}
                    render={() => (
                        <VedleggOversikt
                            id="fødselsattest"
                            vedlegg={vedlegg.fødselsattest}
                            onFilesSelect={(files: Attachment[]) => {
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        fødselsattest: concatNewFiles(
                                            files,
                                            vedlegg.fødselsattest
                                        )
                                    })
                                );
                            }}
                            onFileDelete={(file: Attachment) =>
                                dispatch(
                                    søknadActions.updateVedlegg({
                                        fødselsattest: removeFileFromArray(
                                            file,
                                            vedlegg.fødselsattest
                                        )
                                    })
                                )
                            }
                        />
                    )}
                />
            </div>
        );
    }
}

export default injectIntl(FødtBarnPartial);
