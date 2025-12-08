
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export const submitLead = async (email: string): Promise<boolean> => {
    if (!GOOGLE_SHEETS_URL) {
        console.warn('Google Sheets URL not configured');
        return false;
    }

    try {
        // Use text/plain to avoid CORS preflight options request which Google Sheets doesn't like
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({ email }),
        });
        return true;
    } catch (error) {
        console.error('Error submitting lead:', error);
        return false;
    }
};
