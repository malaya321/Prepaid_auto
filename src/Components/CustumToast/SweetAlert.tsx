

import Toast from 'react-native-toast-message';

interface ToastProps {
    type: any; // Define other possible types as needed
    heading: string;
    body: string;
}
export const alerttype = {
    success: 'success', warning: 'warning', error: 'error'
}

export const SweetAlert = ({ type, heading, body }: ToastProps) => {
    Toast.show({
        type,
        props: { heading, body },
    });
};



