export const scaleIn = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
}

export const growFromBottom = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 150, opacity: 1 },
    exit: { height: 0, opacity: 0 }
}

export const circularTransitionRightToBottom = {
    initial: { clipPath: "circle(0% at 100% 0%)" },
    animate: { clipPath: "circle(150% at 100% 50%)" },
    exit: { clipPath: "circle(0% at 100% 0%)" }
}

export const circularTransitionLeftToBottom = {
    initial: { clipPath: "circle(0% at 0% 0%)" },
    animate: { clipPath: "circle(150% at 0% 50%)" },
    exit: { clipPath: "circle(0% at 0% 0%)" }
} 
export const slideInLeft = {
    initial: { x: -300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
}

export const slideInRight = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 }
}