import { InntektsmeldingDto } from '../../../src/api/zodSchemas';

export const enBortfaltNaturalytelse = [
    {
        versjon: 2,
        erAktiv: true,
        stillingsprosent: 100,
        inntektPrMnd: 40000.78,
        refusjonPrMnd: 4000,
        arbeidsgiverNavn: 'Laksinor',
        arbeidsgiverIdent: '123',
        journalpostId: '1017115920',
        mottattTidspunkt: '2024-10-17T00:00:00',
        startDatoPermisjon: '2024-08-01',
        bortfalteNaturalytelser: [
            {
                fomDato: '2024-09-10',
                tomDato: '9999-12-31',
                beløpPerMnd: 998,
                type: 'FRI_TRANSPORT',
            },
        ],
        refusjonsperioder: [],
    },
] satisfies InntektsmeldingDto[];
