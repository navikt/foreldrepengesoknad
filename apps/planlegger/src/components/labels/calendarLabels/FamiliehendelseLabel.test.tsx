import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './FamiliehendelseLabel.stories';

const { FødselLabel, OmsorgsovertakelseLabel, TermindatoLabel } = composeStories(stories);

describe('<FamiliehendelseLabel>', () => {
    it('skal vise label for fødsel', async () => {
        render(<FødselLabel />);
        expect(await screen.findByText('Fødselsdato 04. jan.')).toBeInTheDocument();
    });

    it('skal vise label for termin', async () => {
        render(<TermindatoLabel />);
        expect(await screen.findByText('Termindato 04. jan.')).toBeInTheDocument();
    });

    it('skal vise label for omsorgsovertakelse', async () => {
        render(<OmsorgsovertakelseLabel />);
        expect(await screen.findByText('Omsorgsovertakelsesdato 04. jan.')).toBeInTheDocument();
    });
});
