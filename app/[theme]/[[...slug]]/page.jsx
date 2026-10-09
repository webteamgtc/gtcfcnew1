import Experience from '../../../components/Experience';
const pages=['about','regulation','services','support'];
export function generateStaticParams(){return ['midnight','horizon'].flatMap(theme=>[{theme,slug:[]},...pages.map(page=>({theme,slug:[page]}))]);}
export const dynamicParams=false;
export async function generateMetadata({params}){const {theme,slug}=await params;return {title:`GTCFC | ${slug?.[0] ? slug[0].charAt(0).toUpperCase()+slug[0].slice(1) : 'Home'} · ${theme==='midnight'?'Midnight Gold':'Clear Horizon'}`};}
export default async function Page({params}){const {theme,slug}=await params;return <Experience theme={theme} page={slug?.[0]||'home'}/>;}
