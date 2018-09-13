import * as React from 'react';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
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
    tidsperiode?: TidsperiodePartial;
    morsAktivitetIPerioden?: MorsAktivitet;
    vedlegg?: Attachment[];
    ønskerSamtidigUttak?: boolean;
}

interface FellesperiodeUttakFormProps {
    skjemadata: FellesperiodeUttakSkjemadata;
    onChange: (skjemadata: FellesperiodeUttakSkjemadata) => void;
    søkerErForelder2: boolean;
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
        const { skjemadata, onChange } = this.props;
        const { tidsperiode, morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = skjemadata;
        return (
            <>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(v: TidsperiodePartial) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as TidsperiodePartial}
                    />
                </Block>

                <Block margin="none" /*visible={søkerErForelder2}*/>
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

                <Block>
                    <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                        skalVæreHjemmeSamtidig={ønskerSamtidigUttak}
                        onChange={(v: boolean) => onChange({ ønskerSamtidigUttak: v })}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(FellesperiodeUttakForm);
