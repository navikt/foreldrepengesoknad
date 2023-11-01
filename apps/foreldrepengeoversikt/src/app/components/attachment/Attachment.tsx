import { bemUtils } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import { Button, Link, Loader } from '@navikt/ds-react';
import { bytesString } from 'app/utils/attachmentUtils';
import { FileSuccess } from '@navikt/ds-icons';
import { XMarkIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';

import './attachment.css';

export interface Props {
    attachment: Attachment;
    onDelete?: (file: Attachment) => void;
    showFileSize?: boolean;
}

const Attachment: React.FunctionComponent<Props> = ({ attachment, showFileSize, onDelete }) => {
    const bem = bemUtils('attachment');

    return (
        <div className={bem.block}>
            {attachment.pending && (
                <div className={bem.element('spinner')}>
                    <Loader size="small" />
                </div>
            )}
            <FileSuccess height="24" width="24" className={attachment.pending ? bem.modifier('pending') : undefined} />
            <div className={bem.element('filename')}>
                {attachment.url ? (
                    <Link href={attachment.url} target="_blank">
                        {attachment.filename}
                    </Link>
                ) : (
                    <span>{attachment.filename}</span>
                )}
                {showFileSize && <div>{bytesString(attachment.filesize)}</div>}
            </div>
            {onDelete && (
                <div
                    className={classNames(
                        bem.element('delete-button'),
                        attachment.pending ? bem.modifier('pending') : undefined,
                    )}
                >
                    <Button variant="tertiary" icon={<XMarkIcon aria-hidden />} onClick={() => onDelete(attachment)} />
                </div>
            )}
        </div>
    );
};

export default Attachment;
