import { FileIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
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
