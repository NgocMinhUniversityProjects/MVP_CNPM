import "./index.css"

export interface TestimonialProp {
    userName : string,
    info : string,
    comment : string
}

export default function Testimonials(config : TestimonialProp) {
    return <div className="user-testimonial">
        <div className="comment">{`"${config.comment}"`}</div>
        <div className="info">
            <div className="pfp"></div>
            <div className="info-container">
            <div className="name">{config.userName}</div>
            <div className="do-what">{config.info}</div>
            </div>
        </div>
    </div>
}