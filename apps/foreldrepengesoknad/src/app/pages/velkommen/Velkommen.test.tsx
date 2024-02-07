import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Velkommen.stories';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType } from 'app/context/FpDataContext';

vi.mock('app/utils/hooks/useSaveLoadedRoute', () => {
    return { default: vi.fn() };
});

const {
    Default,
    HarOpprettetFPSakFødselMedBarnetIPDL,
    HarFPSakUnderBehandlingTermin,
    HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,
    HarFlereSaker,
    HarSakFødselUtenBarnIPDL,
    HarSakAdopsjonUtenBarnIPDL,
    HarSakAdopsjonMedBarnIPDL,
    HarSakFødselTvillinger,
    HarSakFødselTrillinger,
    HarIngenSakerOgEttBarn,
    HarIngenSakerOgTvillinger,
    HarIngenSakerOgEtDødfødtBarn,
    HarIngenSakerOgEttDødtBarn,
    HarIngenSakerOgToDødeTvillinger,
    HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,
    HarIngenSakerMedEnLevendeOgEnDødTvilling,
    HarSakMedEnLevendeOgEnDødfødtTvilling,
    HarSakMedEtDødtBarn,
    HarSakAdopsjonMedEtDødtBarn,
    HarSakMedOppgittBarnTvillingerAlleLever,
    HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,
    HarSakMedTrillingerEnErDød,
} = composeStories(stories);

