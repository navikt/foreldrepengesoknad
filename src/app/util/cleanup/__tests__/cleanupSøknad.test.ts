import { Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import {
    removeDuplicateAttachments,
    removePeriodetypeHullFromUttaksplan,
    cleanUpAttachments,
    getUttaksplanMedFriUtsettelsesperiode,
    getPeriodeVedTidspunkt,
} from '../cleanupSøknad';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';

const uttaksplan: Periode[] = [
    {
        id: 'asd',
        type: Periodetype.Utsettelse,
    },
    {
        id: 'asd',
        type: Periodetype.Uttak,
    },
    {
        id: 'asd',
        type: Periodetype.Opphold,
    },
    {
        id: 'asd',
        type: Periodetype.Overføring,
    },
] as Periode[];

const uttaksplanMedHull: Periode[] = [
    ...uttaksplan,
    {
        id: 'asd',
        type: Periodetype.Hull,
    },
] as Periode[];

const uttaksplanMedLikeVedlegg: Periode[] = [
    ...uttaksplan,
    {
        id: 'asd',
        type: Periodetype.Utsettelse,
        vedlegg: [
            {
                id: 'v123',
                file: new File([''], 'mock.pdf'),
                filesize: 1024,
                filename: 'mockFile.pdf',
                pending: false,
                uploaded: true,
                url: undefined,
                skjemanummer: Skjemanummer.ANNET,
                type: AttachmentType.OVERFØRING_KVOTE,
            },
        ],
    },
    {
        id: 'asd',
        type: Periodetype.Utsettelse,
        vedlegg: [
            {
                id: 'v123',
                file: new File([''], 'mock.pdf'),
                filesize: 1024,
                filename: 'mockFile.pdf',
                pending: false,
                uploaded: true,
                url: undefined,
                skjemanummer: Skjemanummer.ANNET,
                type: AttachmentType.OVERFØRING_KVOTE,
            },
            {
                id: 'v321',
                file: new File([''], 'mock.pdf'),
                filesize: 1024,
                filename: 'mockFile.pdf',
                pending: false,
                uploaded: true,
                url: undefined,
                skjemanummer: Skjemanummer.ANNET,
                type: AttachmentType.OVERFØRING_KVOTE,
            },
        ],
    },
] as Periode[];

describe('cleanupSøknad', () => {
    it('cleans uttaksplan', () => {
        const cleandUttaksplan = removePeriodetypeHullFromUttaksplan(uttaksplanMedHull);
        expect(JSON.stringify(cleandUttaksplan)).toEqual(JSON.stringify(uttaksplan));
    });

    it('Removes attachments with duplicate ids from perioder', () => {
        removeDuplicateAttachments(uttaksplanMedLikeVedlegg);
        expect(uttaksplanMedLikeVedlegg[uttaksplanMedLikeVedlegg.length - 1].vedlegg!.length).toEqual(1);
    });

    it('cleanupAttachments function handles attachment array with undefiend elements', () => {
        const mockAttachment = {
            id: 'v123',
            file: new File([''], 'mock.pdf'),
            filesize: 1024,
            filename: 'mockFile.pdf',
            pending: false,
            uploaded: true,
            url: 'url',
            skjemanummer: Skjemanummer.ANNET,
        };

        expect(cleanUpAttachments({ vedlegg: [undefined] }).length).toEqual(0);
        expect(
            cleanUpAttachments({
                vedlegg: [mockAttachment, undefined],
            })
        ).toEqual([mockAttachment]);
    });
});

//Periode 1:
const fraDato_1 = new Date('2022-01-25');
const tilDato_1 = new Date('2022-01-28');
const periode_1: Partial<Periode> = {
    id: '1',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_1,
        tom: tilDato_1,
    },
};

//Periode 2:
const fraDato_2 = new Date('2022-01-31');
const tilDato_2 = new Date('2022-02-07');
const periode_2: Partial<Periode> = {
    id: '2',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_2,
        tom: tilDato_2,
    },
};

