import * as React from 'react';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler
} from '../../../../util/validation/fields/terminbekreftelsedato';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { AttachmentType } from '../../../../types/søknad/Søknad';
import { UfødtBarn } from '../../../../types/s\u00F8knad/Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Bolk from 'common/components/bolk/Bolk';
import getMessage from 'common/util/i18nUtils';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { DispatchProps } from 'common/redux/types';
import Spørsmål from 'common/components/sp\u00F8rsm\u00E5l/Sp\u00F8rsm\u00E5l';
import DatoInputWithValidation from 'common/lib/validation/DatoInputWithValidation';

export interface OwnProps {
    barn: UfødtBarn;
    terminbekreftelse: Attachment[];
}

export type Props = OwnProps & InjectedIntlProps & DispatchProps;

const Terminbekreftelse: React.StatelessComponent<Props> = (props) => {
    const { terminbekreftelse, barn, intl, dispatch } = props;
    return (
        <React.Fragment>
            <Bolk
                synlig={props.barn.termindato !== undefined}
                tittel={getMessage(intl, 'vedlegg.tittel.terminbekreftelse')}
                render={() => (
                    <div className="blokk-m">
                        <AttachmentsUploaderPure
                            attachments={terminbekreftelse}
                            attachmentType={AttachmentType.TERMINBEKREFTELSE}
                            onFilesSelect={(attachments: Attachment[]) => {
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
                                    søknadActions.deleteAttachment(attachment)
                                )
                            }
                        />
                    </div>
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
                        name="terminbekreftelseDato"
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
    );
};

export default injectIntl(Terminbekreftelse);
