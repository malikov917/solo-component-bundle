import { NgIf } from '@angular/common';

import { Type } from "@angular/core";
import { ɵComponentDef as ComponentDef,
         ɵDirectiveDef as DirectiveDef } from '@angular/core';

export const COMMON_DIRECTIVES = [
  NgIf
];


export interface ComponentDepsConfig {
  directives?: Type<any>[];
}


export function ComponentDeps(config: ComponentDepsConfig) {
  return (component) => {

    const def = getComponentDef(component);

    def.directiveDefs = [
      ...getDirectiveDefs(config.directives || [])
    ];

  }
}

export function getComponentDef<T>(t: Type<T>): ComponentDef<T> {
  if (t['ngComponentDef']) {
    return t['ngComponentDef'] as ComponentDef<T>;
  }

  throw new Error('No Angular definition found for ' + t.name);
}

export function getDirectiveDef<T>(t: Type<T>): DirectiveDef<T> {
 
  if (t['ngDirectiveDef']) {
    return t['ngDirectiveDef'] as DirectiveDef<T>;
  }

  // A Component(Def) is also a Directive(Def)
  if (t['ngComponentDef']) {
    return t['ngComponentDef'] as ComponentDef<T>;
  }

  throw new Error('No Angular definition found for ' + t.name);
}


export function getDirectiveDefs(types: Type<any>[]): DirectiveDef<any>[] {
  return types.map(t => getDirectiveDef(t));
}