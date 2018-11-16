import fns from './../visibility';
import { AnnenInntektType } from '../../../types/søknad/AnnenInntekt';

describe('AnnenInntektModal visibility', () => {
    describe('landVisible', () => {
        it('should be visible only when type is JOBB_I_UTLANDET', () => {
            Object.values(AnnenInntektType).forEach((type: AnnenInntektType) => {
                if (type === AnnenInntektType.JOBB_I_UTLANDET) {
                    expect(fns.land({ type })).toBe(true);
                } else {
                    expect(fns.land({ type })).toBe(false);
                }
            });
        });
    });
    describe('arbeidsgiverNavnVisible', () => {
        it('should be visible only when type is JOBB_I_UTLANDET', () => {
            Object.values(AnnenInntektType).forEach((type: AnnenInntektType) => {
                if (type === AnnenInntektType.JOBB_I_UTLANDET) {
                    expect(fns.arbeidsgiverNavn({ type })).toBe(true);
                } else {
                    expect(fns.arbeidsgiverNavn({ type })).toBe(false);
                }
            });
        });
    });
    describe('vedleggVisible', () => {
        it('should be visible only when type is not LØNN_VED_VIDEREUTDANNING and not JOBB_I_UTLANDET', () => {
            Object.values(AnnenInntektType).forEach((type: AnnenInntektType) => {
                if (type !== AnnenInntektType.LØNN_VED_VIDEREUTDANNING && type !== AnnenInntektType.JOBB_I_UTLANDET) {
                    expect(fns.vedlegg({ type })).toBe(true);
                } else {
                    expect(fns.vedlegg({ type })).toBe(false);
                }
            });
        });
    });
});
