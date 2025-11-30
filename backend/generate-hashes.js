const bcrypt = require('bcryptjs');

async function generateHashes() {
  const student = await bcrypt.hash('student123', 10);
  const tutor = await bcrypt.hash('tutor123', 10);
  const admin = await bcrypt.hash('admin123', 10);
  
  console.log('student123:', student);
  console.log('tutor123:', tutor);
  console.log('admin123:', admin);
}

generateHashes();
