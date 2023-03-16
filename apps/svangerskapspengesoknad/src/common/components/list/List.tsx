import * as React from 'react';
import BEMHelper from 'common/util/bem';
import './list.less';

interface ListProps<T> {
    data: T[];
    renderElement: (data: T, index: number) => JSX.Element;
    className?: string;
}

const bem = BEMHelper('list');

export default class List<T> extends React.Component<ListProps<T>> {
    render() {
        const { data, renderElement, className } = this.props;
        return (
            <ul className={`${bem.block} ${className ? className : ''}`}>
                {data.map((dataObject: T, i: number) => renderElement(dataObject, i))}
            </ul>
        );
    }
}
