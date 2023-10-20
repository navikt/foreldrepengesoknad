import{j as i}from"./jsx-runtime-69eee039.js";import{a as p}from"./chunk-AY7I2SME-331d03ca.js";import{g as e,h as n,I as H}from"./IntlProvider-66e289af.js";import{A as E,S as m}from"./Attachment-0260a327.js";import{w as M}from"./withRouter-d4d06bd7.js";import{E as _}from"./EsContextStorybookHelper-49bfc3f0.js";import{P as x,E as t}from"./useEsNavigator-f4234e1e.js";import{K}from"./Person-12835ba1.js";import{O as y}from"./OppsummeringSteg-912c56eb.js";import{i as F}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";import"./dateUtils-2bd4467c.js";import"./StepButtons-75aba21d.js";import"./countryUtils-cd3f0cae.js";const C={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:K.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},G={erBarnetFødt:!0,antallBarn:1,fødselsdatoer:[{dato:e().subtract(10,"day").format(n)}]},J={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},V={vedlegg:[]},le={title:"OppsummeringSteg",component:y,decorators:[M],parameters:{routerDecoratorInitUrl:x.OPPSUMMERING}},l=({sendSøknad:B,omBarnet:b=G,utenlandsopphold:I=J,senereUtenlandsopphold:R,tidligereUtenlandsopphold:j,dokumentasjon:v=V})=>(F(),i.jsx(H,{språkkode:"nb",children:i.jsx(_,{initialState:{[t.OM_BARNET]:b,[t.UTENLANDSOPPHOLD]:I,[t.UTENLANDSOPPHOLD_SENERE]:R,[t.UTENLANDSOPPHOLD_TIDLIGERE]:j,[t.DOKUMENTASJON]:v},children:i.jsx(y,{person:C,sendSøknad:B})})})),o=l.bind({});o.args={sendSøknad:p("button-click")};const a=l.bind({});a.args={sendSøknad:p("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const r=l.bind({});r.args={sendSøknad:p("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const s=l.bind({});s.args={sendSøknad:p("button-click"),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.TERMINBEKREFTELSE,skjemanummer:m.TERMINBEKREFTELSE}]}};const d=l.bind({});d.args={sendSøknad:p("button-click"),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var u,S,k;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var D,O,T;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(T=(O=a.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var N,f,g;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var c,A,U;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(U=(A=s.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};var h,P,L;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(L=(P=d.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};const ie=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{a as AdopsjonAvEktefellesBarn,r as AdopsjonAvEktefellesFlereBarn,o as BarnetErFodt,s as BarnetErIkkeFodt,d as HarTidligereOgFremtidigeUtenlandsopphold,ie as __namedExportsOrder,le as default};
//# sourceMappingURL=OppsummeringSteg.stories-7a85a78e.js.map
