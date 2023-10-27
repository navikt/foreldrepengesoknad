import{j as E}from"./jsx-runtime-69eee039.js";import{a as H}from"./chunk-AY7I2SME-331d03ca.js";import{j as e,k as n,i as M,I as _}from"./IntlProvider-3c360a14.js";import{A as m,S}from"./Attachment-512881c1.js";import{w as x}from"./withRouter-f8844b4b.js";import{E as K}from"./EsContextStorybookHelper-ef1c4635.js";import{P as F,E as t}from"./useEsNavigator-c9c93517.js";import{K as C}from"./Person-12835ba1.js";import{O as B}from"./OppsummeringSteg-cb3a8af0.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./_baseToString-8992fead.js";import"./_createSet-409f46e6.js";import"./index-b3a39e30.js";const p=()=>(...i)=>(H("button-click")(...i),Promise.resolve()),G={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:C.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},J={erBarnetFødt:!0,antallBarn:1,fødselsdato:e().subtract(10,"day").format(n)},V={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},z={vedlegg:[]},se={title:"OppsummeringSteg",component:B,decorators:[x],parameters:{routerDecoratorInitUrl:F.OPPSUMMERING}},l=({sendSøknad:i,omBarnet:b=J,utenlandsopphold:j=V,senereUtenlandsopphold:v,tidligereUtenlandsopphold:I,dokumentasjon:R=z})=>(M(),E.jsx(_,{språkkode:"nb",children:E.jsx(K,{initialState:{[t.OM_BARNET]:b,[t.UTENLANDSOPPHOLD]:j,[t.UTENLANDSOPPHOLD_SENERE]:v,[t.UTENLANDSOPPHOLD_TIDLIGERE]:I,[t.DOKUMENTASJON]:R},children:E.jsx(B,{person:G,sendSøknad:i})})})),o=l.bind({});o.args={sendSøknad:p()};const a=l.bind({});a.args={sendSøknad:p(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:m.OMSORGSOVERTAKELSE,skjemanummer:S.OMSORGSOVERTAKELSE}]}};const r=l.bind({});r.args={sendSøknad:p(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:m.OMSORGSOVERTAKELSE,skjemanummer:S.OMSORGSOVERTAKELSE}]}};const s=l.bind({});s.args={sendSøknad:p(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:m.TERMINBEKREFTELSE,skjemanummer:S.TERMINBEKREFTELSE}]}};const d=l.bind({});d.args={sendSøknad:p(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var u,D,k;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
}`,...(k=(D=o.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var O,T,N;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`({
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
}`,...(N=(T=a.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var f,g,c;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`({
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
}`,...(c=(g=r.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var A,U,P;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
}`,...(P=(U=s.parameters)==null?void 0:U.docs)==null?void 0:P.source}}};var h,L,y;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`({
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
}`,...(y=(L=d.parameters)==null?void 0:L.docs)==null?void 0:y.source}}};const de=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{a as AdopsjonAvEktefellesBarn,r as AdopsjonAvEktefellesFlereBarn,o as BarnetErFodt,s as BarnetErIkkeFodt,d as HarTidligereOgFremtidigeUtenlandsopphold,de as __namedExportsOrder,se as default};
//# sourceMappingURL=OppsummeringSteg.stories-fbd51206.js.map
