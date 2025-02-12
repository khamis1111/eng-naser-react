import { useState } from "react";
import { ForgetPasswordData } from "../../lib/languages";
import { useLanguage } from "../../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { BaseUrlApi, ErrorMessage } from "../../lib/api";
import axios from "axios";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function ForgetPasswordPage() {
  const { language } = useLanguage();
  const currentTranslation =
    ForgetPasswordData[language] || ForgetPasswordData["en"];

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleResetBtn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrors([]);
      const { data } = await axios.post(`${BaseUrlApi}/forgot-password`, {
        email,
      });
      console.log(data.message);
      navigate(`/resetPassword?email=${email}`);
    } catch (error) {
      setErrors(ErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  console.log(errors);

  return (
    <div
      className={"flex flex-col justify-center max-w-md m-auto h-screen p-4"}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="overflow-auto">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8 space-y-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">{currentTranslation.title}</h1>
              <p className="text-balance text-muted-foreground">
                {currentTranslation.subtitle}
              </p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">{currentTranslation.emailLabel}</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={currentTranslation.emailPlaceholder}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors?.email || errors ? (
                <p className="text-red-500 font-semibold text-sm text-center">
                  {Array.isArray(errors?.email) ? errors?.email[0] : errors}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              className="w-full flex items-center"
              onClick={handleResetBtn}
              disabled={loading}
            >
              {loading && (
                <div className="animate-spin mb-px">
                  <Loader2 />
                </div>
              )}
              <span>{currentTranslation.resetButton}</span>
            </Button>
            <div className="text-center text-sm">
              {currentTranslation.rememberPassword}{" "}
              <Link to="/login" className="underline underline-offset-4">
                {currentTranslation.backToLogin}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
