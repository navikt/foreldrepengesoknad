import { KONTEKSTUELLE_ALERTS } from './skjemaAlerts';

const aktivitetskravDokumentasjonAlert = KONTEKSTUELLE_ALERTS.find(
    (regel) => regel.id === 'kontekstuelleAlerts.aktivitetskravDokumentasjon',
)!;

const kontekst = {
    valgtePerioder: [],
    familiehendelsedato: '2024-01-01',
    morsAktivitet: 'ARBEID' as const,
    erEndringssøknad: false,
    søker: 'FAR_MEDMOR' as const,
};

describe('aktivitetskravDokumentasjon-alert', () => {
    it('skal vises i far/medmors førstegangssøknad når mors aktivitet krever dokumentasjon', () => {
        expect(aktivitetskravDokumentasjonAlert.skalVises(kontekst)).toBe(true);
    });

    it('skal ikke vises i mors søknad, siden mor ikke dokumenterer sin egen aktivitet der', () => {
        expect(aktivitetskravDokumentasjonAlert.skalVises({ ...kontekst, søker: 'MOR' })).toBe(false);
    });

    it('skal ikke vises i endringssøknad', () => {
        expect(aktivitetskravDokumentasjonAlert.skalVises({ ...kontekst, erEndringssøknad: true })).toBe(false);
    });
});
