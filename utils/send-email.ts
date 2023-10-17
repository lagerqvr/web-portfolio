import { FormData } from '@/app/contact/page';
import { toast } from 'react-toastify';

export function sendEmail(data: FormData) {
    const apiEndpoint = '/api/email';

    fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((response) => {
            // Show a success toast when the email is sent
            if (response.message === 'Email sent') {
                toast.success('Email sent successfully!');
            } else {
                // Optionally handle other types of responses here
            }
        })
        .catch((err) => {
            // Show an error toast when the fetch call fails
            toast.error('An error occurred while sending the email: ' + err.message);
        });
}
