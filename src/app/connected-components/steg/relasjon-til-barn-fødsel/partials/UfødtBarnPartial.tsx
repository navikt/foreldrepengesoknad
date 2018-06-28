import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import MorForSykSpørsmål from '../../../../spørsmål/MorForSykSpørsmål';
import Bolk from 'common/components/bolk/Bolk';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import AntallBarnSpørsmål from '../../../../spørsmål/AntallBarnSpørsmål';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../types/søknad/Søker';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import DatoInputWithValidation from 'common/lib/validation/DatoInputWithValidation';
import {
    getTermindatoRegler,
    termindatoAvgrensninger
} from '../../../../util/validation/termindato';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler
} from '../../../../util/validation/terminbekreftelsedato';

interface UfødtBarnPartialProps {
    barn: UfødtBarn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    terminbekreftelse: Attachment[];
    erFarEllerMedmor: boolean;
}

type Props = UfødtBarnPartialProps & InjectedIntlProps & DispatchProps;

class UfødtBarnPartial extends React.Component<Props> {
    render() {
        const {
            barn,
            annenForelder,
            terminbekreftelse,
            erFarEllerMedmor,
            dispatch,
            intl
        } = this.props;

        const erMorEllerMorErForSyk =
            !erFarEllerMedmor || annenForelder.erForSyk === true;

        return (
            <React.Fragment>
                <Spørsmål
                    synlig={erFarEllerMedmor}
                    render={() => (
                        <MorForSykSpørsmål
                            erMorForSyk={annenForelder.erForSyk}
                            onChange={(erForSyk: boolean) => {
                                dispatch(
                                    søknadActions.updateAnnenForelder({
                                        erForSyk
                                    })
                                );
                            }}
                        />
                    )}
                />

                {annenForelder.erForSyk === false && (
                    <Veilederinfo type="feil">
                        {getMessage(intl, 'annenForelder.forelder1IkkeSyk')}
                    </Veilederinfo>
                )}

                {erMorEllerMorErForSyk && (
                    <React.Fragment>
                        <Spørsmål
                            render={() => (
                                <AntallBarnSpørsmål
                                    antallBarn={barn.antallBarn}
                                    inputName="antallBarn"
                                    onChange={(antallBarn: number) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                antallBarn
                                            })
                                        );
                                    }}
                                    spørsmål={getMessage(
                                        intl,
                                        'antallBarn.spørsmål.venter'
                                    )}
                                />
                            )}
                        />

                        <Spørsmål
                            animert={false}
                            synlig={barn.antallBarn !== undefined}
                            render={() => (
                                <DatoInputWithValidation
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
                                    avgrensninger={termindatoAvgrensninger}
                                    validators={getTermindatoRegler(
                                        barn.termindato,
                                        intl
                                    )}
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
                                <AttachmentsUploaderPure
                                    attachments={terminbekreftelse}
                                    attachmentType="terminbekreftelse"
                                    onFilesSelect={(
                                        attachments: Attachment[]
                                    ) => {
                                        attachments.forEach(
                                            (attachment: Attachment) => {
                                                dispatch(
                                                    søknadActions.uploadAttachment(
                                                        attachment
                                                    )
                                                );
                                            }
                                        );
                                    }}
                                    onFileDelete={(attachment: Attachment) =>
                                        dispatch(
                                            søknadActions.deleteAttachment(
                                                attachment
                                            )
                                        )
                                    }
                                />
                            )}
                        />

                        <Spørsmål
                            animert={false}
                            synlig={
                                terminbekreftelse.length > 0 &&
                                barn.termindato !== undefined
                            }
                            render={() => (
                                <DatoInputWithValidation
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
                                    avgrensninger={getTerminbekreftelsedatoAvgrensninger(
                                        barn.termindato
                                    )}
                                    validators={getTerminbekreftelseDatoRegler(
                                        barn.terminbekreftelseDato,
                                        barn.termindato,
                                        intl
                                    )}
                                />
                            )}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
export default injectIntl(UfødtBarnPartial);
