import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import * as stories from './OmBarnet.stories';
import SøknadRoutes from 'app/routes/routes';
import { FpDataType } from 'app/context/FpDataContext';

vi.mock('app/utils/hooks/useSaveLoadedRoute', () => {
    return { default: vi.fn() };
});

const {
    Default,
    ForAdopsjon,
    FarFødsel,
    MedmorFødsel,
    RegistrertBarnFødselFar,
    RegistrertBarnFødselMor,
    RegistrertBarnTrillingerDerEnErDød,
    SøknadPåUregistrertBarnSomErFødt,
} = composeStories(stories);

const farEllerMedMorSøker = [FarFødsel, MedmorFødsel];

//TODO (TOR) Testane her må i større grad testa output frå onSubmit-funksjonen. Kan testast gjennom 'gåTilNesteSide'

describe('<OmBarnet>', () => {
    it('skal ha født ett barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknad = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknad={mellomlagreSøknad} />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Hvor mange barn har du fått?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ett barn'));

        expect(screen.getByText('Når ble barnet født?')).toBeInTheDocument();

        const barnFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnFødtInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknad).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        //TODO Fiks sjekken mot datoar når ein endrar fra date => string
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                antallBarn: 1,
                type: 'født',
            }),
            key: FpDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: FpDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ikke ha født barn ennå', async () => {
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Hvor mange barn venter du?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ett barn'));

        expect(screen.getByText('Når er termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Når er termindatoen?');
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når du er i 22. svangerskapsuke eller senere.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse')).toBeInTheDocument();
        expect(screen.getByText('Når er terminbekreftelsen datert?')).toBeInTheDocument();

        const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
        await userEvent.type(termindatoDatertInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal søke stebarnsadopsjon for ett barn', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Oppgi datoen for stebarnsadopsjon')).toBeInTheDocument();

        const stebarnsadopsjonInput = screen.getByLabelText('Oppgi datoen for stebarnsadopsjon');
        await userEvent.type(stebarnsadopsjonInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ett barn'));

        expect(screen.getByText('Når ble barnet født?')).toBeInTheDocument();

        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Du må legge ved bekreftelse på datoen du overtok omsorgen for barnet, og adopsjonsbevilling hvis du har mottatt dette.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn, skal ikke bli spurt om adopsjon fra utland hvis barnet er adoptert etter 1.10.2021', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Når overtar du omsorgen?')).toBeInTheDocument();

        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(overtaOmsorgDatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ett barn'));

        expect(screen.getByText('Når ble barnet født?')).toBeInTheDocument();

        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Du må legge ved bekreftelse på datoen du overtok omsorgen for barnet, og adopsjonsbevilling hvis du har mottatt dette.',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Adopterer du fra utlandet?')).not.toBeInTheDocument();
        expect(screen.queryByText('Når kommer barnet til Norge?')).not.toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn, skal bli spurt om adopsjon er fra utland hvis barnet er adoptert før 1.10.2021', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Når overtar du omsorgen?')).toBeInTheDocument();

        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(overtaOmsorgDatoInput, dayjs(new Date('2021-09-30')).format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ett barn'));

        expect(screen.getByText('Når ble barnet født?')).toBeInTheDocument();

        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Adopterer du fra utlandet?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Når kommer barnet til Norge?')).toBeInTheDocument();

        const kommerTilNorgeDatoInput = screen.getByLabelText('Når kommer barnet til Norge?');
        await userEvent.type(kommerTilNorgeDatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Du må legge ved bekreftelse på datoen du overtok omsorgen for barnet, og adopsjonsbevilling hvis du har mottatt dette.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it.each(farEllerMedMorSøker)(
        'Far/medmor kan ikke søke på termin hvis WLB regler ikke gjelder',
        async (FarEllerMedMorSøker) => {
            const mockTodayDate = new Date('2022-08-01');
            vi.setSystemTime(mockTodayDate);

            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Nei'));

            expect(screen.getByText('Hvor mange barn venter dere?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Ett barn'));

            expect(screen.getByText('Når er termindatoen?')).toBeInTheDocument();

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await userEvent.type(termindatoInput, dayjs(new Date('2022-08-01')).format('DD.MM.YYYY'));
            await userEvent.tab();

            expect(
                screen.getByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

            vi.useRealTimers();
        },
    );

    it.each(farEllerMedMorSøker)(
        'Far/medmor kan søke på termin hvis WLB regler gjelder',
        async (FarEllerMedMorSøker) => {
            const mockTodayDate = new Date('2022-08-02');
            vi.setSystemTime(mockTodayDate);

            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Nei'));

            expect(screen.getByText('Hvor mange barn venter dere?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Ett barn'));

            expect(screen.getByText('Når er termindatoen?')).toBeInTheDocument();

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await userEvent.type(termindatoInput, dayjs(new Date('2022-08-02')).format('DD.MM.YYYY'));
            await userEvent.tab();

            expect(
                screen.getByText(
                    'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når mor er i 22. svangerskapsuke eller senere.',
                ),
            ).toBeInTheDocument();
            expect(
                screen.queryByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født. ', {
                    exact: false,
                }),
            ).not.toBeInTheDocument();
            expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

            expect(
                screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse'),
            ).toBeInTheDocument();

            const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
            await userEvent.type(termindatoDatertInput, dayjs().format('DD.MM.YYYY'));
            await userEvent.tab();

            expect(screen.getByText('Neste steg')).toBeInTheDocument();

            vi.useRealTimers();
        },
    );

    it('Det registrerte barnet skal vises og far/medmor må oppgi termin hvis han/hun velger registrert barn som er født innenfor de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2021-03-16');
        vi.setSystemTime(mockTodayDate);

        render(<RegistrertBarnFødselFar />);

        expect(await screen.findByText('Barnet du søker for:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG')).toBeInTheDocument();
        expect(screen.getByText('Født 15.03.2021')).toBeInTheDocument();
        expect(screen.getByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs(new Date('2021-03-01')).format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        vi.useRealTimers();
    });

    it('Det registrerte barnet skal vises og far/medmor skal ikke måtte ikke oppgi termin hvis han velger registrert barn som er født tidligere enn de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2021-06-16');
        vi.setSystemTime(mockTodayDate);

        render(<RegistrertBarnFødselFar />);

        expect(await screen.findByText('Barnet du søker for:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG')).toBeInTheDocument();
        expect(screen.getByText('Født 15.03.2021')).toBeInTheDocument();
        expect(screen.queryByText('Hva var termindatoen?')).not.toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        vi.useRealTimers();
    });

    it('Det registrerte barnet skal vises og mor skal bli spurt om termindato hvis hun velger registrert barn født innenfor de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2022-08-05');
        vi.setSystemTime(mockTodayDate);

        render(<RegistrertBarnFødselMor />);

        expect(await screen.findByText('Barna du søker for:')).toBeInTheDocument();
        expect(screen.getByText('LYST')).toBeInTheDocument();
        expect(screen.getByText('SNILT')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs(new Date('2021-03-17')).format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        vi.useRealTimers();
    });

    it('Begge de registrerte barna skal vises og mor skal bli spurt om termindato hvis hun velger to registrerte barn født tidligere enn de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2022-10-16');
        vi.setSystemTime(mockTodayDate);

        render(<RegistrertBarnFødselMor />);

        expect(await screen.findByText('Barna du søker for:')).toBeInTheDocument();
        expect(screen.getByText('LYST')).toBeInTheDocument();
        expect(screen.getByText('SNILT')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs(new Date('2022-08-01')).format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        vi.useRealTimers();
    });
    it('Trillinger der en er død skal vises uten navn', async () => {
        const mockTodayDate = new Date('2023-03-10');
        vi.setSystemTime(mockTodayDate);

        render(<RegistrertBarnTrillingerDerEnErDød />);

        expect(await screen.findByText('Barna du søker for:')).toBeInTheDocument();
        expect(screen.getByText('Trillinger', { exact: false })).toBeInTheDocument();

        vi.useRealTimers();
    });
    it('Skal fungere for en ny søknad basert på tidligerei innsendt søknad på et barn som er født men ikke registrert', async () => {
        render(<SøknadPåUregistrertBarnSomErFødt />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        expect(screen.getByText('Hvor mange barn har du fått?')).toBeInTheDocument();
        expect(screen.getByText('Når ble barnet født?')).toBeInTheDocument();
        expect(screen.getByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));

        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
