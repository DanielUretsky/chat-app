export const sliceMessage = (message, messageLengthCondition, sliceLength) => {
    if(message?.length >= messageLengthCondition) return message.slice(0, sliceLength) + '...';

    return message;
}