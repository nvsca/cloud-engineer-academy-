import { curriculum } from './curriculum';
import type { Progress } from './types';

const KEY = 'cloud-engineer-academy:v1';
export const emptyProgress = (): Progress => ({done:[],projectDone:[],hoursByDay:{},weeklyAvailability:8,projectUrls:{},xp:0,updatedAt:new Date().toISOString()});
export function readProgress(): Progress {
 try { const raw=localStorage.getItem(KEY); if(!raw) return emptyProgress(); const parsed=JSON.parse(raw); return validateProgress(parsed); }
 catch { return emptyProgress(); }
}
export function saveProgress(progress:Progress) { localStorage.setItem(KEY,JSON.stringify({...progress,updatedAt:new Date().toISOString()})); }
export function validateProgress(value:unknown):Progress {
 if(!value||typeof value!=='object') throw new Error('O arquivo não contém um objeto de progresso.');
 const p=value as Partial<Progress>; const lessonIds=new Set(curriculum.flatMap(m=>m.lessons.map(l=>l.id))); const moduleIds=new Set(curriculum.map(m=>m.id));
 if(!Array.isArray(p.done)||!Array.isArray(p.projectDone)||typeof p.hoursByDay!=='object'||!p.hoursByDay||typeof p.weeklyAvailability!=='number') throw new Error('Estrutura inválida ou versão incompatível.');
 if(p.done.some(x=>typeof x!=='string'||!lessonIds.has(x))||p.projectDone.some(x=>typeof x!=='string'||!moduleIds.has(x))) throw new Error('O arquivo contém aulas ou projetos desconhecidos.');
 const hours=Object.entries(p.hoursByDay).filter(([d,h])=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&typeof h==='number'&&Number.isFinite(h)&&h>=0&&h<=24);
 const urls=Object.entries(p.projectUrls||{}).filter(([id,url])=>moduleIds.has(id)&&typeof url==='string'&&url.length<500&&(!url||/^https:\/\//i.test(url)));
 return {done:[...new Set(p.done)],projectDone:[...new Set(p.projectDone)],hoursByDay:Object.fromEntries(hours),weeklyAvailability:Math.max(1,Math.min(80,p.weeklyAvailability)),projectUrls:Object.fromEntries(urls),xp:Number.isFinite(p.xp)?Math.max(0,Number(p.xp)):0,updatedAt:typeof p.updatedAt==='string'?p.updatedAt:new Date().toISOString()};
}
