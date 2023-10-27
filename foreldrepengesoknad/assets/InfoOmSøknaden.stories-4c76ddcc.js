import{j as s}from"./jsx-runtime-69eee039.js";import{w as F}from"./withIntl-4043b8b4.js";import{w as O}from"./withRouter-2e2c6e6b.js";import{w as x,F as M}from"./ForeldrepengerStateMock-8c04d332.js";import{d as k}from"./validationUtils-3923a44f.js";import{I as u}from"./InfoOmSøknaden-b1b47928.js";import{P as A,S as P}from"./Periodene-7b9c80a7.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-32a27317.js";import"./IntlProvider-7d7f37e2.js";import"./useSøknad-bb41a340.js";import"./mapSøkerinfoDTO-f0b0bc3c.js";import"./AttachmentType-f6ad37cf.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./v4-a960c1f4.js";import"./links-b36d21ab.js";import"./useSøkerinfo-ae49b1f5.js";const e={søknad:{saksnummer:void 0,type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{},informasjonOmUtenlandsopphold:{},erEndringssøknad:!1,dekningsgrad:"100",uttaksplan:[],harGodkjentOppsummering:!1,vedlegg:[],tilleggsopplysninger:void 0,ønskerJustertUttakVedFødsel:void 0},version:5,currentRoute:"/soknad/uttaksplan-info",søkerinfo:{},saker:[],kvittering:void 0,antallUkerIUttaksplan:void 0,endringstidspunkt:void 0,perioderSomSkalSendesInn:[],harUttaksplanBlittSlettet:!1,brukerSvarteJaPåAutoJustering:void 0,søknadGjelderEtNyttBarn:void 0,familieHendelseDatoNesteSak:void 0,annenPartsUttakErLagtTilIPlan:void 0},o={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},z={title:"components/InfoOmSøknaden",component:u,decorators:[O,F,x]},a=({context:v,søkerinfo:I,erIUttaksplanenSteg:U=!0,ekisterendeSak:j})=>s.jsx(M,{søknad:v,søkerinfo:I,children:s.jsx(u,{tilgjengeligeStønadskontoer:[{konto:P.Mødrekvote,dager:50}],eksisterendeSak:j,erIUttaksplanenSteg:U})}),n=a.bind({});n.args={context:e,søkerinfo:o};const r=a.bind({});r.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:o};const t=a.bind({});t.args={context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:o,ekisterendeSak:{erAnnenPartsSak:!0,uttaksplan:[{type:A.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:k("2021-01-01").toDate(),tom:k("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var d,i,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
  context,
  søkerinfo,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} />
        </ForeldrepengerStateMock>;
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,m,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`({
  context,
  søkerinfo,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} />
        </ForeldrepengerStateMock>;
}`,...(g=(m=r.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var f,S,c;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`({
  context,
  søkerinfo,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} />
        </ForeldrepengerStateMock>;
}`,...(c=(S=t.parameters)==null?void 0:S.docs)==null?void 0:c.source}}};const Q=["Default","AnnenForelder","InfoOmMorsSak"];export{r as AnnenForelder,n as Default,t as InfoOmMorsSak,Q as __namedExportsOrder,z as default};
//# sourceMappingURL=InfoOmSøknaden.stories-4c76ddcc.js.map
