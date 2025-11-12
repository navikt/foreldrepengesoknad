import { API_URLS } from 'appData/queries';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Dokumentasjon } from 'types/Dokumentasjon';
import { BarnetErIkkeFødt } from 'types/OmBarnet';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { FileUploader, getSaveAttachmentFetch } from '@navikt/fp-filopplaster';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';
import { isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

dayjs.extend(minMax);

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

const isUtstedtDatoIUke22 = (termindato: string, intl: IntlShape) => (terminBekreftelseDato: string) => {
    const utstedtDato = dayjs(terminBekreftelseDato).startOf('day');
    const terminDato = dayjs(termindato).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    const erUtstedtDataIUke22 = dayjs.max(uke22, utstedtDato)!.isSame(utstedtDato);

    return erUtstedtDataIUke22
        ? null
        : intl.formatMessage({ id: 'TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22' });
};

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[], hasPendingUploads: boolean) => void;
    omBarnet: BarnetErIkkeFødt;
}

export const TerminDokPanel = ({ attachments, updateAttachments, omBarnet }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<Dokumentasjon>();

    return (
        <>
            <RhfDatepicker
                name="terminbekreftelsedato"
                control={control}
                label={<FormattedMessage id="TerminDokPanel.Terminbekreftelsesdato" />}
                minDate={dayjs(omBarnet.termindato).subtract(18, 'week').subtract(3, 'day').toDate()}
                maxDate={dayjs().toDate()}
                validate={[
                    isRequired(intl.formatMessage({ id: 'TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi' })),
                    isValidDate(intl.formatMessage({ id: 'TerminDokPanel.Validering.TerminBekreftelsedato' })),
                    isBeforeTodayOrToday(
                        intl.formatMessage({
                            id: 'TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere',
                        }),
                    ),
                    isUtstedtDatoIUke22(omBarnet.termindato, intl),
                ]}
            />
            <FileUploader
                label={intl.formatMessage({ id: 'TerminDokPanel.Vedlegg.Terminbekreftelse' })}
                description={<FormattedMessage id="TerminDokPanel.Vedlegg.Terminbekreftelse.Info" />}
                attachmentType={AttachmentType.TERMINBEKREFTELSE}
                skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                existingAttachments={attachments}
                updateAttachments={updateAttachments}
                saveAttachment={getSaveAttachmentFetch(API_URLS.sendVedlegg)}
            />
        </>
    );
};
