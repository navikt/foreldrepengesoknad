import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

import { IntlProvider, uiMessages } from '@navikt/fp-ui';

import { StepButtonsHookForm } from '../StepButtonsHookForm';
import { RhfDateRangepicker } from '../form-wrappers/RhfDateRangepicker';
import { RhfDatepicker } from '../form-wrappers/RhfDatepicker';
import { RhfForm } from '../form-wrappers/RhfForm';
import nbMessages from '../intl/messages/nb_NO.json';
import { Skjemautkast, SkjemautkastProvider, useFormMedUtkast } from './Skjemautkast';

const utkast: Skjemautkast = {
    route: '/barnet',
    skjema: 'Barnet',
    verdier: {
        dato: '2026-09-01',
        delvisDato: '12.0',
        perioder: [{ fom: '2026-09-02', tom: '15.' }],
        vedlegg: [{ uuid: 'opplastet-vedlegg', filename: 'bekreftelse.pdf', uploaded: true, file: {} }],
    },
};

const wrapper = ({ children }: { children: ReactNode }) => (
    <SkjemautkastProvider route="/barnet" utkast={utkast} lagre={vi.fn()}>
        {children}
    </SkjemautkastProvider>
);

describe('Skjemautkast', () => {
    it('gjenoppretter ufullstendige verdier og vedleggsreferanser uten å fylle inn gamle standardverdier', () => {
        const { result } = renderHook(
            () =>
                useFormMedUtkast('Barnet', {
                    defaultValues: { dato: '2025-01-01', slettet: 'gammel verdi' },
                }),
            { wrapper },
        );

        expect(result.current.getValues()).toEqual(utkast.verdier);
    });

    it('begrenser gjenoppretting til riktig skjema og rute', () => {
        const { result } = renderHook(
            () => useFormMedUtkast('AnnetSkjema', { defaultValues: { navn: 'standardverdi' } }),
            { wrapper },
        );
        expect(result.current.getValues()).toEqual({ navn: 'standardverdi' });

        const annenRute = renderHook(() => useFormMedUtkast('Barnet', { defaultValues: { navn: 'standardverdi' } }), {
            wrapper: ({ children }) => (
                <SkjemautkastProvider route="/annet-barn" utkast={utkast} lagre={vi.fn()}>
                    {children}
                </SkjemautkastProvider>
            ),
        });
        expect(annenRute.result.current.getValues()).toEqual({ navn: 'standardverdi' });
    });

    it('lagrer uten validering, men beholder vanlig validering ved neste', async () => {
        const lagre = vi.fn();
        const onValid = vi.fn();
        const { result } = renderHook(
            () => {
                const form = useFormMedUtkast('Barnet', { defaultValues: { navn: '' } });
                form.register('navn', { required: true });
                return form;
            },
            {
                wrapper: ({ children }) => (
                    <SkjemautkastProvider route="/barnet" lagre={lagre}>
                        {children}
                    </SkjemautkastProvider>
                ),
            },
        );
        act(() => result.current.lagreUtkast?.());
        expect(lagre).toHaveBeenCalledWith({ route: '/barnet', skjema: 'Barnet', verdier: { navn: '' } });
        await act(() => result.current.handleSubmit(onValid)());
        expect(onValid).not.toHaveBeenCalled();
    });

    it('fjerner utkastet når steget godtar innsendingen eller nullstilles', async () => {
        const lagre = vi.fn();
        const onValid = vi.fn();
        const { result } = renderHook(() => useFormMedUtkast('Barnet', { defaultValues: { dato: '' } }), {
            wrapper: ({ children }) => (
                <SkjemautkastProvider route="/barnet" utkast={utkast} lagre={lagre}>
                    {children}
                </SkjemautkastProvider>
            ),
        });
        await act(() => result.current.handleSubmit(onValid)());
        expect(lagre).not.toHaveBeenCalled();
        act(() => result.current.slettUtkast());
        expect(lagre).toHaveBeenCalledWith(undefined);
        expect(onValid).toHaveBeenCalledWith(utkast.verdier, undefined);
        lagre.mockClear();
        act(() => result.current.reset({ dato: '2026-01-01' }));
        expect(lagre).toHaveBeenCalledWith(undefined);
        expect(result.current.getValues()).toEqual({ dato: '2026-01-01' });
    });

    it('lar ikke et fullført steg bli overskrevet av det tidligere utkastet', async () => {
        const Skjema = ({ dato, lagre }: { dato: string; lagre: (dato: string) => void }) => {
            const form = useFormMedUtkast('Barnet', { defaultValues: { dato } });
            return (
                <RhfForm
                    formMethods={form}
                    onSubmit={(values) => {
                        form.slettUtkast();
                        lagre(values.dato);
                    }}
                >
                    <input aria-label="Dato" {...form.register('dato')} />
                    <button type="submit">Neste</button>
                </RhfForm>
            );
        };
        const Søknad = () => {
            const [lagretUtkast, setLagretUtkast] = useState<Skjemautkast | undefined>(utkast);
            const [dato, setDato] = useState('2026-01-01');
            const [montering, setMontering] = useState(0);
            return (
                <SkjemautkastProvider route="/barnet" utkast={lagretUtkast} lagre={setLagretUtkast}>
                    <Skjema key={montering} dato={dato} lagre={setDato} />
                    <button type="button" onClick={() => setMontering(montering + 1)}>
                        Åpne igjen
                    </button>
                </SkjemautkastProvider>
            );
        };
        render(<Søknad />);
        expect(screen.getByLabelText('Dato')).toHaveValue('2026-09-01');
        await userEvent.clear(screen.getByLabelText('Dato'));
        await userEvent.type(screen.getByLabelText('Dato'), '2026-09-03');
        await userEvent.click(screen.getByRole('button', { name: 'Neste' }));
        await userEvent.click(screen.getByRole('button', { name: 'Åpne igjen' }));
        expect(screen.getByLabelText('Dato')).toHaveValue('2026-09-03');
    });

    it('isolerer et dialogskjema fra skjemautkastet til steget', async () => {
        const lagre = vi.fn();
        const fortsettSenere = vi.fn();
        const Dialog = () => {
            const form = useForm({ defaultValues: { dialog: 'ufullstendig' } });
            return createPortal(
                <RhfForm formMethods={form}>
                    <StepButtonsHookForm goToPreviousStep={vi.fn()} onFortsettSenere={fortsettSenere} />
                </RhfForm>,
                document.body,
            );
        };
        const Steg = () => {
            const form = useFormMedUtkast('Barnet', { defaultValues: { dato: '12.0' } });
            return (
                <RhfForm formMethods={form}>
                    <Dialog />
                </RhfForm>
            );
        };
        render(
            <IntlProvider locale="nb" messagesGroupedByLocale={uiMessages}>
                <SkjemautkastProvider route="/barnet" lagre={lagre}>
                    <Steg />
                </SkjemautkastProvider>
            </IntlProvider>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));
        expect(fortsettSenere).toHaveBeenCalledOnce();
        expect(lagre).not.toHaveBeenCalled();
    });

    it('viser datoer og ufullstendige datotekster fra første montering', () => {
        const Skjema = () => {
            const form = useFormMedUtkast('Barnet', {
                defaultValues: { dato: '', delvisDato: '', perioder: [{ fom: '', tom: '' }] },
            });
            return (
                <RhfForm formMethods={form}>
                    <RhfDatepicker name="dato" control={form.control} label="Dato" />
                    <RhfDatepicker name="delvisDato" control={form.control} label="Ufullstendig dato" />
                    <RhfDateRangepicker
                        nameFrom="perioder.0.fom"
                        nameTo="perioder.0.tom"
                        labelFrom="Fra dato"
                        labelTo="Til dato"
                    />
                </RhfForm>
            );
        };
        render(
            <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nbMessages }}>
                <SkjemautkastProvider route="/barnet" utkast={utkast} lagre={vi.fn()}>
                    <Skjema />
                </SkjemautkastProvider>
            </IntlProvider>,
        );
        expect(screen.getByLabelText('Dato')).toHaveValue('01.09.2026');
        expect(screen.getByLabelText('Ufullstendig dato')).toHaveValue('12.0');
        expect(screen.getByLabelText('Fra dato')).toHaveValue('02.09.2026');
        expect(screen.getByLabelText('Til dato')).toHaveValue('15.');
    });
});
