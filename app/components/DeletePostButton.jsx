'use client'
import { useRouter } from "next/navigation"

export default function DeletePostButton({ id }) {
    const router = useRouter()

    async function handleClick() {
        try {
            // Make sure the URL is correctly interpolated
            const response = await fetch(`/api/post/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Refresh the page or take any necessary action after successful deletion
                router.refresh();
            } else {
                console.error('Failed to delete the post');
            }
        } catch (e) {
            console.error('Error deleting the post:', e);
        }
    }

    return (
        <button onClick={handleClick}>Delete Post</button>
    );
}