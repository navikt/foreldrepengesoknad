import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { BarnType, Forelder } from '@navikt/fp-constants';
import { SaksperiodeNy, UtsettelseÅrsakType } from '@navikt/fp-types';

import { UttaksplanNy } from './Uttaksplan';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const meta = {
    component: UttaksplanNy,
    args: {
        handleOnPlanChange: action('button-click'),
    },
    render: (args) => {
        const [perioder, setPerioder] = useState<SaksperiodeNy[]>(args.søkersPerioder);

        const handleOnPlanChange = (oppdatertePerioder: SaksperiodeNy[]) => {
            setPerioder(oppdatertePerioder);
            args.handleOnPlanChange(oppdatertePerioder);
        };

        return <UttaksplanNy {...args} søkersPerioder={perioder} handleOnPlanChange={handleOnPlanChange} />;
    },
} satisfies Meta<typeof UttaksplanNy>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        familiehendelsedato: '2025-05-09',
        erFarEllerMedmor: false,
        navnPåForeldre: {
            mor: 'Olga Utvikler',
            farMedmor: 'Espen Utvikler',
        },
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-05-09'],
            antallBarn: 1,
            termindato: '2025-05-09',
        },
        søkersPerioder: [
            {
                forelder: Forelder.mor,
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: Forelder.mor,
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
            },
            {
                forelder: Forelder.mor,
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: Forelder.farMedmor,
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
            },
        ],
        gjelderAdopsjon: false,
        bareFarMedmorHarRett: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        førsteUttaksdagNesteBarnsSak: undefined,
        familiesituasjon: 'fødsel',
        modus: 'planlegger',
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        erAleneOmOmsorg: false,
    },
};

export const MorOgMedmor: Story = {
    args: {
        ...Default.args,
        erFarEllerMedmor: true,
        erMedmorDelAvSøknaden: true,
        navnPåForeldre: {
            mor: 'Olga Utvikler',
            farMedmor: 'Helga Utvikler',
        },
    },
};

export const MorOgFarMedFerieopphold: Story = {
    name: 'Mor og far, uten felles med ferieopphold',
    args: {
        ...Default.args,
        søkersPerioder: [
            {
                forelder: Forelder.mor,
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: Forelder.mor,
                kontoType: 'MØDREKVOTE',
                fom: '2025-05-09',
                tom: '2025-08-21',
            },
            {
                forelder: Forelder.mor,
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: Forelder.mor,
                utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
                fom: '2025-12-12',
                tom: '2025-12-15',
            },
            {
                forelder: Forelder.farMedmor,
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-16',
                tom: '2026-03-30',
            },
        ],
    },
};
