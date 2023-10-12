import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { saveAttachment } from '@navikt/fp-api';
import { Datepicker } from '@navikt/fp-form-hooks';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment, AttachmentType, Skjemanummer } from '@navikt/fp-types';
import { isAfterToday, isRequired, isValidDate } from '@navikt/fp-validation';

import Environment from 'appData/Environment';
import { BarnetErIkkeFødt } from 'types/OmBarnet';

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

const utstedtDatoErIUke22 = (utstedtDatoString: string, terminDatoString: string): boolean => {
    const utstedtDato = dayjs(utstedtDatoString).startOf('day');
    const terminDato = dayjs(terminDatoString).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(uke22, utstedtDato)!.isSame(utstedtDato);
};

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    omBarnet: BarnetErIkkeFødt;
}

const TerminDokPanel: React.FunctionComponent<Props> = ({ attachments, updateAttachments, omBarnet }) => {
    const intl = useIntl();

    const terminbekreftelseValidatorer = useMemo(
        () => [
            isRequired(intl.formatMessage({ id: 'TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi' })),
            isValidDate(intl.formatMessage({ id: 'TerminDokPanel.Validering.TerminBekreftelsedato' })),
            isAfterToday(
                intl.formatMessage({
                    id: 'TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere',
                }),
            ),
            (terminBekreftelseDato: string) =>
                utstedtDatoErIUke22(terminBekreftelseDato, omBarnet.termindato)
                    ? null
                    : intl.formatMessage({
                          id: 'TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22',
                      }),
        ],
        [],
    );

    return (
        <>
            <Datepicker
                name={`terminbekreftelsedato`}
                label={<FormattedMessage id="TerminDokPanel.Terminbekreftelsesdato" />}
                minDate={dayjs(omBarnet.termindato).subtract(18, 'week').subtract(3, 'day').toDate()}
                maxDate={dayjs().toDate()}
                validate={terminbekreftelseValidatorer}
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
                    restApiUrl={Environment.REST_API_URL}
                    saveAttachment={saveAttachment}
                />
            </VStack>
        </>
    );
};

export default TerminDokPanel;
