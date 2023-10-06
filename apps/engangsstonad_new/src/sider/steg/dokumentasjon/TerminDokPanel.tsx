import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { BodyLong, Label, VStack } from '@navikt/ds-react';

import Datepicker from 'fpcommon/form/Datepicker';
import FileUploader from 'fpcommon/uploader/FileUploader';
import Environment from 'appData/Environment';
import { Attachment, AttachmentType, Skjemanummer } from 'fpcommon/uploader/typer/Attachment';
import { BarnetErIkkeFødt } from 'types/OmBarnet';
import { isAfterToday, isRequired, isValidDate } from 'fpcommon/validering/valideringsregler';
import { useMemo } from 'react';

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
            isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi' })),
            isValidDate(intl.formatMessage({ id: 'invalidFormatErrorKey.terminBekreftelsedato' })),
            isAfterToday(
                intl.formatMessage({
                    id: 'valideringsfeil.omBarnet.terminbekreftelseDato.måVæreIdagEllerTidligere',
                }),
            ),
            (terminBekreftelseDato: string) =>
                utstedtDatoErIUke22(terminBekreftelseDato, omBarnet.termindato)
                    ? null
                    : intl.formatMessage({
                          id: 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåVæreIUke22',
                      }),
        ],
        [],
    );

    return (
        <>
            <Datepicker
                name={`terminbekreftelsedato`}
                label={<FormattedMessage id="søknad.terminbekreftelsesdato" />}
                minDate={dayjs(omBarnet.termindato).subtract(18, 'week').subtract(3, 'day').toDate()}
                maxDate={dayjs().toDate()}
                validate={terminbekreftelseValidatorer}
            />
            <VStack gap="4">
                <div>
                    <Label>
                        <FormattedMessage id="vedlegg.terminbekreftelse" />
                    </Label>
                    <BodyLong>
                        <FormattedMessage id="vedlegg.terminbekreftelse.info" />
                    </BodyLong>
                </div>
                <BodyLong>
                    <FormattedMessage id="omBarnet.dok.storrelse" />
                </BodyLong>
                <FileUploader
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummber={Skjemanummer.TERMINBEKREFTELSE}
                    existingAttachments={attachments}
                    updateAttachments={updateAttachments}
                    restApiUrl={Environment.REST_API_URL}
                />
            </VStack>
        </>
    );
};

export default TerminDokPanel;
