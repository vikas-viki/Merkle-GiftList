const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '0109b8963c3694f857e33b17cdf9a899c0de5d40968cba332aa2075467af532c';

app.post('/gift', (req, res) => {

  const { proof, leaf } = req.body;

  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
