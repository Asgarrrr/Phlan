import { createAI } from "ai/rsc";
import { ClientMessage, ServerMessage, submitUserMessage } from "./actions";

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

export const AI = createAI<AIState, UIState>({
	initialAIState: [],
	initialUIState: [],
	actions: {
		submitUserMessage
	},
});