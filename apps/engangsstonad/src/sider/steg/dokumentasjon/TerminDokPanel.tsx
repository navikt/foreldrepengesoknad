import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { getSaveAttachment } from '@navikt/fp-api';
import { Datepicker } from '@navikt/fp-form-hooks';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment, AttachmentType, Skjemanummer } from '@navikt/fp-types';
import { useFormValidators } from '@navikt/fp-validation';

import Environment from 'appData/Environment';
import { BarnetErIkkeFødt } from 'types/OmBarnet';

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

const isUtstedtDatoIUkte22 = (termindato: string, intl: IntlShape) => (terminBekreftelseDato: string) => {
    const utstedtDato = dayjs(terminBekreftelseDato).startOf('day');
    const terminDato = dayjs(termindato).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    const erUtstedtDataIUke22 = dayjs.max(uke22, utstedtDato)!.isSame(utstedtDato);

    return erUtstedtDataIUke22
        ? null
        : intl.formatMessage({
              id: 'TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22',
          });
};

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    omBarnet: BarnetErIkkeFødt;
}

const TerminDokPanel: React.FunctionComponent<Props> = ({ attachments, updateAttachments, omBarnet }) => {
    const intl = useIntl();
    const {
        isRequired,
        date: { isValidDate, isBeforeTodayOrToday },
    } = useFormValidators();

    return (
        <>
            <Datepicker
                name={`terminbekreftelsedato`}
                label={<FormattedMessage id="TerminDokPanel.Terminbekreftelsesdato" />}
                minDate={dayjs(omBarnet.termindato).subtract(18, 'week').subtract(3, 'day').toDate()}
                maxDate={dayjs().toDate()}
                validate={[
                    isRequired('TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi'),
                    isValidDate('TerminDokPanel.Validering.TerminBekreftelsedato'),
                    isBeforeTodayOrToday('TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere'),
                    isUtstedtDatoIUkte22(omBarnet.termindato, intl),
                ]}
            />
            <VStack gap="4">
                <div>
                    <Label>
                        <FormattedMessage id="TerminDokPanel.Vedlegg.Terminbekreftelse" />
                    </Label>
                    <BodyLong>
                        <FormattedMessage id="TerminDokPanel.Vedlegg.Terminbekreftelse.Info" />
                    </BodyLong>
                </div>
                <BodyLong>
                    <FormattedMessage id="TerminDokPanel.Dok.Storrelse" />
                </BodyLong>
                <FileUploader
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummber={Skjemanummer.TERMINBEKREFTELSE}
                    existingAttachments={attachments}
                    updateAttachments={updateAttachments}
                    saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
                />
            </VStack>
        </>
    );
};

export default TerminDokPanel;
