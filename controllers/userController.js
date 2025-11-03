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