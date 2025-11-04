import User from '../modals/userModals.js';
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, city, password,role } = req.body;
        
        if (!email && !password && !role) {
            return res.status(400).json({ message: "E-mail, Password and role required!" });
        }
        const createNew = new User({
            firstName,
            lastName,
            email,
            contact,
            city,
            password,
            role
        })

        const user = await createNew.save();

        res.status(201).json({ message: "User Registration Successfull", status: true, user })

    } catch (e) {
        console.log(e)
        if (e.code == 11000) {
            res.status(400).json({ meassage: "User Already Created!", status: false })
        }
    

        res.status(500).json({ meassage: "Server Error", status: false })
    }
}

export const login = async(req, res)=>{

}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate('blogPosts')
      .select('-password') // Exclude sensitive fields
      .lean(); // Better performance for read operations

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
        users: []
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      count: users.length,
      users: users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};