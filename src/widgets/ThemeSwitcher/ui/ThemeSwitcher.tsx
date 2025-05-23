import { Theme, useTheme } from "app/providers/ThemeProvider";
import { memo } from "react";
import DarkIcon from "shared/assets/icons/theme/theme-dark.svg";
import LightIcon from "shared/assets/icons/theme/theme-light.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import cls from "./ThemeSwitcher.module.scss";
interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      buttonTheme={ButtonTheme.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
