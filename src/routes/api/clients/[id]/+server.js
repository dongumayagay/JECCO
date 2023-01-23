import { adminAuth } from '$lib/firebase/admin.server';
import {db} from '$lib/firebase/client.js';
import { doc, deleteDoc } from 'firebase/firestore';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response('welcom to jigoraku');
};

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}) {
    const user = await request.json();
    await deleteDoc(doc(db, "clientinfo", user.id));
    const deleted = await adminAuth.deleteUser(user.id).then(() => {
        console.log('Successfully deleted user');
        })
        .catch((error) => {
        console.log('Error deleting user:', error);
        });
    return json(deleted);
}