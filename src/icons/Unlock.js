// License: GPL. Made by Piqo Design: https://dribbble.com/Piqodesign
const Unlock = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}) => {
    return (
        <svg
            data-name="Iconly/Curved/Unlock"
            xmlns="http://www.w3.org/2000/svg"
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            {...props}
        >
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            >
                <path data-name="Stroke 1" d="M16.2764 5.98785C15.7034 4.09285 13.9314 2.72485 11.8534 2.75085C9.38637 2.78085 7.39137 4.76785 7.34937 7.23485V9.40385" />
                <path data-name="Stroke 3" d="M11.9102 14.1562V16.3772" />
                <path data-name="Stroke 5" d="M11.9101 8.82422C6.16512 8.82422 4.25012 10.3922 4.25012 15.0952C4.25012 19.7992 6.16512 21.3672 11.9101 21.3672C17.6561 21.3672 19.5711 19.7992 19.5711 15.0952C19.5711 10.3922 17.6561 8.82422 11.9101 8.82422Z" />
            </g>
        </svg>
    );
};

export default Unlock;