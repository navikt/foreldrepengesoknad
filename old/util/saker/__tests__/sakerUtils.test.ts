import { getSakForEndringssøknad } from '../sakerUtils';
import SakerMock, { foreldrepengesoknadBehandlingMock } from '../../../../../jest/mocks/SakerMock';
import { FagsakStatus } from 'app/types/søknad/Sak';
import { BehandlingStatus } from 'app/types/søknad/Behandling';

describe('sakerUtils', () => {
    describe('saker for endringssøknad', () => {
        it('skal ikke kunne søke om endring hvis nyeste sak er en svangerskapepengesak eller engangssønad', () => {
            expect(getSakForEndringssøknad([SakerMock.fpsakSVP])).toBeUndefined();
            expect(getSakForEndringssøknad([SakerMock.fpsakES])).toBeUndefined();
        });

        it('skal kunne søke om endring med sak fra infotrygd', () => {
            expect(getSakForEndringssøknad([SakerMock.infotrygd])).toBeDefined();
        });

        it('skal ikke kunne søke om endring på avsluttet sak', () => {
            expect(getSakForEndringssøknad([{ ...SakerMock.fpsakFP, status: FagsakStatus.AVSLUTTET }])).toBeUndefined();
        });

        it('skal kunne søke om endring med sak som ikke er avluttet og har en avsluttet behandlig', () => {
            expect(
                getSakForEndringssøknad([
                    {
                        ...SakerMock.fpsakFP,
                        opprettet: FagsakStatus.LOPENDE,
                        behandlinger: [{ ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET }],
                    },
                ])
            ).toBeDefined();
            expect(
                getSakForEndringssøknad([
                    {
                        ...SakerMock.fpsakFP,
                        opprettet: FagsakStatus.LOPENDE,
                        behandlinger: [{ ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET }],
                    },
                ])
            ).toBeDefined();
            expect(
                getSakForEndringssøknad([
                    {
                        ...SakerMock.fpsakFP,
                        opprettet: FagsakStatus.LOPENDE,
                        behandlinger: [{ ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET }],
                    },
                ])
            ).toBeDefined();
        });

        it('skal kunne søke om endring hvis saken ikke er avsluttet og har en avsluttet behandlig', () => {
            expect(
                getSakForEndringssøknad([
                    {
                        ...SakerMock.fpsakFP,
                        opprettet: FagsakStatus.OPPRETTET,
                        behandlinger: [{ ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET }],
                    },
                ])
            ).toBeDefined();

            expect(
                getSakForEndringssøknad([
                    {
                        ...SakerMock.fpsakFP,
                        opprettet: FagsakStatus.UNDER_BEHANDLING,
                        behandlinger: [{ ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET }],
                    },
                ])
            ).toBeDefined();

            expect(
                getSakForEndringssøknad([
                    {
                        ...SakerMock.fpsakFP,
                        opprettet: FagsakStatus.LOPENDE,
                        behandlinger: [{ ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET }],
                    },
                ])
            ).toBeDefined();
        });
    });
});
