name:Path Manager in Python
date:07/01/2023
label:codestuff

# Path Manager in Python

at one of my places of employment we had various systems around geo-processing tools
and spatial algorithms; often dealing with a ridiculous number of files on disk.

at the time, it was challenging to know which files were inputs or outputs
for the pieces in the system. decent documentation didn't really help
either as it was too separate from the code.

some pieces of said system consume the same inputs; the outputs of some pieces
may be inputs to some other pieces. as the number of processing modules and number of
inputs increased, this became messy, frustrating, and inefficient for our team.

