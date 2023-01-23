import { adminAuth } from '$lib/firebase/admin.server';
import {json} from '@sveltejs/kit';
import { collection, getDocs} from 'firebase/firestore';
import {db} from '$lib/firebase/client.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let clients = [];

    const querySnapshot = await getDocs(collection(db, 'clientinfo'));
    querySnapshot.forEach((doc) => {
        clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return json(clients);
};