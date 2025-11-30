const bcrypt = require('bcryptjs');

// Hardcoded user database
// In production, this would be a real database
let users = [
  {
    id: 1,
    email: 'student@hcmut.edu.vn',
    password: '$2a$10$H7OnxleqfFX09GIp/6JSxegjbtxieVHfj7XGcJz81QWnx6eQiiIXW', // password: 'student123'
    name: 'Student User',
    role: 'student',
    studentId: '2312001',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    email: 'tutor@hcmut.edu.vn',
    password: '$2a$10$JMTyE7qgOgQNbVw2kM0Qe.dkSSW9N0Y9oHPTQSgQ/SdNnqCHnWUgq', // password: 'tutor123'
    name: 'Tutor User',
    role: 'tutor',
    subjects: ['Mathematics', 'Physics'],
    rating: 4.8,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 3,
    email: 'admin@hcmut.edu.vn',
    password: '$2a$10$QxwagGygatGM9HmIzveWH.cZ/QnNCsaoDGIrWtJa951IKowDvG3Zm', // password: 'admin123'
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  }
];

// Get all users
const getAllUsers = () => {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

// Find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Find user by ID
const findUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

// Create new user
const createUser = async (userData) => {
  const { email, password, name, role = 'student', ...otherData } = userData;

  // Check if user already exists
  if (findUserByEmail(email)) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    id: users.length + 1,
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    role,
    ...otherData,
    createdAt: new Date()
  };

  users.push(newUser);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Validate user password
const validatePassword = async (email, password) => {
  const user = findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Update user
const updateUser = (id, updates) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Don't allow updating certain fields
  const { id: _, password, createdAt, ...allowedUpdates } = updates;

  users[userIndex] = {
    ...users[userIndex],
    ...allowedUpdates,
    updatedAt: new Date()
  };

  const { password: __, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

// Delete user
const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users.splice(userIndex, 1);
  return { message: 'User deleted successfully' };
};

module.exports = {
  getAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  validatePassword,
  updateUser,
  deleteUser
};
