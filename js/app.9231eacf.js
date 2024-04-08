(function(){"use strict";var e={2534:function(e,t,n){var a=n(9522),o=n(2003);function s(e,t){const n=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.Wv)(n)}var r=n(3489);const i={},l=(0,r.A)(i,[["render",s]]);var u=l,c=n(3247),v=(n(5680),n(6739)),d=n(3582);const f={class:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"};function p(e,t){return(0,o.uX)(),(0,o.CE)("button",f,[(0,o.RG)(e.$slots,"default")])}const h={},m=(0,r.A)(h,[["render",p]]);var g=m;const y={role:"status"},w=(0,o.Lk)("svg",{"aria-hidden":"true",class:"inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[(0,o.Lk)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,o.Lk)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})],-1),k=(0,o.Lk)("span",{class:"sr-only"},"Loading...",-1),b=[w,k];function x(e,t){return(0,o.uX)(),(0,o.CE)("div",y,b)}const R={},C=(0,r.A)(R,[["render",x]]);var L=C;n(6023),n(1142),n(5138),n(9893),n(18),n(1143);const S="https://api.heygen.com",_="NzY3MzI5ZDUxYTNmNDM3OGFiYmM5OWI2ODk2NDU3MjYtMTcxMjI1MzYyNA==",T=((0,v.KR)(),(0,v.KR)(!0)),E=(0,v.KR)(!1),K=(0,v.KR)("stopped"),O=(0,v.KR)(""),M=(0,v.KR)(!1),j=(0,v.KR)(!1),A=(0,v.KR)(!1),I=(0,v.KR)(),P=(0,v.KR)(),W=(0,v.KR)(),X=(0,v.KR)(0),z=(0,v.KR)(),F=(e,t)=>{const n=async()=>{j.value=!0,T.value=!0,await $(),await new Promise(((n,a)=>{setTimeout((async()=>{await N(e,t),n(1)}),300)})),await new Promise(((e,t)=>{setTimeout((async()=>{await q(),e(1)}),300)})),j.value=!1,K.value="started"};return{isError:E,isGenerating:A,state:K,errorMessage:O,mediaCanPlay:M,isLoading:j,sessionInfo:I,peerConnection:P,remoteStream:W,renderCanvas:V,triggerRemoteStream:X,closeConnection:J,iceConnectionState:z,start:n,generateVoice:async e=>{I.value&&(A.value=!0,await Q(I.value?.session_id,e))}}},N=async(e,t)=>{const n="Kayla-incasualsuit-20220818",a="71b0aa6499f6458e8b040818a017db1f";if(I.value=await B("low",n,a),I.value){const{sdp:n,ice_servers2:a}=I.value;P.value=new RTCPeerConnection({iceServers:a}),P.value.ontrack=n=>{if(console.log("Received the track"),"audio"===n.track.kind||"video"===n.track.kind){if(W.value=n.streams[0],X.value++,"audio"===n.track.kind){const e=new AudioContext,t=(e.createAnalyser(),e.createMediaStreamSource(n.streams[0]));t.connect(e.destination);const a=e.createAnalyser();a.connect(e.destination),a.fftSize=64,setInterval((()=>{let e=new Uint8Array(a.frequencyBinCount);a.getByteFrequencyData(e),"00000000000000000000000000000000"!==e.join("")&&(alert("there is some data"),console.log(e))}),1e3)}e.value&&(e.value.srcObject=n.streams[0],e.value.paused&&e.value.play().then((e=>{})).catch((()=>{})),T.value&&(T.value=!1,setTimeout((()=>{V(t,e)}),500)))}},P.value.ondatachannel=e=>{const t=e.channel;t.onmessage=e=>{setTimeout((()=>{A.value=!1}),400)}};const o=new RTCSessionDescription(n);await P.value.setRemoteDescription(o)}},q=async()=>{if(!I.value||!P.value)return;const e=await P.value.createAnswer();await P.value.setLocalDescription(e),P.value.onicecandidate=({candidate:e})=>{console.log("Received ICE candidate:",e),setTimeout((()=>{e&&I.value&&D(I.value.session_id,e.toJSON())}),300)},P.value.oniceconnectionstatechange=e=>{z.value=P.value?.iceConnectionState},await Y(I.value.session_id,e),console.log("Session Started Successfully")};async function B(e,t,n){const a=await fetch(`${S}/v1/streaming.new`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":_},body:JSON.stringify({quality:e,avatar_name:t,voice:{voice_id:n,rate:1.25}})});if(500===a.status)throw console.error("Server error"),E.value=!0,O.value="Server Error. Please ask the staff if the service has been turned on",new Error("Server error");{const e=await a.json();return console.log(e.data),e.data}}async function D(e,t){const n=await fetch(`${S}/v1/streaming.ice`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":_},body:JSON.stringify({session_id:e,candidate:t})});if(500===n.status)throw console.error("Server error"),E.value=!0,O.value="Server Error. Please ask the staff if the service has been turned on",new Error("Server error");{const e=await n.json();return e}}async function Y(e,t){const n=await fetch(`${S}/v1/streaming.start`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":_},body:JSON.stringify({session_id:e,sdp:t})});if(500===n.status)throw console.error("Server error"),E.value=!0,O.value="Server Error. Please ask the staff if the service has been turned on",new Error("Server error");{const e=await n.json();return e.data}}async function J(){if(I.value&&P.value){U.value++,M.value=!1,console.log("closing connection...");try{P.value.close();const e=await H(I.value.session_id);K.value="stopped",console.log("conneciton closed"),console.log(e)}catch(e){console.error("Failed to close the connection:",e)}}}const $=async()=>{const e=await G(),t=e.data;t.sessions&&t.sessions.length>0&&t.sessions.forEach((async e=>{await H(e.session_id)}))};async function G(){const e={method:"GET",headers:{accept:"application/json","x-api-key":_}},t=await fetch(`${S}/v1/streaming.list`,e).then((e=>e.json()));return t}async function H(e){const t=await fetch(`${S}/v1/streaming.stop`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":_},body:JSON.stringify({session_id:e})});if(500===t.status)throw console.error("Server error"),E.value=!0,O.value="Server Error. Please ask the staff for help",new Error("Server error");{const e=await t.json();return e.data}}async function Q(e,t){const n=await fetch(`${S}/v1/streaming.task`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":_},body:JSON.stringify({session_id:e,text:t})});if(500===n.status)throw console.error("Server error"),new Error("Server error");{const e=await n.json();return e.data}}let U=(0,v.KR)(0);const V=(e,t)=>{const n=Math.trunc(1e9*Math.random());U.value=n;const a=e.value.getContext("2d",{willReadFrequently:!0});function o(){if(n!==U.value)return;if(!t.value.videoHeight||!t.value.videoWidth)return void setTimeout((()=>{o()}),200);e.value.width=t.value.videoWidth,e.value.height=t.value.videoHeight,a.drawImage(t.value,0,0,e.value.width,e.value.height),a.getContextAttributes().willReadFrequently=!0;const s=a.getImageData(0,0,e.value.width,e.value.height),r=s.data;for(let e=0;e<r.length;e+=4){const t=r[e],n=r[e+1],a=r[e+2];Z([t,n,a])&&(r[e+3]=0)}a.putImageData(s,0,0),requestAnimationFrame(o)}o()};function Z(e){const[t,n,a]=e;return n>90&&t<90&&a<90}function ee(e=[]){const t=(0,v.KR)(e),n=e=>{t.value=[...t.value,e]},a=()=>{const[e,...n]=t.value;return t.value=n,e},s=()=>{t.value=[]};return{add:n,remove:a,clear:s,first:(0,o.EW)((()=>t.value[0])),last:(0,o.EW)((()=>t.value[t.value.length-1])),size:(0,o.EW)((()=>t.value.length)),queue:t}}let te=(0,v.KR)(),ne=(0,v.KR)(!1);const{add:ae,remove:oe,first:se,size:re,queue:ie}=ee(),le=(0,v.KR)(!1);function ue(){const e=()=>"visible"!==document.visibilityState&&ve();return(0,o.sV)((()=>{window.addEventListener("visibilitychange",e)})),(0,o.xo)((()=>{window.removeEventListener("visibilitychange",e),te.value&&(te.value.ondataavailable=null)})),(0,o.wB)(te,(e=>{e&&(e.ondataavailable=e=>{ne.value&&ae(e.data)})})),ce(),{microphone:te,microphoneIsOpen:ne,startMicrophone:de,stopMicrophone:ve,queue:ie,isRecording:le,enqueueBlob:ae,removeBlob:oe,firstBlob:se,queueSize:re}}const ce=async()=>{const e=await navigator.mediaDevices.getUserMedia({audio:{noiseSuppression:!0,echoCancellation:!0}});te.value=new MediaRecorder(e)},ve=()=>{if("recording"===te.value.state){le.value=!1;const e=setTimeout((()=>{clearTimeout(e),te.value.pause(),ne.value=!1}),1500)}},de=()=>{"paused"===te.value.state?te.value.resume():te.value.start(250),ne.value=!0,le.value=!0};var fe=n(4187),pe=n(3715),he=n(683);const me=async()=>"b609915a439eb06151cc4b3b91d91063b57b80df",ge=(0,v.KR)(),ye=(0,v.KR)(!1),we=(0,v.KR)(!1);let ke=(0,v.KR)({isFinal:!0,text:""});const be=async()=>{console.log("connect outer"),ge.value||ye.value||(ye.value=!0,console.log("connect inner"),ge.value=new fe.o(await me(),{},{language:"ru",model:"nova-2",interim_results:!0,smart_format:!0,endpointing:350,utterance_end_ms:1e3,filler_words:!0}),ye.value=!1)},xe=()=>{let e;ge.value&&we?e=setInterval((()=>{ge.value&&ge.value.getReadyState()!==pe.y.OPEN?clearInterval(e):ge.value&&ge.value.keepAlive()}),1e4):e&&clearInterval(e)},Re=()=>{ge.value&&void 0!==ge.value.getReadyState()&&(ge.value.addListener(he.Y.Open,(()=>{we.value=!0})),ge.value.addListener(he.Y.Close,(()=>{Ce()})),ge.value.addListener(he.Y.Error,(()=>{Ce()})),ge.value.addListener(he.Y.Metadata,(e=>{console.log(e,"Metadata")})),ge.value.addListener(he.Y.Transcript,(e=>{e.channel.alternatives[0].transcript&&(ke.value={isFinal:e.is_final,text:e.channel.alternatives[0].transcript})})))},Ce=()=>{ge.value&&(we.value=!1,ge.value.removeAllListeners(),ge.value=void 0)};function Le(e){const t=async()=>{await be(),Re()};return t(),(0,o.wB)(ge,(()=>{xe()})),(0,o.xo)((()=>{Ce()})),{connection:ge,isConnecting:ye,transcript:ke,connectionIsReady:we}}const Se="sk-" + "QpMA8WVt0ArIMwsaqwgJT3BlbkFJxX" + "bkenDZpxo2VwPRNfCr",_e=(0,v.KR)([]),Te=(0,v.KR)([{role:"system",content:"Do not write long text. Your limit is 500 symbols. Try to reply only in this limits."}]),Ee=(0,v.KR)(!1),Ke=(0,v.KR)(""),Oe=(0,v.KR)("");function Me(){return{currentMessage:Ke,textArr:_e,arrSize:(0,o.EW)((()=>_e.value.length)),currentWord:Oe,gtpIsStreaming:Ee,messages:Te,sendMessage:Ae}}const je=async()=>await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Se}`},body:JSON.stringify({model:"gpt-3.5-turbo",temperature:.7,stream:!0,max_tokens:1e3,messages:Te.value})}),Ae=async e=>{Te.value.push({role:"user",content:e});const t=await je();Ee.value=!0;const n=t.body.getReader(),a=new TextDecoder("utf-8");while(1){const{done:e,value:t}=await n.read();if(e)break;const o=a.decode(t),s=o.split("\n").map((e=>e.replace("data: ",""))).filter((e=>e.length>0)).filter((e=>"[DONE]"!==e)).map((e=>{try{return JSON.parse(e)}catch{return console.log(e),""}}));for(const n of s){const{choices:e}=n;if(e&&e.length){const{delta:t,finish_reason:n}=e[0],{content:a}=t;a&&(Ke.value+=a,_e.value.push(a)),n&&(Ee.value=!1,Te.value.push({role:"assistant",content:Ke.value}))}}}},Ie={class:"home flex flex-col justify-center items-center bg-blue-900 py-4 px-4"},Pe={class:"flex z-[2] flex-col items-center space-y-2"},We={class:"flex items-center space-x-2"},Xe=(0,o.Lk)("span",null,"Start Connection",-1),ze={class:"flex relative flex-col w-full items-center"},Fe=(0,o.Lk)("div",{class:"absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"},null,-1),Ne={class:"flex items-start sm:flex-wrap sm:justify-center"},qe={key:0,class:"text-white w-[250px] sm:w-full z-[2] text-left"},Be=(0,o.Lk)("span",{class:"font-bold text-purple-300"},"avatar:",-1),De={key:1,class:"text-white w-[300px] sm:w-full z-[2]"},Ye=(0,o.Lk)("span",{class:"font-bold text-red-300"},"user:",-1),Je={key:0,class:"my-4 flex space-x-2 justify-center items-center"},$e=(0,o.Lk)("div",{class:"h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"},null,-1),Ge=(0,o.Lk)("div",{class:"h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"},null,-1),He=(0,o.Lk)("div",{class:"h-2 w-2 bg-white rounded-full animate-bounce"},null,-1),Qe=[$e,Ge,He],Ue={class:"flex space-x-2 sm:flex-wrap sm:justify-center"},Ve=(0,o.Lk)("div",{class:"flex items-center space-x-2"},[(0,o.Lk)("span",null,"Start Recording")],-1),Ze=(0,o.Lk)("div",{class:"flex items-center space-x-2"},[(0,o.Lk)("span",null,"Stop Recording")],-1),et=(0,o.Lk)("div",{class:"text-white flex sm:w-full text-center sm:justify-center items-center"},"or",-1),tt={class:"flex items-center space-x-2"},nt={key:0},at={key:1},ot={class:"bg-white w-full my-4 py-2 min-h-[300px] max-h-[300px] overflow-auto rounded-md flex flex-col items-center"},st=(0,o.Lk)("div",{class:"font-bold text-[18px]"},"Chat:",-1),rt={class:"border-t"},it={class:"flex flex-wrap justify-center"},lt={class:"bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4"},ut=(0,o.Lk)("h1",{class:"font-bold text-[20px]"},"OpenAI",-1),ct={class:"bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4"},vt=(0,o.Lk)("h1",{class:"font-bold text-[20px]"},"HeyGen RTC connection",-1),dt={class:"bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4"},ft=(0,o.Lk)("h1",{class:"font-bold text-[20px]"},"Microphone Info",-1),pt={class:"bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4"},ht=(0,o.Lk)("h1",{class:"font-bold text-[20px]"},"Deepgram API",-1);var mt=(0,o.pM)({__name:"HomeView",setup(e){let t=(0,v.KR)(!1),n=(0,v.KR)("..."),a=(0,v.KR)("...");const s=(0,v.KR)([]),{sendMessage:r,messages:i,currentMessage:l,gtpIsStreaming:u,currentWord:c,textArr:f}=Me(),{connection:p,isConnecting:h,transcript:m,connectionIsReady:y}=Le("ru"),{isRecording:w,microphoneIsOpen:k,queue:b,microphone:x,firstBlob:R,removeBlob:C,queueSize:S,startMicrophone:_,stopMicrophone:T}=ue(),E=(0,v.KR)(),K=(0,v.KR)(),{renderCanvas:O,isLoading:M,isGenerating:j,iceConnectionState:A,closeConnection:I,state:P,isError:W,errorMessage:X,mediaCanPlay:z,generateVoice:N,start:q}=F(E,K);let B=(0,v.KR)("Салам Азамат, как дела?");(0,o.wB)(l,(e=>{e&&(a.value=e)})),(0,o.wB)([l,u],(([e])=>{if(e&&!u.value){if(console.log(e),s.value.push({role:"assistant",text:e}),e.length>200){console.log(`${e} is longer than 100`),console.log("split it to 2");const t=async()=>{const t=e.split(" "),n=Math.ceil(t.length/2);let a=t.slice(0,n).join(" ");console.log("sending first:"+a),await N(a);let o=t.slice(n).join(" ");setTimeout((()=>{console.log("sending second:"+o),N(o)}),2e3)};t()}else console.log("sending:",e),N(e);a.value=e,l.value=""}}));const D=()=>{if(S.value>0&&!t.value){if(t.value=!0,y.value){const e=R.value;e&&e.size>0&&p.value.send(e),C()}t.value=!1}};(0,o.wB)(S,(()=>{D()})),(0,o.wB)(m,(e=>{n.value=e.text,e.isFinal&&!u.value&&(s.value.push({role:"user",text:e.text}),r(e.text))}));const Y=()=>{T(),setTimeout((()=>{w||m.value.isFinal||m.value.text===B.value||(console.log("this case"),B.value=m.value.text)}),1e3)};return(e,r)=>((0,o.uX)(),(0,o.CE)("div",Ie,[(0,o.Lk)("div",Pe,["stopped"===(0,v.R1)(P)?((0,o.uX)(),(0,o.Wv)(g,{key:0,disabled:(0,v.R1)(M),onClick:(0,v.R1)(q)},{default:(0,o.k6)((()=>[(0,o.Lk)("div",We,[Xe,(0,v.R1)(M)?((0,o.uX)(),(0,o.Wv)(L,{key:0})):(0,o.Q3)("",!0)])])),_:1},8,["disabled","onClick"])):((0,o.uX)(),(0,o.Wv)(g,{key:1,onClick:(0,v.R1)(I)},{default:(0,o.k6)((()=>[(0,o.eW)("Stop Connection")])),_:1},8,["onClick"]))]),(0,o.Lk)("div",ze,[Fe,(0,o.Lk)("div",Ne,[(0,v.R1)(a)?((0,o.uX)(),(0,o.CE)("div",qe,[Be,(0,o.eW)(" "+(0,d.v_)((0,v.R1)(a)),1)])):(0,o.Q3)("",!0),(0,o.Lk)("video",{ref_key:"videoRef",ref:E,class:"my-4 hidden z-10 rounded-full max-h-[400px] min-h-[300px] border w-[300px]",autoPlay:"",playsInline:""},null,512),(0,o.Lk)("canvas",{ref_key:"canvasRef",ref:K,width:"300",height:"300",class:"z-10 my-4 rounded-full max-h-[400px] h-[300px] flex border w-[300px]"},null,512),(0,v.R1)(n)?((0,o.uX)(),(0,o.CE)("div",De,[Ye,(0,o.eW)(" "+(0,d.v_)((0,v.R1)(n)),1)])):(0,o.Q3)("",!0)]),(0,v.R1)(u)||(0,v.R1)(j)?((0,o.uX)(),(0,o.CE)("div",Je,Qe)):(0,o.Q3)("",!0)]),(0,o.Lk)("div",Ue,[(0,o.bF)(g,{class:"z-[2]",onClick:(0,v.R1)(_)},{default:(0,o.k6)((()=>[Ve])),_:1},8,["onClick"]),(0,o.bF)(g,{class:"z-[2]",onClick:(0,v.R1)(T)},{default:(0,o.k6)((()=>[Ze])),_:1},8,["onClick"]),et,(0,o.bF)(g,{class:"z-[2]",onTouchstart:(0,v.R1)(_),onTouchend:Y,onMousedown:(0,v.R1)(_),onMouseup:Y},{default:(0,o.k6)((()=>[(0,o.Lk)("div",tt,[(0,v.R1)(w)?((0,o.uX)(),(0,o.CE)("span",at,"Recording...")):((0,o.uX)(),(0,o.CE)("span",nt,"Hold to Record")),(0,v.R1)(w)?((0,o.uX)(),(0,o.Wv)(L,{key:2})):(0,o.Q3)("",!0)])])),_:1},8,["onTouchstart","onMousedown"])]),(0,o.Lk)("div",ot,[st,((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.value,((e,t)=>((0,o.uX)(),(0,o.CE)("div",{class:"max-w-[300px] flex",key:t},[(0,o.Lk)("div",rt,[(0,o.Lk)("span",{class:(0,d.C4)(["font-bold",{"text-red-400":"user"===e.role,"text-purple-800":"assistant"===e.role}])},(0,d.v_)(e.role)+": ",3),(0,o.eW)(" "+(0,d.v_)(e.text),1)])])))),128))]),(0,o.Lk)("div",it,[(0,o.Lk)("div",lt,[ut,(0,o.Lk)("p",null,"currentWord: "+(0,d.v_)((0,v.R1)(c)),1),(0,o.Lk)("p",null,"currentMessage: "+(0,d.v_)((0,v.R1)(l)),1),(0,o.Lk)("p",null,"messages: "+(0,d.v_)((0,v.R1)(i)),1),(0,o.Lk)("p",null,"gtpIsStreaming: "+(0,d.v_)((0,v.R1)(u)),1)]),(0,o.Lk)("div",ct,[vt,(0,o.Lk)("p",null,"isLoading: "+(0,d.v_)((0,v.R1)(M)),1),(0,o.Lk)("p",null,"isGenerating: "+(0,d.v_)((0,v.R1)(j)),1),(0,o.Lk)("p",null,"iceConnectionState: "+(0,d.v_)((0,v.R1)(A)),1),(0,o.Lk)("p",null,"isError: "+(0,d.v_)((0,v.R1)(W)),1),(0,o.Lk)("p",null,"errorMessage: "+(0,d.v_)((0,v.R1)(X)),1)]),(0,o.Lk)("div",dt,[ft,(0,o.Lk)("p",null,"isRecording: "+(0,d.v_)((0,v.R1)(w)),1),(0,o.Lk)("p",null,"microphone: "+(0,d.v_)((0,v.R1)(x)&&(0,v.R1)(x).state),1),(0,o.Lk)("p",null,"microphoneIsOpen: "+(0,d.v_)((0,v.R1)(k)),1),(0,o.Lk)("p",null,"queue: "+(0,d.v_)((0,v.R1)(b)),1),(0,o.Lk)("p",null,"queueSize: "+(0,d.v_)((0,v.R1)(S)),1)]),(0,o.Lk)("div",pt,[ht,(0,o.Lk)("p",null,"transcript: "+(0,d.v_)((0,v.R1)(m)),1),(0,o.Lk)("p",null,"isProcessing: "+(0,d.v_)((0,v.R1)(t)),1),(0,o.Lk)("p",null,"connection: "+(0,d.v_)(void 0!==(0,v.R1)(p)),1),(0,o.Lk)("p",null,"isConnecting: "+(0,d.v_)((0,v.R1)(h)),1),(0,o.Lk)("p",null,"connectionIsReady: "+(0,d.v_)((0,v.R1)(y)),1)])])]))}});const gt=mt;var yt=gt;const wt=[{path:"/",name:"home",component:yt},{path:"/about",name:"about",component:()=>n.e(594).then(n.bind(n,3478))}],kt=(0,c.aE)({history:(0,c.LA)("/avatar-vue/"),routes:wt});var bt=kt;(0,a.Ef)(u).use(bt).mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,s){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],o=e[c][1],s=e[c][2];for(var i=!0,l=0;l<a.length;l++)(!1&s||r>=s)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(i=!1,s<r&&(r=s));if(i){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[a,o,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.171433dc.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-avatar:";n.l=function(a,o,s,r){if(e[a])e[a].push(o);else{var i,l;if(void 0!==s)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var v=u[c];if(v.getAttribute("src")==a||v.getAttribute("data-webpack")==t+s){i=v;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+s),i.src=a),e[a]=[o];var d=function(t,n){i.onerror=i.onload=null,clearTimeout(f);var o=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/avatar-vue/"}(),function(){var e={524:0};n.f.j=function(t,a){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var s=new Promise((function(n,a){o=e[t]=[n,a]}));a.push(o[2]=s);var r=n.p+n.u(t),i=new Error,l=function(a){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",i.name="ChunkLoadError",i.type=s,i.request=r,o[1](i)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,s,r=a[0],i=a[1],l=a[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(l)var c=l(n)}for(t&&t(a);u<r.length;u++)s=r[u],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},a=self["webpackChunkvue_avatar"]=self["webpackChunkvue_avatar"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(2534)}));a=n.O(a)})();
//# sourceMappingURL=app.9231eacf.js.map