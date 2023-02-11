// License: MIT. Made by danklammer: https://github.com/danklammer/bytesize-icons
const ArrowTop = ({
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
                <path d="M6 10 L16 2 26 10 M16 2 L16 30" />
            </g>
        </svg>
    );
}
export default ArrowTop;