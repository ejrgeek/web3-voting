export function dateFormatter(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString("en-US", { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });
}