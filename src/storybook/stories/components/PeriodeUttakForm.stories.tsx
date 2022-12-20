import React, { Dispatch, SetStateAction } from 'react';
import { Story } from '@storybook/react';
import PeriodeUttakForm from '../../../uttaksplan/components/uttaks-forms/periode-uttak-form/PeriodeUttakForm';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Periode, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Situasjon } from 'app/types/Situasjon';
import withIntlProvider from '../../decorators/withIntl';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import getIntlMock from 'utils-test/intl-test-helper';
import { IntlShape } from 'react-intl';

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

export default {
    title: 'components/PeriodeUttakForm',
    component: PeriodeUttakForm,
    decorators: [withIntlProvider],
};

interface Props {
    periode: Periode;
    erEndringssøknad: boolean;
    familiehendelsesdato: Date;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    handleAddPeriode: (periode: Periode, familiehendelsedato: Date) => void;
    setNyPeriodeFormIsVisible?: Dispatch<SetStateAction<boolean>>;
    erMorUfør: boolean;
    setPeriodeErGyldig: Dispatch<SetStateAction<boolean>>;
    termindato: Date | undefined;
    morHarRett: boolean;
    antallBarn: number;
    utsettelserIPlan: Utsettelsesperiode[];
    isNyPeriode: boolean;
    intl: IntlShape;
}

const intlMock = getIntlMock();

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
            fom: new Date('2000-01-01'),
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
    setPeriodeErGyldig: () => {
        return 0;
    },
    termindato: undefined,
    morHarRett: true,
    antallBarn: 1,
    utsettelserIPlan: [],
    isNyPeriode: true,
    intl: intlMock,
};

const Template: Story<Props> = (args) => {
    return <PeriodeUttakForm {...args} />;
};

export const NyPeriodeForMorEttBarnDeltUttakINorge = Template.bind({});
NyPeriodeForMorEttBarnDeltUttakINorge.args = { ...defaultInput };

export const NyPeriodeForMorEttBarnFarHarRettIEØS = Template.bind({});
NyPeriodeForMorEttBarnFarHarRettIEØS.args = {
    ...defaultInput,
    annenForelder: {
        ...defaultInput.annenForelder,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
    },
};

export const NyPeriodeForFar1BarnDeltUttakINorge = Template.bind({});
NyPeriodeForFar1BarnDeltUttakINorge.args = {
    ...defaultInput,
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
    },
};

export const NyPeriodeForFarEttBarnMorHarRettIEØS = Template.bind({});
NyPeriodeForFarEttBarnMorHarRettIEØS.args = {
    ...defaultInput,
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
    },
};

export const NyPeriodeForFarEttBarnMorHarRettIEØSSøkerFørste6Uker = Template.bind({});
NyPeriodeForFarEttBarnMorHarRettIEØSSøkerFørste6Uker.args = {
    ...defaultInput,
    periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-02') } } as Periode,
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
    },
};

export const NyPeriodeForFarToBarnMorHarRettIEØS = Template.bind({});
NyPeriodeForFarToBarnMorHarRettIEØS.args = {
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
};

export const NyPeriodeForBareFarHarRett = Template.bind({});
NyPeriodeForBareFarHarRett.args = {
    ...defaultInput,
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
        erUfør: true,
    },
    antallBarn: 1,
    erDeltUttak: false,
    stønadskontoer: stønadskonto100BFHR,
    morHarRett: false,
};

export const NyPeriodeBFHRToBarnFørWLBMorIkkeUfør = Template.bind({});
NyPeriodeBFHRToBarnFørWLBMorIkkeUfør.args = {
    ...defaultInput,
    periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-01') } } as Periode,
    familiehendelsesdato: new Date('2022-08-01'),
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
        erUfør: false,
    },
    antallBarn: 2,
    erDeltUttak: false,
    stønadskontoer: stønadskonto100BFHRToBarnFørWLB,
    morHarRett: false,
    erFlerbarnssøknad: true,
};

export const NyPeriodeBFHRToBarnEtterWLBMorIkkeUfør = Template.bind({});
NyPeriodeBFHRToBarnEtterWLBMorIkkeUfør.args = {
    ...defaultInput,
    periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-08') } } as Periode,
    familiehendelsesdato: new Date('2022-08-05'),
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
        erUfør: false,
    },
    antallBarn: 2,
    erDeltUttak: false,
    stønadskontoer: stønadskonto100BFHRToBarnEtterWLB,
    morHarRett: false,
    erFlerbarnssøknad: true,
};

export const NyPeriodeForBareFarHarRettRundtFødsel = Template.bind({});
NyPeriodeForBareFarHarRettRundtFødsel.args = {
    ...defaultInput,
    periode: { type: Periodetype.Uttak, tidsperiode: { fom: new Date('2022-08-02') } } as Periode,
    erFarEllerMedmor: true,
    annenForelder: {
        ...defaultInput.annenForelder,
        fornavn: 'Vakker',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
        erUfør: true,
    },
    antallBarn: 1,
    erDeltUttak: false,
    stønadskontoer: stønadskonto100BFHR,
    morHarRett: false,
};

export const NyPeriodeFarAleneomssorg = Template.bind({});
NyPeriodeFarAleneomssorg.args = {
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
};

export const NyPeriodeMorAleneomssorg = Template.bind({});
NyPeriodeMorAleneomssorg.args = {
    ...defaultInput,
    erDeltUttak: false,
    erAleneOmOmsorg: true,
    stønadskontoer: stønadskonto100Aleneomsorg,
    morHarRett: true,
};
