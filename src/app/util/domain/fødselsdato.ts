import { DatoInputVerdi } from '../../../common/components/skjema/elements/dato-input/DatoInput';

const trimFødselsdatoer = (antall: number, datoer: DatoInputVerdi[] = []): DatoInputVerdi[] => {
    let fødselsdatoer = [...datoer];
    if (datoer.length > antall) {
        fødselsdatoer = datoer.slice(0, antall);
    } else {
        fødselsdatoer = new Array(antall - fødselsdatoer.length).fill(undefined);
        fødselsdatoer.unshift(...datoer);
    }
    return fødselsdatoer;
};

export default {
    trimFødselsdatoer,
};
