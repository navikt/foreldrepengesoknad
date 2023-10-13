import dayjs from 'dayjs';
import { mapUtenlandsforhold } from './api';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

describe('api', () => {
    it('skal mappe utenlandsforhold til korrekt format når en kun har bodd i Norge', async () => {
        const utenlandsopphold = {
            harKunBoddINorge: true,
        };
        expect(mapUtenlandsforhold(utenlandsopphold)).toStrictEqual({
            iNorgeSiste12Mnd: true,
            iNorgeNeste12Mnd: true,
            tidligereOpphold: [],
            senereOpphold: [],
        });
    });

    it('skal mappe utenlandsforhold til korrekt format når en kun har fremtidige utenlandsopphold', async () => {
        const utenlandsopphold = {
            harKunBoddINorge: false,
        };
        const utenlandsoppholdPerioder = {
            perioder: [
                {
                    harFlyttetUtForMerEnn12MånderSiden: false,
                    skalBoIUtlandetMerEnEttÅrFremover: false,
                    fom: dayjs().format(ISO_DATE_FORMAT),
                    tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
                    landkode: 'IS',
                },
            ],
        };
        expect(mapUtenlandsforhold(utenlandsopphold, utenlandsoppholdPerioder)).toStrictEqual({
            iNorgeSiste12Mnd: false,
            iNorgeNeste12Mnd: true,
            senereOpphold: [
                {
                    land: 'IS',
                    tidsperiode: {
                        fom: dayjs().format(ISO_DATE_FORMAT),
                        tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
                    },
                },
            ],
            tidligereOpphold: [],
        });
    });

    it('skal mappe utenlandsforhold til korrekt format når en kun har tidligere utenlandsopphold', async () => {
        const utenlandsopphold = {
            harKunBoddINorge: false,
        };
        const utenlandsoppholdPerioder = {
            perioder: [
                {
                    harFlyttetUtForMerEnn12MånderSiden: false,
                    skalBoIUtlandetMerEnEttÅrFremover: false,
                    fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                    tom: dayjs().format(ISO_DATE_FORMAT),
                    landkode: 'IS',
                },
            ],
        };
        expect(mapUtenlandsforhold(utenlandsopphold, utenlandsoppholdPerioder)).toStrictEqual({
            iNorgeSiste12Mnd: true,
            iNorgeNeste12Mnd: false,
            senereOpphold: [],
            tidligereOpphold: [
                {
                    land: 'IS',
                    tidsperiode: {
                        fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().format(ISO_DATE_FORMAT),
                    },
                },
            ],
        });
    });

    it('skal mappe utenlandsforhold til korrekt format når periode både er historisk og fremtidig', async () => {
        const utenlandsopphold = {
            harKunBoddINorge: false,
        };
        const utenlandsoppholdPerioder = {
            perioder: [
                {
                    harFlyttetUtForMerEnn12MånderSiden: false,
                    skalBoIUtlandetMerEnEttÅrFremover: false,
                    fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                    tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
                    landkode: 'IS',
                },
            ],
        };
        expect(mapUtenlandsforhold(utenlandsopphold, utenlandsoppholdPerioder)).toStrictEqual({
            iNorgeSiste12Mnd: true,
            iNorgeNeste12Mnd: true,
            tidligereOpphold: [
                {
                    land: 'IS',
                    tidsperiode: {
                        fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                        tom: dayjs().format(ISO_DATE_FORMAT),
                    },
                },
            ],
            senereOpphold: [
                {
                    land: 'IS',
                    tidsperiode: {
                        fom: dayjs().format(ISO_DATE_FORMAT),
                        tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
                    },
                },
            ],
        });
    });
});
