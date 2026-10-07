import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';

import * as stories from './UttaksplanListe.stories';

const {
    Default,
    MorOgMedmor,
    FarSøkerEtterAtMorHarSøkt,
    MorOgFarMedFerieopphold,
    HullperiodeOverFamiliehendelsesdato,
    VisPerioderMedOppholdsårsakKorrekt,
    MorSøkerOgFarHarEøsPeriode,
    MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt,
    MarkeringNårGraderingsaktivitetMangler,
    HarUtsettelse,
    KunFarHarRettOgHarPauseperiode,
    EøsPerioderForAnnenPart,
} = composeStories(stories);

const åpneTidsperiode = async (oppdaterUttaksplan = vi.fn()) => {
    render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);
    await userEvent.click(await screen.findByText('Legg til periode'));
    const fraOgMedDato = screen.getByLabelText('Fra og med dato');
    const tilOgMedDato = screen.getByLabelText('Til og med dato');
    await userEvent.type(fraOgMedDato, '30.06.2025');
    await userEvent.type(tilOgMedDato, '28.08.2025');
    await userEvent.tab();
    return {
        fraOgMedDato,
        tilOgMedDato,
        uker: screen.getByRole('textbox', { name: 'Uker' }),
        dager: screen.getByRole('textbox', { name: 'Dager' }),
    };
};

