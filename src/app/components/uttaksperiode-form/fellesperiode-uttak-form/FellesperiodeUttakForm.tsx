import * as React from 'react';
import Block from 'common/components/block/Block';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import HvaSkalMorGjøreSpørsmål from '../../../spørsmål/HvaSkalMorGjøreSpørsmål';
import { MorsAktivitet } from '../../../types/uttaksplan/periodetyper';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from '../../../types/søknad/Søknad';
import { getMorsAktivitetSkjemanummer } from '../../../util/skjemanummer/morsAktivitetSkjemanummer';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';

export interface FellesperiodeUttakSkjemadata {
    morsAktivitetIPerioden?: MorsAktivitet;
    vedlegg?: Attachment[];
    ønskerSamtidigUttak?: boolean;
}

interface FellesperiodeUttakFormProps {
    skjemadata: FellesperiodeUttakSkjemadata;
    onChange: (skjemadata: FellesperiodeUttakSkjemadata) => void;
    søkerErFarMedmor: boolean;
    annenForelderSkalHaForeldrepenger: boolean;
}

type Props = FellesperiodeUttakFormProps & InjectedIntlProps;

class FellesperiodeUttakForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.updateVedleggList = this.updateVedleggList.bind(this);
        this.updateVedleggItem = this.updateVedleggItem.bind(this);
        this.deleteVedleggItem = this.deleteVedleggItem.bind(this);
    }

    updateVedleggItem(vedleggItem: Attachment) {
        const { skjemadata } = this.props;
        let vedleggList: Attachment[] = skjemadata.vedlegg || [];
        const index = vedleggList.indexOf(vedleggItem);
        if (index >= 0) {
            vedleggList[index] = vedleggItem;
        } else {
            vedleggList = [vedleggItem];
        }
        this.updateVedleggList(vedleggList);
    }

    deleteVedleggItem(vedleggItem: Attachment) {
        const { skjemadata } = this.props;
        const vedleggList: Attachment[] = skjemadata.vedlegg!;
        const index = vedleggList.indexOf(vedleggItem);
        vedleggList.splice(index, 1);
        this.updateVedleggList(vedleggList);
    }

    updateVedleggList(vedlegg: Attachment[]) {
        const { onChange } = this.props;
        onChange({
            vedlegg
        });
    }

    render() {
        const { annenForelderSkalHaForeldrepenger, søkerErFarMedmor, skjemadata, onChange } = this.props;
        const { morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = skjemadata;
        return (
            <>
                <Block margin="none" visible={annenForelderSkalHaForeldrepenger && søkerErFarMedmor}>
                    <Block margin="s">
                        <HvaSkalMorGjøreSpørsmål
                            morsAktivitetIPerioden={morsAktivitetIPerioden}
                            onChange={(v) => onChange({ morsAktivitetIPerioden: v })}
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
                </Block>

                <Block
                    visible={
                        søkerErFarMedmor && annenForelderSkalHaForeldrepenger
                            ? morsAktivitetIPerioden !== undefined
                            : true
                    }>
                    <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                        ønskerSamtidigUttak={ønskerSamtidigUttak}
                        onChange={(v) => onChange({ ønskerSamtidigUttak: v })}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(FellesperiodeUttakForm);
