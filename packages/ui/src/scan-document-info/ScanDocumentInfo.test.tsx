import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './ScanDocumentInfo.stories';

import messages from '../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<ScanDocumentInfo>', () => {
    it('skal vise komponent korrekt', async () => {
        render(<Default />);
        expect(
            await screen.findByText(messages['ScanDocumentInfo.Del1'],
            ),
        ).toBeInTheDocument();
    });
});
