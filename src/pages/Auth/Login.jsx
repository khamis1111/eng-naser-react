import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { BaseUrlApi, ErrorMessage } from "../../lib/api";
import { useLanguage } from "../../context/LanguageContext";
import { LoginData } from "../../lib/languages";
import { Loader2, LucideOrigami } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { language } = useLanguage();
  const t = LoginData[language] || LoginData["en"];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLoginBtn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrors({});
      const { data } = await axios.post(`${BaseUrlApi}/login`, form);
      Cookie.set("token", data.token);
      navigate("/", { replace: true });
    } catch (error) {
      setErrors(ErrorMessage(error));
      Cookie.remove("token");
    } finally {
      setLoading(false);
    }
  };

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const handleGoogleBtn = async (e) => {
    e.preventDefault();

    try {
      setLoadingGoogle(true);
      setErrors({});
      const { data } = await axios.get(`${BaseUrlApi}/auth/google`);
      console.log(data.url);
      window.location.href = data.url;
    } catch (error) {
      setErrors(ErrorMessage(error));
    }
  };
  return (
    <div
      className="flex flex-col justify-center gap-6 max-w-md md:max-w-4xl m-auto h-screen p-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="overflow-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t.welcomeBack}</h1>
                <p className="text-balance text-muted-foreground">
                  {t.loginText}
                </p>
              </div>
              {errors === "Error" && (
                <p className="text-red-500 font-semibold text-sm text-center">
                  Email or Password incorrect, please login again
                </p>
              )}
              <div className="flex flex-col gap-3 text-start">
                <div className="grid gap-2">
                  <label htmlFor="identifier">{t.identifierLabel}</label>
                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder={t.identifierPlaceholder}
                    onChange={(e) =>
                      setForm({ ...form, identifier: e.target.value })
                    }
                  />
                  {errors?.identifier && (
                    <p className="text-red-500 font-semibold text-sm">
                      {errors.identifier[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password">{t.passwordLabel}</label>
                    <Link
                      to="/forgetPassword"
                      className="text-sm underline-offset-2 hover:underline"
                    >
                      {t.forgotPassword}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  {errors?.password && (
                    <p className="text-red-500 font-semibold text-sm">
                      {errors.password[0]}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="terms"
                    className={language === "ar" && "ml-2"}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm pt-1 font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t.stayLoggedIn}
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full flex items-center"
                  onClick={handleLoginBtn}
                  disabled={loading}
                >
                  {loading && (
                    <div className="animate-spin mb-px">
                      <Loader2 />
                    </div>
                  )}
                  <span>{t.signIn}</span>
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  {t.orContinueWith}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleBtn}
                disabled={loadingGoogle}
              >
                {loadingGoogle ? (
                  <div className="animate-spin">
                    <Loader2 />
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                )}

                <span>{t.loginWithGoogle}</span>
              </Button>
              <div className="text-center text-sm">
                {t.noAccount}{" "}
                <Link to="/register" className="underline underline-offset-4">
                  {t.signUp}
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:flex items-center justify-center">
            <LucideOrigami size={50} />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link to="#">{t.termsOfService}</Link> and{" "}
        <Link to="#">{t.privacyPolicy}</Link>.
      </div>
    </div>
  );
}
