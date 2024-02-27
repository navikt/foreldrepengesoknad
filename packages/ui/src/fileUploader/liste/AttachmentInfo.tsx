import { FileCheckmarkIcon, XMarkIcon } from '@navikt/aksel-icons';
import { KeyboardEvent } from 'react';
import { useIntl } from 'react-intl';

import { HStack, Link, Loader, Spacer, VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';

import { bytesString } from '../fileUtils';
import './attachmentInfo.css';

interface OwnProps {
    attachment: Attachment;
    showFileSize?: boolean;
    onDelete?: (file: Attachment) => void;
}

type Props = OwnProps;

const AttachmentInfo: React.FunctionComponent<Props> = ({ attachment, showFileSize, onDelete }) => {
    const intl = useIntl();

    return (
        <div className="attachmentPanel">
            <HStack gap="4">
                {attachment.pending && <Loader type="S" />}
                {!attachment.pending && <FileCheckmarkIcon width={24} height={24} aria-hidden />}
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
                            tabIndex={0}
                            onClick={() => onDelete(attachment)}
                            onKeyDown={(event: KeyboardEvent) => {
                                event.code === 'Space' || event.code === 'Enter' ? onDelete(attachment) : undefined;
                            }}
                            height={24}
                            width={24}
                            cursor="pointer"
                            aria-label={intl.formatMessage(
                                { id: 'Attachment.Vedlegg.Slett' },
                                { navn: attachment.filename },
                            )}
                        />
                    </>
                )}
            </HStack>
        </div>
    );
};

export default AttachmentInfo;
