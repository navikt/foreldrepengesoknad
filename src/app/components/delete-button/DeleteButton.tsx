import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const Icon = require('nav-frontend-ikoner-assets').default;

export interface Props {
    ariaLabel: string;
    onDelete: () => void;
}

const DeleteButton: React.StatelessComponent<Props> = ({
    onDelete,
    ariaLabel
}) => (
    <button
        type="button"
        className="deleteButton"
        aria-label={ariaLabel}
        onClick={(e) => {
            e.stopPropagation();
            onDelete();
        }}>
        <Icon kind="trashcan" size={20} />
    </button>
);

export default DeleteButton;
