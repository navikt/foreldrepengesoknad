import React from 'react';

import InteractiveListElement from '../../../app/components/interactive-list-element/InteractiveListElement';

export default {
    title: 'components/InteractiveListElement',
    component: InteractiveListElement,
};

export const Default = () => (
    <InteractiveListElement
        title="Dette er en tittel"
        text="tekst"
        onEdit={() => alert('editering pågår')}
        onDelete={() => alert('sletting pågår')}
        deleteLinkText="Slett"
        editButtonAriaText="editaria"
        deleteButtonAriaText="deletearia"
    />
);
