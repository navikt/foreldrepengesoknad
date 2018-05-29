import { SøknadsvedleggMetadata } from '../types/søknad/Søknadsvedlegg';

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
