"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/sdk/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import moment from "moment-timezone";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTranslations } from "next-intl";
import {
  dbUserConfig,
  type UserConfig,
} from "@/sdk/database/models/user-config";
import { useToast } from "@/sdk/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function getTimezoneOffset(timezone: string): string {
  const offset = moment.tz(timezone).utcOffset() / 60;

  if (offset === 0) return "GMT";

  return `GMT ${offset >= 0 ? "+" : ""}${offset}`;
}

const profileFormSchema = z.object({
  timezone: z.string({
    required_error: "Timezone is required",
    invalid_type_error: "Timezone must be a string",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ userConfig }: { userConfig: UserConfig }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { toast } = useToast();
  const mutation = useFirestoreDocumentMutation(
    dbUserConfig().getDocRef(userConfig.id!)
  );

  const t = useTranslations();
  const timezones = Intl.supportedValuesOf("timeZone");
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onSubmit",
    defaultValues: {
      timezone: userConfig?.timezone,
    },
  });

  const onSubmit = useCallback(
    (data: ProfileFormValues) => {
      mutation.mutate(
        {
          timezone: data.timezone,
          userId: userConfig.userId,
        },
        {
          onError: () => {
            toast({
              title: t("Profile.update.error.title"),
              description: t("Profile.update.error.description"),
            });
          },
          onSuccess: () => {
            toast({
              title: t("Profile.update.success.title"),
              description: t("Profile.update.success.description"),
            });
          },
        }
      );
    },
    [mutation, userConfig, toast, t]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => {
            const selectedTimezone = timezones.find(
              (timezone) => timezone === field.value
            );

            return (
              <FormItem className="flex flex-col">
                <FormLabel>{t("Timezone.title")}</FormLabel>
                <Popover open={popoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={mutation.isLoading}
                        variant="outline"
                        role="combobox"
                        onClick={() => setPopoverOpen((prev) => !prev)}
                        className={cn(
                          "w-[330px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? `${selectedTimezone} (${getTimezoneOffset(
                              selectedTimezone!
                            )})`
                          : t("Timezone.select")}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[330px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t("Timezone.search")}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>{t("Timezone.not-found")}</CommandEmpty>
                        <CommandGroup>
                          {timezones.map((timezone) => (
                            <CommandItem
                              value={timezone}
                              key={timezone}
                              disabled={mutation.isLoading}
                              className="cursor-pointer"
                              onSelect={() => {
                                form.setValue("timezone", timezone);

                                setPopoverOpen(false);
                              }}
                            >
                              <span>
                                {timezone} ({getTimezoneOffset(timezone)})
                              </span>
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  timezone === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>{t("Timezone.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          disabled={mutation.isLoading}
          className="min-w-32"
        >
          {mutation.isLoading ? <LoadingSpinner /> : t("Profile.save")}
        </Button>
      </form>
    </Form>
  );
}
