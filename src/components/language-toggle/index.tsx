"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import type { Locale } from "@/sdk/i18n/config";
import { setUserLocale } from "@/sdk/lib/locale";

export function LanguageToggle() {
  const t = useTranslations();
  const locale = useLocale();

  const changeLanguage = useCallback(async (locale: Locale) => {
    setUserLocale(locale);
  }, []);

  const currentFlag = useMemo(() => {
    switch (locale) {
      case "pt":
        return (
          <Image
            src="/flags/brazil.png"
            alt="Brazil Flag"
            width={24}
            height={24}
          />
        );
      case "en":
        return (
          <Image
            src="/flags/united-states.png"
            alt="United States Flag"
            width={24}
            height={24}
          />
        );
      default:
        return (
          <Image
            src="/flags/brazil.png"
            alt="Brazil Flag"
            width={24}
            height={24}
          />
        );
    }
  }, [locale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentFlag}
          <span className="sr-only">Languages</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLanguage("pt")}
        >
          <Image
            src="/flags/brazil.png"
            alt="Brazil Flag"
            width={24}
            height={24}
          />
          <span>{t("ToggleLanguage.pt-br")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLanguage("en")}
        >
          <Image
            src="/flags/united-states.png"
            alt="Brazil Flag"
            width={24}
            height={24}
          />
          <span>{t("ToggleLanguage.en")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
