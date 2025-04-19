#!/usr/bin/env bash

outfile='./browser/test/run.js'
echo "// just to run in tests generated file" > $outfile

for f in test/*; do
  echo "import \"./${f/test/tests}\"" >> $outfile
done
echo "mocha.checkLeaks()" >> $outfile
echo "mocha.run()" >> $outfile
