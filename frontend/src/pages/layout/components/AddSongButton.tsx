import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import axiosInstance from "@/lib/axios";

const AddSongButton = () => {
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("audio", acceptedFiles[0]);

    const res = await axiosInstance.post("/", formData);
    console.log(res.data);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "audio/*": [] },
    multiple: false,
    onDrop,
  });

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600">
            <Plus className="h-4 w-4" />
            Add Song
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Song</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div
            {...getRootProps()}
            className="border-dashed border p-6 border-zinc-600 rounded-xl text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            Drag & drop audio file here
          </div>

          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddSongButton;

// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// function Upload() {
//   const onDrop = async (acceptedFiles) => {
//     const formData = new FormData();
//     formData.append('audio', acceptedFiles[0]);

//     const res = await axios.post('/api/extract', formData);
//     console.log(res.data); // metadata
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { 'audio/*': [] },
//     multiple: false,
//     onDrop
//   });

//   return (
//     <div {...getRootProps()} style={{ border: "2px dashed gray", padding: 20 }}>
//       <input {...getInputProps()} />
//       Drag & drop audio file here
//     </div>
//   );
// }
