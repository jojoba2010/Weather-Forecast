export const STATUS = {
    IDLE: 'idle',
    RUNNING: 'running',
    READY: 'ready',
    ERROR: 'error'
}
export const getUnit = {
    M: 'C',
    I: 'F'
}

export const currentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
}

export const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    
    // Check if the date is today
    if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    ) {
        return "Today";
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getYearMonth = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', '');
};

export const getFormattedTime = (dateString?: string, includeMinutes: boolean = true): string => {
    const date = dateString ? new Date(dateString) : new Date();
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', hour12: true };

    if (includeMinutes) {
        options.minute = 'numeric';
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getNextHour = (n: number): string => {
    const now = new Date();
    now.setHours(now.getHours() + n);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');

    return `${year}-${month}-${day}:${hour}`;
};