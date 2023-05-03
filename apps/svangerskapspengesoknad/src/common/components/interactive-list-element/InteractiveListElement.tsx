import BEMHelper from 'common/util/bem';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { PencilFillIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';

import './interactiveListElement.less';

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
                <Button
                    size="small"
                    type="button"
                    variant="secondary"
                    onClick={onEdit}
                    className={bem.element('editButton')}
                    icon={<PencilFillIcon />}
                >
                    {editButtonAriaText || getMessage(intl, 'rediger')}
                </Button>
            </div>
            <BodyShort className={bem.element('text')}>{text}</BodyShort>
            <div className={bem.element('bottom')}>
                <Button
                    size="small"
                    onClick={onDelete}
                    type="button"
                    variant="secondary"
                    className={bem.element('deleteButton')}
                    icon={<TrashIcon />}
                    aria-label={deleteButtonAriaText}
                >
                    {deleteLinkText}
                </Button>
            </div>
        </li>
    );
};
export default InteractiveListElement;
