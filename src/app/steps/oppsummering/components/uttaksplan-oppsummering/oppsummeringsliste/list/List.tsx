import * as React from 'react';
import './list.less';
import { bemUtils } from '@navikt/fp-common';

interface ListProps {
    data: any[];
    renderElement: (data: any, index: number) => JSX.Element;
    className?: string;
}

const bem = bemUtils('list');
const List: React.FunctionComponent<ListProps> = (props: ListProps) => {
    const { data, renderElement, className } = props;
    return (
        <ul className={`${bem.block} ${className}`}>
            {data.map((dataObject: any, i: number) => renderElement(dataObject, i))}
        </ul>
    );
};

export default List;
