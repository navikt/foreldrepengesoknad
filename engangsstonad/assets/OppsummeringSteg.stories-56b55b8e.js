import{j as l}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{I}from"./IntlProvider-323f7bb7.js";import{A as p,S as i}from"./Attachment-77c59016.js";import{w as L}from"./withRouter-c9c9cf49.js";import{E as M}from"./EsContextStorybookHelper-8788fceb.js";import{E as d}from"./useEsNavigator-7d967be7.js";import{K as U}from"./Person-12835ba1.js";import{P as H}from"./paths-15c3400b.js";import{O as h}from"./OppsummeringSteg-2c2904ee.js";import{i as F}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";import"./dateUtils-a2958f29.js";import"./StepButtons-472e9663.js";const x={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:U.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},K={erBarnetFødt:!0,antallBarn:1,fødselsdatoer:[{dato:"2023-01-01"}]},_={harKunBoddINorge:!0},C={vedlegg:[]},se={title:"OppsummeringSteg",component:h,decorators:[L],parameters:{routerDecoratorInitUrl:H.OPPSUMMERING}},s=({sendSøknad:y,omBarnet:b=K,utenlandsopphold:v=_,utenlandsoppholdPerioder:R,dokumentasjon:j=C})=>(F(),l.jsx(I,{språkkode:"nb",children:l.jsx(M,{initialState:{[d.OM_BARNET]:b,[d.UTENLANDSOPPHOLD]:v,[d.UTENLANDSOPPHOLD_PERIODER]:R,[d.DOKUMENTASJON]:j},children:l.jsx(h,{person:x,sendSøknad:y})})})),e=s.bind({});e.args={sendSøknad:a("button-click")};const n=s.bind({});n.args={sendSøknad:a("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]}};const t=s.bind({});t.args={sendSøknad:a("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]}};const o=s.bind({});o.args={sendSøknad:a("button-click"),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.TERMINBEKREFTELSE,skjemanummer:i.TERMINBEKREFTELSE}]}};const r=s.bind({});r.args={sendSøknad:a("button-click"),utenlandsopphold:{harKunBoddINorge:!1},utenlandsoppholdPerioder:{perioder:[{harFlyttetUtForMerEnn12MånderSiden:!1,skalBoIUtlandetMerEnEttÅrFremover:!1,fom:"2023-12-22",tom:"2024-01-21",landkode:"SE"},{harFlyttetUtForMerEnn12MånderSiden:!1,skalBoIUtlandetMerEnEttÅrFremover:!1,fom:"2023-05-27",tom:"2023-07-05",landkode:"DK"},{harFlyttetUtForMerEnn12MånderSiden:!1,skalBoIUtlandetMerEnEttÅrFremover:!1,fom:"2023-03-27",tom:"2023-04-05",landkode:"IS"}]}};var m,E,u;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  utenlandsoppholdPerioder,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_PERIODER]: utenlandsoppholdPerioder,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(u=(E=e.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};var S,k,O;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  utenlandsoppholdPerioder,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_PERIODER]: utenlandsoppholdPerioder,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(O=(k=n.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var D,f,c;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  utenlandsoppholdPerioder,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_PERIODER]: utenlandsoppholdPerioder,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(c=(f=t.parameters)==null?void 0:f.docs)==null?void 0:c.source}}};var T,g,P;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  utenlandsoppholdPerioder,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_PERIODER]: utenlandsoppholdPerioder,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(P=(g=o.parameters)==null?void 0:g.docs)==null?void 0:P.source}}};var N,A,B;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  utenlandsoppholdPerioder,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_PERIODER]: utenlandsoppholdPerioder,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(B=(A=r.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};const de=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{n as AdopsjonAvEktefellesBarn,t as AdopsjonAvEktefellesFlereBarn,e as BarnetErFodt,o as BarnetErIkkeFodt,r as HarTidligereOgFremtidigeUtenlandsopphold,de as __namedExportsOrder,se as default};
//# sourceMappingURL=OppsummeringSteg.stories-56b55b8e.js.map
