// import React from 'react';
// import { useIntl, IntlShape, FormattedMessage } from 'react-intl';
// import SituasjonSirkel from './illustrasjoner/situasjon-sirkel/SituasjonSirkel';
// import UkerSirkel from './illustrasjoner/uker-sirkel/UkerSirkel';
// import InfoEksisterendeSakPerioder from './InfoEksisterendeSakPerioder';
// import { Normaltekst } from 'nav-frontend-typografi';
// import { EksisterendeSak } from 'app/types/EksisterendeSak';
// import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
// import { Block, intlUtils } from '@navikt/fp-common';
// import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
// import { Forelder } from 'app/types/Forelder';
// import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
// import { getNavnGenitivEierform } from 'app/utils/personUtils';
// import { InfoPeriode } from 'uttaksplan/types/Periode';
// import InnholdMedIllustrasjon from '../innhold-med-illustrasjon/InnholdMedIllustrasjon';
// import { formaterDato, getVarighetString } from 'app/utils/dateUtils';
// import links from 'app/links/links';

// interface Props {
//     tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
//     eksisterendeSak?: EksisterendeSak;
//     erIUttaksplanenSteg: boolean;
//     skalKunneViseInfoOmEkisterendeSak?: boolean;
// }

// const getHvem = (
//     intl: IntlShape,
//     erDeltUttak: boolean,
//     navn?: NavnISøknaden,
//     erAnnenPartsEksisterendeSak?: boolean
// ): string => {
//     if (erDeltUttak && navn && navn.annenForelder) {
//         return erAnnenPartsEksisterendeSak
//             ? intlUtils(intl, 'eksisterendeSak.tekst.benevning.førstegangssøknaMedEkisterndeSakAnnenPart', {
//                   navn: navn.annenForelder.fornavn,
//               })
//             : intlUtils(intl, 'eksisterendeSak.tekst.benevning.deltOmsorg', { navn: navn.annenForelder.fornavn });
//     }
//     return intlUtils(intl, 'eksisterendeSak.tekst.benevning.aleneomsorg');
// };

// const InfoEksisterendeSak: React.FunctionComponent<Props> = ({
//     tilgjengeligeStønadskontoer,
//     eksisterendeSak,
//     erIUttaksplanenSteg,
//     skalKunneViseInfoOmEkisterendeSak,
// }) => {
//     const intl = useIntl();
//     const uker = getAntallUker(tilgjengeligeStønadskontoer);
//     const situasjon = getForeldreparSituasjonFraSøknadsinfo(søknadsinfo);
//     if (situasjon === undefined) {
//         return null;
//     }
//     const {
//         søknaden: { erDeltUttak, dekningsgrad },
//         navn,
//     } = søknadsinfo;

//     const forelderVedAleneomsorg = erDeltUttak
//         ? undefined
//         : søknadsinfo.søker.erMor
//         ? Forelder.mor
//         : Forelder.farMedmor;

//     const hvem = getHvem(intl, erDeltUttak, navn, eksisterendeSak ? eksisterendeSak.erAnnenPartsSak : false);

//     let sisteInfoPeriode;
//     if (eksisterendeSak) {
//         sisteInfoPeriode = eksisterendeSak.uttaksplan
//             ? Periodene(eksisterendeSak.uttaksplan).finnSisteInfoperiode()
//             : undefined;
//     }
//     const nesteMuligeUttaksdagEtterAnnenPart =
//         eksisterendeSak && eksisterendeSak.uttaksplan && sisteInfoPeriode
//             ? Uttaksdagen(sisteInfoPeriode.tidsperiode.tom).neste()
//             : undefined;

//     const navnGenitivEierform = getNavnGenitivEierform(navn.annenForelder.fornavn, intl.locale);

//     const infoperioder: InfoPeriode[] =
//         eksisterendeSak && eksisterendeSak.uttaksplan ? eksisterendeSak.uttaksplan.filter(isInfoPeriode) : [];