//Periode 3: (1 dag)
const fraDato_3 = new Date('2022-02-11');
const tilDato_3 = new Date('2022-02-11');
const periode_3: Partial<Periode> = {
    id: '3',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_3,
        tom: tilDato_3,
    },
};

//Periode 4:
const fraDato_4 = new Date('2022-02-14');
const tilDato_4 = new Date('2022-02-24');
const periode_4: Partial<Periode> = {
    id: '4',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_4,
        tom: tilDato_4,
    },
};

//Periode 5: 28.02, 1 dag, ikke skuddår
const fraDato_5 = new Date('2022-02-28');
const tilDato_5 = new Date('2022-02-28');
const periode_5: Partial<Periode> = {
    id: '5',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_5,
        tom: tilDato_5,
    },
} as Periode;

//Periode 6: 1.03, ikke skuddår
const fraDato_6 = new Date('2022-03-01');
const tilDato_6 = new Date('2022-03-07');
const periode_6: Partial<Periode> = {
    id: '6',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_6,
        tom: tilDato_6,
    },
};

//Periode 7: 1.03 i et skuddår
const fraDato_7 = new Date('2024-03-01');
const tilDato_7 = new Date('2024-03-07');
const periode_7: Partial<Periode> = {
    id: '7',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_7,
        tom: tilDato_7,
    },
};

const uttaksplanMedAllePerioder: Periode[] = [
    periode_1,
    periode_2,
    periode_3,
    periode_4,
    periode_5,
    periode_6,
    periode_7,
] as Periode[];

const getUttaksplanUtenPeriode = (removePeriode: Periode): Periode[] => {
    return uttaksplanMedAllePerioder.filter((periode) => periode !== removePeriode);
};

const uttaksplanUtenPeriode_1 = getUttaksplanUtenPeriode(periode_1 as Periode);
const uttaksplanUtenPeriode_2 = getUttaksplanUtenPeriode(periode_2 as Periode);
const uttaksplanUtenPeriode_3 = getUttaksplanUtenPeriode(periode_3 as Periode);
const uttaksplanUtenPeriode_5 = getUttaksplanUtenPeriode(periode_5 as Periode);

describe('getUttaksplanMedFriUtsettelsesperiode', () => {
    it('inserts correct fri utsettelsesperiode that ends on a Friday', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_1, fraDato_1);
        const friUtsettelsePeriode = nyUttaksplan[0];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_1);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(tilDato_1);
    });
    it('inserts correct fri utsettelsesperiode and fills out hole before next periode', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_2, fraDato_2);
        const friUtsettelsePeriode = nyUttaksplan[1];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_2);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(new Date('2022-02-10'));
    });
    it('inserts correct fri utsettelsesperiode that lasts 1 day', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_3, fraDato_3);
        const friUtsettelsePeriode = nyUttaksplan[2];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_3);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(tilDato_3);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in a non-leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_5, fraDato_5);
        const friUtsettelsePeriode = nyUttaksplan[4];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_5);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(tilDato_5);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(
            [...uttaksplanMedAllePerioder],
            new Date('2024-02-27')
        );
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[6];
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(new Date('2024-02-27'));
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(new Date('2024-02-29'));
    });

    it('inserts correct fri utsettelsesperiode that ends at endringstidspunkt if no periods after', () => {
        const endringstidspunkt = new Date('2024-03-08');
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode([...uttaksplanMedAllePerioder], endringstidspunkt);
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[7];
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(endringstidspunkt);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(endringstidspunkt);
    });
});

describe('getPeriodeVedTidspunkt', () => {
    it('returns correct periode that starts at tidspunkt', () => {
        const periode = getPeriodeVedTidspunkt(uttaksplanMedAllePerioder, fraDato_2);
        expect(periode).toEqual(periode_2);
    });

    it('returns undefined when no periode starts at tidspunkt', () => {
        const periodeNotFound = getPeriodeVedTidspunkt(uttaksplanMedAllePerioder, tilDato_2);
        expect(periodeNotFound).toBe(undefined);
    });
});
