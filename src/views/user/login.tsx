import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';
import React from 'react';

export const LoginCard: React.FC = () => {
    const { t } = useTranslation();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 处理登录逻辑
        console.log("表单提交");
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{t('login.welcome')}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t('login.name')}</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t('login.password')}</Label>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t('login.totp')}</Label>
                            </div>
                            <Input id="otp" type="password" required />
                        </div>
                    </div>
                    {/* 将按钮放在表单内部，以便 type="submit" 正常工作 */}
                    <CardFooter className="flex-col gap-2 px-0 pb-0">
                        <Button type="submit" className="w-full">
                            {t('login.confirm')}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export function LoginPage(){
    return (
        <LoginCard>

        </LoginCard>
    )
}