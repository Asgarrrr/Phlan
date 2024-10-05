"use server"

import { signOut } from "@/auth"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { Session } from "@/lib/types"
import { Separator } from "../ui/separator"


export default async function Settings({ session }: { session: Session }) {

    return(
        <Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="size-full rounded-md overflow-hidden ring-muted-foreground ring-offset-2 ring-offset-background hover:ring-2 transition-all duration-200"> 
					<Image 
						className="size-full"
						width={ 24 }
						height={ 24 }
						src={ session?.user?.image ?? "/images/avatar.png" }
						alt={ session?.user?.name ?? "Avatar" }
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-0 border-none mb-2" side="right">
				<Card>
					<CardHeader>
					    <CardTitle>{ session.user.name }</CardTitle>
						<CardDescription>{ session.user.email }</CardDescription>
					</CardHeader>
                    <CardContent className="grid gap-4 px-0">
                        <Separator />
                        <div className="px-6">
                            <span className="text-sm">Preferences</span>
                        </div>
                        <Separator />
                        <div className="px-6">
                            <span className="text-sm">Other</span>
                        </div>
                        <Separator />
                    </CardContent>
					<CardFooter className="flex justify-end">
                        <form className="w-full" action={async (formData) => {
                            "use server"
                            await signOut()
                        }}>
                            <Button className="w-full" variant="outline" type="submit">
                                Log out
                            </Button>
                        </form>
				    </CardFooter>
				</Card>
			</PopoverContent>
		</Popover>
    )

}