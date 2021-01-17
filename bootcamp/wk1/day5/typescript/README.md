TypeScript is a typed (optional) super-set of JavaScript that can help with building and managing large-scale JavaScript projects. It can be thought of as JavaScript with additional features like strong static typing, compilation, and object oriented programming.

To use TypeScript run `npm install -g typescript`.

You need to create a `tsconfig.json` file and name your Typescript files with the `.ts` extension.

You can then run `tsc` to have the Typescript compiler generate the `.js` files in a `/built` directory.

The TypeScript files must use `export = NameOfClass;` rather than `module.exports`.

Jest etc can be run as normal on the generated 

