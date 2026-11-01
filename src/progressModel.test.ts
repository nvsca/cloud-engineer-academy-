import {describe,expect,it} from 'vitest';
import {curriculum,validateCurriculum} from './curriculum';
import {courseProgress,earnedXP,isModuleComplete,moduleLessonProgress} from './progressModel';
import {emptyProgress,readProgress,saveProgress,validateProgress} from './storage';

describe('regras de progresso',()=>{
 const first=curriculum[0];
 it('só conclui módulo quando todas as aulas e o projeto estão registrados',()=>{
  const partial={...emptyProgress(),done:first.lessons.map(l=>l.id)};
  expect(isModuleComplete(first,partial)).toBe(false);
  expect(isModuleComplete(first,{...partial,projectDone:[first.id]})).toBe(true);
 });
 it('calcula avanço de aulas, módulos e XP de forma determinística',()=>{
  const p={...emptyProgress(),done:first.lessons.slice(0,2).map(l=>l.id),projectDone:[first.id]};
  expect(moduleLessonProgress(first,p)).toEqual({done:2,total:first.lessons.length,percent:67});
  expect(courseProgress(curriculum,p).done).toBe(2);
  expect(courseProgress(curriculum,p).completedModules).toBe(0);
  expect(earnedXP(p)).toBe(170);
 });
});

describe('matriz curricular',()=>{
 it('inclui a trilha completa e pré-requisitos reconhecidos',()=>{
  expect(curriculum).toHaveLength(22);
  expect(curriculum.reduce((sum,module)=>sum+module.hours,0)).toBe(626);
  expect(validateCurriculum()).toEqual([]);
 });
 it('fornece links HTTPS e competências para todas as etapas',()=>{
  for(const module of curriculum){
   expect(module.skills.length).toBeGreaterThan(0);
   expect(module.lab.length).toBeGreaterThan(0);
   expect(module.review.length).toBeGreaterThan(0);
   expect(module.project.acceptance.length).toBeGreaterThan(0);
   expect(module.resources.length).toBeGreaterThan(0);
   for(const resource of module.resources) expect(resource.url).toMatch(/^https:\/\//);
  }
 });
});

describe('importação de progresso',()=>{
 it('normaliza duplicatas e limita disponibilidade semanal',()=>{
  const m=curriculum[0];const result=validateProgress({done:[m.lessons[0].id,m.lessons[0].id],projectDone:[],hoursByDay:{},weeklyAvailability:120,projectUrls:{},xp:0});
  expect(result.done).toHaveLength(1);expect(result.weeklyAvailability).toBe(80);
 });
 it('rejeita IDs desconhecidos e links de repositório sem HTTPS',()=>{
  expect(()=>validateProgress({done:['fake'],projectDone:[],hoursByDay:{},weeklyAvailability:8})).toThrow(/desconhecidos/);
  const m=curriculum[0];const valid={done:[],projectDone:[],hoursByDay:{},weeklyAvailability:8,projectUrls:{[m.id]:'http://example.com'}};
  expect(validateProgress(valid).projectUrls).toEqual({});
 });
 it('persiste as alterações e lê o estado após recarga',()=>{
  const store=new Map<string,string>();
  const fakeStorage={getItem:(key:string)=>store.get(key)||null,setItem:(key:string,value:string)=>{store.set(key,value)}} as Storage;
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:fakeStorage});
  const m=curriculum[0];const progress={...emptyProgress(),done:[m.lessons[0].id],weeklyAvailability:12};
  saveProgress(progress);
  expect(readProgress().done).toEqual([m.lessons[0].id]);
  expect(readProgress().weeklyAvailability).toBe(12);
 });
});
