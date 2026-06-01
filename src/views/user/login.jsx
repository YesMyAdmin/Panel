import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from 'react-i18next';

export function loginCard() {
    const { translate } = useTranslation();
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>translate('login.welcome')</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">translate('login.name')</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">translate('login.password')</Label>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">translate('login.totp')</Label>
                            </div>
                            <Input id="otp" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    translate('login.confirm')
                </Button>
            </CardFooter>
        </Card>
    )
}
