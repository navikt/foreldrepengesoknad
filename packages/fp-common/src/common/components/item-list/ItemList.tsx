import React from 'react';
import bemUtils from './../../utils/bemUtils';
import ActionLink from '../action-link/ActionLink';
import SlettKnapp from '../slett-knapp/SlettKnapp';
import { guid } from './../../utils/guid';

import './itemList.less';

export interface ItemListProps<T> {
    items: T[];
    getItemId: (item: T) => string | undefined;
    getItemTitle: (item: T) => string;
    labelRenderer?: (item: T, onEdit?: (item: T) => void) => React.ReactNode;
    iconRender?: (item: T) => React.ReactNode;
    onDelete?: (item: T) => void;
    onEdit?: (item: T) => void;
}

const bem = bemUtils('itemList');
const bemItem = bem.child('item');

function ItemList<T>({
    items,
    onDelete,
    onEdit,
    labelRenderer,
    iconRender,
    getItemId,
    getItemTitle,
}: ItemListProps<T>) {
    return (
        <ol className={bem.classNames(bem.block)}>
            {items.map((item) => {
                const itemTitle = getItemTitle(item);
                return (
                    <li key={getItemId(item) || guid()} className={bemItem.block}>
                        {iconRender && (
                            <span className={bemItem.element('icon')} role="presentation">
                                {iconRender(item)}
                            </span>
                        )}
                        <span className={bemItem.element('label')}>
                            {labelRenderer ? (
                                labelRenderer(item)
                            ) : onEdit ? (
                                <ActionLink onClick={() => onEdit(item)}>{itemTitle}</ActionLink>
                            ) : (
                                itemTitle
                            )}
                        </span>
                        {onDelete && (
                            <span className={bemItem.element('delete')}>
                                <SlettKnapp ariaLabel={`Fjern ${itemTitle}`} onClick={() => onDelete(item)} />
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}
export default ItemList;
