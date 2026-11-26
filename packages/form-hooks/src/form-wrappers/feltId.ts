import { useFormContext } from 'react-hook-form';

// Prefiks per skjema hindrer like id-er når to skjema med samme feltnavn vises samtidig.
const skjemaPrefiks = new WeakMap<object, string>();
let nesteSkjemaNr = 0;

// Tapsfri koding: `_` kodes også, så `barn.0.namn` og `barn_0_namn` gir ulike id-er.
const kodFeltnavn = (name: string): string =>
    name.replaceAll(/[^A-Za-z0-9-]/gu, (tegn) => `_${tegn.codePointAt(0)?.toString(16)}_`);

export const lagFeltId = (control: object, name: string): string => {
    let prefiks = skjemaPrefiks.get(control);
    if (!prefiks) {
        nesteSkjemaNr += 1;
        prefiks = `rhf${nesteSkjemaNr}`;
        skjemaPrefiks.set(control, prefiks);
    }
    return `${prefiks}-${kodFeltnavn(name)}`;
};

export const useFeltId = (name: string, control?: object): string => {
    const context = useFormContext();
    return lagFeltId(control ?? context.control, name);
};
