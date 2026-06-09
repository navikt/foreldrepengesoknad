import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './RegisterdataUtdatert.stories';

import messages from '../intl/messages/nb_NO.json';

const { Engangsstønad } = composeStories(stories);

describe('RegisterdataUdatert', () => {
    it('skal vise at registerdata er utdatert og knapp for å starte på nytt', async () => {
        const slettMellomlagringOgLastSidePåNytt = vi.fn();
        render(<Engangsstønad slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt} />);

        expect(await screen.findByText(messages['RegisterdataUtdatert.Heading'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RegisterdataUtdatert.StartPaNytt']));

        await waitFor(() => expect(slettMellomlagringOgLastSidePåNytt).toHaveBeenCalledOnce());
    });
});
