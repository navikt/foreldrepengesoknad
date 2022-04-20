import * as React from 'react';
import ToggleItemControlled from '../../../../elementer/toggleList/toggle-item/ToggleItemControlled';
import { onToggleItemProp } from '../../../../elementer/toggleList/ToggleList';
import { periodelisteBem } from '../Periodeliste';

interface Props {
    id: string;
    ariaLabel?: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    renderHeader: () => JSX.Element;
    renderContent: () => JSX.Element;
}

const PeriodelisteToggleItem: React.FunctionComponent<Props> = ({
    id,
    ariaLabel,
    isExpanded,
    onToggle,
    renderHeader,
    renderContent,
}) => {
    return (
        <article arial-label={ariaLabel}>
            <ToggleItemControlled
                id={id}
                isExpanded={isExpanded}
                onToggle={() => onToggle(id)}
                expandedHeaderClassName="periodeheader--isOpen"
                renderHeader={renderHeader}
                renderContent={() => <div className={periodelisteBem.element('content')}>{renderContent()}</div>}
            />
        </article>
    );
};

export default PeriodelisteToggleItem;
