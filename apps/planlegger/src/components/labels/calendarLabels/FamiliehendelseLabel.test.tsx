import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './FamiliehendelseLabel.stories';

const { FødselLabel, OmsorgsovertakelseLabel, TermindatoLabel } = composeStories(stories);

describe('<FamiliehendelseLabel>', () => {
    it('skal vise label for fødsel', async () => {
        render(<FødselLabel />);
        expect(await screen.findByText('Fødselsdato')).toBeInTheDocument();
    });

    it('skal vise label for termin', async () => {
        render(<TermindatoLabel />);
        expect(await screen.findByText('Termin')).toBeInTheDocument();
    });

    it('skal vise label for omsorgsovertakelse', async () => {
        render(<OmsorgsovertakelseLabel />);
        expect(await screen.findByText('Omsorgsovertakelse')).toBeInTheDocument();
    });
});
