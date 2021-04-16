import stringifyTilleggsopplysninger from '../stringifyTilleggsopplysninger';

const UTEN_EKSTRA = {
    begrunnelseForSenEndring: {
        tekst: 'Jeg glemte det',
    },
};

const SYKDOM = {
    begrunnelseForSenEndring: {
        ekstraInformasjon: 'SYKDOM',
        tekst: 'Jeg var for syk til å søke',
    },
};

const UTTAK = {
    begrunnelseForSenEndring: {
        ekstraInformasjon: 'UTTAK',
        tekst: 'Jeg glemte det',
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
});
