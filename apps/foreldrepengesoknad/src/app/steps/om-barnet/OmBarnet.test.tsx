import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import * as stories from './OmBarnet.stories';

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

const GÅ_VIDERE_KNAPP = 'Neste steg';
const JA = 'Ja';
const NEI = 'Nei';

describe('<OmBarnet>', () => {
    it('skal ha født ett barn', async () => {
        const user = userEvent.setup();
        render(<Default />);
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

        await user.click(screen.getByText(JA));
        expect(await screen.findByText('Hvor mange barn har du fått?')).toBeInTheDocument();

        await user.click(screen.getByText('Ett barn'));
        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();

        const barnFødtInput = screen.getByLabelText('Når ble barnet født?');
        await user.type(barnFødtInput, dayjs.utc().format('DD.MM.YYYY'));

        await user.tab();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await user.type(termindatoInput, dayjs.utc().format('DD.MM.YYYY'));

        await user.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha født barn ennå', async () => {
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText('Hvor mange barn venter du?')).toBeInTheDocument();
        await user.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Når er termindatoen?');
        await user.type(termindatoInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(
            await screen.findByText(
                'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når du er i 22. svangerskapsuke eller senere.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse')).toBeInTheDocument();

        expect(await screen.findByText('Når er terminbekreftelsen datert?')).toBeInTheDocument();
        const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
        await user.type(termindatoDatertInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke stebarnsadopsjon for ett barn', async () => {
        const user = userEvent.setup();
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await user.click(screen.getByText(JA));

        expect(await screen.findByText('Oppgi datoen for stebarnsadopsjon')).toBeInTheDocument();
        const stebarnsadopsjonInput = screen.getByLabelText('Oppgi datoen for stebarnsadopsjon');
        await user.type(stebarnsadopsjonInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await user.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await user.type(barnetFødtInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(
            await screen.findByText(
                'Du må legge ved bekreftelse på datoen du overtok omsorgen for barnet, og adopsjonsbevilling hvis du har mottatt dette.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn, skal ikke bli spurt om adopsjon fra utland hvis barnet er adoptert etter 1.10.2021', async () => {
        const user = userEvent.setup();
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText('Når overtar du omsorgen?')).toBeInTheDocument();
        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await user.type(overtaOmsorgDatoInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await user.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await user.type(barnetFødtInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.queryByText('Adopterer du fra utlandet?')).not.toBeInTheDocument();

        expect(screen.queryByText('Når kommer barnet til Norge?')).not.toBeInTheDocument();

        expect(
            await screen.findByText(
                'Du må legge ved bekreftelse på datoen du overtok omsorgen for barnet, og adopsjonsbevilling hvis du har mottatt dette.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn, skal bli spurt om adopsjon er fra utland hvis barnet er adoptert før 1.10.2021', async () => {
        const user = userEvent.setup();
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText('Når overtar du omsorgen?')).toBeInTheDocument();
        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await user.type(overtaOmsorgDatoInput, dayjs.utc(new Date('2021-09-30')).format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await user.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await user.type(barnetFødtInput, dayjs.utc(new Date('2021-09-01')).format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText('Adopterer du fra utlandet?')).toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText('Når kommer barnet til Norge?')).toBeInTheDocument();
        const kommerTilNorgeDatoInput = screen.getByLabelText('Når kommer barnet til Norge?');
        await user.type(kommerTilNorgeDatoInput, dayjs.utc().format('DD.MM.YYYY'));
        await user.tab();

        expect(
            await screen.findByText(
                'Du må legge ved bekreftelse på datoen du overtok omsorgen for barnet, og adopsjonsbevilling hvis du har mottatt dette.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it.each(farEllerMedMorSøker)(
        'Far/medmor kan ikke søke på termin hvis WLB regler ikke gjelder',
        async (FarEllerMedMorSøker) => {
            const mockTodayDate = new Date('2022-08-01');
            vi.setSystemTime(mockTodayDate);
            const user = userEvent.setup();
            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

            await user.click(screen.getByText(NEI));
            expect(await screen.findByText('Hvor mange barn venter dere?')).toBeInTheDocument();

            await user.click(screen.getByText('Ett barn'));
            expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await user.type(termindatoInput, dayjs.utc(new Date('2022-08-01')).format('DD.MM.YYYY'));
            await user.tab();

            expect(
                await screen.findByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født.', {
                    exact: false,
                })
            ).toBeInTheDocument();
            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
            vi.useRealTimers();
        }
    );

    it.each(farEllerMedMorSøker)(
        'Far/medmor kan søke på termin hvis WLB regler gjelder',
        async (FarEllerMedMorSøker) => {
            const mockTodayDate = new Date('2022-08-02');
            vi.setSystemTime(mockTodayDate);
            const user = userEvent.setup();
            render(<FarEllerMedMorSøker />);
            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
            await user.click(screen.getByText(NEI));
            expect(await screen.findByText('Hvor mange barn venter dere?')).toBeInTheDocument();
            await user.click(screen.getByText('Ett barn'));
            expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await user.type(termindatoInput, dayjs.utc(new Date('2022-08-02')).format('DD.MM.YYYY'));
            await user.tab();
            expect(
                screen.queryByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født. ', {
                    exact: false,
                })
            ).not.toBeInTheDocument();
            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når mor er i 22. svangerskapsuke eller senere.'
                )
            ).toBeInTheDocument();
            expect(
                screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse')
            ).toBeInTheDocument();

            expect(await screen.findByText('Når er terminbekreftelsen datert?')).toBeInTheDocument();
            const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
            await user.type(termindatoDatertInput, dayjs.utc().format('DD.MM.YYYY'));
            await user.tab();

            expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
            vi.useRealTimers();
        }
    );

    it('Det registrerte barnet skal vises og far/medmor må oppgi termin hvis han/hun velger registrert barn som er født innenfor de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2021-03-16');
        vi.setSystemTime(mockTodayDate);
        const user = userEvent.setup();
        render(<RegistrertBarnFødselFar />);
        expect(await screen.findByText('Barnet du søker for:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG')).toBeInTheDocument();
        expect(screen.getByText('Født 15.03.2021')).toBeInTheDocument();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await user.type(termindatoInput, dayjs.utc(new Date('2021-03-01')).format('DD.MM.YYYY'));
        await user.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
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
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('Det registrerte barnet skal vises og mor skal bli spurt om termindato hvis hun velger registrert barn født innenfor de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2022-08-05');
        vi.setSystemTime(mockTodayDate);
        const user = userEvent.setup();
        render(<RegistrertBarnFødselMor />);
        expect(await screen.findByText('Barna du søker for:')).toBeInTheDocument();
        expect(screen.getByText('LYST')).toBeInTheDocument();
        expect(screen.getByText('SNILT')).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await user.type(termindatoInput, dayjs.utc(new Date('2021-03-17')).format('DD.MM.YYYY'));
        await user.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('Begge de registrerte barna skal vises og mor skal bli spurt om termindato hvis hun velger to registrerte barn født tidligere enn de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2022-10-16');
        vi.setSystemTime(mockTodayDate);
        const user = userEvent.setup();
        render(<RegistrertBarnFødselMor />);
        expect(await screen.findByText('Barna du søker for:')).toBeInTheDocument();
        expect(screen.getByText('LYST')).toBeInTheDocument();
        expect(screen.getByText('SNILT')).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await user.type(termindatoInput, dayjs.utc(new Date('2022-08-01')).format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        vi.useRealTimers();
    });
    it('Trillinger der en er død skal vises uten navn', async () => {
        const mockTodayDate = new Date('2023-03-10');
        vi.setSystemTime(mockTodayDate);
        render(<RegistrertBarnTrillingerDerEnErDød />);
        expect(await screen.findByText('Barna du søker for:')).toBeInTheDocument();
        expect(await screen.findByText('Trillinger', { exact: false })).toBeInTheDocument();
        vi.useRealTimers();
    });
    it('Skal fungere for en ny søknad basert på tidligerei innsendt søknad på et barn som er født men ikke registrert', async () => {
        const user = userEvent.setup();
        render(<SøknadPåUregistrertBarnSomErFødt />);
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        expect(await screen.findByText('Hvor mange barn har du fått?')).toBeInTheDocument();
        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await user.type(termindatoInput, dayjs().format('DD.MM.YYYY'));

        await user.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
