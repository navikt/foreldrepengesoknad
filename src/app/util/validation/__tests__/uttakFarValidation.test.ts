import {
    Uttaksperiode,
    Periodetype,
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    StønadskontoType
} from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../../uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { harFarHarSøktUgyldigUttakFørsteSeksUker } from '../uttaksplan/uttakFarValidation';
import { Forelder } from 'common/types';
import { Søkersituasjon } from '../../../types/s\u00F8knad/S\u00F8knad';

const familiehendelsesdato = new Date();
const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

const uttakBase: Partial<Uttaksperiode> = {
    type: Periodetype.Uttak,
    gradert: false,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.FARMEDMOR
};

const overføringBase: Partial<Overføringsperiode> = {
    type: Periodetype.Overføring,
    årsak: OverføringÅrsakType.sykdomAnnenForelder,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.FARMEDMOR
};

const utsettelseBase: Partial<Utsettelsesperiode> = {
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Sykdom,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.FARMEDMOR
};

const uttak = uttakBase as Uttaksperiode;
const utsettelse = utsettelseBase as Utsettelsesperiode;
const overføring = overføringBase as Overføringsperiode;

describe('Validering av mors uttak første 6 uker', () => {
    it('skal godta overføring på grunn av insititusjonsoppholdAnnenForelder', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...overføring, årsak: OverføringÅrsakType.insititusjonsoppholdAnnenForelder }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
    it('skal godta overføring på grunn av sykdomAnnenForelder', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...overføring, årsak: OverføringÅrsakType.sykdomAnnenForelder }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
    it('skal IKKE godta overføring på grunn av annet enn sykdom annen forelder', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...overføring, årsak: OverføringÅrsakType.aleneomsorg }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeTruthy();
    });
    it('skal IKKE godta utsettelser', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...utsettelse }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeTruthy();
    });
    it('skal IKKE godta gradert uttak', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, gradert: true }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeTruthy();
    });
    it('skal ikke godta noe uttak vanlig uttak dersom det bare er ett barn', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeTruthy();
    });
    it('skal godta uttak av flerbarnsuker', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, konto: StønadskontoType.Flerbarnsdager }],
            familiehendelsesdato,
            2,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
    it('skal godta uttak av egen kvote dersom flere barn ', () => {
        const result = harFarHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, konto: StønadskontoType.Fedrekvote }],
            familiehendelsesdato,
            2,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
});
