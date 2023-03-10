import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import InteractiveListElement from '../../../app/components/interactive-list-element/InteractiveListElement';

export default {
    title: 'components/InteractiveListElement',
    component: InteractiveListElement,
} as ComponentMeta<typeof InteractiveListElement>;

export const Default: ComponentStory<typeof InteractiveListElement> = () => (
    <InteractiveListElement
        title="Dette er en tittel"
        text="Dette er en tekst"
        onEdit={() => alert('editering pågår')}
        onDelete={() => alert('sletting pågår')}
        deleteLinkText="Slett"
        editButtonAriaText="editaria"
        deleteButtonAriaText="deletearia"
    />
);

export const ManglendeDokumentasjon: ComponentStory<typeof InteractiveListElement> = () => (
    <InteractiveListElement
        title="Dette er en tittel"
        text="Dette er en tekst"
        onEdit={() => alert('editering pågår')}
        onDelete={() => alert('sletting pågår')}
        deleteLinkText="Slett"
        editButtonAriaText="editaria"
        deleteButtonAriaText="deletearia"
        missingDocumentation
    />
);
