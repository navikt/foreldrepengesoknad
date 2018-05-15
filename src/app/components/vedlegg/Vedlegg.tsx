import * as React from 'react';
const Icon = require('nav-frontend-ikoner-assets').default;

import { injectIntl, InjectedIntlProps } from 'react-intl';
import { bytesString } from '../../util/attachment';
import SlettKnapp from '../slett-knapp/SlettKnapp';

import './vedlegg.less';

interface OwnProps {
    vedlegg: File;
    visFilstørrelse?: boolean;
    onDelete?: (file: File) => void;
}

type Props = OwnProps & InjectedIntlProps;

const Vedlegg: React.StatelessComponent<Props> = ({
    vedlegg,
    visFilstørrelse,
    onDelete,
    intl
}) => {
    return (
        <div className="vedlegg">
            <Icon className="vedlegg__ikon" kind="vedlegg" size={20} />
            <div className="vedlegg__filnavn">
                {vedlegg.name}
                {visFilstørrelse && <div>{bytesString(vedlegg.size)}</div>}
            </div>
            {onDelete && (
                <span className="vedlegg__slett">
                    <SlettKnapp
                        onClick={() => onDelete(vedlegg)}
                        ariaLabel={intl.formatMessage(
                            { id: 'vedlegg.arialabel.slett' },
                            { navn: vedlegg.name }
                        )}
                    />
                </span>
            )}
        </div>
    );
};

export default injectIntl(Vedlegg);
