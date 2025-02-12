import { useState } from "react";
import { RegisterData } from "../../lib/languages";
import Cookie from "js-cookie";
import axios from "axios";
import { BaseUrlApi, ErrorMessage } from "../../lib/api";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { CircleCheck, Loader2, LucideOrigami } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { fireWorks } from "../../components/fireWorks";
import { useLanguage } from "../../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { language } = useLanguage();
  const t = RegisterData[language] || RegisterData["en"];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    user_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  fireWorks();

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleRegisterBtn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrors({});
      const { data } = await axios.post(`${BaseUrlApi}/register`, form);
      Cookie.set("token", data.token);
      fireWorks();
      setOpen(true);
    } catch (error) {
      setErrors(ErrorMessage(error));
      Cookie.remove("token");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center gap-6 max-w-md md:max-w-4xl m-auto p-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="overflow-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t?.createAccount}</h1>
                <p className="text-balance text-muted-foreground">{t.signUp}</p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="name">{t.name}</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.name[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">{t.email}</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.email[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">{t.password}</label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.password[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirm-password">{t.confirmPassword}</label>
                <Input
                  id="confirm-password"
                  type="password"
                  onChange={(e) =>
                    setForm({ ...form, password_confirmation: e.target.value })
                  }
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">{t.username}</label>
                <Input
                  id="username"
                  type="text"
                  placeholder="JohnDoe"
                  onChange={(e) =>
                    setForm({ ...form, user_name: e.target.value })
                  }
                />
                {errors.user_name && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.user_name[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone">{t.phone}</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (XXX) XXX-XXXX"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.phone[0]}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full flex items-center"
                onClick={handleRegisterBtn}
                disabled={loading}
              >
                {loading && (
                  <div className="animate-spin mb-px">
                    <Loader2 />
                  </div>
                )}
                <span>{t.signUpButton}</span>
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  {t.orContinueWith}
                </span>
              </div>
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span>{t.loginWithGoogle}</span>
              </Button>
              <div className="text-center text-sm">
                {t.alreadyHaveAccount}{" "}
                <Link to="/login" className="underline underline-offset-4">
                  {t.logIn}
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
        <Link to="#">{t.termsAndConditions}</Link> and{" "}
        <Link to="#">{t.privacyPolicy}</Link>.
      </div>

      {/* Success Register Modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="flex flex-col items-center text-center">
          <CircleCheck color="white" fill="#22c55e" size="200" />
          <AlertDialogTitle>Register Successfully</AlertDialogTitle>
          <AlertDialogDescription>
            Congratulations! Your account has been successfully created.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button
              variant={"default"}
              size={"lg"}
              className="font-bold text-base"
              onClick={() => navigate("/", { replace: true })}
            >
              Go to home
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
