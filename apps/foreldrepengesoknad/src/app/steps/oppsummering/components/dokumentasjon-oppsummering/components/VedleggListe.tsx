import { FileIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';
import { Attachment } from '@navikt/fp-types';
import { FunctionComponent } from 'react';

interface Props {
    vedlegg: Attachment[];
}

const VedleggListe: FunctionComponent<Props> = ({ vedlegg }) => {
    return (
        <>
            {vedlegg.map((attachment) => {
                return (
                    <BodyShort key={attachment.id}>
                        <Link href={attachment.url} target="_blank">
                            <FileIcon aria-hidden={true} fontSize="1.5rem" />
                            {attachment.filename}
                        </Link>
                    </BodyShort>
                );
            })}
        </>
    );
};

export default VedleggListe;
