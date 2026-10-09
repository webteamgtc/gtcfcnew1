'use client';
import {useEffect,useRef} from 'react';
export default function Atmosphere({theme,paused}){
 const root=useRef(null);
 useEffect(()=>{
  let disposed=false,renderer,frame,observer,clean=()=>{};
  import('three').then(T=>{
   if(disposed||!root.current)return;
   const el=root.current;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));el.appendChild(renderer.domElement);
   const scene=new T.Scene(),camera=new T.PerspectiveCamera(40,1,.1,100);camera.position.z=7;
   const group=new T.Group();scene.add(group);
   const gold=theme==='midnight',positions=[];const count=gold?180:260;
   for(let i=0;i<count;i++){const phi=Math.acos(1-2*(i+.5)/count),theta=Math.PI*(1+Math.sqrt(5))*i,r=2.2;positions.push(r*Math.sin(phi)*Math.cos(theta),r*Math.sin(phi)*Math.sin(theta),r*Math.cos(phi));}
   const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));
   const mat=new T.PointsMaterial({color:gold?0xe6c68c:0x293b93,size:gold?.035:.027,transparent:true,opacity:.58});group.add(new T.Points(geo,mat));
   const rings=[];for(let i=0;i<3;i++){const geometry=new T.TorusGeometry(2.3+i*.17,.004,5,100);const material=new T.MeshBasicMaterial({color:gold?0xd9b678:0x293b93,transparent:true,opacity:.24});const ring=new T.Mesh(geometry,material);ring.rotation.x=.5+i*.4;ring.rotation.y=.5+i*.7;group.add(ring);rings.push([geometry,material]);}
   const pointer={x:0,y:0};const move=e=>{const box=el.getBoundingClientRect();pointer.x=((e.clientX-box.left)/box.width-.5)*.35;pointer.y=((e.clientY-box.top)/box.height-.5)*.25;};el.addEventListener('pointermove',move);
   const resize=()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.render(scene,camera);};observer=new ResizeObserver(resize);observer.observe(el);resize();
   const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const tick=()=>{if(disposed)return;if(!paused&&!reduced){group.rotation.y+=.0011;group.rotation.x+=(pointer.y-group.rotation.x)*.016;group.position.x+=(pointer.x-group.position.x)*.018;}renderer.render(scene,camera);frame=requestAnimationFrame(tick);};if(!reduced&&!paused)tick();
   clean=()=>{el.removeEventListener('pointermove',move);geo.dispose();mat.dispose();rings.forEach(r=>r.forEach(x=>x.dispose()));renderer.dispose();renderer.domElement.remove();};
  });return()=>{disposed=true;cancelAnimationFrame(frame);observer?.disconnect();clean();};
 },[theme,paused]);
 return <div ref={root} className="atmosphere" aria-hidden="true"/>;
}
