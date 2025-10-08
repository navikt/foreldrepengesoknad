import { Meta, StoryObj } from '@storybook/react-vite';
import { IntlShape } from 'react-intl';

import { Periode, Periodetype, Situasjon } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';

import PeriodeUttakForm from './PeriodeUttakForm';

const stønadskonto100MorFar = [
    { konto: StønadskontoType.Mødrekvote, dager: 75 },
    { konto: StønadskontoType.Fedrekvote, dager: 75 },
    { konto: StønadskontoType.Fellesperiode, dager: 80 },
    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 },
];

const stønadskonto100BFHR = [
    { konto: StønadskontoType.Foreldrepenger, dager: 75 },
    { konto: StønadskontoType.AktivitetsfriKvote, dager: 75 },
];

const stønadskonto100BFHRToBarnFørWLB = [{ konto: StønadskontoType.Foreldrepenger, dager: 285 }];

const stønadskonto100BFHRToBarnEtterWLB = [
    { konto: StønadskontoType.Foreldrepenger, dager: 200 },
    { konto: StønadskontoType.AktivitetsfriKvote, dager: 85 },
];

const stønadskonto100Aleneomsorg = [{ konto: StønadskontoType.Foreldrepenger, dager: 150 }];

const meta = {
    title: 'components/PeriodeUttakForm',
    component: PeriodeUttakForm,
} satisfies Meta<typeof PeriodeUttakForm>;
export default meta;

type Story = StoryObj<typeof meta>;

const defaultInput = {
    periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-09-21') } } as Periode,
    erEndringssøknad: false,
    familiehendelsesdato: new Date('2022-08-02'),
    stønadskontoer: stønadskonto100MorFar,
    navnPåForeldre: { mor: 'Vakker', farMedmor: 'Pen' },
    annenForelder: {
        kanIkkeOppgis: false,
        fornavn: 'Pen',
        etternavn: 'Umulig',
        fnr: '123132123132',
        harRettPåForeldrepengerINorge: true,
        erInformertOmSøknaden: true,
    },
    arbeidsforhold: [
        {
            arbeidsgiverNavn: 'Fabrikk AS',
            arbeidsgiverId: '12313',
            arbeidsgiverIdType: '123',
            from: '2000-01-01',
            stillingsprosent: 100,
        },
    ],
    erFarEllerMedmor: false,
    erFlerbarnssøknad: false,
    erAleneOmOmsorg: false,
    erDeltUttak: true,
    situasjon: 'fødsel' as Situasjon,
    handleUpdatePeriode: () => {
        return 0;
    },
    handleAddPeriode: () => {
        return 0;
    },
    setNyPeriodeFormIsVisible: () => {
        return 0;
    },
    erMorUfør: false,
    setPerioderErGyldige: () => {
        return 0;
    },
    termindato: undefined,
    morHarRett: true,
    antallBarn: 1,
    utsettelserIPlan: [],
    isNyPeriode: true,
    isOpen: true,
    intl: {} as IntlShape,
};

export const NyPeriodeForMorEttBarnDeltUttakINorge: Story = {
    args: defaultInput,
};

export const NyPeriodeForMorEttBarnFarHarRettIEØS: Story = {
    args: {
        ...defaultInput,
        annenForelder: {
            ...defaultInput.annenForelder,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
        },
    },
};

export const NyPeriodeForFar1BarnDeltUttakINorge: Story = {
    args: {
        ...defaultInput,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
        },
    },
};

export const NyPeriodeFørFødselForFar1BarnDeltUttakINorge: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-01') } } as Periode,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
        },
    },
};

export const NyPeriodeForFar2BarnDeltUttakINorge: Story = {
    args: {
        ...defaultInput,
        erFarEllerMedmor: true,
        erFlerbarnssøknad: true,
        antallBarn: 2,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
        },
    },
};

export const NyPeriodeRundtFødselForFar2BarnDeltUttakINorge: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-02') } } as Periode,
        erFarEllerMedmor: true,
        antallBarn: 2,
        erFlerbarnssøknad: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
        },
    },
};

export const NyPeriodeForFarEttBarnMorHarRettIEØS: Story = {
    args: {
        ...defaultInput,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
        },
    },
};

export const NyPeriodeForFarEttBarnMorHarRettIEØSSøkerFørste6Uker: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-02') } } as Periode,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
        },
    },
};

export const NyPeriodeForFarToBarnMorHarRettIEØS: Story = {
    args: {
        ...defaultInput,
        erFlerbarnssøknad: true,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
        },
        antallBarn: 2,
    },
};

export const NyPeriodeForBareFarHarRett: Story = {
    args: {
        ...defaultInput,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            erMorUfør: true,
        },
        antallBarn: 1,
        erDeltUttak: false,
        stønadskontoer: stønadskonto100BFHR,
        morHarRett: false,
    },
};

export const NyPeriodeBFHRToBarnFørWLBMorIkkeUfør: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-01') } } as Periode,
        familiehendelsesdato: new Date('2022-08-01'),
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            erMorUfør: false,
        },
        antallBarn: 2,
        erDeltUttak: false,
        stønadskontoer: stønadskonto100BFHRToBarnFørWLB,
        morHarRett: false,
        erFlerbarnssøknad: true,
    },
};

export const NyPeriodeBFHRToBarnEtterWLBMorIkkeUfør: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-08') } } as Periode,
        familiehendelsesdato: new Date('2022-08-05'),
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            erMorUfør: false,
        },
        antallBarn: 2,
        erDeltUttak: false,
        stønadskontoer: stønadskonto100BFHRToBarnEtterWLB,
        morHarRett: false,
        erFlerbarnssøknad: true,
    },
};

export const NyPeriodeForBareFarHarRettRundtFødsel: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-02') } } as Periode,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            erMorUfør: true,
        },
        antallBarn: 1,
        erDeltUttak: false,
        stønadskontoer: stønadskonto100BFHR,
        morHarRett: false,
    },
};

export const NyPeriodeFarAleneomssorg: Story = {
    args: {
        ...defaultInput,
        periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-02') } } as Periode,
        erFarEllerMedmor: true,
        annenForelder: {
            ...defaultInput.annenForelder,
            fornavn: 'Vakker',
        },
        antallBarn: 1,
        erDeltUttak: false,
        erAleneOmOmsorg: true,
        stønadskontoer: stønadskonto100Aleneomsorg,
        morHarRett: false,
    },
};

export const NyPeriodeMorAleneomssorg: Story = {
    args: {
        ...defaultInput,
        erDeltUttak: false,
        erAleneOmOmsorg: true,
        stønadskontoer: stønadskonto100Aleneomsorg,
        morHarRett: true,
    },
};
