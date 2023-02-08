import { adminAuth } from '$lib/firebase/admin.server';
import {db} from '$lib/firebase/client.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {json} from '@sveltejs/kit';

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

/** @type {import('./$types').RequestHandler} */
export async function PUT({request}) {
    const addUserInput = await request.json();
    const updated = await updateDoc(doc(db, 'clientinfo', addUserInput.id),{
            firstname:addUserInput.firstname,
            lastname:addUserInput.lastname,
            email:addUserInput.email,
            number:addUserInput.number,
            barangay:addUserInput.barangay,
            houseNo:addUserInput.houseNo,
            municipality:addUserInput.municipality,
            province:addUserInput.province
    });    
    return json(updated);

};