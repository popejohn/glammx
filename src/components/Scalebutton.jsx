import * as motion from "motion/react-client"



export default function Scalebutton({text, style}) {
    return (
        <motion.div className= {style}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.8 }}
        >{text}</motion.div>
    )
}



