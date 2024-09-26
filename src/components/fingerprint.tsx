"use client"

import { motion } from "framer-motion"

export default function Fingerprint( ) {

	const pathVariants = {
    	hidden: { pathLength: 0.02, opacity: 0.1, filter: "blur(1px)" },
    	visible: ( i: number ) => ({
        	pathLength: 1,
        	opacity: 1,
        	filter: "blur(0px)",
        	transition: {
            	pathLength: { type: "spring", duration: 1.5, delay: i * 0.05 },
            	opacity: { duration: 0.2 },
            	filter: { duration: 0.2, },
            	delay: i * 0.1,
        	}
    	})
  	}
  
  	const containerVariants = {
    	pulse: {
        	scale	: [ 1, 0.9 ],
        	opacity	: [ 1, 0.5 ],
      		transition: {
        		delay: 2,
        		duration: 1,
        		repeat: Infinity,
        		repeatType: "reverse" as const,
        		repeatDelay: 1,
      		}
    	}
  	}

  	return (
    	<motion.div
        	variants={ containerVariants }
        	animate="pulse"
        	className="w-auto h-auto"
      	>
        	<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-foreground/30"
			>
          		<motion.path
            		d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
            		variants={ pathVariants }
            		initial="hidden"
            		animate="visible"
            		custom={ 0 }
          		/>
				<motion.path
					d="M14 13.12c0 2.38 0 6.38-1 8.88"
					variants={ pathVariants }
					initial="hidden"
					animate="visible"
					custom={ 1 }
				/>
				<motion.path
					d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
					variants={ pathVariants }
					initial="hidden"
					animate="visible"
					custom={ 2 }
				/>
				<motion.path
					d="M2 12a10 10 0 0 1 18-6"
					variants={ pathVariants }
					initial="hidden"
					animate="visible"
					custom={ 3 }
				/>
          		<motion.path
            		d="M2 16h.01"
            		variants={ pathVariants }
            		initial="hidden"
            		animate="visible"
            		custom={ 4 }
          		/>
          		<motion.path
            		d="M21.8 16c.2-2 .131-5.354 0-6"
            		variants={ pathVariants }
            		initial="hidden"
            		animate="visible"
            		custom={ 5 }
          		/>
          		<motion.path
            		d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
            		variants={ pathVariants }
            		initial="hidden"
            		animate="visible"
            		custom={ 6 }
          		/>
          		<motion.path
            		d="M8.65 22c.21-.66.45-1.32.57-2"
            		variants={ pathVariants }
            		initial="hidden"
            		animate="visible"
            		custom={ 7 }
          		/>
          		<motion.path
            		d="M9 6.8a6 6 0 0 1 9 5.2v2"
            		variants={ pathVariants }
            		initial="hidden"
            		animate="visible"
            		custom={ 8 }
          		/>
        	</motion.svg>
      	</motion.div>
  	)
}