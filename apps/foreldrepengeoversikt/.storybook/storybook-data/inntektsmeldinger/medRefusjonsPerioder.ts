import { InntektsmeldingDto } from '../../../src/api/zodSchemas';

export const medRefusjonsPerioder = [
    {
        versjon: 2,
        erAktiv: true,
        stillingsprosent: 100,
        inntektPrMnd: 140000,
        refusjonPrMnd: 110000,
        arbeidsgiverNavn: 'Laksinor',
        arbeidsgiverIdent: '123',
        journalpostId: '1017115920',
        mottattTidspunkt: '2024-10-17T00:00:00',
        startDatoPermisjon: '2024-08-01',
        bortfalteNaturalytelser: [],
        refusjonsperioder: [
            {
                fomDato: '2024-10-12',
                refusjonsbeløpMnd: 30000,
            },
            {
                fomDato: '2024-10-13',
                refusjonsbeløpMnd: 0,
            },
            {
                fomDato: '2024-10-14',
                refusjonsbeløpMnd: 140000,
            },
        ],
    },
] satisfies InntektsmeldingDto[];
