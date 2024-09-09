import{j as e,r as o,u as X,L as w}from"./index-BM61hHTN.js";import{a as Z}from"./axios-BimPEqV4.js";import{H as q}from"./Header-BhWNqgeF.js";import{F as J}from"./Footer-BY9tv4NC.js";import"./firebase-BQj9tTEp.js";const z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGBSURBVHgB7dU9L0NRHMfx/6WthHiolGjiYWDjBRASE2YGDCwMJhOLsSJiEQMSb8HGKAabVdgkTatLmyBt0kmIXt+jp3Fy3ducyLWIX/LJ7bn9n6ec21uRPxvXdXswLb8VBl/DlWVtI/ZxjhGbDjGkUcGERf2c+5Uz87uGgD7rSOIVu3RKSP0UdK3Kg1isqA+neMEAmi36jGEWrWJRnEBJb3lVwgwDRvTqa3lWq5OwwmBb+nAregJ1vbM4B9/4HXIRM8jq9goO0CJhhdWOGjs4RoOEFQaL48Y4gzfMSxhRK8WR+z1Z9MsP4ngm2OCyI9Ufzju6kMEQ7jEJddiqrs0zVhkpx3GKgbMxwRTG0YRt5PSuhrGATn0/KCmxDcV7KHjutRs/QDM5/VAUVY3Zp97TEUXMc28JHT61myghjmWx3MEhyka7162+Yb3JoBsXup1XtbY7iBrtRQz61N1ysI9ca/8dSV37mYgEJ49ro/2kBzGfPBcn+vOlVN8A6l5a/mObD2GSluFehv1gAAAAAElFTkSuQmCC",$="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFZSURBVHgB7ZSxK0VRHMd/F3kxUG8wyEJRsikzyqBYrAy8gVUZbP4Gg2Jie2VQT6lnUzYDo7IoihIvUYTwjs/pHTkd59zX9e5geJ/61O2+3+/7u+ee865InSpESYqVUkumZzWKorKkCeGD+GoclbQhdFP9UJA0IbAfn60BnzgsaUHYhvpNEZukVggZw3fPgA9clFrQT4iHKswdtshfoXkhEPxkXa9jouP+Hd6JF4EBW1gw1y84LkmhadcTrPfiAY+xFWfNam5xLkn4pKocRZcjzKvKn63P1I7gpRnc62Y1eMJ145rvNyjiNjbitLl3giVsxgGp8uSRqpxvH284hBmzklNsxyksm5oz/eriBiyrMPtW3Yy5t4IHTp0+VRlf+ASWYgbkrNo2PMdHsx82ejXzbng3XsWEX2PW6cnF1N9gj1gbqXc/G3pzmOf7f+/c38G9QE8Hdkmdf8EXoyltWiZrtY0AAAAASUVORK5CYII=",ee="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGGSURBVHgB7ZQ9SANBEIXnzkMQDdimEAP2RhA7IVcJFqKFlY3aaKmNlY1gKahgLVY2NpLORvCvM4KdBEQtFIwgGC1EJKxvuAHX8czdBlMIPvhymcnbnd3J3hL9dXnGGA/PcTDMMTWuV7Dped7ZlywK9IBn8zu60lUD0AUyElfARczqfDAA2shRgYpnscWiNkkbOT8iqRtwDGqW7Q3sJBV4ohihKG//UcJLMITcNaVQQO665clRkFu7DLqt3ww4BKvwvMQVqHeKfBUvgEkr5lN0CkKwD07iCsxjZTn6rhZQULmMipfACrfTTuoCo0IjqujJWT41WbwDPjkHDmPOf8jn0N4wpTdZmGwrxZtdCPDRB/8cuStMY+IWdYIpapL4T86qHN9HJYpeGheVZaytLPfyXvWtH3SAI5Ne7G0HvSr/wC2aoOhGHRPerRXcgUWqrw3re6s8dym6HD93hGqDoCo7KssK1ihB8KyDGijJ2KocnFhzHmyDIpgGiZche8AM2JOxefqXiz4AIBNkfMp8vx8AAAAASUVORK5CYII=",se="/Camfine/assets/main_se1_slide_img1-SPo0Apwo.jpg",ae="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALkSURBVHgB7ZbLS1RhFMDP+a7ji4YgsJqCgl4UCT4QkoyMyIVajo9mU9Y2Ahkx/QsKAiHKmVy0m0XYQo0yJhflooVOhs1r0aZoUQtfhWGW4Hjvdzq3GUGcO/cxroJ+MNyPe879ftzzne+7A/AvQUTYGoi/0n/6GPKgAPLAG0yeEwgN+rhtMFHPlzfgEAF5IFB2boyJ4CrkgeMyXQpGaxUQkzxUMrc0ElrdWFfNOwfTOHvjtkCyXACGNkl1FCQlpMfAAbbEegN5H0Z7CCmCgMezE+AEx6Zbg4leu81mmeS7H9mVcpU8QgIf2IAARgtV142RW+VLkK+4/V7soCzEMR5WgDOSKUHe8a7qL+BU3DIwvUeI4gl+B0drtwF3+wdR6D7/7OaRRaO44Rr7hocVIYpC+Up1EOEkpVZCPt+wYlucWjjm50sjbBeEptTZw37j0BZa+ifdSsmOzwRUBiZwfB4IO3gXl2IBvjaRL7p3eg49vr739+bbWW8sSko7raSsndM0pXmsuyrCu3jVPBV2Ly/PX8vyZCUingHTeWhe1ZSL4Z6KWEswUcUlGwULkChrzgKDmWsht3ZOEyz1p6WC6CWX0gOWYji19Z5Rc+WciEi9HO5KSxWQ43akmSf3W4rJ7BhVXelrKpNpF8xuYpGdA7OQ63kXjLYPJqtf9FXGNVCauARzYMsrZi3FfOK8h9x4pJThv3J/ZVyiaLYj59rMWIsFTIE5afmDjFyg9ccD6a2luIjoCWeugJVckWFvIH5aoCi2yP2prmlDluIRf/U3rs0AWOPh83gKpJwwSyJJA+G+mu+WYp3V1EI/r10Mtk9U+yH7jQI5P4sdgfhRFWmCd8IByANu0q+oYsPz3sqPRvGce/Zpd9UnjfACD6PgWEqJdROpqVgnzPLVtcV63g63eT2XwZpfbL2jLcm6cROpju2/t413Y2VFbrxCUtYhihou5T79EOalmJUEM0KIiLq2PmTUSP/R+QOc8SjRWalgCAAAAABJRU5ErkJggg==",ne="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALcSURBVHgB7ZbdSxRRFMDPueOaZU+BfT4EBX3Q0qoYRhsWpA8q7Ga60OezVLIm+g9UEPXkrthDEOWLPmhSxloQRU8uiLrrkk9GL0JZ2QehGLuzc09nNghpd+fOjE9BP1jm7tzD/XHunHtmAP4liAhPR5MvzJ85BheUgAtaIrMnQIMGcxzsS53ky2twiAAXoAcu/FmA5EVwgeNtCvZP1yJpE0Cc828MEsI/1uGbdLKOo4xboikvSx+ukZpoII0Bcw4cYEtsFlAwmuwhlJMsPfj3PAIeIJDxYGSmy26xKYNC9+e26Kv6PR62gQ2IYKTco7UPXTn8HdyKm/oTu0sljvHQB46glEeWBkaueRfAqTgQebMNMfsKEQ6BK3AOPXjq8WXf50KzBZ9xaHhYEyL7wL3UhLyky4FQaFizLc582hvmSxOsn8ZM3b5woYm8rQ7dndusS/0dV+9WKAZRPQH+BKRRrujtYM2SR/PsGbnqXVl7My/jtJG5ZCk1vSwd66yKG4bWjCA/gjUVaZnN6255Yg3QDwp4mx4F+qaqYl2+hG6UNBOQpVxDOK4UE2ItqM07BJWMB/pmc3JDWGdOUh5Vivn57QI7mHKg8VzmHb6EJNFaNJZgp1oM5KB/Ex8BG1ECUSlGEO/BlpMWJYjmpz1Hkmf6U9WCK7xYKBIsKsVcKNNgR4osDVfmpCSNcbI+VlNKMaccB5UXsC0n7bUlBVlgzfxzTDTEl2WwADXa2BpNHiNNLeXoZVm6aVApfh6uXuKS6QUrJL40ECbUUg4lGYm17/+iFJsYX407fKATsF6IErJM3i40VVAcu16zCtn0Oc686PtU6QRa4C54NtbOa9kVmzzprp3XdWzgFWbBsZVmDML60c6qt8VCLJvFs+7K+ew3w88H8Sb/XQE1P0jCjWyZrItZSE1sf9423kpUbCjH8/xR50cUNWS2Qe4M/Fr8IAmmhBDxbLpsMNaTX0j/MfkFdNAxKbVnFO0AAAAASUVORK5CYII=",ie="data:image/png;base64,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",oe="data:image/png;base64,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",te="data:image/png;base64,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";function b({Main_se1_box_ic:i,Main_se1_box_tx:p}){return e.jsxs("div",{className:"Main_se1_box",children:[e.jsx("img",{src:i,alt:"Main_se1_box_icon"}),e.jsx("p",{children:p})]})}var G={ADSK_CLM_WPAD_PROXY_CHECK:"FALSE",ALLUSERSPROFILE:"C:\\ProgramData",APPDATA:"C:\\Users\\gg\\AppData\\Roaming",CHROME_CRASHPAD_PIPE_NAME:"\\\\.\\pipe\\crashpad_23292_FOEJPCNQCKYAMHOT",COLOR:"1",COLORTERM:"truecolor",CommonProgramFiles:"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files",CommonProgramW6432:"C:\\Program Files\\Common Files",COMPUTERNAME:"DESKTOP-I4H25K8",ComSpec:"C:\\Windows\\system32\\cmd.exe",DriverData:"C:\\Windows\\System32\\Drivers\\DriverData",EDITOR:"C:\\Windows\\notepad.exe",FPS_BROWSER_APP_PROFILE_STRING:"Internet Explorer",FPS_BROWSER_USER_PROFILE_STRING:"Default",GIT_ASKPASS:"c:\\Users\\gg\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh",HOME:"C:\\Users\\gg",HOMEDRIVE:"C:",HOMEPATH:"\\Users\\gg",INIT_CWD:"C:\\Users\\gg\\Documents\\Camfine",LANG:"en_US.UTF-8",LOCALAPPDATA:"C:\\Users\\gg\\AppData\\Local",LOGONSERVER:"\\\\DESKTOP-I4H25K8",NODE:"C:\\Program Files\\nodejs\\node.exe",NODE_ENV:"production",NODE_EXE:"C:\\Program Files\\nodejs\\\\node.exe",NPM_CLI_JS:"C:\\Users\\gg\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js",npm_command:"run-script",npm_config_cache:"C:\\Users\\gg\\AppData\\Local\\npm-cache",npm_config_globalconfig:"C:\\Users\\gg\\AppData\\Roaming\\npm\\etc\\npmrc",npm_config_global_prefix:"C:\\Users\\gg\\AppData\\Roaming\\npm",npm_config_init_module:"C:\\Users\\gg\\.npm-init.js",npm_config_local_prefix:"C:\\Users\\gg\\Documents\\Camfine",npm_config_node_gyp:"C:\\Users\\gg\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js",npm_config_noproxy:"",npm_config_npm_version:"10.8.1",npm_config_prefix:"C:\\Users\\gg\\AppData\\Roaming\\npm",npm_config_userconfig:"C:\\Users\\gg\\.npmrc",npm_config_user_agent:"npm/10.8.1 node/v20.13.1 win32 x64 workspaces/false",npm_execpath:"C:\\Users\\gg\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js",npm_lifecycle_event:"build",npm_lifecycle_script:"vite build",npm_node_execpath:"C:\\Program Files\\nodejs\\node.exe",npm_package_json:"C:\\Users\\gg\\Documents\\Camfine\\package.json",npm_package_name:"campine",npm_package_version:"0.0.0",NPM_PREFIX_JS:"C:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-prefix.js",NPM_PREFIX_NPM_CLI_JS:"C:\\Users\\gg\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js",NUMBER_OF_PROCESSORS:"4",OneDrive:"C:\\Users\\gg\\OneDrive",ORIGINAL_XDG_CURRENT_DESKTOP:"undefined",OS:"Windows_NT",Path:"C:\\Users\\gg\\Documents\\Camfine\\node_modules\\.bin;C:\\Users\\gg\\Documents\\node_modules\\.bin;C:\\Users\\gg\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\gg\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Users\\gg\\Documents\\Camfine\\node_modules\\.bin;C:\\Users\\gg\\Documents\\node_modules\\.bin;C:\\Users\\gg\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\gg\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\nodejs\\;C:\\Program Files\\Git\\cmd;C:\\Users\\gg\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\gg\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\gg\\AppData\\Roaming\\npm",PATHEXT:".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL",PROCESSOR_ARCHITECTURE:"AMD64",PROCESSOR_IDENTIFIER:"Intel64 Family 6 Model 94 Stepping 3, GenuineIntel",PROCESSOR_LEVEL:"6",PROCESSOR_REVISION:"5e03",ProgramData:"C:\\ProgramData",ProgramFiles:"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)",ProgramW6432:"C:\\Program Files",PROMPT:"$P$G",PSModulePath:"C:\\Users\\gg\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules",PUBLIC:"C:\\Users\\Public",REACT_APP_CAMPING_API_KEY:"oThapseAPx3YFWMIWm7cDGsbxM5Z641oPuGhupfakdG9qvZUSe3fA81otbILH3Zhopw94W1Q0t3m6m8WEGLZPw==",REACT_APP_FIREBASE_API_KEY:"AIzaSyCTA4aJ2EDHVoGYGNfOCcwS_01yZjWF61w",REACT_APP_FIREBASE_APP_ID:"1:854758722914:web:22275f2a8e84c7f304b03b",REACT_APP_FIREBASE_AUTH_DOMAIN:"campine-57ec5.firebaseapp.com",REACT_APP_FIREBASE_MEASUREMENT_ID:"G-27B3XCQ9SS",REACT_APP_FIREBASE_MESSAGING_SENDER_ID:"854758722914",REACT_APP_FIREBASE_PROJECT_ID:"campine-57ec5",REACT_APP_FIREBASE_STORAGE_BUCKET:"campine-57ec5.appspot.com",REACT_APP_KAKAO_API_KEY:"89e192a05a27c4d9d379555198a87faf",REACT_APP_KAKAO__Rest_API_KEY:"18c6fdf668e9e09f9e8914d1b2463f09",REACT_APP_OPENWEATHERMAP_API_KEY:"2dd2a62d904385b0db3f423a042af454",SESSIONNAME:"Console",SystemDrive:"C:",SystemRoot:"C:\\Windows",TEMP:"C:\\Users\\gg\\AppData\\Local\\Temp",TERM_PROGRAM:"vscode",TERM_PROGRAM_VERSION:"1.93.0",TMP:"C:\\Users\\gg\\AppData\\Local\\Temp",USERDOMAIN:"DESKTOP-I4H25K8",USERDOMAIN_ROAMINGPROFILE:"DESKTOP-I4H25K8",USERNAME:"gg",USERPROFILE:"C:\\Users\\gg",VSCODE_GIT_ASKPASS_EXTRA_ARGS:"",VSCODE_GIT_ASKPASS_MAIN:"c:\\Users\\gg\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js",VSCODE_GIT_ASKPASS_NODE:"C:\\Users\\gg\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe",VSCODE_GIT_IPC_HANDLE:"\\\\.\\pipe\\vscode-git-81046140ee-sock",VSCODE_INJECTION:"1",windir:"C:\\Windows"};const Ae=G.REACT_APP_KAKAO_API_KEY,re=G.REACT_APP_CAMPING_API_KEY,v="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";function ce(i,p,t,r){function g(c){return c*Math.PI/180}const E=6371,d=g(t-i),C=g(r-p),A=Math.sin(d/2)*Math.sin(d/2)+Math.cos(g(i))*Math.cos(g(t))*Math.sin(C/2)*Math.sin(C/2),h=2*Math.atan2(Math.sqrt(A),Math.sqrt(1-A));return E*h}const y=i=>{const p=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],t=r=>Math.floor((r.charCodeAt(0)-44032)/588);return i.split("").map(r=>/[가-힣]/.test(r)?p[t(r)]:r).join("")};function Ee(){const[i,p]=o.useState([]),[t,r]=o.useState({lat:null,lng:null}),[g,E]=o.useState(""),[d,C]=o.useState(""),[A,h]=o.useState([]),[c,f]=o.useState(-1),[W,P]=o.useState(!1),[u,F]=o.useState("계곡"),[O,V]=o.useState([]),I=X(),Q=[{text:"글램핑",icon:"camping"},{text:"카라반",icon:"airport_shuttle"},{text:"포레스트",icon:"action_key"},{text:"대전",icon:"share_location"},{text:"대구",icon:"share_location"},{text:"서울",icon:"share_location"},{text:"부산",icon:"share_location"}];o.useEffect(()=>{(()=>{if(document.getElementById("kakao-map-script"))navigator.geolocation&&navigator.geolocation.getCurrentPosition(n=>{const{latitude:l,longitude:m}=n.coords;r({lat:l,lng:m})},n=>{});else{const n=document.createElement("script");n.src=`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${Ae}&libraries=services`,n.id="kakao-map-script",n.async=!0,n.onload=()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(l=>{const{latitude:m,longitude:S}=l.coords;r({lat:m,lng:S})},l=>{})},document.head.appendChild(n)}})()},[]),o.useEffect(()=>{t.lat&&t.lng&&_()},[t]);const _=async(s=3)=>{var a,n,l,m;try{const R=(m=(l=(n=(a=(await Z.get("https://apis.data.go.kr/B551011/GoCamping/locationBasedList",{params:{ServiceKey:re,mapX:t.lng,mapY:t.lat,radius:1e5,MobileOS:"ETC",MobileApp:"AppTest",_type:"json"}})).data)==null?void 0:a.response)==null?void 0:n.body)==null?void 0:l.items)==null?void 0:m.item;if(R){const H=(Array.isArray(R)?R:[R]).map(x=>{const M=ce(t.lat,t.lng,parseFloat(x.mapY),parseFloat(x.mapX));return{...x,distance:M}}).sort((x,M)=>x.distance-M.distance);p(H),E("")}else E("50km 안에 캠핑장이 없습니다.")}catch{s>1?_(s-1):E("캠핑장 데이터를 가져오는 중 오류가 발생했습니다.")}};o.useEffect(()=>{i.length>0&&j(u)},[i]),o.useEffect(()=>{window.Swiper&&new window.Swiper(".swiper-container",{pagination:{el:".swiper-pagination",type:"fraction"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:5e3,disableOnInteraction:!1},spaceBetween:50,slidesPerView:1,loop:!0,effect:"cube"})},[]),o.useEffect(()=>{window.Swiper&&new window.Swiper(".swiper-container2",{navigation:{nextEl:".swiper-button-next2",prevEl:".swiper-button-prev2"},autoplay:{delay:5e3,disableOnInteraction:!1},spaceBetween:10,slidesPerView:2,loop:!0})},[i]);const Y=(s,a)=>{if(s.length<=a)return s;const n=new RegExp(`.{1,${a}}`,"g");return s.match(n).join("<br />")},D=s=>{I(`/camp/${s}`,{state:{campList:i}})},N=s=>{I("/list",{state:{selectedType:s}})},B=s=>{s.preventDefault(),d&&I("/searchList",{state:{searchQuery:d}})},k=s=>{const a=s.target.value;if(C(a),f(-1),a){const n=y(a),l=Q.filter(m=>{const S=y(m.text);return m.text.startsWith(a)||S.startsWith(n)});h(l)}else h([])},K=s=>{C(s.text),h([]),P(!1),I("/searchList",{state:{searchQuery:s.text}})},T=s=>{s.key==="ArrowDown"?f(a=>a<A.length-1?a+1:a):s.key==="ArrowUp"?f(a=>a>0?a-1:0):s.key==="Enter"&&c>=0&&A[c]&&K(A[c])};o.useEffect(()=>{c>=0&&A[c]&&C(A[c].text)},[c,A]);const U=s=>{F(s),j(s)},j=s=>{let a=[];s==="계곡"?a=i.filter(n=>n.posblFcltyCl&&n.posblFcltyCl.includes("계곡")):s==="산"?a=i.filter(n=>n.posblFcltyCl&&n.posblFcltyCl.includes("산")):s==="마트"&&(a=i.filter(n=>n.sbrsCl&&n.sbrsCl.includes("마트"))),V(a.sort(()=>Math.random()-.5).slice(0,2))},L=()=>{j(u)};return e.jsxs("div",{id:"Main",children:[e.jsx(q,{}),e.jsx("div",{className:"main",children:e.jsxs("div",{className:"main_warp",children:[e.jsxs("div",{className:"main_se1",children:[e.jsx("div",{onClick:()=>N("오토캠핑"),children:e.jsx(b,{Main_se1_box_ic:z,Main_se1_box_tx:"오토캠핑"})}),e.jsx("div",{onClick:()=>N("글램핑"),children:e.jsx(b,{Main_se1_box_ic:$,Main_se1_box_tx:"글램핑"})}),e.jsx("div",{onClick:()=>N("카라반"),children:e.jsx(b,{Main_se1_box_ic:ee,Main_se1_box_tx:"카라반"})})]}),e.jsx("div",{className:"main_se1_5_search",children:e.jsxs("form",{onSubmit:B,children:[e.jsx("input",{type:"text",name:"searchInput",placeholder:"캠핑장을 검색해보세요 ( 예 : 글램핑 )",value:d,onChange:k,onKeyDown:T,onFocus:()=>P(!0),onBlur:()=>P(!1)}),e.jsx("span",{className:"material-symbols-rounded",onClick:B,children:"search"})]})}),e.jsxs("div",{className:`suggestions-box ${W&&A.length>0?"show":""}`,children:[e.jsx("p",{children:"- Popular searches"}),e.jsx("div",{className:"suggestions-box_warp",children:A.map((s,a)=>e.jsxs("div",{className:`suggestion-item ${a===c?"highlighted":""}`,onClick:()=>K(s),children:[e.jsx("span",{className:"material-symbols-rounded",children:s.icon}),s.text]},a))})]}),e.jsx("div",{className:"main_se2",children:e.jsxs("div",{className:"swiper-container",children:[e.jsxs("div",{className:"swiper-wrapper",children:[e.jsx("div",{className:"swiper-slide",children:e.jsx(w,{to:"https://github.com/changhyoun/Camfine",target:"_blank",children:e.jsx("img",{src:se,alt:"slide"})})}),e.jsx("div",{className:"swiper-slide",children:e.jsx(w,{to:"https://github.com/changhyoun/Camfine",target:"_blank",children:e.jsx("img",{src:"https://www.marketnews.co.kr/news/photo/201905/33788_48703_1016.jpg",alt:"slide"})})}),e.jsx("div",{className:"swiper-slide",children:e.jsx(w,{to:"https://github.com/changhyoun/Camfine",target:"_blank",children:e.jsx("img",{src:"https://img.danawa.com/new/cmpart/splan/sports/232/images/main.jpg",alt:"slide"})})})]}),e.jsx("div",{className:"swiper-pagination"}),e.jsx("div",{className:"swiper-button-next next",children:e.jsx("span",{className:"material-symbols-rounded",children:"swipe_right"})}),e.jsx("div",{className:"swiper-button-prev prev",children:e.jsx("span",{className:"material-symbols-rounded",children:"swipe_left"})})]})}),e.jsxs("div",{className:"main_se3",children:[e.jsx("div",{className:"main_se3_tx",children:"내 근처에 있는 ⛺"}),e.jsx("div",{className:"main_se3_box",children:e.jsxs("div",{className:"main_se3_box_inner",children:[g||i.length===0?e.jsx("div",{className:"no-camping-sites-message",dangerouslySetInnerHTML:{__html:g||"근처에 캠핑장이 없거나,<br>위치 정보를 허용해주세요."}}):e.jsx("div",{className:"swiper-container2",children:e.jsx("div",{className:"swiper-wrapper",children:i.map((s,a)=>e.jsxs("div",{className:"swiper-slide",onClick:()=>D(s.contentId),children:[e.jsx("img",{src:s.firstImageUrl||v,alt:"campImg"}),e.jsxs("div",{className:"near_camping-info",children:[e.jsx("h3",{children:s.facltNm}),e.jsx("p",{dangerouslySetInnerHTML:{__html:Y(s.addr1,11)}}),e.jsxs("p",{children:[s.distance.toFixed(0),"km"]})]})]},a))})}),e.jsxs("div",{className:"main_se3_box_arrow_warp",style:{display:g||i.length===0?"none":""},children:[e.jsx("div",{className:"swiper-button-prev2 prev2",children:e.jsx("img",{src:ae,alt:"previous"})}),e.jsx("div",{className:"swiper-button-next2 next2",children:e.jsx("img",{src:ne,alt:"next"})})]})]})})]}),e.jsxs("div",{className:"main_se4",children:[e.jsxs("div",{className:"main_se4_tx",children:[e.jsxs("div",{className:"main_se4_lt",children:["캠핑장 추천해드려요 🧐 ",e.jsx("span",{children:"( 100km 반경 )"})]}),e.jsx("div",{className:"main_se4_rt",children:e.jsxs(w,{to:"./list",children:["더보기",e.jsx("span",{className:"material-symbols-rounded",children:"chevron_right"})]})})]}),e.jsxs("div",{className:"main_se4_selectBox",children:[e.jsxs("button",{onClick:()=>U("계곡"),className:u==="계곡"?"active":"",children:[e.jsx("img",{src:ie,alt:"main_se4_ic1"}),"계곡 근처"]}),e.jsxs("button",{onClick:()=>U("산"),className:u==="산"?"active":"",children:[e.jsx("img",{src:oe,alt:"main_se4_ic2"}),"산 근처"]}),e.jsxs("button",{onClick:()=>U("마트"),className:u==="마트"?"active":"",children:[e.jsx("img",{src:te,alt:"main_se4_ic3"}),"마트 근처"]}),e.jsx("span",{onClick:L,className:"material-symbols-rounded",children:"rotate_left"})]}),e.jsx("div",{className:"main_se4_list_box",children:O.length>0?O.map((s,a)=>e.jsxs("div",{className:"main_se4_list",onClick:()=>D(s.contentId),children:[e.jsx("div",{className:"main_se4_list_img",children:e.jsx("img",{src:s.firstImageUrl||v,alt:"campImg"})}),e.jsx("div",{className:"camp-info",children:e.jsxs("div",{className:"camp-info_wrap",children:[e.jsx("h3",{children:s.facltNm}),e.jsx("p",{children:s.addr1})]})})]},a)):e.jsxs("p",{children:["해당 유형의 캠핑장이 없거나,",e.jsx("br",{}),"위치정보 허용을 해주세요."]})})]})]})}),e.jsx(J,{})]})}export{Ee as default};
