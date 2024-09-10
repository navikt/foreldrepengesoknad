import{d as n,I as a,i as U,j as r}from"./dateFormValidation-b0EBdARO.js";import{a as K}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as P,P as x,E as G,C as o}from"./useEsNavigator-50oJaivO.js";import{A as p,S as f}from"./OmBarnet-BV6De4cI.js";import{O as g}from"./OppsummeringSteg-C9148BCh.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./BoIUtlandetOppsummeringspunkt-BjEge-qC.js";import"./apiInterceptor-DfqAa4et.js";import"./ConfirmationPanel-BTriDX0A.js";const e=()=>(...i)=>(K("button-click")(...i),Promise.resolve()),V={erBarnetFødt:!0,antallBarn:1,fødselsdato:n().subtract(10,"day").format(a)},b={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},z={vedlegg:[]},ne={title:"steg/OppsummeringSteg",component:g,render:({sendSøknad:i,omBarnet:h=V,utenlandsopphold:D=b,senereUtenlandsopphold:F,tidligereUtenlandsopphold:I,dokumentasjon:L=z,mellomlagreOgNaviger:_})=>(U(),r.jsx("div",{id:"app",children:r.jsx(P,{initialEntries:[x.OPPSUMMERING],children:r.jsx(G,{initialState:{[o.OM_BARNET]:h,[o.UTENLANDSOPPHOLD]:D,[o.UTENLANDSOPPHOLD_SENERE]:F,[o.UTENLANDSOPPHOLD_TIDLIGERE]:I,[o.DOKUMENTASJON]:L},children:r.jsx(g,{sendSøknad:i,mellomlagreOgNaviger:_})})})}))},t={args:{sendSøknad:e(),mellomlagreOgNaviger:e()}},d={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:f.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},s={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:f.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},l={args:{sendSøknad:e(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.TERMINBEKREFTELSE,skjemanummer:f.TERMINBEKREFTELSE}]},mellomlagreOgNaviger:e()}},m={args:{sendSøknad:e(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:n().format(a),tom:n().add(100,"day").format(a),landkode:"SE"},{fom:n().add(101,"day").format(a),tom:n().add(200,"day").format(a),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:n().subtract(100,"day").format(a),tom:n().format(a),landkode:"IS"}]},mellomlagreOgNaviger:e()}};var E,u,S;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(S=(u=t.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var c,O,A;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    omBarnet: {
      adopsjonAvEktefellesBarn: true,
      antallBarn: 1,
      adopsjonsdato: '2023-01-01',
      fødselsdatoer: [{
        dato: '2023-01-01'
      }]
    },
    dokumentasjon: {
      vedlegg: [{
        id: '1',
        filename: 'filnavn.pdf',
        filesize: 2323,
        file: ({} as any),
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(A=(O=d.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var k,T,j;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    omBarnet: {
      adopsjonAvEktefellesBarn: true,
      antallBarn: 1,
      adopsjonsdato: '2023-01-01',
      fødselsdatoer: [{
        dato: '2023-01-01'
      }, {
        dato: '2020-01-01'
      }]
    },
    dokumentasjon: {
      vedlegg: [{
        id: '1',
        filename: 'filnavn.pdf',
        filesize: 2323,
        file: ({} as any),
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(j=(T=s.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var B,R,N;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    omBarnet: {
      erBarnetFødt: false,
      antallBarn: 1,
      termindato: '2023-01-02'
    },
    dokumentasjon: {
      terminbekreftelsedato: '2023-01-01',
      vedlegg: [{
        id: '1',
        filename: 'filnavn.pdf',
        filesize: 2323,
        file: ({} as any),
        pending: false,
        uploaded: true,
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(N=(R=l.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};var M,v,y;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    utenlandsopphold: {
      harBoddUtenforNorgeSiste12Mnd: true,
      skalBoUtenforNorgeNeste12Mnd: true
    },
    senereUtenlandsopphold: {
      utenlandsoppholdNeste12Mnd: [{
        fom: dayjs().format(ISO_DATE_FORMAT),
        tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
        landkode: 'SE'
      }, {
        fom: dayjs().add(101, 'day').format(ISO_DATE_FORMAT),
        tom: dayjs().add(200, 'day').format(ISO_DATE_FORMAT),
        landkode: 'DK'
      }]
    },
    tidligereUtenlandsopphold: {
      utenlandsoppholdSiste12Mnd: [{
        fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
        tom: dayjs().format(ISO_DATE_FORMAT),
        landkode: 'IS'
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(y=(v=m.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const ae=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{d as AdopsjonAvEktefellesBarn,s as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,l as BarnetErIkkeFodt,m as HarTidligereOgFremtidigeUtenlandsopphold,ae as __namedExportsOrder,ne as default};
