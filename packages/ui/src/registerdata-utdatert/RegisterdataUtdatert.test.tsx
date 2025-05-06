import { composeStories } from '@storybook/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './RegisterdataUtdatert.stories';

const { Foreldrepenger } = composeStories(stories);

describe('RegisterdataUdatert', () => {
    it('skal vise at registerdata er utdatert og knapp for å starte på nytt', async () => {
        const slettMellomlagringOgLastSidePåNytt = vi.fn();
        render(<Foreldrepenger slettMellomlagringOgLastSidePåNytt={slettMellomlagringOgLastSidePåNytt} />);

        expect(await screen.findByText('Opplysninger er endret')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start på nytt'));

        await waitFor(() => expect(slettMellomlagringOgLastSidePåNytt).toHaveBeenCalledOnce());
    });
});
