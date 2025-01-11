import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"


// export async function POST(request){
//     const res = await request.json()
//     const {title, content} = res;
//      const result = await prisma.post.create({
//         data: {
//             title,
//             content,
//             published: true,
//             author: {create: {
//                 name: 'ryan'
//             }}
//         }
//      })

//     return NextResponse.json({result})
// }
export async function DELETE(req, { params }) {
    const { id } = params;  // Access postId from the URL params

    if (!id) {
        return new Response(JSON.stringify({ error: 'postId is required' }), { status: 400 });
    }

    try {
        const postId = id;
        const result = await prisma.post.delete({
            where: {
                id: postId,  // Ensure postId is an integer (assuming your ID is an integer)
            }
        });

        return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete post' }), { status: 500 });
    }
}

    