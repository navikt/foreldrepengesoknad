import { ContextDataType, useContextGetData, useContextSaveData } from './SvpDataContext';

const filtrerBort = <T>(
    tilrettelegginger: Record<string, T>,
    tilretteleggingerSomSkalFjernes: string[],
): Record<string, T> => {
    const filtrerteTilrettelegginger: Record<string, T> = {};

    Object.keys(tilrettelegginger).forEach((id) => {
        if (!tilretteleggingerSomSkalFjernes.includes(id)) {
            filtrerteTilrettelegginger[id] = tilrettelegginger[id]!;
        }
    });

    return filtrerteTilrettelegginger;
};

export const useTilretteleggingerHelper = () => {
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const tilretteleggingerVedlegg = useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const ferie = useContextGetData(ContextDataType.FERIE);

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterTilretteleggingerPerioder = useContextSaveData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const oppdaterTilretteleggingerVedlegg = useContextSaveData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const oppdaterFerie = useContextSaveData(ContextDataType.FERIE);

    const fjernTilrettelegginger = (tilretteleggingerSomSkalFjernes: string[]) => {
        if (!(tilrettelegginger && tilretteleggingerSomSkalFjernes.length > 0)) {
            return;
        }

        oppdaterTilrettelegginger(filtrerBort(tilrettelegginger, tilretteleggingerSomSkalFjernes));
        if (tilretteleggingerVedlegg) {
            oppdaterTilretteleggingerVedlegg(filtrerBort(tilretteleggingerVedlegg, tilretteleggingerSomSkalFjernes));
        }
        if (tilretteleggingerPerioder) {
            oppdaterTilretteleggingerPerioder(filtrerBort(tilretteleggingerPerioder, tilretteleggingerSomSkalFjernes));
        }

        if (ferie) {
            oppdaterFerie(filtrerBort(ferie, tilretteleggingerSomSkalFjernes));
        }
    };

    return {
        fjernTilrettelegginger,
    };
};
