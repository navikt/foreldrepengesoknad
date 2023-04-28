import BEMHelper from 'common/util/bem';
import { useIntl } from 'react-intl';

import './interactiveListElement.less';
import getMessage from 'common/util/i18nUtils';
import Pencil from './Pencil';
import { BodyShort } from '@navikt/ds-react';

export interface InteractiveListElementProps {
    style?: 'gray' | 'grayWithBorder';
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText?: string;
    deleteButtonAriaText?: string;
}

interface AllListElementProps extends InteractiveListElementProps {
    title: string;
    text: string;
    deleteLinkText: string;
}

const bem = BEMHelper('interactiveListElement');

const InteractiveListElement: React.FunctionComponent<AllListElementProps> = ({
    title,
    text,
    deleteLinkText,
    style = 'gray',
    deleteButtonAriaText,
    editButtonAriaText,
    onDelete,
    onEdit,
}) => {
    const intl = useIntl();
    return (
        <li className={bem.classNames(bem.block, bem.modifier(style))}>
            <div className={bem.element('top')}>
                <BodyShort className="title">{title}</BodyShort>
                <button
                    type="button"
                    className={bem.element('editButton')}
                    onClick={onEdit}
                    aria-label={editButtonAriaText || getMessage(intl, 'rediger')}
                >
                    <Pencil />
                </button>
            </div>
            <BodyShort className={bem.element('text')}>{text}</BodyShort>
            <div className={bem.element('bottom')}>
                <button
                    className={bem.element('deleteButton')}
                    onClick={onDelete}
                    type="button"
                    aria-label={deleteButtonAriaText}
                >
                    {deleteLinkText}
                </button>
            </div>
        </li>
    );
};
export default InteractiveListElement;
