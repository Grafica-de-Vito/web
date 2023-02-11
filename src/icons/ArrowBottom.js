// License: MIT. Made by danklammer: https://github.com/danklammer/bytesize-icons
const ArrowBottom = ({
    fill,
    size,
    height,
    width,
    ...props
}) => {
    return (
        <svg
            width={size || width || 32}
            height={size || height || 32}
            viewBox="0 0 32 32"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            >
                <path d="M6 22 L16 30 26 22 M16 30 L16 2" />
            </g>
        </svg>
    );
}
export default ArrowBottom;