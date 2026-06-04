import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import type { NewUserRequest } from "@/model/user";
import { activateUser } from "@/model/user";
import { useState } from "react";
import { TotpSetup } from "@/components/otp-setup";

/**
 * 安装系统后，用户首次初始化配置的页面
 */
export function HelloPage() {
  const { t } = useTranslation("translation");
  const [termsAgreed, setTermsAgreed] = useState<boolean | "indeterminate">(
    false,
  );
  // 是否启用两步验证
  const [enableOtp, setEnableOtp] = useState<boolean | "indeterminate">(false);
  // 控制OTP设置对话框的打开状态
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  // otp 二维码的base64字符串，初始值为空字符串表示未设置二维码
  const [qrcode, setQrcode] = useState<string>("");
  // 当正在提交时，将按钮置灰
  const [submitting, setSubmitting] = useState(false);

  const afterSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const newUser: NewUserRequest = {
      name: null,
      password: null,
      inviteToken: null,
      otp: {
        provider: "totp",
      },
    };
    try {
      const response = await activateUser(newUser);
      //如果启用了otp，则设置qrcode状态以显示OTP设置对话框
      if (enableOtp) {
        if (!response.data.otp) {
          console.error("OTP information is missing in the response.");
          return;
        }
        if (response.data.otp.qrcode.startsWith("data:image/png;base64,")) {
          setQrcode(response.data.otp.qrcode);
        } else {
          setQrcode("data:image/png;base64," + response.data.otp.qrcode);
        }
        setOpenOtpDialog(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <TotpSetup
        qrcode={qrcode}
        open={openOtpDialog}
        onOpenChange={setOpenOtpDialog}
      />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">YesMyAdmin</h1>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>{t("init.hello.title")}</FieldLegend>
            <FieldDescription>{t("init.hello.hint")}</FieldDescription>
            <FieldSeparator />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t("login.name")}</FieldLabel>
                <Input id="name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  {t("login.password")}
                </FieldLabel>
                <Input id="password" type="password" required />
                <FieldDescription>
                  {t("user.prohibited-weak-credentials.hint")}
                </FieldDescription>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="enable-otp"
                  checked={enableOtp}
                  onCheckedChange={setEnableOtp}
                />
                <FieldLabel htmlFor="enable-otp" className="font-normal">
                  {t("hello.otp.enable.hint")}
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="agree-to-terms"
                  checked={termsAgreed}
                  onCheckedChange={setTermsAgreed}
                />
                <FieldLabel htmlFor="agree-to-terms" className="font-normal">
                  {t("hello.agree-to-terms.checkbox")}
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button
              type="button"
              id="start-submit"
              onClick={afterSubmit}
              disabled={!termsAgreed || submitting}
              className="w-full"
            >
              {t("hello.start")}
            </Button>
          </Field>
          <FieldSeparator />
          <FieldDescription>{t("statement.not.affiliated")}</FieldDescription>
          <FieldDescription>{t("statement.copyright")}</FieldDescription>
          <FieldDescription>{t("statement.anti.fraud")}</FieldDescription>
        </FieldGroup>
      </div>
    </div>
  );
}
