const mongoose = require('mongoose');

main().catch(err => console.log('Error in db:', err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Database is connected');
}

module.exports = mongoose;