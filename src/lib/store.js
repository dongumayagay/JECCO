import { readable } from "svelte/store";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/client.js';
import { browser } from '$app/environment';

export const userStore = readable(undefined, set => {
    const unsubscribe = onAuthStateChanged(
        auth,
        (user) => browser && set(user)
    )
    return () => unsubscribe()
})
