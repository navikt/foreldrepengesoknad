try{
(()=>{var w=__STORYBOOK_API__,{ActiveTabs:D,Consumer:v,ManagerContext:H,Provider:x,RequestResponseError:M,addons:s,combineParameters:U,controlOrMetaKey:F,controlOrMetaSymbol:G,eventMatchesShortcut:N,eventToShortcut:W,experimental_requestResponse:K,isMacLike:Y,isShortcutTaken:q,keyToSymbol:V,merge:Z,mockChannel:z,optionOrAltSymbol:j,shortcutMatchesShortcut:J,shortcutToHumanString:Q,types:d,useAddonState:$,useArgTypes:X,useArgs:oo,useChannel:u,useGlobalTypes:no,useGlobals:p,useParameter:eo,useSharedState:co,useStoryPrepared:to,useStorybookApi:ro,useStorybookState:Io}=__STORYBOOK_API__;var r=__REACT__,{Children:uo,Component:po,Fragment:mo,Profiler:So,PureComponent:Co,StrictMode:ho,Suspense:To,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:bo,cloneElement:_o,createContext:Ao,createElement:go,createFactory:yo,createRef:ko,forwardRef:Oo,isValidElement:Bo,lazy:Lo,memo:fo,startTransition:Ro,unstable_act:Po,useCallback:Eo,useContext:wo,useDebugValue:Do,useDeferredValue:vo,useEffect:Ho,useId:xo,useImperativeHandle:Mo,useInsertionEffect:Uo,useLayoutEffect:Fo,useMemo:Go,useReducer:No,useRef:Wo,useState:Ko,useSyncExternalStore:Yo,useTransition:qo,version:Vo}=__REACT__;var Qo=__STORYBOOK_COMPONENTS__,{A:$o,ActionBar:Xo,AddonPanel:on,Badge:nn,Bar:en,Blockquote:cn,Button:tn,ClipboardCode:rn,Code:In,DL:an,Div:ln,DocumentWrapper:sn,EmptyTabContent:dn,ErrorFormatter:un,FlexBar:pn,Form:mn,H1:Sn,H2:Cn,H3:hn,H4:Tn,H5:bn,H6:_n,HR:An,IconButton:m,IconButtonSkeleton:gn,Icons:yn,Img:kn,LI:On,Link:Bn,ListItem:Ln,Loader:fn,Modal:Rn,OL:Pn,P:En,Placeholder:wn,Pre:Dn,ResetWrapper:vn,ScrollArea:Hn,Separator:xn,Spaced:Mn,Span:Un,StorybookIcon:Fn,StorybookLogo:Gn,Symbols:Nn,SyntaxHighlighter:Wn,TT:Kn,TabBar:Yn,TabButton:qn,TabWrapper:Vn,Table:Zn,Tabs:zn,TabsState:jn,TooltipLinkList:S,TooltipMessage:Jn,TooltipNote:Qn,UL:$n,WithTooltip:C,WithTooltipPure:Xn,Zoom:oe,codeCommon:ne,components:ee,createCopyToClipboardFunction:ce,getStoryHref:te,icons:re,interleaveSeparators:Ie,nameSpaceClassNames:ae,resetComponents:le,withReset:ie}=__STORYBOOK_COMPONENTS__;var me=__STORYBOOK_ICONS__,{AccessibilityAltIcon:Se,AccessibilityIcon:Ce,AddIcon:he,AdminIcon:Te,AlertAltIcon:be,AlertIcon:_e,AlignLeftIcon:Ae,AlignRightIcon:ge,AppleIcon:ye,ArrowDownIcon:ke,ArrowLeftIcon:Oe,ArrowRightIcon:Be,ArrowSolidDownIcon:Le,ArrowSolidLeftIcon:fe,ArrowSolidRightIcon:Re,ArrowSolidUpIcon:Pe,ArrowUpIcon:Ee,AzureDevOpsIcon:we,BackIcon:De,BasketIcon:ve,BatchAcceptIcon:He,BatchDenyIcon:xe,BeakerIcon:Me,BellIcon:Ue,BitbucketIcon:Fe,BoldIcon:Ge,BookIcon:Ne,BookmarkHollowIcon:We,BookmarkIcon:Ke,BottomBarIcon:Ye,BottomBarToggleIcon:qe,BoxIcon:Ve,BranchIcon:Ze,BrowserIcon:ze,ButtonIcon:je,CPUIcon:Je,CalendarIcon:Qe,CameraIcon:$e,CategoryIcon:Xe,CertificateIcon:oc,ChangedIcon:nc,ChatIcon:ec,CheckIcon:cc,ChevronDownIcon:tc,ChevronLeftIcon:rc,ChevronRightIcon:Ic,ChevronSmallDownIcon:ac,ChevronSmallLeftIcon:lc,ChevronSmallRightIcon:ic,ChevronSmallUpIcon:sc,ChevronUpIcon:dc,ChromaticIcon:uc,ChromeIcon:pc,CircleHollowIcon:mc,CircleIcon:Sc,ClearIcon:Cc,CloseAltIcon:hc,CloseIcon:Tc,CloudHollowIcon:bc,CloudIcon:_c,CogIcon:Ac,CollapseIcon:gc,CommandIcon:yc,CommentAddIcon:kc,CommentIcon:Oc,CommentsIcon:Bc,CommitIcon:Lc,CompassIcon:fc,ComponentDrivenIcon:Rc,ComponentIcon:Pc,ContrastIcon:Ec,ControlsIcon:wc,CopyIcon:Dc,CreditIcon:vc,CrossIcon:Hc,DashboardIcon:xc,DatabaseIcon:Mc,DeleteIcon:Uc,DiamondIcon:Fc,DirectionIcon:Gc,DiscordIcon:Nc,DocChartIcon:Wc,DocListIcon:Kc,DocumentIcon:Yc,DownloadIcon:qc,DragIcon:Vc,EditIcon:Zc,EllipsisIcon:zc,EmailIcon:jc,ExpandAltIcon:Jc,ExpandIcon:Qc,EyeCloseIcon:$c,EyeIcon:Xc,FaceHappyIcon:ot,FaceNeutralIcon:nt,FaceSadIcon:et,FacebookIcon:ct,FailedIcon:tt,FastForwardIcon:rt,FigmaIcon:It,FilterIcon:at,FlagIcon:lt,FolderIcon:it,FormIcon:st,GDriveIcon:dt,GithubIcon:ut,GitlabIcon:pt,GlobeIcon:h,GoogleIcon:mt,GraphBarIcon:St,GraphLineIcon:Ct,GraphqlIcon:ht,GridAltIcon:Tt,GridIcon:bt,GrowIcon:_t,HeartHollowIcon:At,HeartIcon:gt,HomeIcon:yt,HourglassIcon:kt,InfoIcon:Ot,ItalicIcon:Bt,JumpToIcon:Lt,KeyIcon:ft,LightningIcon:Rt,LightningOffIcon:Pt,LinkBrokenIcon:Et,LinkIcon:wt,LinkedinIcon:Dt,LinuxIcon:vt,ListOrderedIcon:Ht,ListUnorderedIcon:xt,LocationIcon:Mt,LockIcon:Ut,MarkdownIcon:Ft,MarkupIcon:Gt,MediumIcon:Nt,MemoryIcon:Wt,MenuIcon:Kt,MergeIcon:Yt,MirrorIcon:qt,MobileIcon:Vt,MoonIcon:Zt,NutIcon:zt,OutboxIcon:jt,OutlineIcon:Jt,PaintBrushIcon:Qt,PaperClipIcon:$t,ParagraphIcon:Xt,PassedIcon:or,PhoneIcon:nr,PhotoDragIcon:er,PhotoIcon:cr,PinAltIcon:tr,PinIcon:rr,PlayBackIcon:Ir,PlayIcon:ar,PlayNextIcon:lr,PlusIcon:ir,PointerDefaultIcon:sr,PointerHandIcon:dr,PowerIcon:ur,PrintIcon:pr,ProceedIcon:mr,ProfileIcon:Sr,PullRequestIcon:Cr,QuestionIcon:hr,RSSIcon:Tr,RedirectIcon:br,ReduxIcon:_r,RefreshIcon:Ar,ReplyIcon:gr,RepoIcon:yr,RequestChangeIcon:kr,RewindIcon:Or,RulerIcon:Br,SearchIcon:Lr,ShareAltIcon:fr,ShareIcon:Rr,ShieldIcon:Pr,SideBySideIcon:Er,SidebarAltIcon:wr,SidebarAltToggleIcon:Dr,SidebarIcon:vr,SidebarToggleIcon:Hr,SpeakerIcon:xr,StackedIcon:Mr,StarHollowIcon:Ur,StarIcon:Fr,StickerIcon:Gr,StopAltIcon:Nr,StopIcon:Wr,StorybookIcon:Kr,StructureIcon:Yr,SubtractIcon:qr,SunIcon:Vr,SupportIcon:Zr,SwitchAltIcon:zr,SyncIcon:jr,TabletIcon:Jr,ThumbsUpIcon:Qr,TimeIcon:$r,TimerIcon:Xr,TransferIcon:oI,TrashIcon:nI,TwitterIcon:eI,TypeIcon:cI,UbuntuIcon:tI,UndoIcon:rI,UnfoldIcon:II,UnlockIcon:aI,UnpinIcon:lI,UploadIcon:iI,UserAddIcon:sI,UserAltIcon:dI,UserIcon:uI,UsersIcon:pI,VSCodeIcon:mI,VerifiedIcon:SI,VideoIcon:CI,WandIcon:hI,WatchIcon:TI,WindowsIcon:bI,WrenchIcon:_I,YoutubeIcon:AI,ZoomIcon:gI,ZoomOutIcon:yI,ZoomResetIcon:kI,iconList:OI}=__STORYBOOK_ICONS__;var b="storybook/i18n-addon",_="storybook/i18n-addon/tool",A="LOCALE_CHANGED",g=o=>typeof o=="string"?{title:o}:{title:o.title||"",icon:o.icon,right:o.right},y=(o,a,I)=>o?Object.entries(o).map(([t,l])=>({...g(l),id:t,active:t===a,onClick:()=>I(t)})):[{id:"none",title:"No locales in parameters",active:!0,onClick:()=>{}}],k=()=>{let[o,a]=p(),{locale:I,locales:t}=o,l=u({});return r.createElement(C,{closeOnOutsideClick:!0,placement:"top",tooltip:({onHide:T})=>r.createElement(S,{links:y(t,I,i=>{i!==I&&(a({locale:i}),l(A,i)),T()})}),trigger:"click"},r.createElement(m,{key:"i18n-locale",title:"Locale Selector"},r.createElement(h,null)))},O=k;s.register(b,()=>{s.add(_,{title:"Storybook i18n",type:d.TOOL,match:({viewMode:o})=>!!o?.match(/^(story|docs)$/),render:O})});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
