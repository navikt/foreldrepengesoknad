import * as React from 'react';

import { default as ListeElement } from '../liste-element/ListeElement';

import './liste.less';

interface ListeProps<T> {
    data: T[];
    onPeriodeLinkClick: (data: T, index: number) => void;
    onPeriodeTrashClick: (data: T) => void;
    renderElement: (data: T) => JSX.Element;
}

class Liste<T> extends React.Component<ListeProps<T>> {
    render() {
        const { data } = this.props;
        if (data.length > 0) {
            const {
                renderElement,
                onPeriodeLinkClick,
                onPeriodeTrashClick
            } = this.props;
            return (
                <ul className="liste">
                    {data.map((elementData, index) => (
                        <ListeElement
                            key={index}
                            data={elementData}
                            onLinkClick={() =>
                                onPeriodeLinkClick(elementData, index)
                            }
                            onTrashClick={() =>
                                onPeriodeTrashClick(elementData)
                            }
                            renderElement={renderElement}
                        />
                    ))}
                </ul>
            );
        }
        return null;
    }
}

export default Liste;
