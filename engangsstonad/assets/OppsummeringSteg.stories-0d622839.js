import{j as p}from"./jsx-runtime-69eee039.js";import{a as r}from"./chunk-AY7I2SME-331d03ca.js";import{I as H}from"./IntlProvider-6b2e8efe.js";import{A as l,S as i}from"./Attachment-03ccfb9d.js";import{w as I}from"./withRouter-7bb73ddf.js";import{E as M}from"./EsContextStorybookHelper-8340a800.js";import{E as e}from"./useEsNavigator-196eef3f.js";import{K as R}from"./Person-12835ba1.js";import{P as _}from"./paths-77448497.js";import{O as h}from"./OppsummeringSteg-f9931f24.js";import{i as x}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";import"./index.es-1c07523a.js";const K={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:R.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},F={erBarnetFødt:!0,antallBarn:1,fødselsdatoer:[{dato:"2023-01-01"}]},C={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},J={vedlegg:[]},re={title:"OppsummeringSteg",component:h,decorators:[I],parameters:{routerDecoratorInitUrl:_.OPPSUMMERING}},d=({sendSøknad:L,omBarnet:y=F,utenlandsopphold:B=C,nesteUtenlandsopphold:b,sisteUtenlandsopphold:v,dokumentasjon:j=J})=>(x(),p.jsx(H,{språkkode:"nb",children:p.jsx(M,{initialState:{[e.OM_BARNET]:y,[e.UTENLANDSOPPHOLD]:B,[e.UTENLANDSOPPHOLD_NESTE]:b,[e.UTENLANDSOPPHOLD_SISTE]:v,[e.DOKUMENTASJON]:j},children:p.jsx(h,{person:K,sendSøknad:L})})})),n=d.bind({});n.args={sendSøknad:r("button-click")};const t=d.bind({});t.args={sendSøknad:r("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:l.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]}};const o=d.bind({});o.args={sendSøknad:r("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:l.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]}};const a=d.bind({});a.args={sendSøknad:r("button-click"),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:l.TERMINBEKREFTELSE,skjemanummer:i.TERMINBEKREFTELSE}]}};const s=d.bind({});s.args={sendSøknad:r("button-click"),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},nesteUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:"2025-01-01",tom:"2026-01-01",landkode:"SE"},{fom:"2027-01-01",tom:"2028-01-01",landkode:"DK"}]},sisteUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:"2021-01-01",tom:"2022-01-01",landkode:"IS"}]}};var m,E,S;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  nesteUtenlandsopphold,
  sisteUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_NESTE]: nesteUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SISTE]: sisteUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var u,k,D;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  nesteUtenlandsopphold,
  sisteUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_NESTE]: nesteUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SISTE]: sisteUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(D=(k=t.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var T,O,N;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  nesteUtenlandsopphold,
  sisteUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_NESTE]: nesteUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SISTE]: sisteUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(N=(O=o.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var f,c,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  nesteUtenlandsopphold,
  sisteUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_NESTE]: nesteUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SISTE]: sisteUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(g=(c=a.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var U,A,P;s.parameters={...s.parameters,docs:{...(U=s.parameters)==null?void 0:U.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  nesteUtenlandsopphold,
  sisteUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_NESTE]: nesteUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SISTE]: sisteUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(P=(A=s.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};const de=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{t as AdopsjonAvEktefellesBarn,o as AdopsjonAvEktefellesFlereBarn,n as BarnetErFodt,a as BarnetErIkkeFodt,s as HarTidligereOgFremtidigeUtenlandsopphold,de as __namedExportsOrder,re as default};
//# sourceMappingURL=OppsummeringSteg.stories-0d622839.js.map
