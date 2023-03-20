import React from 'react';
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
declare function ItemList<T>({ items, onDelete, onEdit, labelRenderer, iconRender, getItemId, getItemTitle, }: ItemListProps<T>): JSX.Element;
export default ItemList;
