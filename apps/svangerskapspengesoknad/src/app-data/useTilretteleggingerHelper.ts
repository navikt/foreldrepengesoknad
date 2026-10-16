import { ContextDataType, useContextGetData, useContextSaveData } from './SvpDataContext';

const filtrerPåId = <T>(data: Record<string, T>, skalBeholdes: (id: string) => boolean): Record<string, T> =>
    Object.fromEntries(Object.entries(data).filter(([id]) => skalBeholdes(id)));

export const useTilretteleggingerHelper = () => {
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const tilretteleggingerVedlegg = useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const ferie = useContextGetData(ContextDataType.FERIE);

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterTilretteleggingerPerioder = useContextSaveData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const oppdaterTilretteleggingerVedlegg = useContextSaveData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const oppdaterFerie = useContextSaveData(ContextDataType.FERIE);

    const filtrerAlle = (skalBeholdes: (id: string) => boolean) => {
        if (tilrettelegginger) {
            oppdaterTilrettelegginger(filtrerPåId(tilrettelegginger, skalBeholdes));
        }
        if (tilretteleggingerVedlegg) {
            oppdaterTilretteleggingerVedlegg(filtrerPåId(tilretteleggingerVedlegg, skalBeholdes));
        }
        if (tilretteleggingerPerioder) {
            oppdaterTilretteleggingerPerioder(filtrerPåId(tilretteleggingerPerioder, skalBeholdes));
        }
        if (ferie) {
            oppdaterFerie(filtrerPåId(ferie, skalBeholdes));
        }
    };

    const fjernTilrettelegginger = (tilretteleggingerSomSkalFjernes: string[]) => {
        if (tilretteleggingerSomSkalFjernes.length === 0) {
            return;
        }
        filtrerAlle((id) => !tilretteleggingerSomSkalFjernes.includes(id));
    };

    const beholdKunTilrettelegginger = (tilretteleggingerSomSkalBeholdes: string[]) => {
        filtrerAlle((id) => tilretteleggingerSomSkalBeholdes.includes(id));
    };

    return {
        fjernTilrettelegginger,
        beholdKunTilrettelegginger,
    };
};
