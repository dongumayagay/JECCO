import { adminAuth } from '$lib/firebase/admin.server';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response('welcom to jigorakus');
};

export async function DELETE({request}) {
    try {
        const uid = request.query.uid;
        await adminAuth.deleteUser(uid);
        console.log('Successfully deleted user');
        return json({deleted: true});
    } catch (error) {
        console.log('Error deleting user:', error);
        return json({deleted: false, error});
    }
}