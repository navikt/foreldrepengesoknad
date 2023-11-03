import { hasValue } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Skjemanummer } from '@navikt/fp-constants';
import { Ytelse } from 'app/types/Ytelse';
import { isAttachmentWithError } from 'app/utils/attachmentUtils';
import { replaceInvisibleCharsWithSpace } from 'app/utils/formUtils';

export const mapMinidialogInputTilDTO = (
    saksnummer: string,
    sakstype: Ytelse,
    minidialogId: string,
    brukerØnskerÅUttaleSeg: boolean,
    vedlegg: Attachment[],
    tilbakemelding?: string,
): EttersendingDto => {
    return {
        vedlegg: brukerØnskerÅUttaleSeg && vedlegg ? vedlegg.filter((a: Attachment) => !isAttachmentWithError(a)) : [],
        saksnummer,
        type: sakstype,
        dialogId: minidialogId,
        brukerTekst: {
            dokumentType: Skjemanummer.TILBAKEBETALING,
            overskrift: 'Svar på tilbakebetalingen',
            tekst:
                brukerØnskerÅUttaleSeg && hasValue(tilbakemelding)
                    ? replaceInvisibleCharsWithSpace(tilbakemelding!)
                    : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som NAV har tilgjengelig.',
        },
    };
};
