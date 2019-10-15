import {
    Uttaksperiode,
    Periodetype,
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    StønadskontoType,
    MorsAktivitet
} from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../../uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { harFarMedmorSøktUgyldigUttakFørsteSeksUker } from '../uttaksplan/uttakFarValidation';
import { Forelder, Tidsperiode } from 'common/types';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { OmAnnenForelder } from 'app/selectors/types';

const familiehendelsesdato = new Date();
const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdag).leggTil(30);
const tidsperiodeEtterSeksUker: Tidsperiode = getTidsperiode(førsteUttaksdagEtterSeksUker, 5);

const uttakBase: Partial<Uttaksperiode> = {
    type: Periodetype.Uttak,
    konto: StønadskontoType.Fellesperiode,
    gradert: false,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.farMedmor
};

const overføringBase: Partial<Overføringsperiode> = {
    type: Periodetype.Overføring,
    årsak: OverføringÅrsakType.sykdomAnnenForelder,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.farMedmor
};

const utsettelseBase: Partial<Utsettelsesperiode> = {
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Sykdom,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.farMedmor
};

const uttak = uttakBase as Uttaksperiode;
const utsettelse = utsettelseBase as Utsettelsesperiode;
const overføring = overføringBase as Overføringsperiode;
const omAnnenForelder: Partial<OmAnnenForelder> = {
    kanIkkeOppgis: false
};

describe('Validering av fars uttak første 6 uker', () => {
    it('skal godta overføring på grunn av insititusjonsoppholdAnnenForelder', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...overføring, årsak: OverføringÅrsakType.insititusjonsoppholdAnnenForelder }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
    it('skal godta overføring på grunn av sykdomAnnenForelder', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...overføring, årsak: OverføringÅrsakType.sykdomAnnenForelder }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
    it('skal IKKE godta overføring på grunn av annet enn sykdom annen forelder', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...overføring, årsak: OverføringÅrsakType.aleneomsorg }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeTruthy();
    });
    it('skal IKKE godta utsettelser', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...utsettelse }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeTruthy();
    });
    it('skal IKKE godta gradert uttak', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, gradert: true }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeTruthy();
    });
    it('skal ikke godta noe uttak vanlig uttak dersom det bare er ett barn', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeTruthy();
    });
    it('skal godta uttak av flerbarnsuker', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, ønskerFlerbarnsdager: true }],
            familiehendelsesdato,
            2,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
    it('skal godta uttak av egen kvote dersom flere barn ', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, ønskerFlerbarnsdager: true }],
            familiehendelsesdato,
            2,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
    it('skal godta uttak dersom mors aktivitet er innlagt ', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, konto: StønadskontoType.Fellesperiode, morsAktivitetIPerioden: MorsAktivitet.Innlagt }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
    it('skal godta uttak dersom mors aktivitet er sykdom ', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [
                {
                    ...uttak,
                    konto: StønadskontoType.Fellesperiode,
                    morsAktivitetIPerioden: MorsAktivitet.TrengerHjelp
                }
            ],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
    it('skal IKKE godta uttak dersom mors aktivitet er annet enn sykdom eller innlagt ', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [{ ...uttak, konto: StønadskontoType.Fellesperiode, morsAktivitetIPerioden: MorsAktivitet.Arbeid }],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeTruthy();
    });
    it('skal godta uttak dersom mors aktivitet er annet enn sykdom eller innlagt ETTER seks uker ', () => {
        const result = harFarMedmorSøktUgyldigUttakFørsteSeksUker(
            [
                {
                    ...uttak,
                    tidsperiode: tidsperiodeEtterSeksUker,
                    konto: StønadskontoType.Fellesperiode,
                    morsAktivitetIPerioden: MorsAktivitet.Arbeid
                }
            ],
            familiehendelsesdato,
            1,
            Søkersituasjon.FØDSEL,
            omAnnenForelder as OmAnnenForelder,
            false
        );
        expect(result).toBeFalsy();
    });
});
