import Arbeidsforhold from '../../../../app/types/Arbeidsforhold';
import Sak, { FagsakStatus, SakType } from '../../../../app/types/søknad/Sak';
import Behandling, {
    BehandlingResultatType,
    BehandlingStatus,
    BehandlingTema,
    BehandlingÅrsak
} from '../../../../app/types/søknad/Behandling';
import {
    harInntektsmeldingBlittMottatt,
    kanViseEtikettOmMotattInntektsmelding
} from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';

describe('InformasjonOmArbeidsforholdWrapper', () => {
    let arbeidsforhold: Arbeidsforhold;
    let nyesteSak: Sak;
    let behandling: Behandling;

    beforeEach(() => {
        arbeidsforhold = {
            arbeidsgiverNavn: 'navn',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverId: '123456789',
            fom: new Date('2000-01-01'),
            stillingsprosent: 100
        };
        behandling = {
            opprettetTidspunkt: '2019-01-01',
            endretTidspunkt: '2019-01-02',
            behandlendeEnhet: '4833',
            behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
            id: null,
            status: BehandlingStatus.OPPRETTET,
            tema: BehandlingTema.FORELDREPENGER,
            type: 'FP',
            årsak: BehandlingÅrsak.YTELSE,
            behandlingResultatType: BehandlingResultatType.INNVILGET,
            inntektsmeldinger: []
        };
        nyesteSak = {
            type: SakType.FPSAK,
            saksnummer: '123',
            opprettet: '2018-10-01',
            status: FagsakStatus.OPPRETTET,
            behandlinger: [behandling]
        };
    });

    it('does not render inntektsmelding etikett if applicant has previous sak from infotrygd', () => {
        nyesteSak.type = SakType.SAK;
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeFalsy();
    });

    it('does not render inntektsmelding etikett if inntektsmelding is recived and applicant has multiple employers', () => {
        nyesteSak.behandlinger![0].inntektsmeldinger = ['123'];
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold, arbeidsforhold], nyesteSak)).toBeFalsy();
    });

    it('renders inntektsmelding ikke motatt etikett if applicant has no previous sak', () => {
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], undefined)).toBeTruthy();
        expect(harInntektsmeldingBlittMottatt(undefined)).toBeFalsy();
    });

    it('renders inntektsmelding ikke motatt etikett if newest behandling does not have inntektsmeldinger', () => {
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeTruthy();
        expect(harInntektsmeldingBlittMottatt(nyesteSak)).toBeFalsy();
    });

    it('renders inntektsmelding etikett if no inntektsmelding is recived and applicant has multiple employers', () => {
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold, arbeidsforhold], nyesteSak)).toBeTruthy();
    });

    it(
        'renders inntektsmelding mottatt etikett if inntektsmelding is recived on the newest behandling, ' +
            'sak has status opprettet and applicant has a single employer',
        () => {
            nyesteSak.behandlinger![0].inntektsmeldinger = ['123'];
            expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeTruthy();
            expect(harInntektsmeldingBlittMottatt(nyesteSak)).toBeTruthy();
        }
    );

    it('renders inntektsmelding ikke motatt etikett if applicant has no previous sak', () => {
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], undefined)).toBeTruthy();
        expect(harInntektsmeldingBlittMottatt(undefined)).toBeFalsy();
    });

    it(
        'renders inntektsmelding mottatt etikett if inntektsmelding is recived on the newest behandling, ' +
            'sak has status opprettet and applicant has a single employer',
        () => {
            nyesteSak.behandlinger![0].inntektsmeldinger = ['123'];
            expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeTruthy();
            expect(harInntektsmeldingBlittMottatt(nyesteSak)).toBeTruthy();
        }
    );

    it('renders inntektsmelding ikke motatt etikett if applicant has previous sak with status avsluttet', () => {
        nyesteSak.status = FagsakStatus.AVSLUTTET;
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeTruthy();
        expect(harInntektsmeldingBlittMottatt(nyesteSak)).toBeFalsy();
    });

    it('renders inntektsmelding ikke motatt etikett if applicant has previous sak with status løpende', () => {
        nyesteSak.status = FagsakStatus.LOPENDE;
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeTruthy();
        expect(harInntektsmeldingBlittMottatt(nyesteSak)).toBeFalsy();
    });

    it('renders inntektsmelding ikke motatt etikett if applicant has previous sak with status under behandling', () => {
        nyesteSak.status = FagsakStatus.UNDER_BEHANDLING;
        expect(kanViseEtikettOmMotattInntektsmelding([arbeidsforhold], nyesteSak)).toBeTruthy();
        expect(harInntektsmeldingBlittMottatt(nyesteSak)).toBeFalsy();
    });
});
