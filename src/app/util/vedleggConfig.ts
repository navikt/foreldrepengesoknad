import { SøknadsvedleggMetadata } from '../types/s\u00F8knad/Søknadsvedlegg';

export interface VedleggConfig {
    [key: string]: SøknadsvedleggMetadata;
}

const vedleggConfig: VedleggConfig = {
    omsorgsovertakelseMetadata: {
        beskrivelse: 'omsorgsovertakelse',
        skjemanummer: 'omsorgsovertakelse'
    }
};

export default vedleggConfig;
