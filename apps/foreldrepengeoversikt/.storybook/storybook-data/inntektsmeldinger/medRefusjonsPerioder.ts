import { FpOversiktInntektsmeldingDto_fpoversikt } from '@navikt/fp-types';

export const medRefusjonsPerioder = [
    {
        versjon: 2,
        erAktiv: true,
        stillingsprosent: 100,
        inntektPrMnd: 140_000,
        refusjonPrMnd: 110_000,
        arbeidsgiverNavn: 'Laksinor',
        arbeidsgiverIdent: '123',
        journalpostId: '1017115920',
        mottattTidspunkt: '2024-10-17T00:00:00',
        startDatoPermisjon: '2024-08-01',
        bortfalteNaturalytelser: [],
        refusjonsperioder: [
            {
                fomDato: '2024-10-12',
                refusjonsbeløpMnd: 30_000,
            },
            {
                fomDato: '2024-10-13',
                refusjonsbeløpMnd: 0,
            },
            {
                fomDato: '2024-10-14',
                refusjonsbeløpMnd: 140_000,
            },
        ],
    },
] satisfies FpOversiktInntektsmeldingDto_fpoversikt[];
