import * as React from 'react';
const Icon = require('nav-frontend-ikoner-assets').default;

import { injectIntl, InjectedIntlProps } from 'react-intl';
import { bytesString } from '../../util/attachment';
import SlettKnapp from '../slett-knapp/SlettKnapp';

import './vedlegg.less';
import { Attachment } from '../../types/Attachment';

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
        <div className="vedlegg">
            <Icon className="vedlegg__ikon" kind="vedlegg" size={20} />
            <div className="vedlegg__filnavn">
                {attachment.filename}
                {visFilstørrelse && (
                    <div>{bytesString(attachment.filesize)}</div>
                )}
            </div>
            {onDelete && (
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
