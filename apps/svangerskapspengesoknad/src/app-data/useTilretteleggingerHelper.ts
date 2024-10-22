import { useNavigate } from 'react-router-dom';

import { ContextDataType, useContextGetData, useContextSaveData } from './SvpDataContext';
import SøknadRoutes from './routes';

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
    const navigate = useNavigate();

    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const tilretteleggingerVedlegg = useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterTilretteleggingerPerioder = useContextSaveData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const oppdaterTilretteleggingerVedlegg = useContextSaveData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const fjernTilrettelegginger = (tilretteleggingerSomSkalFjernes: string[]) => {
        if (tilrettelegginger && tilretteleggingerSomSkalFjernes.length > 0) {
            oppdaterTilrettelegginger(filtrerBort(tilrettelegginger, tilretteleggingerSomSkalFjernes));
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

    const fjernValgtTilretteleggingOgNavigerTilbakeTil = (steg: SøknadRoutes) => {
        oppdaterValgtTilretteleggingId(undefined);
        oppdaterPath(steg);
        navigate(steg);
    };

    return {
        fjernTilrettelegginger,
        fjernValgtTilretteleggingOgNavigerTilbakeTil,
    };
};
