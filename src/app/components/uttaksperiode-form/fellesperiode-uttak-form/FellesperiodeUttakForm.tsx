import * as React from 'react';
import Block from 'common/components/block/Block';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import HvaSkalMorGjøreSpørsmål from '../../../spørsmål/HvaSkalMorGjøreSpørsmål';
import { MorsAktivitet } from '../../../types/uttaksplan/periodetyper';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getMorsAktivitetSkjemanummer } from '../../../util/skjemanummer/morsAktivitetSkjemanummer';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { NavnPåForeldre } from 'common/types';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

export interface FellesperiodeUttakSkjemadata {
    morsAktivitetIPerioden?: MorsAktivitet;
    vedlegg?: Attachment[];
    ønskerSamtidigUttak?: boolean;
}

interface FellesperiodeUttakFormProps {
    skjemadata: FellesperiodeUttakSkjemadata;
    navnPåForeldre: NavnPåForeldre;
    søkerErFarMedmor: boolean;
    annenForelderSkalHaForeldrepenger: boolean;
    onChange: (skjemadata: FellesperiodeUttakSkjemadata) => void;
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
        const {
            annenForelderSkalHaForeldrepenger,
            søkerErFarMedmor,
            navnPåForeldre,
            skjemadata,
            onChange
        } = this.props;
        const { morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = skjemadata;

        return (
            <>
                <Block hasChildBlocks={true} visible={annenForelderSkalHaForeldrepenger && søkerErFarMedmor}>
                    <Block hasChildBlocks={true}>
                        <HvaSkalMorGjøreSpørsmål
                            navnPåForeldre={navnPåForeldre}
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
                    hasChildBlocks={true}
                    visible={
                        søkerErFarMedmor && annenForelderSkalHaForeldrepenger
                            ? morsAktivitetIPerioden !== undefined
                            : true
                    }>
                    <Block margin={ønskerSamtidigUttak ? 's' : 'm'}>
                        <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                            ønskerSamtidigUttak={ønskerSamtidigUttak}
                            onChange={(v) => onChange({ ønskerSamtidigUttak: v })}
                        />
                    </Block>
                    <Block margin="none" visible={ønskerSamtidigUttak === true}>
                        <Veilederinfo>
                            <FormattedMessage id="fellesperiodeDelUttakForm.samtidigUttak.veiledertekst" />
                        </Veilederinfo>
                    </Block>
                </Block>
            </>
        );
    }
}

export default injectIntl(FellesperiodeUttakForm);
