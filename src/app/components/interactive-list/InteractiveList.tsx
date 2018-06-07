import * as React from 'react';
import { default as InteractiveListElement } from './InteractiveListElement';
import './interactiveList.less';
import { LinkButtonProps } from '../link-button/LinkButton';

interface InteractiveListProps<T> {
    data: T[];
    onSelect: (data: T, index: number) => void;
    onDelete: (data: T) => void;
    renderElement: (data: T) => JSX.Element;
    linkButtonProps?: LinkButtonProps;
    slettKnappAriaLabel: string;
}

class InteractiveList<T> extends React.Component<InteractiveListProps<T>> {
    render() {
        const { data } = this.props;
        if (data.length > 0) {
            const {
                renderElement,
                onSelect,
                onDelete,
                slettKnappAriaLabel,
                linkButtonProps
            } = this.props;

            return (
                <ul className="interactiveList">
                    {data.map((elementData, index) => (
                        <InteractiveListElement
                            key={index}
                            data={elementData}
                            onSelect={() => onSelect(elementData, index)}
                            onDelete={() => onDelete(elementData)}
                            renderElement={renderElement}
                            slettKnappAriaLabel={slettKnappAriaLabel}
                            linkButtonProps={linkButtonProps}
                        />
                    ))}
                </ul>
            );
        }
        return null;
    }
}

export default InteractiveList;
