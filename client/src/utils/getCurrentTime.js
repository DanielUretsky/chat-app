export const getCurrentTime = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes() < 10 ? 
        '0' + new Date().getMinutes() : 
        new Date().getMinutes();

    return hours + ':' + minutes;
}