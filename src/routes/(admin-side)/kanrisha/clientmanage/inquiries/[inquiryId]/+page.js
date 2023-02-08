/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const {inquiryId} = params
    return {inquiryId};
};