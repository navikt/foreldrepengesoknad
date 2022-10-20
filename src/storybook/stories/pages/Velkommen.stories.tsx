// import React from 'react';
// import { Story } from '@storybook/react';

// import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
// import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
// import Velkommen from 'app/pages/velkommen/Velkommen';
// import withIntlProvider from '../../decorators/withIntl';
// import ForeldrepengerStateMock from '../../utils/ForeldrepengerStateMock';
// import withForeldrepengersøknadContext from '../../decorators/withForeldrepengersøknadContext';
// import Sak, { FagsakStatus, SakType } from 'app/types/Sak';
// import { BehandlingResultatType, BehandlingStatus, BehandlingTema, BehandlingType } from 'app/types/Behandling';

// export default {
//     title: 'pages/Velkommen',
//     component: Velkommen,
//     decorators: [withIntlProvider, withForeldrepengersøknadContext],
// };

// interface Props {
//     harGodkjentVilkår: boolean;
//     saker: Sak[];
// }

// const Template: Story<Props> = ({ harGodkjentVilkår, saker }) => {
//     return (
//         <ForeldrepengerStateMock
//             søknad={{ søknad: { harGodkjentVilkår, søker: { språkkode: 'nb' } } } as ForeldrepengesøknadContextState}
//             søkerinfo={{ søker: { fnr: '1233434' } } as SøkerinfoDTO}
//         >
//             <Velkommen
//                 fornavn="Espen"
//                 onChangeLocale={() => undefined}
//                 locale="nb"
//                 saker={saker}
//                 sakerV2={undefined}
//                 fnr={'123'}
//             />
//         </ForeldrepengerStateMock>
//     );
// };

// const getSakMedStatus = (
//     status: FagsakStatus,
//     opprettetDato: string,
//     behandlingStatus = BehandlingStatus.AVSLUTTET,
//     behandlingType = BehandlingType.FORELDREPENGESØKNAD,
//     behandlingsResultat = BehandlingResultatType.FORELDREPENGER_ENDRET
// ): Sak => {
//     return {
//         type: SakType.FPSAK,
//         status: status,
//         saksnummer: '1234',
//         opprettet: opprettetDato,
//         behandlinger: [
//             {
//                 opprettetTidspunkt: '2022-01-24',
//                 endretTidspunkt: '2022-01-31',
//                 status: behandlingStatus,
//                 type: behandlingType,
//                 tema: BehandlingTema.FORELDREPENGER_FØDSEL,
//                 behandlingResultat: behandlingsResultat,
//                 behandlendeEnhet: '1000',
//                 behandlendeEnhetNavn: 'NAV',
//                 inntektsmeldinger: [],
//             },
//         ],
//     };
// };
// const dato = '2021-12-06';
// const sakOpprettet = getSakMedStatus(FagsakStatus.OPPRETTET, dato);
// const sakUnderBehandling = getSakMedStatus(FagsakStatus.UNDER_BEHANDLING, dato);
// const sakLøpende = getSakMedStatus(FagsakStatus.LOPENDE, dato);
// const sakAvsluttet = getSakMedStatus(FagsakStatus.AVSLUTTET, dato);
// const sakSVP = getSakMedStatus(
//     FagsakStatus.OPPRETTET,
//     dato,
//     BehandlingStatus.AVSLUTTET,
//     BehandlingType.SVANGERSKAPSPENGESØKNAD
// );

// const sakMedHenlagtBehandling = getSakMedStatus(
//     FagsakStatus.OPPRETTET,
//     dato,
//     BehandlingStatus.AVSLUTTET,
//     BehandlingType.FORELDREPENGESØKNAD,
//     BehandlingResultatType.MERGET_OG_HENLAGT
// );

// const sakUtenAvsluttetBehandling = getSakMedStatus(
//     FagsakStatus.OPPRETTET,
//     dato,
//     BehandlingStatus.UTREDES,
//     BehandlingType.FORELDREPENGESØKNAD,
//     BehandlingResultatType.MERGET_OG_HENLAGT
// );

// const flereSaker = [
//     getSakMedStatus(FagsakStatus.AVSLUTTET, '2020-01-01'),
//     getSakMedStatus(FagsakStatus.AVSLUTTET, '2020-11-01'),
//     getSakMedStatus(FagsakStatus.OPPRETTET, '2021-09-05'),
//     getSakMedStatus(FagsakStatus.AVSLUTTET, '2021-08-01'),
// ];
// const ingenSaker: Sak[] = [];

// export const Default = Template.bind({});
// Default.args = {
//     harGodkjentVilkår: false,
//     saker: ingenSaker,
// };

// export const HarAlleredeLestOgForstått = Template.bind({});
// HarAlleredeLestOgForstått.args = {
//     harGodkjentVilkår: true,
//     saker: ingenSaker,
// };

// export const HarOpprettetFPSak = Template.bind({});
// HarOpprettetFPSak.args = {
//     saker: [sakOpprettet],
// };

// export const HarFPSakUnderBehandling = Template.bind({});
// HarFPSakUnderBehandling.args = {
//     saker: [sakUnderBehandling],
// };

// export const HarLøpendeFPSak = Template.bind({});
// HarLøpendeFPSak.args = {
//     saker: [sakLøpende],
// };

// export const HarAvsluttetFPSak = Template.bind({});
// HarAvsluttetFPSak.args = {
//     saker: [sakAvsluttet],
// };

// export const HarFlereSaker = Template.bind({});
// HarFlereSaker.args = {
//     saker: flereSaker,
// };

// export const HarKunSvpSak = Template.bind({});
// HarKunSvpSak.args = {
//     saker: [sakSVP],
// };

// export const HarKunHenlagtBehandlingPåSak = Template.bind({});
// HarKunHenlagtBehandlingPåSak.args = {
//     saker: [sakMedHenlagtBehandling],
// };

// export const HarSakUtenAvsluttetBehandling = Template.bind({});
// HarSakUtenAvsluttetBehandling.args = {
//     saker: [sakUtenAvsluttetBehandling],
// };
