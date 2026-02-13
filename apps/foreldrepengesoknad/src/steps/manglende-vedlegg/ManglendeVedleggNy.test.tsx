import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { expect } from 'vitest';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './ManglendeVedleggNy.stories';

const { FarTarUtFedrekvoteFørsteSeksUkerUtenSamtidigMåDokumenterMorsSykdomEllerInnleggelse } = composeStories(stories);

describe('<ManglendeVedlegg>', () => {
    it(
        'skal sjekke at far må laste opp dokumentasjon på at mor er innlagt eller for syk, og at det blir sendt med i søknaden',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(
                FarTarUtFedrekvoteFørsteSeksUkerUtenSamtidigMåDokumenterMorsSykdomEllerInnleggelse.parameters.msw,
            );
            const screen = render(
                <FarTarUtFedrekvoteFørsteSeksUkerUtenSamtidigMåDokumenterMorsSykdomEllerInnleggelse
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(
                await screen.findByText('Dokumentasjon på at Eline er innlagt eller er for syk'),
            ).toBeInTheDocument();
        }),
    );
});
