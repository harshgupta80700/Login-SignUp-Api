const user =  await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        if(!user){
            throw Error()
        }