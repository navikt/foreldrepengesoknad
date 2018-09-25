import * as React from 'react';
import Block from 'common/components/block/Block';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { NavnPåForeldre } from 'common/types';
import { Utsettelsesperiode, Uttaksperiode } from '../../../../types/uttaksplan/periodetyper';
import { RecursivePartial } from '../../../../types/Partial';
import HvaSkalMorGjøreSpørsmål from '../../../../sp\u00F8rsm\u00E5l/HvaSkalMorGj\u00F8reSp\u00F8rsm\u00E5l';
import { getMorsAktivitetSkjemanummer } from '../../../../util/skjemanummer/morsAktivitetSkjemanummer';

interface OwnProps {
    periode: RecursivePartial<Uttaksperiode> | RecursivePartial<Utsettelsesperiode>;
    navnPåForeldre: NavnPåForeldre;
    onChange: (periode: RecursivePartial<Uttaksperiode> | RecursivePartial<Utsettelsesperiode>) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AktivitetskravMorPart extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.updateVedleggList = this.updateVedleggList.bind(this);
        this.updateVedleggItem = this.updateVedleggItem.bind(this);
        this.deleteVedleggItem = this.deleteVedleggItem.bind(this);
    }

    updateVedleggItem(vedleggItem: Attachment) {
        const { periode } = this.props;
        let vedleggList: Attachment[] = (periode.vedlegg as Attachment[]) || [];
        const index = vedleggList.indexOf(vedleggItem);
        if (index >= 0) {
            vedleggList[index] = vedleggItem;
        } else {
            vedleggList = [vedleggItem];
        }
        this.updateVedleggList(vedleggList);
    }

    deleteVedleggItem(vedleggItem: Attachment) {
        const { periode } = this.props;
        const vedleggList: Attachment[] = (periode.vedlegg as Attachment[]) || [];
        const index = vedleggList.indexOf(vedleggItem);
        vedleggList.splice(index, 1);
        this.updateVedleggList(vedleggList);
    }

    updateVedleggList(vedlegg: Attachment[]) {
        const { onChange, periode } = this.props;
        onChange({
            ...periode,
            vedlegg
        });
    }

    render() {
        const { navnPåForeldre, periode, onChange } = this.props;
        const { morsAktivitetIPerioden } = periode;
        const vedlegg = periode.vedlegg as Attachment[];

        return (
            <>
                <Block hasChildBlocks={true}>
                    <HvaSkalMorGjøreSpørsmål
                        navnPåForeldre={navnPåForeldre}
                        morsAktivitetIPerioden={morsAktivitetIPerioden}
                        onChange={(v) => onChange({ ...periode, morsAktivitetIPerioden: v })}
                    />
                </Block>

                <Block margin="s" visible={morsAktivitetIPerioden !== undefined}>
                    <AttachmentsUploader
                        attachments={vedlegg || []}
                        onFilesUploadStart={(nyDokumentasjon: Attachment[]) => {
                            this.updateVedleggList([...(vedlegg || []), ...nyDokumentasjon]);
                        }}
                        onFileUploadFinish={this.updateVedleggItem}
                        onFileDeleteStart={this.updateVedleggItem}
                        onFileDeleteFinish={this.deleteVedleggItem}
                        attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                        skjemanummer={getMorsAktivitetSkjemanummer()}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(AktivitetskravMorPart);
