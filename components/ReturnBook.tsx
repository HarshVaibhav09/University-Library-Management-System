"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { returnBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  recordId:string;
//   returningEligibility: {
//     isEligible: boolean;
//     message: string;
//   };
}

const ReturnBook = ({
  userId,
  bookId,
  recordId,
//   returningEligibility: { isEligible, message },
}: Props) => {

  const router = useRouter();
  const [returning, setReturning] = useState(false);

  const handleReturnBook = async () => {
    // if (!isEligible) {
    //   toast({
    //     title: "Error",
    //     description: message,
    //     variant: "destructive",
    //   });
    // }

    setReturning(true);

    try {
      const result = await returnBook({ bookId, userId,  recordId});

      if (result.success) {
        toast({
          title: "Success",
          description: "Book returned successfully",
        });

        router.push("/");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while returning the book",
        variant: "destructive",
      });
    } finally {
      setReturning(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleReturnBook}
      disabled={returning}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {returning ? "Returning ..." : "Return Book"}
      </p>
    </Button>
  );
};
export default ReturnBook;