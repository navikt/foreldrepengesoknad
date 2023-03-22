import * as React from 'react';
import * as classnames from 'classnames';

import { useIntl } from 'react-intl';
import SlettKnapp from '../../../components/slett-knapp/SlettKnapp';

import { Attachment as AttachmentType } from 'common/storage/attachment/types/Attachment';
import { bytesString } from 'common/util/filesize';
import { bemUtils, VedleggIkon } from '@navikt/fp-common';
import { Link, Loader } from '@navikt/ds-react';

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
        <div className={cls}>
            {attachment.pending && (
                <div className={bem.element('spinner')}>
                    <Loader type="S" />
                </div>
            )}
            <VedleggIkon className={bem.element('icon')} width={20} height={20} />
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
                <span className={bem.element('deleteButton')}>
                    <SlettKnapp
                        onClick={() => onDelete(attachment)}
                        ariaLabel={intl.formatMessage({ id: 'vedlegg.arialabel.slett' }, { navn: attachment.filename })}
                    />
                </span>
            )}
        </div>
    );
};

export default Attachment;
