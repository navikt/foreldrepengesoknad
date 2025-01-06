import { InntektsmeldingDto } from '../../../src/api/zodSchemas';

export const flereBortfalteNaturalytelser = [
    {
        versjon: 2,
        erAktiv: true,
        stillingsprosent: 80.0,
        inntektPrMnd: 40000.0,
        refusjonPrMnd: 4000.0,
        arbeidsgiverNavn: 'Laksinor',
        arbeidsgiverIdent: '123',
        journalpostId: '1017115920',
        mottattTidspunkt: '2024-10-17T00:00:00',
        startDatoPermisjon: '2024-08-01',
        bortfalteNaturalytelser: [
            {
                fomDato: '2024-09-10',
                tomDato: '2024-10-11',
                beløpPerMnd: 998.0,
                type: 'FRI_TRANSPORT',
            },
            {
                fomDato: '2024-12-12',
                tomDato: '2024-12-24',
                beløpPerMnd: 998.0,
                type: 'FRI_TRANSPORT',
            },
            {
                fomDato: '2025-01-01',
                tomDato: '9999-12-31',
                beløpPerMnd: 200.0,
                type: 'ELEKTRISK_KOMMUNIKASJON',
            },
        ],
        refusjonsperioder: [],
    },
] satisfies InntektsmeldingDto[];
