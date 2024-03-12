import{j as i}from"./index-b829706d.js";import{a as j}from"./chunk-WFFRPTHA-a68c42c5.js";import{d as e,I as n,i as I,M as _,P as H,E as b,C as a}from"./useEsNavigator-ae9c7adf.js";import{A as E,S as g}from"./OmBarnet-c2933a6c.js";import{O as M}from"./OppsummeringSteg-341ddae0.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";const t=()=>(...m)=>(j("button-click")(...m),Promise.resolve()),G={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]},K={erBarnetFødt:!0,antallBarn:1,fødselsdato:e().subtract(10,"day").format(n)},J={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},V={vedlegg:[]},ne={title:"OppsummeringSteg",component:M},p=({sendSøknad:m,omBarnet:R=K,utenlandsopphold:L=J,senereUtenlandsopphold:y,tidligereUtenlandsopphold:B,dokumentasjon:C=V,mellomlagreOgNaviger:F=t()})=>(I(),i.jsx("div",{id:"app",children:i.jsx(_,{initialEntries:[H.OPPSUMMERING],children:i.jsx(b,{initialState:{[a.OM_BARNET]:R,[a.UTENLANDSOPPHOLD]:L,[a.UTENLANDSOPPHOLD_SENERE]:y,[a.UTENLANDSOPPHOLD_TIDLIGERE]:B,[a.DOKUMENTASJON]:C},children:i.jsx(M,{søker:G,sendSøknad:m,mellomlagreOgNaviger:F})})})})),o=p.bind({});o.args={sendSøknad:t()};const r=p.bind({});r.args={sendSøknad:t(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:g.OMSORGSOVERTAKELSE}]}};const d=p.bind({});d.args={sendSøknad:t(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:g.OMSORGSOVERTAKELSE}]}};const s=p.bind({});s.args={sendSøknad:t(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.TERMINBEKREFTELSE,skjemanummer:g.TERMINBEKREFTELSE}]}};const l=p.bind({});l.args={sendSøknad:t(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var u,O,D;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg søker={søker} sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(D=(O=o.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var S,N,T;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg søker={søker} sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(T=(N=r.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var k,x,f;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg søker={søker} sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(f=(x=d.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var A,c,U;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg søker={søker} sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(U=(c=s.parameters)==null?void 0:c.docs)==null?void 0:U.source}}};var P,h,v;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg søker={søker} sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(v=(h=l.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const te=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{r as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,o as BarnetErFodt,s as BarnetErIkkeFodt,l as HarTidligereOgFremtidigeUtenlandsopphold,te as __namedExportsOrder,ne as default};
