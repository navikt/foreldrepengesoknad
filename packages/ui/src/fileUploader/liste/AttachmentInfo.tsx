import { VStack, Link, Loader, HStack, Spacer } from '@navikt/ds-react';
import { XMarkIcon, FileCheckmarkIcon } from '@navikt/aksel-icons';

import { useCustomIntl } from '../../i18n/useCustomI18n';
import { Attachment } from '@navikt/fp-types';
import { bytesString } from '../fileUtils';

import './attachmentInfo.less';
import { KeyboardEvent } from 'react';

interface OwnProps {
    attachment: Attachment;
    showFileSize?: boolean;
    onDelete?: (file: Attachment) => void;
}

type Props = OwnProps;

const AttachmentInfo: React.FunctionComponent<Props> = ({ attachment, showFileSize, onDelete }) => {
    const { i18n } = useCustomIntl();

    return (
        <div className="attachmentPanel">
            <HStack gap="4">
                {attachment.pending && <Loader type="S" />}
                {!attachment.pending && <FileCheckmarkIcon width={24} height={24} />}
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
                            aria-label={i18n('Attachment.Vedlegg.Slett', { navn: attachment.filename })}
                        />
                    </>
                )}
            </HStack>
        </div>
    );
};

export default AttachmentInfo;