describe('UttaksplanListe', () => {
    it('skal legge til ny periode - ferie', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. april 25 - 08. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til ferie'));

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(screen.getByText('Hva skal skje med resten av planen?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Endre uten å flytte resten av planen'));

        await userEvent.click(screen.getByText('Legg til'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-06-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-06-30',
                tom: '2025-08-28',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
            {
                fom: '2025-08-29',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ]);
    });

    it('skal kunne skrive inn antall uker og dager, og la dager over fire gå over i uker', async () => {
        render(<Default />);

        expect(await screen.findByText('18. april 25 - 08. mai 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));
        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Fra og med dato'), dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        const uker = await screen.findByRole('textbox', { name: 'Uker' });
        const dager = screen.getByRole('textbox', { name: 'Dager' });
        expect(uker).toHaveValue('8');
        expect(dager).toHaveValue('4');

        await userEvent.clear(uker);
        await userEvent.type(uker, '40');
        await userEvent.tab();

        expect(uker).toHaveValue('40');
        expect(dager).toHaveValue('4');
        expect(tilOgMedDato).toHaveValue('09.04.2026');

        await userEvent.click(screen.getByRole('button', { name: 'Legg til en dag' }));

        expect(uker).toHaveValue('41');
        expect(dager).toHaveValue('0');
        expect(tilOgMedDato).toHaveValue('10.04.2026');

        await userEvent.clear(dager);
        await userEvent.type(dager, '7');
        expect(dager).toHaveValue('7');
        expect(tilOgMedDato).toHaveValue('10.04.2026');
        await userEvent.tab();

        expect(uker).toHaveValue('42');
        expect(dager).toHaveValue('2');
        expect(tilOgMedDato).toHaveValue('21.04.2026');

        await userEvent.click(screen.getByRole('button', { name: 'Fjern en dag' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fjern en dag' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fjern en dag' }));

        expect(uker).toHaveValue('41');
        expect(dager).toHaveValue('4');
        expect(tilOgMedDato).toHaveValue('16.04.2026');
    });

    it('skal bevare hele dagtallet under inntasting og normalisere ved Enter eller blur', async () => {
        const { uker, dager, tilOgMedDato } = await åpneTidsperiode();

        await userEvent.clear(dager);
        await userEvent.type(dager, '50');
        expect(dager).toHaveValue('50');
        expect(uker).toHaveValue('8');
        expect(tilOgMedDato).toHaveValue('28.08.2025');

        await userEvent.keyboard('{Enter}');
        expect(dager).toHaveFocus();
        expect(uker).toHaveValue('18');
        expect(dager).toHaveValue('0');
        expect(tilOgMedDato).toHaveValue('31.10.2025');

        await userEvent.clear(dager);
        await userEvent.paste('75');
        await userEvent.tab();
        expect(uker).toHaveValue('33');
        expect(dager).toHaveValue('0');
        expect(tilOgMedDato).toHaveValue('13.02.2026');
    });

    it('skal oppdatere uker og dager når datoene endres direkte', async () => {
        const { fraOgMedDato, tilOgMedDato } = await åpneTidsperiode();

        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, '04.07.2025');
        await userEvent.tab();
        expect(screen.getByRole('textbox', { name: 'Uker' })).toHaveValue('1');
        expect(screen.getByRole('textbox', { name: 'Dager' })).toHaveValue('0');

        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, '02.07.2025');
        await userEvent.tab();
        expect(screen.getByRole('textbox', { name: 'Uker' })).toHaveValue('0');
        expect(screen.getByRole('textbox', { name: 'Dager' })).toHaveValue('3');
    });

    it.each([
        ['Uker', '100000000', 'Perioden kan ikke slutte etter 09.05.2028.'],
        ['Dager', '100000000', 'Perioden kan ikke slutte etter 09.05.2028.'],
        ['Uker', '9'.repeat(400), 'Perioden kan ikke slutte etter 09.05.2028.'],
        ['Uker', '-1', 'Skriv et heltall som er minst 0.'],
        ['Uker', '1.5', 'Skriv et heltall som er minst 0.'],
        ['Uker', 'abc', 'Skriv et heltall som er minst 0.'],
        ['Uker', '', 'Skriv et heltall som er minst 0.'],
    ])('skal avvise ugyldig antall i %s (tilfelle %#)', async (navn, verdi, forventetFeilmelding) => {
        const { tilOgMedDato } = await åpneTidsperiode();
        const antall = screen.getByRole('textbox', { name: navn });

        await userEvent.clear(antall);
        await userEvent.paste(verdi);
        await userEvent.tab();

        expect(antall).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByText(forventetFeilmelding)).toBeInTheDocument();
        expect(tilOgMedDato).toHaveValue('28.08.2025');

        await userEvent.clear(antall);
        await userEvent.type(antall, '2');
        await userEvent.tab();
        expect(antall).not.toHaveAttribute('aria-invalid', 'true');
        expect(tilOgMedDato).toHaveValue(navn === 'Uker' ? '17.07.2025' : '26.08.2025');
    });

    it('skal stoppe ved siste tillatte dato', async () => {
        const { tilOgMedDato } = await åpneTidsperiode();
        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, '09.05.2028');
        await userEvent.tab();
        expect(screen.getByRole('button', { name: 'Legg til en dag' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'Legg til en uke' })).toBeDisabled();

        await userEvent.click(screen.getByRole('button', { name: 'Fjern en dag' }));
        expect(tilOgMedDato).toHaveValue('08.05.2028');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til en dag' }));
        expect(tilOgMedDato).toHaveValue('09.05.2028');
    });

    it('skal beholde minst én dag og la dagsknappene passere ukegrensen begge veier', async () => {
        const { uker, dager, tilOgMedDato } = await åpneTidsperiode();
        await userEvent.clear(uker);
        await userEvent.type(uker, '0');
        await userEvent.tab();
        await userEvent.clear(dager);
        await userEvent.type(dager, '1');
        await userEvent.tab();
        expect(tilOgMedDato).toHaveValue('30.06.2025');
        expect(screen.getByRole('button', { name: 'Fjern en dag' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'Fjern en uke' })).toBeDisabled();

        await userEvent.clear(dager);
        await userEvent.type(dager, '0');
        await userEvent.tab();
        expect(dager).toHaveAttribute('aria-invalid', 'true');
        expect(tilOgMedDato).toHaveValue('30.06.2025');

        await userEvent.clear(dager);
        await userEvent.type(dager, '4');
        await userEvent.tab();
        await userEvent.click(screen.getByRole('button', { name: 'Legg til en dag' }));
        expect(uker).toHaveValue('1');
        expect(dager).toHaveValue('0');
        expect(dager).not.toHaveAttribute('aria-invalid', 'true');
        expect(tilOgMedDato).toHaveValue('04.07.2025');
        expect(screen.getByRole('button', { name: 'Fjern en uke' })).toBeDisabled();

        await userEvent.click(screen.getByRole('button', { name: 'Fjern en dag' }));
        expect(uker).toHaveValue('0');
        expect(dager).toHaveValue('4');
        expect(tilOgMedDato).toHaveValue('03.07.2025');
    });

    it.each(['før', 'etter'])('skal beholde varigheten når handling velges %s redigering', async (rekkefølge) => {
        const oppdaterUttaksplan = vi.fn();
        const { uker, dager, tilOgMedDato } = await åpneTidsperiode(oppdaterUttaksplan);
        if (rekkefølge === 'før') {
            await userEvent.click(screen.getByText('Legge til ferie'));
        }

        await userEvent.clear(uker);
        await userEvent.type(uker, '2');
        if (rekkefølge === 'etter') {
            await userEvent.click(screen.getByText('Legge til ferie'));
        }
        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));
        expect(uker).toHaveValue('2');
        expect(dager).toHaveValue('4');
        expect(tilOgMedDato).toHaveValue('17.07.2025');
        await userEvent.click(screen.getByText('Endre uten å flytte resten av planen'));
        await userEvent.click(screen.getByText('Legg til'));

        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    fom: '2025-06-30',
                    tom: '2025-07-17',
                    søker: expect.objectContaining({ utsettelseÅrsak: 'FERIE' }),
                }),
            ]),
        );
    });

    it('skal beholde endret varighet når forelder byttes', async () => {
        const { uker, dager, tilOgMedDato } = await åpneTidsperiode();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));
        await userEvent.clear(uker);
        await userEvent.type(uker, '2');
        await userEvent.tab();
        await userEvent.clear(dager);
        await userEvent.type(dager, '3');

        await userEvent.click(screen.getByRole('radio', { name: 'Begge' }));
        expect(uker).toHaveValue('2');
        expect(dager).toHaveValue('3');
        expect(tilOgMedDato).toHaveValue('16.07.2025');
    });

    it('skal hindre lagring når antallet er ugyldig', async () => {
        const oppdaterUttaksplan = vi.fn();
        const { uker } = await åpneTidsperiode(oppdaterUttaksplan);
        await userEvent.click(screen.getByText('Legge til ferie'));
        await userEvent.clear(uker);
        await userEvent.type(uker, '-1');
        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(uker).toHaveAttribute('aria-invalid', 'true');
        expect(screen.queryByText('Hva skal skje med resten av planen?')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();
    });

    it('skal endre antall uker i en eksisterende periode og vise og lagre den nye datoen', async () => {
        const oppdaterUttaksplan = vi.fn();
        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);
        await userEvent.click(await screen.findByText('12. des. 25 - 26. mars 26'));
        await userEvent.click(screen.getAllByText('Endre')[2]!);
        const uker = screen.getByRole('textbox', { name: 'Uker' });
        expect(uker).toHaveValue('15');

        await userEvent.clear(uker);
        await userEvent.type(uker, '40');
        await userEvent.tab();
        expect(screen.getByLabelText('Til og med dato')).toHaveValue('17.09.2026');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    fom: '2025-12-12',
                    tom: '2026-09-17',
                    annenPart: expect.objectContaining({ kontoType: 'FEDREKVOTE' }),
                }),
            ]),
        );
    });

    it('skal legge til ny periode - Periode med foreldrepenger', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. april 25 - 08. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));
        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));

        expect(await screen.findByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Begge'));

        expect(await screen.findByText('Mor skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fellesperiode')[1]!);

        expect(await screen.findByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fars kvote')[0]!);

        expect(await screen.findByText('Hvor mange prosent til mor?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent til mor?'), '50');

        expect(await screen.findByText('Hvor mange prosent til far?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent til far?'), '50');

        expect(await screen.findByText('Skal mor kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(await screen.findByText('Hvor mange prosent skal mor jobbe?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent skal mor jobbe?'), '50');

        expect(await screen.findByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(await screen.findByText('Hvor mange prosent skal far jobbe?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent skal far jobbe?'), '50');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(screen.getByText('Hva skal skje med resten av planen?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Endre uten å flytte resten av planen'));

        await userEvent.click(screen.getByText('Legg til'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-06-27',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-06-30',
                tom: '2025-08-28',
                søker: {
                    forelder: 'MOR',
                    gradering: {
                        aktivitet: {
                            type: 'ANNET',
                        },
                        arbeidstidprosent: 50,
                    },
                    kontoType: 'FELLESPERIODE',
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                },
                annenPart: {
                    forelder: 'FAR_MEDMOR',
                    gradering: {
                        aktivitet: {
                            type: 'ANNET',
                        },
                        arbeidstidprosent: 50,
                    },
                    kontoType: 'FEDREKVOTE',
                    morsAktivitet: undefined,
                    samtidigUttak: 50,
                    flerbarnsdager: false,
                },
            },
            {
                fom: '2025-08-29',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ]);
    });

    it('Fedrekvote skal ikke arve aktivitetskrav (morsAktivitet) når far bytter kontotype fra fellesperiode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. april 25 - 08. mai 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));
        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));

        expect(await screen.findByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('radio', { name: 'Far' }));

        // Far velger først fellesperiode og svarer på aktivitetskravet (mor i arbeid).
        expect(await screen.findByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('radio', { name: 'Fellesperiode' }));

        expect(await screen.findByText('Hva skal mor gjøre i denne perioden?')).toBeInTheDocument();
        await userEvent.selectOptions(screen.getByLabelText('Hva skal mor gjøre i denne perioden?'), 'ARBEID');

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('radio', { name: 'Nei' }));

        // Far ombestemmer seg og bytter til fars kvote – aktivitetskravet skal da nullstilles.
        await userEvent.click(screen.getByRole('radio', { name: 'Fars kvote' }));
        expect(screen.queryByText('Hva skal mor gjøre i denne perioden?')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(screen.getByText('Hva skal skje med resten av planen?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Endre uten å flytte resten av planen'));
        await userEvent.click(screen.getByText('Legg til'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        const lagredePerioder = oppdaterUttaksplan.mock.calls[0]![0] as UttakPeriodeDto_fpoversikt[];
        const fedrekvotePeriode = lagredePerioder.find(
            (p) =>
                p.annenPart?.forelder === 'FAR_MEDMOR' &&
                p.annenPart.kontoType === 'FEDREKVOTE' &&
                p.fom === '2025-06-30',
        );
        expect(fedrekvotePeriode).toBeDefined();
        expect(fedrekvotePeriode?.annenPart?.morsAktivitet).toBeUndefined();
    });

    it('Skal endre periode til ferie', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('12. des. 25 - 26. mars 26')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));

        await userEvent.click(screen.getAllByText('Endre')[2]!);

        expect(await screen.findByText('Endre periode')).toBeInTheDocument();
        expect(screen.getByText('Hva vil du gjøre?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ferie'));

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-08-22',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
            },
        ]);
    });

    it('Skal endre datoer for ferieperiode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<MorOgFarMedFerieopphold oppdaterUttaksplan={oppdaterUttaksplan} />);
        expect(await screen.findByText('12. des. 25 - 15. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. 25 - 15. des. 25'));
        const datoElement = screen.getByText('12. des. 25 - 15. des. 25');
        const periodeContainer = datoElement.closest('.aksel-stack') as HTMLElement;
        const endreKnapp = within(periodeContainer).getByRole('button', { name: /endre/i });

        await userEvent.click(endreKnapp);
        expect(await screen.findByText('Endre periode')).toBeInTheDocument();

        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2025-12-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, dayjs('2025-12-17').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(screen.getByText('Hva skal skje med resten av planen?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Endre uten å flytte resten av planen'));

        await userEvent.click(screen.getByText('Legg til'));

        expect(await screen.findByText('15. des. 25 - 17. des. 25')).toBeInTheDocument();
        expect(screen.queryByText('12. des. 25 - 15. des. 25')).not.toBeInTheDocument();
    });

    it('Skal slette periode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('09. mai 25 - 11. des. 25'));

        await userEvent.click(screen.getAllByText('Slett')[1]!);

        await userEvent.click(screen.getByText('09.05.2025 - 21.08.2025 - Olga Utviklers kvote'));

        await userEvent.click(screen.getByText('Slett valgte perioder'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-08-22',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ]);
    });

    it('Skal vise "Fars kvote" når det er morOgFar', async () => {
        const oppdaterUttaksplan = vi.fn();
        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();
        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));
        await userEvent.click(screen.getAllByText('Endre')[2]!);

        expect(screen.getByText('Fars kvote')).toBeInTheDocument();
        expect(screen.queryByText('Medmors kvote')).not.toBeInTheDocument();
    });

    it('Skal vise "Medmors kvote" når det er morOgmor', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<MorOgMedmor oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();
        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));
        await userEvent.click(screen.getAllByText('Endre')[2]!);

        expect(screen.getByText('Medmors kvote')).toBeInTheDocument();
        expect(screen.queryByText('Fars kvote')).not.toBeInTheDocument();
    });

    it('Skal vise periode uten foreldrepenger og to perioder for tapte dager', async () => {
        render(<HullperiodeOverFamiliehendelsesdato />);

        expect(await screen.findByText('14. mars 24 - 01. april 24')).toBeInTheDocument();

        const førsteRad = within(screen.getByTestId('2024-03-14 - 2024-04-01'));
        expect(førsteRad.getByText('14. mars 24 - 01. april 24')).toBeInTheDocument();
        expect(førsteRad.getByText('2 uker og 3 dager')).toBeInTheDocument();
        expect(førsteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const andreRad = within(screen.getByTestId('2024-04-02 - 2024-04-03'));
        expect(andreRad.getByText('02. april 24 - 03. april 24')).toBeInTheDocument();
        expect(andreRad.getByText('2 dager')).toBeInTheDocument();
        expect(andreRad.getAllByText('Uten foreldrepenger')).toHaveLength(2);

        const tredjeRad = within(screen.getByTestId('2024-04-04 - 2024-04-04'));
        expect(tredjeRad.getByText('04. april 24')).toBeInTheDocument();
        expect(tredjeRad.getAllByText('Fødsel')).toHaveLength(2);

        const fjerdeRad = within(screen.getByTestId('2024-04-04 - 2024-05-02'));
        expect(fjerdeRad.getByText('04. april 24 - 02. mai 24')).toBeInTheDocument();
        expect(fjerdeRad.getByText('4 uker og 1 dag')).toBeInTheDocument();
        expect(fjerdeRad.getAllByText('Dager du kan miste')).toHaveLength(2);

        const femteRad = within(screen.getByTestId('2024-05-03 - 2024-05-15'));
        expect(femteRad.getByText('03. mai 24 - 15. mai 24')).toBeInTheDocument();
        expect(femteRad.getByText('1 uke og 4 dager')).toBeInTheDocument();
        expect(femteRad.getAllByText('Hans har foreldrepenger')).toHaveLength(2);
    });

    it('Skal vise perioder med oppholdsårsak korrekt', async () => {
        render(<VisPerioderMedOppholdsårsakKorrekt />);

        expect(await screen.findByText('18. nov. 24 - 08. des. 24')).toBeInTheDocument();

        const førsteRad = within(screen.getByTestId('2024-11-18 - 2024-12-08'));
        expect(førsteRad.getByText('18. nov. 24 - 08. des. 24')).toBeInTheDocument();
        expect(førsteRad.getByText('3 uker')).toBeInTheDocument();
        expect(førsteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const andreRad = within(screen.getByTestId('2024-12-09 - 2024-12-09'));
        expect(andreRad.getByText('09. des. 24')).toBeInTheDocument();
        expect(andreRad.getAllByText('Fødsel')).toHaveLength(2);

        const fjerdeRad = within(screen.getByTestId('2024-12-09 - 2025-05-16'));
        expect(fjerdeRad.getByText('09. des. 24 - 16. mai 25')).toBeInTheDocument();
        expect(fjerdeRad.getByText('23 uker')).toBeInTheDocument();
        expect(fjerdeRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const femteRad = within(screen.getByTestId('2025-05-19 - 2025-09-29'));
        expect(femteRad.getByText('19. mai 25 - 29. sep. 25')).toBeInTheDocument();
        expect(femteRad.getByText('19 uker og 1 dag')).toBeInTheDocument();
        expect(femteRad.getAllByText('Hans har foreldrepenger')).toHaveLength(2);

        const sjetteRad = within(screen.getByTestId('2025-09-30 - 2025-10-15'));
        expect(sjetteRad.getByText('30. sep. 25 - 15. okt. 25')).toBeInTheDocument();
        expect(sjetteRad.getByText('2 uker og 2 dager')).toBeInTheDocument();
        expect(sjetteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        expect(screen.queryByText('Uten Foreldrepenger')).not.toBeInTheDocument();
        expect(screen.queryByText('Dager du kan miste')).not.toBeInTheDocument();
    });

    it('Skal ikke kunne redigere en EØS-periode', async () => {
        render(<MorSøkerOgFarHarEøsPeriode />);

        expect(await screen.findByText('03. juli 24 - 15. juli 24')).toBeInTheDocument();

        const eøsRad = within(screen.getByTestId('2024-07-03 - 2024-07-15'));
        expect(eøsRad.getByText('03. juli 24 - 15. juli 24')).toBeInTheDocument();
        expect(eøsRad.getByText('1 uke og 4 dager')).toBeInTheDocument();
        expect(eøsRad.getAllByText('Hans har foreldrepenger (EU/EØS)')).toHaveLength(2);

        const ekspandertEøsRad = within(
            screen.getByText('Den andre forelderen mottar pengestøtte i et annet EU/EØS-land'),
        );
        expect(
            ekspandertEøsRad.getByText('Den andre forelderen mottar pengestøtte i et annet EU/EØS-land'),
        ).toBeInTheDocument();
        expect(ekspandertEøsRad.queryByText('Endre')).not.toBeInTheDocument();
        expect(ekspandertEøsRad.queryByText('Slett')).not.toBeInTheDocument();
    });

    it('Skal få advarsel om at en må velge mors aktivitet', async () => {
        render(<MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt />);

        expect(await screen.findByText('Du må velge mors aktivitet før du går videre')).toBeInTheDocument();

        expect(screen.getAllByText('Mangler mors aktivitet')).toHaveLength(3);

        await userEvent.click(screen.getAllByText('Mangler mors aktivitet')[0]!);

        const alleEndringsknapper = screen.getAllByText('Endre');
        await userEvent.click(alleEndringsknapper.at(-1)!);

        expect(await screen.findByText('Du må velge mors aktivitet før du kan gå videre.')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Hva skal mor gjøre i denne perioden?'), 'ARBEID');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(screen.getByText('Mor er i arbeid')).toBeInTheDocument();

        expect(screen.queryByText('Du må velge mors aktivitet før du går videre')).not.toBeInTheDocument();
    });

    it('Skal få advarsel om at gradering manglar arbeidsgiver når plan kjem frå planleggar', async () => {
        render(<MarkeringNårGraderingsaktivitetMangler />);

        expect(
            await screen.findByText(
                'Du må velge hvor du skal jobbe samtidig som du har foreldrepenger før du går videre',
            ),
        ).toBeInTheDocument();

        expect(
            screen.getAllByText('Mangler hvor du skal jobbe samtidig som du har foreldrepenger').length,
        ).toBeGreaterThanOrEqual(1);
    });

    it('Skal kunne slette og endre alle perioder bortsett fra periodene til annen part', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);
        expect(await screen.findAllByText('Hanne har foreldrepenger')).toHaveLength(6);
        expect(screen.getAllByText('Endre')).toHaveLength(2);
        expect(screen.queryByText('Slett')).not.toBeInTheDocument();
    });

    it('Skal vise annen part sin ferie og gradering, ikkje berre kontonamn', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        expect(await screen.findAllByText('Ferie')).toHaveLength(3);
        expect(screen.getByText('Du skal jobbe 50 % og ha 50 % foreldrepenger')).toBeInTheDocument();
    });

    it('Skal vise begge foreldra sitt uttak når dei har samtidig uttak i same periode', async () => {
        render(
            <FarSøkerEtterAtMorHarSøkt
                perioder={[
                    {
                        fom: '2024-04-04',
                        tom: '2024-04-18',
                        søker: {
                            forelder: 'FAR_MEDMOR',
                            kontoType: 'FEDREKVOTE',
                            samtidigUttak: 50,
                            flerbarnsdager: false,
                        },
                        annenPart: {
                            forelder: 'MOR',
                            kontoType: 'MØDREKVOTE',
                            samtidigUttak: 50,
                            flerbarnsdager: false,
                        },
                    },
                ]}
            />,
        );

        expect(await screen.findByText('Hans skal ha 50 % foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hanne skal ha 50 % foreldrepenger')).toBeInTheDocument();
    });

    it('Skal ikkje vise heile samtidig uttak som avslått når berre den eine parten har fått avslag', async () => {
        render(
            <FarSøkerEtterAtMorHarSøkt
                perioder={[
                    {
                        fom: '2024-04-04',
                        tom: '2024-04-18',
                        søker: {
                            forelder: 'FAR_MEDMOR',
                            kontoType: 'FEDREKVOTE',
                            samtidigUttak: 50,
                            flerbarnsdager: false,
                        },
                        annenPart: {
                            forelder: 'MOR',
                            kontoType: 'MØDREKVOTE',
                            samtidigUttak: 50,
                            flerbarnsdager: false,
                            resultat: {
                                innvilget: false,
                                trekkerDager: true,
                                trekkerMinsterett: false,
                                årsak: 'ANNET',
                            },
                        },
                    },
                ]}
            />,
        );

        expect(await screen.findByText('Hans skal ha 50 % foreldrepenger')).toBeInTheDocument();
        // Berre innhaldet for Hanne sin avslåtte del, ikkje overskrifta på heile rada.
        expect(screen.getAllByText('Trekte dager')).toHaveLength(1);
        expect(screen.getByText('Endre')).toBeInTheDocument();
        expect(screen.getByText('Slett')).toBeInTheDocument();
    });

    it('Mors fellesperiode skal vises som "Fellesperiode" i fars listevisning, ikke "med aktivitetskrav"', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        // Mor har tre fellesperioder. Når far ser oversikten sin skal disse vises
        // som "Fellesperiode", ikke "Foreldrepenger med aktivitetskrav" (som er
        // forbeholdt bare-far-har-rett-perioder med kontoType FORELDREPENGER).
        expect(await screen.findAllByText('Fellesperiode')).toHaveLength(3);
        expect(screen.queryByText('Foreldrepenger med aktivitetskrav')).not.toBeInTheDocument();
    });

    it('Skal ikke kunne legge til annen part som forelder når en legger til ny periode', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        expect(await screen.findByText('14. mars 24 - 03. april 24')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));

        expect(screen.getByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Mor')).not.toBeInTheDocument();
        expect(screen.getByText('Far')).toBeInTheDocument();
        expect(screen.getByText('Begge')).toBeInTheDocument();
    });

    it('Skal slette periode direkte uten å spørre om forskyvning', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('09. mai 25 - 11. des. 25'));

        await userEvent.click(screen.getAllByText('Slett')[1]!);

        await userEvent.click(screen.getByText('22.08.2025 - 11.12.2025 - Fellesperiode'));

        await userEvent.click(screen.getByText('Slett valgte perioder'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-12-12',
                tom: '2026-03-26',
                annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
            },
        ]);
    });

    it('Skal slette periode direkte og ikke spørre om forskyvning når en sletter siste periode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('12. des. 25 - 26. mars 26')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));

        await userEvent.click(screen.getAllByText('Slett')[2]!);

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                tom: '2025-05-08',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2025-05-09',
                tom: '2025-08-21',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2025-08-22',
                tom: '2025-12-11',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
        ]);
    });

    it('Skal kun vise utsettelse-valget når valgt tidsrom er innenfor 6-ukersperioden', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<HarUtsettelse oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('15. aug. 25 - 25. aug. 25')).toBeInTheDocument();
        expect(screen.getAllByText('Barnet er innlagt')).toHaveLength(2);

        await userEvent.click(screen.getByText('15. aug. 25 - 25. aug. 25'));

        expect(screen.getByText('Utsettelse fordi barnet er innlagt i helseinstitusjon')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Endre')[1]!);

        expect(screen.getByText('Velg hvorfor du skal utsette')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Avbryt'));

        await userEvent.click(screen.getByText('Legg til periode'));

        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-10-26').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-10-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        // Tidsrom utenfor 6-ukersperioden: «Utsettelse» skal ikke være et valg
        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Utsettelse' })).not.toBeInTheDocument();

        // Endre til et tidsrom innenfor 6-ukersperioden → «Utsettelse» dukker opp
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2025-08-26').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(await screen.findByRole('radio', { name: 'Utsettelse' }));

        await userEvent.selectOptions(screen.getByLabelText('Velg hvorfor du skal utsette'), 'SØKER_SYKDOM');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-08-15',
                tom: '2025-08-25',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'BARN_INNLAGT', flerbarnsdager: false },
            },
            {
                fom: '2025-08-26',
                tom: '2025-08-28',
                søker: { forelder: 'MOR', utsettelseÅrsak: 'SØKER_SYKDOM', flerbarnsdager: false },
            },
        ]);
    });

    it('Skal ha periode med pause og legge til ny periode med pause', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<KunFarHarRettOgHarPauseperiode oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('24. mai 24 - 28. mai 24')).toBeInTheDocument();
        expect(screen.getAllByText('Pause i uttaket')).toHaveLength(2);

        await userEvent.click(screen.getByText('24. mai 24 - 28. mai 24'));

        expect(screen.getByText('Mor er i arbeid og utdanning')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Endre')[3]!);

        expect(screen.getByText('Hva gjør mor i denne perioden?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Avbryt'));

        await userEvent.click(screen.getByText('Legg til periode'));

        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2024-04-29').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2024-05-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        // Tidsrom før utløpet av 6-ukersperioden: «Pause» skal ikke være et valg
        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Pause' })).not.toBeInTheDocument();

        // Endre fra-dato til etter 6-ukersperioden → «Pause» dukker opp
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2024-05-29').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(await screen.findByRole('radio', { name: 'Pause' }));

        await userEvent.selectOptions(screen.getByLabelText('Hva gjør mor i denne perioden?'), 'ARBEID');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2024-05-17',
                tom: '2024-05-23',
                søker: { flerbarnsdager: false, forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE' },
            },
            {
                fom: '2024-05-24',
                tom: '2024-05-28',
                søker: {
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                    morsAktivitet: 'ARBEID_OG_UTDANNING',
                    utsettelseÅrsak: 'FRI',
                },
            },
            {
                fom: '2024-05-29',
                tom: '2024-05-30',
                søker: {
                    flerbarnsdager: false,
                    forelder: 'FAR_MEDMOR',
                    morsAktivitet: 'ARBEID',
                    utsettelseÅrsak: 'FRI',
                },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { flerbarnsdager: false, forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE' },
            },
        ]);
    });

    it('skal skjule forelder-spørsmålet og sette verdien bak panseret når kun far har rett', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<KunFarHarRettOgHarPauseperiode oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('24. mai 24 - 28. mai 24')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2024-06-14').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2024-06-20').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));

        // Når kun far har rett til foreldrepenger, skal spørsmålet om hvem som
        // skal ha foreldrepenger ikke vises. Verdien settes bak panseret, og vi
        // går rett til kvotetype-spørsmålet "Far skal ha?".
        expect(await screen.findByText('Far skal ha?')).toBeInTheDocument();
        expect(screen.queryByText('Hvem skal ha foreldrepenger?')).not.toBeInTheDocument();
    });

    it('Skal ikke kunne legge til ferieperiode etter 6-ukerperioden for kun far har rett', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<KunFarHarRettOgHarPauseperiode oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('16. mai 24 - 16. mai 24')).toBeInTheDocument();

        await userEvent.click(screen.getByText('16. mai 24 - 16. mai 24'));

        await userEvent.click(screen.getAllByText('Endre')[3]!);

        // Tidsrommet ligger etter 6-ukersperioden for kun-far-har-rett → «Ferie» er ikke et gyldig valg
        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Ferie' })).not.toBeInTheDocument();
    });

    it('Skal kunne legge inn eget uttak i annen parts EØS-periode, med advarsel om avslag', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<EøsPerioderForAnnenPart oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findAllByText('Hanne har foreldrepenger (EU/EØS)')).toHaveLength(4);

        await userEvent.click(screen.getByText('Legg til periode'));

        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-10-08').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-10-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Den andre forelderen mottar pengestøtte i et annet EU/EØS-land. Hvis dere ønsker å motta ' +
                    'foreldrepenger samtidig, kan dette medføre avslag. Årsaken er at saken må vurderes i ' +
                    'samsvar med norske regelverk for foreldrepenger.',
            ),
        ).toBeInTheDocument();

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til ferie'));

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(
            screen.queryByText('Periode kan ikke overlappe med en eksisterende EU/EØS-periode'),
        ).not.toBeInTheDocument();

        // Annen parts EØS-perioder ligger låst senere i planen, så «Endre uten å
        // flytte resten av planen» er eneste valg. Da skal spørsmålet ikke vises,
        // og ferien legges til direkte uten å flytte resten av planen.
        expect(screen.queryByText('Hva skal skje med resten av planen?')).not.toBeInTheDocument();

        await waitFor(() => expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1));
    });

    it('Bare far har rett - avslåtte perioder skal ikke vise "med aktivitetskrav" i listevisningen', async () => {
        const { BareFarHarRettMedAvslåttePerioder } = composeStories(stories);
        render(<BareFarHarRettMedAvslåttePerioder />);

        // Avslåtte perioder vert no skilde ut i eiga rad, så me får 3 rader:
        // - Rad 1 (09. mars - 15. mai): innvilget, morsAktivitet=IKKE_OPPGITT → "Foreldrepenger uten aktivitetskrav"
        // - Rad 2 (18. mai - 12. juni): avslått, morsAktivitet=ARBEID → skal vise "Trekte dager" (ikkje "med aktivitetskrav")
        // - Rad 3 (15. juni - 10. juli): innvilget, morsAktivitet=ARBEID → "Foreldrepenger med aktivitetskrav"
        await userEvent.click(screen.getByTestId('2026-03-09 - 2026-05-15'));
        await userEvent.click(screen.getByTestId('2026-05-18 - 2026-06-12'));
        await userEvent.click(screen.getByTestId('2026-06-15 - 2026-07-10'));

        // Innvilget med IKKE_OPPGITT skal vise "uten aktivitetskrav"
        expect(screen.getByText('Foreldrepenger uten aktivitetskrav')).toBeInTheDocument();

        // Innvilget med ARBEID skal vise "med aktivitetskrav" (bare 1 gang – avslått periode skal ikke ha det)
        expect(screen.getAllByText('Foreldrepenger med aktivitetskrav')).toHaveLength(1);

        // Avslått periode skal ikke vise "Foreldrepenger" som tekst i innhaldet
        expect(screen.queryByText(/^Foreldrepenger$/)).not.toBeInTheDocument();
    });
});
