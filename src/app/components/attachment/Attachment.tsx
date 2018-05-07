import * as React from 'react';
const Icon = require('nav-frontend-ikoner-assets').default;

import './attachment.less';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { bytesString } from 'util/attachment/utils';
import DeleteButton from 'components/delete-button/DeleteButton';

interface OwnProps {
    vedlegg: File;
    visFilstørrelse?: Boolean;
    onDelete?: (file: File) => void;
}

type Props = OwnProps & InjectedIntlProps;

const Attachment: React.StatelessComponent<Props> = ({
    vedlegg,
    visFilstørrelse,
    onDelete,
    intl
}) => (
    <div className="attachment">
        <Icon className="attachment__icon" kind="vedlegg" size={20} />
        <div className="attachment__fileName">
            {vedlegg.name}
            {visFilstørrelse && <div>{bytesString(vedlegg.size)}</div>}
        </div>
        {onDelete && (
            <span className="attachment__delete">
                <DeleteButton
                    onDelete={() => onDelete(vedlegg)}
                    ariaLabel={intl.formatMessage(
                        { id: 'vedlegg.arialabel.slett' },
                        { navn: vedlegg.name }
                    )}
                />
            </span>
        )}
    </div>
);

export default injectIntl(Attachment);
