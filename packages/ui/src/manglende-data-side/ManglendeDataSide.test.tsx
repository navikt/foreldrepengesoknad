import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ManglendeDataSide } from './ManglendeDataSide';

describe('<ManglendeDataSide>', () => {
    it('skal vise forklaring og utføre handlingen', async () => {
        const onAction = vi.fn();

        render(
            <ManglendeDataSide
                pageTitle="Søknad"
                heading="Opplysninger mangler"
                description="Du må fylle ut opplysningene før du kan fortsette."
                actionLabel="Gå til opplysningene"
                onAction={onAction}
            />,
        );

        expect(screen.getByRole('heading', { level: 1, name: 'Søknad' })).toBeInTheDocument();
        expect(screen.getByText('Du må fylle ut opplysningene før du kan fortsette.')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Gå til opplysningene' }));

        expect(onAction).toHaveBeenCalledOnce();
    });
});
