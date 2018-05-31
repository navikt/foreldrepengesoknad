import { SøknadsvedleggMetadata } from '../types/søknad/Søknad';

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
