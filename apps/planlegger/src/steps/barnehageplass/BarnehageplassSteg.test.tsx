import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './BarnehageplassSteg.stories';

const {
    FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,
    FlereForsørgereBarnFødtSeptemberStartSeptember,
    AleneforsørgerToBarnFødtJanuarStartAugust,
    FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027,
} = composeStories(stories);

describe('<BarnehageplassSteg>', () => {
    it('skal vise barnehageplass i august for barn med termindato i desember', async () => {
        render(<FlereForsørgereBarnTerminDesemberStartAugustOmToÅr />);

        expect(await screen.findAllByText('Barnehageplass')).toHaveLength(2);

        expect(screen.getByText('Dere kan ha rett på barnehageplass fra august 2026')).toBeInTheDocument();
    });

    it('skal vise barnehageplass i september for barn født i september', async () => {
        render(<FlereForsørgereBarnFødtSeptemberStartSeptember />);

        expect(await screen.findAllByText('Barnehageplass')).toHaveLength(2);

        expect(screen.getByText('Dere kan ha rett på barnehageplass fra september 2025')).toBeInTheDocument();
    });

    it('skal vise barnehageplass i august for aleneforsørger med to barn født i januar', async () => {
        render(<AleneforsørgerToBarnFødtJanuarStartAugust />);

        expect(await screen.findAllByText('Barnehageplass')).toHaveLength(2);

        expect(screen.getByText('Du kan ha rett på barnehageplass fra august 2025')).toBeInTheDocument();
    });

    it('skal vise barnehageplass basert på sluttdato for adoptert barn', async () => {
        render(<FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027 />);

        expect(await screen.findByText('Barnehageplass')).toBeInTheDocument();

        expect(screen.getByText('Dere kan ha rett på barnehageplass fra juni 2027')).toBeInTheDocument();
    });
});
