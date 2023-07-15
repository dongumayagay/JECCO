export const peso = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  });

export const sendEmail = async (
  mailOptions = {
    to: 'maxpascual16@gmail.com',
    subject: 'Email Subject',
    html: '<h1>Hello World</h1>'
  }
) =>
  await (
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ mailOptions })
    })
  ).json();

 

export async function saveActivityLogs(addUserInput){
  const today = new Date();

  // Get date components
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  // Create the date string
  const dateString = `${year}-${month}-${day}`;

  try {
  const docRef = await fetch('/api/activity-logs',{method:'POST',
    body: JSON.stringify({
      date:dateString,
      user:addUserInput.user,
      activityType:addUserInput.activityType,
      details:addUserInput.details
  })});
  } catch (e) {
  console.error("Error adding document: ", e);
  }
}