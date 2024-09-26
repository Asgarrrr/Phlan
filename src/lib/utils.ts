import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn( ...inputs: ClassValue[] ) {
	return twMerge( clsx( inputs ) )
}

export const getStringFromBuffer = ( buffer: ArrayBuffer ) =>
	Array.from( new Uint8Array( buffer ) )
		.map( b => b.toString( 16 ).padStart( 2, "0" ) )
	  	.join( " " ); 
