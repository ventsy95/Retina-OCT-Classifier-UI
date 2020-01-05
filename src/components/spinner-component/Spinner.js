import React, { Component } from 'react';
import './Spinner.css';
import { AnimatePresence, motion } from "framer-motion";

class Spinner extends Component {

    render() {

        return (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <div className="triple-spinner"></div>
            </motion.div>
        );
    }
}

export default Spinner;