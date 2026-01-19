import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useHentGyldigeKontotyper } from './useHentGyldigeKontotyper';

// We only need to mock the hook dependency; tests assert behavior via useHentGyldigeKontotyper output
vi.mock('../context/UttaksplanDataContext', () => ({
    useUttaksplanData: vi.fn(),
}));

type UttaksplanDataMock = {
    foreldreInfo: {
        søker: 'MOR' | 'FAR_ELLER_MEDMOR';
        rettighetType: 'ALENEOMSORG' | 'BARE_SØKER_RETT' | 'BEGGE_RETT';
    };
    familiehendelsedato: string;
    familiesituasjon: 'fødsel' | 'adopsjon';
    valgtStønadskonto: { kontoer: Array<{ konto: any }> };
};

const asMock = <T,>(fn: T) => fn as unknown as ReturnType<typeof vi.fn>;

const setUttaksplanData = (overrides: Partial<UttaksplanDataMock> = {}) => {
    const base: UttaksplanDataMock = {
        foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        familiehendelsedato: '2024-06-17',
        familiesituasjon: 'fødsel',
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE' },
                { konto: 'FEDREKVOTE' },
                { konto: 'FELLESPERIODE' },
                { konto: 'FORELDREPENGER' },
                { konto: 'FORELDREPENGER_FØR_FØDSEL' },
                { konto: 'AKTIVITETSFRI_KVOTE' },
            ],
        },
    };

    asMock(useUttaksplanData).mockReturnValue({ ...base, ...overrides });
};

describe('useHentGyldigeKontotyper - mors kvoter', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('skal ikke ha gyldige kontotyper for mor når far er søker og har aleneomsorg', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'FAR_ELLER_MEDMOR', rettighetType: 'ALENEOMSORG' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for mor når far er søker og bare søker har rett', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'FAR_ELLER_MEDMOR', rettighetType: 'BARE_SØKER_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for mor når adopsjon og valgte dager er før familiehendelsesdato', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
            familiesituasjon: 'adopsjon',
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-14', tom: '2024-06-18' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ha gyldige kontotyper for mor når adopsjon og valgte dager er lik eller etter familiehendelsesdato', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
            familiesituasjon: 'adopsjon',
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-17', tom: '2024-08-18' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FELLESPERIODE',
            'FORELDREPENGER',
        ]);
    });

    it('skal ikke ha gyldige perioder for mor når det er fødsel og det er valgt perioder på begge sider av familiehendelsedato', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([
            { fom: '2024-06-13', tom: '2024-06-14' },
            { fom: '2024-06-20', tom: '2024-06-21' },
        ]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal kun ha foreldrepenger før fødsel i treukersperioden før fødsel', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-05-27', tom: '2024-06-14' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual(['FORELDREPENGER_FØR_FØDSEL']);
    });

    it('skal ikke ha foreldrepenger før fødsel når familiehendelsesdato er valgt', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-05-27', tom: '2024-06-17' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha foreldrepenger når en har valgt dag før tre uker før fødsel', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-05-24', tom: '2024-06-17' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha noen gyldige kontotyper for mor når en har valgt dag mer enn 60 dager før fødsel', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-03-24', tom: '2024-06-17' }]);

        expect(result.gyldigeStønadskontoerForMor).toEqual([]);
    });
});

describe('useHentGyldigeKontotyper - fars kvoter', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('skal ikke ha gyldige kontotyper for far når mor er søker og har aleneomsorg', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'ALENEOMSORG' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for far når mor er søker og bare søker har rett', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BARE_SØKER_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for far når adopsjon og valgte dager er før familiehendelsesdato', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'FAR_ELLER_MEDMOR', rettighetType: 'BEGGE_RETT' },
            familiesituasjon: 'adopsjon',
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-14', tom: '2024-06-18' }]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ha gyldige kontotyper for mor når adopsjon og valgte dager er lik eller etter familiehendelsesdato', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'FAR_ELLER_MEDMOR', rettighetType: 'BEGGE_RETT' },
            familiesituasjon: 'adopsjon',
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-06-17', tom: '2024-08-18' }]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FELLESPERIODE',
            'FORELDREPENGER',
            'AKTIVITETSFRI_KVOTE',
        ]);
    });

    it('skal ikke ha gyldige perioder for far når det er fødsel og det er valgt perioder før to uker før familiehendelsedato', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'FAR_ELLER_MEDMOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([
            { fom: '2024-05-31', tom: '2024-06-14' },
            { fom: '2024-06-20', tom: '2024-06-21' },
        ]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ha gyldige perioder for far når det er fødsel og det er valgt perioder to uker før familiehendelsedato og periode etter', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'FAR_ELLER_MEDMOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([
            { fom: '2024-06-03', tom: '2024-06-14' },
            { fom: '2024-06-20', tom: '2024-06-21' },
        ]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FORELDREPENGER',
            'AKTIVITETSFRI_KVOTE',
        ]);
    });

    it('skal ikke ha noen gyldige kontotyper for far når en har valgt dag mer enn 60 dager før fødsel', () => {
        setUttaksplanData({
            foreldreInfo: { søker: 'MOR', rettighetType: 'BEGGE_RETT' },
        });

        const result = useHentGyldigeKontotyper([{ fom: '2024-03-24', tom: '2024-06-17' }]);

        expect(result.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });
});
