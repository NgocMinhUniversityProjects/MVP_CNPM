import "./index.css"

interface ImageDescBoxProps {
    title? : string
    imgClass : Exclude<string, "img">
    desc : string
}

export default function ImageDescBox(config : ImageDescBoxProps) {
    const c = config.imgClass + " img"
    return <div className="Image-desc-box">
        <div className={c}></div>
        <div className="title">{config.title ?? ""}</div>
        <div className="desc">{config.desc}</div>
    </div>
}