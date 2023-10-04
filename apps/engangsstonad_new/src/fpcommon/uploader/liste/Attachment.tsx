import classnames from 'classnames';
import { Link, Loader, HStack, Spacer } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { bemUtils, VedleggIkon } from '@navikt/fp-common';
import { XMarkIcon } from '@navikt/aksel-icons';

import { Attachment as AttachmentType } from '../typer/Attachment';
import { bytesString } from '../fileUtils';

import './attachment.less';

interface OwnProps {
    attachment: AttachmentType;
    showFileSize?: boolean;
    onDelete?: (file: AttachmentType) => void;
}

type Props = OwnProps;

const Attachment: React.FunctionComponent<Props> = ({ attachment, showFileSize, onDelete }) => {
    const intl = useIntl();
    const bem = bemUtils('attachment');
    const cls = classnames(bem.block, {
        [bem.modifier('pending')]: attachment.pending,
    });

    return (
        <HStack gap="4">
            <div>
                {attachment.pending && <Loader type="S" />}
                <VedleggIkon width={20} height={20} />
            </div>
            {attachment.url ? (
                <Link href={attachment.url} target="_blank">
                    {attachment.filename}
                </Link>
            ) : (
                <span>{attachment.filename}</span>
            )}
            {onDelete && (
                <>
                    <Spacer />
                    <XMarkIcon
                        onClick={() => onDelete(attachment)}
                        height={25}
                        width={25}
                        cursor="pointer"
                        aria-label={intl.formatMessage(
                            { id: 'vedlegg.arialabel.slett' },
                            { navn: attachment.filename },
                        )}
                    />
                </>
            )}
        </HStack>
    );
};

export default Attachment;
