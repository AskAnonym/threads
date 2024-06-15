"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  askerId: string;
}

function PostThread({ userId, askerId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
      askerId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      askerId,
      // communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-row items-center justify-start gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Ask Question
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={1}
                  {...field}
                  placeholder="What are you curious about?"
                />
              </FormControl>
              <span className=" text-small-medium text-light-4">
                <span className=" text-primary-500">*</span> Your profile is
                <b className="ml-1">Anonymous</b>!
              </span>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="inline-flex items-center justify-center gap-2"
          variant="secondary"
        >
          <Image
            src="/assets/incognito.svg"
            alt="logout"
            width={24}
            height={24}
            className=""
          />
          Send
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
