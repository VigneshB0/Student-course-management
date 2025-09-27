const User = require('../models/User');

// Seed default admin user
const seedAdmin = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminExists) {
      const admin = new User({
        name: 'Administrator',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Default admin user created:');
      console.log('Email: admin@example.com');
      console.log('Password: password123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

// Seed demo users
const seedDemoUsers = async () => {
  try {
    const demoUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user'
      }
    ];

    for (const userData of demoUsers) {
      const userExists = await User.findOne({ email: userData.email });
      if (!userExists) {
        const user = new User(userData);
        await user.save();
        console.log(`Demo user created: ${userData.email}`);
      }
    }
  } catch (error) {
    console.error('Error seeding demo users:', error);
  }
};

module.exports = {
  seedAdmin,
  seedDemoUsers
};