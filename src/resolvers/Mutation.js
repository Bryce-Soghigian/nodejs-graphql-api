const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(parent,args,context,info){
    const password = await bcrypt.hash(args.password,10)

    const user = await context.prisma.user.create({
        data: {
            ...args,
            password
        }
    })
    const token = jwt.sign({userId:user.id},APP_SECRET)

    return {
        token,
        user
    }
}
async function post(parent,args,context,info) {
    const newLink = await context.prisma.link.create({
        data:{
            url:args.url,
            description: args.description
        }
    })
    return newLink
}
async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
  }
  

module.exports = {
    signup,
    login,
    post
}