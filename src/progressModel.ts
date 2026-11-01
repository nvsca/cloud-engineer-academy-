import type {Module, Progress} from './types';

export function isModuleComplete(module:Module, progress:Progress):boolean {
 return module.lessons.every(lesson=>progress.done.includes(lesson.id))&&progress.projectDone.includes(module.id);
}
export function moduleLessonProgress(module:Module, progress:Progress):{done:number,total:number,percent:number} {
 const done=module.lessons.filter(lesson=>progress.done.includes(lesson.id)).length;
 return {done,total:module.lessons.length,percent:module.lessons.length?Math.round(done/module.lessons.length*100):0};
}
export function earnedXP(progress:Progress):number {return progress.done.length*25+progress.projectDone.length*120;}
export function courseProgress(modules:Module[],progress:Progress){
 const total=modules.reduce((n,m)=>n+m.lessons.length,0),done=progress.done.length;
 return {done,total,percent:total?Math.round(done/total*100):0,completedModules:modules.filter(m=>isModuleComplete(m,progress)).length};
}
