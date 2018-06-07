import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import LinkButton, { LinkButtonProps } from '../link-button/LinkButton';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';

interface InteractiveListElementProps<T> {
    data: T;
    onDelete: (element: T) => void;
    onSelect: (element: T) => void;
    renderElement: (element: T) => JSX.Element;
    linkButtonProps?: LinkButtonProps;
}

type Props<T> = InteractiveListElementProps<T> & InjectedIntlProps;

class InteractiveListElement<T> extends React.Component<Props<T>> {
    render() {
        const {
            data,
            renderElement,
            onDelete,
            onSelect,
            linkButtonProps
        } = this.props;

        return (
            <li className="interactiveList__element">
                <div className="interactiveList__element__stay">
                    <LinkButton
                        onClick={() => onSelect(data)}
                        {...linkButtonProps}>
                        <div className="interactiveList__element__data">
                            {renderElement(data)}
                        </div>
                    </LinkButton>
                </div>
                {onDelete && (
                    <span className="interactiveList__element__slettIkon">
                        <SlettKnapp
                            ariaLabel="Slett utenlandsopphold"
                            onClick={() => onDelete(data)}
                        />
                    </span>
                )}
            </li>
        );
    }
}

export default injectIntl(InteractiveListElement);
