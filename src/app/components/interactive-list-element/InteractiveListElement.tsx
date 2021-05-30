import React, { FunctionComponent } from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
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
}

const InteractiveListElement: FunctionComponent<Props> = ({
    title,
    text,
    deleteLinkText,
    deleteButtonAriaText,
    editButtonAriaText,
    onDelete,
    onEdit,
}) => {
    const bem = bemUtils('interactiveListElement');

    return (
        <li className={bem.block}>
            <div className={bem.element('top')}>
                <Normaltekst className="title">{title}</Normaltekst>
                <button
                    type="button"
                    className={bem.element('editButton')}
                    onClick={onEdit}
                    aria-label={editButtonAriaText}
                >
                    <Pencil />
                </button>
            </div>
            <Normaltekst className={bem.element('text')}>{text}</Normaltekst>
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
