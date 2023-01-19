import { adminAuth } from '$lib/firebase/admin.server';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {

    const listUsersResult = await adminAuth.listUsers()
    const users = listUsersResult.users
    return json(users);
};