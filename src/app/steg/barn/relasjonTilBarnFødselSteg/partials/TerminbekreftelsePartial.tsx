import * as React from 'react';
import { useIntl } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { DispatchProps } from 'common/redux/types/index';
import getMessage from 'common/util/i18nUtils';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import VeilederInfo from '../../../../components/veilederInfo/VeilederInfo';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler,
} from '../../../../util/validation/terminbekreftelsedato';
import { RelasjonTilBarnUfødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';

export interface OwnProps {
    barn: UfødtBarn;
    terminbekreftelse: Attachment[];
    vis: RelasjonTilBarnUfødtVisibility;
}

export type Props = OwnProps & DispatchProps;

const Terminbekreftelse: React.StatelessComponent<Props> = (props) => {
    const { barn, terminbekreftelse, dispatch, vis } = props;
    const intl = useIntl();
    const validerDatofelt = barn.terminbekreftelse && barn.terminbekreftelse.length > 0;

    return (
        <React.Fragment>
            <Block margin="xs">
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'vedlegg.veileder.terminbekreftelsen',
                        },
                    ]}
                />
            </Block>
            <Block>
                <AttachmentsUploaderPure
                    attachments={terminbekreftelse}
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                    onFilesSelect={(attachments: Attachment[]) => {
                        attachments.forEach((attachment: Attachment) => {
                            dispatch(søknadActions.uploadAttachment(attachment));
                        });
                    }}
                    onFileDelete={(attachment: Attachment) => {
                        dispatch(søknadActions.deleteAttachment(attachment));
                    }}
                />
            </Block>
            <Block visible={vis.terminbekreftelseDato}>
                <DatoInput
                    id="terminbekreftelseDato"
                    name="terminbekreftelseDato"
                    label={getMessage(intl, 'terminbekreftelseDato.spørsmål')}
                    onChange={(terminbekreftelseDato) => {
                        dispatch(
                            søknadActions.updateBarn({
                                terminbekreftelseDato,
                            })
                        );
                    }}
                    dato={barn.terminbekreftelseDato}
                    datoAvgrensinger={getTerminbekreftelsedatoAvgrensninger(ISOStringToDate(barn.termindato))}
                    validators={
                        validerDatofelt
                            ? getTerminbekreftelseDatoRegler(
                                  barn.terminbekreftelseDato,
                                  ISOStringToDate(barn.termindato),
                                  intl
                              )
                            : []
                    }
                />
            </Block>
        </React.Fragment>
    );
};

export default Terminbekreftelse;
