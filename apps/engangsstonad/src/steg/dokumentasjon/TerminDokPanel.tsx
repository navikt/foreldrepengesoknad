import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { BarnetErIkkeFødt } from 'types/OmBarnet';

import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';

import { getSaveAttachment } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Datepicker } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
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

const TerminDokPanel: React.FunctionComponent<Props> = ({ attachments, updateAttachments, omBarnet }) => {
    const intl = useIntl();

    return (
        <>
            <Datepicker
                name={`terminbekreftelsedato`}
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
            <VStack gap="4">
                <div>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id="TerminDokPanel.Vedlegg.Terminbekreftelse" />
                    </BodyShort>
                    <BodyLong>
                        <FormattedMessage id="TerminDokPanel.Vedlegg.Terminbekreftelse.Info" />
                    </BodyLong>
                </div>
                <BodyLong>
                    <FormattedMessage id="TerminDokPanel.Dok.Storrelse" />
                </BodyLong>
                <FileUploader
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                    existingAttachments={attachments}
                    updateAttachments={updateAttachments}
                    saveAttachment={getSaveAttachment('engangsstonad')}
                />
            </VStack>
        </>
    );
};

export default TerminDokPanel;
