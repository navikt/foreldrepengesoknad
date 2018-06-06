import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import LinkButton from '../link-button/LinkButton';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';

import './listeElement.less';

interface ListeElementProps<T> {
    data: T;
    onTrashClick?: (element: T) => void;
    onLinkClick?: (element: T) => void;
    renderElement: (element: T) => JSX.Element;
}

type Props<T> = ListeElementProps<T> & InjectedIntlProps;

class ListeElement<T> extends React.Component<Props<T>> {
    render() {
        const { data, renderElement, onTrashClick, onLinkClick } = this.props;
        const onEditClickHandler = () => {
            if (onLinkClick !== undefined) {
                onLinkClick(data);
            }
        };

        return (
            <li className="listeElement">
                <div className="listeElement__stay">
                    <LinkButton onClick={onEditClickHandler}>
                        <div className="listeElement__data">
                            {renderElement(data)}
                        </div>
                    </LinkButton>
                </div>
                {onTrashClick && (
                    <span className="listeElement__slettIkon">
                        <SlettKnapp
                            ariaLabel="Slett utenlandsopphold"
                            onClick={() => onTrashClick(data)}
                        />
                    </span>
                )}
            </li>
        );
    }
}

export default injectIntl(ListeElement);
