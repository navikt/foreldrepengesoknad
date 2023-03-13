import React, { FunctionComponent } from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { bemUtils } from '@navikt/fp-common';
import Pencil from './Pencil';
import { EtikettFokus } from 'nav-frontend-etiketter';

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
                {missingDocumentation && <EtikettFokus>Mangler dokumentasjon</EtikettFokus>}
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
