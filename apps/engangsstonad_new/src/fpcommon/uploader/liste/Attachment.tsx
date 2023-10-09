import { VStack, Link, Loader, HStack, Spacer } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { XMarkIcon, FileCheckmarkIcon } from '@navikt/aksel-icons';

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

    return (
        <div className="attachmentPanel">
            <HStack gap="4" align="center">
                <div>
                    {attachment.pending && <Loader type="S" />}
                    <FileCheckmarkIcon width={24} height={24} />
                </div>
                <VStack gap="1">
                    {attachment.url ? (
                        <Link href={attachment.url} target="_blank">
                            {attachment.filename}
                        </Link>
                    ) : (
                        <span>{attachment.filename}</span>
                    )}
                    {showFileSize && <div>{bytesString(attachment.filesize)}</div>}
                </VStack>
                {onDelete && (
                    <>
                        <Spacer />
                        <XMarkIcon
                            onClick={() => onDelete(attachment)}
                            height={24}
                            width={24}
                            cursor="pointer"
                            aria-label={intl.formatMessage(
                                { id: 'vedlegg.arialabel.slett' },
                                { navn: attachment.filename },
                            )}
                        />
                    </>
                )}
            </HStack>
        </div>
    );
};

export default Attachment;
