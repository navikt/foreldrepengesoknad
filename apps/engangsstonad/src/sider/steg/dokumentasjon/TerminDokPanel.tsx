import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { getSaveAttachment } from '@navikt/fp-api';
import { Datepicker } from '@navikt/fp-form-hooks';
import { I18nFn, FileUploader, useCustomIntl } from '@navikt/fp-ui';
import { Attachment } from '@navikt/fp-types';

import Environment from 'appData/Environment';
import { BarnetErIkkeFødt } from 'types/OmBarnet';
import { isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

const isUtstedtDatoIUke22 = (termindato: string, i18n: I18nFn) => (terminBekreftelseDato: string) => {
    const utstedtDato = dayjs(terminBekreftelseDato).startOf('day');
    const terminDato = dayjs(termindato).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    const erUtstedtDataIUke22 = dayjs.max(uke22, utstedtDato)!.isSame(utstedtDato);

    return erUtstedtDataIUke22 ? null : i18n('TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22');
};

interface Props {
    attachments?: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    omBarnet: BarnetErIkkeFødt;
}

const TerminDokPanel: React.FunctionComponent<Props> = ({ attachments, updateAttachments, omBarnet }) => {
    const { i18n } = useCustomIntl();

    return (
        <>
            <Datepicker
                name={`terminbekreftelsedato`}
                label={<FormattedMessage id="TerminDokPanel.Terminbekreftelsesdato" />}
                minDate={dayjs(omBarnet.termindato).subtract(18, 'week').subtract(3, 'day').toDate()}
                maxDate={dayjs().toDate()}
                validate={[
                    isRequired(i18n('TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi')),
                    isValidDate(i18n('TerminDokPanel.Validering.TerminBekreftelsedato')),
                    isBeforeTodayOrToday(
                        i18n('TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere'),
                    ),
                    isUtstedtDatoIUke22(omBarnet.termindato, i18n),
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
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                    existingAttachments={attachments}
                    updateAttachments={updateAttachments}
                    saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
                />
            </VStack>
        </>
    );
};

export default TerminDokPanel;
