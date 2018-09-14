import * as React from 'react';
import {
    Periode,
    Periodetype,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from '../../../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import Block from 'common/components/block/Block';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../../../flervalg-spørsmål/FlervalgSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { RecursivePartial } from '../../../../types/Partial';
import { getValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType, Skjemanummer } from '../../../../types/s\u00F8knad/S\u00F8knad';

export interface OwnProps {
    forelder: Forelder;
    periode: RecursivePartial<Periode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

type SykdomÅrsak =
    | UtsettelseÅrsakType.Sykdom
    | UtsettelseÅrsakType.InstitusjonSøker
    | UtsettelseÅrsakType.InstitusjonBarnet;

const getSykdomAlternativ = (intl: InjectedIntl, årsak: UtsettelseÅrsakType): FlervalgAlternativ => {
    return {
        label: getMessage(intl, `utsettelse.sykdom.alternativ.${årsak}`),
        value: årsak
    };
};

type Props = OwnProps & InjectedIntlProps;

class UtsettelsePgaSykdomForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        props.onChange({ type: Periodetype.Utsettelse, forelder: props.forelder });
        this.handleSykdomÅrsakChange = this.handleSykdomÅrsakChange.bind(this);
    }

    updateVedleggList(vedlegg: Attachment[]) {
        if (this.props.periode.type === Periodetype.Utsettelse) {
            const periode: RecursivePartial<Periode> = {
                ...this.props.periode,
                vedlegg
            };
            this.props.onChange(periode);
        }
    }

    updateVedleggItem(vedlegg: Attachment) {
        const vedleggList = (this.props.periode.vedlegg || []) as Attachment[];
        const periode: RecursivePartial<Periode> = {
            ...this.props.periode,
            vedlegg: [...vedleggList.filter((v) => v.id !== vedlegg.id), ...[vedlegg]]
        };
        this.props.onChange(periode);
    }

    handleSykdomÅrsakChange(sykdomÅrsak: SykdomÅrsak) {
        const periodePartial: Partial<Utsettelsesperiode> = {};
        periodePartial.årsak = sykdomÅrsak as UtsettelseÅrsakType;
        this.props.onChange(periodePartial);
    }

    render() {
        const { intl, periode } = this.props;
        const sykdomÅrsak = periode.type === Periodetype.Utsettelse ? periode.årsak : undefined;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);
        const vedleggList = (periode.vedlegg || []) as Attachment[];
        return (
            <>
                <Block visible={validTidsperiode !== undefined}>
                    <FlervalgSpørsmål
                        navn="utsttelsePgaSykdomÅrsak"
                        spørsmål={getMessage(intl, 'utsettelse.sykdom.alternativer.spørsmål')}
                        valgtVerdi={sykdomÅrsak}
                        onChange={(årsak: SykdomÅrsak) => this.handleSykdomÅrsakChange(årsak)}
                        toKolonner={true}
                        alternativer={[
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.Sykdom),
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonSøker),
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonBarnet)
                        ]}
                    />
                </Block>
                <Block visible={sykdomÅrsak !== undefined}>
                    <Veilederinfo>
                        <FormattedMessage id="utsettelse.sykdom.vedlegg.info" />
                    </Veilederinfo>
                    <AttachmentsUploader
                        attachments={vedleggList}
                        onFilesUploadStart={(attachments: Attachment[]) => {
                            this.updateVedleggList([...(vedleggList || []), ...attachments]);
                        }}
                        onFileUploadFinish={(vedlegg: Attachment) => this.updateVedleggItem(vedlegg)}
                        onFileDeleteStart={(vedlegg: Attachment) => {
                            this.updateVedleggItem(vedlegg);
                        }}
                        onFileDeleteFinish={(vedlegg: Attachment) => {
                            const index = vedleggList.indexOf(vedlegg);
                            vedleggList.splice(index, 1);
                            this.updateVedleggList(vedleggList);
                        }}
                        attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
                        skjemanummer={Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM}
                    />
                </Block>
            </>
        );
    }
}
export default injectIntl(UtsettelsePgaSykdomForm);
