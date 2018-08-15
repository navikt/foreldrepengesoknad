import * as React from 'react';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler
} from '../../../../util/validation/fields/terminbekreftelsedato';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { AttachmentType, Skjemanummer } from '../../../../types/søknad/Søknad';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { DispatchProps } from 'common/redux/types';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

export interface OwnProps {
    barn: UfødtBarn;
    terminbekreftelse: Attachment[];
}

export type Props = OwnProps & InjectedIntlProps & DispatchProps;

const Terminbekreftelse: React.StatelessComponent<Props> = (props) => {
    const { terminbekreftelse, barn, intl, dispatch } = props;
    const validerDatofelt = terminbekreftelse && terminbekreftelse.length > 0;
    return (
        <React.Fragment>
            <Block margin="xs">
                <Veilederinfo>
                    {getMessage(
                        intl,
                        'terminbekreftelsen.text.terminbekreftelsen'
                    )}
                </Veilederinfo>
            </Block>
            <Block
                visible={props.barn.termindato !== undefined}
                title={getMessage(intl, 'vedlegg.tittel.terminbekreftelse')}>
                <AttachmentsUploaderPure
                    attachments={terminbekreftelse}
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                    onFilesSelect={(attachments: Attachment[]) => {
                        attachments.forEach((attachment: Attachment) => {
                            dispatch(
                                søknadActions.uploadAttachment(attachment)
                            );
                        });
                    }}
                    onFileDelete={(attachment: Attachment) => {
                        dispatch(søknadActions.deleteAttachment(attachment));
                    }}
                />
            </Block>
            <Block
                visible={
                    terminbekreftelse.length > 0 &&
                    barn.termindato !== undefined
                }>
                <DatoInput
                    id="terminbekreftelseDato"
                    name="terminbekreftelseDato"
                    label={getMessage(intl, 'terminbekreftelseDato.spørsmål')}
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
                    validators={
                        validerDatofelt
                            ? getTerminbekreftelseDatoRegler(
                                  barn.terminbekreftelseDato,
                                  barn.termindato,
                                  intl
                              )
                            : []
                    }
                    infotekst={getMessage(
                        intl,
                        'terminbekreftelseDato.infotekst'
                    )}
                />
            </Block>
        </React.Fragment>
    );
};

export default injectIntl(Terminbekreftelse);
