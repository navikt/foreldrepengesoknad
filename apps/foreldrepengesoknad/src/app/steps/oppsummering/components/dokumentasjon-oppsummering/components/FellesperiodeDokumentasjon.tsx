import { Attachment } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getDokumentasjonString } from '../dokumentasjonUtils';
import { BodyLong, BodyShort, Link } from '@navikt/ds-react';
import { FileIcon } from '@navikt/aksel-icons';
import { Block } from '@navikt/fp-common';

interface Props {
    vedlegg: Attachment[];
}

const FellesperiodeDokumentasjon: FunctionComponent<Props> = ({ vedlegg }) => {
    const intl = useIntl();

    return (
        <div>
            <Block padBottom="l">
                <BodyLong>{getDokumentasjonString(vedlegg, intl)}</BodyLong>
            </Block>
            {vedlegg.map((attachment) => {
                return (
                    <BodyShort>
                        <Link href={attachment.url} target="_blank">
                            <FileIcon aria-hidden={true} fontSize="1.5rem" />
                            {attachment.filename}
                        </Link>
                    </BodyShort>
                );
            })}
        </div>
    );
};

export default FellesperiodeDokumentasjon;
