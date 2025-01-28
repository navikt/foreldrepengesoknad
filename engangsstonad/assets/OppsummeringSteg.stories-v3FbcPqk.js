import{j as o}from"./index-CSZAu0_d.js";import{a as U}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as K,P,E as x,C as r}from"./useEsNavigator-2YVSfZjO.js";import{d as n,I as a}from"./dateFormValidation-gxA9mjdm.js";import{A as p,S as f}from"./attachmentType-CO8SwnHI.js";import{O as g}from"./OppsummeringSteg-BmEiEYiX.js";import"./index-CZMpeKRu.js";import"./index-D-TIQtLp.js";import"./v4-CtRu48qb.js";import"./BoIUtlandetOppsummering-lxz-p5dp.js";import"./ConfirmationPanel-CTsysHk6.js";const e=()=>(...i)=>(U("button-click")(...i),Promise.resolve()),G={erBarnetFødt:!0,antallBarn:1,fødselsdato:n().subtract(10,"day").format(a)},V={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},b={vedlegg:[]},$={title:"steg/OppsummeringSteg",component:g,render:({sendSøknad:i,omBarnet:D=G,utenlandsopphold:F=V,senereUtenlandsopphold:h,tidligereUtenlandsopphold:I,dokumentasjon:L=b,mellomlagreOgNaviger:_})=>o.jsx("div",{id:"app",children:o.jsx(K,{initialEntries:[P.OPPSUMMERING],children:o.jsx(x,{initialState:{[r.OM_BARNET]:D,[r.UTENLANDSOPPHOLD]:F,[r.UTENLANDSOPPHOLD_SENERE]:h,[r.UTENLANDSOPPHOLD_TIDLIGERE]:I,[r.DOKUMENTASJON]:L},children:o.jsx(g,{sendSøknad:i,mellomlagreOgNaviger:_})})})})},t={args:{sendSøknad:e(),mellomlagreOgNaviger:e()}},s={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:f.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},d={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:f.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},l={args:{sendSøknad:e(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.TERMINBEKREFTELSE,skjemanummer:f.TERMINBEKREFTELSE}]},mellomlagreOgNaviger:e()}},m={args:{sendSøknad:e(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:[{fom:n().format(a),tom:n().add(100,"day").format(a),landkode:"SE"},{fom:n().add(101,"day").format(a),tom:n().add(200,"day").format(a),landkode:"DK"}],tidligereUtenlandsopphold:[{fom:n().subtract(100,"day").format(a),tom:n().format(a),landkode:"IS"}],mellomlagreOgNaviger:e()}};var E,S,u;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(u=(S=t.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};var c,O,A;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
        file: {} as any,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(A=(O=s.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var k,T,j;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
        file: {} as any,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(j=(T=d.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var B,R,v;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
        file: {} as any,
        pending: false,
        uploaded: true,
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(v=(R=l.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};var N,y,M;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    utenlandsopphold: {
      harBoddUtenforNorgeSiste12Mnd: true,
      skalBoUtenforNorgeNeste12Mnd: true
    },
    senereUtenlandsopphold: [{
      fom: dayjs().format(ISO_DATE_FORMAT),
      tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
      landkode: 'SE'
    }, {
      fom: dayjs().add(101, 'day').format(ISO_DATE_FORMAT),
      tom: dayjs().add(200, 'day').format(ISO_DATE_FORMAT),
      landkode: 'DK'
    }],
    tidligereUtenlandsopphold: [{
      fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
      tom: dayjs().format(ISO_DATE_FORMAT),
      landkode: 'IS'
    }],
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(M=(y=m.parameters)==null?void 0:y.docs)==null?void 0:M.source}}};const ee=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{s as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,l as BarnetErIkkeFodt,m as HarTidligereOgFremtidigeUtenlandsopphold,ee as __namedExportsOrder,$ as default};
