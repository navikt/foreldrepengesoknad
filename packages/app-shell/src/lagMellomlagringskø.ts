export type MellomlagringResultat = 'OK' | 'FEILET' | 'INGEN_TILGANG' | 'UTLOGGET' | 'FORKASTET';

type LagreOperasjon<T> = {
    type: 'LAGRE';
    data: T;
    medRetry: boolean;
    ventende: Array<(resultat: MellomlagringResultat) => void>;
};

type SletteOperasjon = {
    type: 'SLETT';
    ventende: Array<() => void>;
};

type Operasjon<T> = LagreOperasjon<T> | SletteOperasjon;

export interface Mellomlagringskø<T> {
    lagre: (data: T, medRetry: boolean) => Promise<MellomlagringResultat>;
    slett: () => Promise<void>;
}

/**
 * Kjører skrivekall mot mellomlagringen ett om gangen, slik at et eldre kall aldri kan komme sist
 * og overskrive nyere data. Lagringer som venter, slås sammen til siste versjon av søknaden.
 * En sletting forkaster lagringer som ikke er startet. `lagre` og `slett` må selv fange feil.
 */
export const lagMellomlagringskø = <T>({
    lagre,
    slett,
}: {
    lagre: (data: T, medRetry: boolean) => Promise<MellomlagringResultat>;
    slett: () => Promise<void>;
}): Mellomlagringskø<T> => {
    const kø: Array<Operasjon<T>> = [];
    let kjører = false;

    const kjørKø = async () => {
        if (kjører) {
            return;
        }
        kjører = true;

        let operasjon = kø.shift();
        while (operasjon) {
            if (operasjon.type === 'LAGRE') {
                const resultat = await lagre(operasjon.data, operasjon.medRetry);
                for (const ferdig of operasjon.ventende) {
                    ferdig(resultat);
                }
            } else {
                await slett();
                for (const ferdig of operasjon.ventende) {
                    ferdig();
                }
            }
            operasjon = kø.shift();
        }

        kjører = false;
    };

    const lagreIKø = (data: T, medRetry: boolean) =>
        new Promise<MellomlagringResultat>((resolve) => {
            const sist = kø.at(-1);
            if (sist?.type === 'LAGRE') {
                sist.data = data;
                sist.medRetry ||= medRetry;
                sist.ventende.push(resolve);
            } else {
                kø.push({ type: 'LAGRE', data, medRetry, ventende: [resolve] });
            }
            void kjørKø();
        });

    const slettIKø = () =>
        new Promise<void>((resolve) => {
            const forkastede = kø.filter((operasjon) => operasjon.type === 'LAGRE');
            for (const forkastet of forkastede) {
                kø.splice(kø.indexOf(forkastet), 1);
                for (const ferdig of forkastet.ventende) {
                    ferdig('FORKASTET');
                }
            }

            const sist = kø.at(-1);
            if (sist?.type === 'SLETT') {
                sist.ventende.push(resolve);
            } else {
                kø.push({ type: 'SLETT', ventende: [resolve] });
            }
            void kjørKø();
        });

    return { lagre: lagreIKø, slett: slettIKø };
};
