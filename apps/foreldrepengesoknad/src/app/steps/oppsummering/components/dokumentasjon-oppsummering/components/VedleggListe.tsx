import { FileIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyShort, Link } from '@navikt/ds-react';

import { InnsendingsType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import Block from 'app/pages/block/Block';

interface Props {
    vedlegg: Attachment[];
}

const VedleggListe: FunctionComponent<Props> = ({ vedlegg }) => {
    const vedleggUtenSendSenere = vedlegg.filter((v) => v.innsendingsType !== InnsendingsType.SEND_SENERE);

    if (vedleggUtenSendSenere.length === 0) {
        return null;
    }

    return (
        <>
            {vedleggUtenSendSenere.map((attachment) => {
                return (
                    <Block padBottom="l" key={attachment.id}>
                        <BodyShort>
                            <Link href={attachment.url} target="_blank">
                                <FileIcon aria-hidden={true} fontSize="1.5rem" />
                                {attachment.filename}
                            </Link>
                        </BodyShort>
                    </Block>
                );
            })}
        </>
    );
};

export default VedleggListe;
