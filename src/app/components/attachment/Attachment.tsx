import * as React from 'react';
import * as classnames from 'classnames';

import { useIntl } from 'react-intl';

import NavFrontendSpinner from 'nav-frontend-spinner';
import Lenke from 'nav-frontend-lenker';
import { bemUtils, SlettKnapp, VedleggIkon } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';

import './attachment.less';
import { bytesString } from 'app/utils/globalUtil';

interface OwnProps {
    attachment: Attachment;
    showFileSize?: boolean;
    onDelete?: (file: Attachment) => void;
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
                    <NavFrontendSpinner type="S" />
                </div>
            )}
            <VedleggIkon className={bem.element('icon')} width={20} height={20} />
            <div className={bem.element('filename')}>
                {attachment.url ? (
                    <Lenke href={attachment.url} target="_blank">
                        {attachment.filename}
                    </Lenke>
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
