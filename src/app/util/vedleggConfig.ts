export interface VedleggConfig {
    [key: string]: {
        beskrivelse: string;
        skjemanummer: string;
    };
}

const vedleggConfig: VedleggConfig = {
    omsorgsovertakelseMetadata: {
        beskrivelse: 'omsorgsovertakelse',
        skjemanummer: 'omsorgsovertakelse'
    }
};

export default vedleggConfig;
