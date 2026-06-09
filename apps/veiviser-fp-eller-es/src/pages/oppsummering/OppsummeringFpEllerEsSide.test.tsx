import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';

import * as stories from './OppsummeringFpEllerEsSide.stories';

import messages from '../../intl/messages/nb_NO.json';

const {
    MorHarTjentMerEnn200000OgHarRettTilFp,
    MorHarTjentMindreEnn200000OgHarRettTilFpOgEs,
    MorHarIkkeRettJobberIkkeINorgeMenIUtlandet,
    FarHarIkkeRett,
    MorHarRettTilEs,
    FarKanHaRettTilFp,
} = composeStories(stories);

describe('<OppsummeringFpEllerEsSide>', () => {
    it('skal vise oppsummering for mor som har tjent mer enn 200 000', async () => {
        render(<MorHarTjentMerEnn200000OgHarRettTilFp />);

        expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

        expect(screen.getByText(messages['OppsummeringFpEllerEsSide.DuHarRett'])).toBeInTheDocument();
        expect(screen.getByText(/Når du har rett til foreldrepenger kan du også/)).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegRett'])).toBeInTheDocument();

        const harRettFp = screen.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som har tjent mindre enn 200 000', async () => {
        render(<MorHarTjentMindreEnn200000OgHarRettTilFpOgEs />);

        expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

        expect(screen.getByText(messages['OppsummeringFpEllerEsSide.DuHarRettFpEllerEs'])).toBeInTheDocument();
        expect(screen.getByText(messages['OppsummeringFpEllerEsSide.DuHarRettFpEllerEs.KanVelgeMellom'])).toBeInTheDocument();
        expect(screen.getByText(messages['OppsummeringFpEllerEsSide.HvaErFp'])).toBeInTheDocument();
        expect(screen.getByText(messages['OppsummeringSide.HvaErEs'])).toBeInTheDocument();
        expect(
            screen.getByText(/Når du har rett til foreldrepenger kan du også ha rett til engangsstønad./),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegRett'])).toBeInTheDocument();

        const harRettFp = screen.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harRettFp[2]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();

        const harRettEs = screen.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harRettEs[0]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegRettPåEs'])).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som ikke har rett fordi hun bor i utlandet og jobber der', async () => {
        render(<MorHarIkkeRettJobberIkkeINorgeMenIUtlandet />);
        expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

        expect(screen.getByText(/Det ser ut som at du verken har rett til foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText(/Du kan ha rett til pengestøtte tilsvarende/)).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegIkkeRettPåEs'])).toBeInTheDocument();

        const harIkkeRettEs = screen.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegIkkeRett'])).toBeInTheDocument();
    });

    it('skal vise oppsummering for far som ikke har rett', async () => {
        render(<FarHarIkkeRett />);
        expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

        expect(screen.getByText(/Det ser ut som at du verken har rett til foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText(/Du kan ha rett til pengestøtte/)).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegIkkeRettPåEs'])).toBeInTheDocument();

        const harIkkeRettEs = screen.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        expect(screen.getByText(/Din situasjon som far eller medmor/)).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]!).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(messages['KravinfoBoks.DuIkkeOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegIkkeRett'])).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som har rett til engangsstønad', async () => {
        render(<MorHarRettTilEs />);
        expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

        expect(screen.getByText(messages['OppsummeringFpEllerEsSide.DuHarRettPåEs'])).toBeInTheDocument();
        expect(screen.getByText(messages['OppsummeringSide.HvaErEs'])).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegRettPåEs'])).toBeInTheDocument();

        const harRettEs = screen.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harRettEs[0]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[1]!).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]!).getByText(messages['KravinfoBoks.DuIkkeOppfyllerKravet'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(messages['HvorforHarJegRettPanel.DuMåVæreMedlem'])).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]!).getByText(messages['KravinfoBoks.DuOppfyllerKravet'])).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforHarJegIkkeRett'])).toBeInTheDocument();
    });

    it('skal vise annen formulering (kan) for far som har rett til engangsstønad', async () => {
        render(<FarKanHaRettTilFp />);
        expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

        expect(screen.getByText(messages['OppsummeringFpEllerEsSide.DuKanHaRett'])).toBeInTheDocument();

        expect(screen.getByText(messages['HvorforHarJegRettPanel.HvorforKanJegHaRett'])).toBeInTheDocument();
    });
});
