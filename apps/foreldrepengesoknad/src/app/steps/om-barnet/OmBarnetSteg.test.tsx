import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import dayjs from 'dayjs';
import * as stories from './OmBarnetSteg.stories';

vi.mock('app/utils/hooks/useSaveLoadedRoute', () => {
    return { default: vi.fn() };
});

const {
    MorFødsel,
    ForAdopsjon,
    FarFødsel,
    MedmorFødsel,
    RegistrertBarnFødselFar,
    RegistrertBarnFødselMor,
    RegistrertBarnTrillingerDerEnErDød,
} = composeStories(stories);

const farEllerMedMorSøker = [FarFødsel, MedmorFødsel];

describe('<OmBarnetSteg>', () => {
    it('skal ha født ett barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<MorFødsel gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Hvor mange barn har du fått?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        const barnFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnFødtInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 1,
                type: 'født',
                fødselsdatoer: [dayjs().format(ISO_DATE_FORMAT)],
                termindato: dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ha født flere barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<MorFødsel gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Hvor mange barn har du fått?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Flere barn'));

        await userEvent.selectOptions(screen.getByLabelText('Antall barn'), '4');

        const barnFødtInput = screen.getByLabelText('Når ble det eldste barnet født?');
        await userEvent.type(barnFødtInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 4,
                type: 'født',
                fødselsdatoer: [dayjs().format(ISO_DATE_FORMAT)],
                termindato: dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal lagre route når en går til forrige steg som er søkersituasjon', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<MorFødsel gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.SØKERSITUASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ikke ha født barn ennå', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(<MorFødsel gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Hvor mange barn venter du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        const termindatoInput = screen.getByLabelText('Når er termindatoen?');
        await userEvent.type(termindatoInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
        await userEvent.type(termindatoDatertInput, dayjs().subtract(10, 'days').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 1,
                type: 'ufødt',
                termindato: dayjs().format(ISO_DATE_FORMAT),
                terminbekreftelsedato: dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal søke stebarnsadopsjon for ett barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<ForAdopsjon gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const stebarnsadopsjonInput = screen.getByLabelText('Oppgi datoen for stebarnsadopsjon');
        await userEvent.type(stebarnsadopsjonInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().subtract(10, 'days').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 1,
                type: 'adoptertStebarn',
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                fødselsdatoer: [dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT)],
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal søke stebarnsadopsjon for flere barn', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<ForAdopsjon gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const stebarnsadopsjonInput = screen.getByLabelText('Oppgi datoen for stebarnsadopsjon');
        await userEvent.type(stebarnsadopsjonInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Flere barn'));

        await userEvent.selectOptions(screen.getByLabelText('Antall barn'), '4');

        const barn1FødtInput = screen.getByLabelText('Når er det første barnet født?');
        await userEvent.type(barn1FødtInput, dayjs().subtract(10, 'days').format('DD.MM.YYYY'));
        await userEvent.tab();

        const barn2FødtInput = screen.getByLabelText('Når er det andre barnet født?');
        await userEvent.type(barn2FødtInput, dayjs().subtract(15, 'days').format('DD.MM.YYYY'));
        await userEvent.tab();

        const barn3FødtInput = screen.getByLabelText('Når er det tredje barnet født?');
        await userEvent.type(barn3FødtInput, dayjs().subtract(20, 'days').format('DD.MM.YYYY'));
        await userEvent.tab();

        const barn4FødtInput = screen.getByLabelText('Når er det fjerde barnet født?');
        await userEvent.type(barn4FødtInput, dayjs().subtract(25, 'days').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 4,
                type: 'adoptertStebarn',
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                fødselsdatoer: [
                    dayjs().subtract(10, 'days').format(ISO_DATE_FORMAT),
                    dayjs().subtract(15, 'days').format(ISO_DATE_FORMAT),
                    dayjs().subtract(20, 'days').format(ISO_DATE_FORMAT),
                    dayjs().subtract(25, 'days').format(ISO_DATE_FORMAT),
                ],
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn, skal ikke bli spurt om adopsjon fra utland hvis barnet er adoptert etter 1.10.2021', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(overtaOmsorgDatoInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        expect(screen.queryByText('Adopterer du fra utlandet?')).not.toBeInTheDocument();
        expect(screen.queryByText('Når kommer barnet til Norge?')).not.toBeInTheDocument();
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn, skal bli spurt om adopsjon er fra utland hvis barnet er adoptert før 1.10.2021', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<ForAdopsjon gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(overtaOmsorgDatoInput, dayjs('2021-09-30').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        expect(screen.getByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs('2021-09-30').subtract(1, 'year').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        expect(screen.getByText('Adopterer du fra utlandet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const kommerTilNorgeDatoInput = screen.getByLabelText('Når kommer barnet til Norge?');
        await userEvent.type(kommerTilNorgeDatoInput, dayjs().format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                adopsjonsdato: '2021-09-30',
                adoptertIUtlandet: true,
                ankomstdato: '2024-02-06',
                antallBarn: 1,
                fødselsdatoer: ['2020-09-30'],
                type: 'adoptertAnnetBarn',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
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

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await userEvent.type(termindatoInput, dayjs('2022-08-01').format(DDMMYYYY_DATE_FORMAT));
            await userEvent.tab();

            expect(
                screen.getByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født.', {
                    exact: false,
                }),
            ).toBeInTheDocument();

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

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await userEvent.type(termindatoInput, dayjs('2022-08-02').format('DD.MM.YYYY'));
            await userEvent.tab();

            expect(
                screen.queryByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født. ', {
                    exact: false,
                }),
            ).not.toBeInTheDocument();

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

        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <RegistrertBarnFødselFar
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Barnet du søker foreldrepenger for:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG')).toBeInTheDocument();
        expect(screen.getByText('Født 15. mars 2021')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs('2021-03-01').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 1,
                fnr: ['21091981146'],
                fødselsdatoer: ['2021-03-15'],
                termindato: '2021-03-01',
                type: 'født',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        vi.useRealTimers();
    });

    it('Det registrerte barnet skal vises og far/medmor skal ikke måtte ikke oppgi termin hvis han velger registrert barn som er født tidligere enn de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2021-06-16');
        vi.setSystemTime(mockTodayDate);

        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(
            <RegistrertBarnFødselFar
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Barnet du søker foreldrepenger for:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG')).toBeInTheDocument();
        expect(screen.getByText('Født 15. mars 2021')).toBeInTheDocument();
        expect(screen.queryByText('Hva var termindatoen?')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 1,
                fnr: ['21091981146'],
                fødselsdatoer: ['2021-03-15'],
                termindato: undefined,
                type: 'født',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        vi.useRealTimers();
    });

    it('Det registrerte barnet skal vises og mor skal bli spurt om termindato hvis hun velger registrert barn født innenfor de siste 12 ukene', async () => {
        const mockTodayDate = new Date('2022-08-05');
        vi.setSystemTime(mockTodayDate);

        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(
            <RegistrertBarnFødselMor
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Barna du søker foreldrepenger for:')).toBeInTheDocument();
        expect(screen.getByText('LYST')).toBeInTheDocument();
        expect(screen.getByText('SNILT')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs('2022-07-17').format(DDMMYYYY_DATE_FORMAT));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 2,
                fnr: ['31091981146', '31091981147'],
                fødselsdatoer: ['2022-08-02', '2022-08-02'],
                termindato: '2022-07-17',
                type: 'født',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        vi.useRealTimers();
    });

    it('Trillinger der en er død skal vises uten navn', async () => {
        render(<RegistrertBarnTrillingerDerEnErDød />);
        expect(await screen.findByText('Barna du søker foreldrepenger for:')).toBeInTheDocument();
        expect(screen.getByText('Trillinger født 01. mars 2023 og 02. mars 2023')).toBeInTheDocument();
    });
});
