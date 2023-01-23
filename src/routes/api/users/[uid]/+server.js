import { adminAuth } from '$lib/firebase/admin.server';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response('welcom to jigoraku');
};

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}) {
    const useruid = await request.json();
    const deleted = await adminAuth.deleteUser(useruid.uid).then(() => {
        console.log('Successfully deleted user');
        })
        .catch((error) => {
        console.log('Error deleting user:', error);
        });
    return json(deleted);
}