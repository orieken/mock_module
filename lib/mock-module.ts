import { Type } from '@angular/core';
import { MockComponent } from 'mock-component';
import { MockDirective } from 'mock-directive';
import { MockPipe } from 'mock-pipe';

export const mockLookup: { [key: string]: any } = {
  Component: MockComponent,
  Directive: MockDirective,
  Pipe: MockPipe
};

export function MockModule<TModule>(module: Type<TModule>): Type<TModule> {
  const mockedModule = { declarations: [] as any[] };
  const declarations = (module as any).__annotations__[0].declarations || [];
  const imports = (module as any).__annotations__[0].imports || [];
  mockedModule.declarations.concat(imports.map(MockModule));
  declarations.map((declaration: any) => {
    const type = declaration.__annotations__[0].__proto__.ngMetadataName;
    mockedModule.declarations.push(mockLookup[type](declaration));
  });
  return (mockedModule as any) as Type<TModule>;
}
