import { RecursivePartial } from '../../types/Partial';
import {
    Periode,
    Periodetype,
    UtsettelseÅrsakType,
    UtsettelseSykdomÅrsakType,
    Utsettelsesårsakstyper,
    Oppholdsperiode,
    Utsettelsesperiode
} from '../../types/uttaksplan/periodetyper';
import { UtsettelsperiodeFormdata, Utsettelsesvariant } from './UtsettelsesperiodeForm';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Forelder } from 'common/types';

const getFormdataFromPeriode = (periode: RecursivePartial<Periode>): UtsettelsperiodeFormdata => {
    if (periode.id !== undefined) {
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Tidsperiode);
        const tidsperiode = validTidsperiode
            ? { fom: validTidsperiode.fom as Date, tom: validTidsperiode.tom as Date }
            : {};
        const vedlegg = (periode.vedlegg as Attachment[]) || [];

        if (periode.type === Periodetype.Opphold) {
            return {
                tidsperiode,
                oppholdsårsak: periode.årsak,
                vedlegg,
                variant: Utsettelsesvariant.UttakAnnenForelder
            };
        } else if (periode.type === Periodetype.Utsettelse) {
            const variant = getVariantFromUtsettelseÅrsakType(periode.årsak);
            const formdata: UtsettelsperiodeFormdata = {
                tidsperiode,
                variant,
                vedlegg,
                morsAktivitetIPerioden: periode.morsAktivitetIPerioden
            };
            if (periode.årsak === UtsettelseÅrsakType.Arbeid) {
                formdata.orgnr = periode.orgnr;
                formdata.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende =
                    periode.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende;
            }
            if (variant === Utsettelsesvariant.Sykdom) {
                formdata.sykdomsårsak = periode.årsak as UtsettelseSykdomÅrsakType;
            }
            return formdata;
        }
    }
    return defaultFormData;
};

const getVariantFromUtsettelseÅrsakType = (
    årsak: Utsettelsesårsakstyper | undefined
): Utsettelsesvariant | undefined => {
    switch (årsak) {
        case UtsettelseSykdomÅrsakType.Sykdom:
        case UtsettelseSykdomÅrsakType.InstitusjonBarnet:
        case UtsettelseSykdomÅrsakType.InstitusjonSøker:
            return Utsettelsesvariant.Sykdom;
        case UtsettelseÅrsakType.Ferie:
            return Utsettelsesvariant.Ferie;
        case UtsettelseÅrsakType.Arbeid:
            return Utsettelsesvariant.Arbeid;
        default:
            return undefined;
    }
};

const getPeriodeFromFormdata = (
    formdata: UtsettelsperiodeFormdata,
    søkerErFarEllerMedmor: boolean
): RecursivePartial<Periode> => {
    if (formdata.variant === Utsettelsesvariant.UttakAnnenForelder) {
        const periode: RecursivePartial<Oppholdsperiode> = {
            type: Periodetype.Opphold,
            tidsperiode: formdata.tidsperiode,
            forelder: søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR,
            vedlegg: formdata.vedlegg,
            årsak: undefined
        };
        return periode;
    } else {
        const type = Periodetype.Utsettelse;
        const forelder = søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
        const { tidsperiode, morsAktivitetIPerioden, vedlegg } = formdata;

        const per: RecursivePartial<Utsettelsesperiode> = {
            type,
            forelder,
            tidsperiode,
            morsAktivitetIPerioden,
            vedlegg
        };

        if (formdata.variant === Utsettelsesvariant.Ferie) {
            return {
                ...per,
                årsak: UtsettelseÅrsakType.Ferie
            };
        } else if (formdata.variant === Utsettelsesvariant.Arbeid) {
            return {
                ...per,
                årsak: UtsettelseÅrsakType.Arbeid,
                orgnr: formdata.orgnr,
                skalJobbeSomFrilansEllerSelvstendigNæringsdrivende:
                    formdata.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende
            };
        } else if (formdata.variant === Utsettelsesvariant.Sykdom) {
            if (formdata.sykdomsårsak === UtsettelseSykdomÅrsakType.Sykdom) {
                per.årsak = UtsettelseSykdomÅrsakType.Sykdom;
            } else if (formdata.sykdomsårsak === UtsettelseSykdomÅrsakType.InstitusjonBarnet) {
                per.årsak = UtsettelseSykdomÅrsakType.InstitusjonBarnet;
            } else if (formdata.sykdomsårsak === UtsettelseSykdomÅrsakType.InstitusjonSøker) {
                per.årsak = UtsettelseSykdomÅrsakType.InstitusjonSøker;
            } else {
                per.årsak = UtsettelseSykdomÅrsakType.Sykdom;
            }
            return per;
        }
    }
    return {};
};

const defaultFormData: UtsettelsperiodeFormdata = {
    tidsperiode: {},
    vedlegg: []
};

export default {
    defaultFormData,
    getFormdataFromPeriode,
    getPeriodeFromFormdata
};
