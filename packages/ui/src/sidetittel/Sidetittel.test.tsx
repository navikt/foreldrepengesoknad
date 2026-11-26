import { render, waitFor } from '@testing-library/react';

import { SidetittelProvider, useSidetittel } from './Sidetittel';

const Side = ({ sidenavn }: { sidenavn: string }) => {
    useSidetittel(sidenavn);
    return null;
};

describe('SidetittelProvider', () => {
    beforeEach(() => {
        document.title = 'Statisk tittel';
    });

    it('skal oppdatere tittelen ved bytte av side uten å gå via opprinnelig tittel', async () => {
        const { rerender } = render(
            <SidetittelProvider appTittel="Søknad">
                <Side key="1" sidenavn="Steg 1" />
            </SidetittelProvider>,
        );
        await waitFor(() => expect(document.title).toBe('Steg 1 – Søknad'));

        const titleSetter = vi.spyOn(document, 'title', 'set');
        rerender(
            <SidetittelProvider appTittel="Søknad">
                <Side key="2" sidenavn="Steg 2" />
            </SidetittelProvider>,
        );
        await waitFor(() => expect(document.title).toBe('Steg 2 – Søknad'));

        expect(titleSetter).not.toHaveBeenCalledWith('Statisk tittel');
        titleSetter.mockRestore();
    });

    it('skal oppdatere både apptittel og sidenavn ved språkbytte', async () => {
        const { rerender } = render(
            <SidetittelProvider appTittel="Søknad">
                <Side sidenavn="Om barnet" />
            </SidetittelProvider>,
        );
        await waitFor(() => expect(document.title).toBe('Om barnet – Søknad'));

        rerender(
            <SidetittelProvider appTittel="Application">
                <Side sidenavn="About the child" />
            </SidetittelProvider>,
        );

        await waitFor(() => expect(document.title).toBe('About the child – Application'));
    });

    it('skal sette tilbake opprinnelig tittel når provideren fjernes', async () => {
        const { unmount } = render(
            <SidetittelProvider appTittel="Søknad">
                <Side sidenavn="Om barnet" />
            </SidetittelProvider>,
        );
        await waitFor(() => expect(document.title).toBe('Om barnet – Søknad'));

        unmount();

        expect(document.title).toBe('Statisk tittel');
    });
});
