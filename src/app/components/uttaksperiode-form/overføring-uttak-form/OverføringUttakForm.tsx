import * as React from 'react';
import { OverføringÅrsakType } from '../../../types/uttaksplan/periodetyper';
import OverføringsårsakSpørsmål from '../../../spørsmål/OverføringsårsakSpørsmål';
import Block from 'common/components/block/Block';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getOverføringÅrsakSkjemanummer } from '../../../util/skjemanummer/overf\u00F8ring\u00C5rsakSkjemanummer';

interface Props {
    skjemadata: OverføringUttakFormSkjemadata;
    navnAnnenForelder: string;
    søkerErFarEllerMedmor: boolean;
    onChange: (skjemadata: OverføringUttakFormSkjemadata) => void;
}

export interface OverføringUttakFormSkjemadata {
    årsak?: OverføringÅrsakType;
    vedlegg?: Attachment[];
}

class OverføringUttakForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.updateVedleggList = this.updateVedleggList.bind(this);
        this.updateVedleggItem = this.updateVedleggItem.bind(this);
    }

    updateVedleggList(vedlegg: Attachment[]) {
        const { årsak } = this.props.skjemadata;
        this.props.onChange({
            vedlegg,
            årsak
        });
    }

    updateVedleggItem(updatedVedlegg: Attachment) {
        const vedleggList = this.props.skjemadata.vedlegg || [];
        this.props.onChange({
            årsak: this.props.skjemadata.årsak,
            vedlegg: [...vedleggList.filter((v) => v.id !== updatedVedlegg.id), ...[updatedVedlegg]]
        });
    }

    render() {
        const { onChange, søkerErFarEllerMedmor, skjemadata, navnAnnenForelder } = this.props;
        const visVedlegg =
            (skjemadata.årsak !== undefined && skjemadata.årsak !== OverføringÅrsakType.aleneomsorg) ||
            (skjemadata.årsak === OverføringÅrsakType.aleneomsorg && søkerErFarEllerMedmor === true);
        const vedleggList = skjemadata.vedlegg || [];
        return (
            <>
                <Block margin="s">
                    <OverføringsårsakSpørsmål
                        annenForelderNavn={navnAnnenForelder}
                        årsak={skjemadata.årsak}
                        onChange={(å) => onChange({ årsak: å })}
                    />
                </Block>
                <Block visible={visVedlegg}>
                    <Veilederinfo>
                        <FormattedMessage id="uttaksplan.overføring.vedlegg.info" />
                    </Veilederinfo>
                    <AttachmentsUploader
                        attachments={vedleggList}
                        onFilesUploadStart={(attachments) => this.updateVedleggList(attachments)}
                        onFileUploadFinish={(v) => this.updateVedleggItem(v)}
                        onFileDeleteStart={(v: Attachment) => {
                            this.updateVedleggItem(v);
                        }}
                        onFileDeleteFinish={(v: Attachment) => {
                            const index = vedleggList.indexOf(v);
                            vedleggList.splice(index, 1);
                            this.updateVedleggList(vedleggList);
                        }}
                        attachmentType={AttachmentType.OVERFØRING_KVOTE}
                        skjemanummer={getOverføringÅrsakSkjemanummer(skjemadata.årsak!)}
                    />
                </Block>
            </>
        );
    }
}

export default OverføringUttakForm;
