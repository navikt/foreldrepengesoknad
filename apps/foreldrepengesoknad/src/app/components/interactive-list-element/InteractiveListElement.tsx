import { FunctionComponent } from 'react';

import { BodyShort, Tag } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import Pencil from './Pencil';
import './interactiveListElement.less';

interface Props {
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText: string;
    deleteButtonAriaText: string;
    title: string;
    text: string;
    deleteLinkText: string;
    missingDocumentation?: boolean;
}

const InteractiveListElement: FunctionComponent<Props> = ({
    title,
    text,
    deleteLinkText,
    deleteButtonAriaText,
    editButtonAriaText,
    missingDocumentation,
    onDelete,
    onEdit,
}) => {
    const bem = bemUtils('interactiveListElement');

    return (
        <li className={bem.block}>
            <div className={bem.element('top')}>
                <BodyShort className="title">{title}</BodyShort>
                <button
                    type="button"
                    className={bem.element('editButton')}
                    onClick={onEdit}
                    aria-label={editButtonAriaText}
                >
                    <Pencil />
                </button>
            </div>
            <BodyShort className={bem.element('text')}>{text}</BodyShort>
            <div className={bem.element('bottom')}>
                {missingDocumentation && <Tag variant="warning-moderate">Mangler dokumentasjon</Tag>}
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
