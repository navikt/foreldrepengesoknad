const trimFødselsdatoer = (antall: number, datoer: Date[] = []): Date[] => {
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
