import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './ScanDocumentInfo.stories';

const { Default } = composeStories(stories);

describe('<ScanDocumentInfo>', () => {
    it('skal vise komponent korrekt', async () => {
        render(<Default />);
        expect(
            await screen.findByText(
                'Har du et dokument på papir, kan du ta et bilde av dokumentet for å sende det til oss.',
            ),
        ).toBeInTheDocument();
    });
});
