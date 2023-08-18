import { Søknadsgrunnlag } from 'app/types/Søknad';
import {
    Arbeidsforholdstype,
    UferdigTilrettelegging,
    Tilrettelegging,
    Tilretteleggingstype,
    HelTilrettelegging,
    DelvisTilrettelegging,
    IngenTilrettelegging,
} from 'app/types/Tilrettelegging';
import {
    ArbeidsforholdDTO,
    HelTilretteleggingDTO,
    IngenTilretteleggingDTO,
    DelvisTilretteleggingDTO,
    TilretteleggingDTO,
} from '../types/TilretteleggingDTO';

export const mapGrunnlagTilTilrettelegging = (søknadsgrunnlag: Søknadsgrunnlag[]) => {
    return søknadsgrunnlag.map(({ id, type }) => {
        const arbeidsgiversId =
            type === Arbeidsforholdstype.VIRKSOMHET || type === Arbeidsforholdstype.PRIVAT ? { id } : {};

        return {
            id,
            vedlegg: [],
            arbeidsforhold: {
                ...arbeidsgiversId,
                type,
            },
        };
    });
};

export const mergeSøknadsgrunnlagIntoTilrettelegging = (
    søknadsgrunnlag: Søknadsgrunnlag[],
    existingTilrettelegging: UferdigTilrettelegging[],
) => {
    const nyeTilrettelegginger = mapGrunnlagTilTilrettelegging(
        søknadsgrunnlag.filter(
            (grunnlag: Søknadsgrunnlag) =>
                !existingTilrettelegging.find((t: UferdigTilrettelegging) => t.id === grunnlag.id),
        ),
    );

    const selectedTilrettelegging = existingTilrettelegging.filter((t) =>
        søknadsgrunnlag.map((s) => s.id).includes(t.id),
    );

    return [...selectedTilrettelegging, ...nyeTilrettelegginger];
};

const mapHelTilrettelegging = (
    tilrettelegging: Tilrettelegging,
    arbeidsforhold: ArbeidsforholdDTO,
    helTilrettelegging: HelTilrettelegging,
): HelTilretteleggingDTO | undefined => {
    if (!tilrettelegging.helTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.HEL,
        behovForTilretteleggingFom: new Date(tilrettelegging.behovForTilretteleggingFom),
        arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        tilrettelagtArbeidFom: new Date(helTilrettelegging.tilrettelagtArbeidFom),
    };
};

const mapDelvisTilrettelegging = (
    tilrettelegging: Tilrettelegging,
    arbeidsforhold: ArbeidsforholdDTO,
    delvisTilrettelegging: DelvisTilrettelegging,
): DelvisTilretteleggingDTO | undefined => {
    if (!tilrettelegging.delvisTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.DELVIS,
        behovForTilretteleggingFom: new Date(tilrettelegging.behovForTilretteleggingFom),
        arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        tilrettelagtArbeidFom: new Date(delvisTilrettelegging.tilrettelagtArbeidFom),
        stillingsprosent: delvisTilrettelegging.stillingsprosent,
    };
};

const mapIngenTilrettelegging = (
    tilrettelegging: Tilrettelegging,
    arbeidsforhold: ArbeidsforholdDTO,
    ingenTilrettelegging: IngenTilrettelegging,
): IngenTilretteleggingDTO | undefined => {
    if (!tilrettelegging.ingenTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.INGEN,
        behovForTilretteleggingFom: new Date(tilrettelegging.behovForTilretteleggingFom),
        arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        slutteArbeidFom: new Date(ingenTilrettelegging.slutteArbeidFom),
    };
};

const mapArbeidsforholdForTilrettelegging = (tilrettelegging: UferdigTilrettelegging): ArbeidsforholdDTO => {
    switch (tilrettelegging.arbeidsforhold.type) {
        case Arbeidsforholdstype.FRILANSER:
            return {
                type: Arbeidsforholdstype.FRILANSER,
                risikoFaktorer: tilrettelegging.risikoFaktorer,
                tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak,
            };
        case Arbeidsforholdstype.SELVSTENDIG:
            return {
                type: Arbeidsforholdstype.SELVSTENDIG,
                risikoFaktorer: tilrettelegging.risikoFaktorer,
                tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak,
            };
        case Arbeidsforholdstype.PRIVAT:
            return {
                type: Arbeidsforholdstype.PRIVAT,
                id: tilrettelegging.arbeidsforhold.id || tilrettelegging.id,
            };
        case Arbeidsforholdstype.VIRKSOMHET:
            return {
                type: Arbeidsforholdstype.VIRKSOMHET,
                id: tilrettelegging.arbeidsforhold.id || tilrettelegging.id,
            };
    }
};

export const mapTilretteleggingerTilDTO = (tilrettelegging: UferdigTilrettelegging[]): TilretteleggingDTO[] => {
    const dto: TilretteleggingDTO[] = [];
    tilrettelegging.forEach((t) => {
        const arbeidsforhold = mapArbeidsforholdForTilrettelegging(t);
        if (t.helTilrettelegging && t.helTilrettelegging.length > 0) {
            t.helTilrettelegging.forEach((helTil: HelTilrettelegging) => {
                const helTilrettelegging = mapHelTilrettelegging(t, arbeidsforhold, helTil);
                if (helTilrettelegging) {
                    dto.push(helTilrettelegging);
                }
            });
        }
        if (t.delvisTilrettelegging && t.delvisTilrettelegging.length > 0) {
            t.delvisTilrettelegging.forEach((delTil: DelvisTilrettelegging) => {
                const delvisTilrettelegging = mapDelvisTilrettelegging(t, arbeidsforhold, delTil);
                if (delvisTilrettelegging) {
                    dto.push(delvisTilrettelegging);
                }
            });
        }
        if (t.ingenTilrettelegging && t.ingenTilrettelegging.length > 0) {
            t.ingenTilrettelegging.forEach((ingenTil: IngenTilrettelegging) => {
                const ingenTilrettelegging = mapIngenTilrettelegging(t, arbeidsforhold, ingenTil);
                if (ingenTilrettelegging) {
                    dto.push(ingenTilrettelegging);
                }
            });
        }
    });
    return dto;
};
