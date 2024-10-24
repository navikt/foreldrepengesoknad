import { ContextDataType, useContextGetData, useContextSaveData } from './SvpDataContext';

const filtrerBort = <T>(
    tilrettelegginger: Record<string, T>,
    tilretteleggingerSomSkalFjernes: string[],
): Record<string, T> =>
    Object.keys(tilrettelegginger).reduce(
        (acc, id) =>
            tilretteleggingerSomSkalFjernes.includes(id)
                ? acc
                : {
                      ...acc,
                      [id]: tilrettelegginger[id],
                  },
        {},
    );

export const useTilretteleggingerHelper = () => {
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const tilretteleggingerVedlegg = useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterTilretteleggingerPerioder = useContextSaveData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const oppdaterTilretteleggingerVedlegg = useContextSaveData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);

    const fjernTilrettelegginger = (tilretteleggingerSomSkalFjernes: string[]) => {
        if (tilrettelegginger && tilretteleggingerSomSkalFjernes.length > 0) {
            const test = filtrerBort(tilrettelegginger, tilretteleggingerSomSkalFjernes);
            oppdaterTilrettelegginger(test);
            if (tilretteleggingerVedlegg) {
                oppdaterTilretteleggingerVedlegg(
                    filtrerBort(tilretteleggingerVedlegg, tilretteleggingerSomSkalFjernes),
                );
            }
            if (tilretteleggingerPerioder) {
                oppdaterTilretteleggingerPerioder(
                    filtrerBort(tilretteleggingerPerioder, tilretteleggingerSomSkalFjernes),
                );
            }
        }
    };

    return {
        fjernTilrettelegginger,
    };
};
