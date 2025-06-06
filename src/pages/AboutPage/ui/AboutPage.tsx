import { memo } from "react";
import { useTranslation } from "react-i18next";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");

  return (
    <div>
      <h1>{t("about_page")}</h1>
    </div>
  );
});

export default AboutPage;
