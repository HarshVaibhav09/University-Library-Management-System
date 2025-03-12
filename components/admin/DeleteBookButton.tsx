"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { deleteBookById } from "@/lib/admin/actions/book";

interface DeleteBookButtonProps {
  id: string;
}

const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleDeleteBook = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      const result = await deleteBookById(id);

      if (result && result.success) {
        toast({
          title: "Success",
          description: "Book deleted successfully",
        });
        router.push("/admin/books");
      } else if(result){
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <button
      onClick={handleDeleteBook}
      className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-2 px-3 rounded-lg"
    >
      Delete Book
    </button>
  );
};

export default DeleteBookButton;
