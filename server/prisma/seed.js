import { PrismaClient } from "@prisma/client";
const prisma =  new PrismaClient()

async function seed() {
    try {
        await prisma.post.deleteMany()
        await prisma.user.deleteMany()
        const david = await prisma.user.create({data: { name : "David"}})
        const john = await prisma.user.create({data: { name : "John"}})
        const post1 = await prisma.post.create({
            data:{
                body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was in the 1960s with the release of  sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                title: "What is Lorem Ipsum?"
            }
        })
        const post2 = await prisma.post.create({
            data:{
                body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard  a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit , comes from a line in section 1.10.32",
                title: "Where does it come from?"
            }
        })

        const comment1 = await prisma.comment.create({
            data: {
                message : "i am root comment1",
                userId: david.id,
                postId: post1.id
            }
        })

        const comment2 = await prisma.comment.create({
            data: {
                parentId: comment1.id,
                message : "i am nested comment1",
                userId: david.id,
                postId: post1.id
            }
        })

        const comment3 = await prisma.comment.create({
            data: {
                parentId: comment2.id,
                message : "i am nested of  nestedcomment ",
                userId: david.id,
                postId: post1.id
            }
        })
        const comment4 = await prisma.comment.create({
            data: {
                message : "i am root comment2",
                userId: david.id,
                postId: post1.id 
            }
        })
    console.log("Seeding completed successfully!");
    } catch (error) {
    console.error("Error seeding database:", error);
    } finally {
    await prisma.$disconnect();
    }
}

seed()