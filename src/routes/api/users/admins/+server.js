import { adminAuth } from '$lib/firebase/admin.server';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response('Hello');
};

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const addUserInput = await request.json();
    const userRecord = await adminAuth.createUser({ email:addUserInput.email, password:addUserInput.password, displayName:addUserInput.name});
    const docRef = await setDoc(doc(db, "userinfo", userRecord.uid), {
        admin: true
    });
    return json(docRef);

};
