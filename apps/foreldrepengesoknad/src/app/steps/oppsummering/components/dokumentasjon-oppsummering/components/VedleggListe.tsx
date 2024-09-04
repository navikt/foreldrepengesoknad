import { FileIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { InnsendingsType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

interface Props {
    vedlegg: Attachment[];
}

const VedleggListe: FunctionComponent<Props> = ({ vedlegg }) => {
    const vedleggUtenSendSenere = vedlegg.filter((v) => v.innsendingsType !== InnsendingsType.SEND_SENERE);

    if (vedleggUtenSendSenere.length === 0) {
        return null;
    }

    return (
        <VStack gap="2">
            {vedleggUtenSendSenere.map((attachment) => {
                return (
                    <BodyShort key={attachment.id}>
                        <Link href={attachment.url} target="_blank">
                            <FileIcon aria-hidden={true} fontSize="1.5rem" />
                            {attachment.filename}
                        </Link>
                    </BodyShort>
                );
            })}
        </VStack>
    );
};

export default VedleggListe;
