import * as React from 'react';
import * as classnames from 'classnames';
const Icon = require('nav-frontend-ikoner-assets').default;

import { injectIntl, InjectedIntlProps } from 'react-intl';
import SlettKnapp from '../slett-knapp/SlettKnapp';

import './vedlegg.less';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Lenke from 'nav-frontend-lenker';
import { Attachment } from 'storage/attachment/types/Attachment';
import { bytesString } from '../../util/filesize';

interface OwnProps {
    attachment: Attachment;
    visFilstørrelse?: boolean;
    onDelete?: (file: Attachment) => void;
}

type Props = OwnProps & InjectedIntlProps;

const Vedlegg: React.StatelessComponent<Props> = ({
    attachment,
    visFilstørrelse,
    onDelete,
    intl
}) => {
    return (
        <div
            className={classnames('vedlegg', {
                'vedlegg--pending': attachment.pending
            })}>
            {attachment.pending && (
                <div className="vedlegg__spinner">
                    <NavFrontendSpinner type="S" />
                </div>
            )}
            <Icon className="vedlegg__ikon" kind="vedlegg" size={20} />
            <div className="vedlegg__filnavn">
                {attachment.url ? (
                    <Lenke href={attachment.url}>{attachment.filename}</Lenke>
                ) : (
                    <React.Fragment>{attachment.filename}</React.Fragment>
                )}
                {visFilstørrelse && (
                    <div>{bytesString(attachment.filesize)}</div>
                )}
            </div>
            {onDelete &&
                attachment.uploaded &&
                !attachment.pending && (
                    <span className="vedlegg__slett">
                        <SlettKnapp
                            onClick={() => onDelete(attachment)}
                            ariaLabel={intl.formatMessage(
                                { id: 'vedlegg.arialabel.slett' },
                                { navn: attachment.filename }
                            )}
                        />
                    </span>
                )}
        </div>
    );
};

export default injectIntl(Vedlegg);
