import { Tilleggsopplysning } from 'app/context/types/Tilleggsopplysninger';
import stringifyTilleggsopplysninger from './tilleggsopplysninger.utils';

const UTEN_EKSTRA = {
    begrunnelseForSenEndring: {
        tekst: 'Jeg glemte det',
    } as Tilleggsopplysning,
};

const SYKDOM = {
    begrunnelseForSenEndring: {
        ekstraInformasjon: 'SYKDOM',
        tekst: 'Jeg var for syk til å søke',
    },
};

const ARBEID = {
    begrunnelseForSenEndring: {
        ekstraInformasjon: 'ARBEID',
        tekst: 'Jeg jobbet',
    },
};

const UTTAK = {
    begrunnelseForSenEndring: {
        ekstraInformasjon: 'UTTAK',
        tekst: 'Jeg glemte det',
    },
};

const SYKDOM_OG_UTTAK = {
    begrunnelseForSenEndring: {
        ekstraInformasjon: 'SYKDOM_OG_UTTAK',
        tekst: 'Jeg var for syk og jeg glemte det',
    },
};

describe('stringifyTilleggsopplysninger', () => {
    it('konverterer begrunnelseForSenEndring uten ekstra informasjon', () => {
        expect(stringifyTilleggsopplysninger(UTEN_EKSTRA)).toEqual(
            'Begrunnelse for å søke om utsettelse: Jeg glemte det'
        );
    });

    it('konverterer begrunnelseForSenEndring på grunn av sykdom', () => {
        expect(stringifyTilleggsopplysninger(SYKDOM)).toEqual(
            'Begrunnelse for å søke om utsettelse på grunn av sykdom tilbake i tid: Jeg var for syk til å søke'
        );
    });

    it('konverterer begrunnelseForSenEndring på grunn av sent uttak', () => {
        expect(stringifyTilleggsopplysninger(UTTAK)).toEqual(
            'Begrunnelse for å søke om utsettelse på grunn av uttak mer enn tre måneder tilbake i tid: Jeg glemte det'
        );
    });
    it('konverterer begrunnelseForSenEndring på grunn av sykdom og sent uttak', () => {
        expect(stringifyTilleggsopplysninger(SYKDOM_OG_UTTAK)).toEqual(
            'Begrunnelse for å søke om utsettelse på grunn av sykdom tilbake i tid og uttak mer enn tre måneder tilbake i tid: Jeg var for syk og jeg glemte det'
        );
    });
    it('konverterer begrunnelseForSenEndring på grunn arbeid', () => {
        expect(stringifyTilleggsopplysninger(ARBEID)).toEqual('Begrunnelse for å søke om utsettelse: Jeg jobbet');
    });
});
