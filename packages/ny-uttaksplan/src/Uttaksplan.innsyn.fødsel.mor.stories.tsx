import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';

import { BarnType, Forelder } from '@navikt/fp-constants';
import { PeriodeResultatÅrsak, SaksperiodeNy, UtsettelseÅrsakType } from '@navikt/fp-types';

import { UttaksplanNy } from './Uttaksplan';
import { UttaksplanDataProvider } from './context/UttaksplanDataContext';

const meta = {
    title: 'Uttaksplan - Innsyn',
    component: UttaksplanNy,
    args: {
        handleOnPlanChange: () => null,
        children: null,
        erMedmorDelAvSøknaden: false,
    },

    render: (args) => {
        const [perioder, setPerioder] = useState<SaksperiodeNy[]>(args.saksperioder);

        const handleOnPlanChange = (oppdatertePerioder: SaksperiodeNy[]) => {
            setPerioder(oppdatertePerioder);
            args.handleOnPlanChange(oppdatertePerioder);
        };

        return (
            <UttaksplanDataProvider
                barn={args.barn}
                erFarEllerMedmor={args.erFarEllerMedmor}
                navnPåForeldre={args.navnPåForeldre}
                modus="planlegger"
                valgtStønadskonto={args.valgtStønadskonto}
                aleneOmOmsorg={args.aleneOmOmsorg || false}
                erMedmorDelAvSøknaden={args.erMedmorDelAvSøknaden || false}
                bareFarMedmorHarRett={args.bareFarMedmorHarRett || false}
                harAktivitetskravIPeriodeUtenUttak={false}
                erDeltUttak={args.erDeltUttak || false}
            >
                <UttaksplanNy {...args} saksperioder={perioder} handleOnPlanChange={handleOnPlanChange} />
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<ComponentProps<typeof UttaksplanDataProvider> & ComponentProps<typeof UttaksplanNy>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorAleneOmOmsorg: Story = {
    name: 'Mor er alene om omsorg',
    args: {
        bareFarMedmorHarRett: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-09-30'],
            termindato: '2025-10-07',
            antallBarn: 1,
        },
        aleneOmOmsorg: true,
        erFarEllerMedmor: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'innsyn',
        navnPåForeldre: {
            farMedmor: 'Annen forelder',
            mor: 'Iris',
        },
        erDeltUttak: false,
        saksperioder: [
            {
                fom: '2025-09-16',
                tom: '2025-09-29',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-09-30',
                tom: '2026-01-19',
                kontoType: 'FORELDREPENGER',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2026-02-24',
                tom: '2026-06-15',
                kontoType: 'FORELDREPENGER',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        valgtStønadskonto: {} as any,
    },
};

export const PrematurUker: Story = {
    name: 'Mor har prematuruker',
    args: {
        bareFarMedmorHarRett: false,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2025-08-13'],
            termindato: '2025-10-19',
            antallBarn: 1,
        },
        aleneOmOmsorg: false,
        erFarEllerMedmor: false,
        erDeltUttak: true,
        harAktivitetskravIPeriodeUtenUttak: false,
        modus: 'innsyn',
        navnPåForeldre: {
            farMedmor: 'Annen forelder',
            mor: 'Avansert',
        },
        saksperioder: [
            {
                fom: '2025-08-13',
                tom: '2025-10-10',
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER,
                },
                utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonBarnet,
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
            {
                fom: '2025-10-11',
                tom: '2025-11-25',
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: PeriodeResultatÅrsak.ANNET,
                },
                flerbarnsdager: false,
                forelder: Forelder.mor,
            },
        ],
        valgtStønadskonto: {} as any,
    },
};
