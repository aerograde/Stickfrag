(()=>{var eo=["tdm","ffa","gungame"],Sg=[...eo,"ctf"],qc=[...eo,"bomb"],kl={yard:{name:"Yard",blurb:"Containers, trucks and a water tower.",players:10,modes:eo,urlModes:["hardpoint"],ambient:!0},town:{name:"Town",blurb:"Main Street: shops, a cinema and rooftops.",players:10,modes:qc},farm:{name:"Farm",blurb:"A barn, a corn field and windows to climb.",players:8,tdmSide:4,modes:eo,urlModes:["hardpoint"]},"farm-night":{name:"Night Farm",blurb:"Farm after dark: lanterns, pumpkins and long shadows.",players:8,tdmSide:4,urlModes:["hardpoint"]},junction:{name:"Depot",blurb:"A huge rail yard: trains, a station and a road bridge.",players:14,modes:Sg},freight:{name:"Port",blurb:"Containers by the sea, a ferry and a two-floor office.",players:12,modes:qc},range:{name:"Shooting range",blurb:"Try every gun on targets 5 to 100\xA0m away. No match, no score.",practice:!0},depot:{wip:!0},farm2:{wip:!0},farm3:{wip:!0},hats:{dev:!0},haven:{dev:!0},studio:{dev:!0},hospital:{name:"Forest Hospital",blurb:"A hospital in the woods: a yard, a gate and long sight lines.",players:14,modes:["ctf"],opensWith:"haunted-2026",retired:!0},hospital2:{name:"Hospital",blurb:"Indoors: white corridors and wards.",players:10,noCountryside:!0,modes:["ctf","bomb"],opensWith:"haunted-2026"},walllab:{dev:!0,destructible:!0}};function Zc(e){return Object.hasOwn(kl,e)?kl[e]:{}}function zl(e){return Object.entries(kl).filter(([,t])=>e(t)).map(([t])=>t)}var io={tdm:{name:"Team deathmatch",shortName:"TDM",hint:"Blue against red, 4 v 4 to 6 v 6 by map size. Pick your gun for every life.",title:"FREE-FOR-ALL",seats:{kind:"teams"},pickable:!0,menu:!0,label:"Team deathmatch"},ffa:{name:"Free for all",shortName:"FFA",hint:"Everyone against everyone, 8 to 14 players by map size. Pick your gun for every life.",title:"FREE-FOR-ALL",seats:{kind:"map"},pickable:!0,menu:!0,label:"Free for all"},gungame:{name:"Gun game",shortName:"GUN GAME",hint:"Every two kills, a new gun. The last kill with the knife wins. Up to 8 players.",title:"GUN GAME",seats:{kind:"map",cap:8},pickable:!0,menu:!0,label:"Gun game"},ctf:{name:"Capture the Flag",shortName:"CTF",hint:"Take the enemy flag to your base. First to 3 captures wins.",title:"CAPTURE THE FLAG",seats:{kind:"teams"},pickable:!0,menu:!0,label:"Capture the Flag"},bomb:{name:"Pumpkin Bomb",shortName:"BOMB",hint:"Attackers plant a pumpkin bomb at site A or B, defenders stop them. One life a round, first to 5 rounds.",title:"PUMPKIN BOMB",seats:{kind:"teams"},pickable:!0,menu:!0,label:"Pumpkin Bomb"},hardpoint:{name:"Hardpoint",shortName:"HARDPOINT",hint:"Hold points A, B and C. The team with fewer points loses tickets.",title:"HARDPOINT",seats:{kind:"teams"},pickable:!1,menu:!1,label:"Hardpoint"},range:{name:"Range",shortName:"RANGE",hint:"",title:"FREE-FOR-ALL",seats:{kind:"room"},pickable:!1,menu:!1,label:"Range"},sandbox:{name:"Sandbox",shortName:"SANDBOX",hint:"",title:"FREE-FOR-ALL",seats:{kind:"room"},pickable:!1,menu:!1,label:"Sandbox"}},bg=Object.keys(io);var Mg=bg.filter(e=>io[e].pickable);var OA=Mg.filter(e=>io[e].menu),gr=[{key:"candy",label:"Candy Stripe"},{key:"camo",label:"Forest Camo"},{key:"carbon",label:"Carbon Fibre"},{key:"hex",label:"Honeycomb"},{key:"flame",label:"Hot Rod Flames"},{key:"marble",label:"Marble"},{key:"circuit",label:"Circuit Board"},{key:"scales",label:"Dragon Scales"},{key:"creator1k",label:"Creator Bronze"},{key:"creator10k",label:"Creator Silver"},{key:"creator100k",label:"Creator Gold"}],Fl=e=>19+e,wg={rare:70,epic:4};var Eg=60,zA=1/Eg,Tg=.35,Kc=1.8,Ag=1.1,Hr=1.62,ro=.95,$c=4.5,Jc=2.2,Rg=.38,Qc=18,pa=150;var Cg=36,Pg=9,Lg=.1,Ig=5,Dg=200,Ng=1.5,Ug=30,kg=4.5,Og=26,zg=1,Fg=0,Bg=5,Hg=300,Gg=2.5,Vg=40,Wg=6,Wn=.165,Xg=1.2,Zi=.068,Ut=.047,vr=Ut,Bl=[Ut,Ut,Ut],fa=.9,Hl=.45,Ui=.06,kt=.47,ao=.22,Ya=.11,Ft=.35,ed=.08,td=.05,Gl=.3,id=.55,rd=.72,jg=.75,qg=.6,Yg=2,Zg=1,Kg={lmg:3,launcher:4,rpg:5},FA=Tg*4,Ol={he:{chance:.001,damage:4,push:5},launcher:{chance:.001,damage:4,push:5},rpg:{chance:.001,damage:4,push:5}};var $g=16,ad=Object.fromEntries(zl(e=>e.players!==void 0).map(e=>[e,Zc(e).players])),BA=Object.fromEntries(zl(e=>e.tdmSide!==void 0).map(e=>[e,Zc(e).tdmSide])),Jg=10,HA=io.gungame.seats.cap,Vl=Math.max(20,$g,Jg,32,...Object.values(ad)),GA=Math.max(...Object.values(ad));var nd=19+gr.length,Qg=[1,1,1,1,2,3,4,5,7,9,12,15,28,22,18,30,20,24];var e1=6,VA=Math.PI/2,WA=89*Math.PI/180;var da=Math.PI/180,he={Smg:0,Shotgun:1,Rifle:2,Revolver:3,Knife:4,Pistol:5,Compact:6,Deagle:7,M4:8,Silenced:9,Lmg:10,Sniper:11,Karambit:12,Machete:13,Launcher:14,Rpg:15};function ci(e){return{melee:!1,range:pa,pellets:1,scope:!1,silent:!1,launcher:!1,arm:Math.round(e.body*jg),leg:Math.round(e.body*qg),...e,spreadStill:e.spreadStill*da,spreadMoving:e.spreadMoving*da,spreadAir:e.spreadAir*da,aimStill:e.aimStill*da,aimMoving:e.aimMoving*da,aimAir:e.aimAir*da,recoil:e.recoil*da}}function Ul(e,t,i,r,a,n,s){return{id:e,key:t,label:i,melee:!0,range:r,auto:!0,interval:a,mag:0,reload:0,body:n,head:s,arm:n,leg:n,pellets:1,falloffStart:r,falloffEnd:r+1,falloffMin:1,spreadStill:0,spreadMoving:0,spreadAir:0,aimStill:0,aimMoving:0,aimAir:0,crouch:1,zoom:1,scope:!1,silent:!1,launcher:!1,recoil:0}}var ma=[ci({id:he.Smg,key:"smg",label:"SMG",auto:!0,interval:.075,mag:30,reload:1.5,body:13,head:30,falloffStart:16,falloffEnd:50,falloffMin:.65,spreadStill:.6,spreadMoving:2.5,spreadAir:4,aimStill:.3,aimMoving:1.25,aimAir:2,crouch:.5,zoom:1.3,recoil:.6}),ci({id:he.Shotgun,key:"shotgun",label:"SHOTGUN",auto:!1,interval:1.015,mag:6,reload:3,body:15,head:34,leg:15,arm:15,pellets:8,falloffStart:11,falloffEnd:25,falloffMin:.25,spreadStill:2.2,spreadMoving:3.3,spreadAir:6.5,aimStill:1.88,aimMoving:2.6,aimAir:5.2,crouch:.8,zoom:1.3,recoil:3}),ci({id:he.Rifle,key:"rifle",label:"AK",auto:!0,interval:.13,mag:25,reload:2.3,body:24,head:100,falloffStart:20,falloffEnd:80,falloffMin:.7,spreadStill:1.1,spreadMoving:4.05,spreadAir:6,aimStill:.21,aimMoving:2.6,aimAir:2.4,crouch:.4,zoom:1.3,recoil:1.1}),ci({id:he.Revolver,key:"revolver",label:"REVOLVER",auto:!1,interval:.4,mag:6,reload:2,body:50,head:94,leg:31,arm:31,falloffStart:25,falloffEnd:50,falloffMin:.8,spreadStill:.4,spreadMoving:2,spreadAir:4,aimStill:.2,aimMoving:1,aimAir:2,crouch:.5,zoom:1.3,recoil:2.2}),Ul(he.Knife,"knife","KNIFE",2,.45,55,70),ci({id:he.Pistol,key:"pistol",label:"PISTOL",auto:!1,interval:.11,mag:17,reload:1.4,body:21,head:28,leg:21,arm:19,falloffStart:15,falloffEnd:40,falloffMin:.6,spreadStill:.9,spreadMoving:2.2,spreadAir:4,aimStill:.45,aimMoving:1.4,aimAir:3,crouch:.7,zoom:1.2,recoil:.9}),ci({id:he.Compact,key:"compact",label:"COMPACT",auto:!1,interval:.15,mag:13,reload:1.6,body:25,head:70,falloffStart:15,falloffEnd:40,falloffMin:.6,spreadStill:1,spreadMoving:2.5,spreadAir:4.5,aimStill:.4,aimMoving:1.5,aimAir:3,crouch:.7,zoom:1.2,recoil:1.4}),ci({id:he.Deagle,key:"deagle",label:"HAND CANNON",auto:!1,interval:.42,mag:7,reload:2.2,body:60,head:103,leg:52,arm:52,falloffStart:25,falloffEnd:70,falloffMin:.7,spreadStill:1.6,spreadMoving:5,spreadAir:7,aimStill:.25,aimMoving:3,aimAir:5,crouch:.6,zoom:1.3,recoil:4}),ci({id:he.M4,key:"m4",label:"M4",auto:!0,interval:.09,mag:30,reload:2.1,body:17,head:50,leg:15,arm:15,falloffStart:30,falloffEnd:80,falloffMin:.65,spreadStill:.6,spreadMoving:3,spreadAir:5.5,aimStill:.12,aimMoving:1.2,aimAir:2.5,crouch:.6,zoom:1.4,recoil:.75}),ci({id:he.Silenced,key:"silenced",label:"SILENCED",auto:!1,interval:.16,mag:12,reload:1.7,body:26,head:28,falloffStart:14,falloffEnd:51,falloffMin:.5,spreadStill:.5,spreadMoving:1.6,spreadAir:4,aimStill:.15,aimMoving:1.1,aimAir:3,crouch:.7,zoom:1.25,silent:!0,recoil:.9}),ci({id:he.Lmg,key:"lmg",label:"MACHINE GUN",auto:!0,interval:.08,mag:100,reload:4.6,body:16,head:42,falloffStart:30,falloffEnd:80,falloffMin:.7,spreadStill:1.2,spreadMoving:4,spreadAir:7,aimStill:.35,aimMoving:2.5,aimAir:5,crouch:.5,zoom:1.3,recoil:.7}),ci({id:he.Sniper,key:"sniper",label:"SNIPER",auto:!1,interval:1.45,mag:5,reload:3.2,body:100,head:200,leg:60,arm:60,falloffStart:30,falloffEnd:101,falloffMin:.5,spreadStill:7,spreadMoving:10,spreadAir:14,aimStill:.02,aimMoving:4,aimAir:8,crouch:1,zoom:4,scope:!0,recoil:5}),Ul(he.Karambit,"karambit","KARAMBIT",1.8,.28,40,45),Ul(he.Machete,"machete","MACHETE",2.5,.75,70,95),ci({id:he.Launcher,key:"launcher",label:"GRENADE LAUNCHER",auto:!1,interval:.6,mag:6,reload:2.2,body:0,head:0,falloffStart:pa,falloffEnd:pa+1,falloffMin:1,spreadStill:1.5,spreadMoving:3,spreadAir:5,aimStill:.5,aimMoving:1.5,aimAir:3,crouch:.7,zoom:1.2,launcher:!0,recoil:3.5}),ci({id:he.Rpg,key:"rpg",label:"RPG",auto:!1,interval:.5,mag:1,reload:3,body:0,head:0,falloffStart:pa,falloffEnd:pa+1,falloffMin:1,spreadStill:2.5,spreadMoving:5,spreadAir:8,aimStill:.3,aimMoving:2.5,aimAir:5,crouch:.7,zoom:1.3,launcher:!0,recoil:5})],ki=[{id:0,key:"none",label:"No hat"},{id:1,key:"cap",label:"Baseball Cap"},{id:2,key:"beanie",label:"Beanie"},{id:3,key:"hardhat",label:"Hard Hat"},{id:4,key:"bandana",label:"Bandana"},{id:5,key:"cowboy",label:"Cowboy Hat"},{id:6,key:"viking",label:"Viking Helmet"},{id:7,key:"party",label:"Party Hat"},{id:8,key:"propeller",label:"Propeller Beanie"},{id:9,key:"cone",label:"Traffic Cone"},{id:10,key:"halo",label:"Halo"},{id:11,key:"bentcap",label:"Bent Cap"},{id:12,key:"samurai",label:"Samurai Helmet"},{id:13,key:"pioneer",label:"Pioneer Panama"},{id:14,key:"founder",label:"Founder Snapback"},{id:15,key:"blackhole",label:"Black Hole"},{id:16,key:"thundercloud",label:"Thundercloud"},{id:17,key:"pharaoh",label:"Pharaoh"},{id:18,key:"witch",label:"Witch Hat"},{id:19,key:"pumpkin",label:"Pumpkin Hat"},{id:20,key:"jackolantern",label:"Jack-o'-Lantern"},{id:21,key:"batears",label:"Bat Ears"},{id:22,key:"skullmask",label:"Skull Mask"},{id:23,key:"plague",label:"Plague Doctor"},{id:24,key:"mummy",label:"Mummy"}],Xt=0,t1=e=>typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<ki.length;var zr={Jump:1,Crouch:2,Sprint:4,Fire:8,Reload:16,Aim:32,Use:64,Knife:128,Throw:256,Heal:512,Respawn:1024,Sidearm:2048,Fly:4096,God:8192},XA=Math.PI*2,wi={Crouched:1,Grounded:2,Dead:4,Invulnerable:8,Frozen:16,Bot:32,Reloading:64,Sliding:1024,Throwing:8192,Healing:16384,Aiming:32768},sd=7,od=11,ld=(e,t)=>e|(t&7)<<sd|(t>>3&3)<<od,hd=e=>e>>sd&7|(e>>od&3)<<3,i1=11,ga=[{id:0,key:"none",label:"No outfit"},{id:1,key:"tracksuit",label:"Tracksuit"}],Gr=0,r1=e=>typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<ga.length,a1=[{id:"friends-weekend",name:"Friends Weekend",from:"2026-10-09",to:"2026-10-11"},{id:"haunted-2026",name:"Haunted Week",from:"2026-10-23",fromHour:18,to:"2026-11-02",teaser:"2026-10-17"}],to=e=>a1.find(t=>t.id===e);var jA=ma[he.Knife],ii={Leg:0,Arm:1,Body:2,Head:3},qA={[he.Smg]:[.3,-.06,.615,-.012],[he.Shotgun]:[.285,-.03,.68,-.002],[he.Rifle]:[.295,-.045,.63,.01],[he.Revolver]:[.384,-.045,.404,-.055],[he.Knife]:[.42,-.003,.44,-.013],[he.Pistol]:[.38,-.04,.4,-.05],[he.Compact]:[.384,-.04,.404,-.05],[he.Deagle]:[.378,-.045,.398,-.055],[he.M4]:[.285,-.055,.63,.01],[he.Silenced]:[.38,-.04,.4,-.05],[he.Lmg]:[.27,-.055,.63,-.012],[he.Sniper]:[.28,-.05,.61,-.005],[he.Karambit]:[.41,-.002,.43,-.012],[he.Machete]:[.41,-.007,.43,-.017],[he.Launcher]:[.26,-.03,.61,-.05],[he.Rpg]:[.295,-.04,.52,-.02]},n1=()=>({ax:0,ay:0,az:0,bx:0,by:0,bz:0,r:0}),s1=[ii.Body,ii.Arm,ii.Arm,ii.Arm,ii.Arm,ii.Leg,ii.Leg,ii.Leg,ii.Leg,ii.Leg,ii.Leg],o1=()=>({head:{x:0,y:0,z:0,r:0},parts:s1.map(n1)}),YA=Ya+Rg+2*Ft+vr*Xg,ZA=o1(),mr={None:0,He:1,Smoke:2,Flash:3,Round:4,Rocket:5},KA=[{kind:mr.He,key:"he",label:"GRENADE"},{kind:mr.Smoke,key:"smoke",label:"SMOKE"},{kind:mr.Flash,key:"flash",label:"FLASH"}],$A={[mr.Round]:{weapon:he.Launcher,speed:Cg,gravity:Pg,arm:Lg,fuse:Ig,damage:Dg,full:Ng,edge:Ug,radius:kg,backblast:!1},[mr.Rocket]:{weapon:he.Rpg,speed:Og,gravity:zg,arm:Fg,fuse:Bg,damage:Hg,full:Gg,edge:Vg,radius:Wg,backblast:!0}};var JA=[he.Smg,he.M4,he.Rifle,he.Shotgun,he.Sniper],QA=[he.Lmg,he.Launcher,he.Rpg],eR=[he.Pistol,he.Silenced,he.Revolver,he.Deagle],tR=[mr.He,mr.Flash,mr.Smoke],iR=[he.Smg,he.M4,he.Rifle,he.Shotgun],rR=[he.Pistol,he.Silenced,he.Revolver],aR={primary:he.Smg,heavy:he.Lmg,secondary:he.Pistol,nade:mr.He},nR=Math.max(...Object.values(Kg)),sR=new Map([[he.Sniper,2],[he.Deagle,2],[he.Lmg,0]]);var l1="ABCDEFGHJKMNPQRSTUVWXYZ23456789",oR=new RegExp(`^[${l1}]{${e1}}$`);var lR=Qg.filter(e=>e<=1).length,h1=e=>typeof e=="number"&&Number.isInteger(e)&&e>=0&&e<nd,u1=0,hR=[{id:"hat",itemKind:"hat",fallback:Xt,count:ki.length,valid:t1},{id:"outfit",itemKind:"outfit",fallback:Gr,count:ga.length,valid:r1},{id:"skin",itemKind:"colour",fallback:u1,count:nd,valid:h1}];var c1={id:"hats",label:"Hat pack",skin:"sky-sunrise",deal:"new-hats"},d1={id:"haunted",label:"Haunted pack",skin:"haunted-fog",event:"haunted-2026",deal:"table",table:[{item:"hat.witch",pct:30},{item:"hat.pumpkin",pct:30},{item:"title.haunted2026",pct:25},{item:"hat.jackolantern",pct:15}],dupXp:500},p1={id:"pumpkin",label:"Pumpkin pack",skin:"pumpkin-night",event:"haunted-2026",deal:"standard",commons:["hat.jackolantern","colour.ghost"]},f1={id:"secret",label:"Secret mission pack",skin:"sky-sunrise",deal:"new-hats"},m1={id:"standard",label:"Card pack",skin:"sky-sunrise",deal:"standard"},g1={id:"starter",label:"Starter pack",skin:"sky-sunrise",deal:"new-hats"},v1={id:"treat",label:"Trick-or-Treat pack",skin:"candy-bag",event:"haunted-2026",deal:"table",table:[{item:"hat.thundercloud",pct:10},{item:"hat.batears",pct:30},{item:"title.trickster",pct:30},{item:"title.ghosthunter",pct:30}],dupXp:300},_1={id:"weekend",label:"Friends Weekend pack",skin:"ink-gold",event:"friends-weekend",deal:"pool",pool:{limited:"friends-weekend-2026",odds:wg}},y1=[g1,m1,f1,c1,_1,p1,d1,v1],uR=y1.map(e=>e.id);var qa=["hunt.haunted-2026.pumpkins","hunt.haunted-2026.crate","hunt.haunted-2026.hospital","hunt.haunted-2026.knife","hunt.haunted-2026.glass","hunt.haunted-2026.night"],Mi="haunted-2026";var Js="friends-weekend-2026";var Br="held back",bt=(e,t,i,r,a)=>{let n=ki.find(s=>s.key===e);if(!n||n.id===Xt)throw new Error(`items: no hat model "${e}"`);return{id:`hat.${e}`,kind:"hat",label:n.label,rarity:t,source:i,art:n.id,released:r!==Br,...a?{limited:a}:{}}},x1=(e,t,i,r)=>{let a=ga.find(n=>n.key===e);if(!a||a.id===Gr)throw new Error(`items: no outfit model "${e}"`);return{id:`outfit.${e}`,kind:"outfit",label:a.label,rarity:t,source:i,art:a.id,released:r!==Br}},S1=18,b1=(e,t,i,r,a,n)=>({id:`colour.${e}`,kind:"colour",label:t,rarity:i,source:r,art:a,released:!0,...n?{limited:n}:{}}),Ni=(e,t,i)=>{let r=gr.findIndex(a=>a.key===e);if(r<0)throw new Error(`items: no wrap "${e}"`);return{id:`colour.${e}`,kind:"colour",label:gr[r].label,rarity:t,source:i,art:Fl(r),released:!1}},Fr=(e,t,i,r)=>({id:`title.${e}`,kind:"title",label:t,rarity:"rare",source:i,art:0,released:!0,...r?{limited:r}:{}}),M1=[bt("cap","common",{level:3},Br),bt("beanie","common",{level:10},Br),bt("hardhat","common",{counter:"kills.grenade",goal:25}),bt("bandana","rare",{counter:"kills.knife",goal:25},Br),bt("cowboy","rare",{counter:"streaks.3",goal:10}),bt("viking","rare",{counter:"wins",goal:10}),bt("party","common",{counter:"squad.matches",goal:1}),bt("propeller","rare",{pack:!0}),bt("cone","epic",{pack:!0}),bt("halo","epic",{owner:!0}),bt("bentcap","common",{pack:!0}),bt("samurai","epic",{pack:!0}),bt("pioneer","rare",{pack:!0},void 0,Js),bt("founder","rare",{pack:!0},Br,Js),bt("blackhole","epic",{pack:!0},void 0,Js),bt("thundercloud","epic",{pack:!0},void 0,Mi),bt("pharaoh","rare",{pack:!0},void 0,Js),bt("witch","rare",{pack:!0},void 0,Mi),bt("pumpkin","rare",{pack:!0},void 0,Mi),bt("jackolantern","common",{pack:!0},void 0,Mi),bt("batears","rare",{pack:!0},void 0,Mi),bt("skullmask","rare",{pack:!0},Br,Mi),bt("plague","epic",{pack:!0},void 0,Mi),x1("tracksuit","rare",{pack:!0},Br),bt("mummy","epic",{pack:!0},void 0,Mi),Fr("rookie","Rookie",{level:5}),Fr("headhunter","Headhunter",{counter:"kills.head",goal:500}),Fr("knifeartist","Knife Artist",{counter:"kills.knife",goal:100}),Fr("demolition","Demolition",{counter:"kills.grenade",goal:100}),Fr("squadleader","Squad Leader",{counter:"squad.matches",goal:10}),Fr("haunted2026","Haunted 2026",{pack:!0},Mi),Fr("trickster","Trickster",{pack:!0},Mi),Fr("ghosthunter","Ghost Hunter",{pack:!0},Mi),b1("ghost","Ghost","common",{pack:!0},S1,Mi),Ni("candy","common",{pack:!0}),Ni("camo","common",{pack:!0}),Ni("hex","common",{pack:!0}),Ni("carbon","common",{pack:!0}),Ni("marble","rare",{pack:!0}),Ni("scales","rare",{pack:!0}),Ni("flame","epic",{pack:!0}),Ni("circuit","epic",{pack:!0}),Ni("creator1k","epic",{creator:1}),Ni("creator10k","epic",{creator:2}),Ni("creator100k","epic",{creator:3})],w1=new Map(M1.map(e=>[e.id,e])),ud=e=>typeof e=="string"?w1.get(e):void 0;var E1=.05,T1=Kc+E1,cR=T1-Math.min(Kc-Hr,Ag-ro);function Wl(e){let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)}var dR=[fa,0,-.2,.8,-.05,.2,.8,-.05,-(Ui+.04),Ut,0,Ui+.04,Ut,0,0,0],pR=zr.Jump|zr.Crouch|zr.Sprint|zr.Fire|zr.Reload|zr.Use|zr.Throw|zr.Heal;var fR=[{id:"pumpkins",text:"Break 50 pumpkins",goal:50,counter:qa[0]},{id:"crate",text:"Find a Haunted Crate",goal:1,counter:qa[1]},{id:"hospital",text:"Finish 3 matches on the Hospital",goal:3,counter:qa[2]},{id:"knife",text:"Get 10 knife kills",goal:10,counter:qa[3]},{id:"glass",text:"Break 30 windows",goal:30,counter:qa[4]},{id:"night",text:"Finish a match on Night Farm",goal:1,counter:qa[5]}];var A1=4,R1=10,fr=(e,t,i)=>({tier:e,label:i,reward:{pack:t}}),mR={id:"haunted-2026",name:"Haunted Pass",from:to("haunted-2026").from,to:to("haunted-2026").to,stars:"pass.haunted-2026",claimed:"pass.haunted-2026.claimed",tiers:[fr(1,"standard","Card pack"),fr(2,"standard","Card pack"),fr(3,"standard","Card pack"),fr(4,"standard","Card pack"),fr(5,"treat","Trick-or-Treat pack"),fr(6,"standard","Card pack"),fr(7,"standard","Card pack"),fr(8,"standard","Card pack"),fr(9,"treat","Trick-or-Treat pack"),{tier:10,label:"The Mummy",reward:{item:"hat.mummy"}}]};var gR=R1*A1;var C1=[he.M4,he.Rifle,he.Lmg,he.Smg,he.Shotgun,he.Sniper,he.Deagle,he.Revolver,he.Pistol,he.Silenced,he.Knife],vR=(C1.length-1)*Yg+Zg,_R=zl(e=>e.opensWith!==void 0);var cd=["fuck","fck","shit","bitch","biatch","bastard","asshole","arsehole","asshat","dumbass","jackass","cunt","twat","wank","piss","bollocks","bellend","slut","whore","skank","douche","stfu","gtfo","pussy","penis","vagina","blowjob","handjob","orgasm","cumshot","jizz","dildo","horny","boobs","titty","titties","porno","pornhub","hentai","onlyfans","cocksucker","dickhead","incest","molest","rapist","raper","pedophile","paedophile","cocaine","suicide","killyourself","nigger","nigga","faggot","retard","tranny","shemale","wetback","beaner","raghead","towelhead","jigaboo","porchmonkey","mongoloid","hitler","holocaust","auschwitz","siegheil","whitepower","whitepride","1488","hh88","kkk","ficken","hurensohn","wichser","arschloch","fotze","schlampe","missgeburt","schwuchtel","putain","salope","connard","connasse","encule","batard","niquetamere","vaffanculo","fanculo","cazzo","stronzo","puttana","minchia","frocio","coglione","porcodio","dioporco","hijodeputa","pendejo","cabron","maricon","mierda","chingada","chingar","culero","gilipollas","malparido","caralho","buceta","arrombado","fodase","cuzao","klootzak","kurwa","kurva","pierdol","spierdalaj","jebac","jebany","skurwysyn","zmrd","bazdmeg","picsa","jebem","kurac","blyat","blyad","bliat","pizda","pizdec","pizdets","nahui","nahuy","khuy","mudak","pidor","pidar","gandon","yebat","eblan","zaebal","shlyukha","orospu","siktir","sikerim","yarrak","chutiya","chutiye","madarchod","behenchod","bhenchod","bhosdike","sharmouta","sharmuta","kosomak","kusomak","kontol","memek","ngentot","pukimak","putangina","tangina","caonima","tamade","ssibal","shibal","byungsin","ditme","natehigg","mikehunt","hughjass","mikeoxlong","mikehawk","hughjanus","hughgrection","philmccrack","philmcrack","ivanaboner","hughmungus","amandahug","harryballs","jenitalia","ligmaballs","sugondese"],dd=["ass","asses","arse","cock","cocks","dick","dicks","tit","tits","boob","cum","anal","anus","sex","porn","sexy","nude","nudes","boner","milf","dilf","prick","cuck","slag","rape","raped","rapes","raping","pedo","paedo","kys","fuk","fuq","heroin","meth","lsd","vore","higger","higgers","fag","fags","fagot","homo","dyke","spic","chink","gook","kike","coon","paki","negro","neger","nazi","nazis","heil","spaz","spast","puta","puto","pute","nique","merde","fdp","ntm","verga","joder","polla","zorra","carajo","troia","nutte","porra","viado","foda","kut","kanker","tering","hoer","amk","gavat","ibne","fitta","kuk","faen","geci","fasz","pica","pula","muie","futu","picka","gandu","lodu","lauda","puki","gago","puke","sibal","suka","chuj","huy","kutas","cipa","fick","shabi","cnm","dmm"],pd=["admin","moderator","stickfrag","stickops","official"],fd=["mod","mods","staff","system","server","support","owner"],md=["scunthorpe","therapist","snigger","shiitake","shitake","ishita","oshita","kshitij","penistone","swank","wankel","wankhede","retardant","badminton","pissarro","draper","scraper","rapper"],Xl={anywhere:cd,whole:dd,reservedAnywhere:pd,reservedWhole:fd,allow:md};function P1(){return gd}var gd={a:"4@*",b:"8",c:"(<",e:"3\u20AC*",g:"69",h:"#",i:"1!|*",l:"1!|",o:"0*",s:"5$",t:"7+",u:"v*",z:"2"},L1=e=>e.replace(/[\\\]^-]/g,"\\$&"),I1=e=>[...e].map(t=>`[${L1(t+(gd[t]??""))}]+`).join(""),jl=e=>e.map(I1).join("|"),yR=new RegExp(jl([...cd,...pd])),xR=new RegExp(`^(?:${jl([...dd,...fd])})$`),SR=new RegExp(jl(md),"g");var D1=e=>[...e].map(t=>`${t.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&")}+`).join(""),Xn=e=>e.map(D1).join("|"),N1=P1(),U1=e=>e.replace(/[\\\]^-]/g,"\\$&"),k1=e=>[...e].map(t=>`[${U1(t+(N1[t]??""))}]+`).join(""),jn=e=>e.map(k1).join("|"),O1=["nigger","nigga","faggot","tranny","shemale","wetback","beaner","raghead","towelhead","jigaboo","porchmonkey","retard","mongoloid","siegheil","whitepower","whitepride","hh88","kkk","hitler","auschwitz"],z1=["fag","fags","fagot","dyke","spic","chink","gook","kike","coon","paki","negro","neger","nazi","nazis","heil","higger","higgers"],bR=new RegExp(jn(Xl.allow),"g"),MR=new RegExp(jn(O1)),wR=new RegExp(`^(?:${jn(z1)})$`),ER=new RegExp(jn(Xl.anywhere)),TR=new RegExp(`^(?:${jn(Xl.whole)})$`),F1=["\u043F\u0438\u0434\u043E\u0440\u0430\u0441","\u0447\u0443\u0440\u043A\u0430","\u0447\u0443\u0440\u0431\u0430\u043D"],AR=new RegExp(`${Xn(F1)}|\u043D\u0438\u0433\u0433+[\u0435\u0430]`),RR=new RegExp(`^(?:${Xn(["\u0445\u0430\u0447","\u0445\u0430\u0447\u0438","\u0445\u0430\u0447\u0438\u043A","\u0436\u0438\u0434","\u0436\u0438\u0434\u044B","\u0436\u0438\u0434\u043E\u0432","\u0436\u0438\u0434\u0430\u0440\u0430"])})$`),CR=new RegExp(Xn(["\u0445\u0443\u0438","\u0445\u0443\u0435","\u0445\u0443\u044F","\u0445\u0443\u043B\u0438","\u043F\u0438\u0437\u0434","\u043C\u0443\u0434\u0430\u043A","\u043C\u0443\u0434\u0438\u043B","\u043C\u0443\u0434\u043E\u0437\u0432\u043E\u043D","\u043F\u0438\u0434\u043E\u0440","\u043F\u0438\u0434\u0430\u0440","\u043F\u0438\u0434\u0440","\u0433\u0430\u043D\u0434\u043E\u043D","\u0437\u0430\u043B\u0443\u043F","\u0448\u043B\u044E\u0445","\u0434\u043E\u043B\u0431\u043E\u0435\u0431"])),PR=new RegExp(`^(?:\u0437\u0430|\u043D\u0430|\u043F\u043E|\u0432\u044B|\u0443|\u043E\u0442|\u0434\u043E|\u0440\u0430\u0437|\u0441|\u043D\u0435)?(?:${Xn(["\u0435\u0431\u0430\u043D","\u0435\u0431\u0430\u043B","\u0435\u0431\u0430\u0442","\u0435\u0431\u0443","\u0435\u0431\u043E\u0448","\u0435\u0431\u0438\u0441","\u0435\u0431\u043D\u0443","\u0435\u0431\u043B\u043E","\u0435\u0431\u0435\u0442"])})`),LR=new RegExp(`^(?:${Xn(["\u0431\u043B\u044F","\u0431\u043B\u044F\u0442","\u0431\u043B\u044F\u0434","\u0441\u0443\u043A\u0430","\u0441\u0443\u043A\u0438","\u0441\u0443\u043A\u0443","\u0441\u0443\u043A\u0435","\u0441\u0443\u043A\u043E\u0438","\u0441\u0443\u0447\u0430\u0440\u0430","\u043C\u0430\u043D\u0434\u0430","\u0447\u043C\u043E","\u043C\u0440\u0430\u0437","\u0445\u0435\u0440"])})$`),B1=e=>H1(e.toLowerCase().replace(/[^a-zа-яёіїєґ0-9]/g,"")),IR=["\u0443\u0431\u0435\u0439 \u0441\u0435\u0431\u044F","\u0443\u0431\u044C\u044E \u0442\u0435\u0431\u044F","\u0441\u0434\u043E\u0445\u043D\u0438","kill yourself","killyourself"].map(B1);function H1(e){return e.replace(/ё/g,"\u0435").replace(/й/g,"\u0438").replace(/[ьъ]/g,"")}var G1="com|ru|gg|tv|io|net|org|me|ly|co|xyz|info|su|ua|by|kz|app|dev|gl|to|cc|tk|ml|ink|link|click|store|shop|online|site|club|pro|vip|top|fun|live|chat|gd|be|sh",DR=new RegExp(`https?:\\/\\/|www\\.|discord\\.gg|\\bt\\.me\\b|\\b[a-z0-9-]+\\.(?:${G1})\\b`,"i");var V1=i1-1,NR=(1<<V1)-1,UR=Math.PI*2,W1=[2,2,2,2,2,2,2,2,1,2],kR=W1.reduce((e,t)=>e+t,0),Qs=Math.PI/180,Pt=(e,t,i,r,a,n="",s=1)=>({key:e,label:t,min:i,max:r,step:a,scale:s,unit:n}),X1=[Pt("head","Head",0,300,1),Pt("body","Body",0,200,1),Pt("arm","Arm",0,200,1),Pt("leg","Leg",0,200,1)],ql=Pt("interval","Shot interval",.03,2,.005,"s"),vd=[Pt("mag","Magazine",1,150,1),Pt("reload","Reload",.2,6,.1,"s"),Pt("spreadStill","Hip spread, still",0,15,.05,"\xB0",Qs),Pt("spreadMoving","Hip spread, moving",0,15,.05,"\xB0",Qs),Pt("aimStill","Aimed spread, still",0,10,.01,"\xB0",Qs),Pt("aimMoving","Aimed spread, moving",0,10,.01,"\xB0",Qs)],j1=[Pt("falloffStart","Falloff from",0,pa,1,"m"),Pt("falloffEnd","Falloff to",1,pa+1,1,"m"),Pt("falloffMin","Damage at the end",0,1,.05,"\xD7")],q1=[...X1,ql,...j1,...vd],Y1=[ql,...vd],Z1=[Pt("head","Head",0,300,1),Pt("body","Body",0,200,1),ql,Pt("range","Reach",1,4,.1,"m")],Yc=[Pt("superChance","Super blast chance",0,.02,5e-4),Pt("superDamage","Super blast damage",1,10,.1,"\xD7"),Pt("superPush","Super blast push",1,10,.1,"\xD7")],K1=e=>e.melee?Z1:e.launcher?Y1:q1,$1=e=>Object.hasOwn(Ol,e)?Ol[e]:null,OR=[...ma.map(e=>{let t=$1(e.key);return{key:e.key,label:e.label,weapon:e,blast:t,fields:[...K1(e),...t?Yc:[]]}}),{key:"he",label:"HE GRENADE",weapon:null,blast:Ol.he,fields:Yc}];var zR=10*6e4,Vn=Math.PI/180,FR={range:60,foundCone:1.5*Vn,unseenMs:500,minTurn:5*Vn,findWithinMs:2e3,flickTurn:20*Vn,flickMs:200,trackCone:3*Vn,trackRange:40,trackMinSpeed:1,trackClearCone:10*Vn,wallRunMs:400,unseenKillMs:2e3};var J1={zenith:"#86c8ec",horizon:"#fcefd6"},GR=J1.horizon,jo="#15111c",Up=[.06,.05,.08],qo={sky:"#ffffff",ground:"#e4dcf4",sun:"#ffffff"},_d=["#ef4d4d","#3d7cf2","#f5c400","#2fae72","#ff8a1f","#9b5de5","#ff6fae","#1fb5c9","#8c5a3c","#a4c400","#5b5fef","#e0457b","#ffffff","#ff2bd6","#4ff5c1","#15111c","#39ff14","#00e5ff"],kp=e=>_d[e%_d.length];var Op=jo,Yo=["#15111c","#4a4658","#f4efe4","#2a3f7a","#2f6a42","#8a2a35","#7a4a26","#5a3388","#1f7a8c","#ff8fc8","#e8432a","#7bdc1e","#a8e6ff","#ffcf33","#ff2d95","#e8ff1a","#00e5ff","#9d3bff","#dcebf7","#e8453c","#5a6e34","#26282e","#e9a21c","#d9501f","#e9e6e0","#1f7a5a","#3a9a6a","#b9703a","#cfd6e0","#f5c542"],VR=["Ink","Graphite","Chalk","Navy","Forest","Maroon","Leather","Plum","Ocean","Bubblegum","Lava","Toxic","Ice","Gold","Hot Pink","Highlighter","Electric","Ultraviolet","Ghost",...gr.map(e=>e.label)];var zp="#f6b21b";var Q1=0,yd=1,ev=2,Lo=1,tv=2,rs=3,Ea=0,li=1,mi=2,wr=0,ss=1,xd=2,Sd=3,bd=4,Su=5,dn=100,iv=101,rv=102,av=103,nv=104,bu=200,sv=201,ov=202,lv=203,Fp=204,Bp=205,hv=206,uv=207,Mu=208,cv=209,dv=210,pv=211,fv=212,mv=213,gv=214,Ph=0,Lh=1,Ih=2,cs=3,Dh=4,Nh=5,Uh=6,kh=7,wu=0,vv=1,_v=2,ir=0,Hp=1,Gp=2,Vp=3,Wp=4,Xp=5,jp=6,qp=7,Yp=300,Ta=301,xn=302,Yl=303,Zl=304,Zo=306,ds=1e3,Qi=1001,Oh=1002,It=1003,yv=1004,no=1005,Rt=1006,Kl=1007,Mr=1008,oi=1009,Zp=1010,Kp=1011,ps=1012,Eu=1013,rr=1014,Bi=1015,ar=1016,Tu=1017,Au=1018,fs=1020,$p=35902,Jp=35899,Qp=1021,ef=1022,Jt=1023,Tr=1026,Ma=1027,Ru=1028,Cu=1029,Aa=1030,Pu=1031,Lu=1033,Io=33776,Do=33777,No=33778,Uo=33779,zh=35840,Fh=35841,Bh=35842,Hh=35843,Gh=36196,Vh=37492,Wh=37496,Xh=37488,jh=37489,Fo=37490,qh=37491,Yh=37808,Zh=37809,Kh=37810,$h=37811,Jh=37812,Qh=37813,eu=37814,tu=37815,iu=37816,ru=37817,au=37818,nu=37819,su=37820,ou=37821,lu=36492,hu=36494,uu=36495,cu=36283,du=36284,Bo=36285,pu=36286,Ho=2300,fu=2301,$l=2302,Md=2303,wd=2400,Ed=2401,Td=2402,xv=3200,ms=0,Sv=1,$r="",jt="srgb",Go="srgb-linear",Vo="linear",dt="srgb",Jl=7680,bv=519,Mv=512,wv=513,Ev=514,Iu=515,Tv=516,Av=517,Du=518,Rv=519,Cv=35044,tf=35048,Ad="300 es",er=2e3,gs=2001;function Pv(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Lv(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Wo(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Iv(){let e=Wo("canvas");return e.style.display="block",e}var Rd={},Sn=null;function Cd(...e){let t="THREE."+e.shift();Sn?Sn("log",t,...e):console.log(t,...e)}function rf(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let i=e[1];i&&i.isStackTrace?e[0]+=" "+i.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function ze(...e){e=rf(e);let t="THREE."+e.shift();if(Sn)Sn("warn",t,...e);else{let i=e[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...e)}}function He(...e){e=rf(e);let t="THREE."+e.shift();if(Sn)Sn("error",t,...e);else{let i=e[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...e)}}function _n(...e){let t=e.join(" ");t in Rd||(Rd[t]=!0,ze(...e))}function Dv(e,t,i){return new Promise(function(r,a){function n(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(n,i);break;default:r()}}setTimeout(n,i)})}var Nv={[Ph]:Lh,[Ih]:Uh,[Dh]:kh,[cs]:Nh,[Lh]:Ph,[Uh]:Ih,[kh]:Dh,[Nh]:cs},Pa=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,n=r.length;a<n;a++)r[a].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pd=1234567,os=Math.PI/180,vs=180/Math.PI;function La(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Kt[e&255]+Kt[e>>8&255]+Kt[e>>16&255]+Kt[e>>24&255]+"-"+Kt[t&255]+Kt[t>>8&255]+"-"+Kt[t>>16&15|64]+Kt[t>>24&255]+"-"+Kt[i&63|128]+Kt[i>>8&255]+"-"+Kt[i>>16&255]+Kt[i>>24&255]+Kt[r&255]+Kt[r>>8&255]+Kt[r>>16&255]+Kt[r>>24&255]).toLowerCase()}function Qe(e,t,i){return Math.max(t,Math.min(i,e))}function Nu(e,t){return(e%t+t)%t}function Uv(e,t,i,r,a){return r+(e-t)*(a-r)/(i-t)}function kv(e,t,i){return e!==t?(i-e)/(t-e):0}function ls(e,t,i){return(1-i)*e+i*t}function Ov(e,t,i,r){return ls(e,t,1-Math.exp(-i*r))}function zv(e,t=1){return t-Math.abs(Nu(e,t*2)-t)}function Fv(e,t,i){return e<=t?0:e>=i?1:(e=(e-t)/(i-t),e*e*(3-2*e))}function Bv(e,t,i){return e<=t?0:e>=i?1:(e=(e-t)/(i-t),e*e*e*(e*(e*6-15)+10))}function Hv(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Gv(e,t){return e+Math.random()*(t-e)}function Vv(e){return e*(.5-Math.random())}function Wv(e){e!==void 0&&(Pd=e);let t=Pd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xv(e){return e*os}function jv(e){return e*vs}function qv(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Yv(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function Zv(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function Kv(e,t,i,r,a){let n=Math.cos,s=Math.sin,o=n(i/2),l=s(i/2),h=n((t+r)/2),u=s((t+r)/2),d=n((t-r)/2),c=s((t-r)/2),p=n((r-t)/2),g=s((r-t)/2);switch(a){case"XYX":e.set(o*u,l*d,l*c,o*h);break;case"YZY":e.set(l*c,o*u,l*d,o*h);break;case"ZXZ":e.set(l*d,l*c,o*u,o*h);break;case"XZX":e.set(o*u,l*g,l*p,o*h);break;case"YXY":e.set(l*p,o*u,l*g,o*h);break;case"ZYZ":e.set(l*g,l*p,o*u,o*h);break;default:ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function pn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ri(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ss={DEG2RAD:os,RAD2DEG:vs,generateUUID:La,clamp:Qe,euclideanModulo:Nu,mapLinear:Uv,inverseLerp:kv,lerp:ls,damp:Ov,pingpong:zv,smoothstep:Fv,smootherstep:Bv,randInt:Hv,randFloat:Gv,randFloatSpread:Vv,seededRandom:Wv,degToRad:Xv,radToDeg:jv,isPowerOfTwo:qv,ceilPowerOfTwo:Yv,floorPowerOfTwo:Zv,setQuaternionFromProperEuler:Kv,normalize:ri,denormalize:pn},K=class af{static{af.prototype.isVector2=!0}constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let i=this.x,r=this.y,a=t.elements;return this.x=a[0]*i+a[3]*r+a[6],this.y=a[1]*i+a[4]*r+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Qe(this.x,t.x,i.x),this.y=Qe(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Qe(this.x,t,i),this.y=Qe(this.y,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Qe(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(Qe(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){let r=Math.cos(i),a=Math.sin(i),n=this.x-t.x,s=this.y-t.y;return this.x=n*r-s*a+t.x,this.y=n*a+s*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Hi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,n,s){let o=i[r+0],l=i[r+1],h=i[r+2],u=i[r+3],d=a[n+0],c=a[n+1],p=a[n+2],g=a[n+3];if(u!==g||o!==d||l!==c||h!==p){let v=o*d+l*c+h*p+u*g;v<0&&(d=-d,c=-c,p=-p,g=-g,v=-v);let m=1-s;if(v<.9995){let f=Math.acos(v),x=Math.sin(f);m=Math.sin(m*f)/x,s=Math.sin(s*f)/x,o=o*m+d*s,l=l*m+c*s,h=h*m+p*s,u=u*m+g*s}else{o=o*m+d*s,l=l*m+c*s,h=h*m+p*s,u=u*m+g*s;let f=1/Math.sqrt(o*o+l*l+h*h+u*u);o*=f,l*=f,h*=f,u*=f}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,a,n){let s=i[r],o=i[r+1],l=i[r+2],h=i[r+3],u=a[n],d=a[n+1],c=a[n+2],p=a[n+3];return e[t]=s*p+h*u+o*c-l*d,e[t+1]=o*p+h*d+l*u-s*c,e[t+2]=l*p+h*c+s*d-o*u,e[t+3]=h*p-s*u-o*d-l*c,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,n=e._order,s=Math.cos,o=Math.sin,l=s(i/2),h=s(r/2),u=s(a/2),d=o(i/2),c=o(r/2),p=o(a/2);switch(n){case"XYZ":this._x=d*h*u+l*c*p,this._y=l*c*u-d*h*p,this._z=l*h*p+d*c*u,this._w=l*h*u-d*c*p;break;case"YXZ":this._x=d*h*u+l*c*p,this._y=l*c*u-d*h*p,this._z=l*h*p-d*c*u,this._w=l*h*u+d*c*p;break;case"ZXY":this._x=d*h*u-l*c*p,this._y=l*c*u+d*h*p,this._z=l*h*p+d*c*u,this._w=l*h*u-d*c*p;break;case"ZYX":this._x=d*h*u-l*c*p,this._y=l*c*u+d*h*p,this._z=l*h*p-d*c*u,this._w=l*h*u+d*c*p;break;case"YZX":this._x=d*h*u+l*c*p,this._y=l*c*u+d*h*p,this._z=l*h*p-d*c*u,this._w=l*h*u-d*c*p;break;case"XZY":this._x=d*h*u-l*c*p,this._y=l*c*u-d*h*p,this._z=l*h*p+d*c*u,this._w=l*h*u+d*c*p;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+n)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],n=t[1],s=t[5],o=t[9],l=t[2],h=t[6],u=t[10],d=i+s+u;if(d>0){let c=.5/Math.sqrt(d+1);this._w=.25/c,this._x=(h-o)*c,this._y=(a-l)*c,this._z=(n-r)*c}else if(i>s&&i>u){let c=2*Math.sqrt(1+i-s-u);this._w=(h-o)/c,this._x=.25*c,this._y=(r+n)/c,this._z=(a+l)/c}else if(s>u){let c=2*Math.sqrt(1+s-i-u);this._w=(a-l)/c,this._x=(r+n)/c,this._y=.25*c,this._z=(o+h)/c}else{let c=2*Math.sqrt(1+u-i-s);this._w=(n-r)/c,this._x=(a+l)/c,this._y=(o+h)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=t._x,o=t._y,l=t._z,h=t._w;return this._x=i*h+n*s+r*l-a*o,this._y=r*h+n*o+a*s-i*l,this._z=a*h+n*l+i*o-r*s,this._w=n*h-i*s-r*o-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,n=-n,s=-s);let o=1-t;if(s<.9995){let l=Math.acos(s),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+a*t,this._w=this._w*o+n*t,this._onChangeCallback()}else this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+a*t,this._w=this._w*o+n*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class nf{static{nf.prototype.isVector3=!0}constructor(t=0,i=0,r=0){this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Ld.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Ld.setFromAxisAngle(t,i))}applyMatrix3(t){let i=this.x,r=this.y,a=this.z,n=t.elements;return this.x=n[0]*i+n[3]*r+n[6]*a,this.y=n[1]*i+n[4]*r+n[7]*a,this.z=n[2]*i+n[5]*r+n[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,n=t.elements,s=1/(n[3]*i+n[7]*r+n[11]*a+n[15]);return this.x=(n[0]*i+n[4]*r+n[8]*a+n[12])*s,this.y=(n[1]*i+n[5]*r+n[9]*a+n[13])*s,this.z=(n[2]*i+n[6]*r+n[10]*a+n[14])*s,this}applyQuaternion(t){let i=this.x,r=this.y,a=this.z,n=t.x,s=t.y,o=t.z,l=t.w,h=2*(s*a-o*r),u=2*(o*i-n*a),d=2*(n*r-s*i);return this.x=i+l*h+s*d-o*u,this.y=r+l*u+o*h-n*d,this.z=a+l*d+n*u-s*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let i=this.x,r=this.y,a=this.z,n=t.elements;return this.x=n[0]*i+n[4]*r+n[8]*a,this.y=n[1]*i+n[5]*r+n[9]*a,this.z=n[2]*i+n[6]*r+n[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Qe(this.x,t.x,i.x),this.y=Qe(this.y,t.y,i.y),this.z=Qe(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Qe(this.x,t,i),this.y=Qe(this.y,t,i),this.z=Qe(this.z,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Qe(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){let r=t.x,a=t.y,n=t.z,s=i.x,o=i.y,l=i.z;return this.x=a*l-n*o,this.y=n*s-r*l,this.z=r*o-a*s,this}projectOnVector(t){let i=t.lengthSq();if(i===0)return this.set(0,0,0);let r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return Ql.copy(this).projectOnVector(t),this.sub(Ql)}reflect(t){return this.sub(Ql.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(Qe(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y,a=this.z-t.z;return i*i+r*r+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){let a=Math.sin(i)*t;return this.x=a*Math.sin(r),this.y=Math.cos(i)*t,this.z=a*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){let i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=a,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ql=new R,Ld=new Hi,$e=class sf{static{sf.prototype.isMatrix3=!0}constructor(t,i,r,a,n,s,o,l,h){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,a,n,s,o,l,h)}set(t,i,r,a,n,s,o,l,h){let u=this.elements;return u[0]=t,u[1]=a,u[2]=o,u[3]=i,u[4]=n,u[5]=l,u[6]=r,u[7]=s,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,n=this.elements,s=r[0],o=r[3],l=r[6],h=r[1],u=r[4],d=r[7],c=r[2],p=r[5],g=r[8],v=a[0],m=a[3],f=a[6],x=a[1],E=a[4],y=a[7],w=a[2],A=a[5],C=a[8];return n[0]=s*v+o*x+l*w,n[3]=s*m+o*E+l*A,n[6]=s*f+o*y+l*C,n[1]=h*v+u*x+d*w,n[4]=h*m+u*E+d*A,n[7]=h*f+u*y+d*C,n[2]=c*v+p*x+g*w,n[5]=c*m+p*E+g*A,n[8]=c*f+p*y+g*C,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],o=t[5],l=t[6],h=t[7],u=t[8];return i*s*u-i*o*h-r*n*u+r*o*l+a*n*h-a*s*l}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=u*s-o*h,c=o*l-u*n,p=h*n-s*l,g=i*d+r*c+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=d*v,t[1]=(a*h-u*r)*v,t[2]=(o*r-a*s)*v,t[3]=c*v,t[4]=(u*i-a*l)*v,t[5]=(a*n-o*i)*v,t[6]=p*v,t[7]=(r*l-h*i)*v,t[8]=(s*i-r*n)*v,this}transpose(){let t,i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,a,n,s,o){let l=Math.cos(n),h=Math.sin(n);return this.set(r*l,r*h,-r*(l*s+h*o)+s+t,-a*h,a*l,-a*(-h*s+l*o)+o+i,0,0,1),this}scale(t,i){return _n("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(eh.makeScale(t,i)),this}rotate(t){return _n("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(eh.makeRotation(-t)),this}translate(t,i){return _n("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(eh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<9;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}},eh=new $e,Id=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dd=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $v(){let e={enabled:!0,workingColorSpace:Go,spaces:{},convert:function(a,n,s){return this.enabled===!1||n===s||!n||!s||(this.spaces[n].transfer===dt&&(a.r=Er(a.r),a.g=Er(a.g),a.b=Er(a.b)),this.spaces[n].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[n].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===dt&&(a.r=yn(a.r),a.g=yn(a.g),a.b=yn(a.b))),a},workingToColorSpace:function(a,n){return this.convert(a,this.workingColorSpace,n)},colorSpaceToWorking:function(a,n){return this.convert(a,n,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===$r?Vo:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,n=this.workingColorSpace){return a.fromArray(this.spaces[n].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,n,s){return a.copy(this.spaces[n].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,n){return _n("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,n)},toWorkingColorSpace:function(a,n){return _n("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,n)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Go]:{primaries:t,whitePoint:r,transfer:Vo,toXYZ:Id,fromXYZ:Dd,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:t,whitePoint:r,transfer:dt,toXYZ:Id,fromXYZ:Dd,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),e}var st=$v();function Er(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function yn(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Za,Jv=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Za===void 0&&(Za=Wo("canvas")),Za.width=e.width,Za.height=e.height;let r=Za.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Za}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Wo("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let n=0;n<a.length;n++)a[n]=Er(a[n]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Er(t[i]/255)*255):t[i]=Er(t[i]);return{data:t,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Qv=0,Uu=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Qv++}),this.uuid=La(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let n=0,s=r.length;n<s;n++)r[n].isDataTexture?a.push(th(r[n].image)):a.push(th(r[n]))}else a=th(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function th(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Jv.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}var e_=0,ih=new R,Gi=class ko extends Pa{constructor(t=ko.DEFAULT_IMAGE,i=ko.DEFAULT_MAPPING,r=Qi,a=Qi,n=Rt,s=Mr,o=Jt,l=oi,h=ko.DEFAULT_ANISOTROPY,u=$r){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=La(),this.name="",this.source=new Uu(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=n,this.minFilter=s,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ih).x}get height(){return this.source.getSize(ih).y}get depth(){return this.source.getSize(ih).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){ze(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let a=this[i];if(a===void 0){ze(`Texture.setValues(): property '${i}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ds:t.x=t.x-Math.floor(t.x);break;case Qi:t.x=t.x<0?0:1;break;case Oh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ds:t.y=t.y-Math.floor(t.y);break;case Qi:t.y=t.y<0?0:1;break;case Oh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Gi.DEFAULT_IMAGE=null;Gi.DEFAULT_MAPPING=Yp;Gi.DEFAULT_ANISOTROPY=1;var At=class of{static{of.prototype.isVector4=!0}constructor(t=0,i=0,r=0,a=1){this.x=t,this.y=i,this.z=r,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,a){return this.x=t,this.y=i,this.z=r,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,n=this.w,s=t.elements;return this.x=s[0]*i+s[4]*r+s[8]*a+s[12]*n,this.y=s[1]*i+s[5]*r+s[9]*a+s[13]*n,this.z=s[2]*i+s[6]*r+s[10]*a+s[14]*n,this.w=s[3]*i+s[7]*r+s[11]*a+s[15]*n,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,a,n,s=t.elements,o=s[0],l=s[4],h=s[8],u=s[1],d=s[5],c=s[9],p=s[2],g=s[6],v=s[10];if(Math.abs(l-u)<.01&&Math.abs(h-p)<.01&&Math.abs(c-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(h+p)<.1&&Math.abs(c+g)<.1&&Math.abs(o+d+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;let f=(o+1)/2,x=(d+1)/2,E=(v+1)/2,y=(l+u)/4,w=(h+p)/4,A=(c+g)/4;return f>x&&f>E?f<.01?(r=0,a=.707106781,n=.707106781):(r=Math.sqrt(f),a=y/r,n=w/r):x>E?x<.01?(r=.707106781,a=0,n=.707106781):(a=Math.sqrt(x),r=y/a,n=A/a):E<.01?(r=.707106781,a=.707106781,n=0):(n=Math.sqrt(E),r=w/n,a=A/n),this.set(r,a,n,i),this}let m=Math.sqrt((g-c)*(g-c)+(h-p)*(h-p)+(u-l)*(u-l));return Math.abs(m)<.001&&(m=1),this.x=(g-c)/m,this.y=(h-p)/m,this.z=(u-l)/m,this.w=Math.acos((o+d+v-1)/2),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Qe(this.x,t.x,i.x),this.y=Qe(this.y,t.y,i.y),this.z=Qe(this.z,t.z,i.z),this.w=Qe(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Qe(this.x,t,i),this.y=Qe(this.y,t,i),this.z=Qe(this.z,t,i),this.w=Qe(this.w,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Qe(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},t_=class extends Pa{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},a=new Gi(r),n=i.count;for(let s=0;s<n;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Uu(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},gi=class extends t_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},lf=class extends Gi{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},hf=class extends Gi{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},We=class mu{static{mu.prototype.isMatrix4=!0}constructor(t,i,r,a,n,s,o,l,h,u,d,c,p,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,a,n,s,o,l,h,u,d,c,p,g,v,m)}set(t,i,r,a,n,s,o,l,h,u,d,c,p,g,v,m){let f=this.elements;return f[0]=t,f[4]=i,f[8]=r,f[12]=a,f[1]=n,f[5]=s,f[9]=o,f[13]=l,f[2]=h,f[6]=u,f[10]=d,f[14]=c,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mu().fromArray(this.elements)}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){let i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){let i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let i=this.elements,r=t.elements,a=1/Ka.setFromMatrixColumn(t,0).length(),n=1/Ka.setFromMatrixColumn(t,1).length(),s=1/Ka.setFromMatrixColumn(t,2).length();return i[0]=r[0]*a,i[1]=r[1]*a,i[2]=r[2]*a,i[3]=0,i[4]=r[4]*n,i[5]=r[5]*n,i[6]=r[6]*n,i[7]=0,i[8]=r[8]*s,i[9]=r[9]*s,i[10]=r[10]*s,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){let i=this.elements,r=t.x,a=t.y,n=t.z,s=Math.cos(r),o=Math.sin(r),l=Math.cos(a),h=Math.sin(a),u=Math.cos(n),d=Math.sin(n);if(t.order==="XYZ"){let c=s*u,p=s*d,g=o*u,v=o*d;i[0]=l*u,i[4]=-l*d,i[8]=h,i[1]=p+g*h,i[5]=c-v*h,i[9]=-o*l,i[2]=v-c*h,i[6]=g+p*h,i[10]=s*l}else if(t.order==="YXZ"){let c=l*u,p=l*d,g=h*u,v=h*d;i[0]=c+v*o,i[4]=g*o-p,i[8]=s*h,i[1]=s*d,i[5]=s*u,i[9]=-o,i[2]=p*o-g,i[6]=v+c*o,i[10]=s*l}else if(t.order==="ZXY"){let c=l*u,p=l*d,g=h*u,v=h*d;i[0]=c-v*o,i[4]=-s*d,i[8]=g+p*o,i[1]=p+g*o,i[5]=s*u,i[9]=v-c*o,i[2]=-s*h,i[6]=o,i[10]=s*l}else if(t.order==="ZYX"){let c=s*u,p=s*d,g=o*u,v=o*d;i[0]=l*u,i[4]=g*h-p,i[8]=c*h+v,i[1]=l*d,i[5]=v*h+c,i[9]=p*h-g,i[2]=-h,i[6]=o*l,i[10]=s*l}else if(t.order==="YZX"){let c=s*l,p=s*h,g=o*l,v=o*h;i[0]=l*u,i[4]=v-c*d,i[8]=g*d+p,i[1]=d,i[5]=s*u,i[9]=-o*u,i[2]=-h*u,i[6]=p*d+g,i[10]=c-v*d}else if(t.order==="XZY"){let c=s*l,p=s*h,g=o*l,v=o*h;i[0]=l*u,i[4]=-d,i[8]=h*u,i[1]=c*d+v,i[5]=s*u,i[9]=p*d-g,i[2]=g*d-p,i[6]=o*u,i[10]=v*d+c}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(i_,t,r_)}lookAt(t,i,r){let a=this.elements;return di.subVectors(t,i),di.lengthSq()===0&&(di.z=1),di.normalize(),Vr.crossVectors(r,di),Vr.lengthSq()===0&&(Math.abs(r.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),Vr.crossVectors(r,di)),Vr.normalize(),so.crossVectors(di,Vr),a[0]=Vr.x,a[4]=so.x,a[8]=di.x,a[1]=Vr.y,a[5]=so.y,a[9]=di.y,a[2]=Vr.z,a[6]=so.z,a[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,n=this.elements,s=r[0],o=r[4],l=r[8],h=r[12],u=r[1],d=r[5],c=r[9],p=r[13],g=r[2],v=r[6],m=r[10],f=r[14],x=r[3],E=r[7],y=r[11],w=r[15],A=a[0],C=a[4],_=a[8],S=a[12],L=a[1],P=a[5],N=a[9],V=a[13],D=a[2],F=a[6],Y=a[10],G=a[14],re=a[3],j=a[7],Z=a[11],J=a[15];return n[0]=s*A+o*L+l*D+h*re,n[4]=s*C+o*P+l*F+h*j,n[8]=s*_+o*N+l*Y+h*Z,n[12]=s*S+o*V+l*G+h*J,n[1]=u*A+d*L+c*D+p*re,n[5]=u*C+d*P+c*F+p*j,n[9]=u*_+d*N+c*Y+p*Z,n[13]=u*S+d*V+c*G+p*J,n[2]=g*A+v*L+m*D+f*re,n[6]=g*C+v*P+m*F+f*j,n[10]=g*_+v*N+m*Y+f*Z,n[14]=g*S+v*V+m*G+f*J,n[3]=x*A+E*L+y*D+w*re,n[7]=x*C+E*P+y*F+w*j,n[11]=x*_+E*N+y*Y+w*Z,n[15]=x*S+E*V+y*G+w*J,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[4],a=t[8],n=t[12],s=t[1],o=t[5],l=t[9],h=t[13],u=t[2],d=t[6],c=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15],x=l*p-h*c,E=o*p-h*d,y=o*c-l*d,w=s*p-h*u,A=s*c-l*u,C=s*d-o*u;return i*(v*x-m*E+f*y)-r*(g*x-m*w+f*A)+a*(g*E-v*w+f*C)-n*(g*y-v*A+m*C)}determinantAffine(){let t=this.elements,i=t[0],r=t[4],a=t[8],n=t[1],s=t[5],o=t[9],l=t[2],h=t[6],u=t[10];return i*(s*u-o*h)-r*(n*u-o*l)+a*(n*h-s*l)}transpose(){let t=this.elements,i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=i,a[14]=r),this}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=t[9],c=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],x=i*o-r*s,E=i*l-a*s,y=i*h-n*s,w=r*l-a*o,A=r*h-n*o,C=a*h-n*l,_=u*v-d*g,S=u*m-c*g,L=u*f-p*g,P=d*m-c*v,N=d*f-p*v,V=c*f-p*m,D=x*V-E*N+y*P+w*L-A*S+C*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/D;return t[0]=(o*V-l*N+h*P)*F,t[1]=(a*N-r*V-n*P)*F,t[2]=(v*C-m*A+f*w)*F,t[3]=(c*A-d*C-p*w)*F,t[4]=(l*L-s*V-h*S)*F,t[5]=(i*V-a*L+n*S)*F,t[6]=(m*y-g*C-f*E)*F,t[7]=(u*C-c*y+p*E)*F,t[8]=(s*N-o*L+h*_)*F,t[9]=(r*L-i*N-n*_)*F,t[10]=(g*A-v*y+f*x)*F,t[11]=(d*y-u*A-p*x)*F,t[12]=(o*S-s*P-l*_)*F,t[13]=(i*P-r*S+a*_)*F,t[14]=(v*E-g*w-m*x)*F,t[15]=(u*w-d*E+c*x)*F,this}scale(t){let i=this.elements,r=t.x,a=t.y,n=t.z;return i[0]*=r,i[4]*=a,i[8]*=n,i[1]*=r,i[5]*=a,i[9]*=n,i[2]*=r,i[6]*=a,i[10]*=n,i[3]*=r,i[7]*=a,i[11]*=n,this}getMaxScaleOnAxis(){let t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,a))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){let i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){let r=Math.cos(i),a=Math.sin(i),n=1-r,s=t.x,o=t.y,l=t.z,h=n*s,u=n*o;return this.set(h*s+r,h*o-a*l,h*l+a*o,0,h*o+a*l,u*o+r,u*l-a*s,0,h*l-a*o,u*l+a*s,n*l*l+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,a,n,s){return this.set(1,r,n,0,t,1,s,0,i,a,1,0,0,0,0,1),this}compose(t,i,r){let a=this.elements,n=i._x,s=i._y,o=i._z,l=i._w,h=n+n,u=s+s,d=o+o,c=n*h,p=n*u,g=n*d,v=s*u,m=s*d,f=o*d,x=l*h,E=l*u,y=l*d,w=r.x,A=r.y,C=r.z;return a[0]=(1-(v+f))*w,a[1]=(p+y)*w,a[2]=(g-E)*w,a[3]=0,a[4]=(p-y)*A,a[5]=(1-(c+f))*A,a[6]=(m+x)*A,a[7]=0,a[8]=(g+E)*C,a[9]=(m-x)*C,a[10]=(1-(c+v))*C,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,i,r){let a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];let n=this.determinantAffine();if(n===0)return r.set(1,1,1),i.identity(),this;let s=Ka.set(a[0],a[1],a[2]).length(),o=Ka.set(a[4],a[5],a[6]).length(),l=Ka.set(a[8],a[9],a[10]).length();n<0&&(s=-s),Oi.copy(this);let h=1/s,u=1/o,d=1/l;return Oi.elements[0]*=h,Oi.elements[1]*=h,Oi.elements[2]*=h,Oi.elements[4]*=u,Oi.elements[5]*=u,Oi.elements[6]*=u,Oi.elements[8]*=d,Oi.elements[9]*=d,Oi.elements[10]*=d,i.setFromRotationMatrix(Oi),r.x=s,r.y=o,r.z=l,this}makePerspective(t,i,r,a,n,s,o=er,l=!1){let h=this.elements,u=2*n/(i-t),d=2*n/(r-a),c=(i+t)/(i-t),p=(r+a)/(r-a),g,v;if(l)g=n/(s-n),v=s*n/(s-n);else if(o===er)g=-(s+n)/(s-n),v=-2*s*n/(s-n);else if(o===gs)g=-s/(s-n),v=-s*n/(s-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=u,h[4]=0,h[8]=c,h[12]=0,h[1]=0,h[5]=d,h[9]=p,h[13]=0,h[2]=0,h[6]=0,h[10]=g,h[14]=v,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,i,r,a,n,s,o=er,l=!1){let h=this.elements,u=2/(i-t),d=2/(r-a),c=-(i+t)/(i-t),p=-(r+a)/(r-a),g,v;if(l)g=1/(s-n),v=s/(s-n);else if(o===er)g=-2/(s-n),v=-(s+n)/(s-n);else if(o===gs)g=-1/(s-n),v=-n/(s-n);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=u,h[4]=0,h[8]=0,h[12]=c,h[1]=0,h[5]=d,h[9]=0,h[13]=p,h[2]=0,h[6]=0,h[10]=g,h[14]=v,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<16;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}},Ka=new R,Oi=new We,i_=new R(0,0,0),r_=new R(1,1,1),Vr=new R,so=new R,di=new R,Nd=new We,Ud=new Hi,vi=class uf{constructor(t=0,i=0,r=0,a=uf.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,a=this._order){return this._x=t,this._y=i,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let a=t.elements,n=a[0],s=a[4],o=a[8],l=a[1],h=a[5],u=a[9],d=a[2],c=a[6],p=a[10];switch(i){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(c,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,h)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(c,p),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-s,h));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qe(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(c,h),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-u,p),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Nd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nd,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Ud.setFromEuler(this),this.setFromQuaternion(Ud,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vi.DEFAULT_ORDER="XYZ";var cf=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},a_=0,kd=new R,$a=new Hi,_r=new We,oo=new R,qn=new R,n_=new R,s_=new Hi,Od=new R(1,0,0),zd=new R(0,1,0),Fd=new R(0,0,1),Bd={type:"added"},o_={type:"removed"},Ja={type:"childadded",child:null},rh={type:"childremoved",child:null},_i=class Oo extends Pa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:a_++}),this.uuid=La(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Oo.DEFAULT_UP.clone();let t=new R,i=new vi,r=new Hi,a=new R(1,1,1);function n(){r.setFromEuler(i,!1)}function s(){i.setFromQuaternion(r,void 0,!1)}i._onChange(n),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new We},normalMatrix:{value:new $e}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=Oo.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Oo.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return $a.setFromAxisAngle(t,i),this.quaternion.multiply($a),this}rotateOnWorldAxis(t,i){return $a.setFromAxisAngle(t,i),this.quaternion.premultiply($a),this}rotateX(t){return this.rotateOnAxis(Od,t)}rotateY(t){return this.rotateOnAxis(zd,t)}rotateZ(t){return this.rotateOnAxis(Fd,t)}translateOnAxis(t,i){return kd.copy(t).applyQuaternion(this.quaternion),this.position.add(kd.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Od,t)}translateY(t){return this.translateOnAxis(zd,t)}translateZ(t){return this.translateOnAxis(Fd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_r.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?oo.copy(t):oo.set(t,i,r);let a=this.parent;this.updateWorldMatrix(!0,!1),qn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_r.lookAt(qn,oo,this.up):_r.lookAt(oo,qn,this.up),this.quaternion.setFromRotationMatrix(_r),a&&(_r.extractRotation(a.matrixWorld),$a.setFromRotationMatrix(_r),this.quaternion.premultiply($a.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(He("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bd),Ja.child=t,this.dispatchEvent(Ja),Ja.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(o_),rh.child=t,this.dispatchEvent(rh),rh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_r.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_r.multiply(t.parent.matrixWorld)),t.applyMatrix4(_r),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bd),Ja.child=t,this.dispatchEvent(Ja),Ja.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,a=this.children.length;r<a;r++){let n=this.children[r].getObjectByProperty(t,i);if(n!==void 0)return n}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qn,t,n_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qn,s_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,a=t.z,n=this.matrix.elements;n[12]+=i-n[0]*i-n[4]*r-n[8]*a,n[13]+=r-n[1]*i-n[5]*r-n[9]*a,n[14]+=a-n[2]*i-n[6]*r-n[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i,r=!1){let a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){let n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].updateWorldMatrix(!1,!0,r)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,a.name=this.name,a.castShadow=this.castShadow,a.receiveShadow=this.receiveShadow,a.visible=this.visible,a.frustumCulled=this.frustumCulled,a.renderOrder=this.renderOrder,a.static=this.static,a.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=n(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){let d=l[h];n(t.shapes,d)}else n(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(n(t.materials,this.material[l]));a.material=o}else a.material=n(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(n(t.animations,l))}}if(i){let o=s(t.geometries),l=s(t.materials),h=s(t.textures),u=s(t.images),d=s(t.shapes),c=s(t.skeletons),p=s(t.animations),g=s(t.nodes);o.length>0&&(r.geometries=o),l.length>0&&(r.materials=l),h.length>0&&(r.textures=h),u.length>0&&(r.images=u),d.length>0&&(r.shapes=d),c.length>0&&(r.skeletons=c),p.length>0&&(r.animations=p),g.length>0&&(r.nodes=g)}return r.object=a,r;function s(o){let l=[];for(let h in o){let u=o[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let a=t.children[r];this.add(a.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};_i.DEFAULT_UP=new R(0,1,0);_i.DEFAULT_MATRIX_AUTO_UPDATE=!0;_i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=class extends _i{constructor(){super(),this.isGroup=!0,this.type="Group"}},l_={type:"move"},ah=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,n=null,s=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){n=!0;for(let g of e.hand.values()){let v=t.getJointPose(g,i),m=this._getHandJoint(l,g);v!==null&&(m.matrix.fromArray(v.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=v.radius),m.visible=v!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),c=.02,p=.005;l.inputState.pinching&&d>c+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=c-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));s!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(l_)))}return s!==null&&(s.visible=r!==null),o!==null&&(o.visible=a!==null),l!==null&&(l.visible=n!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new gn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wr={h:0,s:0,l:0},lo={h:0,s:0,l:0};function nh(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*6*i:i<1/2?t:i<2/3?e+(t-e)*6*(2/3-i):e}var Be=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=Nu(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,n=2*i-a;this.r=nh(n,a,e+1/3),this.g=nh(n,a,e),this.b=nh(n,a,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=jt){function i(a){a!==void 0&&parseFloat(a)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,n=r[1],s=r[2];switch(n){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],n=a.length;if(n===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(n===6)return this.setHex(parseInt(a,16),t);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){let i=df[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Er(e.r),this.g=Er(e.g),this.b=Er(e.b),this}copyLinearToSRGB(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return st.workingToColorSpace($t.copy(this),e),Math.round(Qe($t.r*255,0,255))*65536+Math.round(Qe($t.g*255,0,255))*256+Math.round(Qe($t.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace($t.copy(this),t);let i=$t.r,r=$t.g,a=$t.b,n=Math.max(i,r,a),s=Math.min(i,r,a),o,l,h=(s+n)/2;if(s===n)o=0,l=0;else{let u=n-s;switch(l=h<=.5?u/(n+s):u/(2-n-s),n){case i:o=(r-a)/u+(r<a?6:0);break;case r:o=(a-i)/u+2;break;case a:o=(i-r)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=jt){st.workingToColorSpace($t.copy(this),e);let t=$t.r,i=$t.g,r=$t.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Wr),this.setHSL(Wr.h+e,Wr.s+t,Wr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wr),e.getHSL(lo);let i=ls(Wr.h,lo.h,t),r=ls(Wr.s,lo.s,t),a=ls(Wr.l,lo.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Be;Be.NAMES=df;var bs=class extends _i{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zi=new R,yr=new R,sh=new R,xr=new R,Qa=new R,en=new R,Hd=new R,oh=new R,lh=new R,hh=new R,uh=new At,ch=new At,dh=new At,Yn=class fn{constructor(t=new R,i=new R,r=new R){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,a){a.subVectors(r,i),zi.subVectors(t,i),a.cross(zi);let n=a.lengthSq();return n>0?a.multiplyScalar(1/Math.sqrt(n)):a.set(0,0,0)}static getBarycoord(t,i,r,a,n){zi.subVectors(a,i),yr.subVectors(r,i),sh.subVectors(t,i);let s=zi.dot(zi),o=zi.dot(yr),l=zi.dot(sh),h=yr.dot(yr),u=yr.dot(sh),d=s*h-o*o;if(d===0)return n.set(0,0,0),null;let c=1/d,p=(h*l-o*u)*c,g=(s*u-o*l)*c;return n.set(1-p-g,g,p)}static containsPoint(t,i,r,a){return this.getBarycoord(t,i,r,a,xr)===null?!1:xr.x>=0&&xr.y>=0&&xr.x+xr.y<=1}static getInterpolation(t,i,r,a,n,s,o,l){return this.getBarycoord(t,i,r,a,xr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,xr.x),l.addScaledVector(s,xr.y),l.addScaledVector(o,xr.z),l)}static getInterpolatedAttribute(t,i,r,a,n,s){return uh.setScalar(0),ch.setScalar(0),dh.setScalar(0),uh.fromBufferAttribute(t,i),ch.fromBufferAttribute(t,r),dh.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(uh,n.x),s.addScaledVector(ch,n.y),s.addScaledVector(dh,n.z),s}static isFrontFacing(t,i,r,a){return zi.subVectors(r,i),yr.subVectors(t,i),zi.cross(yr).dot(a)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,a){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,i,r,a){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zi.subVectors(this.c,this.b),yr.subVectors(this.a,this.b),zi.cross(yr).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return fn.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,a,n){return fn.getInterpolation(t,this.a,this.b,this.c,i,r,a,n)}containsPoint(t){return fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){let r=this.a,a=this.b,n=this.c,s,o;Qa.subVectors(a,r),en.subVectors(n,r),oh.subVectors(t,r);let l=Qa.dot(oh),h=en.dot(oh);if(l<=0&&h<=0)return i.copy(r);lh.subVectors(t,a);let u=Qa.dot(lh),d=en.dot(lh);if(u>=0&&d<=u)return i.copy(a);let c=l*d-u*h;if(c<=0&&l>=0&&u<=0)return s=l/(l-u),i.copy(r).addScaledVector(Qa,s);hh.subVectors(t,n);let p=Qa.dot(hh),g=en.dot(hh);if(g>=0&&p<=g)return i.copy(n);let v=p*h-l*g;if(v<=0&&h>=0&&g<=0)return o=h/(h-g),i.copy(r).addScaledVector(en,o);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Hd.subVectors(n,a),o=(d-u)/(d-u+(p-g)),i.copy(a).addScaledVector(Hd,o);let f=1/(m+v+c);return s=v*f,o=c*f,i.copy(r).addScaledVector(Qa,s).addScaledVector(en,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ia=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let n=0,s=a.count;n<s;n++)e.isMesh===!0?e.getVertexPosition(n,Fi):Fi.fromBufferAttribute(a,n),Fi.applyMatrix4(e.matrixWorld),this.expandByPoint(Fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ho.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ho.copy(i.boundingBox)),ho.applyMatrix4(e.matrixWorld),this.union(ho)}let r=e.children;for(let a=0,n=r.length;a<n;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zn),uo.subVectors(this.max,Zn),tn.subVectors(e.a,Zn),rn.subVectors(e.b,Zn),an.subVectors(e.c,Zn),Xr.subVectors(rn,tn),jr.subVectors(an,rn),va.subVectors(tn,an);let t=[0,-Xr.z,Xr.y,0,-jr.z,jr.y,0,-va.z,va.y,Xr.z,0,-Xr.x,jr.z,0,-jr.x,va.z,0,-va.x,-Xr.y,Xr.x,0,-jr.y,jr.x,0,-va.y,va.x,0];return!ph(t,tn,rn,an,uo)||(t=[1,0,0,0,1,0,0,0,1],!ph(t,tn,rn,an,uo))?!1:(co.crossVectors(Xr,jr),t=[co.x,co.y,co.z],ph(t,tn,rn,an,uo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Sr=[new R,new R,new R,new R,new R,new R,new R,new R],Fi=new R,ho=new Ia,tn=new R,rn=new R,an=new R,Xr=new R,jr=new R,va=new R,Zn=new R,uo=new R,co=new R,_a=new R;function ph(e,t,i,r,a){for(let n=0,s=e.length-3;n<=s;n+=3){_a.fromArray(e,n);let o=a.x*Math.abs(_a.x)+a.y*Math.abs(_a.y)+a.z*Math.abs(_a.z),l=t.dot(_a),h=i.dot(_a),u=r.dot(_a);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}var Lt=new R,po=new K,h_=0,qt=class extends Pa{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:h_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Cv,this.updateRanges=[],this.gpuType=Bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)po.fromBufferAttribute(this,t),po.applyMatrix3(e),this.setXY(t,po.x,po.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=pn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ri(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ri(t,this.array),i=ri(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ri(t,this.array),i=ri(i,this.array),r=ri(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=ri(t,this.array),i=ri(i,this.array),r=ri(r,this.array),a=ri(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},pf=class extends qt{constructor(e,t,i){super(new Uint16Array(e),t,i)}},ff=class extends qt{constructor(e,t,i){super(new Uint32Array(e),t,i)}},Ge=class extends qt{constructor(e,t,i){super(new Float32Array(e),t,i)}},u_=new Ia,Kn=new R,fh=new R,Da=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):u_.setFromPoints(e).getCenter(i);let r=0;for(let a=0,n=e.length;a<n;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Kn.subVectors(e,this.center);let t=Kn.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Kn,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Kn.copy(e.center).add(fh)),this.expandByPoint(Kn.copy(e.center).sub(fh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},c_=0,Ei=new We,mh=new _i,nn=new R,pi=new Ia,$n=new Ia,Bt=new R,St=class mf extends Pa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c_++}),this.uuid=La(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pv(t)?ff:pf)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){let i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);let r=this.attributes.normal;if(r!==void 0){let n=new $e().getNormalMatrix(t);r.applyNormalMatrix(n),r.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,i,r){return Ei.makeTranslation(t,i,r),this.applyMatrix4(Ei),this}scale(t,i,r){return Ei.makeScale(t,i,r),this.applyMatrix4(Ei),this}lookAt(t){return mh.lookAt(t),mh.updateMatrix(),this.applyMatrix4(mh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nn).negate(),this.translate(nn.x,nn.y,nn.z),this}setFromPoints(t){let i=this.getAttribute("position");if(i===void 0){let r=[];for(let a=0,n=t.length;a<n;a++){let s=t[a];r.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ge(r,3))}else{let r=Math.min(t.length,i.count);for(let a=0;a<r;a++){let n=t[a];i.setXYZ(a,n.x,n.y,n.z||0)}t.length>i.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ia);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,a=i.length;r<a;r++){let n=i[r];pi.setFromBufferAttribute(n),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Da);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let r=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),i)for(let n=0,s=i.length;n<s;n++){let o=i[n];$n.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(pi.min,$n.min),pi.expandByPoint(Bt),Bt.addVectors(pi.max,$n.max),pi.expandByPoint(Bt)):(pi.expandByPoint($n.min),pi.expandByPoint($n.max))}pi.getCenter(r);let a=0;for(let n=0,s=t.count;n<s;n++)Bt.fromBufferAttribute(t,n),a=Math.max(a,r.distanceToSquared(Bt));if(i)for(let n=0,s=i.length;n<s;n++){let o=i[n],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)Bt.fromBufferAttribute(o,h),l&&(nn.fromBufferAttribute(t,h),Bt.add(nn)),a=Math.max(a,r.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let r=i.position,a=i.normal,n=i.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==r.count)&&(s=new qt(new Float32Array(4*r.count),4),this.setAttribute("tangent",s));let o=[],l=[];for(let _=0;_<r.count;_++)o[_]=new R,l[_]=new R;let h=new R,u=new R,d=new R,c=new K,p=new K,g=new K,v=new R,m=new R;function f(_,S,L){h.fromBufferAttribute(r,_),u.fromBufferAttribute(r,S),d.fromBufferAttribute(r,L),c.fromBufferAttribute(n,_),p.fromBufferAttribute(n,S),g.fromBufferAttribute(n,L),u.sub(h),d.sub(h),p.sub(c),g.sub(c);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),o[_].add(v),o[S].add(v),o[L].add(v),l[_].add(m),l[S].add(m),l[L].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let _=0,S=x.length;_<S;++_){let L=x[_],P=L.start,N=L.count;for(let V=P,D=P+N;V<D;V+=3)f(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let E=new R,y=new R,w=new R,A=new R;function C(_){w.fromBufferAttribute(a,_),A.copy(w);let S=o[_];E.copy(S),E.sub(w.multiplyScalar(w.dot(S))).normalize(),y.crossVectors(A,S);let L=y.dot(l[_])<0?-1:1;s.setXYZW(_,E.x,E.y,E.z,L)}for(let _=0,S=x.length;_<S;++_){let L=x[_],P=L.start,N=L.count;for(let V=P,D=P+N;V<D;V+=3)C(t.getX(V+0)),C(t.getX(V+1)),C(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new qt(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let c=0,p=r.count;c<p;c++)r.setXYZ(c,0,0,0);let a=new R,n=new R,s=new R,o=new R,l=new R,h=new R,u=new R,d=new R;if(t)for(let c=0,p=t.count;c<p;c+=3){let g=t.getX(c+0),v=t.getX(c+1),m=t.getX(c+2);a.fromBufferAttribute(i,g),n.fromBufferAttribute(i,v),s.fromBufferAttribute(i,m),u.subVectors(s,n),d.subVectors(a,n),u.cross(d),o.fromBufferAttribute(r,g),l.fromBufferAttribute(r,v),h.fromBufferAttribute(r,m),o.add(u),l.add(u),h.add(u),r.setXYZ(g,o.x,o.y,o.z),r.setXYZ(v,l.x,l.y,l.z),r.setXYZ(m,h.x,h.y,h.z)}else for(let c=0,p=i.count;c<p;c+=3)a.fromBufferAttribute(i,c+0),n.fromBufferAttribute(i,c+1),s.fromBufferAttribute(i,c+2),u.subVectors(s,n),d.subVectors(a,n),u.cross(d),r.setXYZ(c+0,u.x,u.y,u.z),r.setXYZ(c+1,u.x,u.y,u.z),r.setXYZ(c+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)Bt.fromBufferAttribute(t,i),Bt.normalize(),t.setXYZ(i,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function t(o,l){let h=o.array,u=o.itemSize,d=o.normalized,c=new h.constructor(l.length*u),p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let f=0;f<u;f++)c[g++]=h[p++]}return new qt(c,u,d)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let i=new mf,r=this.index.array,a=this.attributes;for(let o in a){let l=a[o],h=t(l,r);i.setAttribute(o,h)}let n=this.morphAttributes;for(let o in n){let l=[],h=n[o];for(let u=0,d=h.length;u<d;u++){let c=h[u],p=t(c,r);l.push(p)}i.morphAttributes[o]=l}i.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,l=s.length;o<l;o++){let h=s[o];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};let i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});let r=this.attributes;for(let l in r){let h=r[l];t.data.attributes[l]=h.toJSON(t.data)}let a={},n=!1;for(let l in this.morphAttributes){let h=this.morphAttributes[l],u=[];for(let d=0,c=h.length;d<c;d++){let p=h[d];u.push(p.toJSON(t.data))}u.length>0&&(a[l]=u,n=!0)}n&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let i={};this.name=t.name;let r=t.index;r!==null&&this.setIndex(r.clone());let a=t.attributes;for(let h in a){let u=a[h];this.setAttribute(h,u.clone(i))}let n=t.morphAttributes;for(let h in n){let u=[],d=n[h];for(let c=0,p=d.length;c<p;c++)u.push(d[c].clone(i));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let h=0,u=s.length;h<u;h++){let d=s[h];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var WR=new R;var gh=new R,d_=new R,p_=new $e,Kr=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=gh.subVectors(i,t).cross(d_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(gh),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let n=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(n<0||n>1)?null:t.copy(e.start).addScaledVector(r,n)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||p_.getNormalMatrix(e),r=this.coplanarPoint(gh).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},f_=0,Jr=class extends Pa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f_++}),this.uuid=La(),this.name="",this.type="Material",this.blending=ss,this.side=Ea,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fp,this.blendDst=Bp,this.blendEquation=dn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jl,this.stencilZFail=Jl,this.stencilZPass=Jl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ze(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let n=[];for(let s in a){let o=a[s];delete o.metadata,n.push(o)}return n}if(t){let a=r(e.textures),n=r(e.images);a.length>0&&(i.textures=a),n.length>0&&(i.images=n)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Kr().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new K().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var XR=new R,jR=new R,qR=new R,YR=new K,ZR=new K,KR=new We,$R=new R,JR=new R,QR=new R,eC=new K,tC=new K,iC=new K;var br=new R,vh=new R,fo=new R,mo=new R,ku=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,br)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=br.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(br.copy(this.origin).addScaledVector(this.direction,t),br.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){vh.copy(e).add(t).multiplyScalar(.5),fo.copy(t).sub(e).normalize(),mo.copy(this.origin).sub(vh);let a=e.distanceTo(t)*.5,n=-this.direction.dot(fo),s=mo.dot(this.direction),o=-mo.dot(fo),l=mo.lengthSq(),h=Math.abs(1-n*n),u,d,c,p;if(h>0)if(u=n*o-s,d=n*s-o,p=a*h,u>=0)if(d>=-p)if(d<=p){let g=1/h;u*=g,d*=g,c=u*(u+n*d+2*s)+d*(n*u+d+2*o)+l}else d=a,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;else d=-a,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;else d<=-p?(u=Math.max(0,-(-n*a+s)),d=u>0?-a:Math.min(Math.max(-a,-o),a),c=-u*u+d*(d+2*o)+l):d<=p?(u=0,d=Math.min(Math.max(-a,-o),a),c=d*(d+2*o)+l):(u=Math.max(0,-(n*a+s)),d=u>0?a:Math.min(Math.max(-a,-o),a),c=-u*u+d*(d+2*o)+l);else d=n>0?-a:a,u=Math.max(0,-(n*d+s)),c=-u*u+d*(d+2*o)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(vh).addScaledVector(fo,d),c}intersectSphere(e,t){if(e.radius<0)return null;br.subVectors(e.center,this.origin);let i=br.dot(this.direction),r=br.dot(br)-i*i,a=e.radius*e.radius;if(r>a)return null;let n=Math.sqrt(a-r),s=i-n,o=i+n;return o<0?null:s<0?this.at(o,t):this.at(s,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,n,s,o,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(a=(e.min.y-d.y)*h,n=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,n=(e.min.y-d.y)*h),i>n||a>r||((a>i||isNaN(i))&&(i=a),(n<r||isNaN(r))&&(r=n),u>=0?(s=(e.min.z-d.z)*u,o=(e.max.z-d.z)*u):(s=(e.max.z-d.z)*u,o=(e.min.z-d.z)*u),i>o||s>r)||((s>i||i!==i)&&(i=s),(o<r||r!==r)&&(r=o),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,br)!==null}intersectTriangle(e,t,i,r,a){let n=this.origin,s=this.direction,o=s.x,l=s.y,h=s.z,u=e.x-n.x,d=e.y-n.y,c=e.z-n.z,p=t.x-n.x,g=t.y-n.y,v=t.z-n.z,m=i.x-n.x,f=i.y-n.y,x=i.z-n.z,E=Math.abs(o),y=Math.abs(l),w=Math.abs(h),A,C,_,S,L,P,N,V,D,F,Y,G;if(E>=y&&E>=w?(_=o,P=u,D=p,G=m,o>=0?(A=l,C=h,S=d,L=c,N=g,V=v,F=f,Y=x):(A=h,C=l,S=c,L=d,N=v,V=g,F=x,Y=f)):y>=w?(_=l,P=d,D=g,G=f,l>=0?(A=h,C=o,S=c,L=u,N=v,V=p,F=x,Y=m):(A=o,C=h,S=u,L=c,N=p,V=v,F=m,Y=x)):(_=h,P=c,D=v,G=x,h>=0?(A=o,C=l,S=u,L=d,N=p,V=g,F=m,Y=f):(A=l,C=o,S=d,L=u,N=g,V=p,F=f,Y=m)),_===0)return null;let re=A/_,j=C/_,Z=1/_,J=S-re*P,Ue=L-j*P,we=N-re*D,tt=V-j*D,Ve=F-re*G,q=Y-j*G,ie=Ve*tt-q*we,le=J*q-Ue*Ve,Pe=we*Ue-tt*J;if(r){if(ie<0||le<0||Pe<0)return null}else if((ie<0||le<0||Pe<0)&&(ie>0||le>0||Pe>0))return null;let ke=ie+le+Pe;if(ke===0)return null;let fe=Z*(ie*P+le*D+Pe*G);return(ke>0?fe<0:fe>0)?null:this.at(fe/ke,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nr=class extends Jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Gd=new We,ya=new ku,go=new Da,Vd=new R,vo=new R,_o=new R,yo=new R,_h=new R,xo=new R,Wd=new R,So=new R,Ht=class extends _i{constructor(e=new St,t=new nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,n=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let s=this.morphTargetInfluences;if(a&&s){xo.set(0,0,0);for(let o=0,l=a.length;o<l;o++){let h=s[o],u=a[o];h!==0&&(_h.fromBufferAttribute(u,e),n?xo.addScaledVector(_h,h):xo.addScaledVector(_h.sub(t),h))}t.add(xo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),go.copy(i.boundingSphere),go.applyMatrix4(a),ya.copy(e.ray).recast(e.near),!(go.containsPoint(ya.origin)===!1&&(ya.intersectSphere(go,Vd)===null||ya.origin.distanceToSquared(Vd)>(e.far-e.near)**2))&&(Gd.copy(a).invert(),ya.copy(e.ray).applyMatrix4(Gd),!(i.boundingBox!==null&&ya.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ya)))}_computeIntersections(e,t,i){let r,a=this.geometry,n=this.material,s=a.index,o=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,d=a.groups,c=a.drawRange;if(s!==null)if(Array.isArray(n))for(let p=0,g=d.length;p<g;p++){let v=d[p],m=n[v.materialIndex],f=Math.max(v.start,c.start),x=Math.min(s.count,Math.min(v.start+v.count,c.start+c.count));for(let E=f,y=x;E<y;E+=3){let w=s.getX(E),A=s.getX(E+1),C=s.getX(E+2);r=bo(this,m,e,i,l,h,u,w,A,C),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{let p=Math.max(0,c.start),g=Math.min(s.count,c.start+c.count);for(let v=p,m=g;v<m;v+=3){let f=s.getX(v),x=s.getX(v+1),E=s.getX(v+2);r=bo(this,n,e,i,l,h,u,f,x,E),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}else if(o!==void 0)if(Array.isArray(n))for(let p=0,g=d.length;p<g;p++){let v=d[p],m=n[v.materialIndex],f=Math.max(v.start,c.start),x=Math.min(o.count,Math.min(v.start+v.count,c.start+c.count));for(let E=f,y=x;E<y;E+=3){let w=E,A=E+1,C=E+2;r=bo(this,m,e,i,l,h,u,w,A,C),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{let p=Math.max(0,c.start),g=Math.min(o.count,c.start+c.count);for(let v=p,m=g;v<m;v+=3){let f=v,x=v+1,E=v+2;r=bo(this,n,e,i,l,h,u,f,x,E),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}}};function m_(e,t,i,r,a,n,s,o){let l;if(t.side===li?l=r.intersectTriangle(s,n,a,!0,o):l=r.intersectTriangle(a,n,s,t.side===Ea,o),l===null)return null;So.copy(o),So.applyMatrix4(e.matrixWorld);let h=i.ray.origin.distanceTo(So);return h<i.near||h>i.far?null:{distance:h,point:So.clone(),object:e}}function bo(e,t,i,r,a,n,s,o,l,h){e.getVertexPosition(o,vo),e.getVertexPosition(l,_o),e.getVertexPosition(h,yo);let u=m_(e,t,i,r,vo,_o,yo,Wd);if(u){let d=new R;Yn.getBarycoord(Wd,vo,_o,yo,d),a&&(u.uv=Yn.getInterpolatedAttribute(a,o,l,h,d,new K)),n&&(u.uv1=Yn.getInterpolatedAttribute(n,o,l,h,d,new K)),s&&(u.normal=Yn.getInterpolatedAttribute(s,o,l,h,d,new R),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let c={a:o,b:l,c:h,normal:new R,materialIndex:0};Yn.getNormal(vo,_o,yo,c.normal),u.face=c,u.barycoord=d}return u}var En=class extends Gi{constructor(e=null,t=1,i=1,r,a,n,s,o,l=It,h=It,u,d){super(null,n,s,o,l,h,r,a,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xd=class extends qt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},sn=new We,jd=new We,Mo=[],qd=new Ia,g_=new We,Jn=new Ht,Qn=new Da,Gt=class extends Ht{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xd(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,g_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ia),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sn),qd.copy(e.boundingBox).applyMatrix4(sn),this.boundingBox.union(qd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Da),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sn),Qn.copy(e.boundingSphere).applyMatrix4(sn),this.boundingSphere.union(Qn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,n=e*a+1;for(let s=0;s<i.length;s++)i[s]=r[n+s]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Jn.geometry=this.geometry,Jn.material=this.material,Jn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qn.copy(this.boundingSphere),Qn.applyMatrix4(i),e.ray.intersectsSphere(Qn)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,sn),jd.multiplyMatrices(i,sn),Jn.matrixWorld=jd,Jn.raycast(e,Mo);for(let n=0,s=Mo.length;n<s;n++){let o=Mo[n];o.instanceId=a,o.object=this,t.push(o)}Mo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Xd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new En(new Float32Array(r*this.count),r,this.count,Ru,Bi));let a=this.morphTexture.source.data.data,n=0;for(let l=0;l<i.length;l++)n+=i[l];let s=this.geometry.morphTargetsRelative?1:1-n,o=r*e;return a[o]=s,a.set(i,o+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},xa=new Da,v_=new K(.5,.5),wo=new R,Ou=class{constructor(e=new Kr,t=new Kr,i=new Kr,r=new Kr,a=new Kr,n=new Kr){this.planes=[e,t,i,r,a,n]}set(e,t,i,r,a,n){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(n),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=er,i=!1){let r=this.planes,a=e.elements,n=a[0],s=a[1],o=a[2],l=a[3],h=a[4],u=a[5],d=a[6],c=a[7],p=a[8],g=a[9],v=a[10],m=a[11],f=a[12],x=a[13],E=a[14],y=a[15];if(r[0].setComponents(l-n,c-h,m-p,y-f).normalize(),r[1].setComponents(l+n,c+h,m+p,y+f).normalize(),r[2].setComponents(l+s,c+u,m+g,y+x).normalize(),r[3].setComponents(l-s,c-u,m-g,y-x).normalize(),i)r[4].setComponents(o,d,v,E).normalize(),r[5].setComponents(l-o,c-d,m-v,y-E).normalize();else if(r[4].setComponents(l-o,c-d,m-v,y-E).normalize(),t===er)r[5].setComponents(l+o,c+d,m+v,y+E).normalize();else if(t===gs)r[5].setComponents(o,d,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xa.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xa.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xa)}intersectsSprite(e){xa.center.set(0,0,0);let t=v_.distanceTo(e.center);return xa.radius=.7071067811865476+t,xa.applyMatrix4(e.matrixWorld),this.intersectsSphere(xa)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(wo.x=r.normal.x>0?e.max.x:e.min.x,wo.y=r.normal.y>0?e.max.y:e.min.y,wo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(wo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},gf=class extends Jr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},rC=new R,aC=new R,nC=new We,sC=new ku,oC=new Da,lC=new R,hC=new R;var uC=new R,cC=new R;var dC=new We,pC=new ku,fC=new Da,mC=new R;var vf=class extends Gi{constructor(e=[],t=Ta,i,r,a,n,s,o,l,h){super(e,t,i,r,a,n,s,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ra=class extends Gi{constructor(e,t,i=rr,r,a,n,s=It,o=It,l,h=Tr,u=1){if(h!==Tr&&h!==Ma)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,r,a,n,s,o,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},__=class extends Ra{constructor(e,t=rr,i=Ta,r,a,n=It,s=It,o,l=Tr){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,r,a,n,s,o,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},_f=class extends Gi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},yi=class yf extends St{constructor(t=1,i=1,r=1,a=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:a,heightSegments:n,depthSegments:s};let o=this;a=Math.floor(a),n=Math.floor(n),s=Math.floor(s);let l=[],h=[],u=[],d=[],c=0,p=0;g("z","y","x",-1,-1,r,i,t,s,n,0),g("z","y","x",1,-1,r,i,-t,s,n,1),g("x","z","y",1,1,t,r,i,a,s,2),g("x","z","y",1,-1,t,r,-i,a,s,3),g("x","y","z",1,-1,t,i,r,a,n,4),g("x","y","z",-1,-1,t,i,-r,a,n,5),this.setIndex(l),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(d,2));function g(v,m,f,x,E,y,w,A,C,_,S){let L=y/C,P=w/_,N=y/2,V=w/2,D=A/2,F=C+1,Y=_+1,G=0,re=0,j=new R;for(let Z=0;Z<Y;Z++){let J=Z*P-V;for(let Ue=0;Ue<F;Ue++){let we=Ue*L-N;j[v]=we*x,j[m]=J*E,j[f]=D,h.push(j.x,j.y,j.z),j[v]=0,j[m]=0,j[f]=A>0?1:-1,u.push(j.x,j.y,j.z),d.push(Ue/C),d.push(1-Z/_),G+=1}}for(let Z=0;Z<_;Z++)for(let J=0;J<C;J++){let Ue=c+J+F*Z,we=c+J+F*(Z+1),tt=c+(J+1)+F*(Z+1),Ve=c+(J+1)+F*Z;l.push(Ue,we,Ve),l.push(we,tt,Ve),re+=6}o.addGroup(p,re,S),p+=re,c+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yf(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},xf=class Sf extends St{constructor(t=1,i=1,r=4,a=8,n=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:i,capSegments:r,radialSegments:a,heightSegments:n},i=Math.max(0,i),r=Math.max(1,Math.floor(r)),a=Math.max(3,Math.floor(a)),n=Math.max(1,Math.floor(n));let s=[],o=[],l=[],h=[],u=i/2,d=Math.PI/2*t,c=i,p=2*d+c,g=r*2+n,v=a+1,m=new R,f=new R;for(let x=0;x<=g;x++){let E=0,y=0,w=0,A=0;if(x<=r){let S=x/r,L=S*Math.PI/2;y=-u-t*Math.cos(L),w=t*Math.sin(L),A=-t*Math.cos(L),E=S*d}else if(x<=r+n){let S=(x-r)/n;y=-u+S*i,w=t,A=0,E=d+S*c}else{let S=(x-r-n)/r,L=S*Math.PI/2;y=u+t*Math.sin(L),w=t*Math.cos(L),A=t*Math.sin(L),E=d+c+S*d}let C=Math.max(0,Math.min(1,E/p)),_=0;x===0?_=.5/a:x===g&&(_=-.5/a);for(let S=0;S<=a;S++){let L=S/a,P=L*Math.PI*2,N=Math.sin(P),V=Math.cos(P);f.x=-w*V,f.y=y,f.z=w*N,o.push(f.x,f.y,f.z),m.set(-w*V,A,w*N),m.normalize(),l.push(m.x,m.y,m.z),h.push(L+_,C)}if(x>0){let S=(x-1)*v;for(let L=0;L<a;L++){let P=S+L,N=S+L+1,V=x*v+L,D=x*v+L+1;s.push(P,N,V),s.push(N,D,V)}}}this.setIndex(s),this.setAttribute("position",new Ge(o,3)),this.setAttribute("normal",new Ge(l,3)),this.setAttribute("uv",new Ge(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sf(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var hi=class bf extends St{constructor(t=1,i=1,r=1,a=32,n=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:r,radialSegments:a,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:l};let h=this;a=Math.floor(a),n=Math.floor(n);let u=[],d=[],c=[],p=[],g=0,v=[],m=r/2,f=0;x(),s===!1&&(t>0&&E(!0),i>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Ge(d,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(p,2));function x(){let y=new R,w=new R,A=0,C=(i-t)/r;for(let _=0;_<=n;_++){let S=[],L=_/n,P=L*(i-t)+t;for(let N=0;N<=a;N++){let V=N/a,D=V*l+o,F=Math.sin(D),Y=Math.cos(D);w.x=P*F,w.y=-L*r+m,w.z=P*Y,d.push(w.x,w.y,w.z),y.set(F,C,Y).normalize(),c.push(y.x,y.y,y.z),p.push(V,1-L),S.push(g++)}v.push(S)}for(let _=0;_<a;_++)for(let S=0;S<n;S++){let L=v[S][_],P=v[S+1][_],N=v[S+1][_+1],V=v[S][_+1];(t>0||S!==0)&&(u.push(L,P,V),A+=3),(i>0||S!==n-1)&&(u.push(P,N,V),A+=3)}h.addGroup(f,A,0),f+=A}function E(y){let w=g,A=new K,C=new R,_=0,S=y===!0?t:i,L=y===!0?1:-1;for(let N=1;N<=a;N++)d.push(0,m*L,0),c.push(0,L,0),p.push(.5,.5),g++;let P=g;for(let N=0;N<=a;N++){let V=N/a*l+o,D=Math.cos(V),F=Math.sin(V);C.x=S*F,C.y=m*L,C.z=S*D,d.push(C.x,C.y,C.z),c.push(0,L,0),A.x=D*.5+.5,A.y=F*.5*L+.5,p.push(A.x,A.y),g++}for(let N=0;N<a;N++){let V=w+N,D=P+N;y===!0?u.push(D,D+1,V):u.push(D+1,D,V),_+=3}h.addGroup(f,_,y===!0?1:2),f+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bf(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var y_=class Mf extends St{constructor(t=[],i=[],r=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:i,radius:r,detail:a};let n=[],s=[];o(a),h(r),u(),this.setAttribute("position",new Ge(n,3)),this.setAttribute("normal",new Ge(n.slice(),3)),this.setAttribute("uv",new Ge(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(x){let E=new R,y=new R,w=new R;for(let A=0;A<i.length;A+=3)p(i[A+0],E),p(i[A+1],y),p(i[A+2],w),l(E,y,w,x)}function l(x,E,y,w){let A=w+1,C=[];for(let _=0;_<=A;_++){C[_]=[];let S=x.clone().lerp(y,_/A),L=E.clone().lerp(y,_/A),P=A-_;for(let N=0;N<=P;N++)N===0&&_===A?C[_][N]=S:C[_][N]=S.clone().lerp(L,N/P)}for(let _=0;_<A;_++)for(let S=0;S<2*(A-_)-1;S++){let L=Math.floor(S/2);S%2===0?(c(C[_][L+1]),c(C[_+1][L]),c(C[_][L])):(c(C[_][L+1]),c(C[_+1][L+1]),c(C[_+1][L]))}}function h(x){let E=new R;for(let y=0;y<n.length;y+=3)E.x=n[y+0],E.y=n[y+1],E.z=n[y+2],E.normalize().multiplyScalar(x),n[y+0]=E.x,n[y+1]=E.y,n[y+2]=E.z}function u(){let x=new R;for(let E=0;E<n.length;E+=3){x.x=n[E+0],x.y=n[E+1],x.z=n[E+2];let y=m(x)/2/Math.PI+.5,w=f(x)/Math.PI+.5;s.push(y,1-w)}g(),d()}function d(){for(let x=0;x<s.length;x+=6){let E=s[x+0],y=s[x+2],w=s[x+4],A=Math.max(E,y,w),C=Math.min(E,y,w);A>.9&&C<.1&&(E<.2&&(s[x+0]+=1),y<.2&&(s[x+2]+=1),w<.2&&(s[x+4]+=1))}}function c(x){n.push(x.x,x.y,x.z)}function p(x,E){let y=x*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function g(){let x=new R,E=new R,y=new R,w=new R,A=new K,C=new K,_=new K;for(let S=0,L=0;S<n.length;S+=9,L+=6){x.set(n[S+0],n[S+1],n[S+2]),E.set(n[S+3],n[S+4],n[S+5]),y.set(n[S+6],n[S+7],n[S+8]),A.set(s[L+0],s[L+1]),C.set(s[L+2],s[L+3]),_.set(s[L+4],s[L+5]),w.copy(x).add(E).add(y).divideScalar(3);let P=m(w);v(A,L+0,x,P),v(C,L+2,E,P),v(_,L+4,y,P)}}function v(x,E,y,w){w<0&&x.x===1&&(s[E]=x.x-1),y.x===0&&y.z===0&&(s[E]=w/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mf(t.vertices,t.indices,t.radius,t.detail)}};var sr=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let n=1;n<=e;n++)i=this.getPoint(n/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,a=i.length,n;t?n=t:n=e*i[a-1];let s=0,o=a-1,l;for(;s<=o;)if(r=Math.floor(s+(o-s)/2),l=i[r]-n,l<0)s=r+1;else if(l>0)o=r-1;else{o=r;break}if(r=o,i[r]===n)return r/(a-1);let h=i[r],u=i[r+1]-h,d=(n-h)/u;return(r+d)/(a-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),n=this.getPoint(r),s=t||(a.isVector2?new K:new R);return s.copy(n).sub(a).normalize(),s}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new R,r=[],a=[],n=[],s=new R,o=new We;for(let c=0;c<=e;c++){let p=c/e;r[c]=this.getTangentAt(p,new R)}a[0]=new R,n[0]=new R;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],s),n[0].crossVectors(r[0],a[0]);for(let c=1;c<=e;c++){if(a[c]=a[c-1].clone(),n[c]=n[c-1].clone(),s.crossVectors(r[c-1],r[c]),s.length()>Number.EPSILON){s.normalize();let p=Math.acos(Qe(r[c-1].dot(r[c]),-1,1));a[c].applyMatrix4(o.makeRotationAxis(s,p))}n[c].crossVectors(r[c],a[c])}if(t===!0){let c=Math.acos(Qe(a[0].dot(a[e]),-1,1));c/=e,r[0].dot(s.crossVectors(a[0],a[e]))>0&&(c=-c);for(let p=1;p<=e;p++)a[p].applyMatrix4(o.makeRotationAxis(r[p],c*p)),n[p].crossVectors(r[p],a[p])}return{tangents:r,normals:a,binormals:n}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zu=class extends sr{constructor(e=0,t=0,i=1,r=1,a=0,n=Math.PI*2,s=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=n,this.aClockwise=s,this.aRotation=o}getPoint(e,t=new K){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,n=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(n?a=0:a=r),this.aClockwise===!0&&!n&&(a===r?a=-r:a=a-r);let s=this.aStartAngle+e*a,o=this.aX+this.xRadius*Math.cos(s),l=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=o-this.aX,c=l-this.aY;o=d*h-c*u+this.aX,l=d*u+c*h+this.aY}return i.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},x_=class extends zu{constructor(e,t,i,r,a,n){super(e,t,i,i,r,a,n),this.isArcCurve=!0,this.type="ArcCurve"}};function Fu(){let e=0,t=0,i=0,r=0;function a(n,s,o,l){e=n,t=o,i=-3*n+3*s-2*o-l,r=2*n-2*s+o+l}return{initCatmullRom:function(n,s,o,l,h){a(s,o,h*(o-n),h*(l-s))},initNonuniformCatmullRom:function(n,s,o,l,h,u,d){let c=(s-n)/h-(o-n)/(h+u)+(o-s)/u,p=(o-s)/u-(l-s)/(u+d)+(l-o)/d;c*=u,p*=u,a(s,o,c,p)},calc:function(n){let s=n*n,o=s*n;return e+t*n+i*s+r*o}}}var Yd=new R,Zd=new R,yh=new Fu,xh=new Fu,Sh=new Fu,Bu=class extends sr{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new R){let i=t,r=this.points,a=r.length,n=(a-(this.closed?0:1))*e,s=Math.floor(n),o=n-s;this.closed?s+=s>0?0:(Math.floor(Math.abs(s)/a)+1)*a:o===0&&s===a-1&&(s=a-2,o=1);let l,h;this.closed||s>0?l=r[(s-1)%a]:(Zd.subVectors(r[0],r[1]).add(r[0]),l=Zd);let u=r[s%a],d=r[(s+1)%a];if(this.closed||s+2<a?h=r[(s+2)%a]:(Yd.subVectors(r[a-1],r[a-2]).add(r[a-1]),h=Yd),this.curveType==="centripetal"||this.curveType==="chordal"){let c=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(u),c),g=Math.pow(u.distanceToSquared(d),c),v=Math.pow(d.distanceToSquared(h),c);g<1e-4&&(g=1),p<1e-4&&(p=g),v<1e-4&&(v=g),yh.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,g,v),xh.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,g,v),Sh.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,g,v)}else this.curveType==="catmullrom"&&(yh.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),xh.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Sh.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return i.set(yh.calc(o),xh.calc(o),Sh.calc(o)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Kd(e,t,i,r,a){let n=(r-t)*.5,s=(a-i)*.5,o=e*e,l=e*o;return(2*i-2*r+n+s)*l+(-3*i+3*r-2*n-s)*o+n*e+i}function S_(e,t){let i=1-e;return i*i*t}function b_(e,t){return 2*(1-e)*e*t}function M_(e,t){return e*e*t}function hs(e,t,i,r){return S_(e,t)+b_(e,i)+M_(e,r)}function w_(e,t){let i=1-e;return i*i*i*t}function E_(e,t){let i=1-e;return 3*i*i*e*t}function T_(e,t){return 3*(1-e)*e*e*t}function A_(e,t){return e*e*e*t}function us(e,t,i,r,a){return w_(e,t)+E_(e,i)+T_(e,r)+A_(e,a)}var wf=class extends sr{constructor(e=new K,t=new K,i=new K,r=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new K){let i=t,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(us(e,r.x,a.x,n.x,s.x),us(e,r.y,a.y,n.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},R_=class extends sr{constructor(e=new R,t=new R,i=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new R){let i=t,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(us(e,r.x,a.x,n.x,s.x),us(e,r.y,a.y,n.y,s.y),us(e,r.z,a.z,n.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ef=class extends sr{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new K){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},C_=class extends sr{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tf=class extends sr{constructor(e=new K,t=new K,i=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new K){let i=t,r=this.v0,a=this.v1,n=this.v2;return i.set(hs(e,r.x,a.x,n.x),hs(e,r.y,a.y,n.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Af=class extends sr{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){let i=t,r=this.v0,a=this.v1,n=this.v2;return i.set(hs(e,r.x,a.x,n.x),hs(e,r.y,a.y,n.y),hs(e,r.z,a.z,n.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rf=class extends sr{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new K){let i=t,r=this.points,a=(r.length-1)*e,n=Math.floor(a),s=a-n,o=r[n===0?n:n-1],l=r[n],h=r[n>r.length-2?r.length-1:n+1],u=r[n>r.length-3?r.length-1:n+2];return i.set(Kd(s,o.x,l.x,h.x,u.x),Kd(s,o.y,l.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new K().fromArray(r))}return this}},Xo=Object.freeze({__proto__:null,ArcCurve:x_,CatmullRomCurve3:Bu,CubicBezierCurve:wf,CubicBezierCurve3:R_,EllipseCurve:zu,LineCurve:Ef,LineCurve3:C_,QuadraticBezierCurve:Tf,QuadraticBezierCurve3:Af,SplineCurve:Rf}),P_=class extends sr{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xo[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let n=r[a]-i,s=this.curves[a],o=s.getLength(),l=o===0?0:1-n/o;return s.getPointAt(l,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,a=this.curves;r<a.length;r++){let n=a[r],s=n.isEllipseCurve?e*2:n.isLineCurve||n.isLineCurve3?1:n.isSplineCurve?e*n.points.length:e,o=n.getPoints(s);for(let l=0;l<o.length;l++){let h=o[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Xo[r.type]().fromJSON(r))}return this}},bn=class extends P_{constructor(e){super(),this.type="Path",this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Ef(this.currentPoint.clone(),new K(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let a=new Tf(this.currentPoint.clone(),new K(e,t),new K(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,a,n){let s=new wf(this.currentPoint.clone(),new K(e,t),new K(i,r),new K(a,n));return this.curves.push(s),this.currentPoint.set(a,n),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Rf(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,a,n){let s=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+s,t+o,i,r,a,n),this}absarc(e,t,i,r,a,n){return this.absellipse(e,t,i,i,r,a,n),this}ellipse(e,t,i,r,a,n,s,o){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,r,a,n,s,o),this}absellipse(e,t,i,r,a,n,s,o){let l=new zu(e,t,i,r,a,n,s,o);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Vi=class extends bn{constructor(e){super(e),this.uuid=La(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new bn().fromJSON(r))}return this}};function L_(e,t,i=2){let r=t&&t.length,a=r?t[0]*i:e.length,n=Cf(e,0,a,i,!0),s=[];if(!n||n.next===n.prev)return s;let o,l,h;if(r&&(n=k_(e,t,n,i)),e.length>80*i){o=e[0],l=e[1];let u=o,d=l;for(let c=i;c<a;c+=i){let p=e[c],g=e[c+1];p<o&&(o=p),g<l&&(l=g),p>u&&(u=p),g>d&&(d=g)}h=Math.max(u-o,d-l),h=h!==0?32767/h:0}return _s(n,s,i,o,l,h,0),s}function Cf(e,t,i,r,a){let n;if(a===q_(e,t,i,r)>0)for(let s=t;s<i;s+=r)n=$d(s/r|0,e[s],e[s+1],n);else for(let s=i-r;s>=t;s-=r)n=$d(s/r|0,e[s],e[s+1],n);return n&&Mn(n,n.next)&&(xs(n),n=n.next),n}function Ca(e,t){if(!e)return e;t||(t=e);let i=e,r;do if(r=!1,!i.steiner&&(Mn(i,i.next)||Mt(i.prev,i,i.next)===0)){if(xs(i),i=t=i.prev,i===i.next)break;r=!0}else i=i.next;while(r||i!==t);return t}function _s(e,t,i,r,a,n,s){if(!e)return;!s&&n&&H_(e,r,a,n);let o=e;for(;e.prev!==e.next;){let l=e.prev,h=e.next;if(n?D_(e,r,a,n):I_(e)){t.push(l.i,e.i,h.i),xs(e),e=h.next,o=h.next;continue}if(e=h,e===o){s?s===1?(e=N_(Ca(e),t),_s(e,t,i,r,a,n,2)):s===2&&U_(e,t,i,r,a,n):_s(Ca(e),t,i,r,a,n,1);break}}}function I_(e){let t=e.prev,i=e,r=e.next;if(Mt(t,i,r)>=0)return!1;let a=t.x,n=i.x,s=r.x,o=t.y,l=i.y,h=r.y,u=Math.min(a,n,s),d=Math.min(o,l,h),c=Math.max(a,n,s),p=Math.max(o,l,h),g=r.next;for(;g!==t;){if(g.x>=u&&g.x<=c&&g.y>=d&&g.y<=p&&as(a,o,n,l,s,h,g.x,g.y)&&Mt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function D_(e,t,i,r){let a=e.prev,n=e,s=e.next;if(Mt(a,n,s)>=0)return!1;let o=a.x,l=n.x,h=s.x,u=a.y,d=n.y,c=s.y,p=Math.min(o,l,h),g=Math.min(u,d,c),v=Math.max(o,l,h),m=Math.max(u,d,c),f=gu(p,g,t,i,r),x=gu(v,m,t,i,r),E=e.prevZ,y=e.nextZ;for(;E&&E.z>=f&&y&&y.z<=x;){if(E.x>=p&&E.x<=v&&E.y>=g&&E.y<=m&&E!==a&&E!==s&&as(o,u,l,d,h,c,E.x,E.y)&&Mt(E.prev,E,E.next)>=0||(E=E.prevZ,y.x>=p&&y.x<=v&&y.y>=g&&y.y<=m&&y!==a&&y!==s&&as(o,u,l,d,h,c,y.x,y.y)&&Mt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;E&&E.z>=f;){if(E.x>=p&&E.x<=v&&E.y>=g&&E.y<=m&&E!==a&&E!==s&&as(o,u,l,d,h,c,E.x,E.y)&&Mt(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;y&&y.z<=x;){if(y.x>=p&&y.x<=v&&y.y>=g&&y.y<=m&&y!==a&&y!==s&&as(o,u,l,d,h,c,y.x,y.y)&&Mt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function N_(e,t){let i=e;do{let r=i.prev,a=i.next.next;!Mn(r,a)&&Lf(r,i,i.next,a)&&ys(r,a)&&ys(a,r)&&(t.push(r.i,i.i,a.i),xs(i),xs(i.next),i=e=a),i=i.next}while(i!==e);return Ca(i)}function U_(e,t,i,r,a,n){let s=e;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&W_(s,o)){let l=If(s,o);s=Ca(s,s.next),l=Ca(l,l.next),_s(s,t,i,r,a,n,0),_s(l,t,i,r,a,n,0);return}o=o.next}s=s.next}while(s!==e)}function k_(e,t,i,r){let a=[];for(let n=0,s=t.length;n<s;n++){let o=t[n]*r,l=n<s-1?t[n+1]*r:e.length,h=Cf(e,o,l,r,!1);h===h.next&&(h.steiner=!0),a.push(V_(h))}a.sort(O_);for(let n=0;n<a.length;n++)i=z_(a[n],i);return i}function O_(e,t){let i=e.x-t.x;if(i===0&&(i=e.y-t.y,i===0)){let r=(e.next.y-e.y)/(e.next.x-e.x),a=(t.next.y-t.y)/(t.next.x-t.x);i=r-a}return i}function z_(e,t){let i=F_(e,t);if(!i)return t;let r=If(i,e);return Ca(r,r.next),Ca(i,i.next)}function F_(e,t){let i=t,r=e.x,a=e.y,n=-1/0,s;if(Mn(e,i))return i;do{if(Mn(e,i.next))return i.next;if(a<=i.y&&a>=i.next.y&&i.next.y!==i.y){let d=i.x+(a-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(d<=r&&d>n&&(n=d,s=i.x<i.next.x?i:i.next,d===r))return s}i=i.next}while(i!==t);if(!s)return null;let o=s,l=s.x,h=s.y,u=1/0;i=s;do{if(r>=i.x&&i.x>=l&&r!==i.x&&Pf(a<h?r:n,a,l,h,a<h?n:r,a,i.x,i.y)){let d=Math.abs(a-i.y)/(r-i.x);ys(i,e)&&(d<u||d===u&&(i.x>s.x||i.x===s.x&&B_(s,i)))&&(s=i,u=d)}i=i.next}while(i!==o);return s}function B_(e,t){return Mt(e.prev,e,t.prev)<0&&Mt(t.next,e,e.next)<0}function H_(e,t,i,r){let a=e;do a.z===0&&(a.z=gu(a.x,a.y,t,i,r)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==e);a.prevZ.nextZ=null,a.prevZ=null,G_(a)}function G_(e){let t,i=1;do{let r=e,a;e=null;let n=null;for(t=0;r;){t++;let s=r,o=0;for(let h=0;h<i&&(o++,s=s.nextZ,!!s);h++);let l=i;for(;o>0||l>0&&s;)o!==0&&(l===0||!s||r.z<=s.z)?(a=r,r=r.nextZ,o--):(a=s,s=s.nextZ,l--),n?n.nextZ=a:e=a,a.prevZ=n,n=a;r=s}n.nextZ=null,i*=2}while(t>1);return e}function gu(e,t,i,r,a){return e=(e-i)*a|0,t=(t-r)*a|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function V_(e){let t=e,i=e;do(t.x<i.x||t.x===i.x&&t.y<i.y)&&(i=t),t=t.next;while(t!==e);return i}function Pf(e,t,i,r,a,n,s,o){return(a-s)*(t-o)>=(e-s)*(n-o)&&(e-s)*(r-o)>=(i-s)*(t-o)&&(i-s)*(n-o)>=(a-s)*(r-o)}function as(e,t,i,r,a,n,s,o){return!(e===s&&t===o)&&Pf(e,t,i,r,a,n,s,o)}function W_(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!X_(e,t)&&(ys(e,t)&&ys(t,e)&&j_(e,t)&&(Mt(e.prev,e,t.prev)||Mt(e,t.prev,t))||Mn(e,t)&&Mt(e.prev,e,e.next)>0&&Mt(t.prev,t,t.next)>0)}function Mt(e,t,i){return(t.y-e.y)*(i.x-t.x)-(t.x-e.x)*(i.y-t.y)}function Mn(e,t){return e.x===t.x&&e.y===t.y}function Lf(e,t,i,r){let a=To(Mt(e,t,i)),n=To(Mt(e,t,r)),s=To(Mt(i,r,e)),o=To(Mt(i,r,t));return!!(a!==n&&s!==o||a===0&&Eo(e,i,t)||n===0&&Eo(e,r,t)||s===0&&Eo(i,e,r)||o===0&&Eo(i,t,r))}function Eo(e,t,i){return t.x<=Math.max(e.x,i.x)&&t.x>=Math.min(e.x,i.x)&&t.y<=Math.max(e.y,i.y)&&t.y>=Math.min(e.y,i.y)}function To(e){return e>0?1:e<0?-1:0}function X_(e,t){let i=e;do{if(i.i!==e.i&&i.next.i!==e.i&&i.i!==t.i&&i.next.i!==t.i&&Lf(i,i.next,e,t))return!0;i=i.next}while(i!==e);return!1}function ys(e,t){return Mt(e.prev,e,e.next)<0?Mt(e,t,e.next)>=0&&Mt(e,e.prev,t)>=0:Mt(e,t,e.prev)<0||Mt(e,e.next,t)<0}function j_(e,t){let i=e,r=!1,a=(e.x+t.x)/2,n=(e.y+t.y)/2;do i.y>n!=i.next.y>n&&i.next.y!==i.y&&a<(i.next.x-i.x)*(n-i.y)/(i.next.y-i.y)+i.x&&(r=!r),i=i.next;while(i!==e);return r}function If(e,t){let i=vu(e.i,e.x,e.y),r=vu(t.i,t.x,t.y),a=e.next,n=t.prev;return e.next=t,t.prev=e,i.next=a,a.prev=i,r.next=i,i.prev=r,n.next=r,r.prev=n,r}function $d(e,t,i,r){let a=vu(e,t,i);return r?(a.next=r.next,a.prev=r,r.next.prev=a,r.next=a):(a.prev=a,a.next=a),a}function xs(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function vu(e,t,i){return{i:e,x:t,y:i,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function q_(e,t,i,r){let a=0;for(let n=t,s=i-r;n<i;n+=r)a+=(e[s]-e[n])*(e[n+1]+e[s+1]),s=n;return a}var Y_=class{static triangulate(e,t,i=2){return L_(e,t,i)}},tr=class Df{static area(t){let i=t.length,r=0;for(let a=i-1,n=0;n<i;a=n++)r+=t[a].x*t[n].y-t[n].x*t[a].y;return r*.5}static isClockWise(t){return Df.area(t)<0}static triangulateShape(t,i){let r=[],a=[],n=[];Jd(t),Qd(r,t);let s=t.length;i.forEach(Jd);for(let l=0;l<i.length;l++)a.push(s),s+=i[l].length,Qd(r,i[l]);let o=Y_.triangulate(r,a);for(let l=0;l<o.length;l+=3)n.push(o.slice(l,l+3));return n}};function Jd(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Qd(e,t){for(let i=0;i<t.length;i++)e.push(t[i].x),e.push(t[i].y)}var Ar=class Nf extends St{constructor(t=new Vi([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),i={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:i},t=Array.isArray(t)?t:[t];let r=this,a=[],n=[];for(let o=0,l=t.length;o<l;o++){let h=t[o];s(h)}this.setAttribute("position",new Ge(a,3)),this.setAttribute("uv",new Ge(n,2)),this.computeVertexNormals();function s(o){let l=[],h=i.curveSegments!==void 0?i.curveSegments:12,u=i.steps!==void 0?i.steps:1,d=i.depth!==void 0?i.depth:1,c=i.bevelEnabled!==void 0?i.bevelEnabled:!0,p=i.bevelThickness!==void 0?i.bevelThickness:.2,g=i.bevelSize!==void 0?i.bevelSize:p-.1,v=i.bevelOffset!==void 0?i.bevelOffset:0,m=i.bevelSegments!==void 0?i.bevelSegments:3,f=i.extrudePath,x=i.UVGenerator!==void 0?i.UVGenerator:Z_,E,y=!1,w,A,C,_;if(f){E=f.getSpacedPoints(u),y=!0,c=!1;let te=f.isCatmullRomCurve3?f.closed:!1;w=f.computeFrenetFrames(u,te),A=new R,C=new R,_=new R}c||(m=0,p=0,g=0,v=0);let S=o.extractPoints(h),L=S.shape,P=S.holes;if(!tr.isClockWise(L)){L=L.reverse();for(let te=0,ee=P.length;te<ee;te++){let ue=P[te];tr.isClockWise(ue)&&(P[te]=ue.reverse())}}function N(te){let ee=10000000000000001e-36,ue=te[0];for(let xe=1;xe<=te.length;xe++){let Se=xe%te.length,Ae=te[Se],Ne=Ae.x-ue.x,Ye=Ae.y-ue.y,Ke=Ne*Ne+Ye*Ye,I=Math.max(Math.abs(Ae.x),Math.abs(Ae.y),Math.abs(ue.x),Math.abs(ue.y)),vt=ee*I*I;if(Ke<=vt){te.splice(Se,1),xe--;continue}ue=Ae}}N(L),P.forEach(N);let V=P.length,D=L;for(let te=0;te<V;te++){let ee=P[te];L=L.concat(ee)}function F(te,ee,ue){return ee||He("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(ee,ue)}let Y=L.length;function G(te,ee,ue){let xe,Se,Ae,Ne=te.x-ee.x,Ye=te.y-ee.y,Ke=ue.x-te.x,I=ue.y-te.y,vt=Ne*Ne+Ye*Ye,nt=Ne*I-Ye*Ke;if(Math.abs(nt)>Number.EPSILON){let it=Math.sqrt(vt),T=Math.sqrt(Ke*Ke+I*I),b=ee.x-Ye/it,U=ee.y+Ne/it,W=ue.x-I/T,Q=ue.y+Ke/T,pe=((W-b)*I-(Q-U)*Ke)/(Ne*I-Ye*Ke);xe=b+Ne*pe-te.x,Se=U+Ye*pe-te.y;let me=xe*xe+Se*Se;if(me<=2)return new K(xe,Se);Ae=Math.sqrt(me/2)}else{let it=!1;Ne>Number.EPSILON?Ke>Number.EPSILON&&(it=!0):Ne<-Number.EPSILON?Ke<-Number.EPSILON&&(it=!0):Math.sign(Ye)===Math.sign(I)&&(it=!0),it?(xe=-Ye,Se=Ne,Ae=Math.sqrt(vt)):(xe=Ne,Se=Ye,Ae=Math.sqrt(vt/2))}return new K(xe/Ae,Se/Ae)}let re=[];for(let te=0,ee=D.length,ue=ee-1,xe=te+1;te<ee;te++,ue++,xe++)ue===ee&&(ue=0),xe===ee&&(xe=0),re[te]=G(D[te],D[ue],D[xe]);let j=[],Z,J=re.concat();for(let te=0,ee=V;te<ee;te++){let ue=P[te];Z=[];for(let xe=0,Se=ue.length,Ae=Se-1,Ne=xe+1;xe<Se;xe++,Ae++,Ne++)Ae===Se&&(Ae=0),Ne===Se&&(Ne=0),Z[xe]=G(ue[xe],ue[Ae],ue[Ne]);j.push(Z),J=J.concat(Z)}let Ue;if(m===0)Ue=tr.triangulateShape(D,P);else{let te=[],ee=[];for(let ue=0;ue<m;ue++){let xe=ue/m,Se=p*Math.cos(xe*Math.PI/2),Ae=g*Math.sin(xe*Math.PI/2)+v;for(let Ne=0,Ye=D.length;Ne<Ye;Ne++){let Ke=F(D[Ne],re[Ne],Ae);le(Ke.x,Ke.y,-Se),xe===0&&te.push(Ke)}for(let Ne=0,Ye=V;Ne<Ye;Ne++){let Ke=P[Ne];Z=j[Ne];let I=[];for(let vt=0,nt=Ke.length;vt<nt;vt++){let it=F(Ke[vt],Z[vt],Ae);le(it.x,it.y,-Se),xe===0&&I.push(it)}xe===0&&ee.push(I)}}Ue=tr.triangulateShape(te,ee)}let we=Ue.length,tt=g+v;for(let te=0;te<Y;te++){let ee=c?F(L[te],J[te],tt):L[te];y?(C.copy(w.normals[0]).multiplyScalar(ee.x),A.copy(w.binormals[0]).multiplyScalar(ee.y),_.copy(E[0]).add(C).add(A),le(_.x,_.y,_.z)):le(ee.x,ee.y,0)}for(let te=1;te<=u;te++)for(let ee=0;ee<Y;ee++){let ue=c?F(L[ee],J[ee],tt):L[ee];y?(C.copy(w.normals[te]).multiplyScalar(ue.x),A.copy(w.binormals[te]).multiplyScalar(ue.y),_.copy(E[te]).add(C).add(A),le(_.x,_.y,_.z)):le(ue.x,ue.y,d/u*te)}for(let te=m-1;te>=0;te--){let ee=te/m,ue=p*Math.cos(ee*Math.PI/2),xe=g*Math.sin(ee*Math.PI/2)+v;for(let Se=0,Ae=D.length;Se<Ae;Se++){let Ne=F(D[Se],re[Se],xe);le(Ne.x,Ne.y,d+ue)}for(let Se=0,Ae=P.length;Se<Ae;Se++){let Ne=P[Se];Z=j[Se];for(let Ye=0,Ke=Ne.length;Ye<Ke;Ye++){let I=F(Ne[Ye],Z[Ye],xe);y?le(I.x,I.y+E[u-1].y,E[u-1].x+ue):le(I.x,I.y,d+ue)}}}Ve(),q();function Ve(){let te=a.length/3;if(c){let ee=0,ue=Y*ee;for(let xe=0;xe<we;xe++){let Se=Ue[xe];Pe(Se[2]+ue,Se[1]+ue,Se[0]+ue)}ee=u+m*2,ue=Y*ee;for(let xe=0;xe<we;xe++){let Se=Ue[xe];Pe(Se[0]+ue,Se[1]+ue,Se[2]+ue)}}else{for(let ee=0;ee<we;ee++){let ue=Ue[ee];Pe(ue[2],ue[1],ue[0])}for(let ee=0;ee<we;ee++){let ue=Ue[ee];Pe(ue[0]+Y*u,ue[1]+Y*u,ue[2]+Y*u)}}r.addGroup(te,a.length/3-te,0)}function q(){let te=a.length/3,ee=0;ie(D,ee),ee+=D.length;for(let ue=0,xe=P.length;ue<xe;ue++){let Se=P[ue];ie(Se,ee),ee+=Se.length}r.addGroup(te,a.length/3-te,1)}function ie(te,ee){let ue=te.length;for(;--ue>=0;){let xe=ue,Se=ue-1;Se<0&&(Se=te.length-1);for(let Ae=0,Ne=u+m*2;Ae<Ne;Ae++){let Ye=Y*Ae,Ke=Y*(Ae+1),I=ee+xe+Ye,vt=ee+Se+Ye,nt=ee+Se+Ke,it=ee+xe+Ke;ke(I,vt,nt,it)}}}function le(te,ee,ue){l.push(te),l.push(ee),l.push(ue)}function Pe(te,ee,ue){fe(te),fe(ee),fe(ue);let xe=a.length/3,Se=x.generateTopUV(r,a,xe-3,xe-2,xe-1);et(Se[0]),et(Se[1]),et(Se[2])}function ke(te,ee,ue,xe){fe(te),fe(ee),fe(xe),fe(ee),fe(ue),fe(xe);let Se=a.length/3,Ae=x.generateSideWallUV(r,a,Se-6,Se-3,Se-2,Se-1);et(Ae[0]),et(Ae[1]),et(Ae[3]),et(Ae[1]),et(Ae[2]),et(Ae[3])}function fe(te){a.push(l[te*3+0]),a.push(l[te*3+1]),a.push(l[te*3+2])}function et(te){n.push(te.x),n.push(te.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),i=this.parameters.shapes,r=this.parameters.options;return K_(i,r,t)}static fromJSON(t,i){let r=[];for(let n=0,s=t.shapes.length;n<s;n++){let o=i[t.shapes[n]];r.push(o)}let a=t.options.extrudePath;return a!==void 0&&(t.options.extrudePath=new Xo[a.type]().fromJSON(a)),new Nf(r,t.options)}},Z_={generateTopUV:function(e,t,i,r,a){let n=t[i*3],s=t[i*3+1],o=t[r*3],l=t[r*3+1],h=t[a*3],u=t[a*3+1];return[new K(n,s),new K(o,l),new K(h,u)]},generateSideWallUV:function(e,t,i,r,a,n){let s=t[i*3],o=t[i*3+1],l=t[i*3+2],h=t[r*3],u=t[r*3+1],d=t[r*3+2],c=t[a*3],p=t[a*3+1],g=t[a*3+2],v=t[n*3],m=t[n*3+1],f=t[n*3+2];return Math.abs(o-u)<Math.abs(s-h)?[new K(s,1-l),new K(h,1-d),new K(c,1-g),new K(v,1-f)]:[new K(o,1-l),new K(u,1-d),new K(p,1-g),new K(m,1-f)]}};function K_(e,t,i){if(i.shapes=[],Array.isArray(e))for(let r=0,a=e.length;r<a;r++){let n=e[r];i.shapes.push(n.uuid)}else i.shapes.push(e.uuid);return i.options=Object.assign({},t),t.extrudePath!==void 0&&(i.options.extrudePath=t.extrudePath.toJSON()),i}var Rr=class Uf extends St{constructor(t=[new K(0,-.5),new K(.5,0),new K(0,.5)],i=12,r=0,a=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:i,phiStart:r,phiLength:a},i=Math.floor(i),a=Qe(a,0,Math.PI*2);let n=[],s=[],o=[],l=[],h=[],u=1/i,d=new R,c=new K,p=new R,g=new R,v=new R,m=0,f=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:m=t[x+1].x-t[x].x,f=t[x+1].y-t[x].y,p.x=f*1,p.y=-m,p.z=f*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[x+1].x-t[x].x,f=t[x+1].y-t[x].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let x=0;x<=i;x++){let E=r+x*u*a,y=Math.sin(E),w=Math.cos(E);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*y,d.y=t[A].y,d.z=t[A].x*w,s.push(d.x,d.y,d.z),c.x=x/i,c.y=A/(t.length-1),o.push(c.x,c.y);let C=l[3*A+0]*y,_=l[3*A+1],S=l[3*A+0]*w;h.push(C,_,S)}}for(let x=0;x<i;x++)for(let E=0;E<t.length-1;E++){let y=E+x*t.length,w=y,A=y+t.length,C=y+t.length+1,_=y+1;n.push(w,A,_),n.push(C,_,A)}this.setIndex(n),this.setAttribute("position",new Ge(s,3)),this.setAttribute("uv",new Ge(o,2)),this.setAttribute("normal",new Ge(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uf(t.points,t.segments,t.phiStart,t.phiLength)}},Hu=class kf extends y_{constructor(t=1,i=0){let r=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(r,a,t,i),this.type="OctahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new kf(t.radius,t.detail)}},Ko=class Of extends St{constructor(t=1,i=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:a};let n=t/2,s=i/2,o=Math.floor(r),l=Math.floor(a),h=o+1,u=l+1,d=t/o,c=i/l,p=[],g=[],v=[],m=[];for(let f=0;f<u;f++){let x=f*c-s;for(let E=0;E<h;E++){let y=E*d-n;g.push(y,-x,0),v.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<o;x++){let E=x+h*f,y=x+h*(f+1),w=x+1+h*(f+1),A=x+1+h*f;p.push(E,y,A),p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Ge(g,3)),this.setAttribute("normal",new Ge(v,3)),this.setAttribute("uv",new Ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Of(t.width,t.height,t.widthSegments,t.heightSegments)}},zf=class Ff extends St{constructor(t=.5,i=1,r=32,a=1,n=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:r,phiSegments:a,thetaStart:n,thetaLength:s},r=Math.max(3,r),a=Math.max(1,a);let o=[],l=[],h=[],u=[],d=t,c=(i-t)/a,p=new R,g=new K;for(let v=0;v<=a;v++){for(let m=0;m<=r;m++){let f=n+m/r*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),h.push(0,0,1),g.x=(p.x/i+1)/2,g.y=(p.y/i+1)/2,u.push(g.x,g.y)}d+=c}for(let v=0;v<a;v++){let m=v*(r+1);for(let f=0;f<r;f++){let x=f+m,E=x,y=x+r+1,w=x+r+2,A=x+1;o.push(E,y,A),o.push(y,w,A)}}this.setIndex(o),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(h,3)),this.setAttribute("uv",new Ge(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ff(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Bf=class Hf extends St{constructor(t=new Vi([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),i=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:i};let r=[],a=[],n=[],s=[],o=0,l=0;if(Array.isArray(t)===!1)h(t);else for(let u=0;u<t.length;u++)h(t[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(r),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(n,3)),this.setAttribute("uv",new Ge(s,2));function h(u){let d=a.length/3,c=u.extractPoints(i),p=c.shape,g=c.holes;tr.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){let x=g[m];tr.isClockWise(x)===!0&&(g[m]=x.reverse())}let v=tr.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){let x=g[m];p=p.concat(x)}for(let m=0,f=p.length;m<f;m++){let x=p[m];a.push(x.x,x.y,0),n.push(0,0,1),s.push(x.x,x.y)}for(let m=0,f=v.length;m<f;m++){let x=v[m],E=x[0]+d,y=x[1]+d,w=x[2]+d;r.push(E,y,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),i=this.parameters.shapes;return $_(i,t)}static fromJSON(t,i){let r=[];for(let a=0,n=t.shapes.length;a<n;a++){let s=i[t.shapes[a]];r.push(s)}return new Hf(r,t.curveSegments)}};function $_(e,t){if(t.shapes=[],Array.isArray(e))for(let i=0,r=e.length;i<r;i++){let a=e[i];t.shapes.push(a.uuid)}else t.shapes.push(e.uuid);return t}var Qt=class Gf extends St{constructor(t=1,i=32,r=16,a=0,n=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:r,phiStart:a,phiLength:n,thetaStart:s,thetaLength:o},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));let l=Math.min(s+o,Math.PI),h=0,u=[],d=new R,c=new R,p=[],g=[],v=[],m=[];for(let f=0;f<=r;f++){let x=[],E=f/r,y=s+E*o,w=t*Math.cos(y),A=Math.sqrt(t*t-w*w),C=0;f===0&&s===0?C=.5/i:f===r&&l===Math.PI&&(C=-.5/i);for(let _=0;_<=i;_++){let S=_/i,L=a+S*n;d.x=-A*Math.cos(L),d.y=w,d.z=A*Math.sin(L),g.push(d.x,d.y,d.z),c.copy(d).normalize(),v.push(c.x,c.y,c.z),m.push(S+C,1-E),x.push(h++)}u.push(x)}for(let f=0;f<r;f++)for(let x=0;x<i;x++){let E=u[f][x+1],y=u[f][x],w=u[f+1][x],A=u[f+1][x+1];(f!==0||s>0)&&p.push(E,y,A),(f!==r-1||l<Math.PI)&&p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Ge(g,3)),this.setAttribute("normal",new Ge(v,3)),this.setAttribute("uv",new Ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gf(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},$o=class Vf extends St{constructor(t=1,i=.4,r=12,a=48,n=Math.PI*2,s=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:i,radialSegments:r,tubularSegments:a,arc:n,thetaStart:s,thetaLength:o},r=Math.floor(r),a=Math.floor(a);let l=[],h=[],u=[],d=[],c=new R,p=new R,g=new R;for(let v=0;v<=r;v++){let m=s+v/r*o;for(let f=0;f<=a;f++){let x=f/a*n;p.x=(t+i*Math.cos(m))*Math.cos(x),p.y=(t+i*Math.cos(m))*Math.sin(x),p.z=i*Math.sin(m),h.push(p.x,p.y,p.z),c.x=t*Math.cos(x),c.y=t*Math.sin(x),g.subVectors(p,c).normalize(),u.push(g.x,g.y,g.z),d.push(f/a),d.push(v/r)}}for(let v=1;v<=r;v++)for(let m=1;m<=a;m++){let f=(a+1)*v+m-1,x=(a+1)*(v-1)+m-1,E=(a+1)*(v-1)+m,y=(a+1)*v+m;l.push(f,x,y),l.push(x,E,y)}this.setIndex(l),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vf(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Wf=class Xf extends St{constructor(t=new Af(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),i=64,r=1,a=8,n=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:i,radius:r,radialSegments:a,closed:n};let s=t.computeFrenetFrames(i,n);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let o=new R,l=new R,h=new K,u=new R,d=[],c=[],p=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Ge(d,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(p,2));function v(){for(let E=0;E<i;E++)m(E);m(n===!1?i:0),x(),f()}function m(E){u=t.getPointAt(E/i,u);let y=s.normals[E],w=s.binormals[E];for(let A=0;A<=a;A++){let C=A/a*Math.PI*2,_=Math.sin(C),S=-Math.cos(C);l.x=S*y.x+_*w.x,l.y=S*y.y+_*w.y,l.z=S*y.z+_*w.z,l.normalize(),c.push(l.x,l.y,l.z),o.x=u.x+r*l.x,o.y=u.y+r*l.y,o.z=u.z+r*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let E=1;E<=i;E++)for(let y=1;y<=a;y++){let w=(a+1)*(E-1)+(y-1),A=(a+1)*E+(y-1),C=(a+1)*E+y,_=(a+1)*(E-1)+y;g.push(w,A,_),g.push(A,C,_)}}function x(){for(let E=0;E<=i;E++)for(let y=0;y<=a;y++)h.x=E/i,h.y=y/a,p.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Xf(new Xo[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function wn(e){let t={};for(let i in e){t[i]={};for(let r in e[i]){let a=e[i][r];if(ep(a))a.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=a.clone();else if(Array.isArray(a))if(ep(a[0])){let n=[];for(let s=0,o=a.length;s<o;s++)n[s]=a[s].clone();t[i][r]=n}else t[i][r]=a.slice();else t[i][r]=a}}return t}function ai(e){let t={};for(let i=0;i<e.length;i++){let r=wn(e[i]);for(let a in r)t[a]=r[a]}return t}function ep(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function J_(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}function jf(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:st.workingColorSpace}var Q_={clone:wn,merge:ai},ey=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ty=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ni=class extends Jr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ey,this.fragmentShader=ty,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wn(e.uniforms),this.uniformsGroups=J_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Be().setHex(r.value);break;case"v2":this.uniforms[i].value=new K().fromArray(r.value);break;case"v3":this.uniforms[i].value=new R().fromArray(r.value);break;case"v4":this.uniforms[i].value=new At().fromArray(r.value);break;case"m3":this.uniforms[i].value=new $e().fromArray(r.value);break;case"m4":this.uniforms[i].value=new We().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},iy=class extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},qf=class extends Jr{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},ry=class extends Jr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=wu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ay=class extends Jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ny=class extends Jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Yf=class extends Jr{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Be(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ms,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}};function on(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function bh(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ms=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];i:{e:{let n;t:{r:if(!(e<r)){for(let s=i+2;;){if(r===void 0){if(e<a)break r;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(a=r,r=t[++i],e<r)break e}n=t.length;break t}if(!(e>=a)){let s=t[1];e<s&&(i=2,a=s);for(let o=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(r=a,a=t[--i-1],e>=a)break e}n=i,i=0;break t}break i}for(;i<n;){let s=i+n>>>1;e<t[s]?n=s:i=s+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let n=0;n!==r;++n)t[n]=i[a+n];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},sy=class extends Ms{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wd,endingEnd:wd}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,n=e+1,s=r[a],o=r[n];if(s===void 0)switch(this.getSettings_().endingStart){case Ed:a=e,s=2*t-i;break;case Td:a=r.length-2,s=t+r[a]-r[a+1];break;default:a=e,s=i}if(o===void 0)switch(this.getSettings_().endingEnd){case Ed:n=e,o=2*i-t;break;case Td:n=1,o=i+r[1]-r[0];break;default:n=e-1,o=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-s),this._weightNext=l/(o-i),this._offsetPrev=a*h,this._offsetNext=n*h}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,c=this._weightNext,p=(i-t)/(r-t),g=p*p,v=g*p,m=-d*v+2*d*g-d*p,f=(1+d)*v+(-1.5-2*d)*g+(-.5+d)*p+1,x=(-1-c)*v+(1.5+c)*g+.5*p,E=c*v-c*g;for(let y=0;y!==s;++y)a[y]=m*n[h+y]+f*n[l+y]+x*n[o+y]+E*n[u+y];return a}},oy=class extends Ms{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,h=(i-t)/(r-t),u=1-h;for(let d=0;d!==s;++d)a[d]=n[l+d]*u+n[o+d]*h;return a}},ly=class extends Ms{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},hy=class extends Ms{interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(i-t)/(r-t),g=1-p;for(let v=0;v!==s;++v)a[v]=n[l+v]*g+n[o+v]*p;return a}let d=s*2,c=e-1;for(let p=0;p!==s;++p){let g=n[l+p],v=n[o+p],m=c*d+p*2,f=u[m],x=u[m+1],E=e*d+p*2,y=h[E],w=h[E+1],A=cy(i,t,f,y,r);a[p]=Zf(A,g,x,w,v)}return a}};function Zf(e,t,i,r,a){let n=1-e;return n*n*n*t+3*n*n*e*i+3*n*e*e*r+e*e*e*a}function uy(e,t,i,r,a){let n=1-e;return 3*n*n*(i-t)+6*n*e*(r-i)+3*e*e*(a-r)}function cy(e,t,i,r,a){let n=(e-t)/(a-t);for(let s=0;s<8;s++){let o=Zf(n,t,i,r,a)-e;if(Math.abs(o)<1e-10)break;let l=uy(n,t,i,r,a);if(Math.abs(l)<1e-10)break;n=Math.max(0,Math.min(1,n-o/l))}return n}var or=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=on(t,this.TimeBufferType),this.values=on(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:on(e.times,Array),values:on(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),bh(e.settings)&&(i.settings={inTangents:on(e.settings.inTangents,Array),outTangents:on(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ly(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new oy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new hy(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ho:t=this.InterpolantFactoryMethodDiscrete;break;case fu:t=this.InterpolantFactoryMethodLinear;break;case $l:t=this.InterpolantFactoryMethodSmooth;break;case Md:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ze("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ho;case this.InterpolantFactoryMethodLinear:return fu;case this.InterpolantFactoryMethodSmooth:return $l;case this.InterpolantFactoryMethodBezier:return Md}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;bh(this.settings)&&(tp(this.settings.inTangents,e),tp(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,a=0,n=r-1;for(;a!==r&&i[a]<e;)++a;for(;n!==-1&&i[n]>t;)--n;if(++n,a!==0||n!==r){a>=n&&(n=Math.max(n,1),a=n-1);let s=this.getValueSize();this.times=i.slice(a,n),this.values=this.values.slice(a*s,n*s)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let n=null;for(let s=0;s!==a;s++){let o=i[s];if(typeof o=="number"&&isNaN(o)){He("KeyframeTrack: Time is not a valid number.",this,s,o),e=!1;break}if(n!==null&&n>o){He("KeyframeTrack: Out of order keys.",this,s,o,n),e=!1;break}n=o}if(r!==void 0&&Lv(r))for(let s=0,o=r.length;s!==o;++s){let l=r[s];if(isNaN(l)){He("KeyframeTrack: Value is not a valid number.",this,s,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===$l,a=e.length-1,n=1;for(let s=1;s<a;++s){let o=!1,l=e[s],h=e[s+1];if(l!==h&&(s!==1||l!==e[0]))if(r)o=!0;else{let u=s*i,d=u-i,c=u+i;for(let p=0;p!==i;++p){let g=t[u+p];if(g!==t[d+p]||g!==t[c+p]){o=!0;break}}}if(o){if(s!==n){e[n]=e[s];let u=s*i,d=n*i;for(let c=0;c!==i;++c)t[d+c]=t[u+c]}++n}}if(a>0){e[n]=e[a];for(let s=a*i,o=n*i,l=0;l!==i;++l)t[o+l]=t[s+l];++n}return n!==e.length?(this.times=e.slice(0,n),this.values=t.slice(0,n*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,bh(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function tp(e,t){for(let i=0,r=e.length;i!==r;i+=2)e[i]*=t}or.prototype.ValueTypeName="";or.prototype.TimeBufferType=Float32Array;or.prototype.ValueBufferType=Float32Array;or.prototype.DefaultInterpolation=fu;var ws=class extends or{constructor(e,t,i){super(e,t,i)}};ws.prototype.ValueTypeName="bool";ws.prototype.ValueBufferType=Array;ws.prototype.DefaultInterpolation=Ho;ws.prototype.InterpolantFactoryMethodLinear=void 0;ws.prototype.InterpolantFactoryMethodSmooth=void 0;var dy=class extends or{constructor(e,t,i,r){super(e,t,i,r)}};dy.prototype.ValueTypeName="color";var py=class extends or{constructor(e,t,i,r){super(e,t,i,r)}};py.prototype.ValueTypeName="number";var fy=class extends Ms{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=(i-t)/(r-t),l=e*s;for(let h=l+s;l!==h;l+=4)Hi.slerpFlat(a,0,n,l-s,n,l,o);return a}},Kf=class extends or{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new fy(this.times,this.values,this.getValueSize(),e)}};Kf.prototype.ValueTypeName="quaternion";Kf.prototype.InterpolantFactoryMethodSmooth=void 0;var Es=class extends or{constructor(e,t,i){super(e,t,i)}};Es.prototype.ValueTypeName="string";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=Ho;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;var my=class extends or{constructor(e,t,i,r){super(e,t,i,r)}};my.prototype.ValueTypeName="vector";var gy=class{constructor(e,t,i){let r=this,a=!1,n=0,s=0,o,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){s++,a===!1&&r.onStart!==void 0&&r.onStart(h,n,s),a=!0},this.itemEnd=function(h){n++,r.onProgress!==void 0&&r.onProgress(h,n,s),n===s&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),o?o(h):h},this.setURLModifier=function(h){return o=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let c=l[u],p=l[u+1];if(c.global&&(c.lastIndex=0),c.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},vy=new gy,_y=class{constructor(e){this.manager=e!==void 0?e:vy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_y.DEFAULT_MATERIAL_NAME="__DEFAULT";var $f=class extends _i{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Jf=class extends $f{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_i.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Mh=new We,ip=new R,rp=new R,yy=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ou,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ip.setFromMatrixPosition(e.matrixWorld),t.position.copy(ip),rp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Mh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Mh,e.coordinateSystem,e.reversedDepth);let a=this._frameExtents,n=r?r.z/a.x:1,s=r?r.w/a.y:1,o=r?r.x/a.x:0,l=r?r.y/a.y:0;e.coordinateSystem===gs||e.reversedDepth?t.set(.5*n,0,0,.5*n+o,0,.5*s,0,.5*s+l,0,0,1,0,0,0,0,1):t.set(.5*n,0,0,.5*n+o,0,.5*s,0,.5*s+l,0,0,.5,.5,0,0,0,1),t.multiply(Mh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ao=new R,Ro=new Hi,Ki=new R,Qf=class extends _i{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=er,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ao,Ro,Ki),Ki.x===1&&Ki.y===1&&Ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ao,Ro,Ki.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ao,Ro,Ki),Ki.x===1&&Ki.y===1&&Ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ao,Ro,Ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qr=new R,ap=new K,np=new K,fi=class extends Qf{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){qr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qr.x,qr.y).multiplyScalar(-e/qr.z),qr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qr.x,qr.y).multiplyScalar(-e/qr.z)}getViewSize(e,t){return this.getViewBounds(e,ap,np),t.subVectors(np,ap)}setViewOffset(e,t,i,r,a,n){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(os*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,n=this.view;if(this.view!==null&&this.view.enabled){let o=n.fullWidth,l=n.fullHeight;a+=n.offsetX*r/o,t-=n.offsetY*i/l,r*=n.width/o,i*=n.height/l}let s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ts=class extends Qf{constructor(e=-1,t=1,i=1,r=-1,a=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=n,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,n){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,n=i+e,s=r+t,o=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,n=a+l*this.view.width,s-=h*this.view.offsetY,o=s-h*this.view.height}this.projectionMatrix.makeOrthographic(a,n,s,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},xy=class extends yy{constructor(){super(new Ts(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},e0=class extends $f{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_i.DEFAULT_UP),this.updateMatrix(),this.target=new _i,this.shadow=new xy}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ln=-90,hn=1,Sy=class extends _i{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new fi(ln,hn,e,t);r.layers=this.layers,this.add(r);let a=new fi(ln,hn,e,t);a.layers=this.layers,this.add(a);let n=new fi(ln,hn,e,t);n.layers=this.layers,this.add(n);let s=new fi(ln,hn,e,t);s.layers=this.layers,this.add(s);let o=new fi(ln,hn,e,t);o.layers=this.layers,this.add(o);let l=new fi(ln,hn,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,n,s,o]=t;for(let l of t)this.remove(l);if(e===er)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===gs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,n,s,o,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),c=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,n),e.setRenderTarget(i,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,c),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},by=class extends fi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Gu="\\[\\]\\.:\\/",My=new RegExp("["+Gu+"]","g"),Vu="[^"+Gu+"]",wy="[^"+Gu.replace("\\.","")+"]",Ey=/((?:WC+[\/:])*)/.source.replace("WC",Vu),Ty=/(WCOD+)?/.source.replace("WCOD",wy),Ay=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vu),Ry=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vu),Cy=new RegExp("^"+Ey+Ty+Ay+Ry+"$"),Py=["material","materials","bones","map"],Ly=class{constructor(e,t,i){let r=i||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Et=class mn{constructor(t,i,r){this.path=i,this.parsedPath=r||mn.parseTrackName(i),this.node=mn.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new mn.Composite(t,i,r):new mn(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(My,"")}static parseTrackName(t){let i=Cy.exec(t);if(i===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},a=r.nodeName&&r.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let n=r.nodeName.substring(a+1);Py.indexOf(n)!==-1&&(r.nodeName=r.nodeName.substring(0,a),r.objectName=n)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(n){for(let s=0;s<n.length;s++){let o=n[s];if(o.name===i||o.uuid===i)return o;let l=r(o.children);if(l)return l}return null},a=r(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)t[i++]=r[a]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,a=i.propertyName,n=i.propertyIndex;if(t||(t=mn.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let h=i.objectIndex;switch(r){case"materials":if(!t.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===h){h=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(h!==void 0){if(t[h]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let s=t[a];if(s===void 0){let h=i.nodeName;He("PropertyBinding: Trying to update property for track: "+h+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(n!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[n]!==void 0&&(n=t.morphTargetDictionary[n])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=n}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=Ly;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gC=new Float32Array(1),vC=new We;var _C=class t0{static{t0.prototype.isMatrix2=!0}constructor(t,i,r,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,r,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let r=0;r<4;r++)this.elements[r]=t[r+i];return this}set(t,i,r,a){let n=this.elements;return n[0]=t,n[2]=i,n[1]=r,n[3]=a,this}};function sp(e,t,i,r){let a=Iy(r);switch(i){case Qp:return e*t;case Ru:return e*t/a.components*a.byteLength;case Cu:return e*t/a.components*a.byteLength;case Aa:return e*t*2/a.components*a.byteLength;case Pu:return e*t*2/a.components*a.byteLength;case ef:return e*t*3/a.components*a.byteLength;case Jt:return e*t*4/a.components*a.byteLength;case Lu:return e*t*4/a.components*a.byteLength;case Io:case Do:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case No:case Uo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Fh:case Hh:return Math.max(e,16)*Math.max(t,8)/4;case zh:case Bh:return Math.max(e,8)*Math.max(t,8)/2;case Gh:case Vh:case Xh:case jh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Wh:case Fo:case qh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Yh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Zh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Kh:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case $h:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Jh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Qh:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case eu:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case tu:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case iu:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ru:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case au:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case nu:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case su:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ou:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case lu:case hu:case uu:return Math.ceil(e/4)*Math.ceil(t/4)*16;case cu:case du:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Bo:case pu:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Iy(e){switch(e){case oi:case Zp:return{byteLength:1,components:1};case ps:case Kp:case ar:return{byteLength:2,components:1};case Tu:case Au:return{byteLength:2,components:4};case rr:case Eu:case Bi:return{byteLength:4,components:1};case $p:case Jp:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function i0(){let e=null,t=!1,i=null,r=null;function a(n,s){r=e.requestAnimationFrame(a),i(n,s)}return{start:function(){t!==!0&&i!==null&&e!==null&&(r=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(n){i=n},setContext:function(n){e=n}}}function Dy(e){let t=new WeakMap;function i(o,l){let h=o.array,u=o.usage,d=h.byteLength,c=e.createBuffer();e.bindBuffer(l,c),e.bufferData(l,h,u),o.onUploadCallback();let p;if(h instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)p=e.HALF_FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=e.SHORT;else if(h instanceof Uint32Array)p=e.UNSIGNED_INT;else if(h instanceof Int32Array)p=e.INT;else if(h instanceof Int8Array)p=e.BYTE;else if(h instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:c,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function r(o,l,h){let u=l.array,d=l.updateRanges;if(e.bindBuffer(h,o),d.length===0)e.bufferSubData(h,0,u);else{d.sort((p,g)=>p.start-g.start);let c=0;for(let p=1;p<d.length;p++){let g=d[c],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++c,d[c]=v)}d.length=c+1;for(let p=0,g=d.length;p<g;p++){let v=d[p];e.bufferSubData(h,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function n(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let h=t.get(o);if(h===void 0)t.set(o,i(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,o,l),h.version=o.version}}return{get:a,remove:n,update:s}}var Ny=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Uy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ky=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Oy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,By=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Vy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Yy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ky=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$y=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ex=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ix=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ax=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,sx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ux="gl_FragColor = linearToOutputTexel( gl_FragColor );",cx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,px=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_x=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ex=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Tx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Ax=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Px=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ix=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ux=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ox=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,aS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,uS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,vS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_S=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,SS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,MS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ES=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,RS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,CS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,PS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,LS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,IS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,DS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,NS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,US=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,HS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,GS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,VS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,WS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,XS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ZS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$S=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,QS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ib=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ab=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,nb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ob=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ub=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,db=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:Ny,alphahash_pars_fragment:Uy,alphamap_fragment:ky,alphamap_pars_fragment:Oy,alphatest_fragment:zy,alphatest_pars_fragment:Fy,aomap_fragment:By,aomap_pars_fragment:Hy,batching_pars_vertex:Gy,batching_vertex:Vy,begin_vertex:Wy,beginnormal_vertex:Xy,bsdfs:jy,iridescence_fragment:qy,bumpmap_pars_fragment:Yy,clipping_planes_fragment:Zy,clipping_planes_pars_fragment:Ky,clipping_planes_pars_vertex:$y,clipping_planes_vertex:Jy,color_fragment:Qy,color_pars_fragment:ex,color_pars_vertex:tx,color_vertex:ix,common:rx,cube_uv_reflection_fragment:ax,defaultnormal_vertex:nx,displacementmap_pars_vertex:sx,displacementmap_vertex:ox,emissivemap_fragment:lx,emissivemap_pars_fragment:hx,colorspace_fragment:ux,colorspace_pars_fragment:cx,envmap_fragment:dx,envmap_common_pars_fragment:px,envmap_pars_fragment:fx,envmap_pars_vertex:mx,envmap_physical_pars_fragment:Tx,envmap_vertex:gx,fog_vertex:vx,fog_pars_vertex:_x,fog_fragment:yx,fog_pars_fragment:xx,gradientmap_pars_fragment:Sx,lightmap_pars_fragment:bx,lights_lambert_fragment:Mx,lights_lambert_pars_fragment:wx,lights_pars_begin:Ex,lights_toon_fragment:Ax,lights_toon_pars_fragment:Rx,lights_phong_fragment:Cx,lights_phong_pars_fragment:Px,lights_physical_fragment:Lx,lights_physical_pars_fragment:Ix,lights_fragment_begin:Dx,lights_fragment_maps:Nx,lights_fragment_end:Ux,lightprobes_pars_fragment:kx,logdepthbuf_fragment:Ox,logdepthbuf_pars_fragment:zx,logdepthbuf_pars_vertex:Fx,logdepthbuf_vertex:Bx,map_fragment:Hx,map_pars_fragment:Gx,map_particle_fragment:Vx,map_particle_pars_fragment:Wx,metalnessmap_fragment:Xx,metalnessmap_pars_fragment:jx,morphinstance_vertex:qx,morphcolor_vertex:Yx,morphnormal_vertex:Zx,morphtarget_pars_vertex:Kx,morphtarget_vertex:$x,normal_fragment_begin:Jx,normal_fragment_maps:Qx,normal_pars_fragment:eS,normal_pars_vertex:tS,normal_vertex:iS,normalmap_pars_fragment:rS,clearcoat_normal_fragment_begin:aS,clearcoat_normal_fragment_maps:nS,clearcoat_pars_fragment:sS,iridescence_pars_fragment:oS,opaque_fragment:lS,packing:hS,premultiplied_alpha_fragment:uS,project_vertex:cS,dithering_fragment:dS,dithering_pars_fragment:pS,roughnessmap_fragment:fS,roughnessmap_pars_fragment:mS,shadowmap_pars_fragment:gS,shadowmap_pars_vertex:vS,shadowmap_vertex:_S,shadowmask_pars_fragment:yS,skinbase_vertex:xS,skinning_pars_vertex:SS,skinning_vertex:bS,skinnormal_vertex:MS,specularmap_fragment:wS,specularmap_pars_fragment:ES,tonemapping_fragment:TS,tonemapping_pars_fragment:AS,transmission_fragment:RS,transmission_pars_fragment:CS,uv_pars_fragment:PS,uv_pars_vertex:LS,uv_vertex:IS,worldpos_vertex:DS,background_vert:NS,background_frag:US,backgroundCube_vert:kS,backgroundCube_frag:OS,cube_vert:zS,cube_frag:FS,depth_vert:BS,depth_frag:HS,distance_vert:GS,distance_frag:VS,equirect_vert:WS,equirect_frag:XS,linedashed_vert:jS,linedashed_frag:qS,meshbasic_vert:YS,meshbasic_frag:ZS,meshlambert_vert:KS,meshlambert_frag:$S,meshmatcap_vert:JS,meshmatcap_frag:QS,meshnormal_vert:eb,meshnormal_frag:tb,meshphong_vert:ib,meshphong_frag:rb,meshphysical_vert:ab,meshphysical_frag:nb,meshtoon_vert:sb,meshtoon_frag:ob,points_vert:lb,points_frag:hb,shadow_vert:ub,shadow_frag:cb,sprite_vert:db,sprite_frag:pb},ge={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Ji={basic:{uniforms:ai([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:ai([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:ai([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:ai([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:ai([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Be(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:ai([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:ai([ge.points,ge.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:ai([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:ai([ge.common,ge.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:ai([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:ai([ge.sprite,ge.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distance:{uniforms:ai([ge.common,ge.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distance_vert,fragmentShader:Je.distance_frag},shadow:{uniforms:ai([ge.lights,ge.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Ji.physical={uniforms:ai([Ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var Co={r:0,b:0,g:0},fb=new We,r0=new $e;r0.set(-1,0,0,0,1,0,0,0,1);function mb(e,t,i,r,a,n){let s=new Be(0),o=a===!0?0:1,l,h,u=null,d=0,c=null;function p(x){let E=x.isScene===!0?x.background:null;if(E&&E.isTexture){let y=x.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(x){let E=!1,y=p(x);y===null?m(s,o):y&&y.isColor&&(m(y,1),E=!0);let w=e.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,n):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,n),(e.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function v(x,E){let y=p(E);y&&(y.isCubeTexture||y.mapping===Zo)?(h===void 0&&(h=new Ht(new yi(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:wn(Ji.backgroundCube.uniforms),vertexShader:Ji.backgroundCube.vertexShader,fragmentShader:Ji.backgroundCube.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fb.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(r0),h.material.toneMapped=st.getTransfer(y.colorSpace)!==dt,(u!==y||d!==y.version||c!==e.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,c=e.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ht(new Ko(2,2),new ni({name:"BackgroundMaterial",uniforms:wn(Ji.background.uniforms),vertexShader:Ji.background.vertexShader,fragmentShader:Ji.background.fragmentShader,side:Ea,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=st.getTransfer(y.colorSpace)!==dt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||c!==e.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,c=e.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,E){x.getRGB(Co,jf(e)),i.buffers.color.setClear(Co.r,Co.g,Co.b,E,n)}function f(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(x,E=1){s.set(x),o=E,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(s,o)},render:g,addToRenderList:v,dispose:f}}function gb(e,t){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},a=c(null),n=a,s=!1;function o(P,N,V,D,F){let Y=!1,G=d(P,D,V,N);n!==G&&(n=G,h(n.object)),Y=p(P,D,V,F),Y&&g(P,D,V,F),F!==null&&t.update(F,e.ELEMENT_ARRAY_BUFFER),(Y||s)&&(s=!1,y(P,N,V,D),F!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return e.createVertexArray()}function h(P){return e.bindVertexArray(P)}function u(P){return e.deleteVertexArray(P)}function d(P,N,V,D){let F=D.wireframe===!0,Y=r[N.id];Y===void 0&&(Y={},r[N.id]=Y);let G=P.isInstancedMesh===!0?P.id:0,re=Y[G];re===void 0&&(re={},Y[G]=re);let j=re[V.id];j===void 0&&(j={},re[V.id]=j);let Z=j[F];return Z===void 0&&(Z=c(l()),j[F]=Z),Z}function c(P){let N=[],V=[],D=[];for(let F=0;F<i;F++)N[F]=0,V[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:V,attributeDivisors:D,object:P,attributes:{},index:null}}function p(P,N,V,D){let F=n.attributes,Y=N.attributes,G=0,re=V.getAttributes();for(let j in re)if(re[j].location>=0){let Z=F[j],J=Y[j];if(J===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(J=P.instanceColor)),Z===void 0||Z.attribute!==J||J&&Z.data!==J.data)return!0;G++}return n.attributesNum!==G||n.index!==D}function g(P,N,V,D){let F={},Y=N.attributes,G=0,re=V.getAttributes();for(let j in re)if(re[j].location>=0){let Z=Y[j];Z===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(Z=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(Z=P.instanceColor));let J={};J.attribute=Z,Z&&Z.data&&(J.data=Z.data),F[j]=J,G++}n.attributes=F,n.attributesNum=G,n.index=D}function v(){let P=n.newAttributes;for(let N=0,V=P.length;N<V;N++)P[N]=0}function m(P){f(P,0)}function f(P,N){let V=n.newAttributes,D=n.enabledAttributes,F=n.attributeDivisors;V[P]=1,D[P]===0&&(e.enableVertexAttribArray(P),D[P]=1),F[P]!==N&&(e.vertexAttribDivisor(P,N),F[P]=N)}function x(){let P=n.newAttributes,N=n.enabledAttributes;for(let V=0,D=N.length;V<D;V++)N[V]!==P[V]&&(e.disableVertexAttribArray(V),N[V]=0)}function E(P,N,V,D,F,Y,G){G===!0?e.vertexAttribIPointer(P,N,V,F,Y):e.vertexAttribPointer(P,N,V,D,F,Y)}function y(P,N,V,D){v();let F=D.attributes,Y=V.getAttributes(),G=N.defaultAttributeValues;for(let re in Y){let j=Y[re];if(j.location>=0){let Z=F[re];if(Z===void 0&&(re==="instanceMatrix"&&P.instanceMatrix&&(Z=P.instanceMatrix),re==="instanceColor"&&P.instanceColor&&(Z=P.instanceColor)),Z!==void 0){let J=Z.normalized,Ue=Z.itemSize,we=t.get(Z);if(we===void 0)continue;let tt=we.buffer,Ve=we.type,q=we.bytesPerElement,ie=Ve===e.INT||Ve===e.UNSIGNED_INT||Z.gpuType===Eu;if(Z.isInterleavedBufferAttribute){let le=Z.data,Pe=le.stride,ke=Z.offset;if(le.isInstancedInterleavedBuffer){for(let fe=0;fe<j.locationSize;fe++)f(j.location+fe,le.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let fe=0;fe<j.locationSize;fe++)m(j.location+fe);e.bindBuffer(e.ARRAY_BUFFER,tt);for(let fe=0;fe<j.locationSize;fe++)E(j.location+fe,Ue/j.locationSize,Ve,J,Pe*q,(ke+Ue/j.locationSize*fe)*q,ie)}else{if(Z.isInstancedBufferAttribute){for(let le=0;le<j.locationSize;le++)f(j.location+le,Z.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let le=0;le<j.locationSize;le++)m(j.location+le);e.bindBuffer(e.ARRAY_BUFFER,tt);for(let le=0;le<j.locationSize;le++)E(j.location+le,Ue/j.locationSize,Ve,J,Ue*q,Ue/j.locationSize*le*q,ie)}}else if(G!==void 0){let J=G[re];if(J!==void 0)switch(J.length){case 2:e.vertexAttrib2fv(j.location,J);break;case 3:e.vertexAttrib3fv(j.location,J);break;case 4:e.vertexAttrib4fv(j.location,J);break;default:e.vertexAttrib1fv(j.location,J)}}}}x()}function w(){S();for(let P in r){let N=r[P];for(let V in N){let D=N[V];for(let F in D){let Y=D[F];for(let G in Y)u(Y[G].object),delete Y[G];delete D[F]}}delete r[P]}}function A(P){if(r[P.id]===void 0)return;let N=r[P.id];for(let V in N){let D=N[V];for(let F in D){let Y=D[F];for(let G in Y)u(Y[G].object),delete Y[G];delete D[F]}}delete r[P.id]}function C(P){for(let N in r){let V=r[N];for(let D in V){let F=V[D];if(F[P.id]===void 0)continue;let Y=F[P.id];for(let G in Y)u(Y[G].object),delete Y[G];delete F[P.id]}}}function _(P){for(let N in r){let V=r[N],D=P.isInstancedMesh===!0?P.id:0,F=V[D];if(F!==void 0){for(let Y in F){let G=F[Y];for(let re in G)u(G[re].object),delete G[re];delete F[Y]}delete V[D],Object.keys(V).length===0&&delete r[N]}}}function S(){L(),s=!0,n!==a&&(n=a,h(n.object))}function L(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:S,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function vb(e,t,i){let r;function a(l){r=l}function n(l,h){e.drawArrays(r,l,h),i.update(h,r,1)}function s(l,h,u){u!==0&&(e.drawArraysInstanced(r,l,h,u),i.update(h,r,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,l,0,h,0,u);let d=0;for(let c=0;c<u;c++)d+=h[c];i.update(d,r,1)}this.setMode=a,this.render=n,this.renderInstances=s,this.renderMultiDraw=o}function _b(e,t,i,r){let a;function n(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(C){return!(C!==Jt&&r.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let _=C===ar&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==oi&&C!==Bi&&!_&&r.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=i.precision!==void 0?i.precision:"highp",u=l(h);u!==h&&(ze("WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);let d=i.logarithmicDepthBuffer===!0,c=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&c===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),E=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),A=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reversedDepthBuffer:c,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:A}}function yb(e){let t=this,i=null,r=0,a=!1,n=!1,s=new Kr,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,c){let p=d.length!==0||c||r!==0||a;return a=c,r=d.length,p},this.beginShadows=function(){n=!0,u(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(d,c){i=u(d,c,0)},this.setState=function(d,c,p){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=e.get(d);if(!a||g===null||g.length===0||n&&!m)n?u(null):h();else{let x=n?0:r,E=x*4,y=f.clippingState||null;l.value=y,y=u(g,c,E,p);for(let w=0;w!==E;++w)y[w]=i[w];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function h(){l.value!==i&&(l.value=i,l.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(d,c,p,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let f=p+v*4,x=c.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,y=p;E!==v;++E,y+=4)s.copy(d[E]).applyMatrix4(x,o),s.normal.toArray(m,y),m[y+3]=s.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}var vn=4,xb=6,Sb=20,bb=256,es=new Ts,op=new Be,wh=null,Eh=0,Th=0,Ah=!1,Mb=new R,Sa=new R,lp=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){let{size:n=256,position:s=Mb}=a;wh=this._renderer.getRenderTarget(),Eh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),Ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(n);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o,s),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=up(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wh,Eh,Th),this._renderer.xr.enabled=Ah,e.scissorTest=!1,un(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ta||e.mapping===xn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wh=this._renderer.getRenderTarget(),Eh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),Ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:ar,format:Jt,colorSpace:Go,depthBuffer:!1},r=hp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hp(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=wb(a)),this._blurMaterial=Tb(a,e,t),this._ggxMaterial=Eb(a,e,t)}return r}_compileMaterial(e){let t=new Ht(new St,e);this._renderer.compile(t,es)}_sceneToCubeUV(e,t,i,r,a){let n=new fi(90,1,t,i),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(op),l.toneMapping=ir,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ht(new yi,new nr({name:"PMREM.Background",side:li,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,c=d.material,p=!1,g=e.background;g?g.isColor&&(c.color.copy(g),e.background=null,p=!0):(c.color.copy(op),p=!0);for(let v=0;v<6;v++){let m=v%3;m===0?(n.up.set(0,s[v],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x+o[v],a.y,a.z)):m===1?(n.up.set(0,0,s[v]),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y+o[v],a.z)):(n.up.set(0,s[v],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y,a.z+o[v]));let f=this._cubeSize;un(r,m*f,v>2?f:0,f,f),l.setRenderTarget(r),p&&l.render(d,n),l.render(e,n)}l.toneMapping=u,l.autoClear=h,e.background=g}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Ta||e.mapping===xn;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=cp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=up());let a=r?this._cubemapMaterial:this._equirectMaterial,n=this._lodMeshes[0];n.material=a;let s=a.uniforms;s.envMap.value=e;let o=this._cubeSize;un(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(n,es)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,n=this._ggxMaterial,s=this._lodMeshes[i];s.material=n;let o=n.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,c=u*d,{_lodMax:p}=this,g=this._sizeLods[i],v=3*g*(i>p-vn?i-p+vn:0),m=4*(this._cubeSize-g);o.envMap.value=e.texture,o.roughness.value=c,o.mipInt.value=p-t,un(a,v,m,3*g,2*g),r.setRenderTarget(a),r.render(s,es),o.envMap.value=a.texture,o.roughness.value=0,o.mipInt.value=p-i,un(e,v,m,3*g,2*g),r.setRenderTarget(e),r.render(s,es)}_blur(e,t,i,r){let a=this._pingPongRenderTarget,n=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,n),this._blurPass(a,e,i,i,n)}_blurPass(e,t,i,r,a){let n=this._renderer,s=this._blurMaterial,o=this._lodMeshes[r];o.material=s;let l=s.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[r],u=3*h*(r>this._lodMax-vn?r-this._lodMax+vn:0),d=4*(this._cubeSize-h);un(t,u,d,3*h,2*h),n.setRenderTarget(t),n.render(o,es)}};function wb(e){let t=[],i=[],r=e,a=e-vn+1+xb;for(let n=0;n<a;n++){let s=Math.pow(2,r);t.push(s);let o=1/(s-2),l=-o,h=1+o,u=[l,l,h,l,h,h,l,l,h,h,l,h],d=6,c=6,p=3,g=new Float32Array(p*c*d),v=new Float32Array(p*c*d);for(let f=0;f<d;f++){let x=f%3*2/3-1,E=f>2?0:-1,y=[x,E,0,x+2/3,E,0,x+2/3,E+1,0,x,E,0,x+2/3,E+1,0,x,E+1,0];g.set(y,p*c*f);for(let w=0;w<c;w++){let A=u[w*2]*2-1,C=u[w*2+1]*2-1;f===0?Sa.set(1,C,A):f===1?Sa.set(-A,1,-C):f===2?Sa.set(-A,C,1):f===3?Sa.set(-1,C,-A):f===4?Sa.set(-A,-1,C):Sa.set(A,C,-1),Sa.toArray(v,(f*c+w)*p)}}let m=new St;m.setAttribute("position",new qt(g,p)),m.setAttribute("outputDirection",new qt(v,p)),i.push(new Ht(m,null)),r>vn&&r--}return{lodMeshes:i,sizeLods:t}}function hp(e,t,i){let r=new gi(e,t,i);return r.texture.mapping=Zo,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function un(e,t,i,r,a){e.viewport.set(t,i,r,a),e.scissor.set(t,i,r,a)}function Eb(e,t,i){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bb,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Tb(e,t,i){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:Sb,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Jo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function up(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function cp(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Jo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var a0=class extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new vf(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new yi(5,5,5),a=new ni({name:"CubemapFromEquirect",uniforms:wn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:li,blending:wr});a.uniforms.tEquirect.value=t;let n=new Ht(r,a),s=t.minFilter;return t.minFilter===Mr&&(t.minFilter=Rt),new Sy(1,10,this).update(e,n),t.minFilter=s,n.geometry.dispose(),n.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let a=e.getRenderTarget();for(let n=0;n<6;n++)e.setRenderTarget(this,n),e.clear(t,i,r);e.setRenderTarget(a)}};function Ab(e){let t=new WeakMap,i=new WeakMap,r=null;function a(c,p=!1){return c==null?null:p?s(c):n(c)}function n(c){if(c&&c.isTexture){let p=c.mapping;if(p===Yl||p===Zl)if(t.has(c)){let g=t.get(c).texture;return o(g,c.mapping)}else{let g=c.image;if(g&&g.height>0){let v=new a0(g.height);return v.fromEquirectangularTexture(e,c),t.set(c,v),c.addEventListener("dispose",h),o(v.texture,c.mapping)}else return null}}return c}function s(c){if(c&&c.isTexture){let p=c.mapping,g=p===Yl||p===Zl,v=p===Ta||p===xn;if(g||v){let m=i.get(c),f=m!==void 0?m.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==f)return r===null&&(r=new lp(e)),m=g?r.fromEquirectangular(c,m):r.fromCubemap(c,m),m.texture.pmremVersion=c.pmremVersion,i.set(c,m),m.texture;if(m!==void 0)return m.texture;{let x=c.image;return g&&x&&x.height>0||v&&x&&l(x)?(r===null&&(r=new lp(e)),m=g?r.fromEquirectangular(c):r.fromCubemap(c),m.texture.pmremVersion=c.pmremVersion,i.set(c,m),c.addEventListener("dispose",u),m.texture):null}}}return c}function o(c,p){return p===Yl?c.mapping=Ta:p===Zl&&(c.mapping=xn),c}function l(c){let p=0,g=6;for(let v=0;v<g;v++)c[v]!==void 0&&p++;return p===g}function h(c){let p=c.target;p.removeEventListener("dispose",h);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function u(c){let p=c.target;p.removeEventListener("dispose",u);let g=i.get(p);g!==void 0&&(i.delete(p),g.dispose())}function d(){t=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:d}}function Rb(e){let t={};function i(r){if(t[r]!==void 0)return t[r];let a=e.getExtension(r);return t[r]=a,a}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){let a=i(r);return a===null&&_n("WebGLRenderer: "+r+" extension not supported."),a}}}function Cb(e,t,i,r){let a={},n=new WeakMap;function s(d){let c=d.target;c.index!==null&&t.remove(c.index);for(let g in c.attributes)t.remove(c.attributes[g]);c.removeEventListener("dispose",s),delete a[c.id];let p=n.get(c);p&&(t.remove(p),n.delete(c)),r.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,i.memory.geometries--}function o(d,c){return a[c.id]===!0||(c.addEventListener("dispose",s),a[c.id]=!0,i.memory.geometries++),c}function l(d){let c=d.attributes;for(let p in c)t.update(c[p],e.ARRAY_BUFFER)}function h(d){let c=[],p=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(p!==null){let x=p.array;v=p.version;for(let E=0,y=x.length;E<y;E+=3){let w=x[E+0],A=x[E+1],C=x[E+2];c.push(w,A,A,C,C,w)}}else{let x=g.array;v=g.version;for(let E=0,y=x.length/3-1;E<y;E+=3){let w=E+0,A=E+1,C=E+2;c.push(w,A,A,C,C,w)}}let m=new(g.count>=65535?ff:pf)(c,1);m.version=v;let f=n.get(d);f&&t.remove(f),n.set(d,m)}function u(d){let c=n.get(d);if(c){let p=d.index;p!==null&&c.version<p.version&&h(d)}else h(d);return n.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Pb(e,t,i){let r;function a(d){r=d}let n,s;function o(d){n=d.type,s=d.bytesPerElement}function l(d,c){e.drawElements(r,c,n,d*s),i.update(c,r,1)}function h(d,c,p){p!==0&&(e.drawElementsInstanced(r,c,n,d*s,p),i.update(c,r,p))}function u(d,c,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,c,0,n,d,0,p);let g=0;for(let v=0;v<p;v++)g+=c[v];i.update(g,r,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u}function Lb(e){let t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(n,s,o){switch(i.calls++,s){case e.TRIANGLES:i.triangles+=o*(n/3);break;case e.LINES:i.lines+=o*(n/2);break;case e.LINE_STRIP:i.lines+=o*(n-1);break;case e.LINE_LOOP:i.lines+=o*n;break;case e.POINTS:i.points+=o*n;break;default:He("WebGLInfo: Unknown draw mode:",s);break}}function a(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:a,update:r}}function Ib(e,t,i){let r=new WeakMap,a=new At;function n(s,o,l){let h=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,c=r.get(o);if(c===void 0||c.count!==d){let p=function(){_.dispose(),r.delete(o),o.removeEventListener("dispose",p)};c!==void 0&&c.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],y=0;g===!0&&(y=1),v===!0&&(y=2),m===!0&&(y=3);let w=o.attributes.position.count*y,A=1;w>t.maxTextureSize&&(A=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);let C=new Float32Array(w*A*4*d),_=new lf(C,w,A,d);_.type=Bi,_.needsUpdate=!0;let S=y*4;for(let L=0;L<d;L++){let P=f[L],N=x[L],V=E[L],D=w*A*4*L;for(let F=0;F<P.count;F++){let Y=F*S;g===!0&&(a.fromBufferAttribute(P,F),C[D+Y+0]=a.x,C[D+Y+1]=a.y,C[D+Y+2]=a.z,C[D+Y+3]=0),v===!0&&(a.fromBufferAttribute(N,F),C[D+Y+4]=a.x,C[D+Y+5]=a.y,C[D+Y+6]=a.z,C[D+Y+7]=0),m===!0&&(a.fromBufferAttribute(V,F),C[D+Y+8]=a.x,C[D+Y+9]=a.y,C[D+Y+10]=a.z,C[D+Y+11]=V.itemSize===4?a.w:1)}}c={count:d,texture:_,size:new K(w,A)},r.set(o,c),o.addEventListener("dispose",p)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",s.morphTexture,i);else{let p=0;for(let v=0;v<h.length;v++)p+=h[v];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",h)}l.getUniforms().setValue(e,"morphTargetsTexture",c.texture,i),l.getUniforms().setValue(e,"morphTargetsTextureSize",c.size)}return{update:n}}function Db(e,t,i,r,a){let n=new WeakMap;function s(h){let u=a.render.frame,d=h.geometry,c=t.get(h,d);if(n.get(c)!==u&&(t.update(c),n.set(c,u)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),n.get(h)!==u&&(i.update(h.instanceMatrix,e.ARRAY_BUFFER),h.instanceColor!==null&&i.update(h.instanceColor,e.ARRAY_BUFFER),n.set(h,u))),h.isSkinnedMesh){let p=h.skeleton;n.get(p)!==u&&(p.update(),n.set(p,u))}return c}function o(){n=new WeakMap}function l(h){let u=h.target;u.removeEventListener("dispose",l),r.releaseStatesOfObject(u),i.remove(u.instanceMatrix),u.instanceColor!==null&&i.remove(u.instanceColor)}return{update:s,dispose:o}}var Nb={[Hp]:"LINEAR_TONE_MAPPING",[Gp]:"REINHARD_TONE_MAPPING",[Vp]:"CINEON_TONE_MAPPING",[Wp]:"ACES_FILMIC_TONE_MAPPING",[jp]:"AGX_TONE_MAPPING",[qp]:"NEUTRAL_TONE_MAPPING",[Xp]:"CUSTOM_TONE_MAPPING"};function Ub(e,t,i,r,a,n){let s=new gi(t,i,{type:e,depthBuffer:a,stencilBuffer:n,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,h=new St;h.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ge([0,2,0,0,2,0],2));let u=new iy({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ht(h,u),c=new Ts(-1,1,1,-1,0,1),p=null,g=null,v=!1,m,f=null,x=[],E=!1;this.setSize=function(y,w){s.setSize(y,w),o!==null&&o.setSize(y,w),l!==null&&l.setSize(y,w);for(let A=0;A<x.length;A++){let C=x[A];C.setSize&&C.setSize(y,w)}},this.setEffects=function(y){x=y,E=x.length>0&&x[0].isRenderPass===!0;let w=s.width,A=s.height;x.length>0&&o===null&&(o=new gi(w,A,{type:ar,depthBuffer:!1,stencilBuffer:!1}),l=new gi(w,A,{type:ar,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<x.length;C++){let _=x[C];_.setSize&&_.setSize(w,A)}},this.begin=function(y,w){if(v||y.toneMapping===ir&&x.length===0)return!1;if(f=w,w!==null){let A=w.width,C=w.height;(s.width!==A||s.height!==C)&&this.setSize(A,C)}return E===!1&&y.setRenderTarget(s),m=y.toneMapping,y.toneMapping=ir,!0},this.hasRenderPass=function(){return E},this.end=function(y,w){y.toneMapping=m,v=!0;let A=s,C=o;for(let _=0;_<x.length;_++){let S=x[_];S.enabled!==!1&&(S.render(y,C,A,w),S.needsSwap!==!1&&(A=C,C=C===o?l:o))}if(p!==y.outputColorSpace||g!==y.toneMapping){p=y.outputColorSpace,g=y.toneMapping,u.defines={},st.getTransfer(p)===dt&&(u.defines.SRGB_TRANSFER="");let _=Nb[g];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,y.setRenderTarget(f),y.render(d,c),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var n0=new Gi,_u=new Ra(1,1),s0=new lf,o0=new hf,l0=new vf,dp=[],pp=[],fp=new Float32Array(16),mp=new Float32Array(9),gp=new Float32Array(4);function Tn(e,t,i){let r=e[0];if(r<=0||r>0)return e;let a=t*i,n=dp[a];if(n===void 0&&(n=new Float32Array(a),dp[a]=n),t!==0){r.toArray(n,0);for(let s=1,o=0;s!==t;++s)o+=i,e[s].toArray(n,o)}return n}function Ot(e,t){if(e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(e[i]!==t[i])return!1;return!0}function zt(e,t){for(let i=0,r=t.length;i<r;i++)e[i]=t[i]}function Qo(e,t){let i=pp[t];i===void 0&&(i=new Int32Array(t),pp[t]=i);for(let r=0;r!==t;++r)i[r]=e.allocateTextureUnit();return i}function kb(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function Ob(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Ot(i,t))return;e.uniform2fv(this.addr,t),zt(i,t)}}function zb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Ot(i,t))return;e.uniform3fv(this.addr,t),zt(i,t)}}function Fb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Ot(i,t))return;e.uniform4fv(this.addr,t),zt(i,t)}}function Bb(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(Ot(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),zt(i,t)}else{if(Ot(i,r))return;gp.set(r),e.uniformMatrix2fv(this.addr,!1,gp),zt(i,r)}}function Hb(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(Ot(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),zt(i,t)}else{if(Ot(i,r))return;mp.set(r),e.uniformMatrix3fv(this.addr,!1,mp),zt(i,r)}}function Gb(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(Ot(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),zt(i,t)}else{if(Ot(i,r))return;fp.set(r),e.uniformMatrix4fv(this.addr,!1,fp),zt(i,r)}}function Vb(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function Wb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Ot(i,t))return;e.uniform2iv(this.addr,t),zt(i,t)}}function Xb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Ot(i,t))return;e.uniform3iv(this.addr,t),zt(i,t)}}function jb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Ot(i,t))return;e.uniform4iv(this.addr,t),zt(i,t)}}function qb(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function Yb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Ot(i,t))return;e.uniform2uiv(this.addr,t),zt(i,t)}}function Zb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Ot(i,t))return;e.uniform3uiv(this.addr,t),zt(i,t)}}function Kb(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Ot(i,t))return;e.uniform4uiv(this.addr,t),zt(i,t)}}function $b(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a);let n;this.type===e.SAMPLER_2D_SHADOW?(_u.compareFunction=i.isReversedDepthBuffer()?Du:Iu,n=_u):n=n0,i.setTexture2D(t||n,a)}function Jb(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture3D(t||o0,a)}function Qb(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTextureCube(t||l0,a)}function eM(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture2DArray(t||s0,a)}function tM(e){switch(e){case 5126:return kb;case 35664:return Ob;case 35665:return zb;case 35666:return Fb;case 35674:return Bb;case 35675:return Hb;case 35676:return Gb;case 5124:case 35670:return Vb;case 35667:case 35671:return Wb;case 35668:case 35672:return Xb;case 35669:case 35673:return jb;case 5125:return qb;case 36294:return Yb;case 36295:return Zb;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return $b;case 35679:case 36299:case 36307:return Jb;case 35680:case 36300:case 36308:case 36293:return Qb;case 36289:case 36303:case 36311:case 36292:return eM}}function iM(e,t){e.uniform1fv(this.addr,t)}function rM(e,t){let i=Tn(t,this.size,2);e.uniform2fv(this.addr,i)}function aM(e,t){let i=Tn(t,this.size,3);e.uniform3fv(this.addr,i)}function nM(e,t){let i=Tn(t,this.size,4);e.uniform4fv(this.addr,i)}function sM(e,t){let i=Tn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function oM(e,t){let i=Tn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function lM(e,t){let i=Tn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function hM(e,t){e.uniform1iv(this.addr,t)}function uM(e,t){e.uniform2iv(this.addr,t)}function cM(e,t){e.uniform3iv(this.addr,t)}function dM(e,t){e.uniform4iv(this.addr,t)}function pM(e,t){e.uniform1uiv(this.addr,t)}function fM(e,t){e.uniform2uiv(this.addr,t)}function mM(e,t){e.uniform3uiv(this.addr,t)}function gM(e,t){e.uniform4uiv(this.addr,t)}function vM(e,t,i){let r=this.cache,a=t.length,n=Qo(i,a);Ot(r,n)||(e.uniform1iv(this.addr,n),zt(r,n));let s;this.type===e.SAMPLER_2D_SHADOW?s=_u:s=n0;for(let o=0;o!==a;++o)i.setTexture2D(t[o]||s,n[o])}function _M(e,t,i){let r=this.cache,a=t.length,n=Qo(i,a);Ot(r,n)||(e.uniform1iv(this.addr,n),zt(r,n));for(let s=0;s!==a;++s)i.setTexture3D(t[s]||o0,n[s])}function yM(e,t,i){let r=this.cache,a=t.length,n=Qo(i,a);Ot(r,n)||(e.uniform1iv(this.addr,n),zt(r,n));for(let s=0;s!==a;++s)i.setTextureCube(t[s]||l0,n[s])}function xM(e,t,i){let r=this.cache,a=t.length,n=Qo(i,a);Ot(r,n)||(e.uniform1iv(this.addr,n),zt(r,n));for(let s=0;s!==a;++s)i.setTexture2DArray(t[s]||s0,n[s])}function SM(e){switch(e){case 5126:return iM;case 35664:return rM;case 35665:return aM;case 35666:return nM;case 35674:return sM;case 35675:return oM;case 35676:return lM;case 5124:case 35670:return hM;case 35667:case 35671:return uM;case 35668:case 35672:return cM;case 35669:case 35673:return dM;case 5125:return pM;case 36294:return fM;case 36295:return mM;case 36296:return gM;case 35678:case 36198:case 36298:case 36306:case 35682:return vM;case 35679:case 36299:case 36307:return _M;case 35680:case 36300:case 36308:case 36293:return yM;case 36289:case 36303:case 36311:case 36292:return xM}}var bM=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=tM(t.type)}},MM=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=SM(t.type)}},wM=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,n=r.length;a!==n;++a){let s=r[a];s.setValue(e,t[s.id],i)}}},Rh=/(\w+)(\])?(\[|\.)?/g;function vp(e,t){e.seq.push(t),e.map[t.id]=t}function EM(e,t,i){let r=e.name,a=r.length;for(Rh.lastIndex=0;;){let n=Rh.exec(r),s=Rh.lastIndex,o=n[1],l=n[2]==="]",h=n[3];if(l&&(o=o|0),h===void 0||h==="["&&s+2===a){vp(i,h===void 0?new bM(o,e,t):new MM(o,e,t));break}else{let u=i.map[o];u===void 0&&(u=new wM(o),vp(i,u)),i=u}}}var zo=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){let s=e.getActiveUniform(t,n),o=e.getUniformLocation(t,s.name);EM(s,o,this)}let r=[],a=[];for(let n of this.seq)n.type===e.SAMPLER_2D_SHADOW||n.type===e.SAMPLER_CUBE_SHADOW||n.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(n):a.push(n);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,n=t.length;a!==n;++a){let s=t[a],o=i[s.id];o.needsUpdate!==!1&&s.setValue(e,o.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let n=e[r];n.id in t&&i.push(n)}return i}};function _p(e,t,i){let r=e.createShader(t);return e.shaderSource(r,i),e.compileShader(r),r}var TM=37297,AM=0;function RM(e,t){let i=e.split(`
`),r=[],a=Math.max(t-6,0),n=Math.min(t+6,i.length);for(let s=a;s<n;s++){let o=s+1;r.push(`${o===t?">":" "} ${o}: ${i[s]}`)}return r.join(`
`)}var yp=new $e;function CM(e){st._getMatrix(yp,st.workingColorSpace,e);let t=`mat3( ${yp.elements.map(i=>i.toFixed(4))} )`;switch(st.getTransfer(e)){case Vo:return[t,"LinearTransferOETF"];case dt:return[t,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function xp(e,t,i){let r=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(r&&a==="")return"";let n=/ERROR: 0:(\d+)/.exec(a);if(n){let s=parseInt(n[1]);return i.toUpperCase()+`

`+a+`

`+RM(e.getShaderSource(t),s)}else return a}function PM(e,t){let i=CM(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}var LM={[Hp]:"Linear",[Gp]:"Reinhard",[Vp]:"Cineon",[Wp]:"ACESFilmic",[jp]:"AgX",[qp]:"Neutral",[Xp]:"Custom"};function IM(e,t){let i=LM[t];return i===void 0?(ze("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}var Po=new R;function DM(){st.getLuminanceCoefficients(Po);let e=Po.x.toFixed(4),t=Po.y.toFixed(4),i=Po.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NM(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ns).join(`
`)}function UM(e){let t=[];for(let i in e){let r=e[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function kM(e,t){let i={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){let n=e.getActiveAttrib(t,a),s=n.name,o=1;n.type===e.FLOAT_MAT2&&(o=2),n.type===e.FLOAT_MAT3&&(o=3),n.type===e.FLOAT_MAT4&&(o=4),i[s]={type:n.type,location:e.getAttribLocation(t,s),locationSize:o}}return i}function ns(e){return e!==""}function Sp(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bp(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var OM=/^[ \t]*#include +<([\w\d./]+)>/gm;function yu(e){return e.replace(OM,FM)}var zM=new Map;function FM(e,t){let i=Je[t];if(i===void 0){let r=zM.get(t);if(r!==void 0)i=Je[r],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return yu(i)}var BM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mp(e){return e.replace(BM,HM)}function HM(e,t,i,r){let a="";for(let n=parseInt(t);n<parseInt(i);n++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return a}function wp(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var GM={[Lo]:"SHADOWMAP_TYPE_PCF",[rs]:"SHADOWMAP_TYPE_VSM"};function VM(e){return GM[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var WM={[Ta]:"ENVMAP_TYPE_CUBE",[xn]:"ENVMAP_TYPE_CUBE",[Zo]:"ENVMAP_TYPE_CUBE_UV"};function XM(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":WM[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var jM={[xn]:"ENVMAP_MODE_REFRACTION"};function qM(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":jM[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var YM={[wu]:"ENVMAP_BLENDING_MULTIPLY",[vv]:"ENVMAP_BLENDING_MIX",[_v]:"ENVMAP_BLENDING_ADD"};function ZM(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":YM[e.combine]||"ENVMAP_BLENDING_NONE"}function KM(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function $M(e,t,i,r){let a=e.getContext(),n=i.defines,s=i.vertexShader,o=i.fragmentShader,l=VM(i),h=XM(i),u=qM(i),d=ZM(i),c=KM(i),p=NM(i),g=UM(n),v=a.createProgram(),m,f,x=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(m=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(ns).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(ns).join(`
`),f.length>0&&(f+=`
`)):(m=[wp(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+u:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ns).join(`
`),f=[wp(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+u:"",i.envMap?"#define "+d:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ir?"#define TONE_MAPPING":"",i.toneMapping!==ir?Je.tonemapping_pars_fragment:"",i.toneMapping!==ir?IM("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,PM("linearToOutputTexel",i.outputColorSpace),DM(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(ns).join(`
`)),s=yu(s),s=Sp(s,i),s=bp(s,i),o=yu(o),o=Sp(o,i),o=bp(o,i),s=Mp(s),o=Mp(o),i.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",i.glslVersion===Ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let E=x+m+s,y=x+f+o,w=_p(a,a.VERTEX_SHADER,E),A=_p(a,a.FRAGMENT_SHADER,y);a.attachShader(v,w),a.attachShader(v,A),i.index0AttributeName!==void 0?a.bindAttribLocation(v,0,i.index0AttributeName):i.hasPositionAttribute===!0&&a.bindAttribLocation(v,0,"position"),a.linkProgram(v);function C(P){if(e.debug.checkShaderErrors){let N=a.getProgramInfoLog(v)||"",V=a.getShaderInfoLog(w)||"",D=a.getShaderInfoLog(A)||"",F=N.trim(),Y=V.trim(),G=D.trim(),re=!0,j=!0;if(a.getProgramParameter(v,a.LINK_STATUS)===!1)if(re=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,v,w,A);else{let Z=xp(a,w,"vertex"),J=xp(a,A,"fragment");He("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(v,a.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+Z+`
`+J)}else F!==""?ze("WebGLProgram: Program Info Log:",F):(Y===""||G==="")&&(j=!1);j&&(P.diagnostics={runnable:re,programLog:F,vertexShader:{log:Y,prefix:m},fragmentShader:{log:G,prefix:f}})}a.deleteShader(w),a.deleteShader(A),_=new zo(a,v),S=kM(a,v)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let L=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=a.getProgramParameter(v,TM)),L},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(v),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=AM++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=A,this}var JM=0,QM=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new e2(e),t.set(e,i)),i}},e2=class{constructor(e){this.id=JM++,this.code=e,this.usedTimes=0}};function t2(e){return e===Aa||e===Fo||e===Bo}function i2(e,t,i,r,a,n){let s=new cf,o=new QM,l=new Set,h=[],u=new Map,d=r.logarithmicDepthBuffer,c=r.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,S,L,P,N,V){let D=P.fog,F=N.geometry,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,re=t.get(_.envMap||Y,G),j=re&&re.mapping===Zo?re.image.height:null,Z=p[_.type];_.precision!==null&&(c=r.getMaxPrecision(_.precision),c!==_.precision&&ze("WebGLProgram.getParameters:",_.precision,"not supported, using",c,"instead."));let J=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ue=J!==void 0?J.length:0,we=0;F.morphAttributes.position!==void 0&&(we=1),F.morphAttributes.normal!==void 0&&(we=2),F.morphAttributes.color!==void 0&&(we=3);let tt,Ve,q,ie;if(Z){let Nt=Ji[Z];tt=Nt.vertexShader,Ve=Nt.fragmentShader}else{tt=_.vertexShader,Ve=_.fragmentShader;let Nt=o.getVertexShaderStage(_),ct=o.getFragmentShaderStage(_);o.update(_,Nt,ct),q=Nt.id,ie=ct.id}let le=e.getRenderTarget(),Pe=e.state.buffers.depth.getReversed(),ke=N.isInstancedMesh===!0,fe=N.isBatchedMesh===!0,et=!!_.map,te=!!_.matcap,ee=!!re,ue=!!_.aoMap,xe=!!_.lightMap,Se=!!_.bumpMap&&_.wireframe===!1,Ae=!!_.normalMap,Ne=!!_.displacementMap,Ye=!!_.emissiveMap,Ke=!!_.metalnessMap,I=!!_.roughnessMap,vt=_.anisotropy>0,nt=_.clearcoat>0,it=_.dispersion>0,T=_.retroreflectivity>0,b=_.iridescence>0,U=_.sheen>0,W=_.transmission>0,Q=vt&&!!_.anisotropyMap,pe=nt&&!!_.clearcoatMap,me=nt&&!!_.clearcoatNormalMap,z=nt&&!!_.clearcoatRoughnessMap,ce=b&&!!_.iridescenceMap,ve=b&&!!_.iridescenceThicknessMap,Te=U&&!!_.sheenColorMap,oe=U&&!!_.sheenRoughnessMap,Ie=!!_.specularMap,De=!!_.specularColorMap,je=!!_.specularIntensityMap,ut=W&&!!_.transmissionMap,O=W&&!!_.thicknessMap,$=!!_.gradientMap,ae=!!_.alphaMap,be=_.alphaTest>0,Re=!!_.alphaHash,se=!!_.extensions,ye=ir;_.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ye=e.toneMapping);let Fe={shaderID:Z,shaderType:_.type,shaderName:_.name,vertexShader:tt,fragmentShader:Ve,defines:_.defines,customVertexShaderID:q,customFragmentShaderID:ie,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:c,batching:fe,batchingColor:fe&&N._colorsTexture!==null,instancing:ke,instancingColor:ke&&N.instanceColor!==null,instancingMorph:ke&&N.morphTexture!==null,outputColorSpace:le===null?e.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:et,matcap:te,envMap:ee,envMapMode:ee&&re.mapping,envMapCubeUVHeight:j,aoMap:ue,lightMap:xe,bumpMap:Se,normalMap:Ae,displacementMap:Ne,emissiveMap:Ye,normalMapObjectSpace:Ae&&_.normalMapType===Sv,normalMapTangentSpace:Ae&&_.normalMapType===ms,packedNormalMap:Ae&&_.normalMapType===ms&&t2(_.normalMap.format),metalnessMap:Ke,roughnessMap:I,anisotropy:vt,anisotropyMap:Q,clearcoat:nt,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:z,dispersion:it,retroreflection:T,iridescence:b,iridescenceMap:ce,iridescenceThicknessMap:ve,sheen:U,sheenColorMap:Te,sheenRoughnessMap:oe,specularMap:Ie,specularColorMap:De,specularIntensityMap:je,transmission:W,transmissionMap:ut,thicknessMap:O,gradientMap:$,opaque:_.transparent===!1&&_.blending===ss&&_.alphaToCoverage===!1,alphaMap:ae,alphaTest:be,alphaHash:Re,combine:_.combine,mapUv:et&&g(_.map.channel),aoMapUv:ue&&g(_.aoMap.channel),lightMapUv:xe&&g(_.lightMap.channel),bumpMapUv:Se&&g(_.bumpMap.channel),normalMapUv:Ae&&g(_.normalMap.channel),displacementMapUv:Ne&&g(_.displacementMap.channel),emissiveMapUv:Ye&&g(_.emissiveMap.channel),metalnessMapUv:Ke&&g(_.metalnessMap.channel),roughnessMapUv:I&&g(_.roughnessMap.channel),anisotropyMapUv:Q&&g(_.anisotropyMap.channel),clearcoatMapUv:pe&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:me&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:oe&&g(_.sheenRoughnessMap.channel),specularMapUv:Ie&&g(_.specularMap.channel),specularColorMapUv:De&&g(_.specularColorMap.channel),specularIntensityMapUv:je&&g(_.specularIntensityMap.channel),transmissionMapUv:ut&&g(_.transmissionMap.channel),thicknessMapUv:O&&g(_.thicknessMap.channel),alphaMapUv:ae&&g(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Ae||vt),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!F.attributes.uv&&(et||ae),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&Ae===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Pe,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:we,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:_.dithering,shadowMapEnabled:e.shadowMap.enabled&&L.length>0,shadowMapType:e.shadowMap.type,toneMapping:ye,decodeVideoTexture:et&&_.map.isVideoTexture===!0&&st.getTransfer(_.map.colorSpace)===dt,decodeVideoTextureEmissive:Ye&&_.emissiveMap.isVideoTexture===!0&&st.getTransfer(_.emissiveMap.colorSpace)===dt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===mi,flipSided:_.side===li,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:se&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&_.extensions.multiDraw===!0||fe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function m(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let L in _.defines)S.push(L),S.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(f(S,_),x(S,_),S.push(e.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function f(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function x(_,S){s.disableAll(),S.instancing&&s.enable(0),S.instancingColor&&s.enable(1),S.instancingMorph&&s.enable(2),S.matcap&&s.enable(3),S.envMap&&s.enable(4),S.normalMapObjectSpace&&s.enable(5),S.normalMapTangentSpace&&s.enable(6),S.clearcoat&&s.enable(7),S.iridescence&&s.enable(8),S.alphaTest&&s.enable(9),S.vertexColors&&s.enable(10),S.vertexAlphas&&s.enable(11),S.vertexUv1s&&s.enable(12),S.vertexUv2s&&s.enable(13),S.vertexUv3s&&s.enable(14),S.vertexTangents&&s.enable(15),S.anisotropy&&s.enable(16),S.alphaHash&&s.enable(17),S.batching&&s.enable(18),S.dispersion&&s.enable(19),S.retroreflection&&s.enable(24),S.batchingColor&&s.enable(20),S.gradientMap&&s.enable(21),S.packedNormalMap&&s.enable(22),S.vertexNormals&&s.enable(23),_.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reversedDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),S.numLightProbeGrids>0&&s.enable(22),S.hasPositionAttribute&&s.enable(23),_.push(s.mask)}function E(_){let S=p[_.type],L;if(S){let P=Ji[S];L=Q_.clone(P.uniforms)}else L=_.uniforms;return L}function y(_,S){let L=u.get(S);return L!==void 0?++L.usedTimes:(L=new $M(e,S,_,a),h.push(L),u.set(S,L)),L}function w(_){if(--_.usedTimes===0){let S=h.indexOf(_);h[S]=h[h.length-1],h.pop(),u.delete(_.cacheKey),_.destroy()}}function A(_){o.remove(_)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:C}}function r2(){let e=new WeakMap;function t(s){return e.has(s)}function i(s){let o=e.get(s);return o===void 0&&(o={},e.set(s,o)),o}function r(s){e.delete(s)}function a(s,o,l){e.get(s)[o]=l}function n(){e=new WeakMap}return{has:t,get:i,remove:r,update:a,dispose:n}}function a2(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Ep(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Tp(){let e=[],t=0,i=[],r=[],a=[];function n(){t=0,i.length=0,r.length=0,a.length=0}function s(c){let p=0;return c.isInstancedMesh&&(p+=2),c.isSkinnedMesh&&(p+=1),p}function o(c,p,g,v,m,f){let x=e[t];return x===void 0?(x={id:c.id,object:c,geometry:p,material:g,materialVariant:s(c),groupOrder:v,renderOrder:c.renderOrder,z:m,group:f},e[t]=x):(x.id=c.id,x.object=c,x.geometry=p,x.material=g,x.materialVariant=s(c),x.groupOrder=v,x.renderOrder=c.renderOrder,x.z=m,x.group=f),t++,x}function l(c,p,g,v,m,f,x){x.reversedDepth===!0&&(m=-m);let E=o(c,p,g,v,m,f);g.transmission>0?r.push(E):g.transparent===!0?a.push(E):i.push(E)}function h(c,p,g,v,m,f){let x=o(c,p,g,v,m,f);g.transmission>0?r.unshift(x):g.transparent===!0?a.unshift(x):i.unshift(x)}function u(c,p){i.length>1&&i.sort(c||a2),r.length>1&&r.sort(p||Ep),a.length>1&&a.sort(p||Ep)}function d(){for(let c=t,p=e.length;c<p;c++){let g=e[c];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:i,transmissive:r,transparent:a,init:n,push:l,unshift:h,finish:d,sort:u}}function n2(){let e=new WeakMap;function t(r,a){let n=e.get(r),s;return n===void 0?(s=new Tp,e.set(r,[s])):a>=n.length?(s=new Tp,n.push(s)):s=n[a],s}function i(){e=new WeakMap}return{get:t,dispose:i}}function s2(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new R,color:new Be};break;case"SpotLight":i={position:new R,direction:new R,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new R,color:new Be,distance:0,decay:0};break;case"HemisphereLight":i={direction:new R,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":i={color:new Be,position:new R,halfWidth:new R,halfHeight:new R};break}return e[t.id]=i,i}}}function o2(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=i,i}}}var l2=0;function h2(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function u2(e){let t=new s2,i=o2(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new R);let a=new R,n=new We,s=new We;function o(h){let u=0,d=0,c=0;for(let N=0;N<9;N++)r.probe[N].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,x=0,E=0,y=0,w=0,A=0,C=0,_=0,S=0,L=0;h.sort(h2);for(let N=0,V=h.length;N<V;N++){let D=h[N],F=D.color,Y=D.intensity,G=D.distance,re=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Aa?re=D.shadow.map.texture:re=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=F.r*Y,d+=F.g*Y,c+=F.b*Y;else if(D.isLightProbe){for(let j=0;j<9;j++)r.probe[j].addScaledVector(D.sh.coefficients[j],Y);L++}else if(D.isSunLight){let j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Z=D.shadow,J=i.get(D);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),r.sunShadow[g]=J,r.sunShadowMap[g]=re;let Ue=Z.getViewportCount();for(let we=0;we<Ue;we++)r.sunShadowMatrix[v+we]=Z.getMatrix(we),r.sunShadowCascade[v+we]=Z._cascadeData[we];v+=Ue,g++}r.sun[p]=j,p++}else if(D.isDirectionalLight){let j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Z=D.shadow,J=i.get(D);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,r.directionalShadow[m]=J,r.directionalShadowMap[m]=re,r.directionalShadowMatrix[m]=D.shadow.matrix,w++}r.directional[m]=j,m++}else if(D.isSpotLight){let j=t.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(F).multiplyScalar(Y),j.distance=G,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,r.spot[x]=j;let Z=D.shadow;if(D.map&&(r.spotLightMap[_]=D.map,_++,Z.updateMatrices(D),D.castShadow&&S++),r.spotLightMatrix[x]=Z.matrix,D.castShadow){let J=i.get(D);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,r.spotShadow[x]=J,r.spotShadowMap[x]=re,C++}x++}else if(D.isRectAreaLight){let j=t.get(D);j.color.copy(F).multiplyScalar(Y),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),r.rectArea[E]=j,E++}else if(D.isPointLight){let j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),j.distance=D.distance,j.decay=D.decay,D.castShadow){let Z=D.shadow,J=i.get(D);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,J.shadowCameraNear=Z.camera.near,J.shadowCameraFar=Z.camera.far,r.pointShadow[f]=J,r.pointShadowMap[f]=re,r.pointShadowMatrix[f]=D.shadow.matrix,A++}r.point[f]=j,f++}else if(D.isHemisphereLight){let j=t.get(D);j.skyColor.copy(D.color).multiplyScalar(Y),j.groundColor.copy(D.groundColor).multiplyScalar(Y),r.hemi[y]=j,y++}}E>0&&(e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ge.LTC_FLOAT_1,r.rectAreaLTC2=ge.LTC_FLOAT_2):(r.rectAreaLTC1=ge.LTC_HALF_1,r.rectAreaLTC2=ge.LTC_HALF_2)),r.ambient[0]=u,r.ambient[1]=d,r.ambient[2]=c;let P=r.hash;(P.sunLength!==p||P.directionalLength!==m||P.pointLength!==f||P.spotLength!==x||P.rectAreaLength!==E||P.hemiLength!==y||P.numSunShadows!==g||P.numDirectionalShadows!==w||P.numPointShadows!==A||P.numSpotShadows!==C||P.numSpotMaps!==_||P.numLightProbes!==L)&&(r.sun.length=p,r.directional.length=m,r.spot.length=x,r.rectArea.length=E,r.point.length=f,r.hemi.length=y,r.sunShadow.length=g,r.sunShadowMap.length=g,r.sunShadowMatrix.length=v,r.sunShadowCascade.length=v,r.directionalShadow.length=w,r.directionalShadowMap.length=w,r.directionalShadowMatrix.length=w,r.pointShadow.length=A,r.pointShadowMap.length=A,r.pointShadowMatrix.length=A,r.spotShadow.length=C,r.spotShadowMap.length=C,r.spotLightMatrix.length=C+_-S,r.spotLightMap.length=_,r.numSpotLightShadowsWithMaps=S,r.numLightProbes=L,P.sunLength=p,P.directionalLength=m,P.pointLength=f,P.spotLength=x,P.rectAreaLength=E,P.hemiLength=y,P.numSunShadows=g,P.numDirectionalShadows=w,P.numPointShadows=A,P.numSpotShadows=C,P.numSpotMaps=_,P.numLightProbes=L,r.version=l2++)}function l(h,u){let d=0,c=0,p=0,g=0,v=0,m=0,f=u.matrixWorldInverse;for(let x=0,E=h.length;x<E;x++){let y=h[x];if(y.isSunLight){let w=r.sun[d];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(f),d++}else if(y.isDirectionalLight){let w=r.directional[c];w.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(a),w.direction.transformDirection(f),c++}else if(y.isSpotLight){let w=r.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),w.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(a),w.direction.transformDirection(f),g++}else if(y.isRectAreaLight){let w=r.rectArea[v];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),s.identity(),n.copy(y.matrixWorld),n.premultiply(f),s.extractRotation(n),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(s),w.halfHeight.applyMatrix4(s),v++}else if(y.isPointLight){let w=r.point[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){let w=r.hemi[m];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:r}}function Ap(e){let t=new u2(e),i=[],r=[],a=[];function n(c){d.camera=c,i.length=0,r.length=0,a.length=0}function s(c){i.push(c)}function o(c){r.push(c)}function l(c){a.push(c)}function h(){t.setup(i)}function u(c){t.setupView(i,c)}let d={lightsArray:i,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:n,state:d,setupLights:h,setupLightsView:u,pushLight:s,pushShadow:o,pushLightProbeGrid:l}}function c2(e){let t=new WeakMap;function i(a,n=0){let s=t.get(a),o;return s===void 0?(o=new Ap(e),t.set(a,[o])):n>=s.length?(o=new Ap(e),s.push(o)):o=s[n],o}function r(){t=new WeakMap}return{get:i,dispose:r}}var d2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,p2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,f2=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],m2=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Rp=new We,ts=new R,Ch=new R;function g2(e,t,i){let r=new Ou,a=new K,n=new K,s=new At,o=new ay,l=new ny,h={},u=i.maxTextureSize,d={[Ea]:li,[li]:Ea,[mi]:mi},c=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:d2,fragmentShader:p2}),p=c.clone();p.defines.HORIZONTAL_PASS=1;let g=new St;g.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Ht(g,c),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lo;let f=this.type;this.render=function(A,C,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===tv&&(ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Lo);let S=e.getRenderTarget(),L=e.getActiveCubeFace(),P=e.getActiveMipmapLevel(),N=e.state;N.setBlending(wr),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let V=f!==this.type;V&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(F=>F.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,F=A.length;D<F;D++){let Y=A[D],G=Y.shadow;if(G===void 0){ze("WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);let re=G.getFrameExtents();a.multiply(re),n.copy(G.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(n.x=Math.floor(u/re.x),a.x=n.x*re.x,G.mapSize.x=n.x),a.y>u&&(n.y=Math.floor(u/re.y),a.y=n.y*re.y,G.mapSize.y=n.y));let j=e.state.buffers.depth.getReversed();if(G.camera._reversedDepth=j,G.map===null||V===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===rs){if(Y.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new gi(a.x,a.y,{format:Aa,type:ar,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),G.map.texture.name=Y.name+".shadowMap",G.map.depthTexture=new Ra(a.x,a.y,Bi),G.map.depthTexture.name=Y.name+".shadowMapDepth",G.map.depthTexture.format=Tr,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=It,G.map.depthTexture.magFilter=It}else Y.isPointLight?(G.map=new a0(a.x),G.map.depthTexture=new __(a.x,rr)):(G.map=new gi(a.x,a.y),G.map.depthTexture=new Ra(a.x,a.y,rr)),G.map.depthTexture.name=Y.name+".shadowMap",G.map.depthTexture.format=Tr,this.type===Lo?(G.map.depthTexture.compareFunction=j?Du:Iu,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=It,G.map.depthTexture.magFilter=It);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==a.x||G.map.height!==a.y)&&G.map.setSize(a.x,a.y);let Z=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Y.isPointLight!==!0&&G.updateMatrices(Y,_);for(let J=0;J<Z;J++){let Ue=G.getCamera(J);if(Y.isPointLight){let we=G.camera,tt=G.matrix,Ve=Y.distance||we.far;Ve!==we.far&&(we.far=Ve,we.updateProjectionMatrix()),ts.setFromMatrixPosition(Y.matrixWorld),we.position.copy(ts),Ch.copy(we.position),Ch.add(f2[J]),we.up.copy(m2[J]),we.lookAt(Ch),we.updateMatrixWorld(),tt.makeTranslation(-ts.x,-ts.y,-ts.z),Rp.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Rp,we.coordinateSystem,we.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)e.setRenderTarget(G.map,J),e.clear();else{J===0&&(e.setRenderTarget(G.map),e.clear());let we=G.getViewport(J);s.set(n.x*we.x,n.y*we.y,n.x*we.z,n.y*we.w),N.viewport(s)}r=G.getFrustum(J),y(C,_,Ue,Y,this.type)}G.isPointLightShadow!==!0&&this.type===rs&&x(G,_),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(S,L,P)};function x(A,C){let _=t.update(v);c.defines.VSM_SAMPLES!==A.blurSamples&&(c.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,c.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new gi(a.x,a.y,{format:Aa,type:ar}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),c.uniforms.shadow_pass.value=A.map.depthTexture,c.uniforms.resolution.value.set(A.map.width,A.map.height),c.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(C,null,_,c,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(C,null,_,p,v,null)}function E(A,C,_,S){let L=null,P=_.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)L=P;else if(L=_.isPointLight===!0?l:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let N=L.uuid,V=C.uuid,D=h[N];D===void 0&&(D={},h[N]=D);let F=D[V];F===void 0&&(F=L.clone(),D[V]=F,C.addEventListener("dispose",w)),L=F}if(L.visible=C.visible,L.wireframe=C.wireframe,S===rs?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:d[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let N=e.properties.get(L);N.light=_}return L}function y(A,C,_,S,L){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===rs)&&(!A.frustumCulled||A.intersectsFrustum(r))){A.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,A.matrixWorld);let N=t.update(A),V=A.material;if(Array.isArray(V)){let D=N.groups;for(let F=0,Y=D.length;F<Y;F++){let G=D[F],re=V[G.materialIndex];if(re&&re.visible){let j=E(A,re,S,L);A.onBeforeShadow(e,A,C,_,N,j,G),e.renderBufferDirect(_,null,N,j,A,G),A.onAfterShadow(e,A,C,_,N,j,G)}}}else if(V.visible){let D=E(A,V,S,L);A.onBeforeShadow(e,A,C,_,N,D,null),e.renderBufferDirect(_,null,N,D,A,null),A.onAfterShadow(e,A,C,_,N,D,null)}}let P=A.children;for(let N=0,V=P.length;N<V;N++)y(P[N],C,_,S,L)}function w(A){A.target.removeEventListener("dispose",w);for(let C in h){let _=h[C],S=A.target.uuid;S in _&&(_[S].dispose(),delete _[S])}}}function v2(e,t){function i(){let O=!1,$=new At,ae=null,be=new At(0,0,0,0);return{setMask:function(Re){ae!==Re&&!O&&(e.colorMask(Re,Re,Re,Re),ae=Re)},setLocked:function(Re){O=Re},setClear:function(Re,se,ye,Fe,Nt){Nt===!0&&(Re*=Fe,se*=Fe,ye*=Fe),$.set(Re,se,ye,Fe),be.equals($)===!1&&(e.clearColor(Re,se,ye,Fe),be.copy($))},reset:function(){O=!1,ae=null,be.set(-1,0,0,0)}}}function r(){let O=!1,$=!1,ae=null,be=null,Re=null;return{setReversed:function(se){if($!==se){let ye=t.get("EXT_clip_control");se?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),$=se;let Fe=Re;Re=null,this.setClear(Fe)}},getReversed:function(){return $},setTest:function(se){se?le(e.DEPTH_TEST):Pe(e.DEPTH_TEST)},setMask:function(se){ae!==se&&!O&&(e.depthMask(se),ae=se)},setFunc:function(se){if($&&(se=Nv[se]),be!==se){switch(se){case Ph:e.depthFunc(e.NEVER);break;case Lh:e.depthFunc(e.ALWAYS);break;case Ih:e.depthFunc(e.LESS);break;case cs:e.depthFunc(e.LEQUAL);break;case Dh:e.depthFunc(e.EQUAL);break;case Nh:e.depthFunc(e.GEQUAL);break;case Uh:e.depthFunc(e.GREATER);break;case kh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}be=se}},setLocked:function(se){O=se},setClear:function(se){Re!==se&&(Re=se,$&&(se=1-se),e.clearDepth(se))},reset:function(){O=!1,ae=null,be=null,Re=null,$=!1}}}function a(){let O=!1,$=null,ae=null,be=null,Re=null,se=null,ye=null,Fe=null,Nt=null;return{setTest:function(ct){O||(ct?le(e.STENCIL_TEST):Pe(e.STENCIL_TEST))},setMask:function(ct){$!==ct&&!O&&(e.stencilMask(ct),$=ct)},setFunc:function(ct,qi,pr){(ae!==ct||be!==qi||Re!==pr)&&(e.stencilFunc(ct,qi,pr),ae=ct,be=qi,Re=pr)},setOp:function(ct,qi,pr){(se!==ct||ye!==qi||Fe!==pr)&&(e.stencilOp(ct,qi,pr),se=ct,ye=qi,Fe=pr)},setLocked:function(ct){O=ct},setClear:function(ct){Nt!==ct&&(e.clearStencil(ct),Nt=ct)},reset:function(){O=!1,$=null,ae=null,be=null,Re=null,se=null,ye=null,Fe=null,Nt=null}}}let n=new i,s=new r,o=new a,l=new WeakMap,h=new WeakMap,u={},d={},c={},p=new WeakMap,g=[],v=null,m=!1,f=null,x=null,E=null,y=null,w=null,A=null,C=null,_=new Be(0,0,0),S=0,L=!1,P=null,N=null,V=null,D=null,F=null,Y=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,re=0,j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(j)[1]),G=re>=1):j.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),G=re>=2);let Z=null,J={},Ue=e.getParameter(e.SCISSOR_BOX),we=e.getParameter(e.VIEWPORT),tt=new At().fromArray(Ue),Ve=new At().fromArray(we);function q(O,$,ae,be){let Re=new Uint8Array(4),se=e.createTexture();e.bindTexture(O,se),e.texParameteri(O,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(O,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ye=0;ye<ae;ye++)O===e.TEXTURE_3D||O===e.TEXTURE_2D_ARRAY?e.texImage3D($,0,e.RGBA,1,1,be,0,e.RGBA,e.UNSIGNED_BYTE,Re):e.texImage2D($+ye,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Re);return se}let ie={};ie[e.TEXTURE_2D]=q(e.TEXTURE_2D,e.TEXTURE_2D,1),ie[e.TEXTURE_CUBE_MAP]=q(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[e.TEXTURE_2D_ARRAY]=q(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ie[e.TEXTURE_3D]=q(e.TEXTURE_3D,e.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),o.setClear(0),le(e.DEPTH_TEST),s.setFunc(cs),Se(!1),Ae(yd),le(e.CULL_FACE),ue(wr);function le(O){u[O]!==!0&&(e.enable(O),u[O]=!0)}function Pe(O){u[O]!==!1&&(e.disable(O),u[O]=!1)}function ke(O,$){return c[O]!==$?(e.bindFramebuffer(O,$),c[O]=$,O===e.DRAW_FRAMEBUFFER&&(c[e.FRAMEBUFFER]=$),O===e.FRAMEBUFFER&&(c[e.DRAW_FRAMEBUFFER]=$),!0):!1}function fe(O,$){let ae=g,be=!1;if(O){ae=p.get($),ae===void 0&&(ae=[],p.set($,ae));let Re=O.textures;if(ae.length!==Re.length||ae[0]!==e.COLOR_ATTACHMENT0){for(let se=0,ye=Re.length;se<ye;se++)ae[se]=e.COLOR_ATTACHMENT0+se;ae.length=Re.length,be=!0}}else ae[0]!==e.BACK&&(ae[0]=e.BACK,be=!0);be&&e.drawBuffers(ae)}function et(O){return v!==O?(e.useProgram(O),v=O,!0):!1}let te={[dn]:e.FUNC_ADD,[iv]:e.FUNC_SUBTRACT,[rv]:e.FUNC_REVERSE_SUBTRACT};te[av]=e.MIN,te[nv]=e.MAX;let ee={[bu]:e.ZERO,[sv]:e.ONE,[ov]:e.SRC_COLOR,[Fp]:e.SRC_ALPHA,[dv]:e.SRC_ALPHA_SATURATE,[Mu]:e.DST_COLOR,[hv]:e.DST_ALPHA,[lv]:e.ONE_MINUS_SRC_COLOR,[Bp]:e.ONE_MINUS_SRC_ALPHA,[cv]:e.ONE_MINUS_DST_COLOR,[uv]:e.ONE_MINUS_DST_ALPHA,[pv]:e.CONSTANT_COLOR,[fv]:e.ONE_MINUS_CONSTANT_COLOR,[mv]:e.CONSTANT_ALPHA,[gv]:e.ONE_MINUS_CONSTANT_ALPHA};function ue(O,$,ae,be,Re,se,ye,Fe,Nt,ct){if(O===wr){m===!0&&(Pe(e.BLEND),m=!1);return}if(m===!1&&(le(e.BLEND),m=!0),O!==Su){if(O!==f||ct!==L){if((x!==dn||w!==dn)&&(e.blendEquation(e.FUNC_ADD),x=dn,w=dn),ct)switch(O){case ss:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case xd:e.blendFunc(e.ONE,e.ONE);break;case Sd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case bd:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:He("WebGLState: Invalid blending: ",O);break}else switch(O){case ss:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case xd:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Sd:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bd:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",O);break}E=null,y=null,A=null,C=null,_.set(0,0,0),S=0,f=O,L=ct}return}Re=Re||$,se=se||ae,ye=ye||be,($!==x||Re!==w)&&(e.blendEquationSeparate(te[$],te[Re]),x=$,w=Re),(ae!==E||be!==y||se!==A||ye!==C)&&(e.blendFuncSeparate(ee[ae],ee[be],ee[se],ee[ye]),E=ae,y=be,A=se,C=ye),(Fe.equals(_)===!1||Nt!==S)&&(e.blendColor(Fe.r,Fe.g,Fe.b,Nt),_.copy(Fe),S=Nt),f=O,L=!1}function xe(O,$){O.side===mi?Pe(e.CULL_FACE):le(e.CULL_FACE);let ae=O.side===li;$&&(ae=!ae),Se(ae),O.blending===ss&&O.transparent===!1?ue(wr):ue(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),n.setMask(O.colorWrite);let be=O.stencilWrite;o.setTest(be),be&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ye(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):Pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function Se(O){P!==O&&(O?e.frontFace(e.CW):e.frontFace(e.CCW),P=O)}function Ae(O){O!==Q1?(le(e.CULL_FACE),O!==N&&(O===yd?e.cullFace(e.BACK):O===ev?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Pe(e.CULL_FACE),N=O}function Ne(O){O!==V&&(G&&e.lineWidth(O),V=O)}function Ye(O,$,ae){O?(le(e.POLYGON_OFFSET_FILL),(D!==$||F!==ae)&&(D=$,F=ae,s.getReversed()&&($=-$),e.polygonOffset($,ae))):Pe(e.POLYGON_OFFSET_FILL)}function Ke(O){O?le(e.SCISSOR_TEST):Pe(e.SCISSOR_TEST)}function I(O){O===void 0&&(O=e.TEXTURE0+Y-1),Z!==O&&(e.activeTexture(O),Z=O)}function vt(O,$,ae){ae===void 0&&(Z===null?ae=e.TEXTURE0+Y-1:ae=Z);let be=J[ae];be===void 0&&(be={type:void 0,texture:void 0},J[ae]=be),(be.type!==O||be.texture!==$)&&(Z!==ae&&(e.activeTexture(ae),Z=ae),e.bindTexture(O,$||ie[O]),be.type=O,be.texture=$)}function nt(){let O=J[Z];O!==void 0&&O.type!==void 0&&(e.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function it(){try{e.compressedTexImage2D(...arguments)}catch(O){He("WebGLState:",O)}}function T(){try{e.compressedTexImage3D(...arguments)}catch(O){He("WebGLState:",O)}}function b(){try{e.texSubImage2D(...arguments)}catch(O){He("WebGLState:",O)}}function U(){try{e.texSubImage3D(...arguments)}catch(O){He("WebGLState:",O)}}function W(){try{e.compressedTexSubImage2D(...arguments)}catch(O){He("WebGLState:",O)}}function Q(){try{e.compressedTexSubImage3D(...arguments)}catch(O){He("WebGLState:",O)}}function pe(){try{e.texStorage2D(...arguments)}catch(O){He("WebGLState:",O)}}function me(){try{e.texStorage3D(...arguments)}catch(O){He("WebGLState:",O)}}function z(){try{e.texImage2D(...arguments)}catch(O){He("WebGLState:",O)}}function ce(){try{e.texImage3D(...arguments)}catch(O){He("WebGLState:",O)}}function ve(O){return d[O]!==void 0?d[O]:e.getParameter(O)}function Te(O,$){d[O]!==$&&(e.pixelStorei(O,$),d[O]=$)}function oe(O){tt.equals(O)===!1&&(e.scissor(O.x,O.y,O.z,O.w),tt.copy(O))}function Ie(O){Ve.equals(O)===!1&&(e.viewport(O.x,O.y,O.z,O.w),Ve.copy(O))}function De(O,$){let ae=h.get($);ae===void 0&&(ae=new WeakMap,h.set($,ae));let be=ae.get(O);be===void 0&&(be=e.getUniformBlockIndex($,O.name),ae.set(O,be))}function je(O,$){let ae=h.get($).get(O);l.get($)!==ae&&(e.uniformBlockBinding($,ae,O.__bindingPointIndex),l.set($,ae))}function ut(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),s.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},Z=null,J={},c={},p=new WeakMap,g=[],v=null,m=!1,f=null,x=null,E=null,y=null,w=null,A=null,C=null,_=new Be(0,0,0),S=0,L=!1,P=null,N=null,V=null,D=null,F=null,tt.set(0,0,e.canvas.width,e.canvas.height),Ve.set(0,0,e.canvas.width,e.canvas.height),n.reset(),s.reset(),o.reset()}return{buffers:{color:n,depth:s,stencil:o},enable:le,disable:Pe,bindFramebuffer:ke,drawBuffers:fe,useProgram:et,setBlending:ue,setMaterial:xe,setFlipSided:Se,setCullFace:Ae,setLineWidth:Ne,setPolygonOffset:Ye,setScissorTest:Ke,activeTexture:I,bindTexture:vt,unbindTexture:nt,compressedTexImage2D:it,compressedTexImage3D:T,texImage2D:z,texImage3D:ce,pixelStorei:Te,getParameter:ve,updateUBOMapping:De,uniformBlockBinding:je,texStorage2D:pe,texStorage3D:me,texSubImage2D:b,texSubImage3D:U,compressedTexSubImage2D:W,compressedTexSubImage3D:Q,scissor:oe,viewport:Ie,reset:ut}}function _2(e,t,i,r,a,n,s){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new K,u=new WeakMap,d=new Set,c,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,b){return g?new OffscreenCanvas(T,b):Wo("canvas")}function m(T,b,U){let W=1,Q=it(T);if((Q.width>U||Q.height>U)&&(W=U/Math.max(Q.width,Q.height)),W<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let pe=Math.floor(W*Q.width),me=Math.floor(W*Q.height);c===void 0&&(c=v(pe,me));let z=b?v(pe,me):c;return z.width=pe,z.height=me,z.getContext("2d").drawImage(T,0,0,pe,me),ze("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+pe+"x"+me+")."),z}else return"data"in T&&ze("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function f(T){return T.generateMipmaps}function x(T){e.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(T,b,U,W,Q,pe=!1){if(T!==null){if(e[T]!==void 0)return e[T];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let me;W&&(me=t.get("EXT_texture_norm16"),me||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let z=b;if(b===e.RED&&(U===e.FLOAT&&(z=e.R32F),U===e.HALF_FLOAT&&(z=e.R16F),U===e.UNSIGNED_BYTE&&(z=e.R8),U===e.UNSIGNED_SHORT&&me&&(z=me.R16_EXT),U===e.SHORT&&me&&(z=me.R16_SNORM_EXT)),b===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(z=e.R8UI),U===e.UNSIGNED_SHORT&&(z=e.R16UI),U===e.UNSIGNED_INT&&(z=e.R32UI),U===e.BYTE&&(z=e.R8I),U===e.SHORT&&(z=e.R16I),U===e.INT&&(z=e.R32I)),b===e.RG&&(U===e.FLOAT&&(z=e.RG32F),U===e.HALF_FLOAT&&(z=e.RG16F),U===e.UNSIGNED_BYTE&&(z=e.RG8),U===e.UNSIGNED_SHORT&&me&&(z=me.RG16_EXT),U===e.SHORT&&me&&(z=me.RG16_SNORM_EXT)),b===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(z=e.RG8UI),U===e.UNSIGNED_SHORT&&(z=e.RG16UI),U===e.UNSIGNED_INT&&(z=e.RG32UI),U===e.BYTE&&(z=e.RG8I),U===e.SHORT&&(z=e.RG16I),U===e.INT&&(z=e.RG32I)),b===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(z=e.RGB8UI),U===e.UNSIGNED_SHORT&&(z=e.RGB16UI),U===e.UNSIGNED_INT&&(z=e.RGB32UI),U===e.BYTE&&(z=e.RGB8I),U===e.SHORT&&(z=e.RGB16I),U===e.INT&&(z=e.RGB32I)),b===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(z=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(z=e.RGBA16UI),U===e.UNSIGNED_INT&&(z=e.RGBA32UI),U===e.BYTE&&(z=e.RGBA8I),U===e.SHORT&&(z=e.RGBA16I),U===e.INT&&(z=e.RGBA32I)),b===e.RGB&&(U===e.UNSIGNED_SHORT&&me&&(z=me.RGB16_EXT),U===e.SHORT&&me&&(z=me.RGB16_SNORM_EXT),U===e.UNSIGNED_INT_5_9_9_9_REV&&(z=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(z=e.R11F_G11F_B10F)),b===e.RGBA){let ce=pe?Vo:st.getTransfer(Q);U===e.FLOAT&&(z=e.RGBA32F),U===e.HALF_FLOAT&&(z=e.RGBA16F),U===e.UNSIGNED_BYTE&&(z=ce===dt?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT&&me&&(z=me.RGBA16_EXT),U===e.SHORT&&me&&(z=me.RGBA16_SNORM_EXT),U===e.UNSIGNED_SHORT_4_4_4_4&&(z=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(z=e.RGB5_A1)}return(z===e.R16F||z===e.R32F||z===e.RG16F||z===e.RG32F||z===e.RGBA16F||z===e.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function w(T,b){let U;return T?b===null||b===rr||b===fs?U=e.DEPTH24_STENCIL8:b===Bi?U=e.DEPTH32F_STENCIL8:b===ps&&(U=e.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===rr||b===fs?U=e.DEPTH_COMPONENT24:b===Bi?U=e.DEPTH_COMPONENT32F:b===ps&&(U=e.DEPTH_COMPONENT16),U}function A(T,b){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==It&&T.minFilter!==Rt?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function C(T){let b=T.target;b.removeEventListener("dispose",C),S(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&d.delete(b)}function _(T){let b=T.target;b.removeEventListener("dispose",_),P(b)}function S(T){let b=r.get(T);if(b.__webglInit===void 0)return;let U=T.source,W=p.get(U);if(W){let Q=W[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(T),Object.keys(W).length===0&&p.delete(U)}r.remove(T)}function L(T){let b=r.get(T);e.deleteTexture(b.__webglTexture);let U=T.source,W=p.get(U);delete W[b.__cacheKey],s.memory.textures--}function P(T){let b=r.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),r.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(b.__webglFramebuffer[W]))for(let Q=0;Q<b.__webglFramebuffer[W].length;Q++)e.deleteFramebuffer(b.__webglFramebuffer[W][Q]);else e.deleteFramebuffer(b.__webglFramebuffer[W]);b.__webglDepthbuffer&&e.deleteRenderbuffer(b.__webglDepthbuffer[W])}else{if(Array.isArray(b.__webglFramebuffer))for(let W=0;W<b.__webglFramebuffer.length;W++)e.deleteFramebuffer(b.__webglFramebuffer[W]);else e.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&e.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&e.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let W=0;W<b.__webglColorRenderbuffer.length;W++)b.__webglColorRenderbuffer[W]&&e.deleteRenderbuffer(b.__webglColorRenderbuffer[W]);b.__webglDepthRenderbuffer&&e.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let U=T.textures;for(let W=0,Q=U.length;W<Q;W++){let pe=r.get(U[W]);pe.__webglTexture&&(e.deleteTexture(pe.__webglTexture),s.memory.textures--),r.remove(U[W])}r.remove(T)}let N=0;function V(){N=0}function D(){return N}function F(T){N=T}function Y(){let T=N;return T>=a.maxTextures&&ze("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+a.maxTextures),N+=1,T}function G(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function re(T,b){let U=r.get(T);if(T.isVideoTexture&&vt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&U.__version!==T.version){let W=T.image;if(W===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(U,T,b);return}}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+b)}function j(T,b){let U=r.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){Pe(U,T,b);return}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);i.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+b)}function Z(T,b){let U=r.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){Pe(U,T,b);return}i.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+b)}function J(T,b){let U=r.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&U.__version!==T.version){ke(U,T,b);return}i.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+b)}let Ue={[ds]:e.REPEAT,[Qi]:e.CLAMP_TO_EDGE,[Oh]:e.MIRRORED_REPEAT},we={[It]:e.NEAREST,[yv]:e.NEAREST_MIPMAP_NEAREST,[no]:e.NEAREST_MIPMAP_LINEAR,[Rt]:e.LINEAR,[Kl]:e.LINEAR_MIPMAP_NEAREST,[Mr]:e.LINEAR_MIPMAP_LINEAR},tt={[Mv]:e.NEVER,[Rv]:e.ALWAYS,[wv]:e.LESS,[Iu]:e.LEQUAL,[Ev]:e.EQUAL,[Du]:e.GEQUAL,[Tv]:e.GREATER,[Av]:e.NOTEQUAL};function Ve(T,b){if(b.type===Bi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Rt||b.magFilter===Kl||b.magFilter===no||b.magFilter===Mr||b.minFilter===Rt||b.minFilter===Kl||b.minFilter===no||b.minFilter===Mr)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,Ue[b.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,Ue[b.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,Ue[b.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,we[b.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,we[b.minFilter]),b.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,tt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===It||b.minFilter!==no&&b.minFilter!==Mr||b.type===Bi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||r.get(b).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,a.getMaxAnisotropy())),r.get(b).__currentAnisotropy=b.anisotropy}}}function q(T,b){let U=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",C));let W=b.source,Q=p.get(W);Q===void 0&&(Q={},p.set(W,Q));let pe=G(b);if(pe!==T.__cacheKey){Q[pe]===void 0&&(Q[pe]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,U=!0),Q[pe].usedTimes++;let me=Q[T.__cacheKey];me!==void 0&&(Q[T.__cacheKey].usedTimes--,me.usedTimes===0&&L(b)),T.__cacheKey=pe,T.__webglTexture=Q[pe].texture}return U}function ie(T,b,U){return Math.floor(Math.floor(T/U)/b)}function le(T,b,U,W){let Q=T.updateRanges;if(Q.length===0)i.texSubImage2D(e.TEXTURE_2D,0,0,0,b.width,b.height,U,W,b.data);else{Q.sort((ve,Te)=>ve.start-Te.start);let pe=0;for(let ve=1;ve<Q.length;ve++){let Te=Q[pe],oe=Q[ve],Ie=Te.start+Te.count,De=ie(oe.start,b.width,4),je=ie(Te.start,b.width,4);oe.start<=Ie+1&&De===je&&ie(oe.start+oe.count-1,b.width,4)===De?Te.count=Math.max(Te.count,oe.start+oe.count-Te.start):(++pe,Q[pe]=oe)}Q.length=pe+1;let me=i.getParameter(e.UNPACK_ROW_LENGTH),z=i.getParameter(e.UNPACK_SKIP_PIXELS),ce=i.getParameter(e.UNPACK_SKIP_ROWS);i.pixelStorei(e.UNPACK_ROW_LENGTH,b.width);for(let ve=0,Te=Q.length;ve<Te;ve++){let oe=Q[ve],Ie=Math.floor(oe.start/4),De=Math.ceil(oe.count/4),je=Ie%b.width,ut=Math.floor(Ie/b.width),O=De;i.pixelStorei(e.UNPACK_SKIP_PIXELS,je),i.pixelStorei(e.UNPACK_SKIP_ROWS,ut),i.texSubImage2D(e.TEXTURE_2D,0,je,ut,O,1,U,W,b.data)}T.clearUpdateRanges(),i.pixelStorei(e.UNPACK_ROW_LENGTH,me),i.pixelStorei(e.UNPACK_SKIP_PIXELS,z),i.pixelStorei(e.UNPACK_SKIP_ROWS,ce)}}function Pe(T,b,U){let W=e.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(W=e.TEXTURE_2D_ARRAY),b.isData3DTexture&&(W=e.TEXTURE_3D);let Q=q(T,b),pe=b.source;i.bindTexture(W,T.__webglTexture,e.TEXTURE0+U);let me=r.get(pe);if(pe.version!==me.__version||Q===!0){if(i.activeTexture(e.TEXTURE0+U),!(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)){let $=st.getPrimaries(st.workingColorSpace),ae=b.colorSpace===$r?null:st.getPrimaries(b.colorSpace),be=b.colorSpace===$r||$===ae?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}i.pixelStorei(e.UNPACK_ALIGNMENT,b.unpackAlignment);let z=m(b.image,!1,a.maxTextureSize);z=nt(b,z);let ce=n.convert(b.format,b.colorSpace),ve=n.convert(b.type),Te=y(b.internalFormat,ce,ve,b.normalized,b.colorSpace,b.isVideoTexture);Ve(W,b);let oe,Ie=b.mipmaps,De=b.isVideoTexture!==!0,je=me.__version===void 0||Q===!0,ut=pe.dataReady,O=A(b,z);if(b.isDepthTexture)Te=w(b.format===Ma,b.type),je&&(De?i.texStorage2D(e.TEXTURE_2D,1,Te,z.width,z.height):i.texImage2D(e.TEXTURE_2D,0,Te,z.width,z.height,0,ce,ve,null));else if(b.isDataTexture)if(Ie.length>0){De&&je&&i.texStorage2D(e.TEXTURE_2D,O,Te,Ie[0].width,Ie[0].height);for(let $=0,ae=Ie.length;$<ae;$++)oe=Ie[$],De?ut&&i.texSubImage2D(e.TEXTURE_2D,$,0,0,oe.width,oe.height,ce,ve,oe.data):i.texImage2D(e.TEXTURE_2D,$,Te,oe.width,oe.height,0,ce,ve,oe.data);b.generateMipmaps=!1}else De?(je&&i.texStorage2D(e.TEXTURE_2D,O,Te,z.width,z.height),ut&&le(b,z,ce,ve)):i.texImage2D(e.TEXTURE_2D,0,Te,z.width,z.height,0,ce,ve,z.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){De&&je&&i.texStorage3D(e.TEXTURE_2D_ARRAY,O,Te,Ie[0].width,Ie[0].height,z.depth);for(let $=0,ae=Ie.length;$<ae;$++)if(oe=Ie[$],b.format!==Jt)if(ce!==null)if(De){if(ut)if(b.layerUpdates.size>0){let be=sp(oe.width,oe.height,b.format,b.type);for(let Re of b.layerUpdates){let se=oe.data.subarray(Re*be/oe.data.BYTES_PER_ELEMENT,(Re+1)*be/oe.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,Re,oe.width,oe.height,1,ce,se)}}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,z.depth,ce,oe.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,Te,oe.width,oe.height,z.depth,0,oe.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?ut&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,z.depth,ce,ve,oe.data):i.texImage3D(e.TEXTURE_2D_ARRAY,$,Te,oe.width,oe.height,z.depth,0,ce,ve,oe.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{De&&je&&i.texStorage2D(e.TEXTURE_2D,O,Te,Ie[0].width,Ie[0].height);for(let $=0,ae=Ie.length;$<ae;$++)oe=Ie[$],b.format!==Jt?ce!==null?De?ut&&i.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,oe.width,oe.height,ce,oe.data):i.compressedTexImage2D(e.TEXTURE_2D,$,Te,oe.width,oe.height,0,oe.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?ut&&i.texSubImage2D(e.TEXTURE_2D,$,0,0,oe.width,oe.height,ce,ve,oe.data):i.texImage2D(e.TEXTURE_2D,$,Te,oe.width,oe.height,0,ce,ve,oe.data)}else if(b.isDataArrayTexture)if(De){if(je&&i.texStorage3D(e.TEXTURE_2D_ARRAY,O,Te,z.width,z.height,z.depth),ut)if(b.layerUpdates.size>0){let $=sp(z.width,z.height,b.format,b.type);for(let ae of b.layerUpdates){let be=z.data.subarray(ae*$/z.data.BYTES_PER_ELEMENT,(ae+1)*$/z.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ae,z.width,z.height,1,ce,ve,be)}b.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,z.width,z.height,z.depth,ce,ve,z.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,Te,z.width,z.height,z.depth,0,ce,ve,z.data);else if(b.isData3DTexture)De?(je&&i.texStorage3D(e.TEXTURE_3D,O,Te,z.width,z.height,z.depth),ut&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,z.width,z.height,z.depth,ce,ve,z.data)):i.texImage3D(e.TEXTURE_3D,0,Te,z.width,z.height,z.depth,0,ce,ve,z.data);else if(b.isFramebufferTexture){if(je)if(De)i.texStorage2D(e.TEXTURE_2D,O,Te,z.width,z.height);else{let $=z.width,ae=z.height;for(let be=0;be<O;be++)i.texImage2D(e.TEXTURE_2D,be,Te,$,ae,0,ce,ve,null),$>>=1,ae>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in e){let $=e.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),z.parentNode!==$){$.appendChild(z),d.add(b),$.onpaint=ae=>{let be=ae.changedElements;for(let Re of d)be.includes(Re.image)&&(Re.needsUpdate=!0)},$.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,z);else{let ae=e.RGBA,be=e.RGBA,Re=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,ae,be,Re,z)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(De&&je){let $=it(Ie[0]);i.texStorage2D(e.TEXTURE_2D,O,Te,$.width,$.height)}for(let $=0,ae=Ie.length;$<ae;$++)oe=Ie[$],De?ut&&i.texSubImage2D(e.TEXTURE_2D,$,0,0,ce,ve,oe):i.texImage2D(e.TEXTURE_2D,$,Te,ce,ve,oe);b.generateMipmaps=!1}else if(De){if(je){let $=it(z);i.texStorage2D(e.TEXTURE_2D,O,Te,$.width,$.height)}ut&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,ce,ve,z)}else i.texImage2D(e.TEXTURE_2D,0,Te,ce,ve,z);f(b)&&x(W),me.__version=pe.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function ke(T,b,U){if(b.image.length!==6)return;let W=q(T,b),Q=b.source;i.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+U);let pe=r.get(Q);if(Q.version!==pe.__version||W===!0){i.activeTexture(e.TEXTURE0+U);let me=st.getPrimaries(st.workingColorSpace),z=b.colorSpace===$r?null:st.getPrimaries(b.colorSpace),ce=b.colorSpace===$r||me===z?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(e.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let ve=b.isCompressedTexture||b.image[0].isCompressedTexture,Te=b.image[0]&&b.image[0].isDataTexture,oe=[];for(let se=0;se<6;se++)!ve&&!Te?oe[se]=m(b.image[se],!0,a.maxCubemapSize):oe[se]=Te?b.image[se].image:b.image[se],oe[se]=nt(b,oe[se]);let Ie=oe[0],De=n.convert(b.format,b.colorSpace),je=n.convert(b.type),ut=y(b.internalFormat,De,je,b.normalized,b.colorSpace),O=b.isVideoTexture!==!0,$=pe.__version===void 0||W===!0,ae=Q.dataReady,be=A(b,Ie);Ve(e.TEXTURE_CUBE_MAP,b);let Re;if(ve){O&&$&&i.texStorage2D(e.TEXTURE_CUBE_MAP,be,ut,Ie.width,Ie.height);for(let se=0;se<6;se++){Re=oe[se].mipmaps;for(let ye=0;ye<Re.length;ye++){let Fe=Re[ye];b.format!==Jt?De!==null?O?ae&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,0,0,Fe.width,Fe.height,De,Fe.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,ut,Fe.width,Fe.height,0,Fe.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ae&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,0,0,Fe.width,Fe.height,De,je,Fe.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,ut,Fe.width,Fe.height,0,De,je,Fe.data)}}}else{if(Re=b.mipmaps,O&&$){Re.length>0&&be++;let se=it(oe[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,be,ut,se.width,se.height)}for(let se=0;se<6;se++)if(Te){O?ae&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,oe[se].width,oe[se].height,De,je,oe[se].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ut,oe[se].width,oe[se].height,0,De,je,oe[se].data);for(let ye=0;ye<Re.length;ye++){let Fe=Re[ye].image[se].image;O?ae&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,0,0,Fe.width,Fe.height,De,je,Fe.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,ut,Fe.width,Fe.height,0,De,je,Fe.data)}}else{O?ae&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De,je,oe[se]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ut,De,je,oe[se]);for(let ye=0;ye<Re.length;ye++){let Fe=Re[ye];O?ae&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,0,0,De,je,Fe.image[se]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,ut,De,je,Fe.image[se])}}}f(b)&&x(e.TEXTURE_CUBE_MAP),pe.__version=Q.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function fe(T,b,U,W,Q,pe){let me=n.convert(U.format,U.colorSpace),z=n.convert(U.type),ce=y(U.internalFormat,me,z,U.normalized,U.colorSpace),ve=r.get(b),Te=r.get(U);if(Te.__renderTarget=b,!ve.__hasExternalTextures){let oe=Math.max(1,b.width>>pe),Ie=Math.max(1,b.height>>pe);Q===e.TEXTURE_3D||Q===e.TEXTURE_2D_ARRAY?i.texImage3D(Q,pe,ce,oe,Ie,b.depth,0,me,z,null):i.texImage2D(Q,pe,ce,oe,Ie,0,me,z,null)}i.bindFramebuffer(e.FRAMEBUFFER,T),I(b)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,W,Q,Te.__webglTexture,0,Ke(b)):(Q===e.TEXTURE_2D||Q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,W,Q,Te.__webglTexture,pe),i.bindFramebuffer(e.FRAMEBUFFER,null)}function et(T,b,U){if(e.bindRenderbuffer(e.RENDERBUFFER,T),b.depthBuffer){let W=b.depthTexture,Q=W&&W.isDepthTexture?W.type:null,pe=w(b.stencilBuffer,Q),me=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;I(b)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ke(b),pe,b.width,b.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ke(b),pe,b.width,b.height):e.renderbufferStorage(e.RENDERBUFFER,pe,b.width,b.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,me,e.RENDERBUFFER,T)}else{let W=b.textures;for(let Q=0;Q<W.length;Q++){let pe=W[Q],me=n.convert(pe.format,pe.colorSpace),z=n.convert(pe.type),ce=y(pe.internalFormat,me,z,pe.normalized,pe.colorSpace);I(b)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ke(b),ce,b.width,b.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ke(b),ce,b.width,b.height):e.renderbufferStorage(e.RENDERBUFFER,ce,b.width,b.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function te(T,b,U){let W=b.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(e.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=r.get(b.depthTexture);if(Q.__renderTarget=b,(!Q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,b.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),Ve(e.TEXTURE_CUBE_MAP,b.depthTexture);let ve=n.convert(b.depthTexture.format),Te=n.convert(b.depthTexture.type),oe;b.depthTexture.format===Tr?oe=e.DEPTH_COMPONENT24:b.depthTexture.format===Ma&&(oe=e.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,oe,b.width,b.height,0,ve,Te,null)}}else re(b.depthTexture,0);let pe=Q.__webglTexture,me=Ke(b),z=W?e.TEXTURE_CUBE_MAP_POSITIVE_X+U:e.TEXTURE_2D,ce=b.depthTexture.format===Ma?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(b.depthTexture.format===Tr)I(b)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,ce,z,pe,0,me):e.framebufferTexture2D(e.FRAMEBUFFER,ce,z,pe,0);else if(b.depthTexture.format===Ma)I(b)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,ce,z,pe,0,me):e.framebufferTexture2D(e.FRAMEBUFFER,ce,z,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(T){let b=r.get(T),U=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let W=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),W){let Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,W.removeEventListener("dispose",Q)};W.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=W}if(T.depthTexture&&!b.__autoAllocateDepthBuffer)if(U)for(let W=0;W<6;W++)te(b.__webglFramebuffer[W],T,W);else{let W=T.texture.mipmaps;W&&W.length>0?te(b.__webglFramebuffer[0],T,0):te(b.__webglFramebuffer,T,0)}else if(U){b.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(i.bindFramebuffer(e.FRAMEBUFFER,b.__webglFramebuffer[W]),b.__webglDepthbuffer[W]===void 0)b.__webglDepthbuffer[W]=e.createRenderbuffer(),et(b.__webglDepthbuffer[W],T,!1);else{let Q=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,pe=b.__webglDepthbuffer[W];e.bindRenderbuffer(e.RENDERBUFFER,pe),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,pe)}}else{let W=T.texture.mipmaps;if(W&&W.length>0?i.bindFramebuffer(e.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=e.createRenderbuffer(),et(b.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,pe=b.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,pe),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,pe)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}function ue(T,b,U){let W=r.get(T);b!==void 0&&fe(W.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&ee(T)}function xe(T){let b=T.texture,U=r.get(T),W=r.get(b);T.addEventListener("dispose",_);let Q=T.textures,pe=T.isWebGLCubeRenderTarget===!0,me=Q.length>1;if(me||(W.__webglTexture===void 0&&(W.__webglTexture=e.createTexture()),W.__version=b.version,s.memory.textures++),pe){U.__webglFramebuffer=[];for(let z=0;z<6;z++)if(b.mipmaps&&b.mipmaps.length>0){U.__webglFramebuffer[z]=[];for(let ce=0;ce<b.mipmaps.length;ce++)U.__webglFramebuffer[z][ce]=e.createFramebuffer()}else U.__webglFramebuffer[z]=e.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){U.__webglFramebuffer=[];for(let z=0;z<b.mipmaps.length;z++)U.__webglFramebuffer[z]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(me)for(let z=0,ce=Q.length;z<ce;z++){let ve=r.get(Q[z]);ve.__webglTexture===void 0&&(ve.__webglTexture=e.createTexture(),s.memory.textures++)}if(T.samples>0&&I(T)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let z=0;z<Q.length;z++){let ce=Q[z];U.__webglColorRenderbuffer[z]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[z]);let ve=n.convert(ce.format,ce.colorSpace),Te=n.convert(ce.type),oe=y(ce.internalFormat,ve,Te,ce.normalized,ce.colorSpace,T.isXRRenderTarget===!0),Ie=Ke(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ie,oe,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+z,e.RENDERBUFFER,U.__webglColorRenderbuffer[z])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),et(U.__webglDepthRenderbuffer,T,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(pe){i.bindTexture(e.TEXTURE_CUBE_MAP,W.__webglTexture),Ve(e.TEXTURE_CUBE_MAP,b);for(let z=0;z<6;z++)if(b.mipmaps&&b.mipmaps.length>0)for(let ce=0;ce<b.mipmaps.length;ce++)fe(U.__webglFramebuffer[z][ce],T,b,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+z,ce);else fe(U.__webglFramebuffer[z],T,b,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);f(b)&&x(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(me){for(let z=0,ce=Q.length;z<ce;z++){let ve=Q[z],Te=r.get(ve),oe=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(oe,Te.__webglTexture),Ve(oe,ve),fe(U.__webglFramebuffer,T,ve,e.COLOR_ATTACHMENT0+z,oe,0),f(ve)&&x(oe)}i.unbindTexture()}else{let z=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(z=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(z,W.__webglTexture),Ve(z,b),b.mipmaps&&b.mipmaps.length>0)for(let ce=0;ce<b.mipmaps.length;ce++)fe(U.__webglFramebuffer[ce],T,b,e.COLOR_ATTACHMENT0,z,ce);else fe(U.__webglFramebuffer,T,b,e.COLOR_ATTACHMENT0,z,0);f(b)&&x(z),i.unbindTexture()}T.depthBuffer&&ee(T)}function Se(T){let b=T.textures;for(let U=0,W=b.length;U<W;U++){let Q=b[U];if(f(Q)){let pe=E(T),me=r.get(Q).__webglTexture;i.bindTexture(pe,me),x(pe),i.unbindTexture()}}}let Ae=[],Ne=[];function Ye(T){if(T.samples>0){if(I(T)===!1){let b=T.textures,U=T.width,W=T.height,Q=e.COLOR_BUFFER_BIT,pe=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,me=r.get(T),z=b.length>1;if(z)for(let ve=0;ve<b.length;ve++)i.bindFramebuffer(e.FRAMEBUFFER,me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);let ce=T.texture.mipmaps;ce&&ce.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let ve=0;ve<b.length;ve++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=e.STENCIL_BUFFER_BIT)),z){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,me.__webglColorRenderbuffer[ve]);let Te=r.get(b[ve]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Te,0)}e.blitFramebuffer(0,0,U,W,0,0,U,W,Q,e.NEAREST),l===!0&&(Ae.length=0,Ne.length=0,Ae.push(e.COLOR_ATTACHMENT0+ve),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(Ae.push(pe),Ne.push(pe),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ne)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),z)for(let ve=0;ve<b.length;ve++){i.bindFramebuffer(e.FRAMEBUFFER,me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.RENDERBUFFER,me.__webglColorRenderbuffer[ve]);let Te=r.get(b[ve]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.TEXTURE_2D,Te,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let b=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[b])}}}function Ke(T){return Math.min(a.maxSamples,T.samples)}function I(T){let b=r.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function vt(T){let b=s.render.frame;u.get(T)!==b&&(u.set(T,b),T.update())}function nt(T,b){let U=T.colorSpace,W=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||U!==Go&&U!==$r&&(st.getTransfer(U)===dt?(W!==Jt||Q!==oi)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",U)),b}function it(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=Y,this.resetTextureUnits=V,this.getTextureUnits=D,this.setTextureUnits=F,this.setTexture2D=re,this.setTexture2DArray=j,this.setTexture3D=Z,this.setTextureCube=J,this.rebindTextures=ue,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=I,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function y2(e,t){function i(r,a=$r){let n,s=st.getTransfer(a);if(r===oi)return e.UNSIGNED_BYTE;if(r===Tu)return e.UNSIGNED_SHORT_4_4_4_4;if(r===Au)return e.UNSIGNED_SHORT_5_5_5_1;if(r===$p)return e.UNSIGNED_INT_5_9_9_9_REV;if(r===Jp)return e.UNSIGNED_INT_10F_11F_11F_REV;if(r===Zp)return e.BYTE;if(r===Kp)return e.SHORT;if(r===ps)return e.UNSIGNED_SHORT;if(r===Eu)return e.INT;if(r===rr)return e.UNSIGNED_INT;if(r===Bi)return e.FLOAT;if(r===ar)return e.HALF_FLOAT;if(r===Qp)return e.ALPHA;if(r===ef)return e.RGB;if(r===Jt)return e.RGBA;if(r===Tr)return e.DEPTH_COMPONENT;if(r===Ma)return e.DEPTH_STENCIL;if(r===Ru)return e.RED;if(r===Cu)return e.RED_INTEGER;if(r===Aa)return e.RG;if(r===Pu)return e.RG_INTEGER;if(r===Lu)return e.RGBA_INTEGER;if(r===Io||r===Do||r===No||r===Uo)if(s===dt)if(n=t.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(r===Io)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Do)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===No)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Uo)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=t.get("WEBGL_compressed_texture_s3tc"),n!==null){if(r===Io)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Do)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===No)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Uo)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===zh||r===Fh||r===Bh||r===Hh)if(n=t.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(r===zh)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Fh)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Bh)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Hh)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Gh||r===Vh||r===Wh||r===Xh||r===jh||r===Fo||r===qh)if(n=t.get("WEBGL_compressed_texture_etc"),n!==null){if(r===Gh||r===Vh)return s===dt?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(r===Wh)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(r===Xh)return n.COMPRESSED_R11_EAC;if(r===jh)return n.COMPRESSED_SIGNED_R11_EAC;if(r===Fo)return n.COMPRESSED_RG11_EAC;if(r===qh)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Yh||r===Zh||r===Kh||r===$h||r===Jh||r===Qh||r===eu||r===tu||r===iu||r===ru||r===au||r===nu||r===su||r===ou)if(n=t.get("WEBGL_compressed_texture_astc"),n!==null){if(r===Yh)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Zh)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Kh)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===$h)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Jh)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Qh)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===eu)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===tu)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===iu)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ru)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===au)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===nu)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===su)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ou)return s===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===lu||r===hu||r===uu)if(n=t.get("EXT_texture_compression_bptc"),n!==null){if(r===lu)return s===dt?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===hu)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===uu)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===cu||r===du||r===Bo||r===pu)if(n=t.get("EXT_texture_compression_rgtc"),n!==null){if(r===cu)return n.COMPRESSED_RED_RGTC1_EXT;if(r===du)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Bo)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===pu)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===fs?e.UNSIGNED_INT_24_8:e[r]!==void 0?e[r]:null}return{convert:i}}var x2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,b2=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new _f(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ni({vertexShader:x2,fragmentShader:S2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ht(new Ko(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},M2=class extends Pa{constructor(e,t){super();let i=this,r=null,a=1,n=null,s="local-floor",o=1,l=null,h=null,u=null,d=null,c=null,p=null,g=typeof XRWebGLBinding<"u",v=new b2,m={},f=t.getContextAttributes(),x=null,E=null,y=[],w=[],A=new K,C=null,_=null,S=new fi;S.viewport=new At;let L=new fi;L.viewport=new At;let P=[S,L],N=new by,V=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ie=y[q];return ie===void 0&&(ie=new ah,y[q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(q){let ie=y[q];return ie===void 0&&(ie=new ah,y[q]=ie),ie.getGripSpace()},this.getHand=function(q){let ie=y[q];return ie===void 0&&(ie=new ah,y[q]=ie),ie.getHandSpace()};function F(q){let ie=w.indexOf(q.inputSource);if(ie===-1)return;let le=y[ie];le!==void 0&&(le.update(q.inputSource,q.frame,l||n),le.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",G);for(let q=0;q<y.length;q++){let ie=w[q];ie!==null&&(w[q]=null,y[q].disconnect(ie))}V=null,D=null,v.reset();for(let q in m)delete m[q];if(e.setRenderTarget(x),c=null,d=null,u=null,r=null,E=null,Ve.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(A.width,A.height,!1),_!==null){let q=_.camera;q.fov=_.fov,q.zoom=_.zoom,q.updateProjectionMatrix(),_=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||n},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:c},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",G),f.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,le=null,Pe=null;f.depth&&(Pe=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=f.stencil?Ma:Tr,le=f.stencil?fs:rr);let ke={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:a};u=this.getBinding(),d=u.createProjectionLayer(ke),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new gi(d.textureWidth,d.textureHeight,{format:Jt,type:oi,depthTexture:new Ra(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:a};c=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:c}),e.setPixelRatio(1),e.setSize(c.framebufferWidth,c.framebufferHeight,!1),E=new gi(c.framebufferWidth,c.framebufferHeight,{format:Jt,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1,storeMultisampledDepthBuffer:c.ignoreDepthValues===!1,storeMultisampledStencilBuffer:c.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(o),l=null,n=await r.requestReferenceSpace(s),Ve.setContext(r),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function G(q){for(let ie=0;ie<q.removed.length;ie++){let le=q.removed[ie],Pe=w.indexOf(le);Pe>=0&&(w[Pe]=null,y[Pe].disconnect(le))}for(let ie=0;ie<q.added.length;ie++){let le=q.added[ie],Pe=w.indexOf(le);if(Pe===-1){for(let fe=0;fe<y.length;fe++)if(fe>=w.length){w.push(le),Pe=fe;break}else if(w[fe]===null){w[fe]=le,Pe=fe;break}if(Pe===-1)break}let ke=y[Pe];ke&&ke.connect(le)}}let re=new R,j=new R;function Z(q,ie,le){re.setFromMatrixPosition(ie.matrixWorld),j.setFromMatrixPosition(le.matrixWorld);let Pe=re.distanceTo(j),ke=ie.projectionMatrix.elements,fe=le.projectionMatrix.elements,et=ke[14]/(ke[10]-1),te=ke[14]/(ke[10]+1),ee=(ke[9]+1)/ke[5],ue=(ke[9]-1)/ke[5],xe=(ke[8]-1)/ke[0],Se=(fe[8]+1)/fe[0],Ae=et*xe,Ne=et*Se,Ye=Pe/(-xe+Se),Ke=Ye*-xe;if(ie.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ke),q.translateZ(Ye),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ke[10]===-1)q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let I=et+Ye,vt=te+Ye,nt=Ae-Ke,it=Ne+(Pe-Ke),T=ee*te/vt*I,b=ue*te/vt*I;q.projectionMatrix.makePerspective(nt,it,T,b,I,vt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function J(q,ie){ie===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ie.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ie=q.near,le=q.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(le=v.depthFar)),N.near=L.near=S.near=ie,N.far=L.far=S.far=le,(V!==N.near||D!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),V=N.near,D=N.far),N.layers.mask=q.layers.mask|6,S.layers.mask=N.layers.mask&-5,L.layers.mask=N.layers.mask&-3;let Pe=q.parent,ke=N.cameras;J(N,Pe);for(let fe=0;fe<ke.length;fe++)J(ke[fe],Pe);ke.length===2?Z(N,S,L):N.projectionMatrix.copy(S.projectionMatrix),_===null&&q.isPerspectiveCamera&&(_={camera:q,fov:q.fov,zoom:q.zoom}),Ue(q,N,Pe)};function Ue(q,ie,le){le===null?q.matrix.copy(ie.matrixWorld):(q.matrix.copy(le.matrixWorld),q.matrix.invert(),q.matrix.multiply(ie.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=vs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&c===null))return o},this.setFoveation=function(q){o=q,d!==null&&(d.fixedFoveation=q),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(N)},this.getCameraTexture=function(q){return m[q]};let we=null;function tt(q,ie){if(h=ie.getViewerPose(l||n),p=ie,h!==null){let le=h.views;c!==null&&(e.setRenderTargetFramebuffer(E,c.framebuffer),e.setRenderTarget(E));let Pe=!1;le.length!==N.cameras.length&&(N.cameras.length=0,Pe=!0);for(let fe=0;fe<le.length;fe++){let et=le[fe],te=null;if(c!==null)te=c.getViewport(et);else{let ue=u.getViewSubImage(d,et);te=ue.viewport,fe===0&&(e.setRenderTargetTextures(E,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(E))}let ee=P[fe];ee===void 0&&(ee=new fi,ee.layers.enable(fe),ee.viewport=new At,P[fe]=ee),ee.matrix.fromArray(et.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(et.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(te.x,te.y,te.width,te.height),fe===0&&(N.matrix.copy(ee.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Pe===!0&&N.cameras.push(ee)}let ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){u=i.getBinding();let fe=u.getDepthInformation(le[0]);fe&&fe.isValid&&fe.texture&&v.init(fe,r.renderState)}if(ke&&ke.includes("camera-access")&&g){e.state.unbindTexture(),u=i.getBinding();for(let fe=0;fe<le.length;fe++){let et=le[fe].camera;if(et){let te=m[et];te||(te=new _f,m[et]=te);let ee=u.getCameraImage(et);te.sourceTexture=ee}}}}for(let le=0;le<y.length;le++){let Pe=w[le],ke=y[le];Pe!==null&&ke!==void 0&&ke.update(Pe,ie,l||n)}we&&we(q,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),p=null}let Ve=new i0;Ve.setAnimationLoop(tt),this.setAnimationLoop=function(q){we=q},this.dispose=function(){}}},w2=new We,h0=new $e;h0.set(-1,0,0,0,1,0,0,0,1);function E2(e,t){function i(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function r(m,f){f.color.getRGB(m.fogColor.value,jf(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,x,E,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?n(m,f):f.isMeshLambertMaterial?(n(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(n(m,f),d(m,f)):f.isMeshPhongMaterial?(n(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(n(m,f),c(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(n(m,f),g(m,f)):f.isMeshDepthMaterial?n(m,f):f.isMeshDistanceMaterial?(n(m,f),v(m,f)):f.isMeshNormalMaterial?n(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,x,E):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function n(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,i(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===li&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,i(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===li&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,i(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,i(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,i(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let x=t.get(f),E=x.envMap,y=x.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(w2.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(h0),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,i(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,i(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,x,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=E*.5,f.map&&(m.map.value=f.map,i(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,i(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,i(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function c(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,i(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,i(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,i(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,i(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,i(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,i(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,i(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===li&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,i(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,i(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,i(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,i(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,i(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,i(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,i(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let x=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function T2(e,t,i,r){let a={},n={},s=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){let A=w.program;r.uniformBlockBinding(y,A)}function h(y,w){let A=a[y.id];A===void 0&&(m(y),A=u(y),a[y.id]=A,y.addEventListener("dispose",x));let C=w.program;r.updateUBOMapping(y,C);let _=t.render.frame;n[y.id]!==_&&(c(y),n[y.id]=_)}function u(y){let w=d();y.__bindingPointIndex=w;let A=e.createBuffer(),C=y.__size,_=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,A),e.bufferData(e.UNIFORM_BUFFER,C,_),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,w,A),A}function d(){for(let y=0;y<o;y++)if(s.indexOf(y)===-1)return s.push(y),y;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(y){let w=a[y.id],A=y.uniforms,C=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,w);for(let _=0,S=A.length;_<S;_++){let L=A[_];if(Array.isArray(L))for(let P=0,N=L.length;P<N;P++)p(L[P],_,P,C);else p(L,_,0,C)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(y,w,A,C){if(v(y,w,A,C)===!0){let _=y.__offset,S=y.value;if(Array.isArray(S)){let L=0;for(let P=0;P<S.length;P++){let N=S[P],V=f(N);g(N,y.__data,L),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(L+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(S,y.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,_,y.__data)}}function g(y,w,A){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,A)}function v(y,w,A,C){let _=y.value,S=w+"_"+A;if(C[S]===void 0)return typeof _=="number"||typeof _=="boolean"?C[S]=_:ArrayBuffer.isView(_)?C[S]=_.slice():C[S]=_.clone(),!0;{let L=C[S];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return C[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function m(y){let w=y.uniforms,A=0,C=16;for(let S=0,L=w.length;S<L;S++){let P=Array.isArray(w[S])?w[S]:[w[S]];for(let N=0,V=P.length;N<V;N++){let D=P[N],F=Array.isArray(D.value)?D.value:[D.value];for(let Y=0,G=F.length;Y<G;Y++){let re=F[Y],j=f(re),Z=A%C,J=Z%j.boundary,Ue=Z+J;A+=J,Ue!==0&&C-Ue<j.storage&&(A+=C-Ue),D.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=A,A+=j.storage}}}let _=A%C;return _>0&&(A+=C-_),y.__size=A,y.__cache={},this}function f(y){let w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",y),w}function x(y){let w=y.target;w.removeEventListener("dispose",x);let A=s.indexOf(w.__bindingPointIndex);s.splice(A,1),e.deleteBuffer(a[w.id]),delete a[w.id],delete n[w.id]}function E(){for(let y in a)e.deleteBuffer(a[y]);s=[],a={},n={}}return{bind:l,update:h,dispose:E}}var A2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$i=null;function R2(){return $i===null&&($i=new En(A2,16,16,Aa,ar),$i.name="DFG_LUT",$i.minFilter=Rt,$i.magFilter=Rt,$i.wrapS=Qi,$i.wrapT=Qi,$i.generateMipmaps=!1,$i.needsUpdate=!0),$i}var u0=class{constructor(e={}){let{canvas:t=Iv(),context:i=null,depth:r=!0,stencil:a=!1,alpha:n=!1,antialias:s=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:c=oi}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=n;let g=c,v=new Set([Lu,Pu,Cu]),m=new Set([oi,rr,ps,fs,Tu,Au]),f=new Uint32Array(4),x=new Int32Array(4),E=new R,y=null,w=null,A=[],C=[],_=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ir,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,L=!1,P=null,N=null,V=null,D=null;this._outputColorSpace=jt;let F=0,Y=0,G=null,re=-1,j=null,Z=new At,J=new At,Ue=null,we=new Be(0),tt=0,Ve=t.width,q=t.height,ie=1,le=null,Pe=null,ke=new At(0,0,Ve,q),fe=new At(0,0,Ve,q),et=!1,te=new Ou,ee=!1,ue=!1,xe=new We,Se=new R,Ae=new At,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ye=!1;function Ke(){return G===null?ie:1}let I=i;function vt(M,k){return t.getContext(M,k)}let nt,it,T,b,U,W,Q,pe,me,z,ce,ve,Te,oe,Ie,De,je,ut,O,$,ae,be,Re;try{let M={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r186"),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",Nt,!1),t.addEventListener("webglcontextcreationerror",ct,!1),I===null){let k="webgl2";if(I=vt(k,M),I===null)throw vt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}se()}catch(M){throw t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Nt,!1),t.removeEventListener("webglcontextcreationerror",ct,!1),He("WebGLRenderer: "+M.message),M}function se(){nt=new Rb(I),nt.init(),ae=new y2(I,nt),it=new _b(I,nt,e,ae),T=new v2(I,nt),it.reversedDepthBuffer&&d&&T.buffers.depth.setReversed(!0),N=I.createFramebuffer(),V=I.createFramebuffer(),D=I.createFramebuffer(),b=new Lb(I),U=new r2,W=new _2(I,nt,T,U,it,ae,b),Q=new Ab(S),pe=new Dy(I),be=new gb(I,pe),me=new Cb(I,pe,b,be),z=new Db(I,me,pe,be,b),ut=new Ib(I,it,W),Ie=new yb(U),ce=new i2(S,Q,nt,it,be,Ie),ve=new E2(S,U),Te=new n2,oe=new c2(nt),je=new mb(S,Q,T,z,p,o),De=new g2(S,z,it),Re=new T2(I,b,it,T),O=new vb(I,nt,b),$=new Pb(I,nt,b),b.programs=ce.programs,S.capabilities=it,S.extensions=nt,S.properties=U,S.renderLists=Te,S.shadowMap=De,S.state=T,S.info=b}g!==oi&&(_=new Ub(g,t.width,t.height,s,r,a));let ye=new M2(S,I);this.xr=ye,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let M=nt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=nt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(M){M!==void 0&&(ie=M,this.setSize(Ve,q,!1))},this.getSize=function(M){return M.set(Ve,q)},this.setSize=function(M,k,X=!0){if(ye.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}Ve=M,q=k,t.width=Math.floor(M*ie),t.height=Math.floor(k*ie),X===!0&&(t.style.width=M+"px",t.style.height=k+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,M,k)},this.getDrawingBufferSize=function(M){return M.set(Ve*ie,q*ie).floor()},this.setDrawingBufferSize=function(M,k,X){Ve=M,q=k,ie=X,t.width=Math.floor(M*X),t.height=Math.floor(k*X),this.setViewport(0,0,M,k)},this.setEffects=function(M){if(g===oi){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let k=0;k<M.length;k++)if(M[k].isOutputPass===!0){ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Z)},this.getViewport=function(M){return M.copy(ke)},this.setViewport=function(M,k,X,H){M.isVector4?ke.set(M.x,M.y,M.z,M.w):ke.set(M,k,X,H),T.viewport(Z.copy(ke).multiplyScalar(ie).round())},this.getScissor=function(M){return M.copy(fe)},this.setScissor=function(M,k,X,H){M.isVector4?fe.set(M.x,M.y,M.z,M.w):fe.set(M,k,X,H),T.scissor(J.copy(fe).multiplyScalar(ie).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(M){T.setScissorTest(et=M)},this.setOpaqueSort=function(M){le=M},this.setTransparentSort=function(M){Pe=M},this.getClearColor=function(M){return M.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(M=!0,k=!0,X=!0){let H=0;if(M){let B=!1;if(G!==null){let de=G.texture.format;B=v.has(de)}if(B){let de=G.texture.type,_e=m.has(de),Me=je.getClearColor(),Ee=je.getClearAlpha(),Oe=Me.r,rt=Me.g,ot=Me.b;_e?(f[0]=Oe,f[1]=rt,f[2]=ot,f[3]=Ee,I.clearBufferuiv(I.COLOR,0,f)):(x[0]=Oe,x[1]=rt,x[2]=ot,x[3]=Ee,I.clearBufferiv(I.COLOR,0,x))}else H|=I.COLOR_BUFFER_BIT}k&&(H|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),P=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Nt,!1),t.removeEventListener("webglcontextcreationerror",ct,!1),je.dispose(),Te.dispose(),oe.dispose(),U.dispose(),Q.dispose(),z.dispose(),be.dispose(),Re.dispose(),ce.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",zc),ye.removeEventListener("sessionend",Fc),ua.stop()};function Fe(M){M.preventDefault(),Cd("WebGLRenderer: Context Lost."),L=!0}function Nt(){Cd("WebGLRenderer: Context Restored."),L=!1;let M=b.autoReset,k=De.enabled,X=De.autoUpdate,H=De.needsUpdate,B=De.type;se(),b.autoReset=M,De.enabled=k,De.autoUpdate=X,De.needsUpdate=H,De.type=B}function ct(M){He("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function qi(M){let k=M.target;k.removeEventListener("dispose",qi),pr(k)}function pr(M){mg(M),U.remove(M)}function mg(M){let k=U.get(M).programs;k!==void 0&&(k.forEach(function(X){ce.releaseProgram(X)}),M.isShaderMaterial&&ce.releaseShaderCache(M))}this.renderBufferDirect=function(M,k,X,H,B,de){k===null&&(k=Ne);let _e=B.isMesh&&B.matrixWorld.determinantAffine()<0,Me=_g(M,k,X,H,B);T.setMaterial(H,_e);let Ee=X.index,Oe=1;if(H.wireframe===!0){if(Ee=me.getWireframeAttribute(X),Ee===void 0)return;Oe=2}let rt=X.drawRange,ot=X.attributes.position,Le=rt.start*Oe,pt=(rt.start+rt.count)*Oe;de!==null&&(Le=Math.max(Le,de.start*Oe),pt=Math.min(pt,(de.start+de.count)*Oe)),Ee!==null?(Le=Math.max(Le,0),pt=Math.min(pt,Ee.count)):ot!=null&&(Le=Math.max(Le,0),pt=Math.min(pt,ot.count));let Ct=pt-Le;if(Ct<0||Ct===1/0)return;be.setup(B,H,Me,X,Ee);let yt,xt=O;if(Ee!==null&&(yt=pe.get(Ee),xt=$,xt.setIndex(yt)),B.isMesh)H.wireframe===!0?(T.setLineWidth(H.wireframeLinewidth*Ke()),xt.setMode(I.LINES)):xt.setMode(I.TRIANGLES);else if(B.isLine){let wt=H.linewidth;wt===void 0&&(wt=1),T.setLineWidth(wt*Ke()),B.isLineSegments?xt.setMode(I.LINES):B.isLineLoop?xt.setMode(I.LINE_LOOP):xt.setMode(I.LINE_STRIP)}else B.isPoints?xt.setMode(I.POINTS):B.isSprite&&xt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))xt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let wt=B._multiDrawStarts,Ce=B._multiDrawCounts,ti=B._multiDrawCount,ca=Ee?pe.get(Ee).bytesPerElement:1,bi=U.get(H).currentProgram.getUniforms();for(let Yi=0;Yi<ti;Yi++)bi.setValue(I,"_gl_DrawID",Yi),xt.render(wt[Yi]/ca,Ce[Yi])}else if(B.isInstancedMesh)xt.renderInstances(Le,Ct,B.count);else if(X.isInstancedBufferGeometry){let wt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ce=Math.min(X.instanceCount,wt);xt.renderInstances(Le,Ct,Ce)}else xt.render(Le,Ct)};function Oc(M,k,X,H){P!==null&&M.isNodeMaterial&&P.setObject(H,M),ee===!0&&Ie.setState(M,X,!1),M.transparent===!0&&M.side===mi&&M.forceSinglePass===!1?(M.side=li,M.needsUpdate=!0,$s(M,k,H),M.side=Ea,M.needsUpdate=!0,$s(M,k,H),M.side=mi):$s(M,k,H)}this.compile=function(M,k,X=null){X===null&&(X=M),P!==null&&P.renderStart(M,k,X),w=oe.get(X),w.init(k),C.push(w),X.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),M!==X&&M.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights(),P!==null&&P.updateLights(w.state.lightsArray),ue=this.localClippingEnabled,ee=Ie.init(this.clippingPlanes,ue),ee===!0&&Ie.setGlobalState(this.clippingPlanes,k),P!==null&&De.render(w.state.shadowsArray,X,k);let H=new Set;return M.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let de=B.material;if(de)if(Array.isArray(de))for(let _e=0;_e<de.length;_e++){let Me=de[_e];Oc(Me,X,k,B),H.add(Me)}else Oc(de,X,k,B),H.add(de)}),w=C.pop(),P!==null&&P.renderEnd(),H},this.compileAsync=function(M,k,X=null){let H=this.compile(M,k,X);return new Promise(B=>{function de(){if(H.forEach(function(_e){let Me=U.get(_e).currentProgram;(Me===void 0||Me.isReady())&&H.delete(_e)}),H.size===0){B(M);return}setTimeout(de,10)}nt.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Dl=null;function gg(M){Dl&&Dl(M)}function zc(){ua.stop()}function Fc(){ua.start()}let ua=new i0;ua.setAnimationLoop(gg),typeof self<"u"&&ua.setContext(self),this.setAnimationLoop=function(M){Dl=M,ye.setAnimationLoop(M),M===null?ua.stop():ua.start()},ye.addEventListener("sessionstart",zc),ye.addEventListener("sessionend",Fc),this.render=function(M,k){if(k!==void 0&&k.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;P!==null&&P.renderStart(M,k);let X=ye.enabled===!0&&ye.isPresenting===!0,H=_!==null&&(G===null||X)&&_.begin(S,G);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(k),k=ye.getCamera()),M.isScene===!0&&M.onBeforeRender(S,M,k,G),w=oe.get(M,C.length),w.init(k),w.state.textureUnits=W.getTextureUnits(),C.push(w),xe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),te.setFromProjectionMatrix(xe,er,k.reversedDepth),ue=this.localClippingEnabled,ee=Ie.init(this.clippingPlanes,ue),y=Te.get(M,A.length),y.init(),A.push(y),ye.enabled===!0&&ye.isPresenting===!0){let de=S.xr.getDepthSensingMesh();de!==null&&Nl(de,k,-1/0,S.sortObjects)}Nl(M,k,0,S.sortObjects),y.finish(),P!==null&&P.updateLights(w.state.lightsArray),S.sortObjects===!0&&y.sort(le,Pe),Ye=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,Ye&&je.addToRenderList(y,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&Ie.beginShadows();let B=w.state.shadowsArray;if(De.render(B,M,k),ee===!0&&Ie.endShadows(),(H&&_.hasRenderPass())===!1){let de=y.opaque,_e=y.transmissive;if(w.setupLights(),k.isArrayCamera){let Me=k.cameras;if(_e.length>0)for(let Ee=0,Oe=Me.length;Ee<Oe;Ee++){let rt=Me[Ee];Hc(de,_e,M,rt)}Ye&&je.render(M);for(let Ee=0,Oe=Me.length;Ee<Oe;Ee++){let rt=Me[Ee];Bc(y,M,rt,rt.viewport)}}else _e.length>0&&Hc(de,_e,M,k),Ye&&je.render(M),Bc(y,M,k)}G!==null&&Y===0&&(W.updateMultisampleRenderTarget(G),W.updateRenderTargetMipmap(G)),H&&_.end(S),M.isScene===!0&&M.onAfterRender(S,M,k),be.resetDefaultState(),re=-1,j=null,C.pop(),C.length>0?(w=C[C.length-1],W.setTextureUnits(w.state.textureUnits),ee===!0&&Ie.setGlobalState(S.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?y=A[A.length-1]:y=null,P!==null&&P.renderEnd()};function Nl(M,k,X,H){if(M.visible===!1)return;if(M.layers.test(k.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(k);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(te)){H&&Ae.setFromMatrixPosition(M.matrixWorld).applyMatrix4(xe);let de=z.update(M),_e=M.material;_e.visible&&y.push(M,de,_e,X,Ae.z,null,k)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(te))){let de=z.update(M),_e=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ae.copy(M.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Ae.copy(de.boundingSphere.center)),Ae.applyMatrix4(M.matrixWorld).applyMatrix4(xe)),Array.isArray(_e)){let Me=de.groups;for(let Ee=0,Oe=Me.length;Ee<Oe;Ee++){let rt=Me[Ee],ot=_e[rt.materialIndex];ot&&ot.visible&&y.push(M,de,ot,X,Ae.z,rt,k)}}else _e.visible&&y.push(M,de,_e,X,Ae.z,null,k)}}let B=M.children;for(let de=0,_e=B.length;de<_e;de++)Nl(B[de],k,X,H)}function Bc(M,k,X,H){let{opaque:B,transmissive:de,transparent:_e}=M;w.setupLightsView(X),ee===!0&&Ie.setGlobalState(S.clippingPlanes,X),H&&T.viewport(Z.copy(H)),B.length>0&&Ks(B,k,X),de.length>0&&Ks(de,k,X),_e.length>0&&Ks(_e,k,X),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Hc(M,k,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[H.id]===void 0){let ot=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[H.id]=new gi(1,1,{generateMipmaps:!0,type:ot?ar:oi,minFilter:Mr,samples:Math.max(4,it.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:st.workingColorSpace})}let B=w.state.transmissionRenderTarget[H.id],de=H.viewport||Z;B.setSize(de.z*S.transmissionResolutionScale,de.w*S.transmissionResolutionScale);let _e=S.getRenderTarget(),Me=S.getActiveCubeFace(),Ee=S.getActiveMipmapLevel();S.setRenderTarget(B),S.getClearColor(we),tt=S.getClearAlpha(),tt<1&&S.setClearColor(16777215,.5),S.clear(),Ye&&je.render(X);let Oe=S.toneMapping;S.toneMapping=ir;let rt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),w.setupLightsView(H),ee===!0&&Ie.setGlobalState(S.clippingPlanes,H),Ks(M,X,H),W.updateMultisampleRenderTarget(B),W.updateRenderTargetMipmap(B),nt.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let Le=0,pt=k.length;Le<pt;Le++){let Ct=k[Le],{object:yt,geometry:xt,material:wt,group:Ce}=Ct;if(wt.side===mi&&yt.layers.test(H.layers)){let ti=wt.side;wt.side=li,wt.needsUpdate=!0,Gc(yt,X,H,xt,wt,Ce),wt.side=ti,wt.needsUpdate=!0,ot=!0}}ot===!0&&(W.updateMultisampleRenderTarget(B),W.updateRenderTargetMipmap(B))}S.setRenderTarget(_e,Me,Ee),S.setClearColor(we,tt),rt!==void 0&&(H.viewport=rt),S.toneMapping=Oe}function Ks(M,k,X){let H=k.isScene===!0?k.overrideMaterial:null;for(let B=0,de=M.length;B<de;B++){let _e=M[B],{object:Me,geometry:Ee,group:Oe}=_e,rt=_e.material;rt.allowOverride===!0&&H!==null&&(rt=H),Me.layers.test(X.layers)&&Gc(Me,k,X,Ee,rt,Oe)}}function Gc(M,k,X,H,B,de){P!==null&&B.isNodeMaterial&&P.setObject(M,B),M.onBeforeRender(S,k,X,H,B,de),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),B.onBeforeRender(S,k,X,H,M,de),B.transparent===!0&&B.side===mi&&B.forceSinglePass===!1?(B.side=li,B.needsUpdate=!0,S.renderBufferDirect(X,k,H,B,M,de),B.side=Ea,B.needsUpdate=!0,S.renderBufferDirect(X,k,H,B,M,de),B.side=mi):S.renderBufferDirect(X,k,H,B,M,de),M.onAfterRender(S,k,X,H,B,de)}function $s(M,k,X){k.isScene!==!0&&(k=Ne);let H=U.get(M),B=w.state.lights,de=w.state.shadowsArray,_e=B.state.version,Me=ce.getParameters(M,B.state,de,k,X,w.state.lightProbeGridArray),Ee=ce.getProgramCacheKey(Me),Oe=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?k.environment:null,H.fog=k.fog;let rt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=Q.get(M.envMap||H.environment,rt),H.envMapRotation=H.environment!==null&&M.envMap===null?k.environmentRotation:M.envMapRotation,Oe===void 0&&(M.addEventListener("dispose",qi),Oe=new Map,H.programs=Oe);let ot=Oe.get(Ee);if(ot!==void 0){if(H.currentProgram===ot&&H.lightsStateVersion===_e)return Wc(M,Me),ot}else Me.uniforms=ce.getUniforms(M),P!==null&&M.isNodeMaterial&&P.build(M,X,Me),M.onBeforeCompile(Me,S),ot=ce.acquireProgram(Me,Ee),Oe.set(Ee,ot),H.uniforms=Me.uniforms;let Le=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Le.clippingPlanes=Ie.uniform),Wc(M,Me),H.needsLights=xg(M),H.lightsStateVersion=_e,H.needsLights&&(Le.ambientLightColor.value=B.state.ambient,Le.lightProbe.value=B.state.probe,Le.sunLights.value=B.state.sun,Le.sunLightShadows.value=B.state.sunShadow,Le.directionalLights.value=B.state.directional,Le.directionalLightShadows.value=B.state.directionalShadow,Le.spotLights.value=B.state.spot,Le.spotLightShadows.value=B.state.spotShadow,Le.rectAreaLights.value=B.state.rectArea,Le.ltc_1.value=B.state.rectAreaLTC1,Le.ltc_2.value=B.state.rectAreaLTC2,Le.pointLights.value=B.state.point,Le.pointLightShadows.value=B.state.pointShadow,Le.hemisphereLights.value=B.state.hemi,Le.sunShadowMatrix.value=B.state.sunShadowMatrix,Le.sunShadowCascade.value=B.state.sunShadowCascade,Le.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Le.spotLightMatrix.value=B.state.spotLightMatrix,Le.spotLightMap.value=B.state.spotLightMap,Le.pointShadowMatrix.value=B.state.pointShadowMatrix),H.lightProbeGrid=w.state.lightProbeGridArray.length>0,H.currentProgram=ot,H.uniformsList=null,ot}function Vc(M){if(M.uniformsList===null){let k=M.currentProgram.getUniforms();M.uniformsList=zo.seqWithValue(k.seq,M.uniforms)}return M.uniformsList}function Wc(M,k){let X=U.get(M);X.outputColorSpace=k.outputColorSpace,X.batching=k.batching,X.batchingColor=k.batchingColor,X.instancing=k.instancing,X.instancingColor=k.instancingColor,X.instancingMorph=k.instancingMorph,X.skinning=k.skinning,X.morphTargets=k.morphTargets,X.morphNormals=k.morphNormals,X.morphColors=k.morphColors,X.morphTargetsCount=k.morphTargetsCount,X.numClippingPlanes=k.numClippingPlanes,X.numIntersection=k.numClipIntersection,X.vertexAlphas=k.vertexAlphas,X.vertexTangents=k.vertexTangents,X.toneMapping=k.toneMapping}function vg(M,k){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(k.matrixWorld);for(let X=0,H=M.length;X<H;X++){let B=M[X];if(B.texture!==null&&B.boundingBox.containsPoint(E))return B}return null}function _g(M,k,X,H,B){k.isScene!==!0&&(k=Ne),W.resetTextureUnits();let de=k.fog,_e=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?k.environment:null,Me=G===null?S.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:st.workingColorSpace,Ee=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Oe=Q.get(H.envMap||_e,Ee),rt=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ot=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Le=!!X.morphAttributes.position,pt=!!X.morphAttributes.normal,Ct=!!X.morphAttributes.color,yt=ir;H.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(yt=S.toneMapping);let xt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,wt=xt!==void 0?xt.length:0,Ce=U.get(H),ti=w.state.lights;if(ee===!0&&(ue===!0||M!==j)){let mt=M===j&&H.id===re;Ie.setState(H,M,mt)}let ca=!1;H.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==ti.state.version||Ce.outputColorSpace!==Me||B.isBatchedMesh&&Ce.batching===!1||!B.isBatchedMesh&&Ce.batching===!0||B.isBatchedMesh&&Ce.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&Ce.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&Ce.instancing===!1||!B.isInstancedMesh&&Ce.instancing===!0||B.isSkinnedMesh&&Ce.skinning===!1||!B.isSkinnedMesh&&Ce.skinning===!0||B.isInstancedMesh&&Ce.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ce.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ce.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ce.instancingMorph===!1&&B.morphTexture!==null||Ce.envMap!==Oe||H.fog===!0&&Ce.fog!==de||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Ie.numPlanes||Ce.numIntersection!==Ie.numIntersection)||Ce.vertexAlphas!==rt||Ce.vertexTangents!==ot||Ce.morphTargets!==Le||Ce.morphNormals!==pt||Ce.morphColors!==Ct||Ce.toneMapping!==yt||Ce.morphTargetsCount!==wt||!!Ce.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ca=!0):(ca=!0,Ce.__version=H.version);let bi=Ce.currentProgram;ca===!0&&(bi=$s(H,k,B),P&&H.isNodeMaterial&&P.onUpdateProgram(H,bi,Ce));let Yi=!1,kr=!1,Xa=!1,ft=bi.getUniforms(),Tt=Ce.uniforms;if(T.useProgram(bi.program)&&(Yi=!0,kr=!0,Xa=!0),H.id!==re&&(re=H.id,kr=!0),Ce.needsLights){let mt=vg(w.state.lightProbeGridArray,B);Ce.lightProbeGrid!==mt&&(Ce.lightProbeGrid=mt,kr=!0)}if(Yi||j!==M){T.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ft.setValue(I,"projectionMatrix",M.projectionMatrix),ft.setValue(I,"viewMatrix",M.matrixWorldInverse);let mt=ft.map.cameraPosition;mt!==void 0&&mt.setValue(I,Se.setFromMatrixPosition(M.matrixWorld)),it.logarithmicDepthBuffer&&ft.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ft.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,kr=!0,Xa=!0)}if(Ce.needsLights&&(ti.state.sunShadowMap.length>0&&ft.setValue(I,"sunShadowMap",ti.state.sunShadowMap,W),ti.state.directionalShadowMap.length>0&&ft.setValue(I,"directionalShadowMap",ti.state.directionalShadowMap,W),ti.state.spotShadowMap.length>0&&ft.setValue(I,"spotShadowMap",ti.state.spotShadowMap,W),ti.state.pointShadowMap.length>0&&ft.setValue(I,"pointShadowMap",ti.state.pointShadowMap,W)),B.isSkinnedMesh){ft.setOptional(I,B,"bindMatrix"),ft.setOptional(I,B,"bindMatrixInverse");let mt=B.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ft.setValue(I,"boneTexture",mt.boneTexture,W))}B.isBatchedMesh&&(ft.setOptional(I,B,"batchingTexture"),ft.setValue(I,"batchingTexture",B._matricesTexture,W),ft.setOptional(I,B,"batchingIdTexture"),ft.setValue(I,"batchingIdTexture",B._indirectTexture,W),ft.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&ft.setValue(I,"batchingColorTexture",B._colorsTexture,W));let Or=X.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0)&&ut.update(B,X,bi),(kr||Ce.receiveShadow!==B.receiveShadow)&&(Ce.receiveShadow=B.receiveShadow,ft.setValue(I,"receiveShadow",B.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&k.environment!==null&&(Tt.envMapIntensity.value=k.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=R2()),kr){if(ft.setValue(I,"toneMappingExposure",S.toneMappingExposure),Ce.needsLights&&yg(Tt,Xa),de&&H.fog===!0&&ve.refreshFogUniforms(Tt,de),ve.refreshMaterialUniforms(Tt,H,ie,q,w.state.transmissionRenderTarget[M.id]),Ce.needsLights&&Ce.lightProbeGrid){let mt=Ce.lightProbeGrid;Tt.probesSH.value=mt.texture,Tt.probesMin.value.copy(mt.boundingBox.min),Tt.probesMax.value.copy(mt.boundingBox.max),Tt.probesResolution.value.copy(mt.resolution)}zo.upload(I,Vc(Ce),Tt,W)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(zo.upload(I,Vc(Ce),Tt,W),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ft.setValue(I,"center",B.center),ft.setValue(I,"modelViewMatrix",B.modelViewMatrix),ft.setValue(I,"normalMatrix",B.normalMatrix),ft.setValue(I,"modelMatrix",B.matrixWorld),H.uniformsGroups!==void 0){let mt=H.uniformsGroups;for(let Gn=0,ja=mt.length;Gn<ja;Gn++){let jc=mt[Gn];Re.update(jc,bi),Re.bind(jc,bi)}}return bi}function yg(M,k){M.ambientLightColor.needsUpdate=k,M.lightProbe.needsUpdate=k,M.sunLights.needsUpdate=k,M.sunLightShadows.needsUpdate=k,M.directionalLights.needsUpdate=k,M.directionalLightShadows.needsUpdate=k,M.pointLights.needsUpdate=k,M.pointLightShadows.needsUpdate=k,M.spotLights.needsUpdate=k,M.spotLightShadows.needsUpdate=k,M.rectAreaLights.needsUpdate=k,M.hemisphereLights.needsUpdate=k}function xg(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(M,k,X){let H=U.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),U.get(M.texture).__webglTexture=k,U.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,k){let X=U.get(M);X.__webglFramebuffer=k,X.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(M,k=0,X=0){G=M,F=k,Y=X;let H=null,B=!1,de=!1;if(M){let _e=U.get(M);if(_e.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(I.FRAMEBUFFER,_e.__webglFramebuffer),Z.copy(M.viewport),J.copy(M.scissor),Ue=M.scissorTest,T.viewport(Z),T.scissor(J),T.setScissorTest(Ue),re=-1;return}else if(_e.__webglFramebuffer===void 0)W.setupRenderTarget(M);else if(_e.__hasExternalTextures)W.rebindTextures(M,U.get(M.texture).__webglTexture,U.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Oe=M.depthTexture;if(_e.__boundDepthTexture!==Oe){if(Oe!==null&&U.has(Oe)&&(M.width!==Oe.image.width||M.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(M)}}let Me=M.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(de=!0);let Ee=U.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ee[k])?H=Ee[k][X]:H=Ee[k],B=!0):M.samples>0&&W.useMultisampledRTT(M)===!1?H=U.get(M).__webglMultisampledFramebuffer:Array.isArray(Ee)?H=Ee[X]:H=Ee,Z.copy(M.viewport),J.copy(M.scissor),Ue=M.scissorTest}else Z.copy(ke).multiplyScalar(ie).floor(),J.copy(fe).multiplyScalar(ie).floor(),Ue=et;if(X!==0&&(H=N),T.bindFramebuffer(I.FRAMEBUFFER,H)&&T.drawBuffers(M,H),T.viewport(Z),T.scissor(J),T.setScissorTest(Ue),B){let _e=U.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,_e.__webglTexture,X)}else if(de){let _e=k;for(let Me=0;Me<M.textures.length;Me++){let Ee=U.get(M.textures[Me]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Me,Ee.__webglTexture,X,_e)}}else if(M!==null&&X!==0){let _e=U.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_e.__webglTexture,X)}re=-1};function Xc(M){let k=U.get(M);return(k.__readFormat!==M.format||k.__readType!==M.type)&&(k.__readFormat=M.format,k.__readType=M.type,k.__formatReadable=it.textureFormatReadable(M.format),k.__typeReadable=it.textureTypeReadable(M.type)),k}this.readRenderTargetPixels=function(M,k,X,H,B,de,_e,Me=0){if(!(M&&M.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=U.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(Ee=Ee[_e]),Ee){T.bindFramebuffer(I.FRAMEBUFFER,Ee);try{let Oe=M.textures[Me],rt=Oe.format,ot=Oe.type;M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me);let Le=Xc(Oe);if(Le.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Le.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=M.width-H&&X>=0&&X<=M.height-B&&I.readPixels(k,X,H,B,ae.convert(rt),ae.convert(ot),de)}finally{let Oe=G!==null?U.get(G).__webglFramebuffer:null;T.bindFramebuffer(I.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(M,k,X,H,B,de,_e,Me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=U.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(Ee=Ee[_e]),Ee)if(k>=0&&k<=M.width-H&&X>=0&&X<=M.height-B){T.bindFramebuffer(I.FRAMEBUFFER,Ee);let Oe=M.textures[Me],rt=Oe.format,ot=Oe.type;M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Me);let Le=Xc(Oe);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,pt),I.bufferData(I.PIXEL_PACK_BUFFER,de.byteLength,I.STREAM_READ),I.readPixels(k,X,H,B,ae.convert(rt),ae.convert(ot),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let Ct=G!==null?U.get(G).__webglFramebuffer:null;T.bindFramebuffer(I.FRAMEBUFFER,Ct);let yt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Dv(I,yt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,pt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,de),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(pt),I.deleteSync(yt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,k=null,X=0){let H=Math.pow(2,-X),B=Math.floor(M.image.width*H),de=Math.floor(M.image.height*H),_e=k!==null?k.x:0,Me=k!==null?k.y:0;W.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,X,0,0,_e,Me,B,de),T.unbindTexture()},this.copyTextureToTexture=function(M,k,X=null,H=null,B=0,de=0){let _e,Me,Ee,Oe,rt,ot,Le,pt,Ct,yt=M.isCompressedTexture?M.mipmaps[de]:M.image;if(X!==null)_e=X.max.x-X.min.x,Me=X.max.y-X.min.y,Ee=X.isBox3?X.max.z-X.min.z:1,Oe=X.min.x,rt=X.min.y,ot=X.isBox3?X.min.z:0;else{let Tt=Math.pow(2,-B);_e=Math.floor(yt.width*Tt),Me=Math.floor(yt.height*Tt),M.isDataArrayTexture?Ee=yt.depth:M.isData3DTexture?Ee=Math.floor(yt.depth*Tt):Ee=1,Oe=0,rt=0,ot=0}H!==null?(Le=H.x,pt=H.y,Ct=H.z):(Le=0,pt=0,Ct=0);let xt=ae.convert(k.format),wt=ae.convert(k.type),Ce;k.isData3DTexture?(W.setTexture3D(k,0),Ce=I.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(W.setTexture2DArray(k,0),Ce=I.TEXTURE_2D_ARRAY):(W.setTexture2D(k,0),Ce=I.TEXTURE_2D),T.activeTexture(I.TEXTURE0),T.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),T.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),T.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);let ti=T.getParameter(I.UNPACK_ROW_LENGTH),ca=T.getParameter(I.UNPACK_IMAGE_HEIGHT),bi=T.getParameter(I.UNPACK_SKIP_PIXELS),Yi=T.getParameter(I.UNPACK_SKIP_ROWS),kr=T.getParameter(I.UNPACK_SKIP_IMAGES);T.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),T.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),T.pixelStorei(I.UNPACK_SKIP_PIXELS,Oe),T.pixelStorei(I.UNPACK_SKIP_ROWS,rt),T.pixelStorei(I.UNPACK_SKIP_IMAGES,ot);let Xa=M.isDataArrayTexture||M.isData3DTexture,ft=k.isDataArrayTexture||k.isData3DTexture;if(M.isDepthTexture){let Tt=U.get(M),Or=U.get(k),mt=U.get(Tt.__renderTarget),Gn=U.get(Or.__renderTarget);T.bindFramebuffer(I.READ_FRAMEBUFFER,mt.__webglFramebuffer),T.bindFramebuffer(I.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let ja=0;ja<Ee;ja++)Xa&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,U.get(M).__webglTexture,B,ot+ja),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,U.get(k).__webglTexture,de,Ct+ja)),I.blitFramebuffer(Oe,rt,_e,Me,Le,pt,_e,Me,I.DEPTH_BUFFER_BIT,I.NEAREST);T.bindFramebuffer(I.READ_FRAMEBUFFER,null),T.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(B!==0||M.isRenderTargetTexture||U.has(M)){let Tt=U.get(M),Or=U.get(k);T.bindFramebuffer(I.READ_FRAMEBUFFER,V),T.bindFramebuffer(I.DRAW_FRAMEBUFFER,D);for(let mt=0;mt<Ee;mt++)Xa?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Tt.__webglTexture,B,ot+mt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Tt.__webglTexture,B),ft?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Or.__webglTexture,de,Ct+mt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Or.__webglTexture,de),B!==0?I.blitFramebuffer(Oe,rt,_e,Me,Le,pt,_e,Me,I.COLOR_BUFFER_BIT,I.NEAREST):ft?I.copyTexSubImage3D(Ce,de,Le,pt,Ct+mt,Oe,rt,_e,Me):I.copyTexSubImage2D(Ce,de,Le,pt,Oe,rt,_e,Me);T.bindFramebuffer(I.READ_FRAMEBUFFER,null),T.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ft?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(Ce,de,Le,pt,Ct,_e,Me,Ee,xt,wt,yt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(Ce,de,Le,pt,Ct,_e,Me,Ee,xt,yt.data):I.texSubImage3D(Ce,de,Le,pt,Ct,_e,Me,Ee,xt,wt,yt):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,de,Le,pt,_e,Me,xt,wt,yt.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,de,Le,pt,yt.width,yt.height,xt,yt.data):I.texSubImage2D(I.TEXTURE_2D,de,Le,pt,_e,Me,xt,wt,yt);T.pixelStorei(I.UNPACK_ROW_LENGTH,ti),T.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ca),T.pixelStorei(I.UNPACK_SKIP_PIXELS,bi),T.pixelStorei(I.UNPACK_SKIP_ROWS,Yi),T.pixelStorei(I.UNPACK_SKIP_IMAGES,kr),de===0&&k.generateMipmaps&&I.generateMipmap(Ce),T.unbindTexture()},this.initRenderTarget=function(M){U.get(M).__webglFramebuffer===void 0&&W.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?W.setTextureCube(M,0):M.isData3DTexture?W.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?W.setTexture2DArray(M,0):W.setTexture2D(M,0),T.unbindTexture()},this.resetState=function(){F=0,Y=0,G=null,T.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return er}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};function As(e){return e.traverse(t=>t.layers.set(1)),e}function Na(e,t=!1){let i=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),a=new Set(Object.keys(e[0].morphAttributes)),n={},s={},o=e[0].morphTargetsRelative,l=new St,h=0;for(let u=0;u<e.length;++u){let d=e[u],c=0;if(i!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;n[p]===void 0&&(n[p]=[]),n[p].push(d.attributes[p]),c++}if(c!==r.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!a.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.morphAttributes[p])}if(t){let p;if(i)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,p,u),h+=p}}if(i){let u=0,d=[];for(let c=0;c<e.length;++c){let p=e[c].index;for(let g=0;g<p.count;++g)d.push(p.getX(g)+u);u+=e[c].attributes.position.count}l.setIndex(d)}for(let u in n){let d=Cp(n[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(let u in s){let d=s[u][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let c=0;c<d;++c){let p=[];for(let v=0;v<s[u].length;++v)p.push(s[u][v][c]);let g=Cp(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}}return l}function Cp(e){let t,i,r,a=-1,n=0;for(let h=0;h<e.length;++h){let u=e[h];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(i===void 0&&(i=u.itemSize),i!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(r===void 0&&(r=u.normalized),r!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=u.gpuType),a!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;n+=u.count*i}let s=new t(n),o=new qt(s,i,r),l=0;for(let h=0;h<e.length;++h){let u=e[h];if(u.isInterleavedBufferAttribute){let d=l/i;for(let c=0,p=u.count;c<p;c++)for(let g=0;g<i;g++){let v=u.getComponent(c,g);o.setComponent(c+d,g,v)}}else s.set(u.array,l);l+=u.count*i}return a!==void 0&&(o.gpuType=a),o}var yC={corner:5.75,run:.35,angle:32*Math.PI/180,arm:.8};var xC={tilt:14*Math.PI/180,neck:[.45,.2,.3],housing:[.95,.26,.46],housingAt:.3,panel:[.76,.04,.34]};var Pp=3,C2=.15,P2=.75,L2=1.6,I2=.1;function D2(){return N2(new Uint8Array(4),1,1,1)}function N2(e,t,i,r){let a=new hf(e,t,i,r);return a.format=Jt,a.type=oi,a.minFilter=a.magFilter=Rt,a.wrapS=a.wrapT=a.wrapR=Qi,a.generateMipmaps=!1,a.unpackAlignment=1,a.needsUpdate=!0,a}var U2=1.6,k2=.22,O2=2.4,wa={value:0};function c0(){return new nr({vertexColors:!0})}function d0(){let e=new nr({vertexColors:!0,transparent:!0,depthWrite:!1});return e.onBeforeCompile=t=>{t.uniforms.uGlowTime=wa,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vGlowN;
varying vec3 vGlowV;`).replace("#include <project_vertex>",`#include <project_vertex>
        vec3 glowN = normal;
        #ifdef USE_INSTANCING
          glowN = mat3(instanceMatrix) * glowN;
        #endif
        vGlowN = normalize(normalMatrix * glowN);
        vGlowV = -mvPosition.xyz;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
uniform float uGlowTime;
varying vec3 vGlowN;
varying vec3 vGlowV;`).replace("#include <opaque_fragment>",`float glowS = max(max(outgoingLight.r, outgoingLight.g), outgoingLight.b);
        float glowPulse = 1.0 + ${k2.toFixed(2)} * sin(uGlowTime * ${O2.toFixed(1)});
        diffuseColor.a = min(1.0, glowS * glowPulse) * pow(abs(dot(normalize(vGlowN), normalize(vGlowV))), ${U2.toFixed(1)});
        outgoingLight /= max(glowS, 1e-3);
        #include <opaque_fragment>`)},e.customProgramCacheKey=()=>"glow",e}function z2(e){return .86+.1*Math.sin(e*2.2)+.04*Math.sin(e*9.1+1.3)}function p0(){return new nr({vertexColors:!0})}function f0(e,t){return e.onBeforeRender=()=>t.color.setScalar(z2(performance.now()/1e3)),e.castShadow=!1,e}function m0(e){let t=-1;return e.onBeforeRender=()=>{wa.value=performance.now()/1e3;let i=e.geometry.userData.animate;i&&wa.value-t>.03&&(t=wa.value,i(wa.value))},e.castShadow=!1,e}var g0=["dots","lines","dots, lines in cast shadow","none"],v0=["shade","violet ink"],_0=["screen","world"],F2=["sprite","inked star"],B2=["particles","cel","cel and particles"],H2=["smooth","12 fps","8 fps"],G2=["fade","erode"],V2=["today","cartoon"],y0={inkWidth:1.1,gunInkWidth:2,silhouette:1,depthEdge:1,creaseEdge:1,inkFog:.7,inkTint:1,inkTintFrom:10,inkTaper:.8,boil:0,boilFps:8,boilGun:!1,sunCut:.82,sunSoft:.08,shadeTint:"#ada3d1",shadePattern:"dots",dotPitch:7.5,dotSize:.16,dotStrength:.14,dotColor:"shade",anchor:"screen",worldPitch:2,rim:.15,grain:0,grainSize:1.5,mottle:0,mottleSize:6,softProps:!0,softRadius:4.5,softSegments:2,muzzleFlash:"inked star",tracerOpacity:.75,tracerWidth:1,blast:"cel and particles",fxRate:"smooth",fxEnd:"fade",fxInk:!1,fxCount:1.5,words:!0,wordSize:.6,skyTop:"#7fb2e0",skyHorizon:"#ffd9a8",fogNear:90,fogFar:320,sunLight:2.7,skyLight:1.75,sunColor:"#ffe2b8",groundLight:"#f0d6e6",cloudTint:"#ffffff",nightTint:"#ffffff",nightGrey:0,lampColor:"#ffb45c",lampReach:0,lampHalo:1,lampBright:1,playerDark:.5,topDark:1,topFrom:6,topTo:24,moon:0,comicSounds:!1,killSting:!1,stingPitch:0,boomSound:"today",nadeWhistle:!1,volGuns:1,volSteps:1,volFx:1,volAmbience:1},Xe=(e,t,i,r,a,n,s,o="",l=!1)=>({key:e,group:t,label:i,kind:"range",min:r,max:a,step:n,unit:o,hint:s,...l?{rebuild:l}:{}}),ba=(e,t,i,r,a=!1)=>({key:e,group:t,label:i,kind:"switch",hint:r,...a?{rebuild:a}:{}}),Yr=(e,t,i,r,a)=>({key:e,group:t,label:i,kind:"choice",options:r,hint:a}),Zr=(e,t,i,r)=>({key:e,group:t,label:i,kind:"color",hint:r}),W2=[Xe("inkWidth","Ink","Line width",.5,3,.1,"Half-width of the world's ink lines, CSS pixels."," px"),Xe("gunInkWidth","Ink","Gun line width",.5,4,.1,"Ink on the first-person gun and the menu stickman."," px"),Xe("silhouette","Ink","Outer lines \xD7",1,3,.1,"Outlines where depth jumps (silhouettes) this many times wider than creases.","\xD7"),Xe("depthEdge","Ink","Outline pickup",.25,3,.05,"Higher finds more depth edges (outlines).","\xD7"),Xe("creaseEdge","Ink","Crease pickup",.25,3,.05,"Higher finds more creases (where faces meet at an angle).","\xD7"),Xe("inkFog","Ink","Fade into fog",0,1,.05,"How much the lines fade with the fog at distance."),Xe("inkTint","Ink","Coloured ink far",0,1,.05,"Far lines turn from black into a dark shade of the surface they are on."),Xe("inkTintFrom","Ink","Coloured from",0,80,1,"Distance where lines start to take colour; full 30 m further."," m"),Xe("inkTaper","Ink","Thinner far",0,1,.05,"Lines get thinner with distance."),Xe("boil","Ink","Line boil",0,2,.05,"Hand-drawn wobble: lines shift a little and redraw a few times a second."," px"),Xe("boilFps","Ink","Boil redraws",2,15,1,"How many times a second the wobble changes.","/s"),ba("boilGun","Ink","Boil on the gun","The first-person gun wobbles too."),Xe("sunCut","Paint and shade","Light cut-off",.5,1,.01,"Where lit turns to shade. Higher: more of the world in shade."),Xe("sunSoft","Paint and shade","Cut-off softness",.005,.2,.005,"Width of the step between lit and shade."),Zr("shadeTint","Paint and shade","Shade tint","Shade is the paint times this colour: darker, pushed to violet like a second ink."),Yr("shadePattern","Paint and shade","Shade pattern",g0,"The print pattern in the shade."),Xe("dotPitch","Paint and shade","Dot spacing",3,14,.5,"Screen anchor: pixels between dots and lines."," px"),Xe("worldPitch","Paint and shade","World spacing",2,20,.5,"World anchor: centimetres between dots and lines."," cm"),Xe("dotSize","Paint and shade","Dot size",.1,.45,.01,"Dot radius as a share of the spacing; line width for lines."),Xe("dotStrength","Paint and shade","Pattern strength",0,.6,.01,"How dark the dots and lines print."),Yr("dotColor","Paint and shade","Pattern colour",v0,"Darker shade, or a violet ink."),Yr("anchor","Paint and shade","Pattern anchor",_0,"Screen: fixed like printed paper, the world slides under it. World: printed on the surfaces."),Xe("rim","Paint and shade","Rim light",0,1,.05,"A light edge on the sun side of round shapes."),Xe("grain","Surface","Paper grain",0,.25,.01,"A paper texture over the whole screen."),Xe("grainSize","Surface","Grain size",1,4,.1,"Size of a grain fleck."," px"),Xe("mottle","Surface","Paint mottle",0,.2,.01,"Soft, large changes in the paint on big flat areas."),Xe("mottleSize","Surface","Mottle size",1,20,.5,"Size of one mottle patch."," m"),ba("softProps","Shapes","Soft props","Props and movable things get rounded edges. Walls, floors and buildings stay hard.",!0),Xe("softRadius","Shapes","Corner radius",1,15,.5,"Radius of the rounded edges."," cm",!0),Xe("softSegments","Shapes","Roundness steps",1,4,1,"Segments per rounded edge. More is rounder and costs triangles.","",!0),Yr("muzzleFlash","Effects","Muzzle flash",F2,"Soft star sprite, or a solid star with ink lines."),Xe("tracerOpacity","Effects","Tracer opacity",.2,1,.05,"1 is solid."),Xe("tracerWidth","Effects","Tracer width",.3,3,.1,"Times today's 3 cm.","\xD7"),Yr("blast","Effects","Explosion",B2,"Flying bits, or a solid inked fireball with toon smoke."),Yr("fxRate","Effects","Effect frame rate",H2,"Hand-drawn animation runs on twos (12 fps)."),Yr("fxEnd","Effects","Effects end",G2,"Fade out, or shrink and break up."),ba("fxInk","Effects","Ink on effects","Particles and the cel fireball get ink outlines."),Xe("fxCount","Effects","Particle count",.25,2,.05,"Times today's particles per effect.","\xD7"),ba("words","Effects","Comic words","POW!, BONK!, KABOOM! in the world."),Xe("wordSize","Effects","Word size",.5,2,.05,"Times today's size.","\xD7"),Zr("skyTop","Sky and light","Sky top","The sky overhead."),Zr("skyHorizon","Sky and light","Sky horizon and fog","The sky at the horizon; far things fade into it."),Xe("fogNear","Sky and light","Fog from",20,300,5,"Where the fade into the horizon starts."," m"),Xe("fogFar","Sky and light","Fog full",100,600,5,"Where things are gone into the horizon."," m"),Xe("sunLight","Sky and light","Sun",0,5,.05,"Sun strength. The light cut-off is tuned with it."),Xe("skyLight","Sky and light","Sky light",0,4,.05,"Light from the whole sky, also in shade."),Zr("sunColor","Sky and light","Sun colour","Colour of the sunlight."),Zr("groundLight","Sky and light","Ground bounce","Colour of the light from below."),Zr("cloudTint","Sky and light","Cloud colour","The clouds are painted white times this colour."),Zr("nightTint","Night","Dark tint","Everything out of lamp light is its colour times this. White is day."),Xe("nightGrey","Night","Colour in the dark",0,1,.05,"How much colour drains out of the dark: at night the eye sees greys. 1: none left."),Zr("lampColor","Night","Lamp colour","Colour of the light round each lamp."),Xe("lampReach","Night","Lamp reach",0,30,.5,"How far a lamp lights, from the bulb. 0: lamps give no light."," m"),Xe("lampHalo","Night","Lamp halo",0,3,.05,"Size of the glow round a lit bulb. 0: none.","\xD7"),Xe("lampBright","Night","Lamp brightness",.2,1.5,.05,"How bright the light pool, the halo and the lit bulb or panel are. 1: full.","\xD7"),Xe("topDark","Night","Dark at the top",0,1,.01,"How much of the dark is left at the top of a tall building, out of lamp light. 1: all (no change). Near 0: almost pitch black.","\xD7"),Xe("topFrom","Night","Top starts at",0,40,.5,"Height where the dark begins to deepen toward the top."," m"),Xe("topTo","Night","Top is darkest at",1,60,.5,"Height where the dark has deepened all the way. The longer the stretch from the one above, the longer the gradient."," m"),Xe("moon","Night","Moon",0,1,.01,"A small, soft moon in the night sky: how bright it is. 0: no moon.","\xD7"),Xe("playerDark","Night","Players in the dark",0,1,.05,"How much of the dark tint falls on players. Less keeps them easy to see."),ba("comicSounds","Sound","Comic word sounds","Each comic word makes its sound: BONK! is a bonk."),ba("killSting","Sound","Kill sting","A short phrase in one key on your kills: the game's sound mark."),Xe("stingPitch","Sound","Sting key",-12,12,1,"Semitones up or down."," st"),Yr("boomSound","Sound","Explosion sound",V2,"Today's, or a cartoon thump with a debris rattle."),ba("nadeWhistle","Sound","Grenade whistle","A slide whistle when a grenade flies."),Xe("volGuns","Sound","Guns volume",0,2,.05,"Gunshots, yours and others'.","\xD7"),Xe("volSteps","Sound","Steps volume",0,2,.05,"Footsteps and landings.","\xD7"),Xe("volFx","Sound","Effects volume",0,2,.05,"Explosions, hits, kills, comic sounds.","\xD7"),Xe("volAmbience","Sound","Ambience volume",0,2,.05,"Wind, birds, traffic, machines.","\xD7")],x0=["shadePattern"],X2=[...W2.filter(e=>e.group==="Sky and light"||e.group==="Night").map(e=>e.key),"shadeTint",...x0],is=Object.fromEntries(X2.filter(e=>!x0.includes(e)).map(e=>[e,y0[e]])),SC={Day:is,"Golden hour":{...is,skyTop:"#7fb2e0",skyHorizon:"#ffd9a8",sunLight:2.7,skyLight:1.75,sunColor:"#ffe2b8",groundLight:"#f0d6e6",shadeTint:"#b49ccf"},Overcast:{...is,skyTop:"#aebfd0",skyHorizon:"#e4e4e0",sunLight:1.6,skyLight:2.3,sunColor:"#f4f4f4",groundLight:"#dcdce4",shadeTint:"#b4b4c8"},Dusk:{...is,skyTop:"#3d4f8f",skyHorizon:"#f2a98a",sunLight:2.2,skyLight:1.5,sunColor:"#ffc4a0",groundLight:"#b8a8d8",shadeTint:"#9a8cc8"},Night:{...is,skyTop:"#2a2e44",skyHorizon:"#6a6478",fogNear:45,fogFar:230,sunLight:2.7,skyLight:1.75,sunColor:"#c8d4ff",groundLight:"#8890b0",shadeTint:"#8f8fb8",cloudTint:"#8a8799",nightTint:"#2a3048",nightGrey:.5,lampColor:"#ffb45c",lampReach:16,lampHalo:1,playerDark:.5}},lt={...y0},Lp=new Set;function S0(e){return Lp.add(e),()=>Lp.delete(e)}function j2(e){let t=parseInt(e.slice(1),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}var xu=16,Ip=.07,Dp=.3,Np=.5,q2=.15;var Y2=2.4,Z2="#fff1d6",K2="#f4faff",$2=Array.from({length:xu},()=>new R),b0={uNightOn:{value:0},uNightTint:{value:new R(1,1,1)},uNightGrey:{value:0},uLampColor:{value:new R(1,1,1)},uLampBright:{value:1},uLampReach:{value:1},uLampCount:{value:0},uLamps:{value:$2},uPlayerDark:{value:1},uTopDark:{value:new R(1,6,24)},uVolOn:{value:0},uLightVol:{value:D2()},uVolMin:{value:new R},uVolInv:{value:new R(1,1,1)}},M0=`
  uniform float uNightOn;
  uniform vec3 uNightTint;
  uniform float uNightGrey;
  uniform vec3 uLampColor;
  uniform float uLampBright;
  uniform float uLampReach;
  uniform int uLampCount;
  uniform vec3 uLamps[${xu}];
  uniform float uPlayerDark;
  uniform vec3 uTopDark;
  uniform float uVolOn;
  uniform highp sampler3D uLightVol;
  uniform vec3 uVolMin;
  uniform vec3 uVolInv;

  // col: the colour as lit by day; paint: the surface's own colour; p, n: world position and
  // normal (useNormal 0: light from every side, for unlit things); dark: share of the dark tint.
  vec3 nightColor(vec3 col, vec3 paint, vec3 p, vec3 n, float useNormal, float dark) {
    if (uNightOn < 0.5) return col;
    float pool;
    if (uVolOn > 0.5) {
      // Baked light (lightBake.ts): one lookup however many lights, smooth, walls already stop it.
      // a is the light summed, rgb the lights' directions summed; both coded as sign * t * t * max.
      // Read a little off the surface, along its normal: the cells right at a wall are the wall's own layer.
      vec3 q = useNormal > 0.5 ? p + n * ${I2.toFixed(2)} : p;
      vec4 vol = texture(uLightVol, clamp((q - uVolMin) * uVolInv, 0.0, 1.0));
      vec3 dir = (vol.rgb * 2.0 - 1.0) * abs(vol.rgb * 2.0 - 1.0) * ${Pp.toFixed(1)};
      float lit = vol.a * vol.a * ${Pp.toFixed(1)};
      // A surface takes the light it faces: all of it turned to the fittings, none of the direct light turned away.
      // A ceiling faces away from every fitting under it, yet a lit room has a lit ceiling: it takes a share of the
      // light's strength whatever the direction (the walls then meet it with no dark band).
      float facing = useNormal > 0.5 ? mix(dot(n, dir), ${L2.toFixed(2)} * length(dir), step(n.y, -0.7)) : length(dir);
      float e = 0.5 * (lit + facing);
      pool = smoothstep(${C2.toFixed(2)}, ${P2.toFixed(2)}, e);
    } else {
    float s = 0.0;
    for (int i = 0; i < ${xu}; i++) {
      if (i >= uLampCount) break;
      vec3 d = uLamps[i] - p;
      float dist = length(d);
      float f = max(0.0, 1.0 - dist / uLampReach);
      // A street lamp lights down: above the bulb its light fades out.
      f *= mix(${q2}, 1.0, smoothstep(0.35, -0.35, -d.y / max(dist, 1e-3)));
      float face = useNormal > 0.5 ? smoothstep(-0.15, 0.3, dot(n, d / max(dist, 1e-3))) : 1.0;
      s += f * f * face;
    }
    pool = smoothstep(${Ip} - 0.01, ${Ip} + 0.01, s) * ${Np}
      + smoothstep(${Dp} - 0.015, ${Dp} + 0.015, s) * ${1-Np};
    }
    vec3 grey = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    vec3 inDark = mix(col, grey, uNightGrey * dark) * mix(vec3(1.0), uNightTint, dark);
    // Out of lamp light the dark deepens with height: x the share left at the top, y and z where it starts and ends.
    inDark *= mix(1.0, uTopDark.x, smoothstep(uTopDark.y, max(uTopDark.z, uTopDark.y + 0.1), p.y) * dark);
    return mix(inDark, paint * uLampColor * uLampBright, pool);
  }
`;function J2(e){Object.assign(e.uniforms,b0),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vNightWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
    vec4 nightWorld = vec4( transformed, 1.0 );
    #ifdef USE_INSTANCING
      nightWorld = instanceMatrix * nightWorld;
    #endif
    vNightWorld = ( modelMatrix * nightWorld ).xyz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vNightWorld;
${M0}`).replace("#include <opaque_fragment>",`#ifdef NIGHT_ACTOR
      outgoingLight = nightColor(outgoingLight, outgoingLight, vNightWorld, vec3(0.0, 1.0, 0.0), 0.0, uPlayerDark);
    #else
      outgoingLight = nightColor(outgoingLight, outgoingLight, vNightWorld, vec3(0.0, 1.0, 0.0), 0.0, 1.0);
    #endif
    #include <opaque_fragment>`)}function w0(e,t=!1){return e.onBeforeCompile=J2,t&&(e.defines={...e.defines,NIGHT_ACTOR:""}),e}var bC=Promise.resolve();function Q2(){return lt.nightTint!=="#ffffff"||lt.lampReach>0}var MC=new R,wC=new R;var cn=null;function ew(){if(cn){cn.group.visible=Q2()&&lt.lampReach>0,cn.haloMat.color.set(lt.lampColor).multiplyScalar(lt.lampBright),cn.bulbMat.color.set(Z2).multiplyScalar(lt.lampBright),cn.tubeMat.color.set(K2).multiplyScalar(lt.lampBright);for(let e of cn.halos)e.visible=lt.lampHalo>0,e.scale.setScalar(Y2*lt.lampHalo)}}S0(ew);var E0={uSunCut:{value:0},uSunSoft:{value:0},uShadeTint:{value:new R},uPattern:{value:0},uPitch:{value:0},uWorldPitch:{value:0},uDotSize:{value:0},uDotStrength:{value:0},uDotInk:{value:0},uAnchor:{value:0},uRim:{value:0},uMottle:{value:0},uMottleSize:{value:1}};function T0(){let e=E0;e.uSunCut.value=lt.sunCut,e.uSunSoft.value=lt.sunSoft,e.uShadeTint.value.set(...j2(lt.shadeTint)),e.uPattern.value=g0.indexOf(lt.shadePattern),e.uPitch.value=lt.dotPitch,e.uWorldPitch.value=lt.worldPitch/100,e.uDotSize.value=lt.dotSize,e.uDotStrength.value=lt.dotStrength,e.uDotInk.value=v0.indexOf(lt.dotColor),e.uAnchor.value=_0.indexOf(lt.anchor),e.uRim.value=lt.rim,e.uMottle.value=lt.mottle,e.uMottleSize.value=lt.mottleSize}T0();S0(T0);var tw=`
  varying vec3 vLookWorld;
  varying vec3 vLookNormal;
`,iw=`
  #include <project_vertex>
  vec4 lookWorld = vec4( transformed, 1.0 );
  #ifdef USE_INSTANCING
    lookWorld = instanceMatrix * lookWorld;
  #endif
  vLookWorld = ( modelMatrix * lookWorld ).xyz;
  vLookNormal = ( vec4( transformedNormal, 0.0 ) * viewMatrix ).xyz;
`,rw=`
  uniform float uSunCut;
  uniform float uSunSoft;
  uniform vec3 uShadeTint;
  uniform float uPattern;
  uniform float uPitch;
  uniform float uWorldPitch;
  uniform float uDotSize;
  uniform float uDotStrength;
  uniform float uDotInk;
  uniform float uAnchor;
  uniform float uRim;
  uniform float uMottle;
  uniform float uMottleSize;
  varying vec3 vLookWorld;
  varying vec3 vLookNormal;
${M0}
  float lookHash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float lookNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(lookHash(i), lookHash(i + vec3(1, 0, 0)), f.x), mix(lookHash(i + vec3(0, 1, 0)), lookHash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(lookHash(i + vec3(0, 0, 1)), lookHash(i + vec3(1, 0, 1)), f.x), mix(lookHash(i + vec3(0, 1, 1)), lookHash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
`,aw=`
  {
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);
    float paintL = max(dot(diffuseColor.rgb, LUMA), 1e-3);
    float light = dot(outgoingLight, LUMA) / paintL;
    float sun = smoothstep(uSunCut - uSunSoft, uSunCut + uSunSoft, light);

    vec3 paint = diffuseColor.rgb;
    if (uMottle > 0.0) {
      vec3 q = vLookWorld / uMottleSize;
      float m = lookNoise(q) * 0.65 + lookNoise(q * 2.7 + 13.0) * 0.35;
      paint *= 1.0 + (m - 0.5) * 2.0 * uMottle;
    }
    vec3 shade = paint * uShadeTint;

    // Facing the sun but not lit: a cast shadow.
    float facing = 0.0;
    #if NUM_DIR_LIGHTS > 0
      facing = dot(normal, directionalLights[0].direction);
    #endif
    float inCast = step(0.08, facing);

    // The print pattern: on a 45-degree grid fixed to the screen like printed paper, or printed
    // on the surfaces in world space (on the plane the surface faces most).
    vec2 p;
    if (uAnchor < 0.5) {
      p = gl_FragCoord.xy * 0.70710678;
      p = vec2(p.x - p.y, p.x + p.y) / uPitch;
    } else {
      vec3 n = abs(vLookNormal);
      vec2 w = n.y > max(n.x, n.z) ? vLookWorld.xz : (n.x > n.z ? vLookWorld.zy : vLookWorld.xy);
      w *= 0.70710678;
      p = vec2(w.x - w.y, w.x + w.y) / uWorldPitch;
    }
    float dots = 1.0 - smoothstep(uDotSize - 0.04, uDotSize + 0.04, length(fract(p) - 0.5));
    float lineHalf = uDotSize * 0.5;
    float lines = 1.0 - smoothstep(lineHalf - 0.05, lineHalf + 0.05, abs(fract(p.x) - 0.5));
    // Where the pattern is finer than about two pixels it would shimmer: print its average instead.
    float fine = smoothstep(0.3, 0.6, length(fwidth(p)));
    dots = mix(dots, 3.14159 * uDotSize * uDotSize, fine);
    lines = mix(lines, uDotSize, fine);
    float pat = uPattern < 0.5 ? dots : uPattern < 1.5 ? lines : uPattern < 2.5 ? mix(dots, lines, inCast) : 0.0;
    shade = uDotInk > 0.5 ? mix(shade, vec3(0.22, 0.15, 0.4), pat * uDotStrength) : shade * (1.0 - pat * uDotStrength);

    vec3 lit = paint;
    if (uRim > 0.0) {
      float edge = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
      // Not on floors and roofs: seen at a grazing angle, a whole floor would light up.
      float rimMask = smoothstep(0.6, 0.64, edge) * step(0.0, facing) * (1.0 - smoothstep(0.6, 0.85, abs(normalize(vLookNormal).y)));
      lit = mix(lit, min(paint * 1.3 + 0.12, vec3(1.0)), rimMask * uRim);
    }
    outgoingLight = mix(shade, lit, sun);
    // At night: darkened, and lit warm round the lamps (night.ts).
    outgoingLight = nightColor(outgoingLight, paint, vLookWorld, normalize(vLookNormal), 1.0, 1.0);
  }
  #include <opaque_fragment>
`;function Qr(e={}){let t=new ry(e);return t.onBeforeCompile=i=>{Object.assign(i.uniforms,E0,b0),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
${tw}`).replace("#include <project_vertex>",iw),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
${rw}`).replace("#include <opaque_fragment>",aw)},t.customProgramCacheKey=()=>"toon",t}var Rs=new R;function Ti(e,t,i,r,a,n){let s=2*Math.PI*a/4,o=Math.max(n-2*a,0),l=Math.PI/4;Rs.copy(t),Rs[r]=0,Rs.normalize();let h=.5*s/(s+o),u=1-Rs.angleTo(e)/l;return Math.sign(Rs[i])===1?u*h:o/(s+o)+h+h*(1-u)}var el=class A0 extends yi{constructor(t=1,i=1,r=1,a=2,n=.1){let s=a*2+1;if(n=Math.min(t/2,i/2,r/2,n),super(1,1,1,s,s,s),this.type="RoundedBoxGeometry",this.parameters={width:t,height:i,depth:r,segments:a,radius:n},s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new R,h=new R,u=new R(t,i,r).divideScalar(2).subScalar(n),d=this.attributes.position.array,c=this.attributes.normal.array,p=this.attributes.uv.array,g=d.length/6,v=new R,m=.5/s;for(let f=0,x=0;f<d.length;f+=3,x+=2)switch(l.fromArray(d,f),h.copy(l),h.x-=Math.sign(h.x)*m,h.y-=Math.sign(h.y)*m,h.z-=Math.sign(h.z)*m,h.normalize(),d[f+0]=u.x*Math.sign(l.x)+h.x*n,d[f+1]=u.y*Math.sign(l.y)+h.y*n,d[f+2]=u.z*Math.sign(l.z)+h.z*n,c[f+0]=h.x,c[f+1]=h.y,c[f+2]=h.z,Math.floor(f/g)){case 0:v.set(1,0,0),p[x+0]=Ti(v,h,"z","y",n,r),p[x+1]=1-Ti(v,h,"y","z",n,i);break;case 1:v.set(-1,0,0),p[x+0]=1-Ti(v,h,"z","y",n,r),p[x+1]=1-Ti(v,h,"y","z",n,i);break;case 2:v.set(0,1,0),p[x+0]=1-Ti(v,h,"x","z",n,t),p[x+1]=Ti(v,h,"z","x",n,r);break;case 3:v.set(0,-1,0),p[x+0]=1-Ti(v,h,"x","z",n,t),p[x+1]=1-Ti(v,h,"z","x",n,r);break;case 4:v.set(0,0,1),p[x+0]=1-Ti(v,h,"x","y",n,t),p[x+1]=1-Ti(v,h,"y","x",n,i);break;case 5:v.set(0,0,-1),p[x+0]=Ti(v,h,"x","y",n,t),p[x+1]=1-Ti(v,h,"y","x",n,i);break}}static fromJSON(t){return new A0(t.width,t.height,t.depth,t.segments,t.radius)}};var Xi=.15,qe=.045,gt=.172,Yt=Wn,mP=Yt+.2,gP=Yt+.1,j0=e=>Math.sqrt(Yt*Yt-e*e),ll={near:{detail:1.5,rounded:!0},far:{detail:1,rounded:!1}},nw=8,sw=nw*Math.tan(78/360*Math.PI);function q0(e,t){return e*Math.tan(t/360*Math.PI)<sw?"near":"far"}var Is="near";function ow(e,t){let i=Is;Is=e;try{return t()}finally{Is=i}}var Wt=e=>Math.max(3,Math.round(e*ll[Is].detail)),lw=()=>ll[Is].rounded,hw=.12;function Y0(e,t,i){let r=Math.floor(e/i),a=Math.abs(Math.sin(r*12.9898+t*78.233)*43758.5453)%1,n=e-r*i-i*(.25+.5*a);return n>=0&&n<hw}var Z0=1.5*Math.PI,K0=e=>1-.07*Math.abs(Math.sin(4*e));function Vt(e,t,i=14){return{geo:new Rr(e.map(([r,a])=>new K(r,a)),Wt(i)),color:t}}function ks(e,t,i,r,a,n=16){return Vt([[t,i-r],[t,i],[e,i],[e,i-r],[t,i-r]],a,n)}function ta(e,t,i,r=14,a=1){let n=Wt(5),s=Math.acos(t/e),o=[];for(let l=n;l>=0;l--){let h=s*l/n;o.push([Math.sin(h)*e,t+(Math.cos(h)*e-t)*a])}return Vt(o,i,r)}function Dt(e,t,i,r=8,a=6){return{geo:new Qt(e,Wt(r),Wt(a)).translate(...t),color:i}}function Ri(e,t,i,r=[0,0,0]){let a=lw()?new el(...e,1,Math.min(.02,...e.map(n=>n*.3))):new yi(...e);return a.applyMatrix4(new We().makeRotationFromEuler(new vi(...r,"YXZ"))),{geo:a.translate(...t),color:i}}function Pr(e,t,i,r,a,n=10){return{geo:new hi(t,e,r,Wt(n)).translate(0,i+r/2,0),color:a}}function Lr(e,t,i,r,a=7){return nc(e,n=>t+(i-t)*n,r,a,6)}function nc(e,t,i,r=7,a=6){let n=new Bu(e.map(u=>new R(...u)));a=Wt(a),r=Wt(r);let s=n.getLength(),o=new Wf(n,a,1,r,!1),l=o.attributes.position,h=r+1;for(let u=0;u<=a;u++){let d=n.getPointAt(u/a),c=t(u/a,s);for(let p=0;p<h;p++){let g=u*h+p;l.setXYZ(g,d.x+(l.getX(g)-d.x)*c,d.y+(l.getY(g)-d.y)*c,d.z+(l.getZ(g)-d.z)*c)}}return{geo:o,color:i}}function ht(e){let t=new Be,i=e.map(({geo:r,color:a})=>{let n=r.index?r.toNonIndexed():r;n.deleteAttribute("uv"),t.set(a);let s=n.getAttribute("position").count,o=new Float32Array(s*3);for(let l=0;l<s;l++)o.set([t.r,t.g,t.b],l*3);return n.setAttribute("color",new qt(o,3)),n});return Na(i)}function sc(e,t,i){let r=e.attributes.position;for(let a=0;a<r.count;a++)r.setY(a,t+(r.getY(a)-t)*i)}function Ln(e,t,i,r){return e.geo.translate(t,i,r),e}function oc(e,t,i,r){return e.geo.applyMatrix4(new We().makeRotationFromEuler(new vi(t,i,r))),e}function ea(e,t,i,r){return e.geo.scale(t,i,r),e}function lc(e,t,i){return Lr(e,t,t,i,4)}function uw(e,t,i){let r=new Vi(e.map(([s,o])=>new K(s,o))),a=Math.min(.006,t/3),n=new Ar(r,{depth:t,bevelEnabled:!0,bevelThickness:a,bevelSize:a,bevelSegments:2,curveSegments:6});return n.translate(0,0,-t/2),{geo:n,color:i}}function ol(e,t,i,r,a=16,n=10){return{geo:new Qt(e,a,n,t[0],t[1],i[0],i[1]),color:r}}function hc(e){return ht(e).rotateX(-Xi)}function $0(e,t,i){let r=new Qt(e,24,14),a=r.attributes.position,n=new R;for(let s=0;s<a.count;s++){n.fromBufferAttribute(a,s);let o=K0(Math.atan2(n.x,n.z));a.setXYZ(s,n.x*o,n.y*t,n.z*o)}return r.computeVertexNormals(),{geo:r,color:i}}function cw(e,t,i,r,a){let n=-i;for(let s=0;s<2;s++){let o=i*K0(Math.atan2(e,n));n=-Math.sqrt(Math.max(0,o*o*(1-((t-a)/(i*r))**2)-e*e))}return n}var tc="#ef4d4d",ia="#f6f1e4",Ns="#ffd166",Wu="#ff7a1a",J0="#2fae72",Ps="#9b7be0",dw="#f28fb1",R0="#a4602c",pw="#6b3a1a",C0="#a9adc4",ka="#e8b84a",fw="#efe3c6",Xu="#2b2638",Cn="#ece0c4",ic="#f08a24",mw="#ffd84a";function gw(){let e=qe-.005,t=.172,i=1.06,r=[0,.1,.16],a=[];for(let n=0;n<11;n++){let s=n/11*Math.PI*2+.3,o=.45+n%2*.4,l=e+(Math.cos(o)*t-e)*i;a.push(Dt(.013,[Math.sin(s)*Math.sin(o)*(t+.002),l,Math.cos(s)*Math.sin(o)*(t+.002)],ia,5,3))}return{body:ht([ta(t,e,Ps,18,i),...a,Dt(.036,r,Ps,7,5),Lr([r,[-.035,.05,.215],[-.05,-.04,.22]],.024,.012,Ps),Lr([r,[.03,.06,.225],[.06,-.02,.232]],.024,.012,Ps)])}}function vw(){let e=qe-.01,t=1.35,i=.176,r=e+.03+(i-e-.03)*t;return{body:ht([ta(i,e+.03,J0,16,t),Vt([[.172,e],[.178,e+.03],[.172,e+.06],[.162,e+.06],[.162,e],[.172,e]],"#25895a",18),Dt(.055,[0,r+.035,0],ia)])}}function _w(){let e="#2b3a67",t=new hi(.15,.15,.014,14,1,!1,Math.PI/2,Math.PI);t.scale(1,1,1.4);let i=t.attributes.position;for(let a=0;a<i.count;a++)i.setY(a,i.getY(a)-1.6*i.getX(a)**2);t.rotateX(-.12).translate(0,qe+.014,-.04);let r=Pr(.022,.022,-.003,.006,ia,10);return r.geo.rotateX(Math.PI/2-.5).translate(0,qe+.06,-gt+.004),{body:ht([ta(gt,qe,e,16,1.12),{geo:t,color:e},Dt(.016,[0,qe+(gt-qe)*1.12,0],e,6,4),r])}}function yw(){let e=new hi(.15,.15,.014,12,1,!1,Math.PI/2,Math.PI);return e.scale(1,1,1.45).rotateX(-.1).translate(0,qe+.012,-.04),{body:ht([ta(gt,qe,tc,16,1.12),{geo:e,color:"#c73a3a"},Dt(.018,[0,qe+(gt-qe)*1.12,0],ia,6,4)])}}function xw(){return{body:ht([Ri([.25,.022,.25],[0,.1+.011,0],Wu),Pr(.112,.08,.1+.022,.075,Wu),Pr(.08,.055,.1+.097,.055,ia),Pr(.055,.018,.1+.152,.095,Wu)])}}function Sw(){let e=qe-.005,t=ks(.16,.255,e+.012,.012,R0,22),i=t.geo.attributes.position;for(let n=0;n<i.count;n++){let s=i.getX(n),o=Math.max(0,Math.hypot(s,i.getZ(n))-.185)/.07;i.setY(n,i.getY(n)+.06*o*(s/.255)**2)}let r=Vt([[gt,e],[.18,e+.12],[.168,e+.19],[.12,e+.205],[.05,e+.185],[0,e+.19]],R0,16),a=Vt([[.186,e+.012],[.185,e+.045],[.178,e+.045],[.179,e+.012],[.186,e+.012]],pw,16);return{body:ht([t,r,a])}}var Q0=.135,bw=Math.PI/2-.12,em=.28,P0=5,ju=(e,t)=>new $o(Q0,e,t,28).rotateX(bw).translate(0,em,.01);function Mw(){let e=[];for(let t=0;t<P0;t++){let i=t/P0*Math.PI*2+.3,r=t%2?.011:.015,a=new Hu(r,0).scale(.3,1,.3),n=new Hu(r*.8,0).scale(1,.3,.3),s=Q0+(t%2?.035:-.03);for(let o of[a,n])o.translate(Math.cos(i)*s,[.04,-.02,.025,.05,-.015][t],Math.sin(i)*s),e.push({geo:o,color:"#fff6c8"})}return e}function ww(){return{body:ht([{geo:ju(.017,6),color:"#fffdf2"}]),glow:ht([{geo:ju(.03,8),color:"#9c8a50"},{geo:ju(.08,12),color:"#b8921a"}]),spin:{geo:ht(Mw()),at:[0,em,.01],rate:.9},shine:!0}}function Ew(){let e=qe+.01,t=1.15,i=.182,r=Math.asin(e/(i+.004)),a=new $o(i+.004,.015,4,14,Math.PI-2*r).rotateZ(r).rotateY(Math.PI/2);sc(a,e,t);let n=ks(.16,.205,e+.006,.012,Ns,20),s=n.geo.attributes.position;for(let h=0;h<s.count;h++){let u=s.getZ(h);u<0&&Math.hypot(s.getX(h),u)>.2&&s.setZ(h,u*1.18)}let o=.12,l=Ri([.085,.045,.012],[0,e+(o-e)*t,-Math.sqrt(i*i-o*o)-.004],ia,[-.6,0,0]);return{body:ht([ta(i,e,Ns,18,t),n,{geo:a,color:"#f2b53c"},l])}}function Tw(){let e=[];for(let i=0;i<4;i++){let r=.148*(1-i/4),a=.148*(1-(i+1)/4);e.push(Pr(r,a,.08+.24*i/4,.24/4,i%2?Ns:dw,14))}e.push(Dt(.03,[0,.08+.24+.01,0],ia,7,5));let t=ht(e);return t.translate(0,-.08,0).rotateZ(-.18).translate(.015,.08,0),{body:t}}function Aw(){let e=gt,t=1.12,i=[tc,Ns,J0,Ps].map((n,s)=>({geo:new Qt(e,5,7,s*Math.PI/2,Math.PI/2,0,Math.acos(qe/e)),color:n}));for(let n of i)sc(n.geo,qe,t);i.push(ks(j0(qe+.012)+.008,.182,qe+.016,.02,Xu,18));let r=qe+(e-qe)*t;i.push(Pr(.009,.009,r-.01,.05,Xu,6));let a=ht([Ri([.26,.006,.045],[0,0,0],tc,[0,0,.25]),Ri([.045,.006,.26],[0,0,0],Ns,[.25,0,0]),Dt(.015,[0,0,0],Xu,6,4)]);return{body:ht(i),spin:{geo:a,at:[0,r+.04,0],rate:14}}}function Rw(){let e="#b8322f",t="#2f3a66",i=qe,r=gt+.004,a=1.1,n=[ta(r,i,e,18,a),ks(gt-.01,r+.01,i+.014,.018,ka,20)],s=[[i,r+.002,-.005,r+.012],[-.005,r+.01,-.055,r+.022],[-.055,r+.018,-.1,r+.03]],o=c=>new Rr(c.map(([p,g])=>new K(p,g)),18,-2.1,4.2);for(let[c,p,g,v]of s)n.push({geo:o([[v,g],[v+.012,g+.012*.5],[p+.012,c],[p,c-.012*.2],[v,g]]),color:t}),n.push({geo:o([[v+.004,g-.004],[v+.014,g+.006],[v+.004,g+.006],[v+.004,g-.004]]),color:ka});for(let c of[-1,1])n.push(Ri([.014,.06,.05],[c*.18,.005,-.115],t,[0,c*.5,0]));let l=.1,h=i+(l-i)/a,u=-Math.sqrt(r*r-h*h),d=Pr(.03,.03,-.008,.016,ka,14);d.geo.rotateX(Math.PI/2-.55).translate(0,l,u-.002),n.push(d);for(let c of[-1,1])n.push(Lr([[c*.01,l+.004,u+.004],[c*.05,l+.09,u-.02],[c*.09,l+.19,u]],.018,.006,ka));return{body:ht(n)}}function Cw(){let e=qe,t=1.15,i=.178,r=s=>Lr([[s*.15,.13,0],[s*.212,.15,-.01],[s*.24,.21,-.025],[s*.232,.28,-.04]],.048,.005,fw),a=Math.asin((e+.02)/(i+.003)),n=new $o(i+.003,.013,4,14,Math.PI-2*a).rotateZ(a).rotateY(Math.PI/2);return sc(n,e,t),{body:ht([ta(i,e,C0,18,t),Vt([[.178,e-.008],[.18,e+.03],[.172,e+.03],[.166,e-.008],[.178,e-.008]],ka,18),{geo:n,color:ka},Ri([.032,.085,.014],[0,e-.03,-.172],C0,[.15,0,0]),r(-1),r(1)])}}var qu=(e,t)=>typeof e=="function"?e(t):e;function tm(e){let t=[],i=[],r=[],a=[],n=[],s=[];for(let l of e){let h=t.length/3,u=l.geo.getAttribute("position");for(let c=0;c<u.count;c++)t.push(u.getX(c),u.getY(c),u.getZ(c)),i.push(l.part),r.push(...qu(l.a??[0,0,0],c)),a.push(...qu(l.b??[0,0],c)),n.push(qu(l.c??0,c));let d=l.geo.getIndex();if(d)for(let c=0;c<d.count;c++)s.push(h+d.getX(c));else for(let c=0;c<u.count;c++)s.push(h+c)}let o=new St;return o.setAttribute("position",new Ge(t,3)),o.setAttribute("aPart",new Ge(i,1)),o.setAttribute("aA",new Ge(r,3)),o.setAttribute("aB",new Ge(a,2)),o.setAttribute("aC",new Ge(n,1)),o.setIndex(s),o}function tl(){let e=new St;return e.setAttribute("position",new Ge(new Array(12).fill(0),3)),e.setIndex([0,1,2,2,1,3]),e}var An=[[-1,-1],[1,-1],[-1,1],[1,1]],hl=`
  uniform float uFxTime;
  float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
  float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
  }
`,im=`
  // A mesh that is not instanced (a stand, the model viewer) is drawn as one wearer at the origin.
  mat4 wearerMatrix() {
    #ifdef USE_INSTANCING
      return instanceMatrix;
    #else
      return mat4(1.0);
    #endif
  }
  // The wearer's own number (0 to 1), so two wearers never move together.
  float wearerSeed() {
    #ifdef USE_INSTANCING_COLOR
      return instanceColor.r;
    #else
      return 0.0;
    #endif
  }
`,Ai={height:.22,ring:.147,diskInner:.091,diskOuter:.175,tilt:32*Math.PI/180},Ls={disk:0,ring:1,spark:2,shock:3,jet:4},Pw=`
  ${hl}
  ${im}
  attribute float aPart;
  attribute vec3 aA;
  attribute vec2 aB;
  varying float vPart;
  varying vec2 vC;
  varying float vSeed;
  varying float vFade;
  void main() {
    float seed = wearerSeed();
    vPart = aPart;
    vC = aB;
    vSeed = seed;
    vFade = 1.0;
    vec3 centre = vec3(0.0, ${Ai.height.toFixed(3)}, 0.0);
    vec3 p = position;
    float size = 0.0;
    if (aPart > 1.5 && aPart < 2.5) {
      // A spark: it circles in the disk's plane and falls in, and starts again somewhere else.
      float ph = fract(uFxTime * (0.1 + 0.16 * aA.y) + aA.x + seed * 3.7);
      float a = aA.x * 6.2832 + ph * 3.4 + seed * 6.0;
      float r = mix(0.24, 0.1, ph * ph);
      vec3 q = vec3(cos(a) * r, (aA.z - 0.5) * 0.05 * (1.0 - ph), sin(a) * r);
      float ct = cos(${Ai.tilt.toFixed(4)});
      float st = sin(${Ai.tilt.toFixed(4)});
      p = centre + vec3(q.x, q.y * ct - q.z * st, q.y * st + q.z * ct);
      vFade = smoothstep(0.0, 0.12, ph) * (1.0 - smoothstep(0.75, 1.0, ph));
      size = 0.0098 + 0.007 * aA.y;
    } else if (aPart > 3.5) {
      // A jet: a streak along the hat's up axis, through the hole.
      vec4 c = modelViewMatrix * wearerMatrix() * vec4(centre, 1.0);
      vec3 upv = normalize((modelViewMatrix * wearerMatrix() * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      vec3 side = normalize(vec3(upv.y, -upv.x, 0.0));
      c.xyz += upv * aB.y * 0.14 + side * aB.x * 0.015;
      gl_Position = projectionMatrix * c;
      return;
    } else if (aPart > 0.5) {
      p = centre;
      size = ${Ai.ring.toFixed(3)};
    }
    vec4 mv = modelViewMatrix * wearerMatrix() * vec4(p, 1.0);
    if (aPart > 0.5) mv.xy += aB * size;
    gl_Position = projectionMatrix * mv;
  }
`,Lw=`
  ${hl}
  varying float vPart;
  varying vec2 vC;
  varying float vSeed;
  varying float vFade;
  void main() {
    vec3 col;
    float a;
    if (vPart < 0.5) {
      // The accretion disk: streaks that swirl, faster nearer the middle; one side is hotter.
      float r = length(vC);
      float t = clamp((r - ${Ai.diskInner.toFixed(3)}) / ${(Ai.diskOuter-Ai.diskInner).toFixed(3)}, 0.0, 1.0);
      float ang = atan(vC.y, vC.x);
      float w = ang - uFxTime * (1.9 - 1.1 * t) - vSeed * 6.2832;
      vec2 q = vec2(cos(w), sin(w));
      float streak = vnoise(q * 3.0 + vec2(0.0, t * 7.0)) * 0.6 + vnoise(q * 7.0 + vec2(t * 13.0, 3.0)) * 0.4;
      float hot = 0.7 + 0.3 * cos(ang + 1.0);
      col = mix(mix(vec3(1.0, 0.96, 0.75), vec3(1.0, 0.66, 0.16), smoothstep(0.0, 0.55, t)), vec3(0.62, 0.22, 0.05), smoothstep(0.5, 1.0, t));
      a = (0.3 + 0.7 * streak) * hot * smoothstep(0.0, 0.1, t) * (1.0 - smoothstep(0.7, 1.0, t));
      // Now and then a flare, at a random moment.
      float flare = pow(vnoise(vec2(uFxTime * 0.8, vSeed * 40.0)), 3.0);
      a *= 1.0 + 1.2 * flare;
      col *= 1.0 + 0.6 * flare;
      // The colours drift: now and then the disk turns from gold to a cold blue-white.
      float hue = 0.5 + 0.5 * sin(uFxTime * 0.55 + vSeed * 6.2832);
      col = mix(col, col.zyx * vec3(1.0, 1.0, 1.1), 0.65 * smoothstep(0.55, 0.95, hue));
    } else if (vPart < 1.5) {
      // The lens ring: light bent round the hole, a thin bright ring that ripples, and a haze outside it.
      float r = length(vC);
      float ang = atan(vC.y, vC.x);
      float ring = 0.62 + 0.02 * sin(ang * 3.0 + uFxTime * 1.7) + 0.011 * sin(ang * 7.0 - uFxTime * 2.3 + vSeed * 6.0);
      float d = r - ring;
      float core = exp(-d * d * 700.0);
      float haze = exp(-max(d, 0.0) * 7.0) * smoothstep(ring - 0.3, ring, r);
      a = (core * 0.85 + haze * 0.3) * (1.0 - smoothstep(0.82, 1.0, r));
      col = mix(vec3(1.0, 0.6, 0.18), vec3(1.0, 0.93, 0.68), core);
    } else if (vPart < 2.5) {
      float d = abs(vC.x) + abs(vC.y);
      a = pow(smoothstep(1.0, 0.15, d), 1.4) * vFade;
      col = vec3(1.0, 0.94, 0.68);
    } else if (vPart < 3.5) {
      // A shock wave: a ring that leaves the hole every few seconds and fades, at the wearer's own rhythm.
      float per = 3.5 + 2.5 * h11(vSeed * 91.0);
      float ph = fract((uFxTime + vSeed * 17.0) / per) / 0.3;
      if (ph > 1.0) discard;
      float r = length(vC);
      float d = r - (0.35 + 0.62 * (1.0 - pow(1.0 - ph, 2.0)));
      a = exp(-d * d * 500.0) * (1.0 - ph) * 0.8;
      col = mix(vec3(1.0, 0.7, 0.3), vec3(0.7, 0.85, 1.0), ph);
    } else {
      // A jet: it comes on for a moment at random, flickering, brightest at the hole.
      float per = 4.5 + 3.0 * h11(vSeed * 53.0 + 1.0);
      float ph = fract((uFxTime + vSeed * 29.0) / per);
      float on = smoothstep(0.0, 0.03, ph) * (1.0 - smoothstep(0.16, 0.24, ph));
      float flick = 0.6 + 0.4 * sin(uFxTime * 60.0 + vC.y * 8.0);
      float along = 1.0 - abs(vC.y);
      a = on * flick * pow(max(along, 0.0), 1.5) * smoothstep(1.0, 0.0, abs(vC.x)) * 0.9;
      col = mix(vec3(0.6, 0.8, 1.0), vec3(1.0, 0.95, 0.8), 1.0 - abs(vC.x));
    }
    if (a < 0.01) discard;
    gl_FragColor = vec4(col, min(a, 1.0));
  }
`,rm={puff:0,bolt:1},am=[.13,.57,.91],Pn={y:.236,drop:.14,levels:4},Iw=`
  ${hl}
  ${im}
  // A strike: x is the bolt's brightness (0 to 1), y the number of the cycle (so each strike lands somewhere new),
  // z the cloud's glow: it eases in before the strike, then snaps to full, strobes, and dies fast.
  vec3 strike(float s) {
    float P = 1.1 + 3.4 * h11(s * 7.3 + 1.7);
    float tt = uFxTime + h11(s) * P;
    float c = floor(tt / P);
    // Each cycle holds one strike at a random moment, and sometimes none at all.
    float x = tt - c * P - P * (0.1 + 0.8 * h11(c * 1.7 + s * 5.1));
    float skip = step(0.82, h11(c * 3.9 + s * 2.3));
    float ease = x < 0.0 ? 0.4 * smoothstep(-0.2, 0.0, x) * smoothstep(-0.2, 0.0, x) * (1.0 - skip) : 0.0;
    if (x < 0.0 || x > 0.26 || skip > 0.5) return vec3(0.0, c, ease);
    float f = exp(-x * 60.0) + 0.9 * exp(-abs(x - 0.06) * 120.0) * step(0.035, x) + 0.6 * exp(-abs(x - 0.12) * 130.0) * step(0.09, x);
    f = clamp(f, 0.0, 1.0);
    return vec3(f, c, max(f, 0.3 * exp(-x * 14.0)));
  }
`,Dw=`
  ${Iw}
  attribute float aPart;
  attribute vec3 aA;
  attribute vec2 aB;
  attribute float aC;
  varying float vPart;
  varying float vFlash;
  varying float vUp;
  varying float vBump;
  varying vec3 vPos;
  void main() {
    float seed = wearerSeed();
    vPart = aPart;
    vec3 p = position;
    vFlash = 0.0;
    vUp = 0.0;
    vBump = 0.0;
    if (aPart < 0.5) {
      // A puff: its billowing is on the CPU (animateStorm), so the ink pass sees the same shape. Here only the light.
      vec3 dn = normalize(position - aA);
      float f = 0.0;
      ${am.map(e=>`f = max(f, strike(${e.toFixed(2)} + seed * 13.1).z);`).join(`
      `)}
      vFlash = f;
      vUp = dn.y;
      vBump = 0.0;
    } else {
      // A bolt: it exists only while it strikes, at a new place with a new shape every time.
      vec3 st = strike(aB.x + seed * 13.1);
      if (st.x < 0.02) {
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        return;
      }
      float c = st.y;
      float s0 = aB.x + seed * 13.1;
      float ang = h11(c * 3.1 + s0) * 6.2832;
      float rad = 0.1 + 0.05 * h11(c * 5.3 + s0);
      vec2 out2 = vec2(cos(ang), sin(ang));
      float lv = aC;
      float inner = step(0.5, lv) * step(lv, ${(Pn.levels-.5).toFixed(1)});
      vec2 jit = vec2(h11(c + lv * 1.9 + s0) - 0.5, h11(c * 0.7 + lv * 3.3 + s0) - 0.5) * 0.05 * inner;
      float taper = 1.0 - lv * 0.12;
      p = vec3(out2.x * rad + out2.x * lv * 0.008 + jit.x + position.x * taper, ${Pn.y.toFixed(3)} - ${Pn.drop.toFixed(3)} * (0.75 + 0.25 * h11(c + s0)) * lv / ${Pn.levels.toFixed(1)}, out2.y * rad + out2.y * lv * 0.008 + jit.y + position.z * taper);
      vFlash = st.x;
    }
    vPos = p;
    gl_Position = projectionMatrix * modelViewMatrix * wearerMatrix() * vec4(p, 1.0);
  }
`,Nw=`
  ${hl}
  varying vec3 vPos;
  varying float vPart;
  varying float vFlash;
  varying float vUp;
  varying float vBump;
  void main() {
    if (vPart > 0.5) {
      gl_FragColor = vec4(mix(vec3(0.62, 0.8, 1.0), vec3(1.0), vFlash * 0.8), 1.0);
      return;
    }
    // Cartoon: three flat bands, like the smoke, lit from above; the ink pass draws the outline.
    float l = vUp * 0.5 + 0.5;
    vec3 col = l > 0.62 ? vec3(0.97, 0.98, 1.0) : l > 0.34 ? vec3(0.78, 0.83, 0.94) : vec3(0.58, 0.63, 0.8);
    // A strike lights the cloud from inside, most at its belly.
    col = mix(col, vec3(0.82, 0.92, 1.0), vFlash * (0.55 + 0.3 * (1.0 - l)));
    col += vFlash * vec3(0.12, 0.14, 0.2);
    gl_FragColor = vec4(col, 1.0);
  }
`,L0={};function Uw(e){let t=L0[e];if(!t){let i=e==="blackhole";t=new ni({uniforms:{uFxTime:wa},vertexShader:i?Pw:Dw,fragmentShader:i?Lw:Nw,transparent:i,depthWrite:!i,side:mi}),t.customProgramCacheKey=()=>`hatfx-${e}`,L0[e]=t}return t}var Cr=64;function kw(){let e=new Uint8Array(Cr*Cr*4);for(let i=0;i<Cr;i++)for(let r=0;r<Cr;r++){let a=(r+.5)/Cr*2-1,n=1-(i+.5)/Cr*2,s=a*a+n*n,o=Math.sqrt(Math.max(0,1-s)),l=Math.max(0,a*-.42+n*.6+o*.68),h=Math.pow(Math.max(0,l),18),u=n>0?.25*n:0,d=Math.exp(-Math.pow((n+.12)/.16,2))*.32,c=n<-.12?.14*Math.min(1,-n-.12):0,p=Math.min(1,.74+.22*l+u+c-d+.6*h),g=(i*Cr+r)*4;e[g]=Math.min(255,p*255*1),e[g+1]=Math.min(255,p*255*.985),e[g+2]=Math.min(255,p*255*.95),e[g+3]=255}let t=new En(e,Cr,Cr,Jt);return t.colorSpace=jt,t.minFilter=t.magFilter=Rt,t.needsUpdate=!0,t}var I0={};function Ow(e){let t=I0[e];return t||(t=new Yf({vertexColors:!0,matcap:kw()}),t.customProgramCacheKey=()=>`hatmatcap-${e}`,I0[e]=t),t}var nm=(e,t)=>e.glowKind?Uw(e.glowKind):t(),sm=(e,t,i)=>e.matcap?Ow(e.matcap):e.shine?t():i(),rc=e=>e-Math.floor(e),Rn=(e,t)=>rc(Math.sin(e*127.1+t*311.7)*43758.5453);function zw(e,t){let i=Math.floor(e),r=Math.floor(t),a=rc(e),n=rc(t),s=a*a*(3-2*a),o=n*n*(3-2*n),l=Rn(i,r)+(Rn(i+1,r)-Rn(i,r))*s,h=Rn(i,r+1)+(Rn(i+1,r+1)-Rn(i,r+1))*s;return l+(h-l)*o}function Fw(e,t){let i=e.userData.rest,r=e.getAttribute("position"),a=e.getAttribute("aPart"),n=e.getAttribute("aA"),s=e.getAttribute("aB");for(let o=0;o<r.count;o++){if(a.getX(o)!==0)continue;let l=n.getX(o),h=n.getY(o),u=n.getZ(o),d=i[o*3]-l,c=i[o*3+1]-h,p=i[o*3+2]-u,g=Math.hypot(d,c,p)||1,v=s.getX(o),m=s.getY(o),f=1+.06*Math.sin(t*m+v)+.025*Math.sin(t*m*1.7+v*2),x=zw(d/g*5+p/g*3+t*.2+v,c/g*6-t*.15),E=f*(.95+.1*x);r.setXYZ(o,l+.006*Math.sin(t*.25+v*1.7)+d*E,h+.004*Math.sin(t*.2+v*3.1)+c*E,u+.006*Math.cos(t*.22+v*2.3)+p*E)}r.needsUpdate=!0}function Bw(e){return e.userData.rest=Float32Array.from(e.getAttribute("position").array),e.getAttribute("position").setUsage(tf),e.userData.animate=t=>Fw(e,t),e}var Ds="#15111c",Us="#f2b92e",D0="#fff0b8",ac="#b07a0c",Hw={0:"abcdef",1:"bc",2:"abged",6:"acdefg",s:"afgcd",t:"fged"};function Gw(e,t,i,r,a=.006){let n=t*.55,s=t*.2,o=n+s*.9,l=[];return[...e].forEach((h,u)=>{let d=i[0]+((e.length-1)/2-u)*o,c=Hw[h]??"",p=(g,v,m,f)=>{if(c.includes(g)){let x=f?[n,s,a]:[s,t/2,a];l.push({geo:new yi(...x).translate(d+v,i[1]+m,i[2]),color:r})}};p("a",0,t/2-s/2,!0),p("g",0,0,!0),p("d",0,-t/2+s/2,!0),p("f",n/2-s/2,t/4,!1),p("b",-n/2+s/2,t/4,!1),p("e",n/2-s/2,-t/4,!1),p("c",-n/2+s/2,-t/4,!1)}),l}var Vw=.07,N0=22;function Ww(){let e=new zf(Ai.diskInner,Ai.diskOuter,Wt(28),4),t=e.getAttribute("position"),i=[];for(let r=0;r<t.count;r++)i.push([t.getX(r),t.getY(r)]);return e.rotateX(-Math.PI/2).rotateX(Ai.tilt).translate(0,Ai.height,0),{geo:e,part:Ls.disk,b:r=>i[r]}}function Xw(){let e=[Ww(),{geo:tl(),part:Ls.ring,b:t=>An[t]},{geo:tl(),part:Ls.shock,b:t=>An[t]}];for(let t of[1,-1])e.push({geo:tl(),part:Ls.jet,b:i=>[An[i][0],An[i][1]*0+t*(An[i][1]+1)/2]});for(let t=0;t<N0;t++){let i=[(t+.37*(t%3))/N0,t*.618%1,(t*.382+.2)%1];e.push({geo:tl(),part:Ls.spark,a:i,b:r=>An[r]})}return{body:ht([{geo:new Qt(Vw,Wt(10),Wt(8)).translate(0,Ai.height,0),color:Ds}]),glow:tm(e),glowKind:"blackhole",float:{lift:.045,bob:.014},shine:!0}}function jw(e=!1){let t=e?Us:"#ffd23f",i=e?Ds:"#1d1a24",r=1.25,a=ta(gt,qe,t,16,r),n=a.geo.attributes.position;for(let o=0;o<n.count;o++){let l=n.getZ(o);l<0&&n.setY(o,n.getY(o)+.025*Math.min(1,-l/gt)*Math.min(1,(n.getY(o)-qe)/.08))}let s=new hi(.15,.15,.012,14,1,!1,Math.PI/2,Math.PI);return s.scale(1,1,1.32).translate(0,qe+.008,-.03),{body:ht([a,...e?(()=>{let o=Math.acos(qe/gt);return[0,1,2,3,4,5].map(l=>{let h=Math.PI/6*(1+2*l),u=[];for(let d=0;d<=6;d++){let c=o*(1-d/6),p=Math.sin(c)*gt*1.012,g=qe+(Math.cos(c)*gt-qe)*r,v=-Math.cos(h)*p,m=v<0?.025*Math.min(1,-v/gt)*Math.min(1,(g-qe)/.08):0;u.push([Math.sin(h)*p,g+m,v])}return lc(u,.0026,Ds)})})():[],{geo:s,color:i},Ri([.05,.004,.035],[.03,qe+.016,-.17],ia,[0,.4,0]),Ri([.07,.016,.01],[0,qe+.012,j0(qe)+.01],i),Dt(.012,[0,qe+(gt-qe)*r+.006,0],t,6,4),...e?[{geo:new hi(.046,.046,.006,20).rotateX(Math.PI/2).translate(0,qe+.082,-.166),color:Ds},...Gw("1st",.034,[0,qe+.082,-.171],Us,.004)]:[]]).rotateY(Math.PI/2).rotateZ(-.08),matcap:e?"foil":void 0}}function qw(e=!1){let t="#c8b27a",i="#9c8656",r=qe-.01;return{body:ht([Vt([[gt,r],[.17,r+.08],[.15,r+.12],[.1,r+.135],[0,r+.138]],t,18),Vt([[.245,r-.055],[.247,r-.045],[gt+.004,r+.012],[gt-.002,r+.002],[.245,r-.055]],t,22),Vt([[.174,r+.03],[.175,r+.04],[.17,r+.04],[.169,r+.03],[.174,r+.03]],i,18),Vt([[.195,r-.012],[.23,r-.04],[.225,r-.04],[.19,r-.012],[.195,r-.012]],i,22),...e?[Vt([[gt+.003,r+.012],[.176,r+.05],[.171,r+.05],[gt-.002,r+.012],[gt+.003,r+.012]],Ds,22),Dt(.014,[.172,r+.045,0],Us,8,6),Vt([[.177,r+.052],[.178,r+.058],[.172,r+.058],[.171,r+.052],[.177,r+.052]],Us,22)]:[Dt(.016,[.172,r+.07,-.05],"#ef4d4d",6,4),Ln(oc(Pr(.012,0,0,.04,"#ffd166",6),0,0,-1.2),.181,r+.075,-.05)]])}}var Yu="#6d748a",U0=.0045;function Yw(){let e=[],t=(i,r,a,n,s)=>{for(let o=0;o<i;o++){let l=s+o/i*Math.PI*2,h=1+.18*Math.sin(o*2.7+r*40);e.push([Math.cos(l)*r*h,a+.006*Math.sin(o*1.9),Math.sin(l)*r*h,n*(1+.14*Math.sin(o*3.3)),.35+(o*.37+r*9)%1*.5])}};return t(7,.085,.231,.062,.2),t(6,.055,.268,.062,1),t(4,.026,.301,.042,.4),e}var Zw=Yw();function Kw(e){let t=[[-1,-1],[1,-1],[1,1],[-1,1]],i=[],r=[];for(let s=0;s<=Pn.levels;s++)for(let[o,l]of t)i.push(o*U0,0,l*U0),r.push(s);let a=[];for(let s=0;s<Pn.levels;s++)for(let o=0;o<4;o++){let l=s*4+o,h=s*4+(o+1)%4;a.push(l,h,l+4,h,h+4,l+4)}let n=new St;return n.setAttribute("position",new Ge(i,3)),n.setIndex(a),{geo:n,part:rm.bolt,b:[e,0],c:s=>r[s]}}function $w(){let e=Zw.map(([t,i,r,a,n],s)=>({geo:new Qt(a,Wt(6),Wt(4)).translate(t,i,r),part:rm.puff,a:[t,i,r],b:[s*1.7,n]}));return{body:ht([Dt(.07,[0,.268,0],Yu,7,5),Dt(.06,[.045,.246,.02],Yu,7,5),Dt(.06,[-.045,.246,-.02],Yu,7,5)]),glow:Bw(tm([...e,...am.map(Kw)])),glowKind:"storm",float:{lift:0,bob:.014},shine:!0}}var Jw=.72,uc=e=>e%2?ac:Us;function k0(e,t,i,r,a){let n=[[t[0],t[1]],[e[0],e[1]],[e[0]-i,e[1]],[t[0]-i,t[1]],[t[0],t[1]]].map(([s,o])=>new K(s,o));return{geo:new Rr(n,Wt(18),a-Math.PI,2*(Math.PI-a)),color:r}}function Qw(){let e=gt+.008,t=qe-.005,i=[],r=5;for(let a=0;a<r;a++){let n=Math.acos(t/e)*(1-a/r),s=Math.acos(t/e)*(1-(a+1)/r),o=h=>[Math.sin(h)*e,Math.cos(h)*e*1.08],l=a===r-1?[0,o(s)[1]]:o(s);i.push({geo:new Rr([new K(...o(n)),new K(l[0],l[1])],Wt(18)),color:uc(a)})}return i}function O0(e){let t=[];for(let i=0;i<6;i++){let r=-.045-i*.032,a=.05+i*.004,n=new yi(a,.032,.018).translate(e*.2,r,-.06);t.push({geo:n,color:uc(i+1)})}return t}function eE(){let e=[[.18,.07],[.2,.03],[.224,-.01],[.245,-.045]],t=e.slice(1).map((i,r)=>k0(e[r],i,.012,uc(r),Jw));return{body:ht([...Qw(),...t,...O0(1),...O0(-1),k0([gt+.012,qe+.012],[gt+.014,qe-.012],.01,D0,0),Lr([[0,-.04,.2],[0,-.1,.205],[0,-.16,.19]],.03,.018,ac),Lr([[0,qe,-.19],[0,qe+.03,-.2],[0,qe+.06,-.19]],.011,.008,D0),Dt(.017,[0,qe+.072,-.188],ac,6,5)])}}function tE(e,t){let i=[];return e.forEach((r,a)=>{let n=e[(a+1)%e.length],s=Math.max(1,Math.ceil(Math.hypot(n[0]-r[0],n[1]-r[1])/t));for(let o=0;o<s;o++)i.push([r[0]+(n[0]-r[0])*o/s,r[1]+(n[1]-r[1])*o/s])}),i}var iE=e=>e.reduce((t,i,r)=>{let a=e[(r+1)%e.length];return t+i[0]*a[1]-a[0]*i[1]},0)/2;function z0(e,t){return t.map(([i,r,a])=>{let[n,s,o]=[e[i],e[r],e[a]];return(s[0]-n[0])*(o[1]-n[1])-(s[1]-n[1])*(o[0]-n[0])<0?[i,r,a]:[i,a,r]})}function F0(e,t){let i=!1;return t.forEach((r,a)=>{let n=t[(a+1)%t.length];r[1]>e[1]!=n[1]>e[1]&&e[0]<r[0]+(e[1]-r[1])*(n[0]-r[0])/(n[1]-r[1])&&(i=!i)}),i}function rE(e,t,i){let[r,a]=[i[0]-t[0],i[1]-t[1]],n=Math.max(0,Math.min(1,((e[0]-t[0])*r+(e[1]-t[1])*a)/(r*r+a*a||1)));return Math.hypot(e[0]-t[0]-n*r,e[1]-t[1]-n*a)}function aE(e,t,i,r,a){let n=i.map(l=>l[0]),s=i.map(l=>l[1]),o=[i,...r].flatMap(l=>l.map((h,u)=>[h,l[(u+1)%l.length]]));for(let l=Math.min(...s)+a/2;l<Math.max(...s);l+=a*.866){let h=Math.round(l/(a*.866))%2?a/2:0;for(let u=Math.min(...n)+h;u<Math.max(...n);u+=a){let d=[u,l];if(!F0(d,i)||r.some(f=>F0(d,f))||o.some(([f,x])=>rE(d,f,x)<a*.55))continue;let c=t.findIndex(([f,x,E])=>{let y=(w,A)=>(A[0]-w[0])*(d[1]-w[1])-(A[1]-w[1])*(d[0]-w[0])<=0;return y(e[f],e[x])&&y(e[x],e[E])&&y(e[E],e[f])});if(c<0)continue;let[p,g,v]=t[c],m=e.push(d)-1;t[c]=[p,g,m],t.push([g,v,m],[v,p,m])}}return t}function nE(e,t){let i=(a,n,s)=>(n[0]-a[0])*(s[1]-a[1])-(n[1]-a[1])*(s[0]-a[0])<-1e-12,r=(a,n,s,o)=>{let[l,h,u,d,c,p]=[a[0]-o[0],a[1]-o[1],n[0]-o[0],n[1]-o[1],s[0]-o[0],s[1]-o[1]];return(l*l+h*h)*(u*p-c*d)-(u*u+d*d)*(l*p-c*h)+(c*c+p*p)*(l*d-u*h)<-1e-14};for(let a=0;a<30;a++){let n=new Map;t.forEach((l,h)=>l.forEach((u,d)=>{let c=l[(d+1)%3],p=u<c?`${u},${c}`:`${c},${u}`;n.set(p,[...n.get(p)??[],[h,d]])}));let s=new Set,o=!1;for(let l of n.values()){if(l.length!==2)continue;let[[h,u],[d,c]]=l;if(s.has(h)||s.has(d))continue;let p=t[h],g=t[d],[v,m,f]=[p[u],p[(u+1)%3],p[(u+2)%3]],x=g[(c+2)%3],[E,y,w,A]=[e[v],e[m],e[f],e[x]];!r(E,y,w,A)||!i(w,E,A)||!i(w,A,y)||(t[h]=[f,v,x],t[d]=[f,x,m],s.add(h).add(d),o=!0)}if(!o)break}return t}function sE(e,t,i,r){for(let a=0;a<6;a++){let n=new Map,s=(l,h)=>{let u=l<h?`${l},${h}`:`${h},${l}`,d=n.get(u);return d===void 0&&(d=-1,r(e[l]).distanceTo(r(e[h]))>i&&(e.push([(e[l][0]+e[h][0])/2,(e[l][1]+e[h][1])/2]),d=e.length-1),n.set(u,d)),d},o=[];for(let l of t){let h=[s(l[0],l[1]),s(l[1],l[2]),s(l[2],l[0])],u=h.filter(x=>x>=0).length,d=0;u===1&&(d=h.findIndex(x=>x>=0)),u===2&&(d=(h.findIndex(x=>x<0)+1)%3);let[c,p,g]=[l[d],l[(d+1)%3],l[(d+2)%3]],[v,m,f]=[h[d],h[(d+1)%3],h[(d+2)%3]];u===0?o.push([c,p,g]):u===1?o.push([c,v,g],[v,p,g]):u===2?o.push([c,v,m],[v,p,m],[c,m,g]):o.push([c,v,f],[v,p,m],[f,m,g],[v,m,f])}if(t=o,![...n.values()].some(l=>l>=0))break}return t}function il(e,t){let i=new St;return i.setAttribute("position",new Ge(e,3)),t?i.setAttribute("normal",new Ge(t,3)):i.computeVertexNormals(),i}function oE(e,t){let[i,r,a]=t.oval,n=(S,L)=>(S/i)**2+((L-a)/r)**2<=1,s=(S,L)=>cw(S,L,t.r,t.squash,t.lift),o=([S,L])=>new R(S,L,s(S,L)-.002),l=([S,L])=>new R((s(S+.001,L)-s(S-.001,L))/(2*.001),(s(S,L+.001)-s(S,L-.001))/(2*.001),-1).normalize(),h=e.geo.index?e.geo.toNonIndexed():e.geo,u=h.attributes.position,d=h.attributes.normal,[c,p]=[[],[]];for(let S=0;S<u.count;S+=3){let L=!0;for(let P=S;P<S+3;P++)L&&=u.getZ(P)<0&&n(u.getX(P),u.getY(P));if(!L)for(let P=S;P<S+3;P++)c.push(u.getX(P),u.getY(P),u.getZ(P)),p.push(d.getX(P),d.getY(P),d.getZ(P))}let g=Wt(10)/10,v=t.holes.map(S=>tE(iE(S)>0?S:[...S].reverse(),.012/g)),m=[],f=Wt(28);for(let S=0;S<f;S++)m.push([i*Math.cos(2*Math.PI*S/f),a+r*Math.sin(2*Math.PI*S/f)]);let x=[...m,...v.flat()],E=tr.triangulateShape(m.map(S=>new K(...S)),v.map(S=>S.map(L=>new K(...L)))),y=sE(x,nE(x,aE(x,z0(x,E),m,v,.03/g)),.08/g,o),[w,A]=[[],[]];for(let S of y)for(let L of S){let P=o(x[L]),N=l(x[L]);w.push(P.x,P.y,P.z),A.push(N.x,N.y,N.z)}let[C,_]=[[],[]];for(let S of v){S.forEach((P,N)=>{let V=S[(N+1)%S.length],[D,F]=[o(P),o(V)],[Y,G]=[D.clone().setZ(D.z+t.depth),F.clone().setZ(F.z+t.depth)];for(let re of[D,Y,F,F,Y,G])C.push(re.x,re.y,re.z);for(let re of[D,F,Y,F,G,Y])C.push(re.x,re.y,re.z)});let L=z0(S,tr.triangulateShape(S.map(P=>new K(...P)),[]));for(let P of L)for(let N of P){let[V,D]=S[N];_.push(V,D,s(V,D)+t.depth)}}return[{geo:il(c,p),color:t.skin},{geo:il(w,A),color:t.skin},{geo:il(C),color:t.wall},{geo:il(_,_.map((S,L)=>L%3===2?-1:0)),color:t.glow}]}var lE="#d97a22",hE=.032,Zu=(e,t,i)=>e.map(([r,a])=>[r+t,a+i]);function uE(){let e=$0(.205,.88,ic);e.geo.translate(0,.01,0);let t=[...[-1,1].map(r=>Zu([[-.038,-.024],[.038,-.024],[r*.012,.034]],r*.068,.055)),Zu([[-.018,-.012],[.018,-.012],[0,.016]],0,.008),Zu([[-.12,.03],[-.075,-.004],[-.048,-.01],[-.048,-.034],[-.022,-.034],[-.022,-.014],[.022,-.014],[.022,-.034],[.048,-.034],[.048,-.01],[.075,-.004],[.12,.03],[.09,-.035],[.045,-.062],[.013,-.068],[.013,-.046],[-.013,-.046],[-.013,-.068],[-.045,-.062],[-.09,-.035]],0,-.035)],i=oE(e,{r:.205,squash:.88,lift:.01,oval:[.17,.145,-.005],holes:t,depth:hE,skin:ic,wall:lE,glow:mw});return i.push(Lr([[0,.17,0],[.01,.22,.01],[.04,.245,.015]],.02,.014,"#6f8a3a")),{body:hc(i)}}function cE(){let e=$0(.12,.72,ic);return e.geo.translate(0,.2,0),{body:ht([e,Lr([[0,.27,0],[.005,.31,.005],[.025,.33,.01]],.016,.011,"#6f8a3a"),lc([[0,.28,0],[.05,.3,-.02],[.07,.28,-.05],[.05,.27,-.06]],.004,"#4c7a2a")])}}var om=.6,nl=.12,B0=gt-om*nl;function dE(){let e="#4b2f6b",t="#ff8a2a",i=qe-.005,r=u=>gt-om*u,a=ks(.165,.255,i+.012,.012,e,24),n=a.geo.attributes.position;for(let u=0;u<n.count;u++){let d=Math.max(0,Math.hypot(n.getX(u),n.getZ(u))-.2)/.055;n.setY(u,n.getY(u)+.02*d*Math.sin(3*Math.atan2(n.getX(u),n.getZ(u))))}let s=nc([[0,i,0],[0,i+.06,0],[0,i+.115,0],[.01,i+.19,.015],[.06,i+.25,.05],[.12,i+.25,.1]],(u,d)=>{let c=u*d;return c<nl?r(c):B0-(B0-.008)*((c-nl)/(d-nl))},e,18,14),[o,l,h]=[.012,.068,.04];return{body:ht([a,s,Dt(.009,[.12,i+.25,.1],e,6,4),Vt([[r(o)+.012,i+o],[r(l)+.012,i+l],[r(l)-.003,i+l],[r(o)-.003,i+o],[r(o)+.012,i+o]],t,18),Ri([.05,.05,.012],[0,i+h,-(r(h)+.014)],ka,[.54,0,0]),Ri([.024,.026,.014],[0,i+h,-(r(h)+.015)],e,[.54,0,0])])}}var pE="#3a2f4d",fE="#e98fb0",mE=.32,gE=.35,H0=.55,Ku=1.35,sl=[[.001,-.02],[.03,-.02],[.036,.012],[.035,.04],[.027,.07],[.015,.095],[.001,.112]];function vE(e){for(let t=1;t<sl.length;t++){let[i,r]=sl[t-1],[a,n]=sl[t];if(e<=n)return i+(a-i)*(e-r)/(n-r)}return 0}function G0(e){let t=ea(Vt(sl,pE,14),1,1,H0),i=uw([[-.018,0],[.018,0],[.022,.035],[.015,.065],[.004,.09],[-.012,.055],[-.02,.025]],.004,fE),r=i.geo.attributes.position;for(let a=0;a<r.count;a++){let n=-H0*Math.sqrt(Math.max(0,vE(r.getY(a))**2-r.getX(a)**2));r.setZ(a,n+r.getZ(a)-.0015)}return i.geo.computeVertexNormals(),[t,i].map(a=>Ln(oc(ea(a,Ku,Ku,Ku),-.12,-e*gE,-e*mE),e*.098,.118,.005))}function _E(){return{body:ht([...G0(1),...G0(-1)])}}var rl="#1c1726",Ua=(e,t,i)=>[e,t,-Math.sqrt(Math.max(0,Yt*Yt-e*e-t*t))-i];function yE(){let e=[ol(Yt+.012,[Z0-1.35,2.7],[.55,1.95],Cn,20,12)],t=Yt+.014,i=1.12;e.push(Ln(ea(ol(t,[0,2*Math.PI],[0,1.05],Cn,20,10),1,i,1),0,-t*Math.cos(1.05)*(i-1),0));for(let r of[-1,1]){let a=ea(Dt(.038,[0,0,0],rl,8,6),1.1,1,.35);a.geo.rotateZ(r*.2).translate(...Ua(r*.06,.03,.01)),e.push(a)}for(let r of[-1,1]){let a=ea(Dt(.014,[0,0,0],rl,6,4),.8,1.3,.35);a.geo.rotateZ(r*.25).translate(...Ua(r*.012,-.03,.008)),e.push(a)}e.push(Ri([.108,.008,.008],Ua(0,-.078,.012),rl));for(let r=-3;r<=3;r++)e.push(Ri([.013,.026,.008],Ua(r*.016,-.064,.011),"#fbf6e8"));return e.push(lc([Ua(-.03,.115,.012),Ua(-.045,.085,.014),Ua(-.035,.065,.014)],.003,rl)),{body:hc(e)}}var V0="#241f2a",xE="#2b262e",SE="#d9cfb4",bE="#ffbe3a",ME="#e8801e",wE="#17131c",$u=(e,t,i)=>[e,t,-Math.sqrt(Math.max(0,Yt*Yt-e*e-t*t))-i],Ju=e=>e.map(t=>oc(t,-Xi,0,0));function EE(){let e=qe-.005,t=[Vt([[.262,e-.004],[.262,e+.005],[.21,e+.015],[.16,e+.018],[.16,e+.006],[.21,e+.004],[.262,e-.004]],Cn,20),Pr(gt,.13,e,.17,Cn,18),Vt([[.18,e+.012],[.174,e+.046],[.168,e+.046],[.172,e+.012],[.18,e+.012]],xE,16),Vt([[.1805,e+.026],[.1785,e+.033],[.1745,e+.033],[.1765,e+.026],[.1805,e+.026]],SE,14)],i=[ol(Yt+.013,[0,2*Math.PI],[1,Math.PI-1],V0,16,8),Vt([[.16,-.1],[.2,-.15],[.215,-.2],[.205,-.215],[.15,-.16],[.16,-.1]],V0,14)],r=[ol(Yt+.02,[Z0-.6,1.2],[1.1,1],Cn,12,7)],a=[];for(let n of[-1,1]){let s=n*.06;r.push(Ln(ea(Dt(.047,[0,0,0],wE,10,5),1,1,.45),...$u(s,.01,.014))),a.push(Ln(ea(Dt(.043,[0,0,0],ME,12,6),1,1,.4),...$u(s,.01,.022))),a.push(Ln(ea(Dt(.03,[0,0,0],bE,12,6),1,1,.55),...$u(s,.01,.03)))}return r.push(nc([[0,.008,-.14],[0,.003,-.23],[0,-.006,-.33],[0,-.022,-.43]],n=>.058*(1-n)**.85+.002,Cn,8,8)),{body:ht([...t,...Ju(i),...Ju(r)]),lamp:ht(Ju(a))}}var Cs="#efe6cc",al="#c9b98f",W0="#9a8a63",Qu=-.028,ec=.04,TE=.8;function Wi(e,t,i,r,a=[0,0],n=0,s=3){let o=Yt+i,l=[];for(let u=0;u<=s;u++){let d=Math.max(-o,Math.min(o,e+(t-e)*u/s)),c=u>0&&u<s?.004:0;l.push(new K(Math.max(.001,Math.sqrt(o*o-d*d)+c),d))}let h=n>0?new Rr(l,Wt(18),n-Math.PI,2*(Math.PI-n)):new Rr(l,Wt(18));return h.rotateX(a[0]).rotateZ(a[1]),{geo:h,color:r}}function AE(){let e=[Wi(ec-.004,Yt+.01,.004,W0,[0,0],0,4),Wi(-Yt-.01,Qu+.004,.004,W0,[0,0],0,4),Wi(Qu-.002,ec+.002,.006,Cs,[0,0],TE,2),Wi(ec,.08,.009,Cs),Wi(.07,.115,.012,al,[.2,0]),Wi(.1,.14,.009,Cs,[0,.25]),Wi(.128,Yt+.02,.013,al,[-.18,.1]),Wi(-.072,Qu,.009,Cs),Wi(-.108,-.062,.012,al,[0,-.22]),Wi(-Yt-.02,-.098,.009,Cs,[.16,0]),Wi(-.014,.014,.014,al,[0,Math.PI/2],0,2)];return{body:hc(e)}}var RE={cap:yw,beanie:vw,hardhat:Ew,bandana:gw,cowboy:Sw,viking:Cw,party:Tw,propeller:Aw,cone:xw,halo:ww,bentcap:_w,samurai:Rw,pioneer:()=>qw(!0),founder:()=>jw(!0),blackhole:Xw,thundercloud:$w,pharaoh:eE,witch:dE,pumpkin:cE,jackolantern:uE,batears:_E,skullmask:yE,plague:EE,mummy:AE},X0=new Map;function CE(e,t){let i=RE[e];if(!i)throw new Error(`no model for hat ${e}`);return ow(t,i)}function Ir(e,t="near"){let i=`${e}:${t}`,r=X0.get(i);if(r)return r;let a=CE(ki[e].key,t);return X0.set(i,a),a}var Ml=.105,lm=.045,PE=.055,LE=5,IE=Math.sqrt(Wn*Wn-Ml*Ml)-.005;function DE(){let e=LE*2,t=new hi(Ml*1.12,Ml,lm,e,1,!0),i=t.attributes.position;for(let r=0;r<=e;r++)r%2===0&&i.setY(r,i.getY(r)+PE);return t.translate(0,lm/2,0),t.computeVertexNormals(),t}var Va="#c27a3e",Sl="#8f5428",Ze="#5b5675",ne="#3a3350",Ii="#e8b84a",Km="#14111c",Os=.010999999999999996,hm=Array.from({length:6},(e,t)=>[Math.cos(Math.PI/6+t*Math.PI/3)*.034,Math.sin(Math.PI/6+t*Math.PI/3)*.034]),Wa="#cfd0e0",NE="#d6453a",at="#2e2a3a",hr="#7a8a4e",Fs="#556236",UE="#a4502c",um="#7fd0f0";function Si(e,t,i,r){let a=(i+r)/2;return[{shape:"box",size:[.012,.007,r-i],pos:[0,t,a],color:ne},{shape:"box",size:[.012,e-t,.007],pos:[0,(e+t)/2,i],color:ne},{shape:"box",size:[.007,.03,.009],pos:[0,e-.013,a-.004],rotX:.3,color:Ii}]}function ul(e,t,i,r){let a=e-t,n=-Math.atan2(r-i,a);return[{name:"mag",shape:"box",size:[.026,a,.03],pos:[0,(e+t)/2,(i+r)/2],rotX:n,color:ne},{name:"mag",shape:"box",size:[.034,.012,.044],pos:[0,t-.004,r+.002],rotX:n,color:at}]}function cm(e){let t=e.depth/2,i=[],r=[],[a,n]=e.top,s=e.lean[0];for(let o=0;o<=12&&(s=e.lean[0]+(e.lean[1]-e.lean[0])*o/12,i.push([a+Math.sin(s)*t,n-Math.cos(s)*t]),r.push([a-Math.sin(s)*t,n+Math.cos(s)*t]),o!==12);o++){let l=s+(e.lean[1]-e.lean[0])/12/2;a-=Math.cos(l)*e.length/12,n-=Math.sin(l)*e.length/12}return[{name:"mag",shape:"profile",size:[e.width,0,0],pos:[0,0,0],outline:[...i,...r.reverse()],color:e.color},{name:"mag",shape:"box",size:[e.width+.002,.012,e.depth+.004],pos:[0,a-Math.cos(s)*.002,n-Math.sin(s)*.002],rotX:s,color:ne}]}function cl(e,t,i,r,a,n){return Array.from({length:a},(s,o)=>({name:"slide",shape:"box",size:[e+.0015,i,.003],pos:[0,t,r+o*.008],color:n}))}var dm=[[.012,-.004],[-.03,.006],[-.07,.017],[-.098,.026],[-.098,.074],[-.06,.066],[-.02,.056],[.012,.05],[.03,.064],[.034,.058],[.034,.028],[.013,.028]];function dl(e,t,i,r){let a=i/2,n=t+r-a,s=[];for(let o=0;o<=8;o++)s.push([e+a*Math.cos(o/8*Math.PI),n+a*Math.sin(o/8*Math.PI)]);return[[e-a,t],[e+a,t],...s]}function pm(e,t,i,r=0,a=2*Math.PI,n=16){return Array.from({length:n+1},(s,o)=>{let l=r+(a-r)*o/n;return[e+i*Math.cos(l),t+i*Math.sin(l)]})}function Bs(e,t,i,r,a,n,s={}){let o=i+r,l=a/2,h=Math.asin(l/o),u=pm(0,t,o,-Math.PI/2+h,3*Math.PI/2-h,20);return{name:"sights",shape:"plate",size:[0,0,.008],pos:[0,0,e],outline:[[-l,n],[l,n],...u],hole:pm(0,t,i,0,2*Math.PI,20).slice(0,-1),color:ne,...s}}function Nr(e,t,i,r,a,n={}){let s=i+Math.min(.01,(t-i)/2),o=[[-a/2,i],[a/2,i],[r/2,s],[r/2,t],[-r/2,t],[-r/2,s]];return{name:"sights",shape:"plate",size:[0,0,.008],pos:[0,0,e],outline:o,color:ne,...n}}function Uc(e,t,i,r,a,n={}){let s=r/2,o=s+a,l=[[-o,i],[o,i],[o,t],[s,t],[s,i+.002],[-s,i+.002],[-s,t],[-o,t]];return{name:"sights",shape:"plate",size:[0,0,.009],pos:[0,0,e],outline:l,color:ne,...n}}function cc(e,t,i,r,a){let n={name:"slide",iron:!0,color:a};return[Nr(e,i,r,.0035,.01,n),Uc(t,i,r,.022,.005,n)]}function wl(e){return Array.from({length:6},(t,i)=>[Math.cos(i*Math.PI/3)*e,Math.sin(i*Math.PI/3)*e])}var kE={[he.Pistol]:{parts:[{name:"slide",shape:"box",size:[.032,.03,.186],pos:[0,.05,-.063],color:ne},...cl(.032,.05,.02,.004,3,at),{name:"slide",shape:"box",size:[.003,.012,.03],pos:[.0155,.055,-.03],color:at},...cc(-.15,.02,.09,.065,at),{shape:"box",size:[.03,.022,.161],pos:[0,.024,-.0525],color:at},{shape:"box",size:[.024,.01,.04],pos:[0,.009,-.11],color:at},{shape:"profile",size:[.036,0,0],pos:[0,0,0],outline:dm,color:at},...ul(0,-.095,.022,.05),...Si(.013,-.022,-.042,-.004)],muzzle:[0,.052,-.158],grip:[0,-.04,.04],support:null,sight:.09,aimEye:.2,kick:5,mount:[.065,-.03],mountOn:"slide"},[he.Compact]:{parts:[{name:"slide",shape:"box",size:[.033,.026,.165],pos:[0,.047,-.052],color:Ze},{name:"slide",shape:"cylZ",size:[.0155,.165,0],pos:[0,.055,-.052],color:Ze,sides:8},...cl(.033,.047,.018,.006,3,ne),...cc(-.13,.022,.09,.07,ne),{shape:"box",size:[.012,.016,.012],pos:[0,.044,.038],rotX:.5,color:ne},{shape:"box",size:[.031,.022,.143],pos:[0,.024,-.0435],color:at},{shape:"profile",size:[.036,0,0],pos:[0,0,0],outline:[[.014,-.002],[-.03,.006],[-.088,.018],[-.088,.064],[-.03,.056],[.014,.048],[.03,.052],[.034,.048],[.034,.028],[.014,.028]],color:at},...ul(0,-.085,.022,.042),...Si(.014,-.024,-.04,-.002),{shape:"box",size:[.012,.007,.016],pos:[0,-.019,-.036],rotX:.8,color:ne}],muzzle:[0,.05,-.137],grip:[0,-.04,.036],support:null,sight:.09,aimEye:.2,kick:6,mount:[.069,-.03],mountOn:"slide"},[he.Deagle]:{parts:[{shape:"box",size:[.036,.03,.228],pos:[0,.02,-.051],color:Wa},{name:"slide",shape:"box",size:[.042,.034,.13],pos:[0,.052,0],color:Wa},...cl(.042,.052,.024,.024,4,Ze),Uc(.058,.098,.069,.026,.006,{name:"slide",iron:!0}),{shape:"box",size:[.038,.032,.15],pos:[0,.052,-.14],color:Wa},{shape:"box",size:[.02,.01,.15],pos:[0,.073,-.14],color:Ze},Nr(-.205,.098,.078,.004,.01),{shape:"cylZ",size:[.009,.004,0],pos:[0,.05,-.216],color:ne,sides:8},{shape:"box",size:[.014,.02,.014],pos:[0,.05,.072],rotX:.5,color:ne},{shape:"profile",size:[.042,0,0],pos:[0,0,0],outline:[[.006,-.002],[-.03,.008],[-.09,.022],[-.108,.03],[-.108,.08],[-.05,.07],[.006,.066],[.026,.08],[.034,.076],[.034,.062],[.005,.062]],color:at},...ul(-.002,-.105,.025,.055),...Si(.005,-.032,-.048,-.002)],muzzle:[0,.052,-.22],grip:[0,-.045,.042],support:null,sight:.098,aimEye:.2,kick:10,mount:[.069,.012],mountOn:"slide"},[he.Silenced]:{parts:[{name:"slide",shape:"box",size:[.032,.03,.17],pos:[0,.05,-.055],color:ne},...cl(.032,.05,.02,.006,3,at),...cc(-.135,.02,.095,.065,at),{shape:"box",size:[.03,.022,.153],pos:[0,.024,-.0485],color:at},{shape:"cylZ",size:[.01,.02,0],pos:[0,.05,-.15],color:Ze,sides:6},{shape:"cylZ",size:[.02,.16,0],pos:[0,.05,-.24],color:Ze,sides:8},{shape:"cylZ",size:[.022,.014,0],pos:[0,.05,-.166],color:ne,sides:8},{shape:"cylZ",size:[.022,.014,0],pos:[0,.05,-.314],color:ne,sides:8},{shape:"profile",size:[.036,0,0],pos:[0,0,0],outline:dm,color:at},...ul(0,-.095,.022,.05),...Si(.013,-.022,-.042,-.004)],muzzle:[0,.05,-.322],grip:[0,-.04,.04],support:null,sight:.095,aimEye:.2,kick:3,mount:[.065,-.03],mountOn:"slide"}},OE={[he.M4]:{parts:[{shape:"box",size:[.05,.045,.17],pos:[0,0,0],color:ne},{shape:"box",size:[.056,.05,.26],pos:[0,.045,-.04],color:ne},{shape:"box",size:[.032,.014,.26],pos:[0,.076,-.04],color:at},{shape:"box",size:[.003,.016,.05],pos:[.0285,.045,-.05],color:Ze},{shape:"box",size:[.014,.016,.026],pos:[.033,.055,.045],color:Ze},{name:"charge",shape:"box",size:[.046,.012,.016],pos:[0,.07,.095],color:ne},{shape:"cylZ",size:[.035,.2,0],pos:[0,.042,-.27],color:at,sides:8},{shape:"cylZ",size:[.037,.012,0],pos:[0,.042,-.175],color:ne,sides:8},{shape:"cylZ",size:[.037,.012,0],pos:[0,.042,-.365],color:ne,sides:8},{shape:"cylZ",size:[.013,.18,0],pos:[0,.045,-.46],color:ne,sides:6},{shape:"cylZ",size:[.017,.042,0],pos:[0,.045,-.57],color:ne,sides:6},{name:"sights",shape:"profile",size:[.012,0,0],pos:[0,0,0],outline:[[.04,-.365],[.09,-.385],[.09,-.405],[.04,-.425]],color:ne},Nr(-.395,.124,.09,.0045,.012),{name:"sights",shape:"box",size:[.032,.012,.03],pos:[0,.089,.06],color:ne},Bs(.06,.124,.018,.0035,.014,.094),{shape:"box",size:[.042,.03,.07],pos:[0,-.02,-.045],color:ne},{name:"mag",shape:"box",size:[.034,.13,.062],pos:[0,-.085,-.045],rotX:.12,color:Ze},{name:"mag",shape:"box",size:[.038,.014,.066],pos:[0,-.152,-.053],rotX:.12,color:ne},{shape:"box",size:[.04,.09,.044],pos:[0,-.06,.07],rotX:-.35,color:at},...Si(-.0225,-.05,-.02,.045),{name:"stock",shape:"cylZ",size:[.019,.17,0],pos:[0,.03,.17],color:ne,sides:8},{name:"stock",shape:"profile",size:[.05,0,0],pos:[0,0,0],outline:[[.055,.17],[.05,.3],[-.065,.3],[-.05,.25],[0,.19],[0,.17]],color:at},{name:"stock",shape:"box",size:[.054,.12,.016],pos:[0,-.005,.305],color:ne}],muzzle:[0,.045,-.59],grip:[0,-.055,.075],support:[0,.01,-.27],sight:.124,aimEye:.2,kick:4,mount:[.083,-.02]},[he.Lmg]:{parts:[{shape:"box",size:[.068,.07,.3],pos:[0,.035,-.03],color:ne},{name:"cover",shape:"box",size:[.066,.024,.17],pos:[0,.081,-.035],color:Ze},Bs(.035,.125,.019,.0035,.014,.093,{name:"cover",iron:!0}),{name:"charge",shape:"box",size:[.03,.014,.016],pos:[.046,.04,-.12],color:ne},{shape:"cylZ",size:[.017,.4,0],pos:[0,.045,-.38],color:ne,sides:6},{shape:"box",size:[.042,.018,.2],pos:[0,.066,-.3],color:Ze},{shape:"cylZ",size:[.021,.045,0],pos:[0,.045,-.6],color:ne,sides:6},{shape:"box",size:[.026,.016,.03],pos:[0,.064,-.55],color:ne},Nr(-.55,.125,.072,.0045,.014),{shape:"box",size:[.016,.054,.016],pos:[-.03,.056,-.16],color:ne},{shape:"box",size:[.016,.054,.016],pos:[-.03,.056,-.25],color:ne},{shape:"box",size:[.018,.018,.124],pos:[-.03,.084,-.205],color:ne},{shape:"box",size:[.064,.038,.18],pos:[0,.005,-.27],color:at},{shape:"box",size:[.046,.03,.024],pos:[0,.03,-.375],color:ne},{shape:"box",size:[.013,.013,.2],pos:[-.016,.022,-.48],color:ne},{shape:"box",size:[.013,.013,.2],pos:[.016,.022,-.48],color:ne},{shape:"box",size:[.046,.013,.016],pos:[0,.022,-.575],color:ne},{name:"mag",shape:"box",size:[.078,.11,.11],pos:[0,-.07,-.05],color:hr},{name:"mag",shape:"box",size:[.08,.016,.112],pos:[0,-.02,-.05],color:Fs},{name:"mag",shape:"box",size:[.014,.035,.05],pos:[-.045,.02,-.05],color:Ii},{shape:"box",size:[.042,.095,.046],pos:[0,-.055,.085],rotX:-.3,color:at},...Si(0,-.045,.02,.065),{name:"stock",shape:"profile",size:[.052,0,0],pos:[0,0,0],outline:[[.06,.12],[.05,.38],[-.07,.38],[-.05,.3],[0,.2],[0,.12]],color:at},{name:"stock",shape:"box",size:[.056,.13,.018],pos:[0,-.01,.388],color:ne}],muzzle:[0,.045,-.625],grip:[0,-.055,.09],support:[0,-.012,-.27],sight:.125,aimEye:.2,kick:4,hinge:[0,.07,-.12],mount:[.093,-.045],mountOn:"cover"},[he.Sniper]:{parts:[{shape:"cylZ",size:[.024,.22,0],pos:[0,.045,-.02],color:ne,sides:8},{shape:"cylZ",size:[.016,.55,0],pos:[0,.045,-.4],color:ne,sides:6},{shape:"box",size:[.038,.03,.055],pos:[0,.045,-.7],color:ne},{shape:"box",size:[.058,.044,.32],pos:[0,.018,-.24],color:hr},{shape:"box",size:[.058,.035,.2],pos:[0,.012,0],color:hr},{shape:"box",size:[.046,.1,.048],pos:[0,-.05,.075],rotX:-.3,color:hr},...Si(-.005,-.045,-.03,.05),{name:"mag",shape:"box",size:[.04,.05,.07],pos:[0,-.02,-.085],color:ne},{name:"mag",shape:"box",size:[.044,.008,.074],pos:[0,-.047,-.085],color:Ze},{shape:"cylZ",size:[.021,.22,0],pos:[0,.11,-.05],color:ne,sides:8},{shape:"cylZ",size:[.03,.07,0],pos:[0,.11,-.2],color:ne,sides:8},{shape:"cylZ",size:[.026,.06,0],pos:[0,.11,.085],color:ne,sides:8},{shape:"cylY",size:[.011,.022,0],pos:[0,.14,-.04],color:Ze,sides:8},{shape:"cylX",size:[.011,.022,0],pos:[.03,.11,-.04],color:Ze,sides:8},{shape:"box",size:[.036,.035,.02],pos:[0,.085,-.12],color:Ze},{shape:"box",size:[.036,.035,.02],pos:[0,.085,.03],color:Ze},{shape:"cylZ",size:[.025,.004,0],pos:[0,.11,-.236],color:um,sides:8},{shape:"cylZ",size:[.021,.004,0],pos:[0,.11,.116],color:um,sides:8},{name:"bolt",shape:"cylX",size:[.008,.05,0],pos:[.049,.05,.05],color:Ze,sides:6},{name:"bolt",shape:"box",size:[.02,.02,.02],pos:[.077,.05,.05],color:ne},{name:"bolt",shape:"cylZ",size:[.019,.03,0],pos:[0,.045,.1],color:Ze,sides:8},{name:"stock",shape:"profile",size:[.054,0,0],pos:[0,0,0],outline:[[.07,.1],[.075,.42],[-.08,.42],[-.06,.3],[-.02,.2],[0,.1]],color:hr},{name:"stock",shape:"box",size:[.048,.022,.15],pos:[0,.086,.25],color:Fs},{name:"stock",shape:"box",size:[.06,.16,.022],pos:[0,-.003,.43],color:at}],muzzle:[0,.045,-.725],grip:[0,-.05,.08],support:[0,-.005,-.25],sight:.11,kick:12},[he.Launcher]:{parts:[{shape:"box",size:[.052,.062,.1],pos:[0,.032,.02],color:ne},{shape:"box",size:[.014,.012,.022],pos:[0,.068,.045],color:Ze},{name:"drum",shape:"cylZ",size:[.058,.12,0],pos:[0,Os,-.09],color:ne,sides:12},...hm.map(([e,t])=>({name:"drum",shape:"cylZ",size:[.018,.004,0],pos:[0,Os,-.151],offset:[e,t],color:Km,sides:10})),...hm.map(([e,t])=>({name:"rounds",shape:"cylZ",size:[.014,.006,0],taper:.008,pos:[0,Os,-.153],offset:[e,t],color:Ii,sides:10})),{shape:"cylZ",size:[.012,.15,0],pos:[0,Os,-.09],color:Ze,sides:8},{shape:"box",size:[.03,.012,.15],pos:[0,Os-.064,-.09],color:Ze},{shape:"box",size:[.024,.01,.15],pos:[0,.078,-.09],color:Ze},{shape:"cylZ",size:[.028,.23,0],pos:[0,.045,-.279],color:Fs,sides:10},{shape:"cylZ",size:[.031,.018,0],pos:[0,.045,-.385],color:ne,sides:10},{shape:"cylZ",size:[.019,.004,0],pos:[0,.045,-.395],color:at,sides:10},{shape:"box",size:[.03,.016,.12],pos:[0,.01,-.25],color:ne},{shape:"box",size:[.032,.085,.036],pos:[0,-.034,-.25],rotX:-.12,color:at},{shape:"box",size:[.05,.008,.024],pos:[0,.086,-.06],color:ne},{shape:"plate",size:[0,0,.005],pos:[0,0,-.06],outline:[[-.024,.088],[.024,.088],[.024,.142],[-.024,.142]],hole:[[-.02,.097],[.02,.097],[.02,.138],[-.02,.138]],color:ne},Nr(-.37,.118,.07,.004,.012),...Si(.001,-.036,0,.06),{name:"stock",shape:"profile",size:[.046,0,0],pos:[0,0,0],outline:[[.058,.07],[.05,.36],[-.085,.36],[-.07,.27],[-.03,.14],[-.03,.07]],color:Va},{name:"stock",shape:"box",size:[.05,.15,.03],pos:[0,-.016,.375],color:at}],muzzle:[0,.045,-.397],grip:[0,-.03,.1],support:[0,-.05,-.25],sight:.118,aimEye:.15,kick:10,hinge:[0,.015,-.06],soft:!0},[he.Rpg]:{parts:[{shape:"cylZ",size:[.024,.42,0],pos:[0,.045,-.16],color:ne,sides:8},{shape:"cylZ",size:[.027,.02,0],pos:[0,.045,-.37],color:Ze,sides:8},{shape:"cylZ",size:[.032,.2,0],pos:[0,.045,0],color:Va,sides:8},{name:"stock",shape:"cylZ",size:[.024,.2,0],pos:[0,.045,.2],color:ne,sides:8},{name:"stock",shape:"cylZ",size:[.038,.08,0],pos:[0,.045,.33],color:ne,sides:8},{shape:"box",size:[.03,.09,.04],pos:[0,-.03,.06],rotX:-.25,color:at},...Si(.021,-.015,0,.045),{shape:"box",size:[.028,.08,.035],pos:[0,-.01,-.16],rotX:-.15,color:at},{shape:"box",size:[.03,.024,.016],pos:[-.033,.058,-.02],color:ne},{shape:"plate",size:[0,0,.004],pos:[0,0,-.02],outline:dl(-.042,.063,.032,.056),hole:dl(-.042,.075,.02,.038),color:ne},{shape:"box",size:[.028,.022,.012],pos:[-.032,.06,-.3],color:ne},{shape:"plate",size:[0,0,.004],pos:[0,0,-.3],outline:dl(-.042,.068,.037,.05),hole:dl(-.042,.073,.032,.042),color:ne},{shape:"box",size:[.003,.022,.003],pos:[-.042,.084,-.3],color:ne},{name:"mag",shape:"cylZ",size:[.019,.34,0],pos:[0,.045,-.38+.34/2],color:hr,sides:8},{name:"mag",shape:"cylZ",size:[.021,.06,0],pos:[0,.045,-.41],color:Fs,sides:8},{name:"mag",shape:"cylZ",size:[.022,.05,0],taper:.045,pos:[0,.045,-.465],color:hr,sides:8},{name:"mag",shape:"cylZ",size:[.045,.08,0],pos:[0,.045,-.53],color:hr,sides:8},{name:"mag",shape:"cylZ",size:[.045,.09,0],taper:.016,pos:[0,.045,-.615],color:hr,sides:8},{name:"mag",shape:"cylZ",size:[.008,.06,0],pos:[0,.045,-.69],color:Ze,sides:6},{name:"mag",shape:"cylZ",size:[.012,.012,0],taper:.006,pos:[0,.045,-.726],color:Ze,sides:6}],muzzle:[0,.045,-.38],grip:[0,-.04,.065],support:[0,-.02,-.16],sight:.095,sightX:-.042,aimEye:.07,kick:14}},zE={[he.Karambit]:{parts:[{shape:"profile",size:[.012,0,0],pos:[0,0,0],outline:[[.01,-.035],[.008,-.08],[-.004,-.118],[-.028,-.148],[-.064,-.162],[-.046,-.136],[-.024,-.11],[-.012,-.075],[-.014,-.035]],color:Wa},{shape:"box",size:[.014,.008,.06],pos:[0,.008,-.06],color:Ze},{shape:"box",size:[.03,.032,.1],pos:[0,-.002,.012],color:ne},{shape:"cylX",size:[.024,.014,0],pos:[0,-.002,.078],color:Wa,sides:10},{shape:"cylX",size:[.013,.018,0],pos:[0,-.002,.078],color:ne,sides:10}],muzzle:[0,-.06,-.16],grip:[0,-.002,.01],support:null,sight:.012,kick:0},[he.Machete]:{parts:[{shape:"profile",size:[.01,0,0],pos:[0,0,0],outline:[[.016,-.06],[.018,-.32],[.026,-.4],[.004,-.45],[-.028,-.43],[-.036,-.32],[-.03,-.06]],color:Wa},{shape:"box",size:[.013,.008,.3],pos:[0,.017,-.2],color:Ze},{shape:"box",size:[.032,.064,.016],pos:[0,-.007,-.055],color:ne},{shape:"box",size:[.032,.038,.12],pos:[0,-.007,.01],color:Sl},{shape:"box",size:[.036,.042,.016],pos:[0,-.007,.075],color:ne}],muzzle:[0,-.005,-.45],grip:[0,-.007,.01],support:null,sight:.012,kick:0}},kn={[he.Smg]:{parts:[{shape:"box",size:[.046,.05,.43],pos:[0,.04,-.115],color:Ze},{shape:"box",size:[.04,.038,.1],pos:[0,-.004,.02],color:ne},{shape:"box",size:[.054,.046,.14],pos:[0,.006,-.255],color:ne},{shape:"cylZ",size:[.011,.07,0],pos:[0,.04,-.365],color:ne,sides:8},{shape:"cylZ",size:[.015,.03,0],pos:[0,.04,-.405],color:ne,sides:8},{shape:"box",size:[.024,.012,.012],pos:[-.03,.05,-.29],color:ne},{shape:"box",size:[.032,.03,.05],pos:[0,.002,-.12],color:ne},...cm({top:[-.0155,-.1183],length:.17,lean:[.08,.47],depth:.045,width:.026,color:Ze}),{shape:"profile",size:[.034,0,0],pos:[0,0,0],outline:[[-.02,.025],[-.06,.036],[-.1,.05],[-.114,.058],[-.117,.088],[-.07,.08],[-.03,.072],[-.02,.07]],color:ne},...Si(-.023,-.055,-.03,.03),{name:"stock",shape:"profile",size:[.04,0,0],pos:[0,0,0],outline:[[.062,.09],[.058,.29],[-.05,.29],[-.045,.255],[0,.14],[-.005,.09]],color:ne},{name:"stock",shape:"box",size:[.044,.124,.02],pos:[0,.004,.298],color:ne},Nr(-.315,.112,.065,.004,.016),Bs(.075,.112,.017,.0035,.014,.065)],muzzle:[0,.04,-.42],grip:[0,-.06,.062],support:[0,-.012,-.255],sight:.112,aimEye:.2,kick:4,mount:[.065,-.06]},[he.Shotgun]:{parts:[{shape:"box",size:[.055,.07,.2],pos:[0,.02,-.02],color:Ze},{shape:"cylZ",size:[.018,.56,0],pos:[0,.045,-.4],color:ne,sides:6},{shape:"cylZ",size:[.014,.44,0],pos:[0,.01,-.34],color:ne,sides:6},{name:"pump",shape:"box",size:[.052,.052,.17],pos:[0,.012,-.32],color:Va},{shape:"box",size:[.04,.075,.07],pos:[0,-.02,.07],rotX:.4,color:Sl},{name:"stock",shape:"box",size:[.046,.105,.3],pos:[0,-.04,.24],rotX:.18,color:Va},{name:"stock",shape:"box",size:[.05,.115,.02],pos:[0,-.065,.39],rotX:.18,color:ne},Nr(-.665,.09,.06,.004,.012),{name:"sights",shape:"box",size:[.009,.009,.009],pos:[0,.0905,-.665],color:Ii},Bs(.06,.095,.0175,.0035,.014,.055),...Si(-.015,-.052,-.035,.03)],muzzle:[0,.045,-.69],grip:[0,-.03,.075],support:[0,-.002,-.32],sight:.095,aimEye:.2,kick:9,mount:[.055,-.03]},[he.Rifle]:{parts:[{shape:"box",size:[.055,.075,.26],pos:[0,.03,-.03],color:Ze},{shape:"box",size:[.05,.012,.22],pos:[0,.072,-.01],color:ne},{shape:"box",size:[.014,.006,.2],pos:[0,.081,-.01],color:Ze},{shape:"cylZ",size:[.013,.32,0],pos:[0,.05,-.46],color:ne,sides:6},{shape:"box",size:[.052,.06,.24],pos:[0,.035,-.27],color:Va},{shape:"cylZ",size:[.012,.12,0],pos:[0,.076,-.36],color:ne,sides:6},{shape:"box",size:[.04,.026,.18],pos:[0,.075,-.22],color:Sl},{shape:"cylZ",size:[.017,.035,0],pos:[0,.05,-.635],color:ne,sides:6},{shape:"box",size:[.02,.012,.016],pos:[0,.064,-.658],color:ne},{name:"sights",shape:"box",size:[.022,.016,.03],pos:[0,.065,-.565],color:ne},Nr(-.565,.124,.073,.0045,.014),{name:"charge",shape:"box",size:[.03,.014,.016],pos:[.04,.05,-.1],color:ne},...cm({top:[-6e-4,-.0725],length:.19,lean:[.08,.52],depth:.06,width:.036,color:UE}),{shape:"box",size:[.04,.1,.045],pos:[0,-.05,.07],rotX:-.3,color:Sl},{name:"stock",shape:"box",size:[.046,.1,.3],pos:[0,-.01,.25],rotX:.2,color:Va},{name:"stock",shape:"box",size:[.05,.11,.02],pos:[0,-.041,.402],rotX:.2,color:ne},...Si(-.0075,-.048,-.035,.045),Bs(.075,.124,.017,.0035,.014,.078)],muzzle:[0,.05,-.67],grip:[0,-.045,.065],support:[0,.01,-.27],sight:.124,aimEye:.2,kick:5,mount:[.084,0]},[he.Revolver]:{parts:[{shape:"box",size:[.022,.008,.075],pos:[0,.056,-.025],color:Ze},{shape:"box",size:[.026,.012,.075],pos:[0,.006,-.025],color:Ze},{shape:"box",size:[.026,.06,.012],pos:[0,.03,-.0565],color:Ze},{shape:"box",size:[.028,.062,.022],pos:[0,.031,.01],color:Ze},{name:"drum",shape:"cylZ",size:[.021,.046,0],pos:[0,.032,-.0275],color:ne,sides:8},...wl(.0125).map(([e,t])=>({name:"drum",shape:"cylZ",size:[.0055,.002,0],pos:[0,.032,-.0045],offset:[e,t],color:Km,sides:10})),...wl(.0125).map(([e,t])=>({name:"rounds",shape:"cylZ",size:[.0045,.002,0],pos:[0,.032,-.0035],offset:[e,t],color:Ii,sides:10})),{shape:"cylZ",size:[.01,.15,0],pos:[0,.045,-.1375],color:Ze,sides:8},{shape:"box",size:[.016,.02,.14],pos:[0,.03,-.1325],color:Ze},{shape:"box",size:[.008,.007,.15],pos:[0,.058,-.1375],color:ne},Nr(-.2,.082,.06,.0045,.012),{shape:"box",size:[.006,.006,.008],pos:[0,.085,-.2],color:Ii},Uc(.012,.088,.058,.022,.005),{shape:"box",size:[.008,.02,.012],pos:[0,.05,.026],rotX:.6,color:ne},...Si(0,-.03,-.03,.005),{shape:"profile",size:[.03,0,0],pos:[0,0,0],outline:[[.004,-.002],[-.025,.004],[-.055,.014],[-.085,.028],[-.1,.036],[-.104,.062],[-.08,.066],[-.045,.058],[-.015,.046],[.01,.034],[.012,.02]],color:Va}],muzzle:[0,.045,-.2125],grip:[0,-.045,.036],support:null,sight:.088,kick:7,aimEye:.2},[he.Knife]:{parts:[{shape:"profile",size:[.01,0,0],pos:[0,0,0],outline:[[.012,-.068],[.012,-.2],[.004,-.235],[-.002,-.27],[-.012,-.235],[-.018,-.19],[-.018,-.068]],color:Wa},{shape:"box",size:[.012,.007,.13],pos:[0,.01,-.133],color:Ze},{shape:"box",size:[.024,.056,.012],pos:[0,-.003,-.062],color:Ii},{shape:"box",size:[.024,.03,.11],pos:[0,-.003,-.002],color:ne},{shape:"box",size:[.028,.034,.014],pos:[0,-.003,.058],color:Ze}],muzzle:[0,-.002,-.27],grip:[0,-.003,0],support:null,sight:.012,kick:0},...kE,...OE,...zE},fm=.007;function FE(e,t=!1){if(e.shape==="box"){let[n,s,o]=e.size,l=Math.min(fm,Math.min(n,s,o)/3);return t&&l>.0015?new el(n,s,o,2,l):new yi(n,s,o)}if(e.shape==="profile"){let n=new Vi(e.outline.map(([l,h])=>new K(-h,l))),s=e.size[0];if(!t)return new Ar(n,{depth:s,bevelEnabled:!1}).rotateY(Math.PI/2).translate(-s/2,0,0);let o=Math.min(fm,s/3);return new Ar(n,{depth:s-2*o,bevelEnabled:!0,bevelSize:o*.6,bevelThickness:o,bevelSegments:3,curveSegments:4}).rotateY(Math.PI/2).translate(-s/2+o,0,0)}if(e.shape==="plate"){let n=new Vi(e.outline.map(([o,l])=>new K(o,l)));e.hole&&n.holes.push(new bn(e.hole.map(([o,l])=>new K(o,l))));let s=e.size[2];return new Ar(n,{depth:s,bevelEnabled:!1}).translate(0,0,-s/2)}let i=(e.sides??8)*(t?2:1),r=new hi(e.size[0],e.shape==="cylZ"?e.taper??e.size[0]:e.size[0],e.size[1],i);if(e.shape==="cylY")return r;let a=e.shape==="cylZ"?r.rotateX(Math.PI/2):r.rotateZ(Math.PI/2);return e.offset?a.translate(e.offset[0],e.offset[1],0):a}var pl=.07,bP={shell:[{shape:"cylZ",size:[.0105,.05,0],pos:[0,0,-.05],color:NE,sides:8},{shape:"cylZ",size:[.0115,.014,0],pos:[0,0,-.019],color:Ii,sides:8}],loader:[...wl(.0125).map(([e,t])=>({shape:"cylZ",size:[.0045,.03,0],pos:[e,t+pl,-.03],color:Ii,sides:10})),{shape:"cylZ",size:[.006,.012,0],pos:[0,pl,-.009],color:ne,sides:8},{shape:"box",size:[.008,pl,.008],pos:[0,pl/2,-.01],color:ne}],casings:wl(.0125).map(([e,t])=>({shape:"cylZ",size:[.0045,.024,0],pos:[e,t,-.01],color:Ii,sides:10})),case:[{shape:"cylZ",size:[.0075,.06,0],pos:[0,0,0],color:Ii,sides:6}],round:[{shape:"cylZ",size:[.022,.032,0],pos:[0,0,-.02],color:Ii,sides:8},{shape:"cylZ",size:[.021,.03,0],pos:[0,0,-.05],color:Fs,sides:8},{shape:"cylZ",size:[.012,.014,0],pos:[0,0,-.071],color:hr,sides:8}]},mm=new Map;function BE(e){let t=mm.get(e);if(t)return t;let i=kc(kn[e].parts,kn[e].soft);return mm.set(e,i),i}function kc(e,t=!1){let i=new We,r=new vi,a=new Be,n=e.map(o=>{let l=FE(o,t),h=l.index?l.toNonIndexed():l;h.applyMatrix4(i.makeRotationFromEuler(r.set(o.rotX??0,0,0)).setPosition(...o.pos)),a.set(o.color);let u=h.getAttribute("position").count,d=new Float32Array(u*3);for(let c=0;c<u;c++)d.set([a.r,a.g,a.b],c*3);return h.setAttribute("color",new qt(d,3)),h}),s=Na(n);return s.computeVertexNormals(),s}var Un=Hr-ao-fa,Li=.052,Ll=12;function fl(e,t,i,r){return{geo:new xf(e,Math.max(.001,i-t-2*e),2,Ll-2).translate(0,-(t+i)/2,0),color:r}}function gm(e,t,i,r){return{geo:new hi(e,e,i-t,Ll,1,!0).translate(0,-(t+i)/2,0),color:r}}function dc(e,t,i,r,a){return{geo:new hi(t,e,r-i,Ll+2,1,!0).translate(0,(i+r)/2,0),color:a}}function HE(e,t,i){return{geo:new Qt(e,Ll,8).translate(...t),color:i}}var $m=.06,Dr=64,Ec=6,Tc=6,Jm=8,Qm=9,GE=18,Il=e=>e*$m/(2*Math.PI),vm=Il(Ec),_m=Il(Tc),ym=Il(Jm),VE=Il(Qm),WE=.178,ml=.52,xm=1.2,eg=-.25,XE=8,jE=16;function El(e,t,i,r=0){let a=e.getAttribute("position"),n=e.getAttribute("uv");for(let s=0;s<a.count;s++)n.setXY(s,n.getX(s)*t+r*t,(i+a.getY(s))/$m);return e}function gl(e,t,i,r,a){let n=-i,s=-r,o=[new K(.001,s),new K(e*.8,s+e*.3),new K(e,s+e),new K(e,n-e),new K(e*.8,n-e*.3),new K(.001,n)];return El(new Rr(o,XE),t,a)}function qE(){let e=new Qt(WE,20,14).toNonIndexed();El(e,GE,1.4,eg);let t=e.getAttribute("position"),i=[];for(let a=0;a<t.count;a+=3){let n=(t.getX(a)+t.getX(a+1)+t.getX(a+2))/3;(t.getZ(a)+t.getZ(a+1)+t.getZ(a+2))/3<0&&Math.abs(n)<.12||i.push(a,a+1,a+2)}let r=new St;for(let a of["position","normal","uv"]){let n=e.getAttribute(a),s=new Float32Array(i.length*n.itemSize);i.forEach((o,l)=>{for(let h=0;h<n.itemSize;h++)s[l*n.itemSize+h]=n.array[o*n.itemSize+h]}),r.setAttribute(a,new qt(s,n.itemSize))}return r}function YE(){let e=El(new hi(ym-.004,ym,Un,jE,4,!0).translate(0,Un/2,0),Jm,ml),t=El(new Qt(VE,10,6).translate(0,.01,0),Qm,ml,eg);return{torso:Na([e,t].map(i=>i.index?i.toNonIndexed():i)),head:qE(),armUpper:gl(vm,Ec,-Li,Ft+Li,xm),armLower:gl(vm-.006,Ec,-Li,Ft*.8,xm-Ft),legUpper:gl(_m,Tc,-Li,kt+Li,ml),legLower:gl(_m-.008,Tc,-Li,kt*.8,ml-kt)}}function ZE(e){let t=new Uint8Array(Dr*Dr*4),i=new Be,r={r:0,g:0,b:0};for(let n=0;n<Dr;n++)for(let s=0;s<Dr;s++){i.set(e((s+.5)/Dr,(n+.5)/Dr));let o=(n*Dr+s)*4;i.getRGB(r,jt),t[o]=Math.round(r.r*255),t[o+1]=Math.round(r.g*255),t[o+2]=Math.round(r.b*255),t[o+3]=255}let a=new En(t,Dr,Dr,Jt);return a.wrapS=a.wrapT=ds,a.colorSpace=jt,a.magFilter=Rt,a.minFilter=Mr,a.generateMipmaps=!0,a.needsUpdate=!0,a}var pc="#e8453c",zs="#2d3a6e",Sm="#f6f1e4",fc=.062,mc=.066,In=.082;function KE(){let e=ht([dc(In-.004,In,.07,Un-.05,pc),dc(In,In,0,.07,zs),dc(In-.006,In-.004,Un-.05,Un,zs),HE(.088,[0,.01,0],zs)]),t=ht([fl(fc,-Li,Ft+Li,pc)]),i=ht([fl(fc-.004,-Li,Ft*.8,pc),gm(fc-.001,Ft*.72,Ft*.84,Sm)]),r=ht([fl(mc,-Li,kt+Li,zs)]),a=ht([fl(mc-.006,-Li,kt*.8,zs),gm(mc-.003,kt*.7,kt*.82,Sm)]);return{torso:e,armUpper:t,armLower:i,legUpper:r,legLower:a}}var sa=Math.PI*2,si=e=>e-Math.floor(e),$E=e=>Math.abs(si(e)-.5),JE=(e,t)=>e[Math.min(e.length-1,Math.max(0,Math.floor(t*e.length)))],oa=(e,t)=>{let i=Math.abs(e-t);return Math.min(i,1-i)},QE=(e,t)=>si(e+t)<.5?"#e8453c":"#f6f1e4",e3=(e,t)=>{let i=Math.sin(sa*(2*e+t)+1)+.8*Math.sin(sa*(e-3*t)+2)+.5*Math.sin(sa*(3*e+2*t)+4);return JE(["#3f5a2e","#5a6e34","#8fa04c","#5a4a30"],(i+2.3)/4.6)},t3=(e,t)=>{let i=Math.floor(e*4),r=Math.floor(t*4),a=.55+.45*((i+r)%2===0?si(e*4):si(t*4)),n=s=>Math.round(s*a).toString(16).padStart(2,"0");return`#${n(74)}${n(77)}${n(88)}`},i3=(e,t)=>{let i=si(e*2),r=si(t*2),a=(o,l)=>Math.hypot(oa(i,o),oa(r,l)*Math.sqrt(3)),n=a(0,0),s=a(.5,.5);return Math.abs(n-s)<.09?"#6b4410":n<s?"#f0b53a":"#e08f1e"},r3=(e,t)=>{let i=.4+.5*Math.abs(Math.sin(sa*e))+.1*Math.sin(sa*3*e);if(t>i)return"#2a2230";let r=t/i;return r<.3?"#ffd23f":r<.65?"#ff8a1f":"#e0392b"},a3=(e,t)=>{let i=sa*(e+2*t)+2.4*Math.sin(sa*(2*e-t))+1.1*Math.sin(sa*(e+3*t)),r=Math.abs(Math.sin(i/2));return r<.07?"#7d7a8a":r<.2?"#c2bfca":"#ece9e3"},n3=(e,t)=>{let i=oa(si(e*4),0),r=oa(si(t*4),0);return Math.hypot(i,r)<.11?"#e9c14a":i<.05&&Math.floor(t*4)%2===0||r<.05&&Math.floor(e*4)%2===1?"#58d6a0":"#1d6b4f"},s3=(e,t)=>{let i=Math.floor(t*4),r=si(e*4+i%2*.5),a=si(t*4),n=Math.hypot(r-.5,a)/.66;return n>.92?"#1f4d3a":n<.45?"#6fd08c":"#3a9a6a"},o3=(e,t)=>["#b9703a","#8a4a22","#e3a56a"][Math.floor(t*3+$E(e*2)*2)%3],l3=(e,t)=>oa(si(e*4),0)<.1&&oa(si(t*4),0)<.1?"#ffffff":Math.abs(si(e*4+t*4)-.5)<.05?"#5fa8ff":(Math.floor(e*4)+Math.floor(t*4))%2===0?"#cfd6e0":"#b9c2d0",h3=(e,t)=>Math.hypot(oa(e,.375),oa(t,.625))<.045?"#ffffff":(Math.floor(e*4)+Math.floor(t*4))%2===0?"#f5c542":"#c58a1a",u3={candy:QE,camo:e3,carbon:t3,hex:i3,flame:r3,marble:a3,circuit:n3,scales:s3,creator1k:o3,creator10k:l3,creator100k:h3},c3=Object.fromEntries(Object.entries(u3).map(([e,t])=>[e,(i,r)=>t(si(i),si(r))])),bm=new Map;function d3(e){let t=bm.get(e);return t||bm.set(e,t=ZE(c3[e])),t}var p3=["torso","head","armUpper","armLower","legUpper","legLower"],f3={tracksuit:KE},Mm=new Map;function m3(e){let t=f3[e];if(!t)throw new Error(`no model for outfit ${e}`);return t()}function g3(e){let t=Mm.get(e);if(t)return t;let i=m3(ga[e].key);return Mm.set(e,i),i}var Vs=ga.length,v3=ga.length+gr.length,_3=new Map(gr.map((e,t)=>[Yo[Fl(t)],t])),y3=e=>_3.get(e)??-1,wm=(e,t)=>{let i=y3(t);return i>=0?Vs+i:e};function x3(e){return e>=Vs?S3(e-Vs):g3(e)}var Em=new Map;function S3(e){let t=Em.get(e);return t||Em.set(e,t=YE()),t}var b3=e=>e>=Vs?d3(gr[e-Vs].key):null,Tm={iron:{id:"iron",label:"IRON SIGHTS",scope:!1,line:0},reddot:{id:"reddot",label:"RED DOT",scope:!1,line:.029,eye:.135},dot:{id:"dot",label:"DOT SIGHT",scope:!1,line:.034,eye:.14},pistol:{id:"pistol",label:"RED DOT",scope:!1,line:.0165,eye:.15},x4:{id:"x4",label:"4X SCOPE",zoom:4,scope:!0,line:.035}},Am="#ff2a4d",M3="#c8283c",Oa={inner:[.037,.027],side:.0035,foot:.0045,front:-.0315,depth:.007},Dn={radius:.021,depth:.008,z:-.016},ei={bottom:.02,top:.016,y0:.0075,y1:.025,wall:.003,front:-.02,depth:.014},w3={reddot:[{shape:"box",size:[.024,.006,.05],pos:[0,.003,.004],color:at},{shape:"cylX",size:[.0035,.004,0],pos:[-.0135,.003,.012],color:Ze,sides:8},{shape:"profile",size:[.03,0,0],pos:[0,0,0],outline:[[.0055,.035],[.016,.035],[.016,.01],[.0105,-.002],[.0105,-.03],[.0055,-.03]],color:at},{shape:"box",size:[.003,.0015,.022],pos:[-.006,.0166,.022],color:at},{shape:"box",size:[.003,.0015,.022],pos:[.006,.0166,.022],color:at},{shape:"cylX",size:[.0065,.005,0],pos:[.0165,.011,.018],color:ne,sides:12},{shape:"cylX",size:[.003,.0012,0],pos:[.0194,.011,.018],color:M3,sides:12},{shape:"cylY",size:[.0028,.004,0],pos:[0,.0122,-.012],color:Ze,sides:10}],dot:[{shape:"box",size:[.026,.012,.05],pos:[0,.0075,.005],color:at},{shape:"box",size:[.03,.005,.028],pos:[0,.0025,.008],color:at},{shape:"box",size:[.004,.004,.03],pos:[.017,.003,.002],color:at},{shape:"cylX",size:[.0035,.006,0],pos:[.017,.003,-.016],color:ne,sides:10},{shape:"cylX",size:[.006,.004,0],pos:[-.0145,.008,.018],color:ne,sides:14},{shape:"cylY",size:[.003,.003,0],pos:[0,.0145,.01],color:Ze,sides:10}],pistol:[{shape:"profile",size:[.026,0,0],pos:[0,0,0],outline:[[0,.02],[.0075,.02],[.0075,.006],[.006,-.004],[.006,-.02],[0,-.02]],color:at},{shape:"cylX",size:[.0035,.0016,0],pos:[-.0136,.0035,.008],color:Ze,sides:10}]},Rm=null;function Tl(){return Rm??={reticle:new nr({color:Am}),lines:new gf({color:Am}),glass:new nr({color:"#cdeeff",transparent:!0,opacity:.12,depthWrite:!1}),coated:new nr({color:"#ffa94d",transparent:!0,opacity:.16,depthWrite:!1}),frame:Qr({color:at})},Rm}function E3(e){let[t,i]=[Ss.degToRad(-35),Ss.degToRad(260)],[r,a]=[.0028,.0055],n=40,s=[],o=[];for(let c=0;c<=n;c++){let p=c/n,g=t+(i-t)*p,v=Dn.radius+r+(a-r)*p;s.push(new K(v*Math.cos(g),v*Math.sin(g))),o.push(new K(Dn.radius*Math.cos(g),Dn.radius*Math.sin(g)))}let l=new Vi([...s,...o.reverse()]),h={bevelEnabled:!0,bevelThickness:6e-4,bevelSize:5e-4,bevelSegments:1},u=new Ar(l,{depth:Dn.depth-2*h.bevelThickness,...h}),d=new Ht(u,Tl().frame);return d.position.set(0,e,Dn.z-Dn.depth/2+h.bevelThickness),d}function bl(e,t,i,r,a,n){let[s,o]=[t/2,i/2];e.moveTo(-s+n,r),e.lineTo(s-n,r),e.quadraticCurveTo(s,r,s,r+n),e.lineTo(o,a-n),e.quadraticCurveTo(o,a,o-n,a),e.lineTo(-o+n,a),e.quadraticCurveTo(-o,a,-o,a-n),e.lineTo(-s,r+n),e.quadraticCurveTo(-s,r,-s+n,r)}function Cm(e,t,i,r,a){bl(e,t,t,r-i/2,r+i/2,a)}function T3(){let e=ei.wall,t=new Vi;bl(t,ei.bottom+2*e,ei.top+2*e,.004,ei.y1+e,.004);let i=new bn;bl(i,ei.bottom,ei.top,ei.y0,ei.y1,.0025),t.holes.push(i);let r=new Ht(new Ar(t,{depth:ei.depth,bevelEnabled:!1,curveSegments:4}),Tl().frame);r.position.z=ei.front;let a=new Vi;bl(a,ei.bottom,ei.top,ei.y0,ei.y1,.0025);let n=As(new Ht(new Bf(a,4),Tl().coated));return n.position.z=ei.front+ei.depth/2,n.renderOrder=1,[r,n]}function A3(e){let[t,i]=Oa.inner,r=i+Oa.side+Oa.foot,a=new Vi;Cm(a,t+2*Oa.side,r,e-i/2-Oa.foot+r/2,.006);let n=new bn;Cm(n,t,i,e,.0035),a.holes.push(n);let s=new Ar(a,{depth:Oa.depth,bevelEnabled:!1,curveSegments:4}),o=new Ht(s,Tl().frame);return o.position.z=Oa.front,o}function R3(e){let t=e==="reddot"?[A3(Tm.reddot.line)]:e==="pistol"?[T3()[0]]:[E3(Tm.dot.line)],i=new Be(at),r=t.map(a=>{let n=(a.geometry.index?a.geometry.toNonIndexed():a.geometry.clone()).translate(a.position.x,a.position.y,a.position.z),s=n.getAttribute("position").count;return n.setAttribute("color",new qt(Float32Array.from({length:s*3},(o,l)=>i.toArray()[l%3]),3)),n});return Na([kc(w3[e]),...r])}var tg=!1;function C3(e){return e===he.Sniper?"x4":"iron"}function P3(e){let t=kn[e];if(!t?.mount)return[C3(e)];let i=t.mountOn==="slide"?["pistol"]:["reddot","dot"];return tg?["iron",...i]:i}var L3=e=>e!=="iron"&&e!=="x4",I3=["iron","reddot","dot"],MP=I3.filter(e=>tg||e!=="iron"),ig=ma.flatMap(e=>P3(e.id).filter(L3).map(t=>({weapon:e.id,optic:t})));function D3(e,t){if(!t)return e;let i=ig.findIndex(r=>r.weapon===e&&r.optic===t);return i<0?e:ma.length+i}var Pm=new Map;function N3(e,t){let i=`${e}:${t}`,r=Pm.get(i);if(r)return r;let a=kn[e],[n,s]=a.mount,o=kc(a.parts.filter(u=>!u.iron&&u.name!=="sights"),a.soft),l=R3(t).translate(0,n,s),h=Na([o,l]);return Pm.set(i,h),h}var U3=class{meshes;sights=null;counts;drew=-1;constructor(e,t){this.meshes=[...ma.map(i=>new Gt(BE(i.id),e,t)),...ig.map(i=>new Gt(N3(i.weapon,i.optic),e,t))],this.counts=this.meshes.map(()=>0)}begin(){this.counts.fill(0)}pick(e,t,i){let r=D3(t,this.sights?.(e,t)??null);return this.drew=i?r:-1,this.meshes[r]??this.meshes[0]}next(){return this.counts[this.drew]++}takeBack(){this.drew>=0&&this.counts[this.drew]--}end(){this.meshes.forEach((e,t)=>e.count=this.counts[t])}},k3=.05,rg=.4,Lm=.5,O3=.3,Im=.16,z3=.3,F3=.22,B3=.22,H3=.07,Dm=.1,G3=.06,V3=30,ag=()=>({leanX:0,twist:0,leanZ:0,headX:0,headZ:0,gunPitch:0,dip:0,foot:-1,footX:0,footZ:0}),Ac=ag();function W3(e){if(e<=0||e>=rg)return 0;let t=e/k3;return t*Math.exp(1-t)}function X3(e,t,i,r){Object.assign(r,Ac);let a=W3((i-e.at)/1e3);if(a===0)return r;let n=Math.cos(t),s=Math.sin(t),o=e.dx*n-e.dz*s,l=e.dx*s+e.dz*n,h=0;switch(e.zone){case ii.Head:r.headX=l*Lm*a,r.headZ=-o*Lm*a,h=Im*O3;break;case ii.Body:h=Im,r.twist=-e.side*l*z3*a;break;case ii.Arm:r.gunPitch=F3*a,r.twist=-Math.sign(e.side)*l*B3*a;break;default:r.dip=H3*a,r.foot=e.side<0?0:1,r.footX=o*Dm*a,r.footZ=l*Dm*a,h=G3}return r.leanX=l*h*a,r.leanZ=-o*h*a,r}var j3=class{last=new Map;out=ag();hit(e,t){let i=this.last.get(e);i&&t.at-i.at<V3&&i.zone>t.zone||this.last.set(e,t)}bend(e,t,i){let r=this.last.get(e);return r?i-r.at>=rg*1e3?(this.last.delete(e),Ac):X3(r,t,i,this.out):Ac}forget(e){this.last.delete(e)}clear(){this.last.clear()}},q3={shot:{push:1.1,lift:.6,tumble:0,twist:1.5,legs:.18,arms:.3,neck:.3},shotgun:{push:1.7,lift:2,tumble:5,twist:0,legs:.08,arms:.1,neck:.12},sniper:{push:1.3,lift:1,tumble:1,twist:8,legs:.2,arms:.25,neck:.3},melee:{push:.25,lift:0,tumble:0,twist:0,legs:.12,arms:.6,neck:.6},blast:{push:1,lift:0,tumble:9,twist:0,legs:0,arms:0,neck:0}},Y3=2.5,Z3=3,K3={push:1,lift:0,tumble:0,twist:0,legs:0,arms:0,neck:0},$3=.6;function J3(e){return e?q3[e]:K3}function Q3(e,t,i){let r=Math.hypot(e[0],e[2]),a=r>.01?e[2]/r:Math.cos(t),n=r>.01?-e[0]/r:-Math.sin(t),s=e[0]*Math.cos(t)-e[2]*Math.sin(t);return[a*i.tumble,(s<0?-1:1)*i.twist,n*i.tumble]}var Di=0,dr=1,na=2,Zt=3,la=4,ha=5,Ws=6,Xs=7,On=8,zn=9,Hn=10,Ys=11,js=12,qs=13,Fn=14,Bn=15,xi=16,Ur=[[Hn,js,Fn],[Ys,qs,Bn],[la,Ws,On],[ha,Xs,zn]],eT=.6,tT=.5,iT=.75,rT=.4,ng=.45,aT=[[On,Zi+vr],[zn,Zi+vr],[Ws,Zi+Ut],[Xs,Zi+Ut]];function vl(e,t,i){return Math.hypot(e[i*3]-e[t*3],e[i*3+1]-e[t*3+1],e[i*3+2]-e[t*3+2])}function gc(e,t,i,r,a,n=1){let s=t*3,o=i*3,l=e[o]-e[s],h=e[o+1]-e[s+1],u=e[o+2]-e[s+2],d=Math.hypot(l,h,u);if(d<1e-9||a&&d>=r)return;let c=(d-r)/d*.5*n;e[s]+=l*c,e[s+1]+=h*c,e[s+2]+=u*c,e[o]-=l*c,e[o+1]-=h*c,e[o+2]-=u*c}var Pi=new Float64Array(3),ji=new Float64Array(3),ur=new Float64Array(3);function nT(e,t){sT(e);for(let[i,[r,a,n]]of[Ur[0],Ur[1]].entries()){if(t[i]===1)continue;let s=r===Hn?-1:1;_l(e,r,a,ur,1,eT),_l(e,r,a,ji,1,tT),_l(e,r,a,Pi,s,iT),_l(e,r,a,Pi,-s,rT),t[i]||oT(e,r,a,n)}}function sT(e){let t=Zt*3,i=dr*3,r=la*3,a=ha*3;for(let s=0;s<3;s++)ji[s]=e[i+s]-e[t+s],Pi[s]=e[a+s]-e[r+s];Nm(ji);let n=hT(Pi,ji);for(let s=0;s<3;s++)Pi[s]-=n*ji[s];Nm(Pi),ur[0]=Pi[1]*ji[2]-Pi[2]*ji[1],ur[1]=Pi[2]*ji[0]-Pi[0]*ji[2],ur[2]=Pi[0]*ji[1]-Pi[1]*ji[0]}function _l(e,t,i,r,a,n){let s=t*3,o=i*3,l=e[o]-e[s],h=e[o+1]-e[s+1],u=e[o+2]-e[s+2],d=Math.hypot(l,h,u);if(d<1e-9)return;let c=a*(l*r[0]+h*r[1]+u*r[2])/d-n;if(c<=0)return;let p=l/d-c*a*r[0],g=h/d-c*a*r[1],v=u/d-c*a*r[2],m=Math.hypot(p,g,v);Rc(e,s,o,e[s]+p/m*d-e[o],e[s+1]+g/m*d-e[o+1],e[s+2]+v/m*d-e[o+2])}function Rc(e,t,i,r,a,n){e[i]+=r/2,e[i+1]+=a/2,e[i+2]+=n/2,e[t]-=r/2,e[t+1]-=a/2,e[t+2]-=n/2}var yl=Math.cos(ng),vc=Math.sin(ng);function oT(e,t,i,r){let a=t*3,n=i*3,s=r*3,o=e[s]-e[a],l=e[s+1]-e[a+1],h=e[s+2]-e[a+2],u=Math.hypot(o,l,h);if(u<1e-9)return;o/=u,l/=u,h/=u;let d=e[n]-e[a],c=e[n+1]-e[a+1],p=e[n+2]-e[a+2],g=d*o+c*l+p*h,v=d-g*o,m=c-g*l,f=p-g*h,x=Math.hypot(v,m,f);if(x<1e-4)return;let E=-(ur[0]*o+ur[1]*l+ur[2]*h),y=-ur[0]-E*o,w=-ur[1]-E*l,A=-ur[2]-E*h,C=Math.hypot(y,w,A);if(C<1e-6||(y/=C,w/=C,A/=C,(v*y+m*w+f*A)/x>=yl))return;let _=l*A-h*w,S=h*y-o*A,L=o*w-l*y;v*_+m*S+f*L<0&&(_=-_,S=-S,L=-L);let P=g*o+(y*yl+_*vc)*x-d,N=g*l+(w*yl+S*vc)*x-c,V=g*h+(A*yl+L*vc)*x-p;Rc(e,a,n,P/2,N/2,V/2),Rc(e,s,n,P/2,N/2,V/2)}function lT(e,t,i,r,a){let n=t*3,s=i*3,o=r*3,l=e[o]-e[s],h=e[o+1]-e[s+1],u=e[o+2]-e[s+2],d=l*l+h*h+u*u;if(d<1e-12)return;let c=Math.max(0,Math.min(1,((e[n]-e[s])*l+(e[n+1]-e[s+1])*h+(e[n+2]-e[s+2])*u)/d)),p=e[n]-(e[s]+l*c),g=e[n+1]-(e[s+1]+h*c),v=e[n+2]-(e[s+2]+u*c),m=Math.hypot(p,g,v);if(m>=a||m<1e-9)return;let f=(a-m)/m/2;e[n]+=p*f,e[n+1]+=g*f,e[n+2]+=v*f,e[s]-=p*f*(1-c),e[s+1]-=g*f*(1-c),e[s+2]-=v*f*(1-c),e[o]-=p*f*c,e[o+1]-=g*f*c,e[o+2]-=v*f*c}function hT(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Nm(e){let t=Math.hypot(e[0],e[1],e[2])||1;e[0]/=t,e[1]/=t,e[2]/=t}var sg=.12,Cc=Bl[1],og=[.165,Zi,0,Zi,Zi,Zi,Ut,Ut,vr,vr,Ut,Ut,Ut,Ut,Cc,Cc],cr=1/120,uT=8,cT=.998,dT=.25,pT=4,fT=.0015,mT=.5,gT=.95,vT=2.5,_T=.4,yT=3,xT=3,ST=.3,bT=15,MT=[.9,1.15,1.15,1.1,1.15,1.15,1.05,1.05,1,1,1,1,.8,.8,.3,.3],wT=[2.3,1.45,1.15,.8,1.25,1.25,1.05,1.05,.9,.9,.7,.7,.45,.45,.25,.25],Um=[dr,na,Zt,la,ha,Hn,Ys],Al=[...Um.flatMap((e,t)=>Um.slice(t+1).map(i=>[e,i,null])),[Di,dr,null],...Ur.flatMap(([e,t,i],r)=>{let a=r<2?kt:Ft;return[[e,t,a],[t,i,a]]})],Hs=[[Di,Zt,0,.85],[Di,la,0,.8],[Di,ha,0,.8],[la,On,.2,0],[ha,zn,.2,0],[Hn,Fn,.2,0],[Ys,Bn,.2,0],[js,qs,.1,0],[Fn,Bn,.12,0],[On,zn,.1,0]],Ha=0,Ga=1,Pc=2,Rl=[[Hn,Fn,Ha],[Ys,Bn,Ha],[dr,js,Ha],[dr,qs,Ha],[na,js,Ha],[na,qs,Ha],[la,On,Ga],[ha,zn,Ga],[Zt,Ws,Ga],[Zt,Xs,Ga],[na,Ws,Ga],[na,Xs,Ga],[Di,na,Pc],[Di,Zt,Pc]],lg=3;function ET(e,t,i){let r={pos:new Float64Array(xi*3),prev:new Float64Array(xi*3),rest:new Float64Array(Al.length),minRest:new Float64Array(Hs.length),contact:new Int8Array(xi).fill(-1),time:0,still:0,asleep:!1,impact:null,splatted:!1,landing:null,landed:!1,age:0,hold:new Float64Array(3),muscleRest:new Float64Array(Rl.length),floorHit:new Float64Array(xi),bounced:new Uint8Array(xi),headless:!1,cut:new Uint8Array(Ur.length)};e.pose?r.pos.set(e.pose.subarray(0,xi*3)):TT(e,t,i,r.pos);let a=J3(e.style),n=e.head?wT:MT,s=e.vel??[0,0,0],o=Math.hypot(e.push[0],e.push[1],e.push[2]),l=a.lift*Math.min(1,o/Z3),h=[e.push[0]*a.push,e.push[1]*a.push+l,e.push[2]*a.push],u=Math.hypot(h[0],h[1],h[2]),d=Math.max(bT,o);if(u>d)for(let v=0;v<3;v++)h[v]*=d/u;let c=Q3(h,e.yaw,e.head&&e.style?{...a,tumble:a.tumble+Y3}:a),p=Zt*3;for(let v=0;v<xi;v++){let m=v*3,f=r.pos[m]-r.pos[p],x=r.pos[m+1]-r.pos[p+1],E=r.pos[m+2]-r.pos[p+2],y=[c[1]*E-c[2]*x,c[2]*f-c[0]*E,c[0]*x-c[1]*f];for(let w=0;w<3;w++)r.prev[m+w]=r.pos[m+w]-(h[w]*n[v]+s[w]*gT+y[w])*cr}let g=e.head?$3:1;return r.hold[Ha]=a.legs*g,r.hold[Ga]=a.arms*g,r.hold[Pc]=e.head?0:a.neck,Al.forEach(([v,m,f],x)=>r.rest[x]=f??vl(r.pos,v,m)),Hs.forEach(([v,m,f,x],E)=>r.minRest[E]=Math.min(Math.max(f,vl(r.pos,v,m)*x),vl(r.pos,v,m))),Rl.forEach(([v,m],f)=>r.muscleRest[f]=vl(r.pos,v,m)),r}function TT(e,t,i,r){let a=t-ao,n=[];n[Di]=[0,t,0],n[dr]=[0,a,0],n[na]=[0,(a+i)/2,sg],n[Zt]=[0,i,0];for(let l of[-1,1]){let h=l<0,u=[l*Ui,i,0],d=[l*(Ui+.04),Cc,0],c=[l*Ya,a,0],p=h?[-.05,a-.12,.5]:[.09,a-.15,.4];n[h?Hn:Ys]=u,n[h?Fn:Bn]=d,n[h?js:qs]=km(u,d,kt,[0,.3,1]),n[h?la:ha]=c,n[h?On:zn]=p,n[h?Ws:Xs]=km(c,p,Ft,[l*.7,-1,-.2])}let s=Math.cos(e.yaw),o=Math.sin(e.yaw);for(let l=0;l<xi;l++){let[h,u,d]=n[l];r[l*3]=e.x+h*s-d*o,r[l*3+1]=e.y+u,r[l*3+2]=e.z-h*o-d*s}}function km(e,t,i,r){let a=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],n=Math.hypot(a[0],a[1],a[2]),s=a.map(c=>c/n),o=n/2,l=Math.sqrt(Math.max(0,i*i-o*o)),h=r[0]*s[0]+r[1]*s[1]+r[2]*s[2],u=r.map((c,p)=>c-h*s[p]),d=Math.hypot(u[0],u[1],u[2]);return e.map((c,p)=>c+s[p]*o+u[p]/d*l)}function AT(e,t){let i=t*3;return Math.hypot(e.pos[i]-e.prev[i],e.pos[i+1]-e.prev[i+1],e.pos[i+2]-e.prev[i+2])/cr}var RT=Array.from({length:xi},(e,t)=>Ur.findIndex(([,i,r])=>t===i||t===r));function za(e,t){if(t===Di)return e.headless;let i=RT[t];return i>=0&&(e.cut[i]===1||e.cut[i]===2&&t===Ur[i][2])}function CT(e,t,i){if(!e.asleep)for(e.time+=Math.min(i,.1);e.time>=cr;)e.time-=cr,PT(e,t)}function PT(e,t){let{pos:i,prev:r}=e,a=Qc*cr*cr,n=e.headless||e.cut.includes(1)||e.cut.includes(2);for(let h=0;h<xi*3;h+=3)if(!(n&&za(e,h/3))){for(let u=0;u<3;u++){let d=(i[h+u]-r[h+u])*cT;r[h+u]=i[h+u],i[h+u]+=d}i[h+1]-=a}e.contact.fill(-1),e.floorHit.fill(0),e.age+=cr;let s=[0,0,0];for(let h=0;h<3;h++){let u=e.hold[h]>0?1-e.age/e.hold[h]:0;s[h]=u>0?ST*u*u:0}let o=s[0]>0||s[1]>0||s[2]>0;for(let h=0;h<uT;h++){if(o)for(let u=0;u<Rl.length;u++){let[d,c,p]=Rl[u];s[p]>0&&!(n&&(za(e,d)||za(e,c)))&&gc(i,d,c,e.muscleRest[u],!1,s[p])}for(let u=0;u<Al.length;u++){let[d,c]=Al[u];n&&(za(e,d)||za(e,c))||gc(i,d,c,e.rest[u],!1)}for(let u=0;u<Hs.length;u++)gc(i,Hs[u][0],Hs[u][1],e.minRest[u],!0);nT(i,e.cut);for(let[u,d]of aT)lT(i,u,Zt,dr,d);for(let u=0;u<xi;u++)og[u]>0&&!za(e,u)&&LT(e,t,u)}let l=0;for(let h=0;h<xi;h++){let u=h*3;if(n&&za(e,h))continue;let d=e.contact[h];if(d>=0){let c=d>>1,p=d&1?r[u+c]>i[u+c]:r[u+c]<i[u+c],g=d===lg&&p&&!e.splatted&&!e.bounced[h]&&e.floorHit[h]>vT;g&&(e.bounced[h]=1);for(let v=0;v<3;v++)v===c?g?r[u+v]=i[u+v]-Math.min(yT,e.floorHit[h]*_T)*cr:p&&(r[u+v]=i[u+v]):r[u+v]+=(i[u+v]-r[u+v])*dT}l=Math.max(l,Math.abs(i[u]-r[u]),Math.abs(i[u+1]-r[u+1]),Math.abs(i[u+2]-r[u+2]))}e.still=l<fT?e.still+cr:0,e.still>mT&&(e.asleep=!0)}var Om=[];function LT(e,t,i){let{pos:r,prev:a}=e,n=i*3,s=og[i],o=t.query(r[n]-s,r[n+2]-s,r[n]+s,r[n+2]+s,Om),l=t.boxes;for(let h=0;h<o;h++){let u=Om[h]*6,d=1/0,c=-1,p=!1;for(let f=0;f<3;f++){let x=r[n+f],E=l[u+f]-s,y=l[u+3+f]+s;if(x<=E||x>=y){c=-1,d=-1;break}let w=a[n+f];for(let A of[!1,!0]){let C=A?y-x:x-E,_=A?w>=y:w<=E;(_&&!p||_===p&&C<d)&&(d=C,c=f*2+(A?1:0),p=_)}}if(c<0)continue;let g=c>>1,v=(c&1)===1,m=Math.abs(r[n+g]-a[n+g])/cr;if(r[n+g]=v?l[u+3+g]+s:l[u+g]-s,e.contact[i]=c,g!==1&&!e.splatted&&m>pT){let f=g===0?v?1:-1:0,x=g===2?v?1:-1:0;e.impact={x:r[n]-f*s,y:r[n+1],z:r[n+2]-x*s,nx:f,nz:x,speed:m},e.splatted=!0}c===lg&&(e.floorHit[i]=Math.max(e.floorHit[i],m),!e.landed&&i!==Fn&&i!==Bn&&m>xT&&(e.landing={x:r[n],y:r[n+1]-s,z:r[n+2],speed:m},e.landed=!0))}}var IT=1e3,Cl=250,DT=1.5;function NT(e,t,i,r){let a=t&&r-t.at<IT?t:void 0,n=(e.flags&wi.Crouched)!==0,s=i!==void 0&&r-i.at<Cl&&Math.hypot(i.points[Zt*3]-e.x,i.points[Zt*3+2]-e.z)<DT;return{body:ET({x:e.x,y:e.y,z:e.z,yaw:e.yaw,push:a?a.push:[0,0,0],head:a?a.head:!1,style:a?a.style:"shot",...s?{pose:i.points,vel:[i.vx,i.vy,i.vz]}:{}},n?ro:Hr,n?Hl:fa),fresh:a}}function ui(e,t,i){return e.set(t.pos[i*3],t.pos[i*3+1],t.pos[i*3+2])}var UT=class{up=new R;right=new R;back=new R;torsoBack=new R;footUp=new R;footSide=new R;dir=new R;l=new R;rt=new R;scale=new R;bodyFrame(e,t,i,r){this.up.normalize(),this.right.subVectors(ui(this.rt,e,ha),ui(this.l,e,la)),this.right.addScaledVector(this.up,-this.right.dot(this.up)).normalize(),this.back.crossVectors(this.right,this.up),i.makeBasis(this.right,this.up,this.back).setPosition(t),r.copy(i)}keepTorsoBack(){this.torsoBack.copy(this.back)}footMatrix(e,t,i,r){this.footUp.subVectors(t,i).normalize(),this.dir.copy(this.torsoBack).addScaledVector(this.footUp,-this.torsoBack.dot(this.footUp)),this.dir.lengthSq()<1e-6&&this.dir.copy(this.up).addScaledVector(this.footUp,-this.up.dot(this.footUp)),this.dir.normalize(),this.footSide.crossVectors(this.footUp,this.dir),e.makeBasis(this.footSide,this.footUp,this.dir).scale(this.scale.set(r[0],r[1],r[2])).setPosition(i)}},Lc=.165,Pl=.07,Ic=.045,hg=.006,zm=[.045,.28,.22];function kT(){let e=Lc+hg,t=Math.acos((Pl+Ic/2)/e),i=Math.acos((Pl-Ic/2)/e);return new Qt(e,20,2,0,Math.PI*2,t,i-t)}var OT=new R,zT=new R;function FT(e,t,i,r,a,n){let s=OT.subVectors(t,e),o=Ss.clamp(s.length(),Math.abs(i-r)+1e-4,i+r-1e-4);s.normalize();let l=(i*i-r*r+o*o)/(2*o),h=Math.sqrt(Math.max(0,i*i-l*l)),u=zT.copy(a).addScaledVector(s,-a.dot(s)).normalize();return n.copy(e).addScaledVector(s,l).addScaledVector(u,h)}var BT=7,Fm=.18,HT=1.6,GT=500,Bm=2,VT=class{anchors=new Map;head=new R;lag=new R;around(e,t,i,r,a){let n=r?Ir(r).float:void 0;if(!n)return a();this.head.setFromMatrixPosition(e);let s=this.anchors.get(t);(!s||i-s.t>GT||s.at.distanceToSquared(this.head)>Bm*Bm)&&(s={at:this.head.clone(),t:i},this.anchors.set(t,s));let o=Math.min(.1,Math.max(0,(i-s.t)/1e3));s.at.lerp(this.head,1-Math.exp(-o*BT)),s.t=i,this.lag.copy(s.at).sub(this.head),this.lag.length()>Fm&&this.lag.setLength(Fm),this.lag.y+=n.lift+n.bob*Math.sin(i/1e3*HT+t*1.7);let l=e.elements;l[12]+=this.lag.x,l[13]+=this.lag.y,l[14]+=this.lag.z,a(),l[12]-=this.lag.x,l[13]-=this.lag.y,l[14]-=this.lag.z}};var _t=(e,t,i,r,a,n,s)=>({key:e,label:t,min:i,max:r,step:a,unit:n,help:s}),Ci=(e,t,i)=>_t(e,t,0,1,.05,"",i),WT=[{label:"WHAT A KILL TAKES OFF",fields:[Ci("headOff","Heads fly off whole","Every headshot kill pops the head. This share flies off whole, the rest burst in place. 0: all burst, 1: all fly."),Ci("blastHead","Blast: head","Chance a grenade or rocket kill also pops the head."),Ci("blastLimb","Blast: each limb","Chance per arm and leg on a blast kill. At least one always comes off."),Ci("blastSocket","Blast: whole limb","Of the blast cuts: this share takes the whole limb, the rest only the forearm or shin."),Ci("shotgunHead","Shotgun: head","Chance a close shotgun kill pops the head."),Ci("shotgunLimb","Shotgun: a limb","Chance a close shotgun kill takes one limb."),Ci("shotgunLimb2","Shotgun: 2nd limb","When it took one: chance it takes a second one too."),Ci("sniperHead","Sniper body: head","Chance a sniper body kill still pops the head."),Ci("sniperLimb","Sniper body: limb","Chance a sniper body kill takes one limb."),Ci("shotEnd","Rifle/pistol: hand/foot","Chance a rifle, pistol or SMG body kill takes one hand or foot (at the elbow or knee)."),Ci("meleeHand","Knife: hand","Chance a knife body kill takes a hand."),Ci("evenSocket","Shotgun/sniper: whole limb","Of the shotgun and sniper cuts: this share takes the whole limb, the rest the forearm or shin.")]},{label:"THE KICK",fields:[_t("kick","Kick on a kill",1,4,.05,"\xD7","How much harder a gore kill throws the body than a normal kill. 1: as without gore."),_t("kickLift","Lift at least",0,6,.1," m/s","Every gore kill lifts the body at least this fast. 0: no extra hop."),_t("kickMax","Extra speed at most",0,30,.5," m/s","A cap on the extra speed, so a rocket does not throw bodies out of the map.")]},{label:"FLYING HEADS AND LIMBS",fields:[_t("headPopPush","Head along the shot",0,10,.1," m/s","How fast a popped head flies on in the shot's direction."),_t("headPopUp","Head up",0,10,.1," m/s","How high a popped head goes (50% to 150% of this each kill)."),_t("headPopSpread","Head random way",0,6,.1," m/s","A random sideways push: 0 every head flies straight, high they scatter."),_t("headSpin","Head spin",0,40,1," rad/s","How fast a flying head tumbles."),_t("limbThrow","Limb throw",0,10,.1," m/s","How fast a cut limb flies out from the body, and up."),_t("bounce","Bounce",0,.9,.05,"","How much a part bounces off the floor and walls. 0: it thuds, 0.9: a rubber ball."),_t("friction","Slide stop",0,1,.02,"","How fast a part stops sliding. 0: slides on ice, 1: stops at once."),_t("pieceLife","Parts lie",1,60,1," s","Seconds a head or limb lies before it shrinks away. At most 24 lie at once."),_t("trailTime","Drip trail",0,5,.1," s","Seconds a flying part drips blood behind it.")]},{label:"WOUNDS",fields:[_t("neckSpurt","Neck spurts",0,6,.1," s","Seconds a headless neck spurts blood. 0: no spurt."),_t("stumpSpurt","Stump spurts",0,6,.1," s","Seconds a cut arm or leg spurts blood. 0: no spurt."),_t("spurtPulse","Spurt beat",2,30,.5," rad/s","How fast the spurt pulses, like a heartbeat. Low: slow gushes, high: a flutter.")]},{label:"BLOOD",fields:[_t("blobs","Blobs per hit",1,6,.1,"\xD7","How many more drops a gore hit throws than an ink hit."),_t("scatter","Fan width",.1,1.5,.05,"","How wide the drops fan out from the hit. Low: a tight jet, high: a spray (ink look: 0.8)."),_t("drips","Drips down",0,10,1,"","Drops that fall straight down under each hit."),_t("satellites","Small splats round",0,12,1,"","Small splats round each splat on a wall or floor."),_t("satelliteReach","Small splats reach",.2,3,.05,"\xD7","How far out the small splats land, times the splat's size."),_t("pool","Kill pool",.5,3,.05,"\xD7","Size of the pool under a body, against the ink look's."),_t("round","Kill burst all round",0,1,.05,"","A kill's burst in every direction, against the ink look's. Low: the blood follows the shot.")]},{label:"STAINS ON BODIES",fields:[_t("stainReach","Stain reach",.1,1,.05," m","A hit stains the nearest bone within this distance."),_t("stainMin","Stain smallest",.01,.15,.005," m","The smallest stain."),_t("stainMax","Stain biggest",.02,.3,.005," m","The biggest stain."),_t("stainSkew","Mostly small",.5,5,.1,"","High: most stains are small, a few big. 1: sizes even.")]}],wP=WT.flatMap(e=>e.fields),EP=(e=>new Date(`${e.from}T${String(e.fromHour??0).padStart(2,"0")}:00:00`).getTime())(to("haunted-2026")),XT="#5e0a10",Hm=new Be(XT),jT=.07,qT=1.3,_c=new We().makeScale(0,0,0),TP=[Ut*1.3,Ut,vr],AP=[Ut*1.3,vr],RP=1/30,Dc=(e,t,i)=>Math.abs(Math.sin(e*12.9898+t*78.233+i*37.719)*43758.5453)%1,YT=e=>e*e*(3-2*e);function Gm(e,t){return[(Dc(e,t,1)*2-1)*.75,(Dc(e,t,2)*2-1)*.45]}function ZT(e,t){let i=Math.floor(e/1.7),r=e-i*1.7,a=Gm(i-1,t),n=Gm(i,t),s=YT(Math.min(1,r/(Dc(i,t,3)<.5?.1:1.5)));return[a[0]+(n[0]-a[0])*s,a[1]+(n[1]-a[1])*s]}function KT(e){let t=Qr({vertexColors:!0}),i=Object.keys(ll),r=g=>Object.fromEntries(i.map(v=>[v,g(v)])),a=c0(),n=[],s=(g,v,m,f=!1)=>{let x=f?a:sm(v,()=>a,()=>t);if(!m)return new Gt(g,x,e);let E=As(new Gt(g,x,e));return n.push(E),E},o=r(g=>ki.map(v=>{if(v.id===Xt)return null;let m=Ir(v.id,g);return s(m.body,m,m.shine)})),l=r(g=>ki.map(v=>{let m=v.id===Xt?void 0:Ir(v.id,g);return m?.spin?s(m.spin.geo,m,m.shine):null})),h=r(g=>ki.map(v=>{let m=v.id===Xt?void 0:Ir(v.id,g);return m?.flash?s(m.flash.geo,m,!0,!0):null})),u=p0(),d=r(g=>ki.map(v=>{let m=v.id===Xt?void 0:Ir(v.id,g);if(!m?.lamp)return null;let f=f0(As(new Gt(m.lamp,u,e)),u);return n.push(f),f})),c=d0(),p=r(g=>ki.map(v=>{let m=v.id===Xt?void 0:Ir(v.id,g);if(!m?.glow)return null;let f=new Gt(m.glow,nm(m,()=>c),e),x=m0(m.glowKind==="storm"?f:As(f));return m.glowKind&&x.setColorAt(0,new Be),n.push(x),x}));return{hats:o,spinners:l,flashes:h,lamps:d,glows:p,lights:n}}function $T(e,t,i){e.instanceColor&&e.setColorAt(e.count-1,i.setRGB(t*.6180339887%1,0,0))}var JT=class{mount="head";hats;spinners;flashes;lamps;glows;lights;drawnHat=Xt;drawnLod="near";drawnFlash=!1;headAt=new R;spinMatrix=new We;m=new We;local=new We;seed=new Be;place;constructor(e,t){this.place=t;let i=KT(e);this.hats=i.hats,this.spinners=i.spinners,this.flashes=i.flashes,this.lamps=i.lamps,this.glows=i.glows,this.lights=i.lights}meshes(){return[...this.hats.near,...this.hats.far,...this.spinners.near,...this.spinners.far,...this.flashes.near,...this.flashes.far,...this.lamps.near,...this.lamps.far,...this.glows.near,...this.glows.far]}noFarShadows(){for(let e of[...this.hats.far,...this.spinners.far])e&&(e.castShadow=!1)}begin(){this.drawnHat=Xt}drew(){return this.drawnHat!==Xt}forget(){this.drawnHat=Xt,this.drawnFlash=!1}takeBack(){if(this.drawnHat===Xt)return;this.hats[this.drawnLod][this.drawnHat].count--;let e=this.spinners[this.drawnLod][this.drawnHat];e&&e.count--,this.drawnFlash&&this.flashes[this.drawnLod][this.drawnHat].count--,this.drawnFlash=!1;let t=this.lamps[this.drawnLod][this.drawnHat];t&&t.count--;let i=this.glows[this.drawnLod][this.drawnHat];i&&i.count--}draw(e,t,i,r,a,n){if(e===Xt)return;let s="near";n&&(s=q0(this.headAt.setFromMatrixPosition(a).distanceTo(n.position),n.fov));let o=this.hats[s][e];if(!o)return;this.drawnHat=e,this.drawnLod=s,this.place(o,o.count++,0,0,0,Xi,0,0);let l=this.lamps[s][e];l&&this.place(l,l.count++,0,0,0,Xi,0,0);let h=this.glows[s][e];h&&(this.place(h,h.count++,0,0,0,Xi,0,0),$T(h,t,this.seed));let u=this.flashes[s][e],d=u?Ir(e,s).flash:void 0;this.drawnFlash=!!u&&!!d&&Y0(r/1e3,t,d.period),this.drawnFlash&&this.place(u,u.count++,0,0,0,Xi,0,0);let c=this.spinners[s][e],p=Ir(e,s).spin;if(!c||!p)return;if(p.look){let[v,m]=ZT(r/1e3,t);this.spinMatrix.makeRotationY(v).multiply(this.m.makeRotationX(m)),this.local.makeRotationX(Xi).multiply(this.m.makeTranslation(...p.at)).multiply(this.spinMatrix),c.setMatrixAt(c.count++,this.m.multiplyMatrices(a,this.local));return}let g=(r/1e3*p.rate*(1+Math.min(1,i/7))+t)%(Math.PI*2);p.axis==="x"?this.spinMatrix.makeRotationX(g):this.spinMatrix.makeRotationY(g),this.local.makeRotationX(Xi).multiply(this.m.makeTranslation(...p.at)).multiply(this.spinMatrix),c.setMatrixAt(c.count++,this.m.multiplyMatrices(a,this.local))}};function QT(e){let t=Qr({vertexColors:!0});return Array.from({length:v3},(i,r)=>{if(r===Gr)return null;let a=x3(r),n=b3(r),s=n?Qr({map:n}):t,o=(l,h)=>a[l]?new Gt(a[l],s,e*h):null;return{torso:o("torso",1),head:o("head",1),armUpper:o("armUpper",2),armLower:o("armLower",2),legUpper:o("legUpper",2),legLower:o("legLower",2)}})}var eA=class{mount="body";lights=[];sets;place;worn=Gr;taken=[];m=new We;local=new We;q=new Hi;dir=new R;scale=new R;down=new R(0,-1,0);constructor(e,t){this.place=t,this.sets=QT(e)}meshes(){return this.sets.flatMap(e=>e?p3.map(t=>e[t]):[])}noFarShadows(){}begin(){this.worn=Gr,this.taken.length=0}forget(){this.begin()}takeBack(){for(let e of this.taken)e.count--;this.taken.length=0}drew(){return this.taken.length>0}dress(e){this.begin(),this.worn=e}draw(){}mesh(e){return this.worn===Gr?null:this.sets[this.worn]?.[e]??null}head(){let e=this.mesh("head");e&&(this.taken.push(e),this.place(e,e.count++,0,0,0,0,0,0))}torso(e,t){let i=this.mesh("torso");i&&(this.taken.push(i),this.place(i,i.count++,0,e,0,0,0,0,1,t/Un,1))}limb(e,t,i,r,a){let n=e<2;this.bone(this.mesh(n?"legUpper":"armUpper"),t,i,n?kt:Ft,a),this.bone(this.mesh(n?"legLower":"armLower"),i,r,n?kt:Ft,a)}bone(e,t,i,r,a){if(!e)return;this.dir.subVectors(i,t);let n=this.dir.length();this.q.setFromUnitVectors(this.down,this.dir.multiplyScalar(1/Math.max(n,1e-6))),this.local.compose(t,this.q,this.scale.set(1,n/r,1)),e.setMatrixAt(e.count++,this.m.multiplyMatrices(a,this.local)),this.taken.push(e)}},tA=e=>e.mount==="body",Vm={hat:(e,t)=>new JT(e,t),outfit:(e,t)=>new eA(e,t)},iA=class{layers;body;constructor(e,t){this.layers=Object.keys(Vm).map(i=>[i,Vm[i](e,t)]),this.body=this.layers.map(([,i])=>i).filter(tA)}meshes(){return this.layers.flatMap(([,e])=>e.meshes()).filter(e=>e!==null)}setup(){for(let[,e]of this.layers){e.noFarShadows();for(let t of e.lights)t.castShadow=!1}}resetCounts(){for(let e of this.meshes())e.count=0}begin(e){for(let[,t]of this.layers)t.mount===e&&t.begin()}forget(e){for(let[,t]of this.layers)t.mount===e&&t.forget()}takeBack(){for(let[,e]of this.layers)e.takeBack()}drew(e){return this.layers.some(([,t])=>t.mount===e&&t.drew())}dress(e){for(let t of this.body)t.dress(e)}head(){for(let e of this.body)e.head()}torso(e,t){for(let i of this.body)i.torso(e,t)}limb(e,t,i,r,a){for(let n of this.body)n.limb(e,t,i,r,a)}draw(e,t,i,r,a,n,s){for(let[o,l]of this.layers)l.mount===e&&l.draw(t(o),i,r,a,n,s)}},Wm=.157,Fa=4,Xm=.78,jm=[.048,.012,.016],ra=14,qm=12,yc=13,Ba=Ut,xl=Zi,xc=vr,aa=[...Bl],Nc=[xc,xc,xc],lr=12,Ym=.5,Zm=.55,rA=class{head;eyes;torso;band;knot;tails;limbs;balls;wear;frame=new We;kitColor=new Be;looks;poses;m=new We;local=new We;q=new Hi;v=new R;s=new R;down=new R(0,-1,0);a=new R;b=new R;joint=new R;hem=new R;end=new R;dir=new R;scale=new R;euler=new vi(0,0,0,"YXZ");tint=new Be;skin=new Be;eye=new Be;floats=new VT;constructor(e,t){this.looks=e,this.poses=t;let i=()=>w0(new nr,!0),r=i(),a=Vl,n=new hi(Ba,Ba,1,10,1,!0).translate(0,-.5,0),s=new hi(xl,xl,1,12,1,!0).translate(0,.5,0);this.head=new Gt(new Qt(Lc,14,10),r,a),this.torso=new Gt(s,r,a),this.limbs=new Gt(n,r,a*lr),this.balls=new Gt(new Qt(1,12,8),r,a*ra),this.eyes=new Gt(new Qt(1,12,8),i(),a*Fa),this.band=new Gt(kT(),i(),a),this.knot=new Gt(new Qt(1,8,6),i(),a),this.tails=new Gt(new yi(1,1,.012).translate(0,-.5,0),i(),a*2),this.wear=new iA(a,(o,l,h,u,d,c,p,g,v,m,f)=>this.place(o,l,h,u,d,c,p,g,v,m,f));for(let o of this.meshes())o.setColorAt(0,this.tint.set(16777215))}meshes(){return[this.head,this.eyes,this.torso,this.band,this.knot,this.tails,this.limbs,this.balls]}setCount(e){for(let t of[this.head,this.torso,this.band,this.knot])t.count=e;this.eyes.count=e*Fa,this.tails.count=e*2,this.limbs.count=e*lr,this.balls.count=e*ra}limb(e,t,i,r,a,n,s,o){let l=FT(i,r,a,n,s,this.joint),h=this.end.copy(r).sub(i).setLength(Math.min(r.distanceTo(i),a+n)).add(i),[u,d,c]=Ur[t];this.poses.point(u,i,this.frame),this.poses.point(d,l,this.frame),this.poses.point(c,h,this.frame),this.limbParts(e,t,i,l,h,o)}drawTorso(e,t,i){this.place(this.torso,e,0,t,0,0,0,0,1,i,1),this.ball(e,qm,this.v.set(0,t,0),xl),this.ball(e,yc,this.v.set(0,t+i,0),xl),this.wear.torso(t,i)}limbParts(e,t,i,r,a,n){let s=this.hem.copy(i).lerp(r,t<2?Zm:Ym);this.bone(e*lr+t*3,i,s),this.bone(e*lr+t*3+1,s,r),this.bone(e*lr+t*3+2,r,a),this.ball(e,t*3,i,Ba),this.ball(e,t*3+1,r,Ba),this.ball(e,t*3+2,a,n[0],n[1],n[2]),this.wear.limb(t,i,r,a,this.frame)}ball(e,t,i,r,a=r,n=r){this.place(this.balls,e*ra+t,i.x,i.y,i.z,0,0,0,r,a,n)}bone(e,t,i){this.dir.subVectors(i,t);let r=this.dir.length();this.q.setFromUnitVectors(this.down,this.dir.multiplyScalar(1/Math.max(r,1e-6))),this.local.compose(t,this.q,this.scale.set(1,r,1)),this.m.multiplyMatrices(this.frame,this.local),this.limbs.setMatrixAt(e,this.m)}stump(e,t,i,r,a,n){let s=this.end.copy(i?a:r).lerp(i?n:a,jT/(t<2?kt:Ft)),o=i?this.hem.copy(r).lerp(a,t<2?Zm:Ym):s;this.bone(e*lr+t*3,r,o),this.bone(e*lr+t*3+1,o,i?a:s),this.bone(e*lr+t*3+2,i?a:s,s),this.ball(e,t*3,r,Ba),this.ball(e,t*3+1,i?a:s,Ba),this.ball(e,t*3+2,s,Ba*qT),this.balls.setColorAt(e*ra+t*3+2,Hm)}deadLimbs(e,t,i){this.frame.identity();for(let r=0;r<Ur.length;r++){let[a,n,s]=Ur[r];if(t.cut[r]){this.stump(e,r,t.cut[r]===2,ui(this.a,t,a),ui(this.joint,t,n),ui(this.b,t,s));continue}this.limbParts(e,r,ui(this.a,t,a),ui(this.joint,t,n),ui(this.b,t,s),r<2?aa:Nc),r<2&&(i.footMatrix(this.m,this.joint,this.b,aa),this.balls.setMatrixAt(e*ra+r*3+2,this.m))}}noHead(e){for(let t of[this.head,this.band,this.knot])t.setMatrixAt(e,_c);for(let t=0;t<2;t++)this.tails.setMatrixAt(e*2+t,_c);for(let t=0;t<Fa;t++)this.eyes.setMatrixAt(e*Fa+t,_c);this.balls.setColorAt(e*ra+yc,Hm),this.wear.forget("head")}drawHead(e,t,i,r,a,n=!0){this.place(this.head,e,0,0,0,0,0,0),this.wear.head(),this.wear.begin("head"),n&&this.floats.around(this.frame,t,r,this.looks.hatOf(t),()=>this.wear.draw("head",()=>this.looks.hatOf(t),t,i,r,this.frame,this.looks.view));for(let c=0;c<2;c++){let p=(c?1:-1)*.36,g=Math.sin(p)*Wm,v=-Math.cos(p)*Wm,m=e*Fa+c;if(a){this.place(this.eyes,m,g,.005,v,0,-p,Xm,...jm),this.place(this.eyes,m+2,g,.005,v,0,-p,-Xm,...jm);continue}let f=(c?1:-1)*.32;this.place(this.eyes,m,g,.005,v,0,-p,f,.05,.022,.016),this.place(this.eyes,m+2,0,0,0,0,0,0,0,0,0)}if(this.wear.drew("head")){this.place(this.band,e,0,0,0,0,0,0,0,0,0),this.place(this.knot,e,0,0,0,0,0,0,0,0,0);for(let c=0;c<2;c++)this.place(this.tails,e*2+c,0,0,0,0,0,0,0,0,0);return}let s=Xi;this.place(this.band,e,0,0,0,s,0,0),this.band.setColorAt(e,this.tint);let o=Lc+hg,l=Pl*Math.cos(s)-o*Math.sin(s),h=Pl*Math.sin(s)+o*Math.cos(s),u=Ic*.6;this.place(this.knot,e,0,l,h,0,0,0,u,u,u),this.knot.setColorAt(e,this.tint);let d=Math.min(1,i/7);for(let c=0;c<2;c++){let p=Math.sin(r*.017+t*1.3+c*1.9)*(.08+.18*d),g=-(.35+.95*d)+p;this.place(this.tails,e*2+c,(c?1:-1)*.02,l,h+u*.5,g,(c?1:-1)*.3,0,zm[0],zm[c?1:2],1),this.tails.setColorAt(e*2+c,this.tint)}}paint(e,t){this.tint.set(this.looks.colorOf(t));let i=this.looks.teamOf(t);this.skin.set(i===null?this.looks.skinOf(t):jo),this.kitColor.set(i??this.skin),this.head.setColorAt(e,this.skin),this.torso.setColorAt(e,this.kitColor);for(let a=0;a<lr;a++)this.limbs.setColorAt(e*lr+a,a%3===0?this.kitColor:this.skin);for(let a=0;a<ra;a++)this.balls.setColorAt(e*ra+a,a%3===0||a===qm||a===yc?this.kitColor:this.skin);let r=this.skin.r*.2126+this.skin.g*.7152+this.skin.b*.0722>.3;this.eye.set(r?jo:"#ffffff");for(let a=0;a<Fa;a++)this.eyes.setColorAt(e*Fa+a,this.eye)}place(e,t,i,r,a,n,s,o,l=1,h=1,u=1){this.q.setFromEuler(this.euler.set(n,s,o)),this.local.compose(this.v.set(i,r,a),this.q,this.s.set(l,h,u)),this.m.multiplyMatrices(this.frame,this.local),e.setMatrixAt(t,this.m)}};function aA(e){return{phase:0,x:e.x,z:e.z,air:0,airborne:!1,lead:0,reloadAt:-1,stride:0,tuck:0}}function nA(e,t,i,r,a,n){let s=Math.hypot(t.x-e.x,t.z-e.z);s<2&&(e.phase+=s*(a?4:2.4)),e.x=t.x,e.z=t.z;let o=Math.hypot(t.vx,t.vz);e.stride=r?0:Math.min(1,o/(a?Jc:$c));let l=!n&&(t.flags&wi.Grounded)===0;l&&!e.airborne&&(e.lead=1-e.lead),e.airborne=l,e.air=l?Math.min(1,e.air+i*6):Math.max(0,e.air-i*9),e.tuck=e.air*e.air*(3-2*e.air)}var Sc=new R,Nn=new R,bc=new R,Mc=new R;function sA(e,t){return e.held?.hip??(e.sliding?Gl:e.seated?t:e.crouched?Hl:fa)}function oA(e,t){let{held:i,sliding:r,seated:a,crouched:n}=e;return i?.hip!==void 0?i.hip+Hr-fa:r?Gl+Hr-fa:a?t+Hr-.9:n?ro:Hr}function lA(e,t,i,r,a){let{sliding:n,crouched:s,seated:o,held:l,bend:h}=a;if(n){e.limb(t,0,Sc.set(-Ui,i,0),Nn.set(-Ui-.02,aa[1],-rd),kt,kt,bc.set(0,1,-.2),aa),e.limb(t,1,Sc.set(Ui,i,0),Nn.set(Ui+.06,aa[1],-.12),kt,kt,bc.set(.3,1,-1),aa);return}for(let u=0;u<2;u++){let d=u?1:-1,c=d*Ui,p=d*(Ui+.04),g=r.phase+u*Math.PI,v=aa[1],m=Math.max(0,Math.cos(g))*(s?.07:.12)*r.stride,f=-Math.sin(g)*(s?.2:.32)*r.stride,x=l?.feet?Nn.set(...l.feet[u]):o?Nn.set(p*1.6,v,-.42):s?Nn.set(p*1.3,v+m,f-.08):Nn.set(p,v+m,f);if(r.tuck>0){let E=u===r.lead?Mc.set(x.x,Math.max(i-.42,v+.2),-.24):Mc.set(x.x,Math.max(i-.8,v),.14);x.lerp(E,r.tuck)}u===h.foot&&x.add(Mc.set(h.footX,0,h.footZ)),e.limb(t,u,Sc.set(c,i,0),x,kt,kt,bc.set(0,.3,-1),aa)}}var hA=45,uA=class{onDust=null;poses=new Map;lastDust=new Map;capture=null;captured=new R;at=new R;get(e){return this.poses.get(e)}forget(e){this.lastDust.delete(e),this.poses.delete(e)}clear(){this.lastDust.clear(),this.poses.clear()}begin(e,t,i,r,a){let n=this.poses.get(e);n||(n={points:new Float64Array(xi*3),vx:0,vy:0,vz:0,y:t,at:-1/0},this.poses.set(e,n));let s=(a-n.at)/1e3;s>0&&(n.vy=s<Cl/1e3?Ss.clamp((t-n.y)/s,-20,20):0),n.vx=i,n.vz=r,n.y=t,n.at=a,this.capture=n.points}end(){this.capture=null}point(e,t,i){this.capture&&(this.captured.copy(t).applyMatrix4(i),this.capture[e*3]=this.captured.x,this.capture[e*3+1]=this.captured.y,this.capture[e*3+2]=this.captured.z)}dust(e,t,i){!this.onDust||t-(this.lastDust.get(e)??-1/0)<hA||(this.lastDust.set(e,t),this.at.set(0,.02,-.25).applyMatrix4(i),this.onDust(this.at.x,this.at.y,this.at.z))}},cA=.6,dA=.15,wc=[-.17,.06,-.08],Gs=[[0,0],[.35,2],[.8,1],[1,0]],pA=e=>e>Gs[1][0]&&e<Gs[2][0],fA=.05,mA=[.034,.1,.05],gA=()=>new yi(...mA);function vA(e,t,i,r){return t?(e.reloadAt<0&&(e.reloadAt=r),Math.min(1,Math.max(1e-6,(r-e.reloadAt)/1e3/i))):(e.reloadAt=-1,0)}var _A=e=>(Math.min(1,Math.max(0,e))+Wl(e))/2;function yA(e){for(let t=1;t<Gs.length;t++){let[i,r]=Gs[t];if(e>i)continue;let[a,n]=Gs[t-1];return{from:n,to:r,t:_A((e-a)/(i-a))}}return{from:0,to:0,t:0}}function xA(e,t,i,r,a){let n=yA(a),s=[t.copy(e),i,r];return e.copy(s[n.from]).lerp(s[n.to],n.t),pA(a)}var SA=e=>Wl(Math.min(e,1-e)/dA),bA=(e,t)=>t?[e[0],e[1]-.04,e[2]-.13]:[e[0],e[1]-.08,e[2]+.01],MA=.42,ug=class{group=new gn;onSplat=null;onLand=null;set onDust(e){this.poses.onDust=e}onBody=null;colorOf=kp;skinOf=()=>Op;hatOf=()=>Xt;outfitOf=()=>Gr;teamOf=()=>null;seatHeight=0;heldPoses=new Map;leader=null;hidden=null;atLens=new Set;flinches=new j3;self=null;selfShown=!1;world=null;crown;mags;guns;view=null;drewMag=!1;walk=new Map;muzzles=new Map;ragdolls=new Map;stepped=new Set;pending=new Map;poses=new uA;lastTime=-1;root=new We;upper=new We;m=new We;local=new We;q=new Hi;v=new R;s=new R;a=new R;b=new R;dead=new UT;down=new R(0,-1,0);hem=new R;end=new R;euler=new vi(0,0,0,"YXZ");gunMatrix=new We;rig;head;balls;wear;frame;constructor(){let e=Vl;this.rig=new rA(this,this.poses),this.head=this.rig.head,this.balls=this.rig.balls,this.wear=this.rig.wear,this.frame=this.rig.frame,this.crown=new Gt(DE(),Qr({color:zp,flatShading:!0,side:mi}),1),this.mags=new Gt(gA(),Qr({color:"#a8aebd",flatShading:!0}),e);let t=Qr({vertexColors:!0,flatShading:!0});this.guns=new U3(t,e);for(let i of this.meshes())i.castShadow=!0,i.frustumCulled=!1,i.count=0,this.group.add(i);this.rig.eyes.castShadow=!1,this.wear.setup()}meshes(){let e=this.wear.meshes();return[...this.rig.meshes(),this.crown,this.mags,...this.guns.meshes,...e]}setWorld(e){this.world=e}onKill(e,t,i,r,a="shot"){this.pending.set(e,{push:t,head:i,style:a,at:r})}clear(){this.walk.clear(),this.muzzles.clear(),this.ragdolls.clear(),this.stepped.clear(),this.pending.clear(),this.poses.clear(),this.flinches.clear()}livePoseOf(e,t){let i=this.poses.get(e);if(!(!i||t-i.at>=Cl))return{points:i.points.slice(),vel:[i.vx,i.vy,i.vz]}}pointsOf(e){let t=this.poses.get(e);return e===this.self?void 0:this.ragdolls.get(e)?.pos??(t&&this.lastTime-t.at<Cl?t.points:void 0)}showBody(e,t){this.ragdolls.set(e,t),this.stepped.add(e),this.pending.delete(e)}muzzleOf(e){return this.muzzles.get(e)}bodyOf(e){let t=this.ragdolls.get(e);return t?{x:t.pos[Zt*3],y:t.pos[Zt*3+1],z:t.pos[Zt*3+2]}:void 0}update(e,t){let i=this.lastTime<0?0:Math.max(0,(t-this.lastTime)/1e3);this.lastTime=t;let r=0;this.guns.begin(),this.crown.count=this.mags.count=0,this.wear.resetCounts();let a=new Set;for(let n of e){if(a.add(n.id),n.flags&wi.Dead){this.drawDead(r,n,t,i),n.id!==this.self||this.selfShown?r++:this.wear.takeBack();continue}this.ragdolls.delete(n.id),this.stepped.delete(n.id),!(n.flags&wi.Invulnerable&&Math.floor(t/90)%2===0)&&(this.drawAlive(r,n,t,i),n.id!==this.hidden&&n.id!==this.self&&!this.atLens.has(n.id)?r++:(this.guns.takeBack(),n.id===this.leader&&this.crown.count--,this.drewMag&&this.mags.count--,this.wear.takeBack()))}for(let n of this.walk.keys())a.has(n)||(this.walk.delete(n),this.muzzles.delete(n),this.ragdolls.delete(n),this.stepped.delete(n),this.pending.delete(n),this.poses.forget(n),this.flinches.forget(n));this.rig.setCount(r),this.guns.end();for(let n of this.meshes())n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}drawAlive(e,t,i,r){let a=(t.flags&wi.Sliding)!==0,n=!a&&(t.flags&wi.Crouched)!==0,s=this.seatHeight>0,o=this.heldPoses.get(t.id),l=this.flinches.bend(t.id,t.yaw,i),h={sliding:a,crouched:n,seated:s,held:o,bend:l},u=sA(h,this.seatHeight)-l.dip,d=oA(h,this.seatHeight),c=this.walk.get(t.id);c||(c=aA(t),this.walk.set(t.id,c)),nA(c,t,r,a,n,s);let p=Math.hypot(t.vx,t.vz),g=a?0:s?1:(1-c.stride)*(1-c.air),v=i/1e3,m=Math.sin(v*Math.PI*2/3.5+t.id*1.7)*.01*g,f=d+m-l.dip,x=f-ao,E=o?.lean??(a?id:0);this.root.makeRotationY(t.yaw).setPosition(t.x,t.y,t.z),this.upper.multiplyMatrices(this.root,this.local.makeTranslation(0,u,0)),this.upper.multiply(this.m.makeRotationX(E)).multiply(this.m.makeRotationFromEuler(this.euler.set(l.leanX,l.twist,l.leanZ))),this.upper.multiply(this.local.makeTranslation(0,-u,0)),this.frame.copy(this.upper),this.rig.paint(e,t.id),this.poses.begin(t.id,t.y,t.vx,t.vz,i),this.poses.point(Zt,this.v.set(0,u,0),this.frame),this.poses.point(dr,this.v.set(0,x,0),this.frame),this.poses.point(na,this.v.set(0,(u+x)/2,-sg),this.frame),this.poses.point(Di,this.v.set(0,f,0),this.frame),this.wear.dress(wm(this.outfitOf(t.id),this.skinOf(t.id))),this.rig.drawTorso(e,u,x-u),this.frame.copy(this.root),lA(this.rig,e,u,c,h),a&&t.id!==this.self&&this.poses.dust(t.id,i,this.root),this.frame.copy(this.upper);let y=hd(t.flags),w=kn[y]??kn[0],A=w.support?.36:MA,C=(t.flags&wi.Healing)!==0,_=(t.flags&wi.Throwing)!==0,S=vA(c,!o&&(t.flags&wi.Reloading)!==0,ma[y]?.reload||1,i),L=t.pitch-E+Math.sin(v*.9+t.id)*.012*g,P=(C?-.9:L+(-cA-L)*SA(S))+l.gunPitch,N=Math.cos(P),V=Math.sin(P),D=ed,F=x-td+A*V,Y=-A*N,G=this.guns.pick(t.id,y,!o?.unarmed),re=o?.gun;o?.unarmed||(re?(this.gunMatrix.compose(this.v.set(...re.at),this.q.setFromEuler(this.euler.set(re.pitch,re.yaw??0,re.roll??0)),this.s.set(1,1,1)),G.setMatrixAt(this.guns.next(),this.m.multiplyMatrices(this.frame,this.gunMatrix))):this.rig.place(G,this.guns.next(),D,F,Y,P,0,0));let j=re?(tt,[Ve,q,ie])=>tt.set(Ve,q,ie).applyMatrix4(this.gunMatrix):(tt,[Ve,q,ie])=>tt.set(D+Ve,F+q*N-ie*V,Y+q*V+ie*N),Z=w.support??[w.grip[0]-.035,w.grip[1]-.01,w.grip[2]-.02],J=o?.left?this.b.set(...o.left):_?this.b.set(-Ya-.08,x+.32,.12):j(this.b,C?[w.grip[0]-.02,w.grip[1]+.03,w.grip[2]+.06]:Z);this.drewMag=S>0&&!_&&xA(J,this.end,j(this.a,bA(w.grip,!!w.support)),this.v.set(wc[0],u+wc[1],wc[2]),S),this.drewMag&&this.rig.place(this.mags,this.mags.count++,J.x,J.y+fA,J.z,P,0,0),this.rig.limb(e,2,this.a.set(-Ya,x,0),J,Ft,Ft,this.s.set(-.7,-1,.2),Nc);let Ue=o?.right?this.b.set(...o.right):j(this.b,w.grip);if(this.rig.limb(e,3,this.a.set(Ya,x,0),Ue,Ft,Ft,this.s.set(.7,-1,.2),Nc),t.id!==this.self){j(this.v,w.muzzle).applyMatrix4(this.upper);let tt=this.muzzles.get(t.id)??{x:0,y:0,z:0};tt.x=this.v.x,tt.y=this.v.y,tt.z=this.v.z,this.muzzles.set(t.id,tt)}this.poses.end(),this.frame.multiplyMatrices(this.upper,this.local.makeTranslation(0,x,0)),this.frame.multiply(this.local.makeRotationFromEuler(this.euler.set(l.headX,0,l.headZ))),this.frame.multiply(this.local.makeTranslation(0,f-x,0)),o?.head&&this.frame.multiply(this.local.makeRotationFromEuler(this.euler.set(o.head.nod??0,o.head.turn??0,0)));let we=t.id===this.leader;this.rig.drawHead(e,t.id,p,i,!1,!we),we&&this.rig.place(this.crown,this.crown.count++,0,IE,0,Xi,0,0)}drawDead(e,t,i,r){let a=this.ragdolls.get(t.id);if(!a){let s=this.pending.get(t.id);this.pending.delete(t.id);let o=NT(t,s,this.poses.get(t.id),i);a=o.body,this.ragdolls.set(t.id,a),o.fresh&&this.onBody?.(a,o.fresh.push,o.fresh.head,o.fresh.style,t.id)}this.world&&!this.stepped.has(t.id)&&CT(a,this.world,r),a.impact&&(this.onSplat?.(a.impact,t.id),a.impact=null),a.landing&&(this.onLand?.(a.landing,t.id),a.landing=null),this.rig.paint(e,t.id);let n=this.dead.up.subVectors(ui(this.a,a,dr),ui(this.b,a,Zt)).length();if(this.dead.bodyFrame(a,ui(this.end,a,Zt),this.root,this.frame),this.dead.keepTorsoBack(),this.wear.dress(wm(this.outfitOf(t.id),this.skinOf(t.id))),this.rig.drawTorso(e,0,n),this.rig.deadLimbs(e,a,this.dead),a.headless)return this.rig.noHead(e);this.dead.up.subVectors(ui(this.s,a,Di),ui(this.a,a,dr)),this.dead.bodyFrame(a,ui(this.end,a,Di),this.root,this.frame),this.rig.drawHead(e,t.id,AT(a,Di),i,!0)}};var wA=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,EA=`
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform vec2 texel;
  uniform vec2 px;
  uniform vec2 devicePx;
  uniform float near;
  uniform float far;
  uniform float fogNear;
  uniform float fogFar;
  uniform vec3 ink;
  uniform float silhouette;
  uniform float depthK;
  uniform float creaseK;
  uniform float fogAmount;
  uniform float taper;
  uniform float boil;
  uniform float boilSeed;
  uniform float tint;
  uniform float tintFrom;
  varying vec2 vUv;

  float linearDepth(vec2 uv) {
    float z = texture2D(tDepth, uv).x * 2.0 - 1.0;
    return (2.0 * near * far) / (far + near - z * (far - near));
  }
  vec3 normalAt(vec2 uv) { return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash2(i), hash2(i + vec2(1, 0)), f.x), mix(hash2(i + vec2(0, 1)), hash2(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    if (boil > 0.0) {
      vec2 q = uv / px / 26.0 + boilSeed * 7.31;
      // In whole device pixels: a fractional shift samples the depth unevenly and draws ink blobs on far floors.
      uv += floor((vec2(noise2(q), noise2(q + 17.3)) - 0.5) * 2.0 * boil * px / devicePx + 0.5) * devicePx;
    }
    float d = linearDepth(uv);
    vec2 tn = texel * (1.0 - taper * 0.6 * smoothstep(4.0, 60.0, d));
    vec2 td = tn * silhouette;
    float dl = linearDepth(uv - vec2(td.x, 0.0));
    float dr = linearDepth(uv + vec2(td.x, 0.0));
    float dd = linearDepth(uv - vec2(0.0, td.y));
    float du = linearDepth(uv + vec2(0.0, td.y));
    float lap = max(abs(dl + dr - 2.0 * d), abs(dd + du - 2.0 * d)) / d;

    vec3 n = normalAt(uv);
    float nd = max(
      max(1.0 - dot(n, normalAt(uv - vec2(tn.x, 0.0))), 1.0 - dot(n, normalAt(uv + vec2(tn.x, 0.0)))),
      max(1.0 - dot(n, normalAt(uv - vec2(0.0, tn.y))), 1.0 - dot(n, normalAt(uv + vec2(0.0, tn.y))))
    );

    float edge = max(smoothstep(0.012 / depthK, 0.025 / depthK, lap), smoothstep(0.2 / creaseK, 0.35 / creaseK, nd));
    float fog = smoothstep(fogNear, fogFar, d);
    float a = edge * (1.0 - fog * fogAmount);
    float t = tint * smoothstep(tintFrom, tintFrom + 30.0, d);
    #ifdef TINT
      gl_FragColor = vec4(mix(vec3(1.0), vec3(0.42), a * t), 1.0);
    #else
      gl_FragColor = vec4(ink, a * (1.0 - t));
    #endif
  }
`,cg=class{normalMaterial=new qf;normalTarget;edgeMaterial;tintMaterial;edgeScene=new bs;tintScene=new bs;quadCamera=new Ts(-1,1,1,-1,0,1);cssWidth=1;cssHeight=1;constructor(){this.normalTarget=new gi(1,1,{depthTexture:new Ra(1,1),minFilter:It,magFilter:It});let e={tNormal:{value:this.normalTarget.texture},tDepth:{value:this.normalTarget.depthTexture},texel:{value:new K},px:{value:new K},devicePx:{value:new K},near:{value:.1},far:{value:100},fogNear:{value:1e9},fogFar:{value:2e9},ink:{value:new R(...Up)},silhouette:{value:1},depthK:{value:1},creaseK:{value:1},fogAmount:{value:.7},taper:{value:0},boil:{value:0},boilSeed:{value:0},tint:{value:0},tintFrom:{value:20}},t={vertexShader:wA,fragmentShader:EA,uniforms:e,transparent:!0,depthTest:!1,depthWrite:!1};this.edgeMaterial=new ni(t),this.tintMaterial=new ni({...t,defines:{TINT:1},blending:Su,blendSrc:Mu,blendDst:bu});for(let[i,r]of[[this.edgeScene,this.edgeMaterial],[this.tintScene,this.tintMaterial]]){let a=new Ht(new Ko(2,2),r);a.frustumCulled=!1,i.add(a)}}get depth(){return this.normalTarget.depthTexture}setSize(e,t,i){this.cssWidth=e,this.cssHeight=t,this.normalTarget.setSize(Math.floor(e*i),Math.floor(t*i)),this.edgeMaterial.uniforms.devicePx.value.set(1/Math.floor(e*i),1/Math.floor(t*i))}compile(e,t,i){let r=i.layers.mask;i.layers.set(0),t.overrideMaterial=this.normalMaterial;try{return Promise.all([e.compileAsync(t,i),e.compileAsync(this.edgeScene,this.quadCamera),e.compileAsync(this.tintScene,this.quadCamera)])}finally{t.overrideMaterial=null,i.layers.mask=r}}render(e,t,i,r,a=1/0,n=1/0,s=!1,o=!1){i.layers.set(0),t.overrideMaterial=this.normalMaterial,e.setRenderTarget(this.normalTarget),e.setClearColor(8421631,1),e.clear(),e.render(t,i),t.overrideMaterial=null,i.layers.enable(1);let l=this.edgeMaterial.uniforms;l.near.value=i.near,l.far.value=i.far,l.fogNear.value=Number.isFinite(a)?a:1e9,l.fogFar.value=Number.isFinite(n)?n:2e9,l.texel.value.set(r/this.cssWidth,r/this.cssHeight),l.px.value.set(1/this.cssWidth,1/this.cssHeight),l.silhouette.value=lt.silhouette,l.depthK.value=lt.depthEdge,l.creaseK.value=lt.creaseEdge,l.fogAmount.value=lt.inkFog,l.taper.value=s?0:lt.inkTaper,l.boil.value=s&&!lt.boilGun?0:lt.boil,l.boilSeed.value=Math.floor(performance.now()/1e3*lt.boilFps)%1e3,l.tint.value=s?0:lt.inkTint,l.tintFrom.value=lt.inkTintFrom,e.setRenderTarget(null),e.render(this.edgeScene,this.quadCamera),(l.tint.value>0||o)&&e.render(this.tintScene,this.quadCamera)}};var TA=Yo[0],AA="#ef4d4d",RA="hat.halo",CA=2,PA=1.4,LA=9.5,dg=7,IA=[0,.4,0],DA=.8,pg=.15,Zs=.12,NA={unarmed:!0,hip:Zs,lean:1.4,left:[-.3,Zs+.45,.1],right:[.12,Zs+.74,.05],feet:[[-.05,Zs,-.88],[.25,Zs+.25,-.5]],head:{turn:-1.2,nod:-1}},UA=()=>ud(RA)?.art??Xt;function kA(e){let t=new u0({canvas:e,antialias:!1,alpha:!0});t.autoClear=!1;let i=new cg,r=new bs;r.add(new Jf(qo.sky,qo.ground,1.9));let a=new e0(qo.sun,2.6);a.position.set(3,7,5),r.add(a);let n=new ug;n.colorOf=()=>AA,n.skinOf=()=>TA,n.hatOf=UA,n.heldPoses.set(0,NA),r.add(n.group);let s={id:0,x:0,y:0,z:0,yaw:-Math.PI/2,pitch:0,vx:0,vz:0,health:100,flags:ld(wi.Grounded,he.M4)},o=new fi(LA,1,.1,60);o.layers.enable(1);let l=new R(...IA);o.position.set(l.x+Math.sin(pg)*dg,l.y+DA,l.z+Math.cos(pg)*dg),o.lookAt(l);let h=()=>{let p=e.clientWidth,g=e.clientHeight;if(!p||!g)return;let v=Math.min(devicePixelRatio,CA);t.setPixelRatio(v),t.setSize(p,g,!1),i.setSize(p,g,v),o.aspect=p/g,o.updateProjectionMatrix()};new ResizeObserver(h).observe(e),h();let u=!1,d=0,c=p=>{d=u?requestAnimationFrame(c):0,n.update([s],p),t.setRenderTarget(null),t.setClearColor(0,0),t.clear(),t.render(r,o),i.render(t,r,o,PA),e.classList.add("drawn")};new IntersectionObserver(([p])=>{u=p?.isIntersecting??!1,u&&!d&&(d=requestAnimationFrame(c))}).observe(e)}var fg=document.getElementById("halo-man");if(fg instanceof HTMLCanvasElement)try{kA(fg)}catch{}})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
