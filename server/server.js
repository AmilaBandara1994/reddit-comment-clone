import fastify from 'fastify'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import sensible from '@fastify/sensible'
import cors from '@fastify/cors'
import cookie  from '@fastify/cookie'
dotenv.config()

const app = fastify()
const prisma =  new PrismaClient()
app.register(sensible)
app.register(cookie,{secret: process.env.COOKIE_SECRETE})
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true
})
const CURRENT_USER_ID = (await prisma.user.findFirst({where: {name: "David"}})).id
app.addHook('onRequest', (req, res, done) => {
  if(req.cookies.userId !== CURRENT_USER_ID){
    req.cookies.userId = CURRENT_USER_ID
    res.clearCookie("userId")
    res.setCookie("userId", CURRENT_USER_ID)

  }
  done()
})

const COMMENT_SELECT_FIELDS = {
  id: true,
  message:true,
  parentId: true,
  createdAt: true,
  user:{
    select:{
      id:true,
      name:true,
    }
  }
}



app.get("/posts", async (req, res) => {
  return await commitToDb(prisma.post.findMany({select: 
   { id: true,
    title:true,
    }
  }))
})

app.get("/posts/:id", async (req, res) => {
  return await commitToDb(prisma.post.findUnique({
    where: {id: req.params.id},
    select: 
    { body: true,
     title:true,
     comments:{
      orderBy:{
        createdAt:"desc"
      },
      select: COMMENT_SELECT_FIELDS
     }
     }
  }))
})

app.post("/posts/:id/comments", async (req,res)=> {
  if(req.body.message === "" || req.body.message == null ){
    return res.send(app.httpErrors.badRequest("Message is Required"))
  }

  return await commitToDb(
    prisma.comment.create({
      data:{
        message : req.body.message,
        userId : req.cookies.userId,
        parentId : req.body.parentId,
        postId : req.params.id,
      },
      select: COMMENT_SELECT_FIELDS
    })
  )
}) 


async function commitToDb(promise){
  const [error, data] = await app.to(promise)
  if(error) return app.httpErrors.internalServerError(error.message)
  return data
}
app.listen({ port : process.env.PORT})