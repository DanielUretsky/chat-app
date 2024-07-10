import React from 'react';
import {motion} from 'framer-motion';

import './UserBgIcon.css';
export const UserBgIcon = ({ className }) => {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="256"
            height="256"
            className={className}

            initial={{
                y: 0,
            }}

            animate={{
                y: 100,
            }}

            transition={{
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                duration: 2.5
            }}
        >
            <defs id="SvgjsDefs1036"></defs>
            <g id="SvgjsG1037">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 68 68"
                    width="256"
                    height="256"
                >
                    <path
                        fill="#007aff"
                        d="M58.07 3.597c-.002-.788-.555-1.094-1.237-.7L40.53 12.307c-.681.394-1.231 1.337-1.229 2.124l.032 11.132c.002.783.555 1.094 1.237.7l2.93-1.692-1.215 5.264 4.355-7.077 10.231-5.906c.682-.394 1.232-1.342 1.23-2.125L58.07 3.597zM42.523 18.855c-.847.49-1.536.096-1.54-.877-.002-.973.683-2.16 1.53-2.648.846-.489 1.536-.096 1.539.877s-.683 2.16-1.53 2.648zm5.26-3.036c-.848.489-1.537.096-1.54-.877s.683-2.16 1.53-2.648 1.535-.096 1.538.877c.003.972-.682 2.16-1.529 2.648zm5.259-3.037c-.847.49-1.537.096-1.54-.877s.683-2.16 1.53-2.648c.846-.489 1.536-.096 1.539.877.002.973-.683 2.16-1.53 2.648z"

                    >
                    </path>
                    <path
                        d="m64.91 45.186-1.451-.84 1.6-.93c1.548-.904 1.638-2.504-.02-3.46l-22.08-12.75 2.94-4.78 10.17-5.87c.76-.44 1.36-1.47 1.36-2.34l-.03-11.13c-.02-.982-.756-1.413-1.62-.92l-16.3 9.41c-.76.44-1.35 1.47-1.35 2.34l.03 10.52-.14-.08c-1.52-.88-3.97-.88-5.48 0l-2.09 1.21c-.28-1.249-.216-1.164-.302-1.278a15.794 15.794 0 0 0 1.993-3.022l.01-.01c.21-.479.34-.962.438-1.382.001-.004.005-.006.007-.01.039-.096 3.767-9.783-4.266-13.16-8.017-3.374-11.905 3.585-11.94 3.65-.967 1.674-1.27 3.357-.9 5.005.096.42.336.781.68 1.017.155.107.312.198.468.295-.079.868-.157 1.644-.167 2.425-.014 1.864.252 3.775.42 4.45-1.77 1.84-2.87 5.75-3.31 11.83l-10.63 6.18c-1.559.89-1.651 2.499.02 3.45l1.591.92-1.481.86c-1.44.83-1.43 2.19.01 3.03l27.02 15.6c1.45.83 3.79.83 5.23 0l29.59-17.2c1.44-.84 1.43-2.19-.02-3.03zm-25.18-33.18 16.3-9.41c.534-.298.85-.106.87.49l.03 11.13c0 .68-.51 1.56-1.11 1.9l-10.23 5.91c-.03.02-.06.05-.09.09l-3.55 5.77.87-3.77c.046-.228-.173-.378-.37-.28l-2.66 1.54-.27.16c-1.072.535-.813-.71-.86-.81l-.03-10.81c0-.7.49-1.55 1.1-1.91zm2.02 14.5-1.46-.84 1.91-1.11-.45 1.95zm-3.98-1.72.39.23v.03c0 1.011.788 1.401 1.61.92l.02-.01 1.85 1.06-.52 2.25c-.074.294.329.403.45.19l1.13-1.83 22.09 12.76c1.313.763 1.244 1.893.01 2.59l-4.555 2.648L38.03 32.798a3.515 3.515 0 0 0-.65-.772 44.557 44.557 0 0 0-6.339-4.818 3.722 3.722 0 0 0-.32-.422c-.01 0-.01 0-.01-.01l-.149-.694 2.229-1.296c1.37-.79 3.6-.79 4.98 0zm-16.004 4.896c.342.947.685 1.722.932 2.2l-2.288 1.223a10.41 10.41 0 0 1-.47-3.48c.487.152 1.32.126 1.826.057zm2.704 4.784-1.061-2.27-.01-.02c2.661-.523 5.435-1.54 6.77-3.89.01 0 .01 0 0-.01a4.43 4.43 0 0 0 .386-.8l.11.069c.012.018.023.031.035.051.3.51.64 1.36.41 2.49-.2.99-.84 1.89-1.75 2.49-1.32.85-2.92 1.47-4.89 1.89zm5.75-7.57c-.728 2.474-3.03 4.051-7.02 4.794a36.192 36.192 0 0 1-.818-2.163 16.949 16.949 0 0 0 7.373-4.797l.465 2.166zm-13.25-7.8c.01-.716.08-1.442.139-2.14 1.934 1.082 3.913 1.445 5.902 1.073 1.127-.212 1.642-1.05 2.574-.732.651.218 1.252 1 1.776 2.29l.626 2.52c.217.88 1.517.661 1.458-.232-.086-1.319.32-2.355 1.034-2.64.505-.2 1.083.031 1.603.61a6.853 6.853 0 0 1-.382 1.201c-1.93 3.83-5.48 6.79-9.71 8.1-1.078.24-2.161.181-2.85-.67-.3-.38-.51-.83-.72-1.39a21.838 21.838 0 0 1-1.45-7.99zm.04 5.06c.24 1.07.55 2.11.94 3.11.23.6.46 1.09.8 1.52.209.258.45.466.704.62a10.387 10.387 0 0 0 .576 4.14c.001.003.005.003.006.006.157.59.476 1.15.907 1.595-1.327 3.938-2.027 8.137-2.082 12.48a.26.26 0 0 0 .025.11l1 2.09a.25.25 0 0 0 .425.042l1.162-1.536a.244.244 0 0 0 .05-.169c-.603-8.176.408-12.148 1.017-12.359a4.301 4.301 0 0 0 1.885-.822c2.103-.43 3.808-1.075 5.205-1.987 1.03-.67 1.74-1.7 1.97-2.81a3.932 3.932 0 0 0-.14-2.118 44.332 44.332 0 0 1 5.59 4.338c2.29 1.93 2.38 9.53 2.26 18.53-.44 2.64-4.03 3.78-9.62 3.06-7.84-1.01-16.27-5.28-15.83-9.82-.062-4.928-.03-16.253 3.15-20.02zM3.2 41.986l10.34-6.01c-.16 2.4-.22 5.12-.18 8.18-.46 4.8 8.2 9.3 16.27 10.34 3.849.49 9.556.336 10.18-3.5v-.03c.106-7.763.056-14.139-1.325-17.323l21.26 12.272L35.21 60.176c-1.37.79-3.6.8-4.97 0l-27.02-15.6c-1.325-.769-1.254-1.882-.02-2.59z"
                        fill="#000000"

                    >
                    </path>
                    <path
                        d="M58.758 41.99c.596.345 1.555.345 2.143.003.597-.347.594-.903-.002-1.247s-1.556-.344-2.153.003c-.588.341-.585.897.012 1.241zm-6.42-3.706c.596.344 1.555.344 2.143.003.597-.347.594-.903-.002-1.247-.597-.345-1.556-.345-2.153.003-.588.34-.584.897.012 1.24zm3.207 1.852c.602.347 1.56.347 2.148.005.598-.347.595-.902-.007-1.25-.591-.341-1.555-.344-2.153.003-.587.342-.579.9.012 1.242zm-8.649-6.068a.251.251 0 0 0 .342-.092.252.252 0 0 0-.092-.342l-13.018-7.516a.251.251 0 0 0-.342.091.252.252 0 0 0 .092.342l13.018 7.517zm-1.431 9.602 1.51.138c.082.007.194.044.214.123l.243.875c.04.143.37.172.48.045l.693-.792c.049-.057.157-.089.268-.08l1.518.141c.246.022.397-.15.22-.252l-1.087-.628c-.079-.045-.099-.115-.049-.171l.69-.79c.116-.135-.135-.263-.346-.2l-1.363.401a.402.402 0 0 1-.296-.027l-1.088-.628c-.175-.101-.473-.014-.434.128l.248.88c.016.064-.038.126-.135.155l-1.366.404c-.22.064-.167.256.08.278zm6.07 2.08-1.366.404c-.22.064-.166.256.08.278l1.51.138c.082.007.194.044.214.124l.243.874c.04.143.37.172.48.045l.694-.792c.048-.057.156-.089.267-.08l1.518.141c.246.022.397-.15.22-.252l-1.087-.628c-.079-.045-.098-.114-.048-.171l.689-.79c.116-.135-.134-.263-.346-.2l-1.363.401a.401.401 0 0 1-.296-.027l-1.087-.628c-.175-.101-.474-.014-.435.129l.248.879c.017.064-.038.126-.135.155zM4.498 6.654c.936 0 1.697-.755 1.697-1.684 0-.93-.76-1.685-1.697-1.685-.929 0-1.684.756-1.684 1.685s.755 1.684 1.684 1.684zm58.642.782c.936 0 1.697-.756 1.697-1.685s-.761-1.684-1.697-1.684c-.929 0-1.685.755-1.685 1.684s.756 1.685 1.685 1.685zm-51.735 7.56c.72 0 1.305-.582 1.305-1.296 0-.714-.585-1.295-1.305-1.295-.714 0-1.295.58-1.295 1.295 0 .714.581 1.295 1.295 1.295zm-6.492 8.696a.303.303 0 0 0-.215.09l-1.302 1.301a.305.305 0 0 0 0 .432l1.308 1.308c.057.057.134.09.216.09a.3.3 0 0 0 .215-.09l1.301-1.302a.305.305 0 0 0 0-.431L5.13 23.782a.303.303 0 0 0-.216-.09zM38.165 6.855c.058.058.135.09.216.09a.3.3 0 0 0 .216-.09l1.3-1.302a.305.305 0 0 0 0-.431l-1.306-1.307a.303.303 0 0 0-.432 0l-1.302 1.3a.306.306 0 0 0 0 .432l1.308 1.308zM58.71 29.489a1.54 1.54 0 0 0 1.545-1.534 1.54 1.54 0 0 0-3.078 0c0 .846.688 1.534 1.533 1.534z"
                        fill="#000000"
                    >
                    </path>
                </svg>
            </g>
        </motion.svg>
    )
}
