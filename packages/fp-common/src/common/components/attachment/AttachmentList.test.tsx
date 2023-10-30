import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './AttachmentList.stories';

const { Default, VedleggListeMedFilstørrelse } = composeStories(stories);

describe('<AttachmentList>', () => {
    it.skip('skal vise to vedlegg i liste uten filstørrelse', () => {
        render(<Default />);
        expect(screen.getByText('Dette er et filnavn')).toBeInTheDocument();
        expect(screen.queryByText('123 B')).not.toBeInTheDocument();
        expect(screen.getByText('Annet filnavn')).toBeInTheDocument();
        expect(screen.queryByText('456 B')).not.toBeInTheDocument();
    });

    it.skip('skal vise to vedlegg i liste med filstørrelse', () => {
        render(<VedleggListeMedFilstørrelse />);
        expect(screen.getByText('Dette er et filnavn')).toBeInTheDocument();
        expect(screen.getByText('123 B')).toBeInTheDocument();
        expect(screen.getByText('Annet filnavn')).toBeInTheDocument();
        expect(screen.getByText('456 B')).toBeInTheDocument();
    });
});
