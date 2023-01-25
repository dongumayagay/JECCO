import { adminAuth } from '$lib/firebase/admin.server';
import { doc, deleteDoc } from 'firebase/firestore';
import {db} from '$lib/firebase/client.js';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}) {
    const useruid = await request.json();
    await deleteDoc(doc(db, "userinfo", useruid.uid));
    const deleted = await adminAuth.deleteUser(useruid.uid).then(() => {
        console.log('Successfully deleted user');
        })
        .catch((error) => {
        console.log('Error deleting user:', error);
        });
    return json(deleted);
}