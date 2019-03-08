import * as React from 'react';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler
} from '../../../../util/validation/terminbekreftelsedato';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import { UfødtBarn } from '../../../../types/søknad/Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { DispatchProps } from 'common/redux/types/index';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import { RelasjonTilBarnUfødtVisibility } from '../visibility/relasjonTilBarnFødselVisibility';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';

export interface OwnProps {
    barn: UfødtBarn;
    terminbekreftelse: Attachment[];
    vis: RelasjonTilBarnUfødtVisibility;
}

export type Props = OwnProps & InjectedIntlProps & DispatchProps;

const Terminbekreftelse: React.StatelessComponent<Props> = (props) => {
    const { barn, terminbekreftelse, intl, dispatch, vis } = props;
    const validerDatofelt = barn.terminbekreftelse && barn.terminbekreftelse.length > 0;

    return (
        <React.Fragment>
            <Block margin="xs">
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'vedlegg.veileder.terminbekreftelsen'
                            }
                        ]}
                    />
                </Veilederpanel>
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
                    onChange={(terminbekreftelseDato: Date) => {
                        dispatch(
                            søknadActions.updateBarn({
                                terminbekreftelseDato
                            })
                        );
                    }}
                    dato={barn.terminbekreftelseDato}
                    datoAvgrensinger={getTerminbekreftelsedatoAvgrensninger(barn.termindato)}
                    validators={
                        validerDatofelt
                            ? getTerminbekreftelseDatoRegler(barn.terminbekreftelseDato, barn.termindato, intl)
                            : []
                    }
                />
            </Block>
        </React.Fragment>
    );
};

export default injectIntl(Terminbekreftelse);
