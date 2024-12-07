import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex justify-end gap-2.5">
      <Button>Create</Button>
      <Button>Read</Button>
      <Button>Update</Button>
      <Button>Delete</Button>
    </div>
  );
}