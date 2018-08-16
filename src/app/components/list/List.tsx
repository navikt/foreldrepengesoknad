import * as React from 'react';
import './list.less';

interface ListProps<T> {
    data: T[];
    renderElement: (data: T, index: number) => JSX.Element;
}

export default class List<T> extends React.Component<ListProps<T>> {
    render() {
        const { data, renderElement } = this.props;
        return (
            <ul className="list">
                {data.map((dataObject: T, i: number) =>
                    renderElement(dataObject, i)
                )}
            </ul>
        );
    }
}
