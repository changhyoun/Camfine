import{r as i,j as e,L}from"./index-CpkGts6T.js";import{a as F,q as b,e as g,b as u,w as N,f as w,c as D,d as y}from"./firebase-CHsPK2My.js";import{H as C}from"./Header-DVpIRjzm.js";import{F as S}from"./Footer-CXUeXsr1.js";import{l as q}from"./logo-white-Dc61GIvB.js";import"./logo-blue-BTOPC52m.js";const k="/Camfine/assets/FavoriteList_unplus-Dy9idDkV.png",B="/Camfine/assets/FavoriteList_here_man-B-k3hkji.png",H="/Camfine/assets/FavoriteList_here_bubble-B4BUKcpi.png",I="/Camfine/assets/FavoriteList_not-CiNqoT9B.png",E="/Camfine/assets/FavoriteList_delete_pop-f6BjqW7M.png",M="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";function K(){const[a,l]=i.useState([]),[_,n]=i.useState(!0),[r,c]=i.useState(null),[d,o]=i.useState(!1),[p,m]=i.useState(null);i.useEffect(()=>{const s=F.onAuthStateChanged(t=>{c(t||null)});return()=>s()},[]),i.useEffect(()=>{(async()=>{if(r){n(!0);try{const t=b(g(u,"favorites"),N("uid","==",r.uid)),j=(await w(t)).docs.map(h=>({id:h.id,...h.data()}));l(j)}catch(t){console.error("찜 목록을 불러오는 중 오류가 발생했습니다:",t.message)}finally{n(!1)}}})()},[r]);const f=async()=>{try{await D(y(u,"favorites",p)),l(a.filter(s=>s.id!==p)),o(!1)}catch(s){console.error("찜 삭제 오류:",s.message)}},v=s=>{m(s),o(!0)},x=()=>{o(!1),m(null)};return r?e.jsxs("div",{id:"FavoriteList",children:[e.jsx(C,{logo:q}),e.jsxs("div",{className:`FavoriteList_main ${d?"dimmed":""}`,children:[" ",e.jsx("div",{className:"FavoriteList_main_inner",children:_?e.jsx("div",{children:"로딩 중..."}):e.jsx("ul",{children:a.length>0?a.map((s,t)=>e.jsx("li",{className:"favorite_campList",children:e.jsxs("div",{className:"favorite_campList_warp",children:[e.jsx("div",{className:"favorite_campList_top",children:e.jsxs(L,{to:`/camp/${s.contentId}`,state:{camp:s,campList:a},children:[e.jsx("img",{src:s.firstImageUrl||M,alt:s.name,style:{cursor:"pointer"}}),e.jsx("img",{src:B,alt:"FavoriteList_here_man"}),e.jsx("img",{src:H,alt:"FavoriteList_here_bubble"}),e.jsxs("p",{children:["이미지를",e.jsx("br",{}),"클릭해보세요!"]})]})}),e.jsxs("div",{className:"favorite_campList_bt",children:[e.jsxs("div",{className:"favorite_campList_bt_lt",children:[e.jsx("h3",{children:s.facltNm}),e.jsx("p",{children:s.addr1})]}),e.jsx("div",{className:"favorite_campList_bt_rt",children:e.jsx("img",{src:k,alt:"FavoriteList_unplus",onClick:()=>v(s.id),style:{cursor:"pointer"}})})]})]})},t)):e.jsxs("li",{className:"not_favorite",children:[e.jsx("img",{src:I,alt:"FavoriteList_not"}),e.jsx("p",{children:"찜한 장소가 없어요!"})]})})})]}),d&&e.jsx("div",{className:"fav_delete_pop",children:e.jsxs("div",{className:"fav_delete_pop_warp",children:[e.jsx("h3",{children:"찜을 삭제하시겠어요?"}),e.jsx("img",{src:E,alt:"FavoriteList_delete_pop"}),e.jsxs("div",{className:"delete_btn_warp",children:[e.jsx("button",{onClick:f,children:"삭제"}),e.jsx("button",{onClick:x,children:"취소"})]})]})}),e.jsx(S,{})]}):e.jsx("div",{children:"로그인이 필요합니다."})}export{K as default};
