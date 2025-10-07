import{s as n,j as o,a5 as a}from"./iframe-CYfAXXaj.js";import{M as k,P as T,E as j,C as r}from"./useEsNavigator-C8_AUVpv.js";import{S as i,A as p}from"./attachmentType-DJ1vFT-G.js";import{O as f}from"./OppsummeringSteg-BQsBe7Ph.js";import"./preload-helper-D9Z9MdNV.js";const{action:B}=__STORYBOOK_MODULE_ACTIONS__,e=()=>()=>(B("button-click")(),Promise.resolve()),R={erBarnetFødt:!0,antallBarn:1,fødselsdato:n().subtract(10,"day").format(a)},N={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},v={vedlegg:[]},h={title:"steg/OppsummeringSteg",component:f,render:({sendSøknad:g,omBarnet:E=R,utenlandsopphold:u=N,senereUtenlandsopphold:S,tidligereUtenlandsopphold:O,dokumentasjon:c=v,mellomlagreOgNaviger:A})=>o.jsx("div",{id:"app",children:o.jsx(k,{initialEntries:[T.OPPSUMMERING],children:o.jsx(j,{initialState:{[r.OM_BARNET]:E,[r.UTENLANDSOPPHOLD]:u,[r.UTENLANDSOPPHOLD_SENERE]:S,[r.UTENLANDSOPPHOLD_TIDLIGERE]:O,[r.DOKUMENTASJON]:c},children:o.jsx(f,{sendSøknad:g,mellomlagreOgNaviger:A})})})})},t={args:{sendSøknad:e(),mellomlagreOgNaviger:e()}},s={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE,url:null}]},mellomlagreOgNaviger:e()}},d={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE,url:null}]},mellomlagreOgNaviger:e()}},l={args:{sendSøknad:e(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.TERMINBEKREFTELSE,skjemanummer:i.TERMINBEKREFTELSE,url:null}]},mellomlagreOgNaviger:e()}},m={args:{sendSøknad:e(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:[{fom:n().format(a),tom:n().add(100,"day").format(a),landkode:"SE"},{fom:n().add(101,"day").format(a),tom:n().add(200,"day").format(a),landkode:"DK"}],tidligereUtenlandsopphold:[{fom:n().subtract(100,"day").format(a),tom:n().format(a),landkode:"IS"}],mellomlagreOgNaviger:e()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
        url: null
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
        url: null
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        url: null
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const L=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{s as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,l as BarnetErIkkeFodt,m as HarTidligereOgFremtidigeUtenlandsopphold,L as __namedExportsOrder,h as default};
