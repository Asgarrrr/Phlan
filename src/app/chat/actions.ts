import { auth } from "@/auth"
import { Chat } from "@/lib/types"
import { ResultCode } from "@/lib/constants"
import { redis } from "@/lib/redis"
import { Result } from "@/lib/types"


export async function saveChat( chat: Chat ) {

	console.log( "saveChat" )
	
	const session = await auth()
  
	if ( !session?.user )
		return {
			type		: "error",
			resultCode	: ResultCode.Unauthorized
		}

	const pipeline = redis.pipeline()
	pipeline.hmset( `chat:${ chat.ID }`, chat )
	pipeline.zadd( `user:chat:${ chat.userID }`, {
		score	: Date.now(),
		member	: `chat:${ chat.ID }`
	})
	await pipeline.exec()

}

export async function getChats( userID: string ) {

	const session = await auth()

	if ( !userID || !session?.user?.id )
		return [ ] 

	if ( userID !== session.user.id )
		return {
			type		: "error",
			resultCode	: ResultCode.Unauthorized
		}

	const pipeline = redis.pipeline()
		
	for ( const chat of await redis.zrange( `user:chat:${ userID }`, 0, -1, { rev: true } ) as string[ ] )
		pipeline.hgetall( chat )

	if ( pipeline.length() === 0 )
		return [ ]

	return await pipeline.exec() as Chat[ ]

}

export async function getChat( chatID: string, userID: string ): Promise<Chat | Result> {

	const session = await auth()

	if ( !userID || !session?.user?.id )
		return { 
			type		: "error",
			resultCode	: ResultCode.NotFound
		}

	if ( userID !== session.user.id )
		return {
			type		: "error",
			resultCode	: ResultCode.Unauthorized
		}

	return await redis.hgetall( `chat:${ chatID }` ) as Chat
}

export async function shareChat( chatID: string ) {
	
	const session = await auth()
  
	if ( !session?.user?.id )
		return {
			type		: "error",
			resultCode	: ResultCode.Unauthorized
	  	}
  
	const chat = await redis.hgetall<Chat>( `chat:${ chatID }` )
  
	if ( !chat || chat.userId !== session.user.id )
		return {
			type		: "error",
			resultCode	: ResultCode.NotFound
		}
  
	const payload = {
		...chat,
	  	sharePath: `/share/${ chat.ID }`
	}
  
	await redis.hmset( `chat:${ chat.ID }`, payload )
  
	return payload

}