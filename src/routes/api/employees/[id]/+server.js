import {db} from '$lib/firebase/client.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {json} from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}) {
    const user = await request.json();
    const deleted = await deleteDoc(doc(db, "employees", user.id));
    return json(deleted);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({request}) {
    const addUserInput = await request.json();
    const updated = await updateDoc(doc(db, 'employees', addUserInput.id),{
        name:addUserInput.name,
        address:addUserInput.address,
        contactInfo:addUserInput.contactInfo
    });    
    return json(updated);

};