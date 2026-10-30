import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';

import * as stories from './SøkersituasjonSteg.stories';

const { Default } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal validere valg og så gå videre til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getAllByText('Din situasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        expect(screen.getByText('Hva gjelder for deg?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hva som gjelder for deg')).toHaveLength(2);

        await userEvent.click(screen.getByText('Fødsel'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
            },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.OM_BARNET,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal nullstille barnet og dokumentasjonen når situasjonen endres', async () => {
        const gåTilNesteSide = vi.fn();

        render(
            <Default
                søkersituasjon={{ situasjon: 'fødsel' }}
                omBarnet={{ type: 'termin', antallBarn: 1, termindato: '2026-12-01' }}
                dokumentasjon={{ terminbekreftelsedato: '2026-10-01', vedlegg: [] }}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreOgNaviger={vi.fn()}
            />,
        );
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Adopsjon'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledWith({
            data: undefined,
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenCalledWith({
            data: undefined,
            key: ContextDataType.DOKUMENTASJON,
            type: 'update',
        });
    });

    it('skal nullstille barnet og dokumentasjonen når situasjonen endres og bruker går tilbake', async () => {
        const gåTilNesteSide = vi.fn();

        render(
            <Default
                søkersituasjon={{ situasjon: 'fødsel' }}
                omBarnet={{ type: 'termin', antallBarn: 1, termindato: '2026-12-01' }}
                dokumentasjon={{ terminbekreftelsedato: '2026-10-01', vedlegg: [] }}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreOgNaviger={vi.fn()}
            />,
        );
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Adopsjon'));
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(gåTilNesteSide).toHaveBeenCalledWith({
            data: { situasjon: 'adopsjon' },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenCalledWith({
            data: undefined,
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenCalledWith({
            data: undefined,
            key: ContextDataType.DOKUMENTASJON,
            type: 'update',
        });
    });

    it('skal beholde barnet og dokumentasjonen når situasjonen er uendret', async () => {
        const gåTilNesteSide = vi.fn();

        render(
            <Default
                søkersituasjon={{ situasjon: 'fødsel' }}
                omBarnet={{ type: 'termin', antallBarn: 1, termindato: '2026-12-01' }}
                dokumentasjon={{ terminbekreftelsedato: '2026-10-01', vedlegg: [] }}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreOgNaviger={vi.fn()}
            />,
        );
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).not.toHaveBeenCalledWith(
            expect.objectContaining({ key: ContextDataType.DOKUMENTASJON }),
        );
        expect(gåTilNesteSide).not.toHaveBeenCalledWith(expect.objectContaining({ key: ContextDataType.OM_BARNET }));
    });
});
