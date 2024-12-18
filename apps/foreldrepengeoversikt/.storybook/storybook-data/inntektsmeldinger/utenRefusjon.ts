import { InntektsmeldingDto } from '../../../src/api/zodSchemas';

export const utenRefusjon = [
    {
        versjon: 2,
        erAktiv: true,
        stillingsprosent: 100.0,
        inntektPrMnd: 140000.0,
        arbeidsgiverNavn: 'Laksinor',
        arbeidsgiverIdent: '123',
        journalpostId: '1017115920',
        mottattTidspunkt: '2024-10-17T00:00:00',
        startDatoPermisjon: '2024-08-01',
        bortfalteNaturalytelser: [],
        refusjonsperioder: [],
    },
] satisfies InntektsmeldingDto[];
