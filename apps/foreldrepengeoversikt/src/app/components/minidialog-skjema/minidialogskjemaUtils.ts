import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Attachment } from 'app/types/Attachment';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Ytelse } from 'app/types/Ytelse';
import { isAttachmentWithError } from 'app/utils/attachmentUtils';
import { replaceInvisibleCharsWithSpace } from 'app/utils/formUtils';
import { MinidialogFormData } from './minidialogSkjemaConfig';

export const mapMinidialogInputTilDTO = (
    values: Partial<MinidialogFormData>,
    saksnummer: string,
    sakstype: Ytelse,
    minidialogId: string
): EttersendingDto => {
    const brukerØnskerÅUttaleSeg = values.brukerØnskerÅUttaleSeg === YesOrNo.YES;
    const vedlegg =
        brukerØnskerÅUttaleSeg && values.vedlegg
            ? values.vedlegg.filter((a: Attachment) => !isAttachmentWithError(a))
            : [];
    return {
        vedlegg,
        saksnummer,
        type: sakstype,
        dialogId: minidialogId,
        brukerTekst: {
            dokumentType: Skjemanummer.TILBAKEBETALING,
            overskrift: 'Svar på tilbakebetalingen',
            tekst:
                brukerØnskerÅUttaleSeg && hasValue(values.tilbakemelding)
                    ? replaceInvisibleCharsWithSpace(values.tilbakemelding!)
                    : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som NAV har tilgjengelig.',
        },
    };
};
