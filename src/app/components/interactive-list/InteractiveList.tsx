import * as React from 'react';
import { default as InteractiveListElement } from './InteractiveListElement';
import './interactiveList.less';

interface InteractiveListProps<T> {
    data: T[];
    onLinkClick: (data: T, index: number) => void;
    onTrashClick: (data: T) => void;
    renderElement: (data: T) => JSX.Element;
}

class InteractiveList<T> extends React.Component<InteractiveListProps<T>> {
    render() {
        const { data } = this.props;
        if (data.length > 0) {
            const { renderElement, onLinkClick, onTrashClick } = this.props;
            return (
                <ul className="interactiveList">
                    {data.map((elementData, index) => (
                        <InteractiveListElement
                            key={index}
                            data={elementData}
                            onLinkClick={() => onLinkClick(elementData, index)}
                            onTrashClick={() => onTrashClick(elementData)}
                            renderElement={renderElement}
                        />
                    ))}
                </ul>
            );
        }
        return null;
    }
}

export default InteractiveList;
