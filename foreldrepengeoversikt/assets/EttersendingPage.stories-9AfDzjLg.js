import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as E}from"./useQuery-D4bRZ7iC.js";import{h as d,H as u}from"./index-B-Pz4-0B.js";import{O as o}from"./routes-DFMVI8wI.js";import{E as n}from"./ForeldrepengeoversiktRoutes-CHRUugIt.js";import{Q as S}from"./queryClient-DpQYMfvj.js";import{M as h,R as j,a as R}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./UttaksplanKalender-ofdcBkn-.js";import"./dates-C5Vjd-yy.js";import"./index-DjWdgH6H.js";import"./iframe-_ot-BqAy.js";import"./dateFormValidation-DXIVDO2q.js";import"./Label-vuqQZ1tj.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./UttaksdagenString-B8Yb1Gis.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./lodash-HAqS6-7H.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-DaKIy5a-.js";import"./api-l2Seuk3V.js";import"./sakerUtils-BLRcdn6E.js";import"./Snarveier-CFSQkx2I.js";import"./LenkePanel-DNW8h9lC.js";import"./Dokument-DYWDqIcq.js";import"./dokumenterUtils-teRJOGbX.js";import"./Tag-DiV4T64p.js";import"./GrupperteDokumenter-DokoUGfA.js";import"./guid-CsArkN6i.js";import"./Header-BIJADFh-.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-C3F66Mxc.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-DspS55ah.js";import"./MinidialogSkjema-DOV45jc8.js";import"./skjemanummer-DfIZjofp.js";import"./BekreftelseSendtSøknad-CJbkuYAf.js";import"./KontonummerInfo-BsnIeNnQ.js";import"./HarIkkeSaker-CDKOtJYi.js";import"./SøkelenkerPanel-D3VHkPCq.js";import"./HarSaker-CFuQNgjt.js";import"./SakLink-BkGHkN5r.js";import"./ContentSection-DqBoVSpP.js";import"./Svangerskapspenger-BDoB8bPk.js";import"./DinPlan-DTZFgWBH.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BfqTipZf.js";import"./OppgaveLenkepanel-BUEjP4nd.js";import"./KontaktOss-BS4Rot9y.js";const v=new S({defaultOptions:{queries:{retry:!1}}}),qt={title:"EttersendingPage",component:n,render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(E,{client:v,children:t.jsx(h,{initialEntries:[`/${o.ETTERSEND}/1${f}`],children:t.jsx(j,{children:t.jsx(R,{element:t.jsx(n,{...c}),path:`/${o.ETTERSEND}/:saksnummer`})})})})}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:r.args};var p,a,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: 'ENGANGSSTØNAD',
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...(m=(a=r.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var i,l,g;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(g=(l=e.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const Ct=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Ct as __namedExportsOrder,qt as default};
