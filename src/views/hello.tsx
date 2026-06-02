import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from 'react-i18next';
import type { NewUser} from "@/model/user";
import { activateUser } from "@/model/user";
/**
 * 安装系统后，用户首次初始化配置的页面
 */
export function HelloPage() {
  const { t } = useTranslation();
  var hideOtpView = true;

  const afterSubmit = () => {
    hideOtpView = false;
    const newUser: NewUser = {
      name: "",
      password: "",
      inviteToken: "",
      otp: {
        provider: "totp"
      }
    }
    activateUser(newUser).then((response) => {
      // Handle response
    });
  }

  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>{t('init.hello.title')}</FieldLegend>
            <FieldDescription>
              {t('init.hello.hint')}
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">
                  {t('login.name')}
                </FieldLabel>
                <Input
                  id="name"
                  required
                />
                <FieldDescription>
                  {t('user.prohibited.name.hint')}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password" >
                  {t('login.password')}
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                />
                <FieldDescription>
                  {t('user.prohibited-weak-credentials.hint')}
                </FieldDescription>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="agree-to-terms"
                />
                <FieldLabel
                  htmlFor="agree-to-terms"
                  className="font-normal"
                >
                  {t('hello.agree-to-terms.checkbox')}
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldGroup hidden={hideOtpView}>
            <FieldLegend>{t('user.otp.setup.title')}</FieldLegend>
            <FieldDescription>
              {t('user.otp.setup.hint')}
            </FieldDescription>
            <img src="/assets/default-otp.png" alt="OTP QR Code" className="w-48 h-48" />
            <Field>
              <FieldLabel htmlFor="otp">
                {t('login.totp')}
              </FieldLabel>
              <Input
                id="otp"
                type="password"
                required
              />
            </Field>
          </FieldGroup>
          <Field orientation="horizontal">
            <Button type="submit" id="otp-fetch" onClick={afterSubmit}>{t('hello.otp.set')}</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
