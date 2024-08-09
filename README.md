# My Code Artwork

## How to run ?

* Go in a given folder with `cd <folder-name>`
* Run `npm i`
* Run `npm run dev`
* Open [http://localhost:1234](http://localhost:1234)

**Projects marked with (old) are more than 5 years old, and do not require these commands. They can be run by droping directly the index.html file in a browser.**

## Apollonian Gasket Fractal

Generation of an Apollonian Gasket Fractal using imaginary numbers and Descartes theorem.

## Elementary Celular Automata

A binary celular automata using a given ruleset to be generated. <br />
The grid on which evolve the cells is limited to 31 in length because of Javascript limitation: The maximum size of a number is 2^32, and cells are not stored in a JS array but in a number via binary operations. <br />
The default ruleset is 110, it can be changed by editing the `ruleset` constant, `src/BinaryArray.ts:4`. The maximum value is `2^8 - 1` or 255.

## Falling sand

Falling sand generator.

## Flow field

Flow field with vectors.

## Spline curve

Spline curve tests. Use the key arrow to move a point. Press A or Z key to change the selected point.

## (old) Firework

Firework generator.

## (old) Flower

Flower generator.