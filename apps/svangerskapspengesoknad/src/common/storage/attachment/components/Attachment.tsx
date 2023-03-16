import React from 'react';
import classnames from 'classnames';

import { useIntl } from 'react-intl';
import SlettKnapp from '../../../components/slett-knapp/SlettKnapp';

import { Attachment as AttachmentType } from 'common/storage/attachment/types/Attachment';
import { bytesString } from 'common/util/filesize';
import BEMHelper from 'common/util/bem';
import VedleggIkon from 'common/components/ikoner/VedleggIkon';

import './attachment.less';
import { Link, Loader } from '@navikt/ds-react';

interface Props {
    attachment: AttachmentType;
    showFileSize?: boolean;
    onDelete?: (file: AttachmentType) => void;
}

const Attachment: React.FunctionComponent<Props> = ({ attachment, showFileSize, onDelete }) => {
    const intl = useIntl();
    const BEM = BEMHelper('attachment');
    const cls = classnames(BEM.block, {
        [BEM.modifier('pending')]: attachment.pending,
    });

    return (
        <div className={cls}>
            {attachment.pending && (
                <div className={BEM.element('spinner')}>
                    <Loader size="small" />
                </div>
            )}
            <VedleggIkon className={BEM.element('icon')} width={20} height={20} />
            <div className={BEM.element('filename')}>
                {attachment.url ? (
                    <Link href={attachment.url} target="_blank">
                        {attachment.filename}
                    </Link>
                ) : (
                    <React.Fragment>{attachment.filename}</React.Fragment>
                )}
                {showFileSize && <div>{bytesString(attachment.filesize)}</div>}
            </div>
            {onDelete && attachment.uploaded && !attachment.pending && (
                <span className={BEM.element('deleteButton')}>
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
