import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, EttersendelseDto, Ytelse } from '@navikt/fp-types';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';

import { isAttachmentWithError } from '../../utils/attachmentUtils';

export const mapMinidialogInputTilDTO = (
    saksnummer: string,
    sakstype: Ytelse,
    minidialogId: string,
    brukerØnskerÅUttaleSeg: boolean,
    vedlegg: Attachment[],
    tilbakemelding?: string,
): EttersendelseDto => {
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
                    ? (replaceInvisibleCharsWithSpace(tilbakemelding) ?? '')
                    : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som Nav har tilgjengelig.',
        },
    };
};
