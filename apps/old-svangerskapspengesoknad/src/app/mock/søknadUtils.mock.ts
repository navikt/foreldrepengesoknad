import { Arbeidsforholdstype, Tilretteleggingstype, UferdigTilrettelegging } from '../types/Tilrettelegging';
import { initialSøknad, UferdigSøknad } from '../types/Søknad';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';

const dagensDatoString = dateToISOFormattedDateString(new Date())!;

const selvstendigTilrettelegging: UferdigTilrettelegging = {
    id: 'sdgf',
    vedlegg: ['V82187933376995392214929871235303834'],
    arbeidsforhold: {
        type: Arbeidsforholdstype.SELVSTENDIG,
    },
    risikoFaktorer: 'Selvstendig er skummelt i seg selv',
    behovForTilretteleggingFom: dagensDatoString,
    type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
    ingenTilrettelegging: [
        {
            slutteArbeidFom: dagensDatoString,
        },
    ],
    delvisTilrettelegging: [
        {
            stillingsprosent: 20,
            tilrettelagtArbeidFom: dagensDatoString,
        },
    ],
    helTilrettelegging: [
        {
            tilrettelagtArbeidFom: dagensDatoString,
        },
    ],
    tilretteleggingstiltak: 'sdfsdf',
};

const frilansTilrettelegging: UferdigTilrettelegging = {
    id: 'Frilans',
    vedlegg: ['V81190844807492761421951617787104538'],
    arbeidsforhold: {
        type: Arbeidsforholdstype.FRILANSER,
    },
    risikoFaktorer: 'sdfsdf',
    behovForTilretteleggingFom: dagensDatoString,
    type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
    ingenTilrettelegging: [
        {
            slutteArbeidFom: dagensDatoString,
        },
    ],
    delvisTilrettelegging: [
        {
            tilrettelagtArbeidFom: dagensDatoString,
            stillingsprosent: 22,
        },
    ],
    helTilrettelegging: [
        {
            tilrettelagtArbeidFom: dagensDatoString,
        },
    ],
    tilretteleggingstiltak: 'sdfsdf',
};

const virksomhetTilrettelegging: UferdigTilrettelegging = {
    id: '973861778',
    vedlegg: ['V62140708603673047171502120454045017516'],
    arbeidsforhold: {
        id: '973861778',
        type: Arbeidsforholdstype.VIRKSOMHET,
    },
    behovForTilretteleggingFom: dagensDatoString,
    type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
    ingenTilrettelegging: [
        {
            slutteArbeidFom: dagensDatoString,
        },
    ],
    delvisTilrettelegging: [
        {
            stillingsprosent: 22,
            tilrettelagtArbeidFom: dagensDatoString,
        },
    ],
    helTilrettelegging: [
        {
            tilrettelagtArbeidFom: dagensDatoString,
        },
    ],
};

const tilrettelegginger: UferdigTilrettelegging[] = [
    virksomhetTilrettelegging,
    selvstendigTilrettelegging,
    frilansTilrettelegging,
];

const uferdigSøknad: UferdigSøknad = {
    ...initialSøknad,
    søknadsgrunnlag: [
        {
            id: '973861778',
            type: Arbeidsforholdstype.VIRKSOMHET,
        },
        {
            id: 'Frilans',
            type: Arbeidsforholdstype.FRILANSER,
        },
        {
            id: 'Selvstendig',
            type: Arbeidsforholdstype.SELVSTENDIG,
        },
    ],
    tilrettelegging: tilrettelegginger,
};

const SøknadUtilsMock = {
    tilrettelegginger,
    virksomhetTilrettelegging,
    frilansTilrettelegging,
    selvstendigTilrettelegging,
    uferdigSøknad,
};

export default SøknadUtilsMock;
