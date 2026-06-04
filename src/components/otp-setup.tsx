import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";

/**
 * totp设置对话框组件
 */
export function TotpSetup({ qrcode, open, onOpenChange }: { qrcode: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation("translation");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("otp.setup.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>{t("otp.setup.step.1")}</p>
          <p>{t("otp.setup.step.2")}</p>
          <div className="flex items-center justify-center">
            <img src={qrcode} alt="OTP QR Code" />
          </div>
          <p>{t("otp.setup.step.3")}</p>
        </DialogDescription>
        <div className="flex items-center justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {t("otp.setup.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
