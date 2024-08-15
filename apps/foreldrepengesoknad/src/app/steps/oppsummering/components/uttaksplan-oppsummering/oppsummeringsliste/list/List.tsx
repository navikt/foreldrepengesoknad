import * as React from 'react';

import { bemUtils } from '@navikt/fp-utils';

import './list.less';

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