describe('<Velkommen>', () => {
    it('skal vise velkommen-side uten sak informasjon', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default onDispatch={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Start søknaden')).toBeInTheDocument();
        expect(screen.queryByText(/saken er under behandling/)).not.toBeInTheDocument();
        expect(screen.queryByText(/saken er ferdig behandlet/)).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
        await userEvent.click(screen.getByText('Start søknaden'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.SØKERSITUASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    //Har saker, og alle barna lever.
    it('skal vise velkommen-side med sak på fødsel som kan endres og så velge denne', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <HarOpprettetFPSakFødselMedBarnetIPDL
                onDispatch={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.getByText('Evig Lykkelig født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.queryByText('Det vil opprettes en ny sak')).toBeInTheDocument();
        expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Saksnummer 123456, saken er ferdig behandlet'));
        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));

        expect(await screen.findByText('Endre søknad')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Endre søknad'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(13);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(13, {
            data: SøknadRoutes.UTTAKSPLAN,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal måtte bekrefte at de har lest og forstått', async () => {
        render(<HarOpprettetFPSakFødselMedBarnetIPDL />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.queryByText('Du må bekrefte at du har lest og forstått dine plikter.')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Saksnummer 123456, saken er ferdig behandlet'));
        await userEvent.click(screen.getByText('Endre søknad'));

        expect(screen.getByText('Du må bekrefte at du har lest og forstått dine plikter.')).toBeInTheDocument();
    });

    it('skal måtte velge et barn for å fortsette', async () => {
        render(<HarOpprettetFPSakFødselMedBarnetIPDL />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(
            screen.queryByText('For å komme videre, må du velge et av alternativene ovenfor.'),
        ).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(screen.getByText('For å komme videre, må du velge et av alternativene ovenfor.')).toBeInTheDocument();
    });

    it('skal kunne søke på nytt barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <HarOpprettetFPSakFødselMedBarnetIPDL
                onDispatch={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Det vil opprettes en ny sak'));
        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));

        expect(screen.queryByText('Endre søknad')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.SØKERSITUASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal vise velkommen-side med løpende behandling sak status og mulighet for endring', async () => {
        render(<HarFPSakUnderBehandlingTermin />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Barn med termin 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er under behandling')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.getByText('Start søknaden')).toBeInTheDocument();
    });

    it('skal vise velkommen-side med løpende behandling sak status og mulighet for endring', async () => {
        render(<HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Evig Lykkelig adoptert 08.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er under behandling')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Saksnummer 123456, saken er under behandling'));

        expect(screen.getByText('Endre søknad')).toBeInTheDocument();
    });

    it('skal vise flere saker', async () => {
        render(<HarFlereSaker />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Evig Lykkelig født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Barn med termin 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 555555, saken er under behandling')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.getByText('Det vil opprettes en ny sak')).toBeInTheDocument();
    });

    it('skal greie å vise sak på fødsel uten å ha mottat barn fra pdl"', async () => {
        render(<HarSakFødselUtenBarnIPDL />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Barn født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal greie å vise sak på adopsjon uten å ha mottat barn fra pdl', async () => {
        render(<HarSakAdopsjonUtenBarnIPDL />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Barn adoptert 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal greie å vise sak på adopsjon med navn på barna hentet fra PDL', async () => {
        render(<HarSakAdopsjonMedBarnIPDL />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Evig Lykkelig adoptert 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal greie å vise sak med tvillinger med navn og skal ikke vise barna dobbelt når de også kommer inn fra PDL', async () => {
        render(<HarSakFødselTvillinger />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Evig Lykkelig og Grønn født 06.12.2022')).toBeInTheDocument();
        expect(screen.getAllByText('Evig Lykkelig og Grønn født 06.12.2022').length).toEqual(1);
        expect(screen.getByText('Saksnummer 123456, saken er under behandling')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal greie å vise sak med trillinger med navn', async () => {
        render(<HarSakFødselTrillinger />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Evig Lykkelig, Grønn og Sommerlig født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    //Ingen saker, og noen av barna er døde.
    it('skal vise ett barn fra PDL når ingen saker', async () => {
        render(<HarIngenSakerOgEttBarn />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Oriental født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal vise tvillinger fra PDL når ingen saker', async () => {
        render(<HarIngenSakerOgTvillinger />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Oriental og Vakker født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal vise ett barn fra PDL uten navn når barnet er dødfødt for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2022-10-25'));

        render(<HarIngenSakerOgEtDødfødtBarn />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Barn født', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        MockDate.reset();
    });

    it('skal ikke vise ett barn fra PDL når barnet er dødfødt for mer enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-08'));

        render(<HarIngenSakerOgEtDødfødtBarn />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Barn født', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText('Et annet barn')).not.toBeInTheDocument();

        MockDate.reset();
    });

    it('skal vise ett barn fra PDL uten navn når barnet døde for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-06'));

        render(<HarIngenSakerOgEttDødtBarn />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Barn født', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        MockDate.reset();
    });

    it('skal vise tvillinger fra PDL uten navn når begge barna døde for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-06'));

        render(<HarIngenSakerOgToDødeTvillinger />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Tvillinger født', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        MockDate.reset();
    });

    it('skal ikke vise tvillinger fra PDL når begge barna døde for mer enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-08'));

        render(<HarIngenSakerOgToDødeTvillinger />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Tvillinger født', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText('SEt annet barn')).not.toBeInTheDocument();

        MockDate.reset();
    });

    it('skal vise tvillinger fra PDL uten navn når et av barna døde under fødsel for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2022-10-25'));

        render(<HarIngenSakerMedEnLevendeOgEnDødfødtTvilling />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Tvillinger født', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        MockDate.reset();
    });

    it('skal ikke vise noen av tvillinger fra PDL hvis den ene døde under fødsel for mer enn 3 mnd siden og det finnes ingen sak på barna', async () => {
        MockDate.set(new Date('2023-03-25'));

        render(<HarIngenSakerMedEnLevendeOgEnDødfødtTvilling />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Oriental')).not.toBeInTheDocument();
        expect(screen.queryByText('Tvillinger født', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText('Søknaden min gjelder et annet barn')).not.toBeInTheDocument();

        MockDate.reset();
    });
    it('skal vise tvillinger fra PDL uten navn når et av barna døde for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2022-02-25'));

        render(<HarIngenSakerMedEnLevendeOgEnDødTvilling />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Tvillinger født', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        MockDate.reset();
    });

    //Har saker der noen av barna er døde.
    it('skal vise velkommen-side med sak på fødsel tvillinger der den ene er død. Navn skal ikke vises', async () => {
        render(<HarSakMedEnLevendeOgEnDødfødtTvilling />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.getByText('Tvillinger født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er under behandling')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
    });

    it('skal vise velkommen-side med sak på fødsel der barnet døde for mer enn 3 mnd siden. Navn skal ikke vises', async () => {
        MockDate.set(new Date('2023-04-01'));

        render(<HarSakMedEtDødtBarn />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Barn født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();

        MockDate.reset();
    });

    it('skal vise velkommen-side med sak på fødsel der barnet døde for mindre enn 3 mnd siden. Navn skal ikke vises', async () => {
        MockDate.set(new Date('2022-12-10'));

        render(<HarSakMedEtDødtBarn />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Barn født', { exact: false })).toBeInTheDocument();

        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.queryByText(/Evig Lykkelig/)).not.toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.queryByText('Endre søknad')).not.toBeInTheDocument();

        MockDate.reset();
    });

    it('skal vise velkommen-side med sak på adopsjon der barnet døde. Navn skal ikke vises', async () => {
        render(<HarSakAdopsjonMedEtDødtBarn />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.getByText('Barn adoptert 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Saksnummer 123456, saken er ferdig behandlet')).toBeInTheDocument();
        expect(screen.queryByText(/Oriental/)).not.toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.queryByText('Endre søknad')).not.toBeInTheDocument();
    });

    it('skal vise velkommen-side med sak på tvillinger som lever. Navn skal  vises', async () => {
        render(<HarSakMedOppgittBarnTvillingerAlleLever />);

        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.getByText('Oriental og Vakker født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.queryByText('Endre søknad')).not.toBeInTheDocument();
    });

    it('skal vise velkommen-side med sak på tvillinger som der en er dødfødt. Navn skal ikkevises', async () => {
        render(<HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling />);
        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.getByText('Tvillinger født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.queryByText('Endre søknad')).not.toBeInTheDocument();
    });

    it('skal vise velkommen-side med sak på trillinger som der en er død. Navn skal ikkevises', async () => {
        render(<HarSakMedTrillingerEnErDød />);
        expect(await screen.findByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
        expect(screen.getByText('Trillinger født 06.12.2022')).toBeInTheDocument();
        expect(screen.getByText('Et annet barn')).toBeInTheDocument();
        expect(screen.queryByText('Endre søknad')).not.toBeInTheDocument();
    });
});
