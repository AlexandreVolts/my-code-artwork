# My Code Artwork

## How to run ?

* Go in a given folder with `cd <folder-name>`
* Run `npm i`
* Run `npm run dev`
* Open [http://localhost:1234](http://localhost:1234)

## Elementary Celular Automata

A binary celular automata using a given ruleset to be generated. <br />
The grid on which evolve the cells is limited to 31 in length because of Javascript limitation: The maximum size of a number is 2^32, and cells are not stored in a JS array but in a number via binary operations. <br />
The default ruleset is 110, it can be changed by editing the `ruleset` constant, `src/BinaryArray.ts:4`. The maximum value is `2^8 - 1` or 255.