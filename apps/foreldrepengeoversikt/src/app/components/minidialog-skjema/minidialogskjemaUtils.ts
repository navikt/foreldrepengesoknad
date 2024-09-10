import EttersendingDto from 'types/EttersendingDTO';
import { Ytelse } from 'types/Ytelse';
import { isAttachmentWithError } from 'utils/attachmentUtils';
import { replaceInvisibleCharsWithSpace } from 'utils/formUtils';

import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

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
                brukerØnskerÅUttaleSeg && tilbakemelding !== undefined && tilbakemelding !== null
                    ? replaceInvisibleCharsWithSpace(tilbakemelding)
                    : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som NAV har tilgjengelig.',
        },
    };
};
