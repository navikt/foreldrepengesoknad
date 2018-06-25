import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import getMessage from 'common/util/i18nUtils';
import { Checkbox } from 'nav-frontend-skjema';
import Bolk from '../components/layout/Bolk';
import TidsperiodeBolk from './TidsperiodeBolk';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { AnnenInntektPartial } from '../types/søknad/AnnenInntekt';

interface GenerellAnnenInntektBolkProps {
    annenInntekt: AnnenInntektPartial;
    onChange: (annenInntekt: AnnenInntektPartial) => void;
}

type Props = GenerellAnnenInntektBolkProps & InjectedIntlProps;

class GenerellAnnenInntektBolk extends React.Component<Props> {
    handleOnChange(annenInntektProperties: AnnenInntektPartial) {
        const { annenInntekt, onChange } = this.props;
        const updatedInntekt: AnnenInntektPartial = {
            ...annenInntekt,
            ...annenInntektProperties
        };
        onChange(updatedInntekt);
    }

    updateVedleggItem(vedlegg: Attachment) {
        const { annenInntekt } = this.props;
        if (annenInntekt && annenInntekt.vedlegg) {
            const index = annenInntekt.vedlegg.indexOf(vedlegg);
            annenInntekt.vedlegg[index] = vedlegg;
            this.handleOnChange({
                vedlegg: annenInntekt.vedlegg
            });
        }
    }

    render() {
        const { annenInntekt, intl } = this.props;

        return (
            <React.Fragment>
                <Bolk
                    render={() => (
                        <TidsperiodeBolk
                            tidsperiode={annenInntekt.tidsperiode || {}}
                            onChange={(
                                tidsperiode: TidsperiodeMedValgfriSluttdato
                            ) => this.handleOnChange({ tidsperiode })}
                            sluttdatoDisabled={annenInntekt.pågående}
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
                        <Checkbox
                            checked={annenInntekt.pågående || false}
                            label={getMessage(
                                intl,
                                'annenInntekt.modal.pågående'
                            )}
                            onChange={() => {
                                this.handleOnChange({
                                    pågående: !annenInntekt.pågående,
                                    tidsperiode: {
                                        ...annenInntekt.tidsperiode,
                                        sluttdato: undefined
                                    }
                                });
                            }}
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
                        <AttachmentsUploader
                            attachments={annenInntekt.vedlegg || []}
                            onFilesUploadStart={(vedlegg: Attachment[]) => {
                                this.handleOnChange({
                                    vedlegg: [
                                        ...(annenInntekt.vedlegg || []),
                                        ...vedlegg
                                    ]
                                });
                            }}
                            onFileUploadFinish={(vedlegg: Attachment) =>
                                this.updateVedleggItem(vedlegg)
                            }
                            onFileDeleteStart={(vedlegg: Attachment) => {
                                this.updateVedleggItem(vedlegg);
                            }}
                            onFileDeleteFinish={(vedlegg: Attachment) => {
                                const vedleggList = annenInntekt.vedlegg || [];
                                const index = vedleggList.indexOf(vedlegg);
                                vedleggList.splice(index, 1);
                                this.handleOnChange({ vedlegg: vedleggList });
                            }}
                            attachmentType="anneninntektdokumentasjon"
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(GenerellAnnenInntektBolk);
