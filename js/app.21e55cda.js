(function(){"use strict";var e={7086:function(e,t,n){var a=n(229),o=n(9522),s=n(2003),r=n(6739);const i={role:"status"},l=(0,s.Lk)("svg",{"aria-hidden":"true",class:"inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[(0,s.Lk)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,s.Lk)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})],-1),u=(0,s.Lk)("span",{class:"sr-only"},"Loading...",-1),c=[l,u];function d(e,t){return(0,s.uX)(),(0,s.CE)("div",i,c)}var v=n(3489);const f={},h=(0,v.A)(f,[["render",d]]);var p=h;const g=(0,r.KR)({toastIsShown:!1,showToast:e=>{g.value.toastIsShown=!1,g.value.message=e,g.value.toastIsShown=!0,setTimeout((()=>{g.value.toastIsShown=!1}),3500)},message:"Something went wrong"}),m=(0,r.KR)(!1);function w(){return{isLoading:m,errorToast:g,showLoading:()=>m.value=!0,hideLoading:()=>m.value=!1}}const y={key:0,class:"w-full h-full z-50 fixed top-0 left-0 backdrop-blur-sm"},b={class:"flex w-full h-full fixed z-[51] items-center justify-center"},k={class:"bg-white shadow-2xl p-4 rounded-md border"};var x=(0,s.pM)({__name:"global-loader",setup(e){const{isLoading:t}=w();return(e,n)=>(0,r.R1)(t)?((0,s.uX)(),(0,s.CE)("div",y,[(0,s.Lk)("div",b,[(0,s.Lk)("div",k,[(0,s.bF)(p)])])])):(0,s.Q3)("",!0)}});const C=x;var R=C,S=n(3582);const L={key:0,class:"fixed top-1 z-30 flex w-full justify-center",initial:{y:-100},enter:{y:0},delay:20},M={id:"toast-warning",class:"flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",role:"alert"},T=(0,s.Lk)("div",{class:"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"},[(0,s.Lk)("svg",{class:"w-5 h-5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{d:"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"})]),(0,s.Lk)("span",{class:"sr-only"},"Warning icon")],-1),E={class:"ms-3 text-sm font-normal"},_=(0,s.Lk)("span",{class:"sr-only"},"Close",-1),K=(0,s.Lk)("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[(0,s.Lk)("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),j=[_,K];var O=(0,s.pM)({__name:"error-toast",setup(e){const{errorToast:t}=w();return(e,n)=>{const a=(0,s.gN)("motion");return(0,r.R1)(t).toastIsShown?(0,s.bo)(((0,s.uX)(),(0,s.CE)("div",L,[(0,s.Lk)("div",M,[T,(0,s.Lk)("div",E,(0,S.v_)((0,r.R1)(t).message),1),(0,s.Lk)("button",{onClick:n[0]||(n[0]=e=>(0,r.R1)(t).toastIsShown=!1),type:"button",class:"ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700","data-dismiss-target":"#toast-warning","aria-label":"Close"},j)])])),[[a]]):(0,s.Q3)("",!0)}}});const A=O;var I=A,X=(0,s.pM)({__name:"App",setup(e){return(e,t)=>{const n=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(n),(0,s.bF)(R),(0,s.bF)(I)],64)}}});const N=X;var P=N,F=n(3247);function W(e,t){return(0,s.uX)(),(0,s.CE)("button",{onContextmenu:t[0]||(t[0]=(0,o.D$)((()=>{}),["stop","prevent"])),class:"text-white transition-all select-none bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"},[(0,s.RG)(e.$slots,"default")],32)}const z={},B=(0,v.A)(z,[["render",W]]);var D=B;const q={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},V=(0,s.Lk)("rect",{x:"8",y:"1",width:"8",height:"14",rx:"4",stroke:"currentColor","stroke-width":"1.8"},null,-1),Y=(0,s.Lk)("path",{d:"M19.5 10.5V11C19.5 15.1421 16.1421 18.5 12 18.5V18.5M4.5 10.5V11C4.5 15.1421 7.85786 18.5 12 18.5V18.5M12 18.5V22M12 22H16M12 22H8",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round"},null,-1),J=[V,Y];function Q(e,t){return(0,s.uX)(),(0,s.CE)("svg",q,J)}const $={},Z=(0,v.A)($,[["render",Q]]);var H=Z;const G={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},U=(0,s.Lk)("rect",{x:"6",y:"6",width:"12",height:"12",rx:"2",fill:"currentColor"},null,-1),ee=[U];function te(e,t){return(0,s.uX)(),(0,s.CE)("svg",G,ee)}const ne={},ae=(0,v.A)(ne,[["render",te]]);var oe=ae;const se="https://api.heygen.com",re="NzY3MzI5ZDUxYTNmNDM3OGFiYmM5OWI2ODk2NDU3MjYtMTcxMjI1MzYyNA==",{errorToast:ie}=w(),le=(0,r.KR)(!0),ue=(0,r.KR)(!1),ce=(0,r.KR)("stopped"),de=(0,r.KR)(""),ve=(0,r.KR)(!1),fe=(0,r.KR)(!1),he=(0,r.KR)(!1),pe=(0,r.KR)(),ge=(0,r.KR)(),me=(0,r.KR)(),we=(e,t)=>{const n=async()=>{fe.value=!0,le.value=!0,await Se(),await new Promise(((n,a)=>{setTimeout((async()=>{await ye(e,t),n(1)}),300)})),await new Promise(((e,t)=>{setTimeout((async()=>{await be(),e(1)}),300)})),fe.value=!1,ce.value="started"};return{isError:ue,isGenerating:he,state:ce,errorMessage:de,mediaCanPlay:ve,isLoading:fe,sessionInfo:pe,peerConnection:ge,renderCanvas:_e,closeConnection:Re,iceConnectionState:me,start:n,generateVoice:async e=>{pe.value&&(he.value=!0,await Te(pe.value?.session_id,e))}}},ye=async(e,t)=>{const n="Kayla-incasualsuit-20220818",a="71b0aa6499f6458e8b040818a017db1f";if(pe.value=await ke("low",n,a),pe.value){const{sdp:n,ice_servers2:a}=pe.value;ge.value=new RTCPeerConnection({iceServers:a}),ge.value.ontrack=n=>{console.log("Received the track"),"audio"!==n.track.kind&&"video"!==n.track.kind||e.value&&(e.value.srcObject=n.streams[0],e.value.paused&&e.value.play().then((e=>{})).catch((()=>{})),le.value&&(le.value=!1,setTimeout((()=>{_e(t,e)}),500)))},ge.value.ondatachannel=e=>{const t=e.channel;t.onmessage=e=>{setTimeout((()=>{he.value=!1}),400)}};const o=new RTCSessionDescription(n);await ge.value.setRemoteDescription(o)}},be=async()=>{if(!pe.value||!ge.value)return;const e=await ge.value.createAnswer();await ge.value.setLocalDescription(e),ge.value.onicecandidate=({candidate:e})=>{console.log("Received ICE candidate:",e),setTimeout((()=>{e&&pe.value&&xe(pe.value.session_id,e.toJSON())}),300)},ge.value.oniceconnectionstatechange=e=>{me.value=ge.value?.iceConnectionState},await Ce(pe.value.session_id,e),console.log("Session Started Successfully")};async function ke(e,t,n){try{const a=await fetch(`${se}/v1/streaming.new`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":re},body:JSON.stringify({quality:e,avatar_name:t,voice:{voice_id:n}})});if(a.status>399)throw new Error("Error: Creating new session failed!");const o=await a.json();return console.log(o.data),o.data}catch(a){throw console.log(a,"err"),ce.value="stopped",fe.value=!1,ie.value.showToast(a.message),new Error("Hello")}}async function xe(e,t){const n=await fetch(`${se}/v1/streaming.ice`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":re},body:JSON.stringify({session_id:e,candidate:t})});if(500===n.status)throw console.error("Server error"),ue.value=!0,de.value="Server Error. Please ask the staff if the service has been turned on",new Error("Server error");{const e=await n.json();return e}}async function Ce(e,t){const n=await fetch(`${se}/v1/streaming.start`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":re},body:JSON.stringify({session_id:e,sdp:t})});if(500===n.status)throw console.error("Server error"),ue.value=!0,de.value="Server Error. Please ask the staff if the service has been turned on",new Error("Server error");{const e=await n.json();return e.data}}async function Re(){if(pe.value&&ge.value){Ee.value++,ve.value=!1,console.log("closing connection...");try{ge.value.close();const e=await Me(pe.value.session_id);ce.value="stopped",console.log("conneciton closed"),console.log(e)}catch(e){console.error("Failed to close the connection:",e)}}}const Se=async()=>{const e=await Le(),t=e.data;t.sessions&&t.sessions.length>0&&t.sessions.forEach((async e=>{await Me(e.session_id)}))};async function Le(){const e={method:"GET",headers:{accept:"application/json","x-api-key":re}},t=await fetch(`${se}/v1/streaming.list`,e).then((e=>e.json()));return t}async function Me(e){try{const t=await fetch(`${se}/v1/streaming.stop`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":re},body:JSON.stringify({session_id:e})});if(t.status>399)throw new Error("Error: Stopping current session failed");const n=await t.json();return n.data}catch(t){console.log(t,"err"),ce.value="stopped",fe.value=!1,ie.value.showToast(t.message)}}async function Te(e,t){const n=await fetch(`${se}/v1/streaming.task`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":re},body:JSON.stringify({session_id:e,text:t})});if(500===n.status)throw console.error("Server error"),new Error("Server error");{const e=await n.json();return e.data}}let Ee=(0,r.KR)(0);const _e=(e,t)=>{const n=Math.trunc(1e9*Math.random());Ee.value=n;const a=e.value.getContext("2d",{willReadFrequently:!0});function o(){if(n!==Ee.value)return;if(!t.value.videoHeight||!t.value.videoWidth)return void setTimeout((()=>{o()}),200);e.value.width=t.value.videoWidth,e.value.height=t.value.videoHeight,a.drawImage(t.value,0,0,e.value.width,e.value.height),a.getContextAttributes().willReadFrequently=!0;const s=a.getImageData(0,0,e.value.width,e.value.height),r=s.data;for(let e=0;e<r.length;e+=4){const t=r[e],n=r[e+1],a=r[e+2];Ke([t,n,a])&&(r[e+3]=0)}a.putImageData(s,0,0),requestAnimationFrame(o)}o()};function Ke(e){const[t,n,a]=e;return n>90&&t<90&&a<90}function je(e=[]){const t=(0,r.KR)(e),n=e=>{t.value=[...t.value,e]},a=()=>{const[e,...n]=t.value;return t.value=n,e},o=()=>{t.value=[]};return{add:n,remove:a,clear:o,first:(0,s.EW)((()=>t.value[0])),last:(0,s.EW)((()=>t.value[t.value.length-1])),size:(0,s.EW)((()=>t.value.length)),queue:t}}let Oe=(0,r.KR)(),Ae=(0,r.KR)(!1);const{add:Ie,remove:Xe,first:Ne,size:Pe,queue:Fe}=je(),We=(0,r.KR)(!1);function ze(){const e=()=>"visible"!==document.visibilityState&&De();return(0,s.sV)((()=>{window.addEventListener("visibilitychange",e)})),(0,s.xo)((()=>{window.removeEventListener("visibilitychange",e),Oe.value&&(Oe.value.ondataavailable=null)})),(0,s.wB)(Oe,(e=>{e&&(e.ondataavailable=e=>{Ae.value&&Ie(e.data)})})),Be(),{microphone:Oe,microphoneIsOpen:Ae,startMicrophone:qe,stopMicrophone:De,queue:Fe,isRecording:We,enqueueBlob:Ie,removeBlob:Xe,firstBlob:Ne,queueSize:Pe}}const Be=async()=>{const e=await navigator.mediaDevices.getUserMedia({audio:{noiseSuppression:!0,echoCancellation:!0}});Oe.value=new MediaRecorder(e)},De=()=>{if(Oe.value&&"recording"===Oe.value.state){We.value=!1;const e=setTimeout((()=>{clearTimeout(e),Oe.value.pause(),Ae.value=!1}),1500)}},qe=()=>{Oe.value&&("paused"===Oe.value.state?Oe.value.resume():"recording"!==Oe.value.state&&Oe.value.start(250),Ae.value=!0,We.value=!0)};var Ve=n(4187),Ye=n(3715),Je=n(683);const Qe=async()=>"b609915a439eb06151cc4b3b91d91063b57b80df",$e=(0,r.KR)(),Ze=(0,r.KR)(!1),He=(0,r.KR)(!1);let Ge=(0,r.KR)({isFinal:!0,text:""});const Ue=async e=>{$e.value||Ze.value||(Ze.value=!0,$e.value=new Ve.o(await Qe(),{},{language:e,model:"nova-2",interim_results:!0,smart_format:!0,endpointing:350,utterance_end_ms:1e3,filler_words:!0}),Ze.value=!1)},et=()=>{let e;$e.value&&He?e=setInterval((()=>{$e.value&&$e.value.getReadyState()!==Ye.y.OPEN?clearInterval(e):$e.value&&$e.value.keepAlive()}),1e4):e&&clearInterval(e)},tt=()=>{$e.value&&void 0!==$e.value.getReadyState()&&($e.value.addListener(Je.Y.Open,(()=>{He.value=!0})),$e.value.addListener(Je.Y.Close,(()=>{nt()})),$e.value.addListener(Je.Y.Error,(()=>{nt()})),$e.value.addListener(Je.Y.Metadata,(e=>{console.log(e,"Metadata")})),$e.value.addListener(Je.Y.Transcript,(e=>{e.channel.alternatives[0].transcript&&(Ge.value={isFinal:e.is_final,text:e.channel.alternatives[0].transcript})})))},nt=()=>{$e.value&&(He.value=!1,$e.value.removeAllListeners(),$e.value=void 0)};function at(e){const t=async()=>{await Ue(e),tt()};return t(),(0,s.wB)($e,(()=>{et()})),(0,s.xo)((()=>{nt()})),{connection:$e,isConnecting:Ze,transcript:Ge,connectionIsReady:He}}n(5680);const ot="sk-QpM" + "A8WVt0ArIMwsaqwgJT3BlbkFJx" + "XbkenDZpxo2VwPRNfCr",st=(0,r.KR)([]),rt=(0,r.KR)([{role:"system",content:"Do not write long text. Your limit is 500 symbols. Try to reply only in this limits."}]),it=(0,r.KR)(!1),lt=(0,r.KR)(""),ut=(0,r.KR)("");function ct(){return{currentMessage:lt,textArr:st,arrSize:(0,s.EW)((()=>st.value.length)),currentWord:ut,gtpIsStreaming:it,messages:rt,sendMessage:vt}}const dt=async()=>await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot}`},body:JSON.stringify({model:"gpt-3.5-turbo",temperature:.7,stream:!0,max_tokens:1e3,messages:rt.value})}),vt=async e=>{rt.value.push({role:"user",content:e});const t=await dt();it.value=!0;const n=t.body.getReader(),a=new TextDecoder("utf-8");while(1){const{done:e,value:t}=await n.read();if(e)break;const o=a.decode(t),s=o.split("\n").map((e=>e.replace("data: ",""))).filter((e=>e.length>0)).filter((e=>"[DONE]"!==e)).map((e=>{try{return JSON.parse(e)}catch{return console.log(e),""}}));for(const n of s){const{choices:e}=n;if(e&&e.length){const{delta:t,finish_reason:n}=e[0],{content:a}=t;a&&(lt.value+=a,st.value.push(a)),n&&(it.value=!1,rt.value.push({role:"assistant",content:lt.value}))}}}},ft={class:"home h-[100vh] flex flex-col pt-[20vh] items-center bg-blue-900 py-4 px-4"},ht={class:"absolute top-4 flex z-[2] flex-col items-center space-y-2"},pt={class:"flex items-center space-x-2"},gt=(0,s.Lk)("span",null,"Start Connection",-1),mt=(0,s.Lk)("div",{class:"absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"},null,-1),wt={class:"flex items-start sm:flex-wrap sm:justify-center"},yt={key:0,class:"my-4 flex space-x-2 justify-center items-center"},bt=(0,s.Lk)("div",{class:"h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"},null,-1),kt=(0,s.Lk)("div",{class:"h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"},null,-1),xt=(0,s.Lk)("div",{class:"h-2 w-2 bg-white rounded-full animate-bounce"},null,-1),Ct=[bt,kt,xt],Rt={class:"flex items-center space-x-2"},St={key:0,initial:{opacity:0},enter:{opacity:1},delay:20,class:"text-white mt-2 sm:text-[14px] w-[50%] sm:w-full z-[2]"},Lt=(0,s.Lk)("span",{class:"font-bold text-red-300"},"user:",-1),Mt={key:1,initial:{opacity:0},enter:{opacity:1},delay:20,class:"text-white sm:text-[14px] w-[50%] sm:w-full z-[2] text-left"},Tt=(0,s.Lk)("span",{class:"font-bold text-purple-300"},"avatar:",-1),Et="";var _t=(0,s.pM)({__name:"HomeView",setup(e){let t=(0,r.KR)(!1),n=(0,r.KR)(Et),a=(0,r.KR)(Et);const{sendMessage:o,messages:i,currentMessage:l,gtpIsStreaming:u,currentWord:c}=ct(),{connection:d,isConnecting:v,transcript:f,connectionIsReady:h}=at("en"),{isRecording:g,microphoneIsOpen:m,queue:w,microphone:y,firstBlob:b,removeBlob:k,queueSize:x,startMicrophone:C,stopMicrophone:R}=ze(),L=(0,r.KR)(),M=(0,r.KR)(),{isLoading:T,isGenerating:E,iceConnectionState:_,closeConnection:K,state:j,isError:O,errorMessage:A,generateVoice:I,start:X}=we(L,M);let N=(0,r.KR)("Салам Азамат, как дела?");(0,s.wB)(l,(e=>{e&&(a.value=e)})),(0,s.wB)([l,u],(([e])=>{if(e&&!u.value){if(console.log(e),e.length>200){console.log(`${e} is longer than 100`),console.log("split it to 2");const t=async()=>{const t=e.split(" "),n=Math.ceil(t.length/2);let a=t.slice(0,n).join(" ");console.log("sending first:"+a),await I(a);let o=t.slice(n).join(" ");setTimeout((()=>{console.log("sending second:"+o),I(o)}),2e3)};t()}else console.log("sending:",e),I(e);a.value=e,l.value=""}}));const P=()=>{if(x.value>0&&!t.value){if(t.value=!0,h.value){const e=b.value;e&&e.size>0&&d.value.send(e),k()}t.value=!1}};(0,s.wB)(x,(()=>{P()})),(0,s.wB)(f,(e=>{n.value=e.text,e.isFinal&&!u.value&&o(e.text)}));const F=()=>{R(),setTimeout((()=>{g||f.value.isFinal||f.value.text===N.value||(console.log("this case"),N.value=f.value.text)}),1e3)};return(e,t)=>{const o=(0,s.gN)("motion");return(0,s.uX)(),(0,s.CE)("div",ft,[(0,s.Lk)("div",ht,["stopped"===(0,r.R1)(j)?((0,s.uX)(),(0,s.Wv)(D,{key:0,disabled:(0,r.R1)(T),onClick:(0,r.R1)(X)},{default:(0,s.k6)((()=>[(0,s.Lk)("div",pt,[gt,(0,r.R1)(T)?((0,s.uX)(),(0,s.Wv)(p,{key:0})):(0,s.Q3)("",!0)])])),_:1},8,["disabled","onClick"])):((0,s.uX)(),(0,s.Wv)(D,{key:1,onClick:(0,r.R1)(K)},{default:(0,s.k6)((()=>[(0,s.eW)("Stop Connection")])),_:1},8,["onClick"]))]),(0,s.Lk)("div",{class:(0,S.C4)([{"opacity-0":"stopped"===(0,r.R1)(j)},"flex relative flex-col w-full items-center"])},[mt,(0,s.Lk)("div",wt,[(0,s.Lk)("video",{ref_key:"videoRef",ref:L,class:"my-4 hidden z-10 rounded-full max-h-[400px] min-h-[300px] w-[300px]",autoPlay:"",playsInline:""},null,512),(0,s.Lk)("canvas",{ref_key:"canvasRef",ref:M,width:"300",height:"300",class:"z-10 my-4 rounded-full max-h-[400px] h-[300px] flex w-[300px]"},null,512)]),(0,r.R1)(u)||(0,r.R1)(E)?((0,s.uX)(),(0,s.CE)("div",yt,Ct)):(0,s.Q3)("",!0)],2),"connected"===(0,r.R1)(_)?((0,s.uX)(),(0,s.CE)("div",{key:0,class:(0,S.C4)([{"opacity-0":"stopped"===(0,r.R1)(j)},"flex space-x-2 sm:flex-wrap sm:justify-center"])},[(0,s.bF)(D,{class:"z-[2] active:scale-105",onTouchstart:(0,r.R1)(C),onTouchend:F,onMousedown:(0,r.R1)(C),onMouseup:F},{default:(0,s.k6)((()=>[(0,s.Lk)("div",Rt,[(0,r.R1)(g)?((0,s.uX)(),(0,s.Wv)((0,r.R1)(oe),{key:0})):((0,s.uX)(),(0,s.Wv)((0,r.R1)(H),{key:1})),(0,r.R1)(g)?((0,s.uX)(),(0,s.Wv)(p,{key:2})):(0,s.Q3)("",!0)])])),_:1},8,["onTouchstart","onMousedown"])],2)):(0,s.Q3)("",!0),(0,s.Lk)("div",{class:(0,S.C4)({"opacity-0":"stopped"===(0,r.R1)(j)})},[(0,r.R1)(n)?(0,s.bo)(((0,s.uX)(),(0,s.CE)("div",St,[Lt,(0,s.eW)(" "+(0,S.v_)((0,r.R1)(n)),1)])),[[o]]):(0,s.Q3)("",!0),(0,r.R1)(a)?(0,s.bo)(((0,s.uX)(),(0,s.CE)("div",Mt,[Tt,(0,s.eW)(" "+(0,S.v_)((0,r.R1)(a)),1)])),[[o]]):(0,s.Q3)("",!0)],2),(0,s.Q3)("",!0)])}}});const Kt=_t;var jt=Kt;const Ot=[{path:"/",name:"home",component:jt},{path:"/about",name:"about",component:()=>n.e(594).then(n.bind(n,3478))}],At=(0,F.aE)({history:(0,F.LA)("/avatar-vue/"),routes:Ot});var It=At;(0,o.Ef)(P).use(It).use(a.uy).mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,s){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],o=e[c][1],s=e[c][2];for(var i=!0,l=0;l<a.length;l++)(!1&s||r>=s)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(i=!1,s<r&&(r=s));if(i){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[a,o,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.0d40336c.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-avatar:";n.l=function(a,o,s,r){if(e[a])e[a].push(o);else{var i,l;if(void 0!==s)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+s){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+s),i.src=a),e[a]=[o];var v=function(t,n){i.onerror=i.onload=null,clearTimeout(f);var o=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(v.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=v.bind(null,i.onerror),i.onload=v.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/avatar-vue/"}(),function(){var e={524:0};n.f.j=function(t,a){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var s=new Promise((function(n,a){o=e[t]=[n,a]}));a.push(o[2]=s);var r=n.p+n.u(t),i=new Error,l=function(a){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",i.name="ChunkLoadError",i.type=s,i.request=r,o[1](i)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,s,r=a[0],i=a[1],l=a[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(l)var c=l(n)}for(t&&t(a);u<r.length;u++)s=r[u],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},a=self["webpackChunkvue_avatar"]=self["webpackChunkvue_avatar"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(7086)}));a=n.O(a)})();
//# sourceMappingURL=app.21e55cda.js.map