import {
    Uttaksperiode,
    Utsettelsesperiode,
    Periodetype,
    UtsettelseÅrsakType
} from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../../uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { harMorHarSøktUgyldigUttakFørsteSeksUker } from '../uttaksplan/uttakMorValidation';
import { Forelder } from 'common/types';
import { Søkersituasjon } from '../../../types/s\u00F8knad/S\u00F8knad';

const familiehendelsesdato = new Date();
const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

const uttakBase: Partial<Uttaksperiode> = {
    type: Periodetype.Uttak,
    gradert: false,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.MOR
};

const utsettelseBase: Partial<Utsettelsesperiode> = {
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Sykdom,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.MOR
};

const uttak = uttakBase as Uttaksperiode;
const utsettelse = utsettelseBase as Utsettelsesperiode;

describe('Validering av mors uttak første 6 uker', () => {
    it('skal godta utsettelse på grunn av sykdom', () => {
        const result = harMorHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...utsettelse, årsak: UtsettelseÅrsakType.Sykdom }],
            familiehendelsesdato,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
    it('skal godta utsettelse på grunn av institusjon', () => {
        const result = harMorHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...utsettelse, årsak: UtsettelseÅrsakType.InstitusjonSøker }],
            familiehendelsesdato,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
    it('skal IKKE godta utsettelse av andre grunner', () => {
        const result = harMorHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...utsettelse, årsak: UtsettelseÅrsakType.Arbeid }],
            familiehendelsesdato,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeTruthy();
    });
    it('skal godta ikke gradert uttak', () => {
        const result = harMorHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, gradert: false }],
            familiehendelsesdato,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
    it('skal IKKE godta gradert uttak', () => {
        const result = harMorHarSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, gradert: true }],
            familiehendelsesdato,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeTruthy();
    });
    it('Skal godta utsettelse etter 6 uker', () => {
        const utsettelseEtter6uker = {
            ...utsettelse,
            årsak: UtsettelseÅrsakType.Arbeid,
            tidsperiode: getTidsperiode(Uttaksdagen(førsteUttaksdag).leggTil(30), 5)
        };
        const result = harMorHarSøktUgyldigUttakFørsteSeksUker(
            [utsettelseEtter6uker],
            familiehendelsesdato,
            Søkersituasjon.FØDSEL
        );
        expect(result).toBeFalsy();
    });
});