//     const visPlanTekst: string = erIUttaksplanenSteg
//         ? 'eksisterendeSak.label.seAnnenPartsPlanIPlanen'
//         : 'eksisterendeSak.label.seAnnenPartsPlan';

//     const søkersPerioder =
//         eksisterendeSak &&
//         eksisterendeSak.saksperioder &&
//         eksisterendeSak.saksperioder.filter((p) => p.type !== Periodetype.Info);

//     return (
//         <InfoBlock padding="m">
//             <Block padBottom="l">
//                 <InnholdMedIllustrasjon
//                     tittel={intlUtils(intl, `eksisterendeSak.tittel.${erDeltUttak ? 'deltUttak' : 'aleneomsorg'}`)}
//                     illustrasjoner={[
//                         <SituasjonSirkel
//                             key="situasjon"
//                             situasjon={situasjon}
//                             valgtForelder={forelderVedAleneomsorg}
//                         />,
//                         <UkerSirkel key="uker" uker={uker} />,
//                     ]}
//                 >
//                     <Normaltekst>
//                         <FormattedMessage
//                             id="eksisterendeSak.tekst.html"
//                             values={{
//                                 uker: <strong>{getVarighetString(uker * 5, intl)}</strong>,
//                                 dekningsgrad: <strong>{dekningsgrad}</strong>,
//                                 navn: hvem,
//                             }}
//                         />
//                     </Normaltekst>
//                     {skalKunneViseInfoOmEkisterendeSak && nesteMuligeUttaksdagEtterAnnenPart && (
//                         <Normaltekst>
//                             <FormattedMessage
//                                 id="eksisterendeSak.tekst.nesteMuligeUttaksdato"
//                                 values={{
//                                     dato: formaterDato(nesteMuligeUttaksdagEtterAnnenPart, 'DD. MMM YYYY'),
//                                     navn: navn.annenForelder.fornavn,
//                                     b: (msg: any) => <b>{msg}</b>,
//                                 }}
//                             />
//                         </Normaltekst>
//                     )}

//                     {skalKunneViseInfoOmEkisterendeSak && infoperioder && infoperioder.length > 0 && (
//                         <UtvidetInformasjon
//                             apneLabel={intlUtils(intl, visPlanTekst, {
//                                 navn: navnGenitivEierform,
//                             })}
//                         >
//                             <InfoEksisterendeSakPerioder
//                                 perioder={infoperioder}
//                                 søknadsinfo={søknadsinfo}
//                                 navnForOverskrift={søknadsinfo.navn.annenForelder.navn}
//                             />
//                         </UtvidetInformasjon>
//                     )}
//                 </InnholdMedIllustrasjon>
//                 {skalKunneViseInfoOmEkisterendeSak && søkersPerioder && søkersPerioder.length > 0 && (
//                     <InnholdMedIllustrasjon
//                         tittel={intlUtils(intl, 'eksisterendeSak.tittel.dineDagerMedForeldrepenger')}
//                         illustrasjoner={[]}
//                         infoboks={
//                             erIUttaksplanenSteg === false ? (
//                                 <Infoboks
//                                     tekst={intl.formatMessage(
//                                         {
//                                             id: 'eksisterendeSak.tittel.dineDagerMedForeldrepenger.infoboks',
//                                         },
//                                         {
//                                             navn: søknadsinfo.navn.annenForelder.navn,
//                                         }
//                                     )}
//                                 />
//                             ) : undefined
//                         }
//                     >
//                         <InfoEksisterendeSakPerioder perioder={søkersPerioder} søknadsinfo={søknadsinfo} />
//                     </InnholdMedIllustrasjon>
//                 )}
//             </Block>
//             <Normaltekst>
//                 <FormattedMessage
//                     id="uttaksplan.informasjon.lesMer"
//                     values={{
//                         a: (msg: any) => (
//                             <a href={links.viktigeFrister} className="lenke" rel="noreferrer" target="_blank">
//                                 {msg}
//                             </a>
//                         ),
//                     }}
//                 />
//             </Normaltekst>
//         </InfoBlock>
//     );
// };

// export default InfoEksisterendeSak;
