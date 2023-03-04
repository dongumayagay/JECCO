
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