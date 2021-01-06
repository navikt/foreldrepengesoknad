import Behandling, {
    BehandlingStatus,
    BehandlingTema,
    BehandlingResultatType,
    BehandligType
} from 'app/types/søknad/Behandling';
import Sak, { SakType, FagsakStatus } from 'app/types/søknad/Sak';

export const engangssønadBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.ENGANGSTØNAD,
    type: BehandligType.ENGANGSSØNAD,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

export const foreldrepengesoknadBehandlingMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.AVSLUTTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: BehandligType.FORELDREPENGESØKNAD,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

export const svpBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.UDEFINERT,
    type: BehandligType.SVANGERSKAPSPENGESØKNAD,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

export const endringssøknadBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: BehandligType.FORELDREPENGESØKNAD,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

const infotrygd: Sak = {
    type: SakType.SAK,
    saksnummer: '123',
    opprettet: '2018-09-01'
};

const fpsakSVP: Sak = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [svpBehandligMock]
};

const fpsakFP: Sak = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [foreldrepengesoknadBehandlingMock]
};

const fpsakES: Sak = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [engangssønadBehandligMock]
};

const fpsakEndring: Sak = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [endringssøknadBehandligMock]
};

const SakerMock = { fpsakSVP, fpsakES, fpsakFP, fpsakEndring, infotrygd };
export default SakerMock;
