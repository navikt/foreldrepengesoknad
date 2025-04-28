import{j as r}from"./jsx-runtime-CLpGMVip.js";import{h as d,H as u}from"./index-B-Pz4-0B.js";import{w as E}from"./withQueryClient-D8gqxQ_c.js";import{O as o}from"./routes-DFMVI8wI.js";import{E as p}from"./ForeldrepengeoversiktRoutes-B1HkDC0x.js";import{M as S,R as h,a as R}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./decorators-DIzpaN6C.js";import"./QueryClientProvider-XbgLbB-5.js";import"./index-CR__hKHy.js";import"./index-46qmyZAO.js";import"./UttaksplanKalender-fdl5iC_B.js";import"./dates-C5Vjd-yy.js";import"./index-DjWdgH6H.js";import"./iframe-zbhDMdcg.js";import"./dateFormValidation-D8SusLeJ.js";import"./Label-vuqQZ1tj.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./UttaksdagenString-DgzxJ_GZ.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./lodash-HAqS6-7H.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-CBUXu06m.js";import"./useQuery-B2xbgnn4.js";import"./api-CV6oBBCk.js";import"./sakerUtils-RVZHnfb5.js";import"./Snarveier-BO06wc6r.js";import"./LenkePanel-DNW8h9lC.js";import"./Dokument-BE9PeW-A.js";import"./dokumenterUtils-CvwGMKl2.js";import"./Tag-DiV4T64p.js";import"./GrupperteDokumenter-Bm7LYOaS.js";import"./guid-CsArkN6i.js";import"./Header-CwyYwgDj.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-C3F66Mxc.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-DspS55ah.js";import"./MinidialogSkjema-wi87L5w-.js";import"./List-BF8Q7PNh.js";import"./BekreftelseSendtSøknad-CIwuXKjZ.js";import"./KontonummerInfo-BsnIeNnQ.js";import"./HarIkkeSaker-CDKOtJYi.js";import"./SøkelenkerPanel-D3VHkPCq.js";import"./HarSaker-BoDdB6OO.js";import"./SakLink-fjHqApG7.js";import"./ContentSection-DqBoVSpP.js";import"./Svangerskapspenger-DzODcHQq.js";import"./DinPlan-Dei7UxEq.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B5db6rmL.js";import"./OppgaveLenkepanel-DKvpg5iy.js";import"./KontaktOss-BS4Rot9y.js";const Lt={title:"EttersendingPage",component:p,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return r.jsx(S,{initialEntries:[`/${o.ETTERSEND}/1${f}`],children:r.jsx(h,{children:r.jsx(R,{element:r.jsx(p,{...c}),path:`/${o.ETTERSEND}/:saksnummer`})})})}},t={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:t.args};var n,a,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(m=(a=t.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var i,l,g;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(g=(l=e.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const Mt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,t as SkalIkkeFeileOpplasting,Mt as __namedExportsOrder,Lt as default};
